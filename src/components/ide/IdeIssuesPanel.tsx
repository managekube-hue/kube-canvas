import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitIssue } from "@/hooks/useGitHubProxy";

interface Props {
  issues: GitIssue[];
  onCreateIssue: (title: string, body: string) => Promise<void>;
  loading: boolean;
  onSelectIssue?: (issue: GitIssue) => void;
}

export function IdeIssuesPanel({ issues, onCreateIssue, loading, onSelectIssue }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    await onCreateIssue(title.trim(), body.trim());
    setTitle("");
    setBody("");
    setShowCreate(false);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Issues</span>
        <button onClick={() => setShowCreate(!showCreate)} className="text-white/30 hover:text-white/60">
          <Plus size={14} />
        </button>
      </div>

      {showCreate && (
        <div className="px-3 py-2 border-b border-white/5 space-y-2">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue title"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none resize-none"
          />
          <Button size="sm" onClick={handleCreate} disabled={submitting} className="w-full h-7 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Plus size={10} />}
            Create Issue
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {!loading && issues.length === 0 && (
          <p className="text-xs text-white/30 text-center py-8">No open issues</p>
        )}
        {issues.map(issue => (
          <div key={issue.number} className="px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer" onClick={() => onSelectIssue?.(issue)}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${issue.state === "open" ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-xs font-medium text-white truncate flex-1">{issue.title}</span>
              <span className="text-[10px] text-white/30">#{issue.number}</span>
            </div>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {issue.labels.slice(0, 3).map(l => (
                <span key={l.name} className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `#${l.color}25`, color: `#${l.color}` }}>
                  {l.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
