import { useState } from "react";
import {
  ChevronRight, ChevronDown, File, Folder, Loader2,
  FilePlus, FolderPlus, Trash2, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CodeFile } from "@/hooks/useReachFileEditor";

interface TreeNode {
  name: string;
  path: string;
  isFolder: boolean;
  children: TreeNode[];
  fileId: string;
}

function buildLocalTree(files: CodeFile[]): TreeNode[] {
  const root: TreeNode[] = [];
  const map = new Map<string, TreeNode>();

  // Sort: folders first, then alphabetical
  const sorted = [...files].sort((a, b) => {
    if (a.folder !== b.folder) return a.folder ? -1 : 1;
    return a.path.localeCompare(b.path);
  });

  for (const file of sorted) {
    const parts = file.path.split("/");
    const node: TreeNode = {
      name: file.name,
      path: file.path,
      isFolder: file.folder,
      children: [],
      fileId: file.id,
    };
    map.set(file.path, node);

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

function TreeView({
  nodes, onSelect, selectedPath, onDelete, depth = 0,
}: {
  nodes: TreeNode[];
  onSelect: (path: string) => void;
  selectedPath: string | null;
  onDelete: (id: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const set = new Set<string>();
    if (depth === 0) nodes.filter(n => n.isFolder).slice(0, 5).forEach(n => set.add(n.path));
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
          <div className="group flex items-center">
            <button
              onClick={() => node.isFolder ? toggle(node.path) : onSelect(node.path)}
              className={`flex-1 flex items-center gap-1.5 px-2 py-1 text-xs hover:bg-white/5 rounded transition-colors ${
                selectedPath === node.path ? "bg-blue-500/15 text-blue-400" : "text-white/70"
              }`}
              style={{ paddingLeft: `${depth * 14 + 8}px` }}
            >
              {node.isFolder ? (
                expanded.has(node.path) ? <ChevronDown size={12} /> : <ChevronRight size={12} />
              ) : <span className="w-3" />}
              {node.isFolder ? (
                <Folder size={13} className="text-blue-400/60" />
              ) : (
                <File size={13} className={getColor(node.name)} />
              )}
              <span className="truncate">{node.name}</span>
            </button>
            <button
              onClick={() => onDelete(node.fileId)}
              className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-400 transition-opacity"
              title="Delete"
            >
              <Trash2 size={10} />
            </button>
          </div>
          {node.isFolder && expanded.has(node.path) && (
            <TreeView nodes={node.children} onSelect={onSelect} selectedPath={selectedPath} onDelete={onDelete} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

function getColor(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const c: Record<string, string> = {
    ts: "text-blue-400/60", tsx: "text-blue-400/60",
    js: "text-yellow-400/60", jsx: "text-yellow-400/60",
    go: "text-cyan-400/60", rs: "text-orange-400/60",
    py: "text-green-400/60", md: "text-white/40",
    json: "text-yellow-300/60",
  };
  return c[ext] || "text-white/40";
}

interface Props {
  files: CodeFile[];
  loading: boolean;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
  onCreateFile: (path: string) => void;
  onCreateFolder: (path: string) => void;
  onDeleteFile: (id: string) => void;
  onRefresh: () => void;
}

export function IdeLocalFileTree({
  files, loading, selectedFile,
  onSelectFile, onCreateFile, onCreateFolder, onDeleteFile, onRefresh,
}: Props) {
  const [showNewFile, setShowNewFile] = useState(false);
  const [newPath, setNewPath] = useState("");
  const [isFolder, setIsFolder] = useState(false);

  const handleCreate = () => {
    if (!newPath.trim()) return;
    if (isFolder) onCreateFolder(newPath.trim());
    else onCreateFile(newPath.trim());
    setNewPath("");
    setShowNewFile(false);
  };

  const tree = buildLocalTree(files);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Files</span>
        <div className="flex gap-1">
          <button onClick={() => { setIsFolder(false); setShowNewFile(true); }}
            className="text-white/30 hover:text-white/60 p-1" title="New File">
            <FilePlus size={12} />
          </button>
          <button onClick={() => { setIsFolder(true); setShowNewFile(true); }}
            className="text-white/30 hover:text-white/60 p-1" title="New Folder">
            <FolderPlus size={12} />
          </button>
          <button onClick={onRefresh} className="text-white/30 hover:text-white/60 p-1" title="Refresh">
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {showNewFile && (
        <div className="px-3 py-2 border-b border-white/5">
          <div className="flex gap-1">
            <input
              autoFocus
              value={newPath}
              onChange={e => setNewPath(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              placeholder={isFolder ? "folder/name" : "path/to/file.ts"}
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
            />
            <Button size="sm" onClick={handleCreate} className="h-6 text-[10px] px-2 bg-blue-600">
              {isFolder ? "Add" : "Create"}
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={16} className="animate-spin text-blue-400" />
          </div>
        ) : tree.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/20">
            <File size={24} />
            <span className="text-[10px]">No files yet</span>
            <button onClick={() => { setIsFolder(false); setShowNewFile(true); }}
              className="text-[10px] text-blue-400 hover:text-blue-300">
              Create your first file
            </button>
          </div>
        ) : (
          <TreeView nodes={tree} onSelect={onSelectFile} selectedPath={selectedFile} onDelete={onDeleteFile} />
        )}
      </div>
    </div>
  );
}
