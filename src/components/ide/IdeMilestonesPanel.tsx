import { useState } from "react";
import { Target, Plus, Loader2, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitMilestone } from "@/hooks/useGitHub";

interface Props {
  milestones: GitMilestone[];
  loading: boolean;
  onCreateMilestone: (title: string, description: string, dueOn?: string) => Promise<void>;
  onUpdateMilestone: (number: number, updates: { state?: string }) => Promise<void>;
}

export function IdeMilestonesPanel({ milestones, loading, onCreateMilestone, onUpdateMilestone }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<"open" | "closed">("open");

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onCreateMilestone(title.trim(), description.trim(), dueDate || undefined);
      setTitle(""); setDescription(""); setDueDate(""); setShowCreate(false);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = milestones.filter(m => m.state === filter);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Milestones / Sprints</span>
        <button onClick={() => setShowCreate(!showCreate)} className="text-white/30 hover:text-white/60">
          <Plus size={14} />
        </button>
      </div>

      {/* Filter */}
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
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sprint / Milestone title"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={2}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none resize-none" />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none" />
          <Button size="sm" onClick={handleCreate} disabled={submitting} className="w-full h-7 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Target size={10} />}
            Create Milestone
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {!loading && filtered.length === 0 && <p className="text-xs text-white/30 text-center py-8">No {filter} milestones</p>}
        {filtered.map(m => {
          const total = m.open_issues + m.closed_issues;
          const pct = total > 0 ? Math.round((m.closed_issues / total) * 100) : 0;
          return (
            <div key={m.number} className="px-3 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                {m.state === "open" ? <Clock size={12} className="text-blue-400" /> : <CheckCircle2 size={12} className="text-green-400" />}
                <span className="text-xs font-semibold text-white flex-1">{m.title}</span>
                {m.state === "open" ? (
                  <button onClick={() => onUpdateMilestone(m.number, { state: "closed" })}
                    className="text-[9px] text-white/30 hover:text-white/60 flex items-center gap-1">
                    <CheckCircle2 size={9} /> Close
                  </button>
                ) : (
                  <button onClick={() => onUpdateMilestone(m.number, { state: "open" })}
                    className="text-[9px] text-white/30 hover:text-green-400 flex items-center gap-1">
                    <RotateCcw size={9} /> Reopen
                  </button>
                )}
              </div>
              {m.description && <p className="text-[10px] text-white/40 mt-1 ml-5">{m.description}</p>}
              {m.due_on && (
                <p className="text-[9px] text-white/25 mt-1 ml-5">
                  Due: {new Date(m.due_on).toLocaleDateString()}
                </p>
              )}
              {/* Progress */}
              <div className="ml-5 mt-2">
                <div className="flex items-center justify-between text-[9px] text-white/30 mb-1">
                  <span>{m.closed_issues}/{total} issues</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
