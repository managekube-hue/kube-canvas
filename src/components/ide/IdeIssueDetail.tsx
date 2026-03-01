import { useState, useEffect } from "react";
import { ArrowLeft, Loader2, MessageSquare, Tag, User, Calendar, X, Send, Clock, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { GitIssue, GitComment, GitLabel } from "@/hooks/useGitHub";

interface Props {
  issue: GitIssue;
  onBack: () => void;
  onLoadComments: (num: number) => Promise<GitComment[]>;
  onAddComment: (num: number, body: string) => Promise<void>;
  onUpdateIssue: (num: number, updates: { state?: string; assignees?: string[]; labels?: string[] }) => Promise<void>;
  availableLabels: GitLabel[];
  availableAssignees: Array<{ login: string; avatar_url: string }>;
}

export function IdeIssueDetail({
  issue, onBack, onLoadComments, onAddComment, onUpdateIssue,
  availableLabels, availableAssignees,
}: Props) {
  const [comments, setComments] = useState<GitComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showLabelPicker, setShowLabelPicker] = useState(false);
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);

  useEffect(() => {
    setLoadingComments(true);
    onLoadComments(issue.number)
      .then(setComments)
      .catch(console.error)
      .finally(() => setLoadingComments(false));
  }, [issue.number]);

  const handleComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await onAddComment(issue.number, newComment.trim());
      const updated = await onLoadComments(issue.number);
      setComments(updated);
      setNewComment("");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleState = () => {
    onUpdateIssue(issue.number, { state: issue.state === "open" ? "closed" : "open" });
  };

  const toggleLabel = (label: string) => {
    const current = issue.labels.map(l => l.name);
    const next = current.includes(label) ? current.filter(l => l !== label) : [...current, label];
    onUpdateIssue(issue.number, { labels: next });
  };

  const toggleAssignee = (login: string) => {
    const current = issue.assignees.map(a => a.login);
    const next = current.includes(login) ? current.filter(l => l !== login) : [...current, login];
    onUpdateIssue(issue.number, { assignees: next });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <button onClick={onBack} className="text-white/30 hover:text-white/60">
          <ArrowLeft size={14} />
        </button>
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Issue #{issue.number}</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {/* Issue header */}
        <div className="px-3 py-3 border-b border-white/5">
          <div className="flex items-start gap-2">
            <span className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${issue.state === "open" ? "bg-green-500" : "bg-purple-500"}`} />
            <h3 className="text-sm font-semibold text-white flex-1">{issue.title}</h3>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-white/30">
            <img src={issue.user.avatar_url} className="w-4 h-4 rounded-full" alt="" />
            <span>{issue.user.login}</span>
            <span>·</span>
            <Calendar size={9} />
            <span>{new Date(issue.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Body */}
        {issue.body && (
          <div className="px-3 py-3 border-b border-white/5 text-xs text-white/70 prose prose-invert prose-xs max-w-none">
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </div>
        )}

        {/* Sidebar info */}
        <div className="px-3 py-3 border-b border-white/5 space-y-3">
          {/* Assignees */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Assignees</span>
              <button onClick={() => setShowAssigneePicker(!showAssigneePicker)} className="text-[9px] text-blue-400 hover:text-blue-300">Edit</button>
            </div>
            {issue.assignees.length > 0 ? (
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                {issue.assignees.map(a => (
                  <div key={a.login} className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-0.5">
                    <img src={a.avatar_url} className="w-3 h-3 rounded-full" alt="" />
                    <span className="text-[10px] text-white/60">{a.login}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-white/20 mt-1">None</p>
            )}
            {showAssigneePicker && (
              <div className="mt-2 bg-white/5 rounded-lg border border-white/10 p-2 space-y-1 max-h-32 overflow-y-auto">
                {availableAssignees.map(a => (
                  <button key={a.login} onClick={() => toggleAssignee(a.login)}
                    className="w-full flex items-center gap-2 px-2 py-1 text-[10px] hover:bg-white/5 rounded transition-colors">
                    {issue.assignees.some(x => x.login === a.login)
                      ? <CheckCircle2 size={10} className="text-blue-400" />
                      : <Circle size={10} className="text-white/20" />}
                    <img src={a.avatar_url} className="w-4 h-4 rounded-full" alt="" />
                    <span className="text-white/60">{a.login}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Labels */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Labels</span>
              <button onClick={() => setShowLabelPicker(!showLabelPicker)} className="text-[9px] text-blue-400 hover:text-blue-300">Edit</button>
            </div>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {issue.labels.map(l => (
                <span key={l.name} className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `#${l.color}25`, color: `#${l.color}` }}>
                  {l.name}
                </span>
              ))}
              {issue.labels.length === 0 && <p className="text-[10px] text-white/20">None</p>}
            </div>
            {showLabelPicker && (
              <div className="mt-2 bg-white/5 rounded-lg border border-white/10 p-2 space-y-1 max-h-32 overflow-y-auto">
                {availableLabels.map(l => (
                  <button key={l.name} onClick={() => toggleLabel(l.name)}
                    className="w-full flex items-center gap-2 px-2 py-1 text-[10px] hover:bg-white/5 rounded transition-colors">
                    {issue.labels.some(x => x.name === l.name)
                      ? <CheckCircle2 size={10} className="text-blue-400" />
                      : <Circle size={10} className="text-white/20" />}
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${l.color}` }} />
                    <span className="text-white/60">{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Milestone */}
          {issue.milestone && (
            <div>
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Milestone</span>
              <p className="text-[10px] text-white/50 mt-1">{issue.milestone.title}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-3 py-2 border-b border-white/5">
          <Button size="sm" onClick={toggleState}
            className={`h-6 text-[10px] gap-1 ${issue.state === "open" ? "bg-purple-600 hover:bg-purple-700" : "bg-green-600 hover:bg-green-700"}`}>
            {issue.state === "open" ? <X size={10} /> : <CheckCircle2 size={10} />}
            {issue.state === "open" ? "Close Issue" : "Reopen Issue"}
          </Button>
        </div>

        {/* Comments */}
        <div className="px-3 py-2">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider flex items-center gap-1">
            <MessageSquare size={9} /> Comments ({comments.length})
          </span>
        </div>
        {loadingComments && (
          <div className="flex justify-center py-4">
            <Loader2 size={14} className="animate-spin text-blue-400" />
          </div>
        )}
        {comments.map(c => (
          <div key={c.id} className="px-3 py-2.5 border-t border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
              <img src={c.user.avatar_url} className="w-4 h-4 rounded-full" alt="" />
              <span className="text-[10px] font-bold text-white/60">{c.user.login}</span>
              <span className="text-[9px] text-white/20">
                {new Date(c.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="text-xs text-white/60 prose prose-invert prose-xs max-w-none pl-6">
              <ReactMarkdown>{c.body}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Comment input */}
      <div className="px-3 py-2 border-t border-white/5">
        <div className="flex items-end gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment…"
            rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none resize-none placeholder:text-white/20"
          />
          <Button size="sm" onClick={handleComment} disabled={submitting || !newComment.trim()}
            className="h-8 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Send size={10} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
