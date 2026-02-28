import { useState, useCallback, useEffect } from "react";
import {
  ChevronRight, ChevronDown, File, Folder, Loader2,
  RefreshCw, Plus, FilePlus, FolderPlus, Trash2, GitBranch,
} from "lucide-react";
import { useGitHubProxy, type GitTreeItem } from "@/hooks/useGitHubProxy";
import { Button } from "@/components/ui/button";

// ── Tree data ──────────────────────────────
export interface TreeNode {
  name: string;
  path: string;
  type: "blob" | "tree";
  children: TreeNode[];
  sha: string;
}

export function buildTree(items: GitTreeItem[]): TreeNode[] {
  const root: TreeNode[] = [];
  const map = new Map<string, TreeNode>();
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

// ── Recursive tree renderer ────────────────
function TreeView({
  nodes, onSelect, selectedPath, depth = 0,
}: {
  nodes: TreeNode[];
  onSelect: (path: string) => void;
  selectedPath: string | null;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Auto-expand first level
    const set = new Set<string>();
    if (depth === 0) nodes.filter(n => n.type === "tree").slice(0, 5).forEach(n => set.add(n.path));
    return set;
  });

  const toggle = (path: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  return (
    <div>
      {nodes.map(node => (
        <div key={node.path}>
          <button
            onClick={() => node.type === "tree" ? toggle(node.path) : onSelect(node.path)}
            className={`flex items-center gap-1.5 w-full px-2 py-1 text-xs hover:bg-white/5 rounded transition-colors ${
              selectedPath === node.path ? "bg-blue-500/15 text-blue-400" : "text-white/70"
            }`}
            style={{ paddingLeft: `${depth * 14 + 8}px` }}
          >
            {node.type === "tree" ? (
              expanded.has(node.path) ? <ChevronDown size={12} /> : <ChevronRight size={12} />
            ) : (
              <span className="w-3" />
            )}
            {node.type === "tree" ? (
              <Folder size={13} className="text-blue-400/60" />
            ) : (
              <File size={13} className={getFileIconColor(node.name)} />
            )}
            <span className="truncate">{node.name}</span>
          </button>
          {node.type === "tree" && expanded.has(node.path) && (
            <TreeView nodes={node.children} onSelect={onSelect} selectedPath={selectedPath} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

function getFileIconColor(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const colors: Record<string, string> = {
    ts: "text-blue-400/60", tsx: "text-blue-400/60",
    js: "text-yellow-400/60", jsx: "text-yellow-400/60",
    go: "text-cyan-400/60", rs: "text-orange-400/60",
    py: "text-green-400/60", md: "text-white/40",
    json: "text-yellow-300/60", yaml: "text-pink-400/60", yml: "text-pink-400/60",
  };
  return colors[ext] || "text-white/40";
}

// ── Main component ─────────────────────────
interface Props {
  owner: string;
  repo: string;
  branch: string;
  setBranch: (b: string) => void;
  branches: string[];
  onSelectFile: (path: string) => void;
  selectedFile: string | null;
  onRefresh: () => void;
  onCreateBranch: (name: string) => void;
  tree: TreeNode[];
  treeLoading: boolean;
  onNewFile: (dir: string) => void;
  onDeleteFile: (path: string) => void;
}

export function IdeFileTree({
  owner, repo, branch, setBranch, branches,
  onSelectFile, selectedFile, onRefresh, onCreateBranch,
  tree, treeLoading, onNewFile, onDeleteFile,
}: Props) {
  const [showNewBranch, setShowNewBranch] = useState(false);
  const [newBranchName, setNewBranchName] = useState("");
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFilePath, setNewFilePath] = useState("");

  const handleCreateBranch = () => {
    if (!newBranchName.trim()) return;
    onCreateBranch(newBranchName.trim());
    setNewBranchName("");
    setShowNewBranch(false);
  };

  const handleNewFile = () => {
    if (!newFilePath.trim()) return;
    onNewFile(newFilePath.trim());
    setNewFilePath("");
    setShowNewFile(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Branch selector */}
      <div className="px-3 py-2 border-b border-white/5 space-y-2">
        <div className="flex items-center gap-1">
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
          >
            {branches.map(b => (
              <option key={b} value={b} className="bg-[#0c0c0c]">{b}</option>
            ))}
          </select>
          <button onClick={() => setShowNewBranch(!showNewBranch)} className="text-white/30 hover:text-white/60 p-1" title="New branch">
            <GitBranch size={12} />
          </button>
          <button onClick={onRefresh} className="text-white/30 hover:text-white/60 p-1" title="Refresh">
            <RefreshCw size={12} />
          </button>
        </div>
        {showNewBranch && (
          <div className="flex gap-1">
            <input
              autoFocus
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateBranch()}
              placeholder="new-branch-name"
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
            />
            <Button size="sm" onClick={handleCreateBranch} className="h-6 text-[10px] px-2 bg-blue-600">Create</Button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 py-1.5 border-b border-white/5 flex gap-1">
        <button onClick={() => setShowNewFile(!showNewFile)} className="text-white/30 hover:text-white/60 p-1" title="New file">
          <FilePlus size={12} />
        </button>
      </div>

      {showNewFile && (
        <div className="px-3 py-2 border-b border-white/5">
          <div className="flex gap-1">
            <input
              autoFocus
              value={newFilePath}
              onChange={(e) => setNewFilePath(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNewFile()}
              placeholder="path/to/file.ts"
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
            />
            <Button size="sm" onClick={handleNewFile} className="h-6 text-[10px] px-2 bg-blue-600">Add</Button>
          </div>
        </div>
      )}

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {treeLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={16} className="animate-spin text-blue-400" />
          </div>
        ) : (
          <TreeView nodes={tree} onSelect={onSelectFile} selectedPath={selectedFile} />
        )}
      </div>

      {/* Repo info */}
      <div className="px-3 py-1.5 border-t border-white/5 text-[9px] text-white/20">
        {owner}/{repo}
      </div>
    </div>
  );
}
