import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, AlertTriangle, Download, TrendingUp,
  Map, Loader2, RefreshCw,
  ChevronLeft, ChevronRight, Database, Shield, FileText,
} from "lucide-react";
import { ExportLeadModal } from "@/components/ExportLeadModal";
import { curatedThreats as fallbackThreats, weeklyStats as fallbackStats, type ThreatCve } from "@/data/threat-intel-data";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/* ── helpers ───────────────────────────────────────────── */

const severityColor = (sev: string) => {
  switch (sev) {
    case "CRITICAL": return "text-destructive";
    case "HIGH": return "text-orange-600 dark:text-orange-400";
    case "MEDIUM": return "text-yellow-600 dark:text-yellow-400";
    case "LOW": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

const severityBadge = (sev: string) => {
  switch (sev) {
    case "CRITICAL": return "bg-destructive/10 border-destructive/30 text-destructive";
    case "HIGH": return "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400";
    case "MEDIUM": return "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400";
    case "LOW": return "bg-green-500/10 border-green-500/30 text-green-600";
    default: return "bg-muted border-border text-muted-foreground";
  }
};

/* ── API call helper ───────────────────────────────────── */

async function fetchThreatApi(body: Record<string, any>) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/threat-intel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* ── CVE Table Row ──────────────────────────────────────── */

const CveTableRow = ({ cve }: { cve: ThreatCve }) => {
  const navigate = useNavigate();
  const effectiveSeverity = cve.severity && cve.severity !== "UNKNOWN"
    ? cve.severity
    : cve.cvss >= 9 ? "CRITICAL" : cve.cvss >= 7 ? "HIGH" : cve.cvss >= 4 ? "MEDIUM" : cve.cvss > 0 ? "LOW" : "UNKNOWN";
  const epssPercent = cve.epss > 0 ? (cve.epss * 100).toFixed(2) : "—";

  const downloadSingleCve = (e: React.MouseEvent) => {
    e.stopPropagation();
    const row = {
      CVE: cve.id,
      Description: (cve.description || "").replace(/"/g, '""'),
      CVSS: cve.cvss,
      EPSS: cve.epss,
      Severity: effectiveSeverity,
      Published: cve.published || "",
      Vendor: cve.vendor || "",
      KEV: cve.cisaKev ? "Yes" : "No",
    };
    const keys = Object.keys(row);
    const csv = [keys.join(","), keys.map(k => `"${String((row as any)[k])}"`).join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${cve.id}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <tr
      className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
      onClick={() => navigate(`/tools/threat-ai/${cve.id}`)}
    >
      <td className="px-4 py-3">
        <span className="text-primary hover:underline font-mono text-sm font-medium">{cve.id}</span>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground max-w-[400px] truncate">
        {cve.description || cve.plainEnglish || "—"}
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-mono text-foreground">{epssPercent}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className={`text-sm font-mono font-bold ${severityColor(effectiveSeverity)}`}>
          {cve.cvss > 0 ? cve.cvss.toFixed(1) : "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className={`text-xs font-bold px-2 py-0.5 border ${severityBadge(effectiveSeverity)}`}>
          {effectiveSeverity}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {cve.published || "—"}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {cve.vendor && cve.vendor !== "Unknown" ? cve.vendor : "—"}
      </td>
      <td className="px-4 py-3 text-center">
        {cve.cisaKev && <span className="text-xs font-semibold text-destructive">🚨</span>}
      </td>
      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
        <button
          onClick={downloadSingleCve}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Download CSV"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
};

/* ── CVE Table ──────────────────────────────────────────── */

const CveTable = ({ threats, loading }: { threats: ThreatCve[]; loading: boolean }) => {
  if (loading) return <LoadingSkeleton />;
  if (threats.length === 0) return <p className="text-muted-foreground text-center py-8">No data available.</p>;

  return (
    <div className="overflow-x-auto border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">CVE</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Description</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">EPSS</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">CVSS</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Severity</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Published</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Vendor</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">KEV</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider w-10">⬇</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((cve) => (
            <CveTableRow key={cve.id} cve={cve} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── Pagination ────────────────────────────────────────── */

const Pagination = ({ page, totalCount, pageSize, onPageChange }: {
  page: number; totalCount: number; pageSize: number; onPageChange: (p: number) => void;
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <p className="text-muted-foreground">
        {page * pageSize + 1}–{Math.min((page + 1) * pageSize, totalCount)} of {totalCount.toLocaleString()}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-muted-foreground">
          Page {page + 1} of {totalPages}
        </span>
        <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

/* ── Loading skeleton ──────────────────────────────────── */

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-20 bg-muted border border-border" />
      ))}
    </div>
    {[1, 2, 3].map(i => (
      <div key={i} className="h-12 bg-muted border border-border" />
    ))}
  </div>
);

/* ── Tab: Latest CVEs (NVD) ────────────────────────────── */

const LatestCVEs = ({ stats, dbReady }: { stats: any; dbReady: boolean }) => {
  const [threats, setThreats] = useState<ThreatCve[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 25;

  const loadPage = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await fetchThreatApi({ tab: "trend", page: p, pageSize });
      setThreats(data.threats || []);
      setTotalCount(data.totalCount || 0);
      setPage(p);
    } catch (e) {
      console.error("Trend load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (dbReady) loadPage(0); }, [dbReady, loadPage]);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total CVEs", value: stats.totalCves?.toLocaleString() || "0", icon: Database },
          { label: "Active Exploits (KEV)", value: stats.totalActiveExploits || 0, accent: true },
          { label: "Critical", value: stats.newCritical || 0 },
          { label: "High", value: stats.newHigh || 0 },
          { label: "Medium / Low", value: stats.newMedium || 0 },
        ].map((s) => (
          <div key={s.label} className={`p-4 border ${s.accent ? "border-destructive/40 bg-destructive/5" : "border-border bg-card"}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.accent ? "text-destructive" : "text-foreground"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
          Latest CVEs
        </h3>
        <p className="text-xs text-muted-foreground mb-4">The most recent CVEs from NVD, sorted by risk score. Click any row for full details.</p>
        <CveTable threats={threats} loading={loading} />
        <Pagination page={page} totalCount={totalCount} pageSize={pageSize} onPageChange={loadPage} />
      </div>
    </div>
  );
};

/* ── Tab: CISA KEV ─────────────────────────────────────── */

const CisaKEV = ({ dbReady }: { dbReady: boolean }) => {
  const [threats, setThreats] = useState<ThreatCve[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 25;

  const loadPage = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await fetchThreatApi({ tab: "exploits", page: p, pageSize });
      setThreats(data.threats || []);
      setTotalCount(data.stats?.totalActiveExploits || 0);
      setPage(p);
    } catch (e) {
      console.error("KEV load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (dbReady) loadPage(0); }, [dbReady, loadPage]);

  return (
    <div className="space-y-6">
      <div className="p-4 border border-destructive/20 bg-destructive/5">
        <h3 className="text-sm font-bold text-foreground mb-1">CISA Known Exploited Vulnerabilities</h3>
        <p className="text-xs text-muted-foreground">
          Vulnerabilities confirmed by CISA as actively exploited in the wild. {totalCount} entries. Federal agencies must patch by the due date.
        </p>
      </div>
      <CveTable threats={threats} loading={loading} />
      <Pagination page={page} totalCount={totalCount} pageSize={pageSize} onPageChange={loadPage} />
    </div>
  );
};

/* ── Tab: Risk Map ─────────────────────────────────────── */

const RiskMap = ({ dbReady }: { dbReady: boolean }) => {
  const [scatterData, setScatterData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dbReady) return;
    (async () => {
      try {
        const data = await fetchThreatApi({ tab: "map" });
        setScatterData(
          (data.threats || [])
            .filter((c: any) => c.cvss > 0 && c.epss > 0)
            .map((c: any) => ({
              x: c.epss * 100,
              y: c.cvss,
              id: c.id,
              name: c.vendor && c.vendor !== 'Unknown' ? `${c.vendor} ${c.product}` : c.id,
              severity: c.severity,
            }))
        );
      } catch (e) {
        console.error("Risk map error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [dbReady]);

  const dotColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "#ef4444";
      case "HIGH": return "#f97316";
      case "MEDIUM": return "#eab308";
      default: return "#6b7280";
    }
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {scatterData.length} CVEs plotted. Top-right = highest risk.
      </p>
      <div className="bg-card border border-border p-4 md:p-6">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" dataKey="x" name="Attack Probability" domain={[0, 100]}
              label={{ value: "Attack Probability (EPSS %)", position: "bottom", offset: 20, style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 } }}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis type="number" dataKey="y" name="Impact" domain={[0, 10]}
              label={{ value: "Impact (CVSS)", angle: -90, position: "insideLeft", offset: -5, style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 } }}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-card border border-border p-3 text-xs shadow-lg">
                  <p className="font-bold text-foreground">{d.id}</p>
                  <p className="text-muted-foreground">{d.name}</p>
                  <p className="mt-1">CVSS: {d.y} · EPSS: {d.x.toFixed(1)}%</p>
                </div>
              );
            }} />
            <Scatter data={scatterData}>
              {scatterData.map((entry, idx) => (
                <Cell key={idx} fill={dotColor(entry.severity)} r={6} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        {[
          { label: "Critical", color: "bg-red-500", count: scatterData.filter(d => d.y >= 9 && d.x >= 70).length },
          { label: "High", color: "bg-orange-500", count: scatterData.filter(d => (d.y >= 7 && d.x >= 40) && !(d.y >= 9 && d.x >= 70)).length },
          { label: "Other", color: "bg-yellow-500", count: scatterData.filter(d => !(d.y >= 7 && d.x >= 40)).length },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <span className={`w-3 h-3 ${l.color} inline-block`} />
            <span className="text-muted-foreground">{l.label}</span>
            <span className="font-bold text-foreground">{l.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Tab: Search ───────────────────────────────────────── */

const SearchTab = ({ dbReady }: { dbReady: boolean }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ThreatCve[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 25;

  const handleSearch = useCallback(async (p = 0) => {
    if (!query.trim()) return;
    setHasSearched(true);
    setSearching(true);
    try {
      const data = await fetchThreatApi({ tab: "search", query: query.trim(), page: p, pageSize });
      setSearchResults(data.searchResults || []);
      setTotalResults(data.totalSearchResults || 0);
      setPage(p);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setSearching(false);
    }
  }, [query]);

  const popularSearches = ["Ivanti", "Fortinet", "Palo Alto", "Citrix", "OpenSSH", "Microsoft", "Linux", "Apache"];

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Input
          placeholder="Search by CVE ID, vendor, product, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(0)}
          className="flex-1"
        />
        <Button onClick={() => handleSearch(0)} disabled={searching} className="btn-primary gap-2">
          {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {searching ? "Searching..." : "Search"}
        </Button>
      </div>

      {!hasSearched && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <Button key={s} variant="outline" size="sm" className="text-xs" onClick={() => { setQuery(s); }}>
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="space-y-4">
          {searching ? <LoadingSkeleton /> : (
            <>
              <p className="text-sm text-muted-foreground">
                {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
              </p>
              <CveTable threats={searchResults} loading={false} />
              <Pagination page={page} totalCount={totalResults} pageSize={pageSize} onPageChange={(p) => handleSearch(p)} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Main Page ─────────────────────────────────────────── */

const ThreatAi = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [stats, setStats] = useState<any>(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [backfillRemaining, setBackfillRemaining] = useState<number | null>(null);
  const [exportData, setExportData] = useState<any[]>([]);

  const loadExportData = useCallback(async () => {
    try {
      const data = await fetchThreatApi({ tab: "trend", page: 0, pageSize: 100 });
      setExportData(data.threats || []);
    } catch (e) {
      console.error("Export data load error:", e);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchThreatApi({ tab: "trend", page: 0, pageSize: 1 });
      setStats(data.stats || fallbackStats);
      setDbReady((data.stats?.totalCves || 0) > 0);
    } catch (e) {
      console.warn("Stats fetch failed:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerSync = useCallback(async () => {
    setSyncing(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/sync-threat-feeds`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      console.log("Sync result:", data);
      await fetchStats();
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setSyncing(false);
    }
  }, [fetchStats]);

  const triggerBackfill = useCallback(async () => {
    setBackfilling(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/backfill-cvss`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      console.log("Backfill result:", data);
      setBackfillRemaining(data.remaining ?? null);
      await fetchStats();
    } catch (e) {
      console.error("Backfill error:", e);
    } finally {
      setBackfilling(false);
    }
  }, [fetchStats]);

  useEffect(() => { fetchStats(); loadExportData(); }, [fetchStats, loadExportData]);
  useEffect(() => { if (!loading && !dbReady && !syncing) triggerSync(); }, [loading, dbReady, syncing, triggerSync]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBanner
        title="Threat Intelligence Dashboard"
        subtitle="See what's critical now. Understand risk at a glance. Take action."
      />

      <section className="section-off-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground">
                {dbReady ? (
                  <>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                    Live · {stats.totalCves?.toLocaleString()} CVEs
                    {stats.lastUpdated && <> · Updated: {new Date(stats.lastUpdated).toLocaleDateString()}</>}
                  </>
                ) : syncing ? (
                  <>
                    <Loader2 className="w-3 h-3 inline mr-1.5 animate-spin" />
                    Syncing threat data from NVD, EPSS, CISA KEV...
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1.5" />
                    Initializing database...
                  </>
                )}
              </p>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7 px-2" onClick={triggerSync} disabled={syncing}>
                <RefreshCw className={`w-3 h-3 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Sync"}
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7 px-2" onClick={triggerBackfill} disabled={backfilling}>
                <Database className={`w-3 h-3 ${backfilling ? "animate-pulse" : ""}`} />
                {backfilling ? "Backfilling..." : "Backfill CVSS"}
                {backfillRemaining !== null && backfillRemaining > 0 && (
                  <span className="text-muted-foreground">({backfillRemaining})</span>
                )}
              </Button>
            </div>
            {/* Individual downloads available per row */}
          </div>

          {syncing && !dbReady && (
            <div className="mb-8 p-6 border border-brand-orange/30 bg-brand-orange/5">
              <div className="flex items-center gap-3 mb-2">
                <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                <h3 className="font-bold text-foreground">Populating Threat Database</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Syncing CVEs from NVD, EPSS scores, and CISA KEV data. This initial sync takes 1-2 minutes.
              </p>
            </div>
          )}

          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border mb-8 h-auto flex-wrap">
              <TabsTrigger value="latest" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <Database className="w-4 h-4" />
                NVD Latest
              </TabsTrigger>
              <TabsTrigger value="kev" className="gap-2 data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive">
                <AlertTriangle className="w-4 h-4" />
                CISA KEV
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500">
                <Map className="w-4 h-4" />
                Risk Map
              </TabsTrigger>
              <TabsTrigger value="search" className="gap-2 data-[state=active]:bg-foreground/10">
                <Search className="w-4 h-4" />
                Search
              </TabsTrigger>
            </TabsList>

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <TabsContent value="latest"><LatestCVEs stats={stats} dbReady={dbReady} /></TabsContent>
                <TabsContent value="kev"><CisaKEV dbReady={dbReady} /></TabsContent>
                <TabsContent value="map"><RiskMap dbReady={dbReady} /></TabsContent>
                <TabsContent value="search"><SearchTab dbReady={dbReady} /></TabsContent>
              </>
            )}
          </Tabs>

          {/* CTA */}
          <div className="mt-16 p-8 section-dark text-center">
            <h3 className="text-xl font-bold text-white mb-3">Want Continuous Vulnerability Monitoring?</h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Our VDR module provides 24/7 vulnerability detection and response with EPSS-prioritised remediation across your entire attack surface.
            </p>
            <a href="/service-layer/vdr" className="btn-primary inline-flex">
              Learn About VDR Module
            </a>
          </div>
        </div>
      </section>

      <ExportLeadModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        data={exportData}
      />

      <Footer />
    </div>
  );
};

export default ThreatAi;
