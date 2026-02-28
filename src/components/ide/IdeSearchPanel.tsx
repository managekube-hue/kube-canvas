import { useState } from "react";
import { Search, File, Loader2, Code } from "lucide-react";
import type { TreeNode } from "./IdeFileTree";
import type { GitSearchResult } from "@/hooks/useGitHubProxy";

interface Props {
  tree: TreeNode[];
  onSelectFile: (path: string) => void;
  onSearchCode: (query: string) => Promise<GitSearchResult>;
}

function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  for (const n of nodes) {
    if (n.type === "blob") result.push(n);
    if (n.children.length > 0) result.push(...flattenTree(n.children));
  }
  return result;
}

export function IdeSearchPanel({ tree, onSelectFile, onSearchCode }: Props) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"files" | "code">("files");
  const [codeResults, setCodeResults] = useState<GitSearchResult | null>(null);
  const [searching, setSearching] = useState(false);

  const allFiles = flattenTree(tree);
  const fileResults = query.length >= 2
    ? allFiles.filter(f => f.path.toLowerCase().includes(query.toLowerCase())).slice(0, 50)
    : [];

  const handleCodeSearch = async () => {
    if (!query.trim() || query.length < 3) return;
    setSearching(true);
    try {
      const results = await onSearchCode(query.trim());
      setCodeResults(results);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 space-y-2">
        {/* Mode toggle */}
        <div className="flex gap-2">
          {(["files", "code"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`text-[10px] px-2 py-0.5 rounded capitalize ${mode === m ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60"}`}>
              {m === "files" ? "File Name" : "Content"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2 py-1.5">
          <Search size={12} className="text-white/30" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => mode === "code" && e.key === "Enter" && handleCodeSearch()}
            placeholder={mode === "files" ? "Search files…" : "Search code content…"}
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20"
          />
          {mode === "code" && (
            <button onClick={handleCodeSearch} className="text-blue-400 hover:text-blue-300">
              <Search size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {mode === "files" && (
          <>
            {fileResults.length === 0 && query.length >= 2 && (
              <p className="text-xs text-white/30 text-center py-8">No matching files</p>
            )}
            {query.length < 2 && (
              <p className="text-xs text-white/20 text-center py-8">Type to search files</p>
            )}
            {fileResults.map(f => (
              <button key={f.path} onClick={() => onSelectFile(f.path)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5 rounded transition-colors">
                <File size={12} className="text-white/30 flex-shrink-0" />
                <span className="truncate">{f.path}</span>
              </button>
            ))}
          </>
        )}

        {mode === "code" && (
          <>
            {searching && (
              <div className="flex justify-center py-8">
                <Loader2 size={16} className="animate-spin text-blue-400" />
              </div>
            )}
            {!searching && codeResults && codeResults.items.length === 0 && (
              <p className="text-xs text-white/30 text-center py-8">No results found</p>
            )}
            {!searching && !codeResults && (
              <p className="text-xs text-white/20 text-center py-8">Press Enter to search code</p>
            )}
            {codeResults && !searching && (
              <>
                <p className="text-[10px] text-white/25 px-3 py-1">{codeResults.total_count} results</p>
                {codeResults.items.map((item, i) => (
                  <button key={`${item.path}-${i}`} onClick={() => onSelectFile(item.path)}
                    className="w-full text-left px-3 py-2 border-b border-white/5 hover:bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <Code size={10} className="text-blue-400/60 flex-shrink-0" />
                      <span className="text-xs text-white/70 truncate">{item.path}</span>
                    </div>
                    {item.text_matches && item.text_matches.length > 0 && (
                      <p className="text-[10px] text-white/30 mt-1 ml-4 truncate font-mono">
                        {item.text_matches[0].fragment.slice(0, 120)}
                      </p>
                    )}
                  </button>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
