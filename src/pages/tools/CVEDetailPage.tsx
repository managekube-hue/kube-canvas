import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";
import {
  ArrowLeft, ExternalLink, AlertTriangle, Shield,
  GitBranch, MessageSquare, Zap, TrendingUp, Clock,
} from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const severityColors: Record<string, string> = {
  CRITICAL: "hsl(0, 72%, 51%)",
  HIGH: "hsl(25, 95%, 53%)",
  MEDIUM: "hsl(48, 96%, 53%)",
  LOW: "hsl(142, 71%, 45%)",
  UNKNOWN: "hsl(220, 9%, 46%)",
};

const severityBg: Record<string, string> = {
  CRITICAL: "bg-destructive/10 border-destructive/40 text-destructive",
  HIGH: "bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-400",
  MEDIUM: "bg-yellow-500/10 border-yellow-500/40 text-yellow-600 dark:text-yellow-400",
  LOW: "bg-green-500/10 border-green-500/40 text-green-600",
  UNKNOWN: "bg-muted border-border text-muted-foreground",
};

const linkifyText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s;,]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 break-all">
        {part}
      </a>
    ) : <span key={i}>{part}</span>
  );
};

export default function CVEDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cve, setCve] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [github, setGithub] = useState<any[]>([]);
  const [exploits, setExploits] = useState<any[]>([]);
  const [social, setSocial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadAll();
  }, [id]);

  const loadAll = async () => {
    setLoading(true);
    try {
      // Try DB first
      const { data: dbData } = await supabase
        .from("threat_intel")
        .select("*")
        .eq("cve_id", id)
        .maybeSingle();

      if (dbData) {
        setCve(dbData);
      } else {
        // Fallback: fetch from CVE.org via edge function
        const res = await fetch(`${SUPABASE_URL}/functions/v1/threat-intel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ tab: "search", query: id }),
        });
        const data = await res.json();
        if (data.searchResults?.length > 0) {
          const r = data.searchResults[0];
          setCve({
            cve_id: r.id,
            description: r.description,
            cvss_v3_score: r.cvss,
            epss_score: r.epss,
            cvss_severity: r.severity,
            published_date: r.published,
            is_kev: r.cisaKev,
            kev_due_date: r.cisaDueDate,
            kev_added_date: r.cisaDateAdded,
            kev_notes: r.cisaNotes,
            kev_known_ransomware: r.ransomwareUse,
            vendor: r.vendor,
            product: r.product,
          });
        }
      }

      // Load related data using rpc-style raw queries since types aren't generated yet
      const [histRes, ghRes, expRes, socRes] = await Promise.all([
        (supabase as any).from("cve_history").select("*").eq("cve_id", id!).order("recorded_at", { ascending: true }),
        (supabase as any).from("cve_github").select("*").eq("cve_id", id!).order("stars", { ascending: false }),
        (supabase as any).from("cve_exploits").select("*").eq("cve_id", id!),
        (supabase as any).from("cve_social").select("*").eq("cve_id", id!).order("posted_at", { ascending: false }),
      ]);
      setHistory(histRes.data || []);
      setGithub(ghRes.data || []);
      setExploits(expRes.data || []);
      setSocial(socRes.data || []);
    } catch (e) {
      console.error("CVE detail load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const severity = cve?.cvss_severity || "UNKNOWN";
  const cvss = cve?.cvss_v3_score || cve?.cvss_v2_score || 0;
  const epss = cve?.epss_score || 0;
  const epssPercent = epss * 100;

  const dueDate = cve?.kev_due_date ? new Date(cve.kev_due_date) : null;
  const today = new Date();
  const daysOverdue = dueDate && dueDate < today
    ? Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Timeline data
  const timelineData = history.reduce((acc: any[], item) => {
    const date = item.recorded_at?.split("T")[0] || "";
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing[item.score_type] = Number(item.score_value);
    } else {
      acc.push({ date, [item.score_type]: Number(item.score_value) });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!cve) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">CVE Not Found</h1>
          <p className="text-muted-foreground mb-6">{id} was not found in our database or CVE.org.</p>
          <Link to="/tools/threat-ai">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <Link to="/tools/threat-ai" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Threat Intelligence
          </Link>

          {/* ── HEADER ─────────────────────────────── */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <h1 className="text-3xl font-bold font-mono text-foreground">{cve.cve_id}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {cve.vendor && cve.vendor !== "Unknown" && <><span className="font-medium text-foreground">Vendor:</span> {cve.vendor}</>}
                  {cve.vendor && cve.vendor !== "Unknown" && cve.product && cve.product !== "Unknown" && " · "}
                  {cve.product && cve.product !== "Unknown" && <><span className="font-medium text-foreground">Product:</span> {cve.product}</>}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className={`text-sm font-bold px-4 py-1.5 border ${severityBg[severity] || severityBg.UNKNOWN}`}>
                  {severity}{cvss > 0 ? ` · ${cvss.toFixed(1)}` : ""}
                </span>
                {cve.is_kev && (
                  <span className="text-sm font-semibold px-4 py-1.5 border border-destructive/40 bg-destructive/10 text-destructive">
                    🚨 CISA KEV
                  </span>
                )}
                {cve.kev_known_ransomware && (
                  <span className="text-sm font-semibold px-4 py-1.5 border border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    💀 Ransomware
                  </span>
                )}
              </div>
            </div>

            {/* Seen On */}
            <div className="flex gap-2 flex-wrap mb-6">
              <span className="text-xs text-muted-foreground mr-2 self-center">Seen on:</span>
              <span className="text-xs px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-medium">NVD</span>
              {cve.is_kev && <span className="text-xs px-3 py-1 bg-destructive/10 border border-destructive/30 text-destructive font-medium">CISA KEV</span>}
              {github.length > 0 && <span className="text-xs px-3 py-1 bg-foreground/10 border border-border text-foreground font-medium">GitHub ({github.length})</span>}
              {exploits.length > 0 && <span className="text-xs px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-medium">ExploitDB ({exploits.length})</span>}
              {social.length > 0 && <span className="text-xs px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 font-medium">Social ({social.length})</span>}
            </div>
          </div>

          {/* ── DESCRIPTION ────────────────────────── */}
          <div className="bg-card border border-border p-6 mb-6">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{cve.description || "No description available."}</p>
            {cve.plain_english_summary && cve.plain_english_summary !== cve.description && (
              <div className="mt-4 p-4 border border-primary/20 bg-primary/5">
                <p className="text-sm text-primary font-medium">📌 {cve.plain_english_summary}</p>
              </div>
            )}
          </div>

          {/* ── SCORE CARDS ────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* EPSS */}
            <div className="bg-card border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">EPSS</span>
              </div>
              <p className={`text-3xl font-bold font-mono ${epssPercent >= 70 ? "text-destructive" : epssPercent >= 40 ? "text-orange-500" : "text-foreground"}`}>
                {epssPercent > 0 ? `${epssPercent.toFixed(2)}%` : "N/A"}
              </p>
              {epssPercent > 0 && (
                <div className="w-full h-2 bg-muted mt-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${epssPercent >= 70 ? "bg-destructive" : epssPercent >= 40 ? "bg-orange-500" : "bg-yellow-500"}`}
                    style={{ width: `${Math.min(epssPercent, 100)}%` }}
                  />
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1.5">Attack probability</p>
            </div>

            {/* CVSS */}
            <div className="bg-card border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">CVSS 3.x</span>
              </div>
              <p className={`text-3xl font-bold font-mono`} style={{ color: severityColors[severity] || severityColors.UNKNOWN }}>
                {cvss > 0 ? cvss.toFixed(1) : "N/A"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">{severity} severity</p>
            </div>

            {/* Exploits */}
            <div className="bg-card border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Exploits</span>
              </div>
              <p className="text-3xl font-bold font-mono text-foreground">{exploits.length + (cve.exploit_count || 0)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Public exploits</p>
            </div>

            {/* POCs */}
            <div className="bg-card border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">GitHub POCs</span>
              </div>
              <p className="text-3xl font-bold font-mono text-foreground">{github.filter(g => g.has_poc).length + (cve.poc_count || 0)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Proof of concept</p>
            </div>
          </div>

          {/* ── CISA KEV DETAILS ───────────────────── */}
          {cve.is_kev && (
            <div className={`border p-6 mb-6 ${daysOverdue > 0 ? "border-destructive/40 bg-destructive/5" : "border-yellow-500/40 bg-yellow-500/5"}`}>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> CISA Known Exploited Vulnerability
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Added</p>
                  <p className="font-medium text-foreground">{cve.kev_added_date || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Due Date</p>
                  <p className="font-medium text-foreground">{cve.kev_due_date || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Status</p>
                  {daysOverdue > 0 ? (
                    <p className="font-bold text-destructive">⚠️ OVERDUE by {daysOverdue} days</p>
                  ) : (
                    <p className="font-medium text-green-600">Within deadline</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Ransomware</p>
                  <p className="font-medium text-foreground">{cve.kev_known_ransomware ? "Yes — Known" : "Not confirmed"}</p>
                </div>
              </div>
              {cve.kev_notes && (
                <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Notes:</span>{" "}
                  {linkifyText(cve.kev_notes)}
                </div>
              )}
            </div>
          )}

          {/* ── ACTION BUTTONS ─────────────────────── */}
          <div className="flex gap-3 flex-wrap mb-8">
            {(severity === "CRITICAL" || severity === "HIGH" || cve.is_kev) && (
              <a
                href={`https://nvd.nist.gov/vuln/detail/${cve.cve_id}#vulnCurrentDescriptionTitle`}
                target="_blank" rel="noopener noreferrer"
              >
                <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2">
                  🚨 Patch Now <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            )}
            <a href={`https://nvd.nist.gov/vuln/detail/${cve.cve_id}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">View in NVD <ExternalLink className="w-3.5 h-3.5" /></Button>
            </a>
            {cve.is_kev && (
              <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">View in CISA <ExternalLink className="w-3.5 h-3.5" /></Button>
              </a>
            )}
          </div>

          {/* ── SCORE TIMELINE ─────────────────────── */}
          {timelineData.length > 1 && (
            <div className="bg-card border border-border p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Score Timeline
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="epss" stroke="hsl(25, 95%, 53%)" name="EPSS" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cvss" stroke="hsl(0, 72%, 51%)" name="CVSS" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="exploit_count" stroke="hsl(262, 83%, 58%)" name="Exploits" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* ── GITHUB REPOS ───────────────────────── */}
          {github.length > 0 && (
            <div className="bg-card border border-border p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <GitBranch className="w-4 h-4" /> GitHub Repositories ({github.length})
              </h2>
              <div className="mb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={github.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="repo_name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                    <Bar dataKey="stars" name="Stars">
                      {github.slice(0, 10).map((_, i) => (
                        <Cell key={i} fill={`hsl(${15 + i * 20}, 67%, ${36 + i * 3}%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Repository</th>
                      <th className="text-right py-2 text-muted-foreground font-medium">Stars</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">POC</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Exploit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {github.map((repo) => (
                      <tr key={repo.id} className="border-b border-border/50">
                        <td className="py-2">
                          <a href={repo.repo_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-xs">
                            {repo.repo_name}
                          </a>
                        </td>
                        <td className="text-right py-2 font-mono">{repo.stars}</td>
                        <td className="text-center py-2">{repo.has_poc ? "✅" : "—"}</td>
                        <td className="text-center py-2">{repo.has_exploit ? "✅" : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── EXPLOITS ───────────────────────────── */}
          {exploits.length > 0 && (
            <div className="bg-card border border-border p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Published Exploits ({exploits.length})
              </h2>
              <div className="space-y-3">
                {exploits.map((exp) => (
                  <div key={exp.id} className="border border-border p-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-medium">
                          {exp.exploit_type}
                        </span>
                        {exp.verified && <span className="text-xs text-green-600 font-medium">✓ Verified</span>}
                      </div>
                      <p className="text-sm text-foreground">{exp.title}</p>
                      {exp.discovered_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Discovered: {new Date(exp.discovered_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {exp.source_url && (
                      <a href={exp.source_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs shrink-0">
                          View <ExternalLink className="w-3 h-3" />
                        </Button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SOCIAL MENTIONS ────────────────────── */}
          {social.length > 0 && (
            <div className="bg-card border border-border p-6 mb-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Social Mentions ({social.length})
              </h2>
              <div className="space-y-3">
                {social.map((mention) => (
                  <div key={mention.id} className="border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400">
                          {mention.platform}
                        </span>
                        <span className="text-sm font-medium text-foreground">@{mention.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {mention.posted_at ? new Date(mention.posted_at).toLocaleDateString() : "—"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{mention.content}</p>
                    {mention.post_url && (
                      <a href={mention.post_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">
                        View original →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ────────────────────────────────── */}
          <div className="mt-12 p-8 bg-foreground text-background text-center">
            <h3 className="text-xl font-bold mb-3">Need Help Patching This Vulnerability?</h3>
            <p className="text-background/70 mb-6 max-w-lg mx-auto">
              Our VDR module provides 24/7 vulnerability detection and response with EPSS-prioritised remediation.
            </p>
            <Link to="/service-layer/vdr">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Learn About VDR Module
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
