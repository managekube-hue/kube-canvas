import { useState } from "react";
import { Plus, Loader2, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { GitIssue, GitLabel } from "@/hooks/useGitHub";

interface Props {
  issues: GitIssue[];
  onCreateIssue: (title: string, body: string, labels?: string[], assignees?: string[], milestone?: number) => Promise<void>;
  loading: boolean;
  onSelectIssue?: (issue: GitIssue) => void;
  availableLabels?: GitLabel[];
  availableAssignees?: Array<{ login: string; avatar_url: string }>;
  milestones?: Array<{ number: number; title: string }>;
}

type IssueFilter = "open" | "closed" | "all";

export function IdeIssuesPanel({ issues, onCreateIssue, loading, onSelectIssue, availableLabels = [], availableAssignees = [], milestones = [] }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<IssueFilter>("open");
  const [previewMd, setPreviewMd] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<number | undefined>();
  const [showLabelPicker, setShowLabelPicker] = useState(false);
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);

  // Filter out pull requests (GitHub issues API includes PRs — they have pull_request key)
  const pureIssues = issues.filter(i => !(i as any).pull_request);
  const filteredIssues = filter === "all" ? pureIssues : pureIssues.filter(i => i.state === filter);

  console.log("[IdeIssuesPanel] Total from API:", issues.length, "Pure issues:", pureIssues.length, "Filtered:", filteredIssues.length);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    await onCreateIssue(title.trim(), body.trim(), selectedLabels.length > 0 ? selectedLabels : undefined, selectedAssignees.length > 0 ? selectedAssignees : undefined, selectedMilestone);
    setTitle(""); setBody(""); setSelectedLabels([]); setSelectedAssignees([]); setSelectedMilestone(undefined);
    setShowCreate(false); setSubmitting(false); setPreviewMd(false);
  };

  const toggleLabel = (name: string) => setSelectedLabels(prev => prev.includes(name) ? prev.filter(l => l !== name) : [...prev, name]);
  const toggleAssignee = (login: string) => setSelectedAssignees(prev => prev.includes(login) ? prev.filter(a => a !== login) : [...prev, login]);

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
        <div className="px-3 py-2 border-b border-white/5 space-y-2 max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
          {/* Title */}
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none" />

          {/* Body with markdown toggle */}
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[9px] text-white/30 flex-1">Description</span>
            <button onClick={() => setPreviewMd(!previewMd)} className="text-[9px] text-white/30 hover:text-white/50 flex items-center gap-1">
              {previewMd ? <EyeOff size={9} /> : <Eye size={9} />}
              {previewMd ? "Edit" : "Preview"}
            </button>
          </div>
          {previewMd ? (
            <div className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 prose prose-invert prose-xs max-w-none min-h-[60px]">
              {body.trim() ? <ReactMarkdown>{body}</ReactMarkdown> : <span className="text-white/20">Nothing to preview</span>}
            </div>
          ) : (
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Description (supports markdown)"
              rows={3} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none resize-none" />
          )}

          {/* Assignee picker */}
          {availableAssignees.length > 0 && (
            <div>
              <button onClick={() => setShowAssigneePicker(!showAssigneePicker)}
                className="text-[9px] text-white/40 hover:text-white/60 flex items-center gap-1 w-full">
                Assignees {selectedAssignees.length > 0 && `(${selectedAssignees.length})`}
              </button>
              {showAssigneePicker && (
                <div className="mt-1 bg-white/5 rounded border border-white/10 p-1.5 max-h-24 overflow-y-auto space-y-0.5">
                  {availableAssignees.map(a => (
                    <button key={a.login} onClick={() => toggleAssignee(a.login)}
                      className="w-full flex items-center gap-2 px-1.5 py-1 text-[10px] hover:bg-white/5 rounded">
                      {selectedAssignees.includes(a.login) ? <CheckCircle2 size={9} className="text-blue-400" /> : <Circle size={9} className="text-white/20" />}
                      <img src={a.avatar_url} className="w-3.5 h-3.5 rounded-full" alt="" />
                      <span className="text-white/60">{a.login}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Label picker */}
          {availableLabels.length > 0 && (
            <div>
              <button onClick={() => setShowLabelPicker(!showLabelPicker)}
                className="text-[9px] text-white/40 hover:text-white/60 flex items-center gap-1 w-full">
                Labels {selectedLabels.length > 0 && `(${selectedLabels.length})`}
              </button>
              {showLabelPicker && (
                <div className="mt-1 bg-white/5 rounded border border-white/10 p-1.5 max-h-24 overflow-y-auto space-y-0.5">
                  {availableLabels.map(l => (
                    <button key={l.name} onClick={() => toggleLabel(l.name)}
                      className="w-full flex items-center gap-2 px-1.5 py-1 text-[10px] hover:bg-white/5 rounded">
                      {selectedLabels.includes(l.name) ? <CheckCircle2 size={9} className="text-blue-400" /> : <Circle size={9} className="text-white/20" />}
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${l.color}` }} />
                      <span className="text-white/60">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Milestone picker */}
          {milestones.length > 0 && (
            <div>
              <span className="text-[9px] text-white/40">Milestone</span>
              <select value={selectedMilestone || ""} onChange={e => setSelectedMilestone(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none mt-0.5">
                <option value="" className="bg-[#0c0c0c]">None</option>
                {milestones.map(m => <option key={m.number} value={m.number} className="bg-[#0c0c0c]">{m.title}</option>)}
              </select>
            </div>
          )}

          <Button size="sm" onClick={handleCreate} disabled={submitting} className="w-full h-7 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Plus size={10} />}
            Create Issue
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {!loading && filteredIssues.length === 0 && (
          <p className="text-xs text-white/30 text-center py-8">No {filter} issues</p>
        )}
        {filteredIssues.map(issue => (
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
