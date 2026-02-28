import { useState, useEffect, useCallback } from "react";
import { UidrLayout } from "@/components/UidrLayout";
import { useAuth } from "@/hooks/useAuth";
import { useGitHubProxy, type GitTreeItem } from "@/hooks/useGitHubProxy";
import { useReachWorkspace } from "@/hooks/useReachWorkspace";
import { useReachPresence } from "@/hooks/useReachPresence";
import { useReachNotifications } from "@/hooks/useReachNotifications";

import { IdeActivityBar, type ViewMode } from "@/components/ide/IdeActivityBar";
import { IdeFileTree, buildTree, type TreeNode } from "@/components/ide/IdeFileTree";
import { IdeSearchPanel } from "@/components/ide/IdeSearchPanel";
import { IdeIssuesPanel } from "@/components/ide/IdeIssuesPanel";
import { IdeChatPanel } from "@/components/ide/IdeChatPanel";
import { IdeCommitsPanel } from "@/components/ide/IdeCommitsPanel";
import { IdeNotificationsPanel } from "@/components/ide/IdeNotificationsPanel";
import { IdeEditor } from "@/components/ide/IdeEditor";
import { WorkspaceSetup } from "@/components/ide/WorkspaceSetup";
import { Loader2 } from "lucide-react";

interface OpenTab {
  path: string;
  content: string;
  dirty: boolean;
  language: string;
  loading: boolean;
}

function detectLanguage(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    ts: "typescript", tsx: "typescript", js: "javascript", jsx: "javascript",
    go: "go", rs: "rust", py: "python", md: "markdown", json: "json",
    yaml: "yaml", yml: "yaml", toml: "ini", css: "css", scss: "scss",
    html: "html", sql: "sql", sh: "shell", bash: "shell",
    dockerfile: "dockerfile", makefile: "makefile", mod: "go",
  };
  return map[ext || ""] || "plaintext";
}

