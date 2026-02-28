import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Settings, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/useAuth";
import { useGitHubProxy, type GitIssue, type GitPullRequest, type GitMilestone, type GitLabel, type GitCollaborator, type GitCommitDetail, type GitSearchResult } from "@/hooks/useGitHubProxy";
import { useReachWorkspace } from "@/hooks/useReachWorkspace";
import { useReachPresence } from "@/hooks/useReachPresence";
import { useReachNotifications } from "@/hooks/useReachNotifications";

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
import { IdeCommandPalette } from "@/components/ide/IdeCommandPalette";
import { IdeEditor } from "@/components/ide/IdeEditor";
import { WorkspaceSetup } from "@/components/ide/WorkspaceSetup";
import { Loader2 } from "lucide-react";

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

export default function UidrIde() {
  const { user } = useAuth();
  const workspace = useReachWorkspace();
  const owner = workspace.activeWorkspace?.github_owner || "";
  const repo = workspace.activeWorkspace?.github_repo || "";
  const gh = useGitHubProxy(owner, repo);

  const [viewMode, setViewMode] = useState<ViewMode>("explorer");
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [branch, setBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>([]);
  const [tabs, setTabs] = useState<OpenTab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Issues
  const [issues, setIssues] = useState<GitIssue[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<GitIssue | null>(null);
  const [availableLabels, setAvailableLabels] = useState<GitLabel[]>([]);
  const [availableAssignees, setAvailableAssignees] = useState<Array<{ login: string; avatar_url: string }>>([]);

  // PRs
  const [pulls, setPulls] = useState<GitPullRequest[]>([]);
  const [pullsLoading, setPullsLoading] = useState(false);
  const [selectedPr, setSelectedPr] = useState<GitPullRequest | null>(null);

  // Milestones
  const [milestones, setMilestones] = useState<GitMilestone[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(false);

  // Commits
  const [commits, setCommits] = useState<any[]>([]);
  const [commitsLoading, setCommitsLoading] = useState(false);

  // Collaborators
  const [collaborators, setCollaborators] = useState<GitCollaborator[]>([]);

  // Real-time
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
        const tab = tabs.find(t => t.path === activeTab && t.dirty);
        if (tab) {
          const msg = `Update ${tab.path.split("/").pop()}`;
          commitFile(tab.path, msg);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tabs, activeTab]);

  // ── Load tree ──────────────────────────────
  const loadTree = useCallback(async () => {
    if (!owner || !repo) return;
    setTreeLoading(true);
    try {
      const data = await gh.getTree(branch);
      setTree(buildTree(data.tree));
    } catch (err) { console.error("Failed to load tree:", err); }
    finally { setTreeLoading(false); }
  }, [branch, owner, repo]);

  useEffect(() => { if (owner && repo) loadTree(); }, [loadTree, owner, repo]);

  useEffect(() => {
    if (!owner || !repo) return;
    gh.getBranches().then(b => setBranches(b.map(x => x.name))).catch(console.error);
  }, [owner, repo]);

  // ── File operations ────────────────────────
  const openFile = async (path: string) => {
    if (tabs.find(t => t.path === path)) { setActiveTab(path); return; }
    const newTab: OpenTab = { path, content: "", dirty: false, language: detectLanguage(path), loading: true };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(path);
    try {
      const data = await gh.getFile(path, branch);
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
  };

  const commitFile = async (path: string, message: string) => {
    const tab = tabs.find(t => t.path === path);
    if (!tab) return;
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      const blob = await gh.createBlob(tab.content, "utf-8");
      const newTree = await gh.createTree(refData.object.sha, [{ path, mode: "100644", type: "blob", sha: blob.sha }]);
      const commit = await gh.createCommit(message, newTree.sha, [refData.object.sha]);
      await gh.updateRef(`heads/${branch}`, commit.sha);
      setTabs(prev => prev.map(t => t.path === path ? { ...t, dirty: false } : t));
      loadCommits(); loadTree();
    } catch (err) { console.error("Commit failed:", err); }
  };

  const commitMultipleFiles = async (paths: string[], message: string) => {
    const dirtyTabs = tabs.filter(t => paths.includes(t.path) && t.dirty);
    if (dirtyTabs.length === 0) return;
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      const blobs = await Promise.all(
        dirtyTabs.map(async t => {
          const blob = await gh.createBlob(t.content, "utf-8");
          return { path: t.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
        })
      );
      const newTree = await gh.createTree(refData.object.sha, blobs);
      const commit = await gh.createCommit(message, newTree.sha, [refData.object.sha]);
      await gh.updateRef(`heads/${branch}`, commit.sha);
      setTabs(prev => prev.map(t => paths.includes(t.path) ? { ...t, dirty: false } : t));
      loadCommits(); loadTree();
    } catch (err) { console.error("Multi-file commit failed:", err); }
  };

  const discardFile = (path: string) => {
    setTabs(prev => prev.filter(t => t.path !== path));
    if (activeTab === path) setActiveTab(null);
  };

  const createNewFile = async (filePath: string) => {
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      const blob = await gh.createBlob("", "utf-8");
      const newTree = await gh.createTree(refData.object.sha, [{ path: filePath, mode: "100644", type: "blob", sha: blob.sha }]);
      const commit = await gh.createCommit(`Create ${filePath}`, newTree.sha, [refData.object.sha]);
      await gh.updateRef(`heads/${branch}`, commit.sha);
      await loadTree(); openFile(filePath);
    } catch (err) { console.error("Create file failed:", err); }
  };

  const deleteFile = async (path: string) => {
    try {
      const fileData = await gh.getFile(path, branch);
      await gh.deleteFile(path, fileData.sha, `Delete ${path}`, branch);
      closeTab(path); loadTree();
    } catch (err) { console.error("Delete file failed:", err); }
  };

  const createBranch = async (name: string) => {
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      await gh.createRef(`refs/heads/${name}`, refData.object.sha);
      setBranches(prev => [...prev, name]);
      setBranch(name);
    } catch (err) { console.error("Create branch failed:", err); }
  };

  // ── Load file content for docs panel ───────
  const loadFileContent = async (path: string): Promise<string> => {
    const data = await gh.getFile(path, branch);
    return data.encoding === "base64" ? atob(data.content) : data.content;
  };

  // ── Issues ─────────────────────────────────
  const loadIssues = async () => {
    if (!owner || !repo) return;
    setIssuesLoading(true);
    try { setIssues(await gh.getIssues("all")); } catch (err) { console.error(err); }
    finally { setIssuesLoading(false); }
  };

  const loadLabelsAndAssignees = async () => {
    if (!owner || !repo) return;
    try {
      const [labels, assignees] = await Promise.all([gh.getLabels(), gh.getAssignees()]);
      setAvailableLabels(labels);
      setAvailableAssignees(assignees);
    } catch { /* non-critical */ }
  };

  const createIssue = async (title: string, body: string) => { await gh.createIssue(title, body); loadIssues(); };
  const updateIssue = async (num: number, updates: { state?: string; assignees?: string[]; labels?: string[] }) => {
    const updated = await gh.updateIssue(num, updates);
    setIssues(prev => prev.map(i => i.number === num ? { ...i, ...updated } : i));
    if (selectedIssue?.number === num) setSelectedIssue(prev => prev ? { ...prev, ...updated } : null);
  };

  // ── PRs ────────────────────────────────────
  const loadPulls = async () => {
    if (!owner || !repo) return;
    setPullsLoading(true);
    try { setPulls(await gh.getPulls("all")); } catch (err) { console.error(err); }
    finally { setPullsLoading(false); }
  };

  const createPr = async (title: string, head: string, base: string, body: string) => {
    await gh.createPull(title, head, base, body); loadPulls();
  };

  const mergePr = async (num: number, method: "merge" | "squash" | "rebase") => {
    await gh.mergePull(num, undefined, method); loadPulls();
  };

  // ── Milestones ─────────────────────────────
  const loadMilestones = async () => {
    if (!owner || !repo) return;
    setMilestonesLoading(true);
    try { setMilestones(await gh.getMilestones("open")); } catch (err) { console.error(err); }
    finally { setMilestonesLoading(false); }
  };

  const createMilestone = async (title: string, desc: string, dueOn?: string) => {
    await gh.createMilestone(title, desc, dueOn); loadMilestones();
  };

  const updateMilestone = async (num: number, updates: { state?: string }) => {
    await gh.updateMilestone(num, updates); loadMilestones();
  };

  // ── Commits ────────────────────────────────
  const loadCommits = async () => {
    if (!owner || !repo) return;
    setCommitsLoading(true);
    try { setCommits(await gh.getCommits(branch)); } catch (err) { console.error(err); }
    finally { setCommitsLoading(false); }
  };

  const loadCommitDetail = async (sha: string): Promise<GitCommitDetail> => gh.getCommitDetail(sha);

  // ── Search ─────────────────────────────────
  const searchCode = async (query: string): Promise<GitSearchResult> => gh.searchCode(query);

  // ── Collaborators ──────────────────────────
  const loadCollaborators = async () => {
    if (!owner || !repo) return;
    try { setCollaborators(await gh.getCollaborators()); } catch { /* non-critical */ }
  };

  // ── Load data per view mode ────────────────
  useEffect(() => {
    if (viewMode === "issues" || viewMode === "kanban") { loadIssues(); loadLabelsAndAssignees(); }
    if (viewMode === "commits") loadCommits();
    if (viewMode === "pulls") loadPulls();
    if (viewMode === "milestones") loadMilestones();
    if (viewMode === "settings") loadCollaborators();
  }, [viewMode, owner, repo, branch]);

  const handleCreateWorkspace = async (name: string, ghOwner: string, ghRepo: string) => {
    await workspace.createWorkspace(name, ghOwner, ghRepo);
  };

  const dirtyCount = tabs.filter(t => t.dirty).length;

  if (workspace.loading) {
    return (
      <UidrLayout>
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 3.5rem)" }}>
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </UidrLayout>
    );
  }

  if (!workspace.activeWorkspace) {
    return (
      <UidrLayout>
        <WorkspaceSetup onCreateWorkspace={handleCreateWorkspace} />
      </UidrLayout>
    );
  }

  const renderSidePanel = () => {
    switch (viewMode) {
      case "explorer":
        return (
          <IdeFileTree owner={owner} repo={repo} branch={branch} setBranch={setBranch}
            branches={branches} onSelectFile={openFile} selectedFile={activeTab}
            onRefresh={loadTree} onCreateBranch={createBranch} tree={tree}
            treeLoading={treeLoading} onNewFile={createNewFile} onDeleteFile={deleteFile} />
        );
      case "search":
        return <IdeSearchPanel tree={tree} onSelectFile={openFile} onSearchCode={searchCode} />;
      case "docs":
        return <IdeDocsPanel tree={tree} onLoadFile={loadFileContent} onOpenInEditor={openFile}
          onSaveDoc={(path, content) => {
            // Update or create the tab with new content so it appears as dirty for staging
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
            onLoadComments={(num) => gh.getIssueComments(num)}
            onAddComment={(num, body) => gh.createIssueComment(num, body).then(() => {})}
            onUpdateIssue={updateIssue}
            availableLabels={availableLabels} availableAssignees={availableAssignees} />
        ) : (
          <IdeIssuesPanel issues={issues.filter(i => i.state === "open")} onCreateIssue={createIssue} loading={issuesLoading}
            onSelectIssue={setSelectedIssue} />
        );
      case "kanban":
        return selectedIssue ? (
          <IdeIssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)}
            onLoadComments={(num) => gh.getIssueComments(num)}
            onAddComment={(num, body) => gh.createIssueComment(num, body).then(() => {})}
            onUpdateIssue={updateIssue}
            availableLabels={availableLabels} availableAssignees={availableAssignees} />
        ) : (
          <IdeKanbanBoard issues={issues} loading={issuesLoading}
            onSelectIssue={setSelectedIssue} onUpdateIssue={updateIssue} onCreateIssue={createIssue} />
        );
      case "staging":
        return <IdeStagingPanel
          dirtyFiles={tabs.filter(t => t.dirty).map(t => ({ path: t.path, content: t.content }))}
          branch={branch}
          onCommitMultiple={commitMultipleFiles}
          onDiscardFile={discardFile}
        />;
      case "pulls":
        return selectedPr ? (
          <IdePrReviewPanel pr={selectedPr} onBack={() => setSelectedPr(null)}
            onLoadFiles={(num) => gh.getPullFiles(num)}
            onLoadComments={(num) => gh.getPullComments(num)}
            onLoadReviews={(num) => gh.getPullReviews(num)}
            onAddComment={(num, body) => gh.createPullComment(num, body).then(() => {})}
            onMerge={mergePr}
            onUpdatePr={async (num, updates) => { await gh.updatePull(num, updates); loadPulls(); }} />
        ) : (
          <IdePullRequestsPanel pulls={pulls} loading={pullsLoading}
            onSelectPr={setSelectedPr} onCreatePr={createPr}
            branches={branches} currentBranch={branch} />
        );
      case "milestones":
        return <IdeMilestonesPanel milestones={milestones} loading={milestonesLoading}
          onCreateMilestone={createMilestone} onUpdateMilestone={updateMilestone} />;
      case "chat":
        return <IdeChatPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "commits":
        return <IdeCommitsPanel commits={commits} loading={commitsLoading} onLoadCommitDetail={loadCommitDetail} />;
      case "activity":
        return <IdeActivityFeed owner={owner} repo={repo}
          onLoadCommits={() => gh.getCommits(branch)}
          onLoadIssueEvents={() => gh.getIssues("all")}
          onLoadPullEvents={() => gh.getPulls("all")} />;
      case "video":
        return <IdeVideoRoomsPanel workspaceId={workspace.activeWorkspace!.id} />;
      case "notifications":
        return <IdeNotificationsPanel notifications={notifications} onMarkRead={markRead} onMarkAllRead={markAllRead} />;
      case "settings":
        return <IdeSettingsPanel workspace={workspace.activeWorkspace!} members={workspace.members}
          onRefreshMembers={workspace.refreshMembers} collaborators={collaborators} />;
    }
  };

  return (
    <UidrLayout>
      <div className="flex" style={{ height: "calc(100vh - 3.5rem)", overflow: "hidden" }}>
        <IdeActivityBar viewMode={viewMode} setViewMode={setViewMode} unreadCount={unreadCount} onlineCount={onlineUsers.length} dirtyCount={dirtyCount} />
        <div className={`${viewMode === "kanban" ? "w-full" : "w-[280px]"} flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col overflow-hidden`}>
          <div className="px-3 py-2 border-b border-white/5">
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
          <div className="flex-1 overflow-hidden flex flex-col">{renderSidePanel()}</div>
        </div>
        {viewMode !== "kanban" && (
          <IdeEditor tabs={tabs} activeTab={activeTab} onTabSelect={setActiveTab} onTabClose={closeTab}
            onContentChange={updateContent} onCommit={commitFile} branch={branch}
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
    </UidrLayout>
  );
}
