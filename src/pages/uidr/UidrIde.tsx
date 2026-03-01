import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Settings, LogOut, Loader2, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGitHub, type GitCollaborator, type GitCommitDetail, type GitSearchResult } from "@/hooks/useGitHub";
import { useReachIssues, type ReachIssue } from "@/hooks/useReachIssues";
import { useReachMilestones } from "@/hooks/useReachMilestones";
import { useReachActivity } from "@/hooks/useReachActivity";
import { useReachPullRequests, type ReachPullRequest } from "@/hooks/useReachPullRequests";
import { useReachWorkspace } from "@/hooks/useReachWorkspace";
import { useReachPresence } from "@/hooks/useReachPresence";
import { useReachNotifications } from "@/hooks/useReachNotifications";
import { useReachFileEditor } from "@/hooks/useReachFileEditor";

import { IdeActivityBar, type ViewMode } from "@/components/ide/IdeActivityBar";
import { IdeFileTree, buildTree, type TreeNode } from "@/components/ide/IdeFileTree";
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
import { IdeAiCopilotPanel } from "@/components/ide/IdeAiCopilotPanel";
import { IdeCommandPalette } from "@/components/ide/IdeCommandPalette";
import { IdeEditor } from "@/components/ide/IdeEditor";
import { IdeLocalFileTree } from "@/components/ide/IdeLocalFileTree";
import { WorkspaceSetup } from "@/components/ide/WorkspaceSetup";

