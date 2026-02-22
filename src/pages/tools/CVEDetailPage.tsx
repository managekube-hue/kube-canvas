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
  CheckCircle2, XCircle, Info,
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
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 break-all">{part}</a>
    ) : <span key={i}>{part}</span>
  );
};

/* ── Seen On Indicator ─────────────────────────────────── */
const SeenOnItem = ({ label, active, tooltip }: { label: string; active: boolean; tooltip?: string }) => (
  <div className="flex items-center gap-2 py-1">
    {active ? (
      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
    ) : (
      <XCircle className="w-4 h-4 text-destructive/60 shrink-0" />
    )}
    <span className={`text-sm ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
    {tooltip && (
      <span title={tooltip}><Info className="w-3 h-3 text-muted-foreground" /></span>
    )}
  </div>
);

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
      const { data: dbData } = await supabase
        .from("threat_intel")
        .select("*")
        .eq("cve_id", id)
        .maybeSingle();

      if (dbData) {
        setCve(dbData);
      } else {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/threat-intel`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
          body: JSON.stringify({ tab: "search", query: id }),
        });
        const data = await res.json();
        if (data.searchResults?.length > 0) {
          const r = data.searchResults[0];
          setCve({
            cve_id: r.id, description: r.description, cvss_v3_score: r.cvss, epss_score: r.epss,
            cvss_severity: r.severity, published_date: r.published, is_kev: r.cisaKev,
            kev_due_date: r.cisaDueDate, kev_added_date: r.cisaDateAdded, kev_notes: r.cisaNotes,
            kev_known_ransomware: r.ransomwareUse, vendor: r.vendor, product: r.product,
          });
        }
      }

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
          {/* Breadcrumb */}
          <Link to="/tools/threat-ai" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Explore › {cve.cve_id}
          </Link>

          {/* ── HEADER ─────────────────────────────── */}
          <h1 className="text-4xl font-bold font-mono text-foreground mb-6">{cve.cve_id}</h1>

          {/* ── THREE-COLUMN INFO BLOCK (like Coalition ESS) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-border pb-8">
            {/* Column 1: Metadata */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Assigning CNA</p>
                <p className="text-sm text-foreground">{cve.vendor && cve.vendor !== "Unknown" ? cve.vendor : "Unknown"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Published Date</p>
                <p className="text-sm text-foreground">{cve.published_date || "—"}</p>
              </div>
              {cve.product && cve.product !== "Unknown" && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Product</p>
                  <p className="text-sm text-foreground">{cve.product}</p>
                </div>
              )}
            </div>

            {/* Column 2: Seen On */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Seen On</p>
              <div className="space-y-0.5">
                <SeenOnItem label="CISA KEV" active={!!cve.is_kev} tooltip="CISA Known Exploited Vulnerabilities" />
                <SeenOnItem label="ExploitDB" active={exploits.length > 0} tooltip="Public exploit database" />
                <SeenOnItem label="Metasploit" active={exploits.some((e: any) => e.exploit_type === 'metasploit')} tooltip="Metasploit framework module" />
                <SeenOnItem label="GitHub" active={github.length > 0} tooltip="GitHub POC / exploit repositories" />
                <SeenOnItem label="X (Twitter)" active={social.length > 0} tooltip="Social media mentions" />
              </div>
            </div>

            {/* Column 3: Description */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Description</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cve.description || "No description available."}
              </p>
            </div>
          </div>

          {/* ── SCORE CARDS (like Coalition ESS) ────── */}
          <div className="grid grid-cols-3 gap-0 border border-border mb-8">
            <div className="p-6 text-center border-r border-border bg-blue-50/50 dark:bg-blue-950/10">
              <p className={`text-3xl font-bold font-mono ${epssPercent >= 70 ? "text-destructive" : epssPercent >= 40 ? "text-orange-500" : "text-primary"}`}>
                {epssPercent > 0 ? epssPercent.toFixed(4) : "0.0"}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                EPSS <Info className="w-3 h-3" />
              </p>
            </div>
            <div className="p-6 text-center border-r border-border bg-blue-50/50 dark:bg-blue-950/10">
              <p className="text-3xl font-bold font-mono" style={{ color: severityColors[severity] || severityColors.UNKNOWN }}>
                {cvss > 0 ? cvss.toFixed(1) : "0.0"}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                CVSS <Info className="w-3 h-3" />
              </p>
            </div>
            <div className="p-6 text-center bg-blue-50/50 dark:bg-blue-950/10">
              <p className={`text-3xl font-bold font-mono ${severity === "CRITICAL" ? "text-destructive" : severity === "HIGH" ? "text-orange-500" : "text-foreground"}`}>
                {severity}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Severity</p>
            </div>
          </div>

          {/* ── CISA KEV DETAILS ───────────────────── */}
          {cve.is_kev && (
            <div className={`border p-6 mb-8 ${daysOverdue > 0 ? "border-destructive/40 bg-destructive/5" : "border-yellow-500/40 bg-yellow-500/5"}`}>
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
              <a href={`https://nvd.nist.gov/vuln/detail/${cve.cve_id}#vulnCurrentDescriptionTitle`} target="_blank" rel="noopener noreferrer">
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
          <div className="bg-card border border-border p-6 mb-8">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Score Timeline</h2>
            <p className="text-xs text-muted-foreground mb-4">Score timeline for {cve.cve_id}.</p>
            {timelineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Line type="monotone" dataKey="epss" stroke="hsl(25, 95%, 53%)" name="EPSS" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="cvss" stroke="hsl(220, 70%, 50%)" name="CVSS" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="exploit_count" stroke="hsl(262, 83%, 58%)" name="Exploits" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { date: cve.published_date || new Date().toISOString().split("T")[0], epss: epssPercent, cvss: cvss },
                    { date: new Date().toISOString().split("T")[0], epss: epssPercent, cvss: cvss },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} domain={[0, 10]} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                    <Line type="monotone" dataKey="epss" stroke="hsl(25, 95%, 53%)" name="EPSS" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="cvss" stroke="hsl(220, 70%, 50%)" name="CVSS" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="flex gap-6 mt-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 bg-[hsl(25,95%,53%)] inline-block" /> EPSS
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 bg-[hsl(220,70%,50%)] inline-block" /> CVSS
              </div>
            </div>
          </div>

          {/* ── GITHUB REPOS ───────────────────────── */}
          <div className="bg-card border border-border p-6 mb-8">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">GitHub repositories</h2>
            <p className="text-xs text-muted-foreground mb-4">Number of repositories associated with {cve.cve_id}.</p>

            {github.length > 0 ? (
              <>
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={github.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="repo_name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                      <Bar dataKey="stars" name="Stars">
                        {github.slice(0, 10).map((_, i) => (
                          <Cell key={i} fill={`hsl(${200 + i * 15}, 67%, ${45 + i * 3}%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border border-border bg-blue-50/50 dark:bg-blue-950/10 text-center">
                    <p className="text-2xl font-bold font-mono text-primary">{github.filter(g => g.has_exploit).length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Repos with "Exploit" term</p>
                  </div>
                  <div className="p-4 border border-border bg-blue-50/50 dark:bg-blue-950/10 text-center">
                    <p className="text-2xl font-bold font-mono text-primary">{github.filter(g => g.has_poc).length}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                      Repos with "POC" term <Info className="w-3 h-3" />
                    </p>
                  </div>
                </div>

                {/* Table */}
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
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-4">No GitHub repositories found for this CVE.</p>
            )}
          </div>

          {/* ── PUBLISHED EXPLOITS ──────────────────── */}
          <div className="bg-card border border-border p-6 mb-8">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Published exploits</h2>
            <p className="text-xs text-muted-foreground mb-4">Number of confirmed exploits associated with {cve.cve_id}.</p>
            {exploits.length > 0 ? (
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
            ) : (
              <p className="text-sm text-muted-foreground py-4">No published exploits found for this CVE.</p>
            )}
          </div>

          {/* ── SOCIAL MENTIONS ────────────────────── */}
          <div className="bg-card border border-border p-6 mb-8">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Social mentions</h2>
            <p className="text-xs text-muted-foreground mb-4">Social media associated with {cve.cve_id}.</p>
            {social.length > 0 ? (
              <>
                {/* Chart placeholder */}
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={social.map((m, i) => ({
                      date: m.posted_at ? new Date(m.posted_at).toLocaleDateString() : `Post ${i + 1}`,
                      mentions: i + 1,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                      <Line type="monotone" dataKey="mentions" stroke="hsl(200, 80%, 55%)" name="Mentions" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex gap-6 mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 bg-[hsl(200,80%,55%)] inline-block" /> Tweets
                    </div>
                  </div>
                </div>

                {/* Social mentions table */}
                <h3 className="text-sm font-bold text-foreground mb-3">Social mentions samples</h3>
                <div className="overflow-x-auto border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-4 py-2 text-muted-foreground font-medium">Tweet</th>
                        <th className="text-left px-4 py-2 text-muted-foreground font-medium">Username</th>
                        <th className="text-left px-4 py-2 text-muted-foreground font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {social.map((mention) => (
                        <tr key={mention.id} className="border-b border-border/50">
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <span className="text-lg shrink-0">𝕏</span>
                              <span className="text-sm text-muted-foreground">{mention.content}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-primary">@{mention.author}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                            {mention.posted_at ? new Date(mention.posted_at).toLocaleDateString() : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-4">No social mentions found for this CVE.</p>
            )}
          </div>

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
