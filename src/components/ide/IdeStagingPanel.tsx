import { useState, useMemo } from "react";
import { GitBranch, Check, Loader2, ChevronDown, ChevronRight, FileCode, Plus, Minus, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  dirtyFiles: Array<{ path: string; content: string; original?: string }>;
  branch: string;
  onCommitMultiple: (paths: string[], message: string) => Promise<void>;
  onDiscardFile: (path: string) => void;
}

function SimpleDiff({ content, original }: { content: string; original?: string }) {
  if (!original) {
    return (
      <div className="px-3 py-2 text-[10px] text-white/30 italic">New file — full content will be committed</div>
    );
  }

  const oldLines = original.split("\n");
  const newLines = content.split("\n");
  const maxLines = Math.max(oldLines.length, newLines.length);
  const diffLines: Array<{ type: "add" | "remove" | "same"; text: string; lineNum: number }> = [];

  for (let i = 0; i < maxLines; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];
    if (oldLine === newLine) {
      diffLines.push({ type: "same", text: newLine || "", lineNum: i + 1 });
    } else {
      if (oldLine !== undefined) diffLines.push({ type: "remove", text: oldLine, lineNum: i + 1 });
      if (newLine !== undefined) diffLines.push({ type: "add", text: newLine, lineNum: i + 1 });
    }
  }

  // Show only changed lines with context
  const changedIndices = new Set<number>();
  diffLines.forEach((line, idx) => {
    if (line.type !== "same") {
      for (let c = Math.max(0, idx - 2); c <= Math.min(diffLines.length - 1, idx + 2); c++) {
        changedIndices.add(c);
      }
    }
  });

  if (changedIndices.size === 0) {
    return <div className="px-3 py-2 text-[10px] text-white/30 italic">No visible changes</div>;
  }

  const sortedIndices = Array.from(changedIndices).sort((a, b) => a - b);

  return (
    <div className="font-mono text-[10px] leading-4 overflow-x-auto max-h-48 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
      {sortedIndices.map((idx, i) => {
        const line = diffLines[idx];
        const showSeparator = i > 0 && sortedIndices[i - 1] !== idx - 1;
        return (
          <div key={idx}>
            {showSeparator && <div className="text-white/10 px-3">···</div>}
            <div className={`px-3 flex ${
              line.type === "add" ? "bg-emerald-500/10 text-emerald-400" :
              line.type === "remove" ? "bg-red-500/10 text-red-400" :
              "text-white/30"
            }`}>
              <span className="w-5 text-right mr-2 text-white/15 select-none flex-shrink-0">{line.lineNum}</span>
              <span className="w-3 flex-shrink-0 select-none">
                {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
              </span>
              <span className="whitespace-pre">{line.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function IdeStagingPanel({ dirtyFiles, branch, onCommitMultiple, onDiscardFile }: Props) {
  const [staged, setStaged] = useState<Set<string>>(new Set());
  const [commitMsg, setCommitMsg] = useState("");
  const [committing, setCommitting] = useState(false);
  const [showStaged, setShowStaged] = useState(true);
  const [showUnstaged, setShowUnstaged] = useState(true);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const stagedFiles = dirtyFiles.filter(f => staged.has(f.path));
  const unstagedFiles = dirtyFiles.filter(f => !staged.has(f.path));

  const toggleStage = (path: string) => {
    setStaged(prev => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  const stageAll = () => setStaged(new Set(dirtyFiles.map(f => f.path)));
  const unstageAll = () => setStaged(new Set());

  const handleCommit = async () => {
    if (stagedFiles.length === 0 || !commitMsg.trim()) return;
    setCommitting(true);
    try {
      await onCommitMultiple(stagedFiles.map(f => f.path), commitMsg.trim());
      setStaged(new Set());
      setCommitMsg("");
      setPreviewFile(null);
    } finally {
      setCommitting(false);
    }
  };

  // Auto-generate commit message suggestion
  const suggestedMsg = useMemo(() => {
    if (stagedFiles.length === 0) return "";
    if (stagedFiles.length === 1) {
      const name = stagedFiles[0].path.split("/").pop() || "";
      return `Update ${name}`;
    }
    const ext = stagedFiles[0].path.split(".").pop();
    const allSameExt = stagedFiles.every(f => f.path.endsWith(`.${ext}`));
    if (allSameExt) return `Update ${stagedFiles.length} ${ext} files`;
    return `Update ${stagedFiles.length} files`;
  }, [stagedFiles]);

  if (dirtyFiles.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-3 py-2 border-b border-white/5">
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Source Control</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-white/20 px-4">
          <Check size={32} className="mb-2 text-emerald-500/40" />
          <p className="text-xs text-center">No pending changes</p>
          <p className="text-[10px] text-white/15 mt-1">Edit files to see them here</p>
        </div>
      </div>
    );
  }

  const previewData = previewFile ? dirtyFiles.find(f => f.path === previewFile) : null;

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Source Control</span>
      </div>

      {/* Commit area */}
      <div className="px-3 py-2 border-b border-white/5 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <GitBranch size={10} className="text-blue-400" />
          <span>{branch}</span>
          <span className="ml-auto">{stagedFiles.length} staged</span>
        </div>
        <textarea value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)}
          placeholder={suggestedMsg || "Commit message (⌘⏎ to commit)"}
          rows={2}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleCommit(); }}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white outline-none resize-none placeholder:text-white/20 focus:border-blue-500/40" />
        {suggestedMsg && !commitMsg && (
          <button onClick={() => setCommitMsg(suggestedMsg)}
            className="text-[9px] text-blue-400/60 hover:text-blue-400 transition-colors">
            Use: "{suggestedMsg}"
          </button>
        )}
        <Button size="sm" onClick={handleCommit}
          disabled={committing || stagedFiles.length === 0 || !commitMsg.trim()}
          className="w-full h-7 text-[10px] bg-blue-600 hover:bg-blue-700 gap-1.5 disabled:opacity-30">
          {committing ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
          Commit {stagedFiles.length} file{stagedFiles.length !== 1 ? "s" : ""} to {branch}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {/* Staged */}
        <div>
          <button onClick={() => setShowStaged(!showStaged)}
            className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:bg-white/[0.02]">
            {showStaged ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            Staged ({stagedFiles.length})
            <button onClick={(e) => { e.stopPropagation(); unstageAll(); }}
              className="ml-auto text-white/20 hover:text-white/50" title="Unstage all">
              <Minus size={10} />
            </button>
          </button>
          {showStaged && stagedFiles.map(f => (
            <div key={f.path}>
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-white/[0.02] group">
                <FileCode size={11} className="text-emerald-400/50 flex-shrink-0" />
                <span className="text-white/60 truncate flex-1">{f.path}</span>
                <span className="text-[9px] px-1 rounded bg-emerald-500/15 text-emerald-400">S</span>
                <button onClick={() => setPreviewFile(previewFile === f.path ? null : f.path)}
                  className="text-white/20 hover:text-white/50 opacity-0 group-hover:opacity-100" title="Toggle diff">
                  {previewFile === f.path ? <EyeOff size={10} /> : <Eye size={10} />}
                </button>
                <button onClick={() => toggleStage(f.path)}
                  className="text-white/20 hover:text-white/50 opacity-0 group-hover:opacity-100" title="Unstage">
                  <Minus size={10} />
                </button>
              </div>
              {previewFile === f.path && previewData && (
                <div className="border-t border-b border-white/5 bg-white/[0.01]">
                  <SimpleDiff content={previewData.content} original={previewData.original} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unstaged */}
        <div>
          <button onClick={() => setShowUnstaged(!showUnstaged)}
            className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:bg-white/[0.02]">
            {showUnstaged ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            Changes ({unstagedFiles.length})
            <button onClick={(e) => { e.stopPropagation(); stageAll(); }}
              className="ml-auto text-white/20 hover:text-white/50" title="Stage all">
              <Plus size={10} />
            </button>
          </button>
          {showUnstaged && unstagedFiles.map(f => (
            <div key={f.path}>
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-white/[0.02] group">
                <FileCode size={11} className="text-yellow-400/50 flex-shrink-0" />
                <span className="text-white/60 truncate flex-1">{f.path}</span>
                <span className="text-[9px] px-1 rounded bg-yellow-500/15 text-yellow-400">M</span>
                <button onClick={() => setPreviewFile(previewFile === f.path ? null : f.path)}
                  className="text-white/20 hover:text-white/50 opacity-0 group-hover:opacity-100" title="Toggle diff">
                  {previewFile === f.path ? <EyeOff size={10} /> : <Eye size={10} />}
                </button>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <button onClick={() => toggleStage(f.path)} className="text-white/20 hover:text-emerald-400" title="Stage">
                    <Plus size={10} />
                  </button>
                  <button onClick={() => onDiscardFile(f.path)} className="text-white/20 hover:text-red-400" title="Discard">
                    <X size={10} />
                  </button>
                </div>
              </div>
              {previewFile === f.path && previewData && (
                <div className="border-t border-b border-white/5 bg-white/[0.01]">
                  <SimpleDiff content={previewData.content} original={previewData.original} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
