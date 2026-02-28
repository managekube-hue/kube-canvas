import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, File, Bug, GitPullRequest, Target, MessageSquare,
  GitBranch, Settings, BookOpen, LayoutDashboard, Activity,
  Save, FolderTree, Bell, X,
} from "lucide-react";
import type { TreeNode } from "./IdeFileTree";
import type { ViewMode } from "./IdeActivityBar";

interface Props {
  open: boolean;
  onClose: () => void;
  tree: TreeNode[];
  onSelectFile: (path: string) => void;
  onSetViewMode: (mode: ViewMode) => void;
  onCommitAll?: () => void;
  dirtyCount: number;
}

interface Command {
  id: string;
  label: string;
  category: string;
  icon: typeof File;
  action: () => void;
  keywords?: string;
}

function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  for (const n of nodes) {
    if (n.type === "blob") result.push(n);
    if (n.children.length > 0) result.push(...flattenTree(n.children));
  }
  return result;
}

export function IdeCommandPalette({ open, onClose, tree, onSelectFile, onSetViewMode, onCommitAll, dirtyCount }: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const allFiles = useMemo(() => flattenTree(tree), [tree]);

  const commands: Command[] = useMemo(() => [
    { id: "view-explorer", label: "Show Explorer", category: "View", icon: FolderTree, action: () => { onSetViewMode("explorer"); onClose(); }, keywords: "files tree" },
    { id: "view-search", label: "Search Files & Code", category: "View", icon: Search, action: () => { onSetViewMode("search"); onClose(); }, keywords: "find grep" },
    { id: "view-issues", label: "Show Issues", category: "View", icon: Bug, action: () => { onSetViewMode("issues"); onClose(); }, keywords: "bugs tracker" },
    { id: "view-pulls", label: "Show Pull Requests", category: "View", icon: GitPullRequest, action: () => { onSetViewMode("pulls"); onClose(); }, keywords: "pr merge" },
    { id: "view-milestones", label: "Show Milestones", category: "View", icon: Target, action: () => { onSetViewMode("milestones"); onClose(); }, keywords: "sprints" },
    { id: "view-docs", label: "Browse Documentation", category: "View", icon: BookOpen, action: () => { onSetViewMode("docs"); onClose(); }, keywords: "readme markdown" },
    { id: "view-kanban", label: "Issue Board (Kanban)", category: "View", icon: LayoutDashboard, action: () => { onSetViewMode("kanban"); onClose(); }, keywords: "board drag" },
    { id: "view-activity", label: "Activity Feed", category: "View", icon: Activity, action: () => { onSetViewMode("activity"); onClose(); }, keywords: "timeline history" },
    { id: "view-chat", label: "Open Chat", category: "View", icon: MessageSquare, action: () => { onSetViewMode("chat"); onClose(); }, keywords: "message" },
    { id: "view-commits", label: "Source Control", category: "View", icon: GitBranch, action: () => { onSetViewMode("commits"); onClose(); }, keywords: "git" },
    { id: "view-notif", label: "Notifications", category: "View", icon: Bell, action: () => { onSetViewMode("notifications"); onClose(); }, keywords: "alerts" },
    { id: "view-settings", label: "Settings", category: "View", icon: Settings, action: () => { onSetViewMode("settings"); onClose(); }, keywords: "config preferences" },
    ...(dirtyCount > 0 ? [{
      id: "commit-all", label: `Commit ${dirtyCount} Changed File${dirtyCount > 1 ? "s" : ""}`, category: "Action", icon: Save,
      action: () => { onCommitAll?.(); onClose(); }, keywords: "save push",
    }] : []),
  ], [onSetViewMode, onClose, onCommitAll, dirtyCount]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { commands: commands.slice(0, 8), files: [] };

    const filteredCommands = commands.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.keywords || "").toLowerCase().includes(q)
    );

    const filteredFiles = allFiles
      .filter(f => f.path.toLowerCase().includes(q) || f.name.toLowerCase().includes(q))
      .slice(0, 20);

    return { commands: filteredCommands, files: filteredFiles };
  }, [query, commands, allFiles]);

  const totalItems = results.commands.length + results.files.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex < results.commands.length) {
        results.commands[selectedIndex].action();
      } else {
        const fileIdx = selectedIndex - results.commands.length;
        if (results.files[fileIdx]) {
          onSelectFile(results.files[fileIdx].path);
          onClose();
        }
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-[560px] max-h-[420px] bg-[#0e0e0e] border border-white/10 rounded-xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={16} className="text-white/30 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search files…"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
          <kbd className="text-[9px] text-white/20 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
          {results.commands.length > 0 && (
            <>
              <div className="px-4 py-1.5">
                <span className="text-[9px] text-white/25 font-bold uppercase tracking-wider">Commands</span>
              </div>
              {results.commands.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    data-index={i}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                      selectedIndex === i ? "bg-blue-500/15 text-blue-400" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={14} className={selectedIndex === i ? "text-blue-400" : "text-white/30"} />
                    <span className="flex-1 text-left truncate">{cmd.label}</span>
                    <span className="text-[10px] text-white/20">{cmd.category}</span>
                  </button>
                );
              })}
            </>
          )}

          {results.files.length > 0 && (
            <>
              <div className="px-4 py-1.5 mt-1">
                <span className="text-[9px] text-white/25 font-bold uppercase tracking-wider">Files</span>
              </div>
              {results.files.map((file, i) => {
                const idx = results.commands.length + i;
                return (
                  <button
                    key={file.path}
                    data-index={idx}
                    onClick={() => { onSelectFile(file.path); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                      selectedIndex === idx ? "bg-blue-500/15 text-blue-400" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <File size={14} className={selectedIndex === idx ? "text-blue-400" : "text-white/30"} />
                    <span className="flex-1 text-left truncate">{file.path}</span>
                  </button>
                );
              })}
            </>
          )}

          {totalItems === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-white/20">
              <Search size={20} className="mb-2" />
              <p className="text-xs">No results found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[9px] text-white/20">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
