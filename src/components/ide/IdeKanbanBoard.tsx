import { useState } from "react";
import { Loader2, Plus, LayoutDashboard, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitIssue } from "@/hooks/useGitHubProxy";

interface Props {
  issues: GitIssue[];
  loading: boolean;
  onSelectIssue: (issue: GitIssue) => void;
  onUpdateIssue: (num: number, updates: { state?: string; labels?: string[] }) => Promise<void>;
  onCreateIssue: (title: string, body: string) => Promise<void>;
}

type Column = "backlog" | "todo" | "in_progress" | "review" | "done";

const columns: { id: Column; label: string; color: string; matchLabels: string[]; matchState?: string }[] = [
  { id: "backlog", label: "Backlog", color: "bg-white/10", matchLabels: ["backlog"] },
  { id: "todo", label: "To Do", color: "bg-blue-500/20", matchLabels: ["todo", "to do", "to-do"] },
  { id: "in_progress", label: "In Progress", color: "bg-yellow-500/20", matchLabels: ["in progress", "in-progress", "wip"] },
  { id: "review", label: "Review", color: "bg-purple-500/20", matchLabels: ["review", "needs review", "pr"] },
  { id: "done", label: "Done", color: "bg-green-500/20", matchLabels: [], matchState: "closed" },
];

function categorizeIssue(issue: GitIssue): Column {
  if (issue.state === "closed") return "done";
  const labelNames = issue.labels.map(l => l.name.toLowerCase());
  for (const col of columns) {
    if (col.matchLabels.some(ml => labelNames.includes(ml))) return col.id;
  }
  // Default: if assigned → in_progress, else → todo
  if (issue.assignees.length > 0) return "in_progress";
  return "todo";
}

export function IdeKanbanBoard({ issues, loading, onSelectIssue, onUpdateIssue, onCreateIssue }: Props) {
  const [quickAdd, setQuickAdd] = useState<Column | null>(null);
  const [quickTitle, setQuickTitle] = useState("");
  const [draggedIssue, setDraggedIssue] = useState<GitIssue | null>(null);
  const [dragOverCol, setDragOverCol] = useState<Column | null>(null);

  const buckets: Record<Column, GitIssue[]> = { backlog: [], todo: [], in_progress: [], review: [], done: [] };
  for (const issue of issues) {
    const col = categorizeIssue(issue);
    buckets[col].push(issue);
  }

  const handleDrop = async (targetCol: Column) => {
    if (!draggedIssue) return;
    setDragOverCol(null);
    const currentCol = categorizeIssue(draggedIssue);
    if (currentCol === targetCol) return;

    if (targetCol === "done") {
      await onUpdateIssue(draggedIssue.number, { state: "closed" });
    } else {
      const currentLabels = draggedIssue.labels.map(l => l.name);
      // Remove old column labels
      const allColumnLabels = columns.flatMap(c => c.matchLabels);
      const cleanedLabels = currentLabels.filter(l => !allColumnLabels.includes(l.toLowerCase()));
      // Add new column label
      const targetLabel = columns.find(c => c.id === targetCol)?.matchLabels[0];
      if (targetLabel) cleanedLabels.push(targetLabel);
      const updates: { state?: string; labels?: string[] } = { labels: cleanedLabels };
      if (draggedIssue.state === "closed") updates.state = "open";
      await onUpdateIssue(draggedIssue.number, updates);
    }
    setDraggedIssue(null);
  };

  const handleQuickCreate = async (col: Column) => {
    if (!quickTitle.trim()) return;
    const labels: string[] = [];
    const colDef = columns.find(c => c.id === col);
    if (colDef?.matchLabels[0]) labels.push(colDef.matchLabels[0]);
    await onCreateIssue(quickTitle.trim(), "");
    setQuickTitle("");
    setQuickAdd(null);
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
          <div
            key={col.id}
            className={`flex-shrink-0 w-[200px] flex flex-col rounded-lg border transition-colors ${
              dragOverCol === col.id ? "border-blue-500/40 bg-blue-500/5" : "border-white/5 bg-white/[0.02]"
            }`}
            onDragOver={e => { e.preventDefault(); setDragOverCol(col.id); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => handleDrop(col.id)}
          >
            {/* Column header */}
            <div className="px-2.5 py-2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className="text-[10px] font-semibold text-white/60 flex-1">{col.label}</span>
              <span className="text-[9px] text-white/25 bg-white/5 px-1.5 py-0.5 rounded-full">
                {buckets[col.id].length}
              </span>
              <button onClick={() => setQuickAdd(quickAdd === col.id ? null : col.id)} className="text-white/20 hover:text-white/50">
                <Plus size={10} />
              </button>
            </div>

            {/* Quick add */}
            {quickAdd === col.id && (
              <div className="px-2 pb-2">
                <input
                  autoFocus
                  value={quickTitle}
                  onChange={e => setQuickTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleQuickCreate(col.id)}
                  onBlur={() => { if (!quickTitle.trim()) setQuickAdd(null); }}
                  placeholder="Issue title…"
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none"
                />
              </div>
            )}

            {/* Cards */}
            <div className="flex-1 overflow-y-auto px-1.5 pb-1.5 space-y-1" style={{ scrollbarWidth: "thin" }}>
              {buckets[col.id].map(issue => (
                <div
                  key={issue.number}
                  draggable
                  onDragStart={() => setDraggedIssue(issue)}
                  onDragEnd={() => { setDraggedIssue(null); setDragOverCol(null); }}
                  onClick={() => onSelectIssue(issue)}
                  className={`group bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-lg p-2 cursor-pointer transition-all ${
                    draggedIssue?.number === issue.number ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    <GripVertical size={10} className="text-white/10 group-hover:text-white/25 mt-0.5 flex-shrink-0 cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white/80 font-medium leading-tight line-clamp-2">{issue.title}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] text-white/25">#{issue.number}</span>
                        {issue.assignees.slice(0, 2).map(a => (
                          <img key={a.login} src={a.avatar_url} className="w-3.5 h-3.5 rounded-full" alt={a.login} title={a.login} />
                        ))}
                      </div>
                      {issue.labels.length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {issue.labels.slice(0, 2).map(l => (
                            <span key={l.name} className="text-[8px] px-1 py-0.5 rounded"
                              style={{ backgroundColor: `#${l.color}20`, color: `#${l.color}` }}>
                              {l.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
