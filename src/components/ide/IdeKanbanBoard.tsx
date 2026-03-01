import { useState } from "react";
import { Loader2, Plus, LayoutDashboard, GripVertical } from "lucide-react";
import { toast } from "sonner";
import type { ReachIssue, IssueColumn } from "@/hooks/useReachIssues";

interface Props {
  issues: ReachIssue[];
  loading: boolean;
  onSelectIssue: (issue: ReachIssue) => void;
  onUpdateIssue: (id: string, updates: { status?: string }) => Promise<void>;
  onCreateIssue: (title: string, body: string, status?: string) => Promise<void>;
}

const columns: { id: IssueColumn; label: string; color: string }[] = [
  { id: "backlog", label: "Backlog", color: "bg-white/10" },
  { id: "todo", label: "To Do", color: "bg-blue-500/20" },
  { id: "in_progress", label: "In Progress", color: "bg-yellow-500/20" },
  { id: "review", label: "Review", color: "bg-purple-500/20" },
  { id: "done", label: "Done", color: "bg-green-500/20" },
];

const priorityColors: Record<string, string> = {
  urgent: "text-red-400",
  high: "text-orange-400",
  medium: "text-yellow-400",
  low: "text-white/30",
};

export function IdeKanbanBoard({ issues, loading, onSelectIssue, onUpdateIssue, onCreateIssue }: Props) {
  const [quickAdd, setQuickAdd] = useState<IssueColumn | null>(null);
  const [quickTitle, setQuickTitle] = useState("");
  const [draggedIssue, setDraggedIssue] = useState<ReachIssue | null>(null);
  const [dragOverCol, setDragOverCol] = useState<IssueColumn | null>(null);
  const [updatingIssues, setUpdatingIssues] = useState<Set<string>>(new Set());

  // Bucket issues by status
  const buckets: Record<IssueColumn, ReachIssue[]> = { backlog: [], todo: [], in_progress: [], review: [], done: [] };
  for (const issue of issues) {
    const col = (issue.status === "closed" ? "done" : issue.status) as IssueColumn;
    if (buckets[col]) buckets[col].push(issue);
    else buckets.backlog.push(issue); // fallback
  }

  const handleDrop = async (targetCol: IssueColumn) => {
    if (!draggedIssue) return;
    setDragOverCol(null);
    const currentCol = draggedIssue.status === "closed" ? "done" : draggedIssue.status;
    if (currentCol === targetCol) { setDraggedIssue(null); return; }

    setUpdatingIssues(prev => new Set(prev).add(draggedIssue.id));
    try {
      await onUpdateIssue(draggedIssue.id, { status: targetCol });
      toast.success(`Issue #${draggedIssue.number} → ${columns.find(c => c.id === targetCol)?.label}`);
    } catch {
      toast.error(`Failed to move issue #${draggedIssue.number}`);
    } finally {
      setUpdatingIssues(prev => { const n = new Set(prev); n.delete(draggedIssue.id); return n; });
      setDraggedIssue(null);
    }
  };

  const handleQuickCreate = async (col: IssueColumn) => {
    if (!quickTitle.trim()) return;
    await onCreateIssue(quickTitle.trim(), "", col);
    setQuickTitle(""); setQuickAdd(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={20} className="animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <LayoutDashboard size={12} className="text-blue-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Issue Board</span>
        <span className="text-[9px] text-white/20 ml-auto">{issues.length} issues</span>
      </div>

      <div className="flex-1 flex gap-2 p-2 overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
        {columns.map(col => (
          <div key={col.id}
            className={`flex-shrink-0 w-[200px] flex flex-col rounded-lg border transition-colors ${
              dragOverCol === col.id ? "border-blue-500/40 bg-blue-500/5" : "border-white/5 bg-white/[0.02]"
            }`}
            onDragOver={e => { e.preventDefault(); setDragOverCol(col.id); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => handleDrop(col.id)}
          >
            <div className="px-2.5 py-2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className="text-[10px] font-semibold text-white/60 flex-1">{col.label}</span>
              <span className="text-[9px] text-white/25 bg-white/5 px-1.5 py-0.5 rounded-full">{buckets[col.id].length}</span>
              <button onClick={() => setQuickAdd(quickAdd === col.id ? null : col.id)} className="text-white/20 hover:text-white/50">
                <Plus size={10} />
              </button>
            </div>

            {quickAdd === col.id && (
              <div className="px-2 pb-2">
                <input autoFocus value={quickTitle} onChange={e => setQuickTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleQuickCreate(col.id)}
                  onBlur={() => { if (!quickTitle.trim()) setQuickAdd(null); }}
                  placeholder="Issue title…"
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none" />
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-1.5 pb-1.5 space-y-1" style={{ scrollbarWidth: "thin" }}>
              {buckets[col.id].map(issue => {
                const isUpdating = updatingIssues.has(issue.id);
                return (
                  <div key={issue.id} draggable={!isUpdating}
                    onDragStart={() => setDraggedIssue(issue)}
                    onDragEnd={() => { setDraggedIssue(null); setDragOverCol(null); }}
                    onClick={() => !isUpdating && onSelectIssue(issue)}
                    className={`group bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-lg p-2 cursor-pointer transition-all relative ${
                      draggedIssue?.id === issue.id ? "opacity-40" : ""
                    } ${isUpdating ? "pointer-events-none" : ""}`}
                  >
                    {isUpdating && (
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center z-10">
                        <Loader2 size={14} className="animate-spin text-blue-400" />
                      </div>
                    )}
                    <div className="flex items-start gap-1.5">
                      <GripVertical size={10} className="text-white/10 group-hover:text-white/25 mt-0.5 flex-shrink-0 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-white/80 font-medium leading-tight line-clamp-2">{issue.title}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[9px] text-white/25">#{issue.number}</span>
                          <span className={`text-[8px] ${priorityColors[issue.priority] || "text-white/30"}`}>
                            {issue.priority}
                          </span>
                        </div>
                        {issue.labels.length > 0 && (
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            {issue.labels.slice(0, 2).map(l => (
                              <span key={l} className="text-[8px] px-1 py-0.5 rounded bg-blue-500/15 text-blue-300">
                                {l}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
