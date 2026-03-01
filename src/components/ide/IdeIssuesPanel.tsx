import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReachIssue } from "@/hooks/useReachIssues";

interface Props {
  issues: ReachIssue[];
  onCreateIssue: (title: string, body: string, status?: string, priority?: string) => Promise<void>;
  loading: boolean;
  onSelectIssue?: (issue: ReachIssue) => void;
}

type IssueFilter = "open" | "closed" | "all";

const statusColors: Record<string, string> = {
  backlog: "bg-white/30",
  todo: "bg-blue-500",
  in_progress: "bg-yellow-500",
  review: "bg-purple-500",
  done: "bg-green-500",
  closed: "bg-green-500",
};

export function IdeIssuesPanel({ issues, onCreateIssue, loading, onSelectIssue }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("medium");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<IssueFilter>("open");

  const openStatuses = ["backlog", "todo", "in_progress", "review"];
  const filteredIssues = filter === "all"
    ? issues
    : filter === "open"
      ? issues.filter(i => openStatuses.includes(i.status))
      : issues.filter(i => i.status === "done" || i.status === "closed");

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onCreateIssue(title.trim(), body.trim(), "todo", priority);
      setTitle(""); setBody(""); setPriority("medium"); setShowCreate(false);
    } finally { setSubmitting(false); }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Issues</span>
        <button onClick={() => setShowCreate(!showCreate)} className="text-white/30 hover:text-white/60">
          <Plus size={14} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="px-3 py-1.5 border-b border-white/5 flex gap-1">
        {(["open", "closed", "all"] as IssueFilter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              filter === f ? "bg-blue-600/20 text-blue-400" : "text-white/30 hover:text-white/50"
            }`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="text-[9px] text-white/20 ml-auto">{filteredIssues.length}</span>
      </div>

      {showCreate && (
        <div className="px-3 py-2 border-b border-white/5 space-y-2">
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Description"
            rows={3} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none resize-none" />
          <select value={priority} onChange={e => setPriority(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none">
            <option value="low" className="bg-[#0c0c0c]">Low</option>
            <option value="medium" className="bg-[#0c0c0c]">Medium</option>
            <option value="high" className="bg-[#0c0c0c]">High</option>
            <option value="urgent" className="bg-[#0c0c0c]">Urgent</option>
          </select>
          <Button size="sm" onClick={handleCreate} disabled={submitting} className="w-full h-7 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Plus size={10} />}
            Create Issue
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {!loading && filteredIssues.length === 0 && (
          <p className="text-xs text-white/30 text-center py-8">No {filter} issues — create one above</p>
        )}
        {filteredIssues.map(issue => (
          <div key={issue.id} className="px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer" onClick={() => onSelectIssue?.(issue)}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[issue.status] || "bg-white/30"}`} />
              <span className="text-xs font-medium text-white truncate flex-1">{issue.title}</span>
              <span className="text-[10px] text-white/30">#{issue.number}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[9px] text-white/20 capitalize">{issue.status.replace("_", " ")}</span>
              <span className="text-[9px] text-white/15">·</span>
              <span className="text-[9px] text-white/20 capitalize">{issue.priority}</span>
              {issue.labels.length > 0 && (
                <div className="flex gap-1">
                  {issue.labels.slice(0, 3).map(l => (
                    <span key={l} className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300">{l}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
