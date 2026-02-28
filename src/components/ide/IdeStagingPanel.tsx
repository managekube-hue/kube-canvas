import { useState } from "react";
import { GitBranch, Check, Loader2, ChevronDown, ChevronRight, FileCode, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StagedFile {
  path: string;
  staged: boolean;
}

interface Props {
  dirtyFiles: Array<{ path: string; content: string }>;
  branch: string;
  onCommitMultiple: (paths: string[], message: string) => Promise<void>;
  onDiscardFile: (path: string) => void;
}

export function IdeStagingPanel({ dirtyFiles, branch, onCommitMultiple, onDiscardFile }: Props) {
  const [staged, setStaged] = useState<Set<string>>(new Set());
  const [commitMsg, setCommitMsg] = useState("");
  const [committing, setCommitting] = useState(false);
  const [showStaged, setShowStaged] = useState(true);
  const [showUnstaged, setShowUnstaged] = useState(true);

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
    } finally {
      setCommitting(false);
    }
  };

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

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Source Control</span>
      </div>

      {/* Commit message + button */}
      <div className="px-3 py-2 border-b border-white/5 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <GitBranch size={10} className="text-blue-400" />
          <span>{branch}</span>
          <span className="ml-auto">{stagedFiles.length} staged</span>
        </div>
        <textarea
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          placeholder="Commit message (⏎ to commit)"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleCommit();
          }}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white outline-none resize-none placeholder:text-white/20 focus:border-blue-500/40"
        />
        <Button
          size="sm"
          onClick={handleCommit}
          disabled={committing || stagedFiles.length === 0 || !commitMsg.trim()}
          className="w-full h-7 text-[10px] bg-blue-600 hover:bg-blue-700 gap-1.5 disabled:opacity-30"
        >
          {committing ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
          Commit {stagedFiles.length} file{stagedFiles.length !== 1 ? "s" : ""} to {branch}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {/* Staged changes */}
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
            <div key={f.path}
              className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-white/[0.02] group">
              <FileCode size={11} className="text-emerald-400/50 flex-shrink-0" />
              <span className="text-white/60 truncate flex-1">{f.path}</span>
              <span className="text-[9px] px-1 rounded bg-emerald-500/15 text-emerald-400">S</span>
              <button onClick={() => toggleStage(f.path)}
                className="text-white/20 hover:text-white/50 opacity-0 group-hover:opacity-100" title="Unstage">
                <Minus size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Unstaged changes */}
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
            <div key={f.path}
              className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-white/[0.02] group">
              <FileCode size={11} className="text-yellow-400/50 flex-shrink-0" />
              <span className="text-white/60 truncate flex-1">{f.path}</span>
              <span className="text-[9px] px-1 rounded bg-yellow-500/15 text-yellow-400">M</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button onClick={() => toggleStage(f.path)}
                  className="text-white/20 hover:text-emerald-400" title="Stage">
                  <Plus size={10} />
                </button>
                <button onClick={() => onDiscardFile(f.path)}
                  className="text-white/20 hover:text-red-400" title="Discard changes">
                  <X size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
