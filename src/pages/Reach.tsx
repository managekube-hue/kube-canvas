import { useState, useEffect, useCallback } from "react";
import { ReachActivityBar, type ReachView } from "@/components/reach/ReachActivityBar";
import { ReachTopBar } from "@/components/reach/ReachTopBar";
import { ReachHomeDashboard } from "@/components/reach/ReachHomeDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useReachWorkspace } from "@/hooks/useReachWorkspace";
import { useReachPresence } from "@/hooks/useReachPresence";
import { useReachNotifications } from "@/hooks/useReachNotifications";
import { useGitHub, type GitIssue, type GitPullRequest, type GitMilestone, type GitLabel, type GitCollaborator, type GitCommitDetail, type GitSearchResult } from "@/hooks/useGitHub";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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

  // ── Issues ─────────────────────────────────
  const [issues, setIssues] = useState<GitIssue[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<GitIssue | null>(null);
  const [availableLabels, setAvailableLabels] = useState<GitLabel[]>([]);
  const [availableAssignees, setAvailableAssignees] = useState<Array<{ login: string; avatar_url: string }>>([]);

  // ── PRs ────────────────────────────────────
  const [pulls, setPulls] = useState<GitPullRequest[]>([]);
  const [pullsLoading, setPullsLoading] = useState(false);
  const [selectedPr, setSelectedPr] = useState<GitPullRequest | null>(null);

  // ── Milestones ─────────────────────────────
  const [milestones, setMilestones] = useState<GitMilestone[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(false);

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
        const tab = tabs.find(t => t.path === activeTab && t.dirty);
        if (tab) commitFile(tab.path, `Update ${tab.path.split("/").pop()}`);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tabs, activeTab, hasWorkspace]);

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
    } catch (err) { console.error("[Reach] Commit failed:", err); }
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
    } catch (err) { console.error("[Reach] Multi-file commit failed:", err); }
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

  // ── Issues ─────────────────────────────────
  const loadIssues = async () => {
    if (!owner || !repo) return;
    setIssuesLoading(true);
    try { setIssues(await gh.listIssues(owner, repo, "all")); } catch (err) { console.error(err); }
    finally { setIssuesLoading(false); }
  };

  const loadLabelsAndAssignees = async () => {
    if (!owner || !repo) return;
    try {
      const [labels, assignees] = await Promise.all([gh.getLabels(owner, repo), gh.getAssignees(owner, repo)]);
      setAvailableLabels(labels); setAvailableAssignees(assignees);
    } catch { /* non-critical */ }
  };

  const createIssue = async (title: string, body: string) => { if (!hasWorkspace) return; await gh.createIssue(owner, repo, title, body); loadIssues(); };
  const updateIssue = async (num: number, updates: { state?: string; assignees?: string[]; labels?: string[] }) => {
    if (!hasWorkspace) return;
    const updated = await gh.updateIssue(owner, repo, num, updates);
    setIssues(prev => prev.map(i => i.number === num ? { ...i, ...updated } : i));
    if (selectedIssue?.number === num) setSelectedIssue(prev => prev ? { ...prev, ...updated } : null);
  };

  // ── PRs ────────────────────────────────────
  const loadPulls = async () => {
    if (!owner || !repo) return;
    setPullsLoading(true);
    try { setPulls(await gh.listPRs(owner, repo, "all")); } catch (err) { console.error(err); }
    finally { setPullsLoading(false); }
  };

  const createPr = async (title: string, head: string, base: string, body: string) => {
    if (!hasWorkspace) return;
    await gh.createPR(owner, repo, title, head, base, body); loadPulls();
  };

  const mergePr = async (num: number, method: "merge" | "squash" | "rebase") => {
    if (!hasWorkspace) return;
    await gh.mergePR(owner, repo, num, undefined, method); loadPulls();
  };

  // ── Milestones ─────────────────────────────
  const loadMilestones = async () => {
    if (!owner || !repo) return;
    setMilestonesLoading(true);
    try { setMilestones(await gh.listMilestones(owner, repo, "open")); } catch (err) { console.error(err); }
    finally { setMilestonesLoading(false); }
  };

  const createMilestone = async (title: string, desc: string, dueOn?: string) => {
    if (!hasWorkspace) return;
    await gh.createMilestone(owner, repo, title, desc, dueOn); loadMilestones();
  };

  const updateMilestone = async (num: number, updates: { state?: string }) => {
    if (!hasWorkspace) return;
    await gh.updateMilestone(owner, repo, num, updates); loadMilestones();
  };

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

  // ── Load data per view ─────────────────────
  useEffect(() => {
    if (!hasWorkspace) return;
    if (activeView === "issues") { loadIssues(); loadLabelsAndAssignees(); }
    if (activeView === "prs") loadPulls();
    if (activeView === "settings") loadCollaborators();
  }, [activeView, owner, repo, branch, hasWorkspace]);

  // ── Workspace creation ─────────────────────
  const handleCreateWorkspace = async (name: string, ghOwner: string, ghRepo: string) => {
    await workspace.createWorkspace(name, ghOwner, ghRepo);
    setShowRepoModal(false);
  };

  const dirtyCount = tabs.filter(t => t.dirty).length;

  // ── No-workspace guard for panels ──────────
  const ConnectPrompt = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-3">
      <span className="text-xs text-white/30">Connect a GitHub workspace to use this panel</span>
      <button onClick={() => setShowRepoModal(true)}
        className="text-[10px] py-1.5 px-3 rounded border border-dashed border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-colors">
        + Connect Workspace
      </button>
    </div>
  );

  // ── Render content based on active view ────
  const renderContent = () => {
    // HOME — always works, no workspace needed
    if (activeView === "home") {
      return (
        <ReachHomeDashboard
          displayName={displayName}
          hasWorkspace={hasWorkspace}
          onConnectRepo={() => setShowRepoModal(true)}
        />
      );
    }

    // FILES — full IDE layout with sidebar + editor
    if (activeView === "files") {
      if (!hasWorkspace) {
        return <ConnectPrompt />;
      }
      return (
        <div className="flex h-full overflow-hidden">
          <div className="w-[280px] flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col overflow-hidden">
            <IdeFileTree
              owner={owner} repo={repo} branch={branch} setBranch={setBranch}
              branches={branches} onSelectFile={openFile} selectedFile={activeTab}
              onRefresh={loadTree} onCreateBranch={createBranch} tree={tree}
              treeLoading={treeLoading} onNewFile={createNewFile} onDeleteFile={deleteFile}
            />
          </div>
          <IdeEditor
            tabs={tabs} activeTab={activeTab} onTabSelect={setActiveTab} onTabClose={closeTab}
            onContentChange={updateContent} onCommit={commitFile} branch={branch}
            onlineUsers={onlineUsers} owner={owner} repo={repo}
          />
        </div>
      );
    }

    // All other views need a workspace
    if (!hasWorkspace) return <ConnectPrompt />;

    switch (activeView) {
      case "issues":
        return selectedIssue ? (
          <IdeIssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)}
            onLoadComments={(num) => gh.getIssueComments(owner, repo, num)}
            onAddComment={(num, body) => gh.createIssueComment(owner, repo, num, body).then(() => {})}
            onUpdateIssue={updateIssue}
            availableLabels={availableLabels} availableAssignees={availableAssignees} />
        ) : (
          <IdeIssuesPanel issues={issues.filter(i => i.state === "open")} onCreateIssue={createIssue} loading={issuesLoading}
            onSelectIssue={setSelectedIssue} />
        );
      case "chat":
        return <IdeChatPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "prs":
        return selectedPr ? (
          <IdePrReviewPanel pr={selectedPr} onBack={() => setSelectedPr(null)}
            onLoadFiles={(num) => gh.getPRFiles(owner, repo, num)}
            onLoadComments={(num) => gh.getPRComments(owner, repo, num)}
            onLoadReviews={(num) => gh.getPRReviews(owner, repo, num)}
            onAddComment={(num, body) => gh.createPRComment(owner, repo, num, body).then(() => {})}
            onMerge={mergePr}
            onUpdatePr={async (num, updates) => { await gh.updatePR(owner, repo, num, updates); loadPulls(); }} />
        ) : (
          <IdePullRequestsPanel pulls={pulls} loading={pullsLoading}
            onSelectPr={setSelectedPr} onCreatePr={createPr}
            branches={branches} currentBranch={branch} />
        );
      case "docs":
        return <IdeDocsPanel tree={tree} onLoadFile={loadFileContent} onOpenInEditor={(path) => { openFile(path); setActiveView("files"); }}
          onSaveDoc={(path, content) => {
            const existing = tabs.find(t => t.path === path);
            if (existing) updateContent(path, content);
            else setTabs(prev => [...prev, { path, content, dirty: true, language: "markdown", loading: false }]);
          }}
          onCreateDoc={createNewFile} />;
      case "meetings":
        return <IdeVideoRoomsPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "notifications":
        return <IdeNotificationsPanel notifications={notifications} onMarkRead={markRead} onMarkAllRead={markAllRead} />;
      case "settings":
        return <IdeSettingsPanel workspace={workspace.activeWorkspace!} members={workspace.members}
          onRefreshMembers={workspace.refreshMembers} collaborators={collaborators} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[#0a0a0a] text-white overflow-hidden">
      {/* Activity Bar */}
      <ReachActivityBar
        activeView={activeView}
        setActiveView={setActiveView}
        unreadCount={unreadCount}
        onlineCount={onlineUsers.length}
        dirtyCount={dirtyCount}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <ReachTopBar
          workspace={workspace.activeWorkspace}
          workspaces={workspace.workspaces}
          onSelectWorkspace={workspace.setActiveWorkspace}
          user={user}
        />

        {/* Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {workspace.loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>

      {/* Repo connect modal */}
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

      {/* Command Palette */}
      <IdeCommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        tree={tree}
        onSelectFile={(path) => { openFile(path); setActiveView("files"); setCommandPaletteOpen(false); }}
        onSetViewMode={(mode) => {
          // Map old ViewMode to ReachView
          const mapping: Record<string, ReachView> = {
            explorer: "files", search: "files", issues: "issues", kanban: "issues",
            chat: "chat", commits: "files", pulls: "prs", milestones: "issues",
            notifications: "notifications", settings: "settings", docs: "docs",
            activity: "home", staging: "files", video: "meetings",
          };
          setActiveView(mapping[mode] || "home");
        }}
        dirtyCount={dirtyCount}
      />
    </div>
  );
}
