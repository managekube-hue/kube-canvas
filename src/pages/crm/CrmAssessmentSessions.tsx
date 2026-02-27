/**
 * CRM Assessment Sessions — view all sessions with full Q&A detail and export
 */

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
  ChevronDown, ChevronUp, Download, Search, Eye,
  BarChart3, AlertTriangle, CheckCircle, Clock, X,
} from "lucide-react";
import { getQuestionLabel, getAnswerLabel, getTotalQuestionCount } from "@/lib/question-labels";

interface Session {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  status: string | null;
  ems_score: number | null;
  risk_score: number | null;
  complexity_score: number | null;
  urgency_score: number | null;
  recommended_tier: string | null;
  monthly_price: number | null;
  key_gap_flags: string[] | null;
  answers: Record<string, any> | null;
  created_at: string;
  completed_at: string | null;
  endpoint_count: number | null;
  it_team_size: number | null;
  industry: string | null;
  cf_infrastructure_maturity: number | null;
  cf_secops_maturity: number | null;
  cf_iam_maturity: number | null;
  cf_cloud_maturity: number | null;
  cf_data_protection_maturity: number | null;
  cf_business_gov_maturity: number | null;
  cf_dr_bc_maturity: number | null;
  cf_automation_maturity: number | null;
  cf_cost_maturity: number | null;
}

export default function CrmAssessmentSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("assessment_sessions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) console.error(error);
      setSessions((data as Session[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return sessions;
    const q = search.toLowerCase();
    return sessions.filter(s =>
      [s.first_name, s.last_name, s.email, s.company, s.recommended_tier]
        .filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [sessions, search]);

  const exportCSV = (session: Session) => {
    const answers = session.answers || {};
    const rows = [["Question Code", "Question", "Answer"]];
    Object.entries(answers).forEach(([key, val]) => {
      rows.push([
        key,
        getQuestionLabel(key),
        Array.isArray(val) ? val.join("; ") : String(val ?? ""),
      ]);
    });
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-${session.email || session.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assessment Sessions</h1>
          <p className="text-sm text-muted-foreground">{sessions.length} total sessions</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, company, or tier..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border focus:border-foreground focus:outline-none transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Loading sessions...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">No sessions found</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(session => (
            <SessionRow
              key={session.id}
              session={session}
              isOpen={selectedSession?.id === session.id}
              onToggle={() => setSelectedSession(selectedSession?.id === session.id ? null : session)}
              onExport={() => exportCSV(session)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SessionRow({ session, isOpen, onToggle, onExport }: {
  session: Session; isOpen: boolean; onToggle: () => void; onExport: () => void;
}) {
  const completed = session.status === "completed";
  const name = [session.first_name, session.last_name].filter(Boolean).join(" ") || "Anonymous";
  const answers = session.answers || {};
  const answerCount = Object.keys(answers).length;

  return (
    <div className="border border-border bg-background">
      <button onClick={onToggle} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors">
        <div className="flex-shrink-0">
          {completed ? <CheckCircle size={14} className="text-green-500" /> : <Clock size={14} className="text-yellow-500" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{session.email || "No email"} · {session.company || "No company"}</p>
        </div>
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          {session.ems_score != null && (
            <span className="text-xs font-mono text-muted-foreground">EMS: {session.ems_score}</span>
          )}
          {session.recommended_tier && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-brand-orange/10 text-brand-orange">{session.recommended_tier}</span>
          )}
          {session.monthly_price != null && (
            <span className="text-xs font-mono text-muted-foreground">${session.monthly_price.toLocaleString()}/mo</span>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground flex-shrink-0 hidden sm:block">
          {new Date(session.created_at).toLocaleDateString()}
        </span>
        {isOpen ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>

      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border">
          <div className="p-5 space-y-6">
            {/* Scores grid */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Scores</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "EMS Score", val: session.ems_score },
                  { label: "Risk", val: session.risk_score },
                  { label: "Complexity", val: session.complexity_score },
                  { label: "Urgency", val: session.urgency_score },
                ].map(s => (
                  <div key={s.label} className="p-3 bg-muted/30 text-center">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-lg font-bold text-foreground">{s.val ?? "—"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maturity scores */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Maturity Scores (0–10)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { label: "Infrastructure", val: session.cf_infrastructure_maturity },
                  { label: "SecOps", val: session.cf_secops_maturity },
                  { label: "IAM", val: session.cf_iam_maturity },
                  { label: "Cloud", val: session.cf_cloud_maturity },
                  { label: "Data Protection", val: session.cf_data_protection_maturity },
                  { label: "Business Gov", val: session.cf_business_gov_maturity },
                  { label: "DR / BC", val: session.cf_dr_bc_maturity },
                  { label: "Automation", val: session.cf_automation_maturity },
                  { label: "Cost", val: session.cf_cost_maturity },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between px-3 py-2 bg-muted/20">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-bold text-foreground">{item.val ?? "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap flags */}
            {session.key_gap_flags && session.key_gap_flags.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-destructive mb-3">Gap Flags</p>
                <div className="flex flex-wrap gap-2">
                  {session.key_gap_flags.map(flag => (
                    <span key={flag} className="px-2 py-1 text-[10px] font-bold uppercase bg-destructive/10 text-destructive border border-destructive/20">
                      {flag.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Answers breakdown */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Answers ({answerCount} questions answered)
              </p>
              <div className="max-h-64 overflow-y-auto space-y-1 border border-border p-3">
                {Object.entries(answers).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-3 py-1.5 border-b border-border/50 last:border-0">
                    <span className="text-[10px] font-mono text-brand-orange flex-shrink-0 mt-0.5 w-32 truncate">{key}</span>
                    <span className="text-xs text-foreground flex-1">
                      {Array.isArray(val) ? val.join(", ") : String(val ?? "—")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={onExport} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground border border-border hover:bg-muted transition-colors">
                <Download size={12} /> Export CSV
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
