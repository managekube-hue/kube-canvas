import { useState } from "react";
import { Search, File } from "lucide-react";
import type { TreeNode } from "./IdeFileTree";

interface Props {
  tree: TreeNode[];
  onSelectFile: (path: string) => void;
}

function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  for (const n of nodes) {
    if (n.type === "blob") result.push(n);
    if (n.children.length > 0) result.push(...flattenTree(n.children));
  }
  return result;
}

export function IdeSearchPanel({ tree, onSelectFile }: Props) {
  const [query, setQuery] = useState("");

  const allFiles = flattenTree(tree);
  const filtered = query.length >= 2
    ? allFiles.filter(f => f.path.toLowerCase().includes(query.toLowerCase())).slice(0, 50)
    : [];

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2 py-1.5">
          <Search size={12} className="text-white/30" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: "thin" }}>
        {filtered.length === 0 && query.length >= 2 && (
          <p className="text-xs text-white/30 text-center py-8">No matching files</p>
        )}
        {query.length < 2 && (
          <p className="text-xs text-white/20 text-center py-8">Type to search files</p>
        )}
        {filtered.map(f => (
          <button
            key={f.path}
            onClick={() => onSelectFile(f.path)}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5 rounded transition-colors"
          >
            <File size={12} className="text-white/30 flex-shrink-0" />
            <span className="truncate">{f.path}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