export default function UidrIde() {
  const { user } = useAuth();
  const workspace = useReachWorkspace();

  // Derived config from active workspace
  const owner = workspace.activeWorkspace?.github_owner || "";
  const repo = workspace.activeWorkspace?.github_repo || "";
  const gh = useGitHubProxy(owner, repo);

  // Core state
  const [viewMode, setViewMode] = useState<ViewMode>("explorer");
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [branch, setBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>([]);
  const [tabs, setTabs] = useState<OpenTab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Issues & commits
  const [issues, setIssues] = useState<any[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [commits, setCommits] = useState<any[]>([]);
  const [commitsLoading, setCommitsLoading] = useState(false);

  // Real-time
  const { onlineUsers } = useReachPresence(
    workspace.activeWorkspace?.id || null,
    activeTab
  );
  const { notifications, unreadCount, markRead, markAllRead } = useReachNotifications(
    workspace.activeWorkspace?.id || null
  );

  // ── Load tree ────────────────────────────
  const loadTree = useCallback(async () => {
    if (!owner || !repo) return;
    setTreeLoading(true);
    try {
      const data = await gh.getTree(branch);
      setTree(buildTree(data.tree));
    } catch (err) {
      console.error("Failed to load tree:", err);
    } finally {
      setTreeLoading(false);
    }
  }, [branch, owner, repo]);

  useEffect(() => { if (owner && repo) loadTree(); }, [loadTree, owner, repo]);

  // ── Load branches ────────────────────────
  useEffect(() => {
    if (!owner || !repo) return;
    gh.getBranches()
      .then(b => setBranches(b.map(x => x.name)))
      .catch(console.error);
  }, [owner, repo]);

  // ── Open file into tab ───────────────────
  const openFile = async (path: string) => {
    // If already open, just switch
    if (tabs.find(t => t.path === path)) {
      setActiveTab(path);
      return;
    }

    const newTab: OpenTab = {
      path,
      content: "",
      dirty: false,
      language: detectLanguage(path),
      loading: true,
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(path);

    try {
      const data = await gh.getFile(path, branch);
      const decoded = data.encoding === "base64" ? atob(data.content) : data.content;
      setTabs(prev =>
        prev.map(t => t.path === path ? { ...t, content: decoded, loading: false } : t)
      );
    } catch (err) {
      console.error("Failed to load file:", err);
      setTabs(prev =>
        prev.map(t => t.path === path ? { ...t, content: `// Error loading ${path}`, loading: false } : t)
      );
    }
  };

  const closeTab = (path: string) => {
    setTabs(prev => prev.filter(t => t.path !== path));
    if (activeTab === path) {
      const remaining = tabs.filter(t => t.path !== path);
      setActiveTab(remaining.length > 0 ? remaining[remaining.length - 1].path : null);
    }
  };

  const updateContent = (path: string, content: string) => {
    setTabs(prev =>
      prev.map(t => t.path === path ? { ...t, content, dirty: true } : t)
    );
  };

  // ── Commit workflow ──────────────────────
  const commitFile = async (path: string, message: string) => {
    const tab = tabs.find(t => t.path === path);
    if (!tab) return;
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      const parentSha = refData.object.sha;
      const blob = await gh.createBlob(tab.content, "utf-8");
      const newTree = await gh.createTree(parentSha, [
        { path, mode: "100644", type: "blob", sha: blob.sha },
      ]);
      const commit = await gh.createCommit(message, newTree.sha, [parentSha]);
      await gh.updateRef(`heads/${branch}`, commit.sha);
      setTabs(prev => prev.map(t => t.path === path ? { ...t, dirty: false } : t));
      loadCommits();
      loadTree();
    } catch (err) {
      console.error("Commit failed:", err);
    }
  };

  // ── Create new file ──────────────────────
  const createNewFile = async (filePath: string) => {
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      const parentSha = refData.object.sha;
      const blob = await gh.createBlob("", "utf-8");
      const newTree = await gh.createTree(parentSha, [
        { path: filePath, mode: "100644", type: "blob", sha: blob.sha },
      ]);
      const commit = await gh.createCommit(`Create ${filePath}`, newTree.sha, [parentSha]);
      await gh.updateRef(`heads/${branch}`, commit.sha);
      await loadTree();
      openFile(filePath);
    } catch (err) {
      console.error("Create file failed:", err);
    }
  };

  // ── Delete file ──────────────────────────
  const deleteFile = async (path: string) => {
    try {
      // Get file SHA first
      const fileData = await gh.getFile(path, branch);
      await gh.deleteFile(path, fileData.sha, `Delete ${path}`, branch);
      closeTab(path);
      loadTree();
    } catch (err) {
      console.error("Delete file failed:", err);
    }
  };

  // ── Create branch ────────────────────────
  const createBranch = async (name: string) => {
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      // Create a new ref via the proxy
      const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const BASE = `https://${PROJECT_ID}.supabase.co/functions/v1/github-proxy`;

      const { data: { session } } = await (await import("@/integrations/supabase/client")).supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const res = await fetch(
        `${BASE}?action=create_ref&owner=${owner}&repo=${repo}&ref=refs/heads/${name}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ sha: refData.object.sha }),
        }
      );
      if (!res.ok) throw new Error("Failed to create branch");

      setBranches(prev => [...prev, name]);
      setBranch(name);
    } catch (err) {
      console.error("Create branch failed:", err);
    }
  };

  // ── Load issues ──────────────────────────
  const loadIssues = async () => {
    if (!owner || !repo) return;
    setIssuesLoading(true);
    try {
      setIssues(await gh.getIssues("open"));
    } catch (err) {
      console.error(err);
    } finally {
      setIssuesLoading(false);
    }
  };

  const createIssue = async (title: string, body: string) => {
    await gh.createIssue(title, body);
    loadIssues();
  };

  // ── Load commits ─────────────────────────
  const loadCommits = async () => {
    if (!owner || !repo) return;
    setCommitsLoading(true);
    try {
      setCommits(await gh.getCommits(branch));
    } catch (err) {
      console.error(err);
    } finally {
      setCommitsLoading(false);
    }
  };

  // ── Load data per view mode ──────────────
  useEffect(() => {
    if (viewMode === "issues") loadIssues();
    if (viewMode === "commits") loadCommits();
  }, [viewMode, owner, repo, branch]);

  // ── Create workspace ─────────────────────
  const handleCreateWorkspace = async (name: string, ghOwner: string, ghRepo: string) => {
    await workspace.createWorkspace(name, ghOwner, ghRepo);
  };

  // ── Loading state ────────────────────────
  if (workspace.loading) {
    return (
      <UidrLayout>
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 3.5rem)" }}>
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </UidrLayout>
    );
  }

  // ── No workspace → setup ─────────────────
  if (!workspace.activeWorkspace) {
    return (
      <UidrLayout>
        <WorkspaceSetup onCreateWorkspace={handleCreateWorkspace} />
      </UidrLayout>
    );
  }

  // ── Side panel content ───────────────────
  const renderSidePanel = () => {
    switch (viewMode) {
      case "explorer":
        return (
          <IdeFileTree
            owner={owner} repo={repo}
            branch={branch} setBranch={setBranch}
            branches={branches}
            onSelectFile={openFile}
            selectedFile={activeTab}
            onRefresh={loadTree}
            onCreateBranch={createBranch}
            tree={tree}
            treeLoading={treeLoading}
            onNewFile={createNewFile}
            onDeleteFile={deleteFile}
          />
        );
      case "search":
        return <IdeSearchPanel tree={tree} onSelectFile={openFile} />;
      case "issues":
        return (
          <IdeIssuesPanel
            issues={issues}
            onCreateIssue={createIssue}
            loading={issuesLoading}
          />
        );
      case "chat":
        return <IdeChatPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "commits":
        return <IdeCommitsPanel commits={commits} loading={commitsLoading} />;
      case "notifications":
        return (
          <IdeNotificationsPanel
            notifications={notifications}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
          />
        );
    }
  };

  return (
    <UidrLayout>
      <div className="flex" style={{ height: "calc(100vh - 3.5rem)", overflow: "hidden" }}>
        <IdeActivityBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          unreadCount={unreadCount}
          onlineCount={onlineUsers.length}
        />

        {/* Side Panel */}
        <div className="w-[280px] flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col overflow-hidden">
          {/* Workspace selector */}
          <div className="px-3 py-2 border-b border-white/5">
            <select
              value={workspace.activeWorkspace?.id || ""}
              onChange={(e) => {
                const ws = workspace.workspaces.find(w => w.id === e.target.value);
                if (ws) workspace.setActiveWorkspace(ws);
              }}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none truncate"
            >
              {workspace.workspaces.map(ws => (
                <option key={ws.id} value={ws.id} className="bg-[#0c0c0c]">
                  {ws.name}
                </option>
              ))}
            </select>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {renderSidePanel()}
          </div>
        </div>

        {/* Editor area */}
        <IdeEditor
          tabs={tabs}
          activeTab={activeTab}
          onTabSelect={setActiveTab}
          onTabClose={closeTab}
          onContentChange={updateContent}
          onCommit={commitFile}
          branch={branch}
          onlineUsers={onlineUsers}
          owner={owner}
          repo={repo}
        />
      </div>
    </UidrLayout>
  );
}
