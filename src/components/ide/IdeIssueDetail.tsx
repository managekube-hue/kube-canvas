import { useState } from "react";
import { ArrowLeft, Calendar, X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { ReachIssue } from "@/hooks/useReachIssues";

interface Props {
  issue: ReachIssue;
  onBack: () => void;
  onUpdateIssue: (id: string, updates: { status?: string; priority?: string; labels?: string[]; title?: string; body?: string }) => Promise<void>;
}

const statusOptions = ["backlog", "todo", "in_progress", "review", "done"];
const priorityOptions = ["low", "medium", "high", "urgent"];

export function IdeIssueDetail({ issue, onBack, onUpdateIssue }: Props) {
  const [editingBody, setEditingBody] = useState(false);
  const [bodyDraft, setBodyDraft] = useState(issue.body || "");
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (status: string) => {
    setSaving(true);
    try { await onUpdateIssue(issue.id, { status }); } finally { setSaving(false); }
  };

  const handlePriorityChange = async (priority: string) => {
    setSaving(true);
    try { await onUpdateIssue(issue.id, { priority }); } finally { setSaving(false); }
  };

  const handleBodySave = async () => {
    setSaving(true);
    try {
      await onUpdateIssue(issue.id, { body: bodyDraft });
      setEditingBody(false);
    } finally { setSaving(false); }
  };

  const toggleDone = () => handleStatusChange(issue.status === "done" ? "todo" : "done");

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <button onClick={onBack} className="text-white/30 hover:text-white/60"><ArrowLeft size={14} /></button>
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Issue #{issue.number}</span>
        {saving && <Loader2 size={12} className="animate-spin text-blue-400 ml-auto" />}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {/* Header */}
        <div className="px-3 py-3 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">{issue.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-white/30">
            <Calendar size={9} />
            <span>{new Date(issue.created_at).toLocaleDateString()}</span>
            <span>·</span>
            <span className="capitalize">{issue.priority} priority</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-3 py-3 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Description</span>
            <button onClick={() => { setEditingBody(!editingBody); setBodyDraft(issue.body || ""); }}
              className="text-[9px] text-blue-400 hover:text-blue-300">
              {editingBody ? "Cancel" : "Edit"}
            </button>
          </div>
          {editingBody ? (
            <div className="space-y-2">
              <textarea value={bodyDraft} onChange={e => setBodyDraft(e.target.value)} rows={6}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none resize-none" />
              <Button size="sm" onClick={handleBodySave} disabled={saving} className="h-6 text-[10px] bg-blue-600 gap-1">
                <Send size={10} /> Save
              </Button>
            </div>
          ) : (
            <div className="text-xs text-white/60 prose prose-invert prose-xs max-w-none">
              {issue.body ? <ReactMarkdown>{issue.body}</ReactMarkdown> : <span className="text-white/20">No description</span>}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="px-3 py-3 border-b border-white/5">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Status</span>
          <div className="flex gap-1 mt-2 flex-wrap">
            {statusOptions.map(s => (
              <button key={s} onClick={() => handleStatusChange(s)}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-colors capitalize ${
                  issue.status === s ? "bg-blue-600/30 text-blue-400 border border-blue-500/30" : "bg-white/5 text-white/40 border border-white/5 hover:border-white/10"
                }`}>
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="px-3 py-3 border-b border-white/5">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Priority</span>
          <div className="flex gap-1 mt-2 flex-wrap">
            {priorityOptions.map(p => (
              <button key={p} onClick={() => handlePriorityChange(p)}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-colors capitalize ${
                  issue.priority === p ? "bg-blue-600/30 text-blue-400 border border-blue-500/30" : "bg-white/5 text-white/40 border border-white/5 hover:border-white/10"
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Labels */}
        <div className="px-3 py-3 border-b border-white/5">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Labels</span>
          <div className="flex gap-1 mt-2 flex-wrap">
            {issue.labels.length > 0 ? issue.labels.map(l => (
              <span key={l} className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300">{l}</span>
            )) : <span className="text-[10px] text-white/20">None</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="px-3 py-3">
          <Button size="sm" onClick={toggleDone}
            className={`h-7 text-[10px] gap-1 ${issue.status === "done" ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`}>
            {issue.status === "done" ? <CheckCircle2 size={10} /> : <X size={10} />}
            {issue.status === "done" ? "Reopen Issue" : "Mark Done"}
          </Button>
        </div>
      </div>
    </div>
  );
}