/** Minimal IDE-only shell — no footer, no CTA, full-screen dev environment */
function IdeShell({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  return (
    <div className="h-screen bg-[#0a0a0a] text-white font-sans flex flex-col overflow-hidden">
      <nav className="flex items-center justify-between px-4 h-10 border-b border-white/5 bg-[#0a0a0a] flex-shrink-0">
        <Link to="/uidr" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <Settings size={11} className="text-blue-500" />
          </div>
          <span className="font-bold text-xs tracking-wider text-white">KUBRIC REACH</span>
        </Link>
        <button onClick={() => signOut()} className="flex items-center gap-1.5 text-white/40 hover:text-white text-[11px] transition-colors">
          <LogOut size={12} /> Sign Out
        </button>
      </nav>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

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

/* ── Default scratch files for fresh IDE ─────────────────── */
const DEFAULT_SCRATCH: OpenTab[] = [
  {
    path: "scratch.ts",
    content: [
      "// ═══════════════════════════════════════════════════════════",
      "//  KUBRIC REACH IDE — Local Scratch Pad",
      "// ═══════════════════════════════════════════════════════════",
      "//  → Connect a GitHub workspace via the sidebar to unlock:",
      "//    • File tree, branches, commits",
      "//    • Issues, PRs, Kanban boards",
      "//    • Real-time chat & collaboration",
      "//    • Milestone planning & activity feed",
      "// ═══════════════════════════════════════════════════════════",
      "",
      "interface ReachConfig {",
      "  workspace: string;",
      "  modules: string[];",
      "}",
      "",
      "const config: ReachConfig = {",
      '  workspace: "local",',
      '  modules: ["editor", "terminal", "chat"],',
      "};",
      "",
      'console.log("REACH IDE ready:", config);',
      "",
    ].join("\n"),
    dirty: false,
    language: "typescript",
    loading: false,
  },
];

export default function UidrIde() {
  const { user } = useAuth();
  const workspace = useReachWorkspace();
  const gh = useGitHub();

  const hasWorkspace = !!workspace.activeWorkspace;
  const owner = workspace.activeWorkspace?.github_owner || "";
  const repo = workspace.activeWorkspace?.github_repo || "";

  // Supabase file editor for local-first file storage
  const fileEditor = useReachFileEditor(workspace.activeWorkspace?.id || null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("explorer");
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [branch, setBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>([]);
  const [tabs, setTabs] = useState<OpenTab[]>(DEFAULT_SCRATCH);
  const [activeTab, setActiveTab] = useState<string | null>("scratch.ts");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showWorkspaceSetup, setShowWorkspaceSetup] = useState(false);

  // Issues (local-first)
  const reachIssues = useReachIssues(workspace.activeWorkspace?.id || null);
  const [selectedIssue, setSelectedIssue] = useState<ReachIssue | null>(null);

  // PRs (local-first)
  const reachPRs = useReachPullRequests(workspace.activeWorkspace?.id || null);
  const [selectedPr, setSelectedPr] = useState<ReachPullRequest | null>(null);

  // Milestones (local-first)
  const reachMilestones = useReachMilestones(workspace.activeWorkspace?.id || null);

  // Activity (local-first)
  const reachActivity = useReachActivity(workspace.activeWorkspace?.id || null);

  // Commits
  const [commits, setCommits] = useState<any[]>([]);
  const [commitsLoading, setCommitsLoading] = useState(false);

  // Collaborators
  const [collaborators, setCollaborators] = useState<GitCollaborator[]>([]);

  // Real-time
  const { onlineUsers } = useReachPresence(workspace.activeWorkspace?.id || null, activeTab);
  const { notifications, unreadCount, markRead, markAllRead } = useReachNotifications(workspace.activeWorkspace?.id || null);

  // ── Auto-save to Supabase (debounced) ───────
  const autoSaveToSupabase = useCallback((path: string, content: string) => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(async () => {
      const file = fileEditor.getFileByPath(path);
      if (file) {
        await fileEditor.saveFile(file.id, content);
        setTabs(prev => prev.map(t => t.path === path ? { ...t, dirty: false } : t));
      }
    }, 1500);
  }, [fileEditor]);

  // ── Load Supabase files when workspace changes ──
  useEffect(() => {
    if (workspace.activeWorkspace?.id) {
      fileEditor.load();
    }
  }, [workspace.activeWorkspace?.id]);

  // ── Keyboard shortcuts ─────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === "k") { e.preventDefault(); setCommandPaletteOpen(true); }
      if (meta && e.key === "p" && !e.shiftKey) { e.preventDefault(); setCommandPaletteOpen(true); }
      if (meta && e.key === "s") {
        e.preventDefault();
        if (!hasWorkspace) return;
        const tab = tabs.find(t => t.path === activeTab && t.dirty);
        if (tab) {
          const msg = `Update ${tab.path.split("/").pop()}`;
          commitFile(tab.path, msg);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tabs, activeTab, hasWorkspace]);

  // ── Load tree ──────────────────────────────
  const loadTree = useCallback(async () => {
    if (!owner || !repo) return;
    setTreeLoading(true);
    try {
      const data = await gh.getTree(owner, repo, branch);
      setTree(buildTree(data.tree));
    } catch (err) { console.error("Failed to load tree:", err); }
    finally { setTreeLoading(false); }
  }, [branch, owner, repo]);

  useEffect(() => { if (owner && repo) loadTree(); }, [loadTree, owner, repo]);

  useEffect(() => {
    if (!owner || !repo) return;
    gh.listBranches(owner, repo).then(b => setBranches(b.map(x => x.name))).catch(console.error);
  }, [owner, repo]);

  // ── File operations (Supabase-first, GitHub fallback) ──
  const openFile = async (path: string) => {
    if (tabs.find(t => t.path === path)) { setActiveTab(path); return; }

    // Try Supabase first
    const localFile = fileEditor.getFileByPath(path);
    if (localFile) {
      const newTab: OpenTab = {
        path, content: localFile.content, dirty: false,
        language: localFile.language, loading: false,
      };
      setTabs(prev => [...prev, newTab]);
      setActiveTab(path);
      return;
    }

    // Fall back to GitHub
    const newTab: OpenTab = { path, content: "", dirty: false, language: detectLanguage(path), loading: true };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(path);
    if (!hasWorkspace) {
      setTabs(prev => prev.map(t => t.path === path ? { ...t, content: `// ${path}`, loading: false } : t));
      return;
    }
    try {
      const data = await gh.getFile(owner, repo, path, branch);
      const decoded = data.encoding === "base64" ? atob(data.content) : data.content;
      setTabs(prev => prev.map(t => t.path === path ? { ...t, content: decoded, loading: false } : t));
    } catch { setTabs(prev => prev.map(t => t.path === path ? { ...t, content: `// Error loading ${path}`, loading: false } : t)); }
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
    // Auto-save to Supabase for local files
    autoSaveToSupabase(path, content);
  };

  const commitFile = async (path: string, message: string) => {
    if (!hasWorkspace) return;
    const tab = tabs.find(t => t.path === path);
    if (!tab) return;
    try {
      const refData = await gh.getRef(owner, repo, `heads/${branch}`);
      const blob = await gh.createBlob(owner, repo, tab.content, "utf-8");
      const newTree = await gh.createTree(owner, repo, refData.object.sha, [{ path, mode: "100644", type: "blob", sha: blob.sha }]);
      const commit = await gh.createCommit(owner, repo, message, newTree.sha, [refData.object.sha]);
      await gh.updateRef(owner, repo, `heads/${branch}`, commit.sha);
      setTabs(prev => prev.map(t => t.path === path ? { ...t, dirty: false } : t));
      loadCommits(); loadTree();
    } catch (err) { console.error("Commit failed:", err); }
  };

  const commitMultipleFiles = async (paths: string[], message: string) => {
    if (!hasWorkspace) return;
    const dirtyTabs = tabs.filter(t => paths.includes(t.path) && t.dirty);
    if (dirtyTabs.length === 0) return;
    try {
      const refData = await gh.getRef(owner, repo, `heads/${branch}`);
      const blobs = await Promise.all(
        dirtyTabs.map(async t => {
          const blob = await gh.createBlob(owner, repo, t.content, "utf-8");
          return { path: t.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
        })
      );
      const newTree = await gh.createTree(owner, repo, refData.object.sha, blobs);
      const commit = await gh.createCommit(owner, repo, message, newTree.sha, [refData.object.sha]);
      await gh.updateRef(owner, repo, `heads/${branch}`, commit.sha);
      setTabs(prev => prev.map(t => paths.includes(t.path) ? { ...t, dirty: false } : t));
      loadCommits(); loadTree();
    } catch (err) { console.error("Multi-file commit failed:", err); }
  };

  const discardFile = (path: string) => {
    setTabs(prev => prev.filter(t => t.path !== path));
    if (activeTab === path) setActiveTab(null);
  };

  const createNewFile = async (filePath: string) => {
    // Always create in Supabase if we have a workspace
    if (workspace.activeWorkspace?.id) {
      const file = await fileEditor.createFile(filePath, "");
      if (file) {
        const newTab: OpenTab = { path: filePath, content: "", dirty: false, language: file.language, loading: false };
        setTabs(prev => [...prev, newTab]);
        setActiveTab(filePath);
      }
      return;
    }
    // GitHub path
    if (hasWorkspace) {
      try {
        const refData = await gh.getRef(owner, repo, `heads/${branch}`);
        const blob = await gh.createBlob(owner, repo, "", "utf-8");
        const newTree = await gh.createTree(owner, repo, refData.object.sha, [{ path: filePath, mode: "100644", type: "blob", sha: blob.sha }]);
        const commit = await gh.createCommit(owner, repo, `Create ${filePath}`, newTree.sha, [refData.object.sha]);
        await gh.updateRef(owner, repo, `heads/${branch}`, commit.sha);
        await loadTree(); openFile(filePath);
      } catch (err) { console.error("Create file failed:", err); }
      return;
    }
    // Pure local scratch
    const newTab: OpenTab = { path: filePath, content: "", dirty: true, language: detectLanguage(filePath), loading: false };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(filePath);
  };

  const deleteFile = async (path: string) => {
    // Supabase-first
    const localFile = fileEditor.getFileByPath(path);
    if (localFile) {
      await fileEditor.deleteFile(localFile.id);
      closeTab(path);
      return;
    }
    // GitHub fallback
    if (!hasWorkspace) { closeTab(path); return; }
    try {
      const fileData = await gh.getFile(owner, repo, path, branch);
      await gh.deleteFile(owner, repo, path, fileData.sha, `Delete ${path}`, branch);
      closeTab(path); loadTree();
    } catch (err) { console.error("Delete file failed:", err); }
  };

  const deleteFileById = async (id: string) => {
    const file = fileEditor.files.find(f => f.id === id);
    if (file) {
      await fileEditor.deleteFile(id);
      closeTab(file.path);
    }
  };

  const createBranch = async (name: string) => {
    if (!hasWorkspace) return;
    try {
      const refData = await gh.getRef(owner, repo, `heads/${branch}`);
      await gh.createRef(owner, repo, `refs/heads/${name}`, refData.object.sha);
      setBranches(prev => [...prev, name]);
      setBranch(name);
    } catch (err) { console.error("Create branch failed:", err); }
  };

  // ── Load file content for docs panel ───────
  const loadFileContent = async (path: string): Promise<string> => {
    if (!hasWorkspace) return `// ${path} (local mode)`;
    const data = await gh.getFile(owner, repo, path, branch);
    return data.encoding === "base64" ? atob(data.content) : data.content;
  };

  // ── Issues (local-first via useReachIssues) ──

  // ── PRs, Milestones, Activity all from Supabase hooks ──

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

  // ── Load data per view mode ────────────────
  useEffect(() => {
    if (viewMode === "issues" || viewMode === "kanban") reachIssues.loadIssues();
    if (viewMode === "pulls") reachPRs.load();
    if (viewMode === "milestones") reachMilestones.load();
    if (viewMode === "activity") reachActivity.load();
    if (!owner || !repo) return;
    if (viewMode === "commits") loadCommits();
    if (viewMode === "settings") loadCollaborators();
  }, [viewMode, owner, repo, branch, hasWorkspace]);

  const handleCreateWorkspace = async (name: string, ghOwner: string, ghRepo: string) => {
    await workspace.createWorkspace(name, ghOwner, ghRepo);
    setShowWorkspaceSetup(false);
  };

  const handleBackToRepos = () => {
    workspace.setActiveWorkspace(null);
    setShowWorkspaceSetup(true);
  };

  const dirtyCount = tabs.filter(t => t.dirty).length;

  if (workspace.loading) {
    return (
      <IdeShell>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </IdeShell>
    );
  }

  // ── Workspace setup (optional, not blocking) ──
  if (showWorkspaceSetup || (!hasWorkspace && workspace.workspaces.length === 0)) {
    return (
      <IdeShell>
        <WorkspaceSetup
          onCreateWorkspace={handleCreateWorkspace}
          onClose={hasWorkspace ? () => setShowWorkspaceSetup(false) : undefined}
        />
      </IdeShell>
    );
  }

  /* ── Reusable prompt when no workspace connected ── */
  const ConnectWorkspacePrompt = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-3">
      <span className="text-xs text-white/30">Connect a GitHub workspace to use this panel</span>
      <button onClick={() => setShowWorkspaceSetup(true)}
        className="text-[10px] py-1.5 px-3 rounded border border-dashed border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-colors">
        + Connect Workspace
      </button>
    </div>
  );

  /* ── Local-only side panel — uses Supabase reach_files ── */
  const renderLocalExplorer = () => (
    <IdeLocalFileTree
      files={fileEditor.files}
      loading={fileEditor.loading}
      selectedFile={activeTab}
      onSelectFile={openFile}
      onCreateFile={createNewFile}
      onCreateFolder={async (path) => { await fileEditor.createFolder(path); }}
      onDeleteFile={deleteFileById}
      onRefresh={fileEditor.load}
    />
  );

  const renderSidePanel = () => {
    // ── Panels that work WITHOUT a workspace ──
    if (viewMode === "explorer") {
      if (hasWorkspace && owner && repo) {
        return (
          <IdeFileTree owner={owner} repo={repo} branch={branch} setBranch={setBranch}
            branches={branches} onSelectFile={openFile} selectedFile={activeTab}
            onRefresh={loadTree} onCreateBranch={createBranch} tree={tree}
            treeLoading={treeLoading} onNewFile={createNewFile} onDeleteFile={deleteFile} />
        );
      }
      return renderLocalExplorer();
    }

    if (viewMode === "ai") {
      return <IdeAiCopilotPanel workspaceId={workspace.activeWorkspace?.id || "local"} activeFile={activeTab} />;
    }

    if (viewMode === "chat") {
      return <IdeChatPanel workspaceId={workspace.activeWorkspace?.id || "local"} />;
    }

    if (viewMode === "video") {
      return <IdeVideoRoomsPanel workspaceId={workspace.activeWorkspace?.id || "local"} />;
    }

    if (viewMode === "notifications") {
      return <IdeNotificationsPanel notifications={notifications} onMarkRead={markRead} onMarkAllRead={markAllRead} />;
    }

    // ── Panels that require a workspace ──
    if (!hasWorkspace) return <ConnectWorkspacePrompt />;

    switch (viewMode) {
      case "search":
        return <IdeSearchPanel tree={tree} onSelectFile={openFile} onSearchCode={searchCode} />;
      case "docs":
        return <IdeDocsPanel tree={tree} onLoadFile={loadFileContent} onOpenInEditor={openFile}
          onSaveDoc={(path, content) => {
            const existing = tabs.find(t => t.path === path);
            if (existing) {
              updateContent(path, content);
            } else {
              setTabs(prev => [...prev, { path, content, dirty: true, language: "markdown", loading: false }]);
            }
          }}
          onCreateDoc={createNewFile} />;
      case "issues":
        return selectedIssue ? (
          <IdeIssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)}
            onUpdateIssue={async (id, updates) => { const u = await reachIssues.updateIssue(id, updates); setSelectedIssue(u); }} />
        ) : (
          <IdeIssuesPanel issues={reachIssues.issues} onCreateIssue={async (t, b, s, p) => { await reachIssues.createIssue(t, b, s, p); }} loading={reachIssues.loading}
            onSelectIssue={setSelectedIssue} />
        );
      case "kanban":
        return selectedIssue ? (
          <IdeIssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)}
            onUpdateIssue={async (id, updates) => { const u = await reachIssues.updateIssue(id, updates); setSelectedIssue(u); }} />
        ) : (
          <IdeKanbanBoard issues={reachIssues.issues} loading={reachIssues.loading}
            onSelectIssue={setSelectedIssue}
            onUpdateIssue={async (id, updates) => { await reachIssues.updateIssue(id, updates); }}
            onCreateIssue={async (t, b, s) => { await reachIssues.createIssue(t, b, s); }} />
        );
      case "staging":
        return <IdeStagingPanel
          dirtyFiles={tabs.filter(t => t.dirty).map(t => ({ path: t.path, content: t.content }))}
          branch={branch}
          onCommitMultiple={commitMultipleFiles}
          onDiscardFile={discardFile}
        />;
      case "pulls":
        return (
          <IdePullRequestsPanel
            pullRequests={reachPRs.pullRequests}
            loading={reachPRs.loading}
            onSelectPr={setSelectedPr}
            onCreatePr={async (title, source, target, body) => { await reachPRs.create(title, source, target, body); }}
          />
        );
      case "milestones":
        return <IdeMilestonesPanel milestones={reachMilestones.milestones} loading={reachMilestones.loading}
          onCreateMilestone={async (title, desc, due) => { await reachMilestones.create(title, desc, due); }}
          onUpdateMilestone={async (id, updates) => { await reachMilestones.update(id, updates); }} />;
      case "commits":
        return <IdeCommitsPanel commits={commits} loading={commitsLoading} onLoadCommitDetail={loadCommitDetail} />;
      case "activity":
        return <IdeActivityFeed entries={reachActivity.entries} loading={reachActivity.loading} onRefresh={reachActivity.load} />;
      case "settings":
        return <IdeSettingsPanel workspace={workspace.activeWorkspace!} members={workspace.members}
          onRefreshMembers={workspace.refreshMembers} collaborators={collaborators} />;
    }
  };

  return (
    <IdeShell>
      <div className="flex h-full overflow-hidden">
        <IdeActivityBar viewMode={viewMode} setViewMode={setViewMode} unreadCount={unreadCount} onlineCount={onlineUsers.length} dirtyCount={dirtyCount} />
        <div className={`${viewMode === "kanban" && hasWorkspace ? "w-full" : "w-[280px]"} flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col overflow-hidden`}>
          {hasWorkspace && (
            <div className="px-3 py-2 border-b border-white/5 space-y-1.5">
              <button onClick={handleBackToRepos}
                className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition-colors">
                ← Repositories
              </button>
              <select value={workspace.activeWorkspace?.id || ""}
                onChange={(e) => {
                  const ws = workspace.workspaces.find(w => w.id === e.target.value);
                  if (ws) workspace.setActiveWorkspace(ws);
                }}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none truncate">
                {workspace.workspaces.map(ws => (
                  <option key={ws.id} value={ws.id} className="bg-[#0c0c0c]">{ws.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex-1 overflow-hidden flex flex-col">{renderSidePanel()}</div>
        </div>
        {viewMode !== "kanban" && (
          <IdeEditor tabs={tabs} activeTab={activeTab} onTabSelect={setActiveTab} onTabClose={closeTab}
            onContentChange={updateContent} onCommit={(path) => commitFile(path, `Update ${path.split("/").pop()}`)} branch={branch}
            onlineUsers={onlineUsers} owner={owner} repo={repo} />
        )}
      </div>

      {/* Command Palette */}
      <IdeCommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        tree={tree}
        onSelectFile={(path) => { openFile(path); setCommandPaletteOpen(false); }}
        onSetViewMode={setViewMode}
        dirtyCount={dirtyCount}
      />
    </IdeShell>
  );
}
