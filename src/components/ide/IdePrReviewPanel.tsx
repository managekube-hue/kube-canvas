import { useState, useEffect } from "react";
import { ArrowLeft, Check, X, MessageSquare, GitMerge, GitPullRequest as PrIcon, Loader2, Send, Eye, AlertCircle, ChevronDown, ChevronRight, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import type { GitPullRequest, GitPrFile, GitComment } from "@/hooks/useGitHub";

type ReviewStatus = "pending" | "approved" | "changes_requested" | "commented";

interface Review {
  id: number;
  user: { login: string; avatar_url: string };
  state: string;
  body: string;
  submitted_at: string;
}

interface Props {
  pr: GitPullRequest;
  onBack: () => void;
  onLoadFiles: (num: number) => Promise<GitPrFile[]>;
  onLoadComments: (num: number) => Promise<GitComment[]>;
  onLoadReviews: (num: number) => Promise<Review[]>;
  onAddComment: (num: number, body: string) => Promise<void>;
  onMerge: (num: number, method: "merge" | "squash" | "rebase") => Promise<void>;
  onUpdatePr: (num: number, updates: { title?: string; body?: string; state?: string }) => Promise<void>;
  onLoadFileContent?: (path: string, ref: string) => Promise<string>;
}

const reviewStatusConfig: Record<string, { icon: typeof Check; color: string; label: string }> = {
  APPROVED: { icon: Check, color: "text-emerald-400", label: "Approved" },
  CHANGES_REQUESTED: { icon: AlertCircle, color: "text-orange-400", label: "Changes requested" },
  COMMENTED: { icon: MessageSquare, color: "text-blue-400", label: "Commented" },
  PENDING: { icon: Eye, color: "text-yellow-400", label: "Pending" },
};

export function IdePrReviewPanel({ pr, onBack, onLoadFiles, onLoadComments, onLoadReviews, onAddComment, onMerge, onUpdatePr, onLoadFileContent }: Props) {
  const [files, setFiles] = useState<GitPrFile[]>([]);
  const [comments, setComments] = useState<GitComment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [merging, setMerging] = useState(false);
  const [mergeMethod, setMergeMethod] = useState<"merge" | "squash" | "rebase">("squash");
  const [tab, setTab] = useState<"overview" | "files" | "conversation">("overview");
  const [closing, setClosing] = useState(false);
  const [diffFile, setDiffFile] = useState<string | null>(null);
  const [diffBase, setDiffBase] = useState<string>("");
  const [diffHead, setDiffHead] = useState<string>("");
  const [diffLoading, setDiffLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      onLoadFiles(pr.number).then(setFiles),
      onLoadComments(pr.number).then(setComments),
      onLoadReviews(pr.number).then(setReviews),
    ]).finally(() => setLoading(false));
  }, [pr.number]);

  const toggleFile = (filename: string) => {
    setExpandedFiles(prev => {
      const next = new Set(prev);
      next.has(filename) ? next.delete(filename) : next.add(filename);
      return next;
    });
  };

  const loadDiff = async (filename: string) => {
    if (!onLoadFileContent) { toggleFile(filename); return; }
    if (diffFile === filename) { setDiffFile(null); return; }
    setDiffFile(filename);
    setDiffLoading(true);
    try {
      const [baseContent, headContent] = await Promise.all([
        onLoadFileContent(filename, pr.base.ref).catch(() => ""),
        onLoadFileContent(filename, pr.head.ref).catch(() => ""),
      ]);
      setDiffBase(baseContent); setDiffHead(headContent);
    } catch { setDiffBase(""); setDiffHead(""); }
    finally { setDiffLoading(false); }
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

  const handleMerge = async () => {
    setMerging(true);
    try {
      await onMerge(pr.number, mergeMethod);
      toast.success(`PR #${pr.number} merged`);
    } catch (err: any) {
      toast.error(err?.message || "Merge failed");
    } finally { setMerging(false); }
  };

  const handleClose = async () => {
    setClosing(true);
    try { await onUpdatePr(pr.number, { state: "closed" }); } finally { setClosing(false); }
  };

  const latestReviews = reviews.reduce<Record<string, Review>>((acc, r) => {
    if (!acc[r.user.login] || new Date(r.submitted_at) > new Date(acc[r.user.login].submitted_at)) acc[r.user.login] = r;
    return acc;
  }, {});

  const allApproved = Object.values(latestReviews).length > 0 && Object.values(latestReviews).every(r => r.state === "APPROVED");

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <button onClick={onBack} className="text-white/30 hover:text-white/60"><ArrowLeft size={14} /></button>
        <PrIcon size={12} className={pr.merged ? "text-purple-400" : pr.state === "open" ? "text-emerald-400" : "text-red-400"} />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">PR #{pr.number}</span>
        {pr.merged && <span className="text-[9px] bg-purple-500/15 text-purple-400 px-1.5 rounded">Merged</span>}
      </div>

      <div className="px-3 py-3 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white leading-tight">{pr.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-[10px] text-white/30 flex-wrap">
          <img src={pr.user.avatar_url} className="w-4 h-4 rounded-full" alt="" />
          <span>{pr.user.login}</span>
          <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">{pr.head.ref}</span>
          <span>→</span>
          <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">{pr.base.ref}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px]">
          <span className="text-emerald-400">+{pr.additions}</span>
          <span className="text-red-400">−{pr.deletions}</span>
          <span className="text-white/25">{pr.changed_files} files</span>
        </div>
        {pr.labels.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {pr.labels.map(l => (
              <span key={l.name} className="text-[9px] px-1.5 py-0.5 rounded-full border border-white/10"
                style={{ color: `#${l.color}`, borderColor: `#${l.color}40` }}>{l.name}</span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="px-3 py-1.5 border-b border-white/5 flex gap-3">
        {(["overview", "files", "conversation"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-[10px] py-0.5 capitalize ${tab === t ? "text-blue-400 border-b border-blue-400" : "text-white/30 hover:text-white/50"}`}>
            {t === "files" ? `Files (${files.length})` : t === "conversation" ? `Discussion (${comments.length})` : "Overview"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}

        {/* Overview tab */}
        {tab === "overview" && !loading && (
          <div className="space-y-0">
            <div className="px-3 py-2.5 border-b border-white/5">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Reviews</p>
              {Object.values(latestReviews).length === 0 ? (
                <p className="text-[10px] text-white/20">No reviews yet</p>
              ) : (
                <div className="space-y-1.5">
                  {Object.values(latestReviews).map(r => {
                    const cfg = reviewStatusConfig[r.state] || reviewStatusConfig.PENDING;
                    const Icon = cfg.icon;
                    return (
                      <div key={r.user.login} className="flex items-center gap-2">
                        <img src={r.user.avatar_url} className="w-5 h-5 rounded-full" alt="" />
                        <span className="text-xs text-white/60">{r.user.login}</span>
                        <span className={`text-[10px] flex items-center gap-1 ml-auto ${cfg.color}`}><Icon size={10} /> {cfg.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {pr.requested_reviewers.length > 0 && (
              <div className="px-3 py-2.5 border-b border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Awaiting Review</p>
                <div className="space-y-1.5">
                  {pr.requested_reviewers.map(r => (
                    <div key={r.login} className="flex items-center gap-2">
                      <img src={r.avatar_url} className="w-5 h-5 rounded-full" alt="" />
                      <span className="text-xs text-white/60">{r.login}</span>
                      <span className="text-[10px] text-yellow-400/60 ml-auto flex items-center gap-1"><Eye size={10} /> Pending</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Merge section with 3 methods (P30) */}
            {pr.state === "open" && !pr.merged && (
              <div className="px-3 py-3 border-b border-white/5 space-y-2">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Merge</p>
                <div className="flex gap-1.5">
                  {(["squash", "merge", "rebase"] as const).map(m => (
                    <button key={m} onClick={() => setMergeMethod(m)}
                      className={`text-[10px] px-2 py-1 rounded capitalize ${mergeMethod === m ? "bg-blue-500/15 text-blue-400 border border-blue-500/30" : "bg-white/5 text-white/30 border border-white/10 hover:text-white/50"}`}>
                      {m === "squash" ? "Squash & merge" : m === "rebase" ? "Rebase & merge" : "Merge commit"}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleMerge} disabled={merging}
                    className={`h-7 text-[10px] gap-1.5 flex-1 ${allApproved ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {merging ? <Loader2 size={10} className="animate-spin" /> : <GitMerge size={10} />}
                    {mergeMethod === "squash" ? "Squash & merge" : mergeMethod === "rebase" ? "Rebase & merge" : "Create merge commit"}
                  </Button>
                  <Button size="sm" onClick={handleClose} disabled={closing} variant="ghost"
                    className="h-7 text-[10px] text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1">
                    <X size={10} /> Close
                  </Button>
                </div>
              </div>
            )}

            {pr.merged && (
              <div className="px-3 py-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-purple-400">
                  <GitMerge size={14} />
                  <span className="text-xs font-medium">Merged</span>
                  {pr.merged_at && <span className="text-[10px] text-white/25 ml-auto">{new Date(pr.merged_at).toLocaleDateString()}</span>}
                </div>
              </div>
            )}

            {pr.body && (
              <div className="px-3 py-3 border-b border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Description</p>
                <div className="prose prose-invert prose-xs max-w-none text-xs text-white/60">
                  <ReactMarkdown>{pr.body}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Files tab (P29) */}
        {tab === "files" && files.map(f => (
          <div key={f.filename} className="border-b border-white/5">
            <button onClick={() => onLoadFileContent ? loadDiff(f.filename) : toggleFile(f.filename)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/[0.02]">
              {(diffFile === f.filename || expandedFiles.has(f.filename)) ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              <span className={`text-[9px] px-1 rounded ${
                f.status === "added" ? "bg-emerald-500/15 text-emerald-400" :
                f.status === "removed" ? "bg-red-500/15 text-red-400" :
                "bg-yellow-500/15 text-yellow-400"
              }`}>{f.status[0].toUpperCase()}</span>
              <FileCode size={10} className="text-white/20" />
              <span className="text-white/60 truncate flex-1 text-left">{f.filename}</span>
              <span className="text-emerald-400 text-[10px]">+{f.additions}</span>
              <span className="text-red-400 text-[10px]">−{f.deletions}</span>
            </button>
            {/* Inline diff via patch */}
            {(expandedFiles.has(f.filename) || (diffFile === f.filename && !onLoadFileContent)) && f.patch && (
              <pre className="px-1 pb-2 text-[10px] font-mono overflow-x-auto whitespace-pre max-h-[300px]" style={{ scrollbarWidth: "thin" }}>
                {f.patch.split("\n").map((line, i) => (
                  <div key={i} className={`px-2 ${
                    line.startsWith("+") ? "bg-emerald-500/10 text-emerald-300" :
                    line.startsWith("-") ? "bg-red-500/10 text-red-300" :
                    line.startsWith("@@") ? "text-blue-400/60 bg-blue-500/5" :
                    "text-white/40"
                  }`}>{line}</div>
                ))}
              </pre>
            )}
            {/* Monaco-style side-by-side diff */}
            {diffFile === f.filename && onLoadFileContent && (
              <div className="border-t border-white/5">
                {diffLoading ? (
                  <div className="flex justify-center py-4"><Loader2 size={14} className="animate-spin text-blue-400" /></div>
                ) : (
                  <div className="flex text-[10px] font-mono overflow-x-auto max-h-[400px]" style={{ scrollbarWidth: "thin" }}>
                    <div className="flex-1 border-r border-white/5 overflow-auto">
                      <div className="px-2 py-1 text-[9px] text-white/30 bg-white/[0.02] border-b border-white/5 sticky top-0">{pr.base.ref}</div>
                      <pre className="px-2 py-1 whitespace-pre">
                        {diffBase.split("\n").map((line, i) => <div key={i} className="text-white/40">{line}</div>)}
                      </pre>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <div className="px-2 py-1 text-[9px] text-white/30 bg-white/[0.02] border-b border-white/5 sticky top-0">{pr.head.ref}</div>
                      <pre className="px-2 py-1 whitespace-pre">
                        {diffHead.split("\n").map((line, i) => <div key={i} className="text-white/40">{line}</div>)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Conversation tab */}
        {tab === "conversation" && (
          <>
            {reviews.map(r => {
              const cfg = reviewStatusConfig[r.state] || reviewStatusConfig.PENDING;
              const Icon = cfg.icon;
              return (
                <div key={r.id} className="px-3 py-2.5 border-b border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={r.user.avatar_url} className="w-4 h-4 rounded-full" alt="" />
                    <span className="text-[10px] font-bold text-white/60">{r.user.login}</span>
                    <span className={`text-[9px] flex items-center gap-0.5 ${cfg.color}`}><Icon size={8} /> {cfg.label}</span>
                    <span className="text-[9px] text-white/20 ml-auto">
                      {new Date(r.submitted_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {r.body && (
                    <div className="text-xs text-white/60 prose prose-invert prose-xs max-w-none pl-6">
                      <ReactMarkdown>{r.body}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}
            {comments.map(c => (
              <div key={c.id} className="px-3 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <img src={c.user.avatar_url} className="w-4 h-4 rounded-full" alt="" />
                  <span className="text-[10px] font-bold text-white/60">{c.user.login}</span>
                  <span className="text-[9px] text-white/20 ml-auto">
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

      {tab === "conversation" && (
        <div className="px-3 py-2 border-t border-white/5 flex items-end gap-2">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment…" rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none resize-none placeholder:text-white/20 focus:border-blue-500/40" />
          <Button size="sm" onClick={handleComment} disabled={submitting || !newComment.trim()}
            className="h-8 text-[10px] bg-blue-600 gap-1">
            {submitting ? <Loader2 size={10} className="animate-spin" /> : <Send size={10} />}
          </Button>
        </div>
      )}
    </div>
  );
}
