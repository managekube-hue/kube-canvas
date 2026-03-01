import { useState } from "react";
import { GitPullRequest, Loader2, Plus, GitMerge, Check, AlertCircle, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitPullRequest as PR } from "@/hooks/useGitHub";

interface ListProps {
  pulls: PR[];
  loading: boolean;
  onSelectPr: (pr: PR) => void;
  onCreatePr: (title: string, head: string, base: string, body: string) => Promise<void>;
  branches: string[];
  currentBranch: string;
  reviewStatuses?: Record<number, string>; // PR number → latest review state
}

export function IdePullRequestsPanel({ pulls, loading, onSelectPr, onCreatePr, branches, currentBranch, reviewStatuses = {} }: ListProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [head, setHead] = useState(currentBranch);
  const [base, setBase] = useState("main");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<"open" | "closed">("open");

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onCreatePr(title.trim(), head, base, body.trim());
      setTitle(""); setBody(""); setShowCreate(false);
    } finally { setSubmitting(false); }
  };

  const filtered = pulls.filter(p => filter === "open" ? !p.merged && p.state === "open" : p.state === "closed" || p.merged);

  const getStatus = (pr: PR): { label: string; color: string } => {
    if (pr.merged) return { label: "Merged", color: "text-purple-400" };
    if ((pr as any).draft) return { label: "Draft", color: "text-white/30" };
    if (pr.state === "open") return { label: "Open", color: "text-green-400" };
    return { label: "Closed", color: "text-red-400" };
  };

  const getReviewIcon = (prNum: number) => {
    const state = reviewStatuses[prNum];
    if (!state) return <Clock size={10} className="text-white/20" title="Pending" />;
    if (state === "APPROVED") return <Check size={10} className="text-emerald-400" title="Approved" />;
    if (state === "CHANGES_REQUESTED") return <AlertCircle size={10} className="text-orange-400" title="Changes Requested" />;
    return <Eye size={10} className="text-blue-400" title="Reviewed" />;
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
              <label className="text-[9px] text-white/30 mb-0.5 block">Head</label>
              <select value={head} onChange={(e) => setHead(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none">
                {branches.map(b => <option key={b} value={b} className="bg-[#0c0c0c]">{b}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[9px] text-white/30 mb-0.5 block">Base</label>
              <select value={base} onChange={(e) => setBase(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none">
                {branches.map(b => <option key={b} value={b} className="bg-[#0c0c0c]">{b}</option>)}
              </select>
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
            <button key={pr.number} onClick={() => onSelectPr(pr)}
              className="w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                {pr.merged ? (
                  <GitMerge size={12} className="text-purple-400 flex-shrink-0" />
                ) : (
                  <GitPullRequest size={12} className={`flex-shrink-0 ${status.color}`} />
                )}
                <span className="text-xs font-medium text-white truncate flex-1">{pr.title}</span>
                <span className="text-[10px] text-white/30">#{pr.number}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 ml-5 text-[10px] text-white/25">
                <img src={pr.user.avatar_url} className="w-3.5 h-3.5 rounded-full" alt="" />
                <span>{pr.base.ref} ← {pr.head.ref}</span>
                <span className={`ml-auto ${status.color}`}>{status.label}</span>
                {getReviewIcon(pr.number)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
