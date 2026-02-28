import { useState, useEffect } from "react";
import { GitPullRequest, Loader2, Plus, GitMerge, ArrowLeft, Send, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { GitPullRequest as PR, GitPrFile, GitComment } from "@/hooks/useGitHubProxy";

// ── PR List ─────────────────────────────────

interface ListProps {
  pulls: PR[];
  loading: boolean;
  onSelectPr: (pr: PR) => void;
  onCreatePr: (title: string, head: string, base: string, body: string) => Promise<void>;
  branches: string[];
  currentBranch: string;
}

export function IdePullRequestsPanel({ pulls, loading, onSelectPr, onCreatePr, branches, currentBranch }: ListProps) {
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
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = pulls.filter(p => filter === "open" ? !p.merged && p.state === "open" : p.state === "closed" || p.merged);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Pull Requests</span>
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
        {filtered.map(pr => (
          <button key={pr.number} onClick={() => onSelectPr(pr)}
            className="w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              {pr.merged ? (
                <GitMerge size={12} className="text-purple-400 flex-shrink-0" />
              ) : (
                <GitPullRequest size={12} className={`flex-shrink-0 ${pr.state === "open" ? "text-green-400" : "text-red-400"}`} />
              )}
              <span className="text-xs font-medium text-white truncate flex-1">{pr.title}</span>
              <span className="text-[10px] text-white/30">#{pr.number}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 ml-5 text-[10px] text-white/25">
              <span>{pr.head.ref} → {pr.base.ref}</span>
              <span>+{pr.additions} −{pr.deletions}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── PR Detail ───────────────────────────────

interface DetailProps {
  pr: PR;
  onBack: () => void;
  onLoadFiles: (num: number) => Promise<GitPrFile[]>;
  onLoadComments: (num: number) => Promise<GitComment[]>;
  onAddComment: (num: number, body: string) => Promise<void>;
  onMerge: (num: number, method: "merge" | "squash" | "rebase") => Promise<void>;
}

export function IdePrDetail({ pr, onBack, onLoadFiles, onLoadComments, onAddComment, onMerge }: DetailProps) {
  const [files, setFiles] = useState<GitPrFile[]>([]);
  const [comments, setComments] = useState<GitComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [merging, setMerging] = useState(false);
  const [tab, setTab] = useState<"files" | "conversation">("files");

  useEffect(() => {
    Promise.all([
      onLoadFiles(pr.number).then(setFiles),
      onLoadComments(pr.number).then(setComments),
    ]).finally(() => setLoading(false));
  }, [pr.number]);

  const toggleFile = (filename: string) => {
    setExpandedFiles(prev => {
      const next = new Set(prev);
      next.has(filename) ? next.delete(filename) : next.add(filename);
      return next;
    });
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await onAddComment(pr.number, newComment.trim());
      setComments(await onLoadComments(pr.number));
      setNewComment("");
    } finally { setSubmitting(false); }
  };

  const handleMerge = async (method: "merge" | "squash" | "rebase") => {
    setMerging(true);
    try { await onMerge(pr.number, method); } finally { setMerging(false); }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <button onClick={onBack} className="text-white/30 hover:text-white/60"><ArrowLeft size={14} /></button>
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">PR #{pr.number}</span>
      </div>

      {/* PR info */}
      <div className="px-3 py-3 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white">{pr.title}</h3>
        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/30">
          <img src={pr.user.avatar_url} className="w-4 h-4 rounded-full" alt="" />
          <span>{pr.user.login}</span>
          <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">{pr.head.ref}</span>
          <span>→</span>
          <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">{pr.base.ref}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px]">
          <span className="text-green-400">+{pr.additions}</span>
          <span className="text-red-400">−{pr.deletions}</span>
          <span className="text-white/25">{pr.changed_files} files</span>
        </div>
      </div>

      {/* Merge actions */}
      {pr.state === "open" && !pr.merged && (
        <div className="px-3 py-2 border-b border-white/5 flex gap-2">
          <Button size="sm" onClick={() => handleMerge("merge")} disabled={merging}
            className="h-6 text-[10px] bg-green-600 hover:bg-green-700 gap-1">
            {merging ? <Loader2 size={10} className="animate-spin" /> : <GitMerge size={10} />}
            Merge
          </Button>
          <Button size="sm" onClick={() => handleMerge("squash")} disabled={merging}
            className="h-6 text-[10px] bg-white/10 hover:bg-white/15">Squash</Button>
          <Button size="sm" onClick={() => handleMerge("rebase")} disabled={merging}
            className="h-6 text-[10px] bg-white/10 hover:bg-white/15">Rebase</Button>
        </div>
      )}
      {pr.merged && (
        <div className="px-3 py-2 border-b border-white/5">
          <span className="text-[10px] text-purple-400 flex items-center gap-1"><GitMerge size={10} /> Merged</span>
        </div>
      )}

      {/* Tabs */}
      <div className="px-3 py-1.5 border-b border-white/5 flex gap-3">
        {(["files", "conversation"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-[10px] py-0.5 ${tab === t ? "text-blue-400 border-b border-blue-400" : "text-white/30"}`}>
            {t === "files" ? `Files (${files.length})` : `Comments (${comments.length})`}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}

        {tab === "files" && files.map(f => (
          <div key={f.filename} className="border-b border-white/5">
            <button onClick={() => toggleFile(f.filename)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/[0.02]">
              {expandedFiles.has(f.filename) ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              <span className={`text-[9px] px-1 rounded ${
                f.status === "added" ? "bg-green-500/15 text-green-400" :
                f.status === "removed" ? "bg-red-500/15 text-red-400" :
                "bg-yellow-500/15 text-yellow-400"
              }`}>{f.status[0].toUpperCase()}</span>
              <span className="text-white/60 truncate flex-1 text-left">{f.filename}</span>
              <span className="text-green-400 text-[10px]">+{f.additions}</span>
              <span className="text-red-400 text-[10px]">−{f.deletions}</span>
            </button>
            {expandedFiles.has(f.filename) && f.patch && (
              <pre className="px-3 pb-2 text-[10px] font-mono overflow-x-auto whitespace-pre" style={{ scrollbarWidth: "thin" }}>
                {f.patch.split("\n").map((line, i) => (
                  <div key={i} className={`px-2 ${
                    line.startsWith("+") ? "bg-green-500/10 text-green-300" :
                    line.startsWith("-") ? "bg-red-500/10 text-red-300" :
                    line.startsWith("@@") ? "text-blue-400/60" :
                    "text-white/40"
                  }`}>{line}</div>
                ))}
              </pre>
            )}
          </div>
        ))}

        {tab === "conversation" && (
          <>
            {pr.body && (
              <div className="px-3 py-3 border-b border-white/5 text-xs text-white/60 prose prose-invert prose-xs max-w-none">
                <ReactMarkdown>{pr.body}</ReactMarkdown>
              </div>
            )}
            {comments.map(c => (
              <div key={c.id} className="px-3 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-2 mb-1">
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
          </>
        )}
      </div>

      {/* Comment input */}
      {tab === "conversation" && (
        <div className="px-3 py-2 border-t border-white/5 flex items-end gap-2">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment…" rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none resize-none placeholder:text-white/20" />
          <Button size="sm" onClick={handleComment} disabled={submitting || !newComment.trim()}
            className="h-8 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Send size={10} />}
          </Button>
        </div>
      )}
    </div>
  );
}
