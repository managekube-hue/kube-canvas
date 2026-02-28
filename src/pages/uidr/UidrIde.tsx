import { useState, useEffect, useCallback } from "react";
import { UidrLayout } from "@/components/UidrLayout";
import {
  FileCode, FolderTree, GitBranch, MessageSquare, Bug,
  ChevronRight, ChevronDown, File, Folder, Loader2,
  Send, Hash, Bell, Users, Settings, Plus, Search,
  RefreshCw,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useGitHubProxy, type GitTreeItem } from "@/hooks/useGitHubProxy";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";

// ── Config ──────────────────────────────────
const GH_OWNER = "managekube-hue";
const GH_REPO = "Kubric-UiDR";

type ViewMode = "explorer" | "issues" | "chat" | "commits" | "notifications";

// ── File Tree Node ──────────────────────────
interface TreeNode {
  name: string;
  path: string;
  type: "blob" | "tree";
  children: TreeNode[];
  sha: string;
}

function buildTree(items: GitTreeItem[]): TreeNode[] {
  const root: TreeNode[] = [];
  const map = new Map<string, TreeNode>();

  // Sort: folders first, then alpha
  const sorted = [...items].sort((a, b) => {
    if (a.type !== b.type) return a.type === "tree" ? -1 : 1;
    return a.path.localeCompare(b.path);
  });

  for (const item of sorted) {
    const parts = item.path.split("/");
    const node: TreeNode = {
      name: parts[parts.length - 1],
      path: item.path,
      type: item.type,
      children: [],
      sha: item.sha,
    };
    map.set(item.path, node);

    if (parts.length === 1) {
      root.push(node);
    } else {
      const parentPath = parts.slice(0, -1).join("/");
      const parent = map.get(parentPath);
      if (parent) parent.children.push(node);
      else root.push(node);
    }
  }
  return root;
}

