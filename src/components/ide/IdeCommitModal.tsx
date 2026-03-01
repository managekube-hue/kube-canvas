import { useState, useMemo } from "react";
import { X, Loader2, Check, AlertCircle, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CommitType = "feat" | "fix" | "docs" | "chore" | "refactor" | "test";

const commitTypes: { value: CommitType; label: string; emoji: string }[] = [
  { value: "feat", label: "Feature", emoji: "✨" },
  { value: "fix", label: "Fix", emoji: "🐛" },
  { value: "docs", label: "Docs", emoji: "📝" },
  { value: "chore", label: "Chore", emoji: "🔧" },
  { value: "refactor", label: "Refactor", emoji: "♻️" },
  { value: "test", label: "Test", emoji: "🧪" },
];

export type CommitStep = 1 | 2 | 3 | 4 | 5 | 6;

const stepLabels: Record<CommitStep, string> = {
  1: "Get branch ref",
  2: "Get tree SHA",
  3: "Create blob(s)",
  4: "Create new tree",
  5: "Create commit",
  6: "Update branch ref",
};

interface Props {
  open: boolean;
  onClose: () => void;
  onCommit: (message: string) => void;
  branch: string;
  stagedFiles: string[];
  /** Current step of the 6-step flow (null = not started) */
  commitStep: CommitStep | null;
  /** Error from the commit flow */
  commitError: string | null;
  /** Whether committing */
  committing: boolean;
}

export function IdeCommitModal({
  open, onClose, onCommit, branch, stagedFiles,
  commitStep, commitError, committing,
}: Props) {
  const [type, setType] = useState<CommitType>("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");

  const message = useMemo(() => {
    const scopePart = scope.trim() ? `(${scope.trim()})` : "";
    return `${type}${scopePart}: ${description.trim()}`;
  }, [type, scope, description]);

  const canSubmit = description.trim().length > 0 && !committing;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onCommit(message);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[480px] bg-[#0c0c0c] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <GitBranch size={14} className="text-blue-400" />
            <span className="text-xs font-semibold text-white/70">Commit to <span className="text-blue-400">{branch}</span></span>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X size={14} /></button>
        </div>

        {/* Type selector */}
        <div className="px-4 pt-3 pb-2">
          <label className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5 block">Type</label>
          <div className="flex gap-1 flex-wrap">
            {commitTypes.map(ct => (
              <button key={ct.value} onClick={() => setType(ct.value)}
                className={`px-2.5 py-1 rounded text-[10px] font-medium transition-all ${
                  type === ct.value
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-white/40 hover:text-white/60 hover:bg-white/10"
                }`}>
                {ct.emoji} {ct.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div className="px-4 pb-2">
          <label className="text-[10px] text-white/30 uppercase tracking-widest mb-1 block">Scope (optional)</label>
          <input value={scope} onChange={e => setScope(e.target.value)}
            placeholder="e.g. ide, chat, api"
            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500/40" />
        </div>

        {/* Description */}
        <div className="px-4 pb-2">
          <label className="text-[10px] text-white/30 uppercase tracking-widest mb-1 block">Description</label>
          <input autoFocus value={description} onChange={e => setDescription(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Short description of the change"
            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500/40" />
        </div>

        {/* Preview */}
        <div className="px-4 pb-3">
          <label className="text-[10px] text-white/30 uppercase tracking-widest mb-1 block">Preview</label>
          <div className="bg-white/[0.03] border border-white/5 rounded px-2.5 py-2 text-xs font-mono text-white/60">
            {description.trim() ? message : <span className="text-white/20 italic">type(scope): description</span>}
          </div>
        </div>

        {/* Staged files */}
        {stagedFiles.length > 0 && (
          <div className="px-4 pb-3">
            <label className="text-[10px] text-white/30 uppercase tracking-widest mb-1 block">
              Staged Files ({stagedFiles.length})
            </label>
            <div className="max-h-24 overflow-y-auto space-y-0.5" style={{ scrollbarWidth: "thin" }}>
              {stagedFiles.map(f => (
                <div key={f} className="text-[10px] text-white/40 truncate">{f}</div>
              ))}
            </div>
          </div>
        )}

        {/* 6-step progress */}
        {committing && (
          <div className="px-4 pb-3">
            <label className="text-[10px] text-white/30 uppercase tracking-widest mb-2 block">Progress</label>
            <div className="flex items-center gap-1">
              {([1, 2, 3, 4, 5, 6] as CommitStep[]).map(step => {
                const isActive = commitStep === step;
                const isDone = commitStep !== null && step < commitStep;
                const isFailed = commitError && commitStep === step;
                return (
                  <div key={step} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full h-1.5 rounded-full transition-colors ${
                      isFailed ? "bg-red-500" :
                      isDone ? "bg-emerald-500" :
                      isActive ? "bg-blue-500 animate-pulse" :
                      "bg-white/10"
                    }`} />
                    <span className={`text-[8px] ${
                      isFailed ? "text-red-400" :
                      isActive ? "text-blue-400" :
                      isDone ? "text-emerald-400/60" : "text-white/15"
                    }`}>{step}</span>
                  </div>
                );
              })}
            </div>
            {commitStep && (
              <p className="text-[10px] text-white/40 mt-1.5 flex items-center gap-1">
                {commitError ? (
                  <><AlertCircle size={10} className="text-red-400" /> <span className="text-red-400">{commitError}</span></>
                ) : (
                  <><Loader2 size={10} className="animate-spin text-blue-400" /> {stepLabels[commitStep]}</>
                )}
              </p>
            )}
          </div>
        )}

        {/* Error outside committing */}
        {commitError && !committing && (
          <div className="px-4 pb-3">
            <p className="text-[10px] text-red-400 flex items-center gap-1">
              <AlertCircle size={10} /> {commitError}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-3 border-t border-white/5 flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={onClose} disabled={committing}
            className="h-7 text-[10px] text-white/40">Cancel</Button>
          <Button size="sm" onClick={handleSubmit} disabled={!canSubmit}
            className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 gap-1.5">
            {committing ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
            Commit to {branch}
          </Button>
        </div>
      </div>
    </div>
  );
}
