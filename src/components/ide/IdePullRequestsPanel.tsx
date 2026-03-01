import { useState } from "react";
import { GitPullRequest, Loader2, Plus, GitMerge, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReachPullRequest } from "@/hooks/useReachPullRequests";

interface Props {
  pullRequests: ReachPullRequest[];
  loading: boolean;
  onSelectPr: (pr: ReachPullRequest) => void;
  onCreatePr: (title: string, sourceBranch: string, targetBranch: string, body: string) => Promise<void>;
}

export function IdePullRequestsPanel({ pullRequests, loading, onSelectPr, onCreatePr }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sourceBranch, setSourceBranch] = useState("");
  const [targetBranch, setTargetBranch] = useState("main");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<"open" | "closed">("open");

  const handleCreate = async () => {
    if (!title.trim() || !sourceBranch.trim()) return;
    setSubmitting(true);
    try {
      await onCreatePr(title.trim(), sourceBranch.trim(), targetBranch.trim(), body.trim());
      setTitle(""); setBody(""); setSourceBranch(""); setShowCreate(false);
    } finally { setSubmitting(false); }
  };

  const filtered = pullRequests.filter(p => filter === "open" ? p.status === "open" : p.status !== "open");

  const getStatus = (pr: ReachPullRequest): { label: string; color: string } => {
    if (pr.status === "merged") return { label: "Merged", color: "text-purple-400" };
    if (pr.status === "closed") return { label: "Closed", color: "text-red-400" };
    return { label: "Open", color: "text-green-400" };
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Pull Requests</span>
        <button onClick={() => setShowCreate(!showCreate)} className="text-white/30 hover:text-white/60"><Plus size={14} /></button>
      </div>

      <div className="px-3 py-1.5 border-b border-white/5 flex gap-2">
        {(["open", "closed"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-[10px] px-2 py-0.5 rounded ${filter === f ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60"}`}>
            {f}
          </button>
        ))}
      </div>

      {showCreate && (
        <div className="px-3 py-2 border-b border-white/5 space-y-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="PR title"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none" />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[9px] text-white/30 mb-0.5 block">Source branch</label>
              <input value={sourceBranch} onChange={(e) => setSourceBranch(e.target.value)} placeholder="feature/..."
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
            </div>
            <div className="flex-1">
              <label className="text-[9px] text-white/30 mb-0.5 block">Target branch</label>
              <input value={targetBranch} onChange={(e) => setTargetBranch(e.target.value)} placeholder="main"
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
            </div>
          </div>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Description" rows={3}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none resize-none" />
          <Button size="sm" onClick={handleCreate} disabled={submitting} className="w-full h-7 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <GitPullRequest size={10} />}
            Create Pull Request
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {!loading && filtered.length === 0 && <p className="text-xs text-white/30 text-center py-8">No {filter} pull requests</p>}
        {filtered.map(pr => {
          const status = getStatus(pr);
          return (
            <button key={pr.id} onClick={() => onSelectPr(pr)}
              className="w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                {pr.status === "merged" ? (
                  <GitMerge size={12} className="text-purple-400 flex-shrink-0" />
                ) : (
                  <GitPullRequest size={12} className={`flex-shrink-0 ${status.color}`} />
                )}
                <span className="text-xs font-medium text-white truncate flex-1">{pr.title}</span>
                <span className="text-[10px] text-white/30">#{pr.number}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 ml-5 text-[10px] text-white/25">
                <span>{pr.target_branch} ← {pr.source_branch}</span>
                <span className={`ml-auto ${status.color}`}>{status.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