// ── FileTreeView Component ──────────────────
function FileTreeView({
  nodes,
  onSelect,
  selectedPath,
  depth = 0,
}: {
  nodes: TreeNode[];
  onSelect: (path: string) => void;
  selectedPath: string | null;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  return (
    <div>
      {nodes.map((node) => (
        <div key={node.path}>
          <button
            onClick={() =>
              node.type === "tree" ? toggle(node.path) : onSelect(node.path)
            }
            className={`flex items-center gap-1.5 w-full px-2 py-1 text-xs hover:bg-white/5 rounded transition-colors ${
              selectedPath === node.path ? "bg-blue-500/15 text-blue-400" : "text-white/70"
            }`}
            style={{ paddingLeft: `${depth * 14 + 8}px` }}
          >
            {node.type === "tree" ? (
              expanded.has(node.path) ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronRight size={12} />
              )
            ) : (
              <span className="w-3" />
            )}
            {node.type === "tree" ? (
              <Folder size={13} className="text-blue-400/60" />
            ) : (
              <File size={13} className="text-white/40" />
            )}
            <span className="truncate">{node.name}</span>
          </button>
          {node.type === "tree" && expanded.has(node.path) && (
            <FileTreeView
              nodes={node.children}
              onSelect={onSelect}
              selectedPath={selectedPath}
              depth={depth + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main IDE Component ──────────────────────
export default function UidrIde() {
  const gh = useGitHubProxy(GH_OWNER, GH_REPO);
  const { user } = useAuth();

  // State
  const [viewMode, setViewMode] = useState<ViewMode>("explorer");
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [treeLoading, setTreeLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [branch, setBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>([]);
  const [language, setLanguage] = useState("plaintext");
  const [dirty, setDirty] = useState(false);

  // Chat state
  const [channels, setChannels] = useState<Array<{ id: string; name: string }>>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ id: string; body: string; user_id: string; created_at: string }>>([]);
  const [chatInput, setChatInput] = useState("");

  // Issues state
  const [issues, setIssues] = useState<Array<{ number: number; title: string; state: string; labels: Array<{ name: string; color: string }>; user: { login: string; avatar_url: string }; created_at: string }>>([]);

  // Commits state
  const [commits, setCommits] = useState<Array<{ sha: string; commit: { message: string; author: { name: string; date: string } }; author?: { avatar_url: string; login: string } }>>([]);

  // ── Load tree ─────────────────────────────
  const loadTree = useCallback(async () => {
    setTreeLoading(true);
    try {
      const data = await gh.getTree(branch);
      setTree(buildTree(data.tree));
    } catch (err) {
      console.error("Failed to load tree:", err);
    } finally {
      setTreeLoading(false);
    }
  }, [branch]);

  useEffect(() => { loadTree(); }, [loadTree]);

  // ── Load branches ─────────────────────────
  useEffect(() => {
    gh.getBranches()
      .then((b) => setBranches(b.map((x) => x.name)))
      .catch(console.error);
  }, []);

  // ── Load file ─────────────────────────────
  const openFile = async (path: string) => {
    setSelectedFile(path);
    setFileLoading(true);
    setDirty(false);
    try {
      const data = await gh.getFile(path, branch);
      const decoded = data.encoding === "base64" ? atob(data.content) : data.content;
      setFileContent(decoded);
      setLanguage(detectLanguage(path));
    } catch (err) {
      console.error("Failed to load file:", err);
      setFileContent(`// Error loading ${path}`);
    } finally {
      setFileLoading(false);
    }
  };

  // ── Load issues ───────────────────────────
  const loadIssues = async () => {
    try {
      const data = await gh.getIssues("open");
      setIssues(data);
    } catch (err) {
      console.error("Failed to load issues:", err);
    }
  };

  // ── Load commits ──────────────────────────
  const loadCommits = async () => {
    try {
      const data = await gh.getCommits(branch);
      setCommits(data);
    } catch (err) {
      console.error("Failed to load commits:", err);
    }
  };

  // ── Load channels / messages ──────────────
  const loadChannels = async () => {
    const { data } = await supabase
      .from("reach_channels")
      .select("id, name")
      .eq("type", "channel")
      .order("created_at");
    if (data) {
      setChannels(data);
      if (!activeChannel && data.length > 0) setActiveChannel(data[0].id);
    }
  };

  const loadMessages = async (channelId: string) => {
    const { data } = await supabase
      .from("reach_messages")
      .select("id, body, user_id, created_at")
      .eq("channel_id", channelId)
      .order("created_at", { ascending: true })
      .limit(100);
    if (data) setMessages(data);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !activeChannel || !user) return;
    // Need workspace_id — get from channel
    const { data: ch } = await supabase
      .from("reach_channels")
      .select("workspace_id")
      .eq("id", activeChannel)
      .single();
    if (!ch) return;

    await supabase.from("reach_messages").insert({
      channel_id: activeChannel,
      workspace_id: ch.workspace_id,
      user_id: user.id,
      body: chatInput.trim(),
    });
    setChatInput("");
    loadMessages(activeChannel);
  };

  // Realtime subscription for messages
  useEffect(() => {
    if (!activeChannel) return;
    loadMessages(activeChannel);

    const channel = supabase
      .channel(`reach-messages-${activeChannel}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reach_messages",
          filter: `channel_id=eq.${activeChannel}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as typeof messages[0]]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeChannel]);

  // Load data per view mode
  useEffect(() => {
    if (viewMode === "issues") loadIssues();
    if (viewMode === "commits") loadCommits();
    if (viewMode === "chat") loadChannels();
  }, [viewMode]);

  // ── Commit workflow ───────────────────────
  const commitFile = async () => {
    if (!selectedFile || !dirty) return;
    try {
      const refData = await gh.getRef(`heads/${branch}`);
      const parentSha = refData.object.sha;
      const blob = await gh.createBlob(fileContent, "utf-8");
      const newTree = await gh.createTree(parentSha, [
        { path: selectedFile, mode: "100644", type: "blob", sha: blob.sha },
      ]);
      const commit = await gh.createCommit(
        `Update ${selectedFile} via REACH IDE`,
        newTree.sha,
        [parentSha]
      );
      await gh.updateRef(`heads/${branch}`, commit.sha);
      setDirty(false);
      loadCommits();
    } catch (err) {
      console.error("Commit failed:", err);
    }
  };

  // ── Activity Bar ──────────────────────────
  const activityItems: { mode: ViewMode; icon: typeof FolderTree; label: string }[] = [
    { mode: "explorer", icon: FolderTree, label: "Explorer" },
    { mode: "issues", icon: Bug, label: "Issues" },
    { mode: "chat", icon: MessageSquare, label: "Chat" },
    { mode: "commits", icon: GitBranch, label: "Commits" },
    { mode: "notifications", icon: Bell, label: "Alerts" },
  ];

  return (
    <UidrLayout>
      <div className="flex" style={{ height: "calc(100vh - 3.5rem)", overflow: "hidden" }}>
        {/* ── Activity Bar (48px) ─────────────── */}
        <div className="w-12 flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col items-center py-2 gap-1">
          {activityItems.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              title={label}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                viewMode === mode
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
          <div className="flex-1" />
          <button className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white/60 rounded-lg hover:bg-white/5">
            <Settings size={18} />
          </button>
        </div>

        {/* ── Side Panel (260px) ─────────────── */}
        <div
          className="w-[260px] flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col overflow-hidden"
        >
          {/* Panel Header */}
          <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">
              {viewMode}
            </span>
            <button onClick={loadTree} className="text-white/30 hover:text-white/60">
              <RefreshCw size={12} />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
            {viewMode === "explorer" && (
              <div className="py-1">
                {/* Branch selector */}
                <div className="px-3 py-2 border-b border-white/5">
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
                  >
                    {branches.map((b) => (
                      <option key={b} value={b} className="bg-[#0c0c0c]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                {treeLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 size={16} className="animate-spin text-blue-400" />
                  </div>
                ) : (
                  <FileTreeView
                    nodes={tree}
                    onSelect={openFile}
                    selectedPath={selectedFile}
                  />
                )}
              </div>
            )}

            {viewMode === "issues" && (
              <div className="py-1">
                {issues.map((issue) => (
                  <div
                    key={issue.number}
                    className="px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${issue.state === "open" ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-xs font-medium text-white truncate flex-1">
                        {issue.title}
                      </span>
                      <span className="text-[10px] text-white/30">#{issue.number}</span>
                    </div>
                    <div className="flex gap-1 mt-1.5">
                      {issue.labels.slice(0, 3).map((l) => (
                        <span
                          key={l.name}
                          className="text-[9px] px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `#${l.color}25`, color: `#${l.color}` }}
                        >
                          {l.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {issues.length === 0 && (
                  <p className="text-xs text-white/30 text-center py-8">No open issues</p>
                )}
              </div>
            )}

            {viewMode === "chat" && (
              <div className="py-1">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                      activeChannel === ch.id
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Hash size={12} />
                    <span>{ch.name}</span>
                  </button>
                ))}
                {channels.length === 0 && (
                  <p className="text-xs text-white/30 text-center py-8">
                    Create a workspace to start chatting
                  </p>
                )}
              </div>
            )}

            {viewMode === "commits" && (
              <div className="py-1">
                {commits.map((c) => (
                  <div
                    key={c.sha}
                    className="px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <p className="text-xs text-white font-medium truncate">
                      {c.commit.message.split("\n")[0]}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {c.author?.avatar_url && (
                        <img src={c.author.avatar_url} className="w-4 h-4 rounded-full" alt="" />
                      )}
                      <span className="text-[10px] text-white/30">
                        {c.author?.login || c.commit.author.name}
                      </span>
                      <span className="text-[10px] text-white/20">
                        {c.sha.slice(0, 7)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === "notifications" && (
              <div className="flex flex-col items-center justify-center py-12 text-white/30">
                <Bell size={24} className="mb-2" />
                <p className="text-xs">No notifications</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Center Editor / Chat ───────────── */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
          {viewMode === "chat" ? (
            /* Chat View */
            <div className="flex-1 flex flex-col">
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <Hash size={14} className="text-blue-400" />
                <span className="text-sm font-medium text-white">
                  {channels.find((c) => c.id === activeChannel)?.name || "Select a channel"}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "thin" }}>
                {messages.map((msg) => (
                  <div key={msg.id} className="group">
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users size={12} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-white">
                            {msg.user_id.slice(0, 8)}
                          </span>
                          <span className="text-[10px] text-white/20">
                            {new Date(msg.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm text-white/70 mt-0.5 prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{msg.body}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-white/5">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                  />
                  <button onClick={sendMessage} className="text-blue-400 hover:text-blue-300">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Editor View */
            <>
              {/* Tab bar */}
              <div className="h-9 border-b border-white/5 flex items-center px-2 gap-1">
                {selectedFile && (
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-t text-xs text-white/80">
                    <FileCode size={12} className="text-blue-400" />
                    <span>{selectedFile.split("/").pop()}</span>
                    {dirty && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                )}
                <div className="flex-1" />
                {dirty && selectedFile && (
                  <Button
                    size="sm"
                    onClick={commitFile}
                    className="h-6 text-[10px] bg-blue-600 hover:bg-blue-700 gap-1"
                  >
                    <GitBranch size={10} /> Commit to {branch}
                  </Button>
                )}
              </div>

              {/* Monaco */}
              <div className="flex-1">
                {selectedFile ? (
                  fileLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                    </div>
                  ) : (
                    <Editor
                      height="100%"
                      language={language}
                      value={fileContent}
                      onChange={(val) => {
                        setFileContent(val || "");
                        setDirty(true);
                      }}
                      theme="vs-dark"
                      options={{
                        fontSize: 13,
                        fontFamily: "'Roboto Mono', monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                        lineNumbers: "on",
                        wordWrap: "on",
                        renderWhitespace: "selection",
                        bracketPairColorization: { enabled: true },
                      }}
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/20">
                    <FileCode size={48} className="mb-4" />
                    <p className="text-sm">Select a file from the explorer</p>
                    <p className="text-xs mt-1 text-white/10">
                      {GH_OWNER}/{GH_REPO} · {branch}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── Status Bar ────────────────────── */}
          <div className="h-6 bg-blue-600 flex items-center px-3 gap-4 text-[10px] text-white/80">
            <span className="flex items-center gap-1">
              <GitBranch size={10} /> {branch}
            </span>
            {selectedFile && (
              <span className="flex items-center gap-1">
                <FileCode size={10} /> {selectedFile}
              </span>
            )}
            <div className="flex-1" />
            <span>{language}</span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    </UidrLayout>
  );
}

// ── Language detection ────────────────────────
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
