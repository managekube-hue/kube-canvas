import { useState, useEffect, useCallback } from "react";
import { ReachActivityBar, type ReachView } from "@/components/reach/ReachActivityBar";
import { ReachTopBar } from "@/components/reach/ReachTopBar";
import { ReachHomeDashboard } from "@/components/reach/ReachHomeDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useReachWorkspace } from "@/hooks/useReachWorkspace";
import { useReachPresence } from "@/hooks/useReachPresence";
import { useReachNotifications } from "@/hooks/useReachNotifications";
import { useReachIssues, type ReachIssue } from "@/hooks/useReachIssues";
import { useReachMilestones } from "@/hooks/useReachMilestones";
import { useReachActivity } from "@/hooks/useReachActivity";
import { useReachPullRequests, type ReachPullRequest } from "@/hooks/useReachPullRequests";
import { useGitHub, type GitCollaborator, type GitCommitDetail, type GitSearchResult } from "@/hooks/useGitHub";
import { IdeFileTree, buildTree, type TreeNode } from "@/components/ide/IdeFileTree";
import { IdeEditor } from "@/components/ide/IdeEditor";
import { IdeCommitModal, type CommitStep } from "@/components/ide/IdeCommitModal";
import { IdeSearchPanel } from "@/components/ide/IdeSearchPanel";
import { IdeIssuesPanel } from "@/components/ide/IdeIssuesPanel";
import { IdeIssueDetail } from "@/components/ide/IdeIssueDetail";
import { IdeChatPanel } from "@/components/ide/IdeChatPanel";
import { IdeCommitsPanel } from "@/components/ide/IdeCommitsPanel";
import { IdeNotificationsPanel } from "@/components/ide/IdeNotificationsPanel";
import { IdePullRequestsPanel } from "@/components/ide/IdePullRequestsPanel";
import { IdePrReviewPanel } from "@/components/ide/IdePrReviewPanel";
import { IdeMilestonesPanel } from "@/components/ide/IdeMilestonesPanel";
import { IdeSettingsPanel } from "@/components/ide/IdeSettingsPanel";
import { IdeDocsPanel } from "@/components/ide/IdeDocsPanel";
import { IdeKanbanBoard } from "@/components/ide/IdeKanbanBoard";
import { IdeActivityFeed } from "@/components/ide/IdeActivityFeed";
import { IdeStagingPanel } from "@/components/ide/IdeStagingPanel";
import { IdeVideoRoomsPanel } from "@/components/ide/IdeVideoRoomsPanel";
import { IdeCommandPalette } from "@/components/ide/IdeCommandPalette";
import { WorkspaceSetup } from "@/components/ide/WorkspaceSetup";
import { Loader2, List, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface OpenTab { path: string; content: string; dirty: boolean; language: string; loading: boolean; }

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

export default function Reach() {
  const [activeView, setActiveView] = useState<ReachView>("home");
  const { user } = useAuth();
  const workspace = useReachWorkspace();
  const gh = useGitHub();

  const hasWorkspace = !!workspace.activeWorkspace;
  const owner = workspace.activeWorkspace?.github_owner || "";
  const repo = workspace.activeWorkspace?.github_repo || "";

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "there";

  // ── File / editor state ────────────────────
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [branch, setBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>([]);
  const [tabs, setTabs] = useState<OpenTab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [commitStep, setCommitStep] = useState<CommitStep | null>(null);
  const [commitError, setCommitError] = useState<string | null>(null);
  const [commitCommitting, setCommitCommitting] = useState(false);
  const [commitTargetPaths, setCommitTargetPaths] = useState<string[]>([]);
  const [showStaging, setShowStaging] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ── Issues (local-first, Supabase) ─────────
  const reachIssues = useReachIssues(workspace.activeWorkspace?.id || null);
  const [selectedIssue, setSelectedIssue] = useState<ReachIssue | null>(null);
  const [issueSubView, setIssueSubView] = useState<"list" | "kanban">("list");

  // ── PRs (local-first, Supabase) ─────────────
  const reachPRs = useReachPullRequests(workspace.activeWorkspace?.id || null);
  const [selectedPr, setSelectedPr] = useState<ReachPullRequest | null>(null);

  // ── Milestones (local-first, Supabase) ─────
  const reachMilestones = useReachMilestones(workspace.activeWorkspace?.id || null);

  // ── Activity (local-first, Supabase) ───────
  const reachActivity = useReachActivity(workspace.activeWorkspace?.id || null);

  // ── Commits ────────────────────────────────
  const [commits, setCommits] = useState<any[]>([]);
  const [commitsLoading, setCommitsLoading] = useState(false);

  // ── Collaborators ──────────────────────────
  const [collaborators, setCollaborators] = useState<GitCollaborator[]>([]);

  // ── Realtime ───────────────────────────────
  const { onlineUsers } = useReachPresence(workspace.activeWorkspace?.id || null, activeTab);
  const { notifications, unreadCount, markRead, markAllRead } = useReachNotifications(workspace.activeWorkspace?.id || null);

  // ── Keyboard shortcuts ─────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === "k") { e.preventDefault(); setCommandPaletteOpen(true); }
      if (meta && e.key === "p" && !e.shiftKey) { e.preventDefault(); setCommandPaletteOpen(true); }
      if (meta && e.key === "s") {
        e.preventDefault();
        if (!hasWorkspace) return;
        const dirtyPaths = tabs.filter(t => t.dirty).map(t => t.path);
        if (dirtyPaths.length > 0) {
          setCommitTargetPaths(dirtyPaths);
          setShowCommitModal(true);
        }
      }
      if (meta && e.key === "b") { e.preventDefault(); setSidebarCollapsed(prev => !prev); }
      if (meta && e.key === "w") {
        e.preventDefault();
        if (activeTab) closeTab(activeTab);
      }
      if (e.key === "Escape") {
        if (commandPaletteOpen) setCommandPaletteOpen(false);
        else if (showCommitModal) { setShowCommitModal(false); setCommitError(null); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tabs, activeTab, hasWorkspace, commandPaletteOpen, showCommitModal, sidebarCollapsed]);

  // ── Handle Zoom callback ───────────────────
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("zoom") === "connected") {
      url.searchParams.delete("zoom");
      window.history.replaceState({}, "", url.pathname);
    }
  }, []);

  // ── Load tree ──────────────────────────────
  const loadTree = useCallback(async () => {
    if (!owner || !repo) return;
    setTreeLoading(true);
    try {
      console.log("[Reach] Loading tree:", { owner, repo, branch });
      const data = await gh.getTree(owner, repo, branch);
      console.log("[Reach] Tree loaded:", data.tree.length, "items");
      setTree(buildTree(data.tree));
    } catch (err) { console.error("[Reach] Failed to load tree:", err); }
    finally { setTreeLoading(false); }
  }, [branch, owner, repo]);

  useEffect(() => { if (owner && repo) loadTree(); }, [loadTree, owner, repo]);

  useEffect(() => {
    if (!owner || !repo) return;
    gh.listBranches(owner, repo).then(b => setBranches(b.map(x => x.name))).catch(console.error);
  }, [owner, repo]);

  // ── File operations ────────────────────────
  const openFile = async (path: string) => {
    console.log("[Reach] Opening file:", path);
    if (tabs.find(t => t.path === path)) { setActiveTab(path); return; }
    const newTab: OpenTab = { path, content: "", dirty: false, language: detectLanguage(path), loading: true };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(path);
    if (!hasWorkspace) {
      setTabs(prev => prev.map(t => t.path === path ? { ...t, content: `// ${path}`, loading: false } : t));
      return;
    }
    try {
      console.log("[Reach] Fetching file content:", path);
      const data = await gh.getFile(owner, repo, path, branch);
      const decoded = data.encoding === "base64" ? atob(data.content) : data.content;
      console.log("[Reach] File loaded:", path, decoded.length, "chars");
      setTabs(prev => prev.map(t => t.path === path ? { ...t, content: decoded, loading: false } : t));
    } catch (err) {
      console.error("[Reach] File load error:", err);
      setTabs(prev => prev.map(t => t.path === path ? { ...t, content: `// Error loading ${path}`, loading: false } : t));
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
    setTabs(prev => prev.map(t => t.path === path ? { ...t, content, dirty: true } : t));
  };

  const commitWithProgress = async (paths: string[], message: string) => {
    if (!hasWorkspace) return;
    const dirtyTabs = tabs.filter(t => paths.includes(t.path) && t.dirty);
    if (dirtyTabs.length === 0) return;

    setCommitCommitting(true);
    setCommitError(null);
    try {
      setCommitStep(1);
      const refData = await gh.getRef(owner, repo, `heads/${branch}`);
      const commitSha = refData.object.sha;

      setCommitStep(2);
      const commitDetail = await gh.getCommitDetail(owner, repo, commitSha);
      const baseTreeSha = (commitDetail as any).commit?.tree?.sha || commitSha;

      setCommitStep(3);
      const blobs = await Promise.all(
        dirtyTabs.map(async t => {
          const blob = await gh.createBlob(owner, repo, t.content, "utf-8");
          return { path: t.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
        })
      );

      setCommitStep(4);
      const newTree = await gh.createTree(owner, repo, baseTreeSha, blobs);

      setCommitStep(5);
      const commit = await gh.createCommit(owner, repo, message, newTree.sha, [commitSha]);

      setCommitStep(6);
      await gh.updateRef(owner, repo, `heads/${branch}`, commit.sha);

      setTabs(prev => prev.map(t => paths.includes(t.path) ? { ...t, dirty: false } : t));
      setShowCommitModal(false);
      setCommitTargetPaths([]);
      toast.success(`Committed: ${message}`);
      loadCommits();
      loadTree();
    } catch (err: any) {
      const errMsg = err?.message || "Commit failed";
      setCommitError(errMsg);
      console.error("[Reach] Commit failed:", err);
    } finally {
      setCommitCommitting(false);
      setCommitStep(null);
    }
  };

  const commitFile = async (path: string, message: string) => {
    setCommitTargetPaths([path]);
    await commitWithProgress([path], message);
  };

  const commitMultipleFiles = async (paths: string[], message: string) => {
    setCommitTargetPaths(paths);
    await commitWithProgress(paths, message);
  };

  const discardFile = (path: string) => {
    setTabs(prev => prev.filter(t => t.path !== path));
    if (activeTab === path) setActiveTab(null);
  };

  const createNewFile = async (filePath: string) => {
    if (!hasWorkspace) {
      const newTab: OpenTab = { path: filePath, content: "", dirty: true, language: detectLanguage(filePath), loading: false };
      setTabs(prev => [...prev, newTab]);
      setActiveTab(filePath);
      return;
    }
    try {
      const refData = await gh.getRef(owner, repo, `heads/${branch}`);
      const blob = await gh.createBlob(owner, repo, "", "utf-8");
      const newTree = await gh.createTree(owner, repo, refData.object.sha, [{ path: filePath, mode: "100644", type: "blob", sha: blob.sha }]);
      const commit = await gh.createCommit(owner, repo, `Create ${filePath}`, newTree.sha, [refData.object.sha]);
      await gh.updateRef(owner, repo, `heads/${branch}`, commit.sha);
      await loadTree(); openFile(filePath);
    } catch (err) { console.error("[Reach] Create file failed:", err); }
  };

  const deleteFile = async (path: string) => {
    if (!hasWorkspace) { closeTab(path); return; }
    try {
      const fileData = await gh.getFile(owner, repo, path, branch);
      await gh.deleteFile(owner, repo, path, fileData.sha, `Delete ${path}`, branch);
      closeTab(path); loadTree();
    } catch (err) { console.error("[Reach] Delete file failed:", err); }
  };

  const createBranch = async (name: string) => {
    if (!hasWorkspace) return;
    try {
      const refData = await gh.getRef(owner, repo, `heads/${branch}`);
      await gh.createRef(owner, repo, `refs/heads/${name}`, refData.object.sha);
      setBranches(prev => [...prev, name]);
      setBranch(name);
    } catch (err) { console.error("[Reach] Create branch failed:", err); }
  };

  const loadFileContent = async (path: string): Promise<string> => {
    if (!hasWorkspace) return `// ${path} (no workspace)`;
    const data = await gh.getFile(owner, repo, path, branch);
    return data.encoding === "base64" ? atob(data.content) : data.content;
  };

  // ── Issues (powered by useReachIssues — no GitHub dependency) ──
  // loadIssues, createIssue, updateIssue all come from reachIssues hook

  // ── Commits ────────────────────────────────
  const loadCommits = async () => {
    if (!owner || !repo) return;
    setCommitsLoading(true);
    try { setCommits(await gh.listCommits(owner, repo, branch)); } catch (err) { console.error(err); }
    finally { setCommitsLoading(false); }
  };

  const loadCommitDetail = async (sha: string): Promise<GitCommitDetail> => gh.getCommitDetail(owner, repo, sha);

  // ── Search ─────────────────────────────────
  const searchCode = async (query: string): Promise<GitSearchResult> => gh.searchCode(owner, repo, query);

  // ── Collaborators ──────────────────────────
  const loadCollaborators = async () => {
    if (!owner || !repo) return;
    try { setCollaborators(await gh.listCollaborators(owner, repo)); } catch { /* non-critical */ }
  };

  // ── Sync GitHub PRs → Supabase ─────────────
  const syncGitHubPRs = useCallback(async () => {
    if (!owner || !repo || !workspace.activeWorkspace?.id || !user) return;
    const wsId = workspace.activeWorkspace.id;
    try {
      const ghPRs = await gh.listPRs(owner, repo, "all");
      // Get existing github PR numbers for this workspace
      const { data: existing } = await supabase
        .from("reach_pull_requests")
        .select("id, github_pr_number")
        .eq("workspace_id", wsId)
        .not("github_pr_number", "is", null);
      const existingNums = new Set((existing || []).map((r: any) => r.github_pr_number));

      for (const pr of ghPRs) {
        const status = pr.state === "closed" && (pr as any).merged_at ? "merged" : pr.state as "open" | "closed";
        const payload = {
          workspace_id: wsId,
          title: pr.title,
          body: pr.body || null,
          status,
          source_branch: pr.head.ref,
          target_branch: pr.base.ref,
          github_pr_number: pr.number,
          github_synced_at: new Date().toISOString(),
          merged_at: (pr as any).merged_at || null,
          closed_at: pr.closed_at || null,
        };
        if (existingNums.has(pr.number)) {
          await supabase.from("reach_pull_requests").update(payload)
            .eq("workspace_id", wsId).eq("github_pr_number", pr.number);
        } else {
          await supabase.from("reach_pull_requests").insert({ ...payload, created_by: user.id });
          existingNums.add(pr.number);
        }
      }
    } catch (err) { console.error("[syncGitHubPRs]", err); }
  }, [owner, repo, workspace.activeWorkspace?.id, user]);

  // ── Sync GitHub Milestones → Supabase ──────
  const syncGitHubMilestones = useCallback(async () => {
    if (!owner || !repo || !workspace.activeWorkspace?.id || !user) return;
    const wsId = workspace.activeWorkspace.id;
    try {
      const [open, closed] = await Promise.all([
        gh.listMilestones(owner, repo, "open"),
        gh.listMilestones(owner, repo, "closed"),
      ]);
      const { data: existing } = await supabase
        .from("reach_milestones")
        .select("id, github_milestone_number")
        .eq("workspace_id", wsId)
        .not("github_milestone_number", "is", null);
      const existingNums = new Set((existing || []).map((r: any) => r.github_milestone_number));

      for (const ms of [...open, ...closed]) {
        const payload = {
          workspace_id: wsId,
          title: ms.title,
          description: ms.description || null,
          due_date: ms.due_on ? ms.due_on.slice(0, 10) : null,
          status: ms.state as "open" | "closed",
          closed_at: ms.closed_at || null,
          github_milestone_number: ms.number,
          github_synced_at: new Date().toISOString(),
        };
        if (existingNums.has(ms.number)) {
          await supabase.from("reach_milestones").update(payload)
            .eq("workspace_id", wsId).eq("github_milestone_number", ms.number);
        } else {
          await supabase.from("reach_milestones").insert({ ...payload, created_by: user.id });
          existingNums.add(ms.number);
        }
      }
    } catch (err) { console.error("[syncGitHubMilestones]", err); }
  }, [owner, repo, workspace.activeWorkspace?.id, user]);

  // ── Load data per view ─────────────────────
  useEffect(() => {
    // All local-first Supabase loads
    if (activeView === "home" || activeView === "issues") reachIssues.loadIssues();
    if (activeView === "home" || activeView === "activity") reachActivity.load();
    if (activeView === "home" || activeView === "prs") {
      reachPRs.load();
      if (owner && repo) syncGitHubPRs().then(() => reachPRs.load());
    }
    if (activeView === "home" || activeView === "milestones") {
      reachMilestones.load();
      if (owner && repo) syncGitHubMilestones().then(() => reachMilestones.load());
    }
    // GitHub-dependent loads only when repo is connected
    if (!owner || !repo) return;
    if (activeView === "files") loadCommits();
    if (activeView === "settings") loadCollaborators();
  }, [activeView, owner, repo, branch, hasWorkspace, workspace.activeWorkspace?.id]);

  // ── Workspace creation ─────────────────────
  const handleCreateWorkspace = async (name: string, ghOwner: string, ghRepo: string) => {
    await workspace.createWorkspace(name, ghOwner, ghRepo);
    setShowRepoModal(false);
  };

  const dirtyCount = tabs.filter(t => t.dirty).length;

  // ── No-workspace guard (only for workspace-scoped features) ──
  const hasGitHub = !!(owner && repo);

  const CreateWorkspacePrompt = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-3">
      <span className="text-xs text-white/30">Create a workspace to get started</span>
      <button onClick={() => setShowRepoModal(true)}
        className="text-[10px] py-1.5 px-3 rounded border border-dashed border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-colors">
        + New Workspace
      </button>
    </div>
  );

  const NoGitHubNotice = () => (
    <div className="px-4 py-2 bg-yellow-500/5 border-b border-yellow-500/10">
      <span className="text-[10px] text-yellow-400/60">No repository connected — connect one in Settings to enable this feature</span>
    </div>
  );

  // ── Render content based on active view ────
  const renderContent = () => {
    if (activeView === "home") {
      return (
        <ReachHomeDashboard
          displayName={displayName}
          hasWorkspace={hasWorkspace}
          onConnectRepo={() => setShowRepoModal(true)}
          issues={reachIssues.issues}
          commits={commits}
          pulls={reachPRs.pullRequests}
          unreadMessages={unreadCount}
          onNavigate={(view) => setActiveView(view as ReachView)}
        />
      );
    }

    if (activeView === "files") {
      if (!hasWorkspace) return <CreateWorkspacePrompt />;
      if (!hasGitHub) return <div className="flex-1 flex flex-col"><NoGitHubNotice /><div className="flex-1 flex items-center justify-center"><span className="text-xs text-white/30">Connect a repository in Settings to browse files</span></div></div>;
      const dirtyTabsForStaging = tabs.filter(t => t.dirty).map(t => ({ path: t.path, content: t.content }));
      return (
        <div className="flex h-full overflow-hidden">
          <div className="w-[280px] flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col overflow-hidden">
            {dirtyTabsForStaging.length > 0 && (
              <div className="px-3 py-1.5 border-b border-white/5 flex gap-1">
                <button onClick={() => setShowStaging(false)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${!showStaging ? "bg-blue-600/20 text-blue-400" : "text-white/30 hover:text-white/50"}`}>
                  Explorer
                </button>
                <button onClick={() => setShowStaging(true)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${showStaging ? "bg-blue-600/20 text-blue-400" : "text-white/30 hover:text-white/50"}`}>
                  Staging ({dirtyTabsForStaging.length})
                </button>
              </div>
            )}
            {showStaging && dirtyTabsForStaging.length > 0 ? (
              <IdeStagingPanel
                dirtyFiles={dirtyTabsForStaging}
                branch={branch}
                onCommitMultiple={commitMultipleFiles}
                onDiscardFile={discardFile}
              />
            ) : (
              <IdeFileTree
                owner={owner} repo={repo} branch={branch} setBranch={setBranch}
                branches={branches} onSelectFile={openFile} selectedFile={activeTab}
                onRefresh={loadTree} onCreateBranch={createBranch} tree={tree}
                treeLoading={treeLoading} onNewFile={createNewFile} onDeleteFile={deleteFile}
              />
            )}
          </div>
          <IdeEditor
            tabs={tabs} activeTab={activeTab} onTabSelect={setActiveTab} onTabClose={closeTab}
            onContentChange={updateContent}
            onCommit={(path) => {
              setCommitTargetPaths([path]);
              setShowCommitModal(true);
            }}
            branch={branch}
            onlineUsers={onlineUsers} owner={owner} repo={repo}
          />
        </div>
      );
    }

    // All views are accessible — no GitHub gate. Views that need GitHub show empty states.
    if (!hasWorkspace) return <CreateWorkspacePrompt />;

    switch (activeView) {
      case "issues":
        if (selectedIssue) {
          return (
            <IdeIssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)}
              onUpdateIssue={async (id, updates) => {
                const updated = await reachIssues.updateIssue(id, updates);
                setSelectedIssue(updated);
              }} />
          );
        }
        return (
          <div className="flex flex-col h-full">
            {/* Sub-view tabs: List / Kanban */}
            <div className="px-3 py-1.5 border-b border-white/5 flex gap-2">
              <button onClick={() => setIssueSubView("list")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${
                  issueSubView === "list" ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60"
                }`}>
                <List size={12} /> List
              </button>
              <button onClick={() => setIssueSubView("kanban")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${
                  issueSubView === "kanban" ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60"
                }`}>
                <LayoutDashboard size={12} /> Kanban
              </button>
            </div>
            {issueSubView === "kanban" ? (
              <IdeKanbanBoard
                issues={reachIssues.issues} loading={reachIssues.loading}
                onSelectIssue={setSelectedIssue}
                onUpdateIssue={async (id, updates) => { await reachIssues.updateIssue(id, updates); }}
                onCreateIssue={async (title, body, status) => { await reachIssues.createIssue(title, body, status); }}
              />
            ) : (
              <IdeIssuesPanel issues={reachIssues.issues}
                onCreateIssue={async (title, body, status, priority) => { await reachIssues.createIssue(title, body, status, priority); }}
                loading={reachIssues.loading}
                onSelectIssue={setSelectedIssue} />
            )}
          </div>
        );
      case "activity":
        return (
          <IdeActivityFeed
            entries={reachActivity.entries}
            loading={reachActivity.loading}
            onRefresh={reachActivity.load}
          />
        );
      case "search":
        if (!hasGitHub) return <div className="flex-1 flex flex-col"><NoGitHubNotice /><div className="flex-1 flex items-center justify-center"><span className="text-xs text-white/30">Code search requires a connected repository</span></div></div>;
        return (
          <IdeSearchPanel
            tree={tree}
            onSelectFile={(path) => { openFile(path); setActiveView("files"); }}
            onSearchCode={searchCode}
          />
        );
      case "milestones":
        return (
          <IdeMilestonesPanel
            milestones={reachMilestones.milestones} loading={reachMilestones.loading}
            onCreateMilestone={async (title, desc, due) => { await reachMilestones.create(title, desc, due); }}
            onUpdateMilestone={async (id, updates) => { await reachMilestones.update(id, updates); }}
          />
        );
      case "chat":
        return <IdeChatPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "prs":
        return (
          <IdePullRequestsPanel
            pullRequests={reachPRs.pullRequests}
            loading={reachPRs.loading}
            onSelectPr={setSelectedPr}
            onCreatePr={async (title, source, target, body) => { await reachPRs.create(title, source, target, body); }}
          />
        );
      case "docs":
        return <IdeDocsPanel tree={hasGitHub ? tree : []} onLoadFile={hasGitHub ? loadFileContent : async (p) => `// ${p}`} onOpenInEditor={(path) => { openFile(path); setActiveView("files"); }}
          onSaveDoc={(path, content) => {
            const existing = tabs.find(t => t.path === path);
            if (existing) updateContent(path, content);
            else setTabs(prev => [...prev, { path, content, dirty: true, language: "markdown", loading: false }]);
          }}
          onCreateDoc={hasGitHub ? createNewFile : async (p) => { setTabs(prev => [...prev, { path: p, content: "", dirty: true, language: "markdown", loading: false }]); setActiveTab(p); }} />;
      case "meetings":
        return <IdeVideoRoomsPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "notifications":
        return <IdeNotificationsPanel notifications={notifications} onMarkRead={markRead} onMarkAllRead={markAllRead}
          onNavigate={(type) => {
            const viewMap: Record<string, ReachView> = { issue: "issues", pr: "prs", mention: "chat", chat: "chat", commit: "files" };
            setActiveView(viewMap[type] || "home");
          }} />;
      case "settings":
        return (
          <IdeSettingsPanel workspace={workspace.activeWorkspace!} members={workspace.members}
            onRefreshMembers={workspace.refreshMembers} collaborators={collaborators} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[#0a0a0a] text-white overflow-hidden">
      <ReachActivityBar
        activeView={activeView}
        setActiveView={setActiveView}
        unreadCount={unreadCount}
        onlineCount={onlineUsers.length}
        dirtyCount={dirtyCount}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ReachTopBar
          workspace={workspace.activeWorkspace}
          workspaces={workspace.workspaces}
          onSelectWorkspace={workspace.setActiveWorkspace}
          user={user}
        />

        <main className="flex-1 overflow-hidden flex flex-col">
          {workspace.loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          ) : (
            renderContent()
          )}
        </main>

        {/* Status bar with presence */}
        {hasWorkspace && onlineUsers.length > 0 && (
          <div className="h-6 border-t border-white/5 bg-[#080808] px-3 flex items-center gap-2 flex-shrink-0">
            <span className="text-[9px] text-white/20">Online:</span>
            <div className="flex items-center gap-1">
              {onlineUsers.slice(0, 8).map(u => (
                <div key={u.user_id} className="flex items-center gap-1" title={`${u.email}${u.active_file ? ` — ${u.active_file}` : ""}`}>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[9px] text-white/30">{u.email.split("@")[0]}</span>
                </div>
              ))}
            </div>
            <div className="flex-1" />
            <span className="text-[9px] text-white/15">{branch}</span>
          </div>
        )}
      </div>

      {showRepoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[800px] max-h-[600px] rounded-xl border border-white/10 overflow-hidden flex flex-col bg-[#0a0a0a]">
            <WorkspaceSetup
              onCreateWorkspace={handleCreateWorkspace}
              onClose={() => setShowRepoModal(false)}
            />
          </div>
        </div>
      )}

      <IdeCommitModal
        open={showCommitModal}
        onClose={() => { setShowCommitModal(false); setCommitError(null); }}
        onCommit={(message) => commitWithProgress(commitTargetPaths, message)}
        branch={branch}
        stagedFiles={commitTargetPaths}
        commitStep={commitStep}
        commitError={commitError}
        committing={commitCommitting}
      />

      <IdeCommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        tree={tree}
        onSelectFile={(path) => { openFile(path); setActiveView("files"); setCommandPaletteOpen(false); }}
        onSetViewMode={(mode) => {
          const mapping: Record<string, ReachView> = {
            explorer: "files", search: "search", issues: "issues", kanban: "issues",
            chat: "chat", commits: "files", pulls: "prs", milestones: "milestones",
            notifications: "notifications", settings: "settings", docs: "docs",
            activity: "activity", staging: "files", video: "meetings",
          };
          setActiveView(mapping[mode] || "home");
        }}
        dirtyCount={dirtyCount}
      />
    </div>
  );
}
