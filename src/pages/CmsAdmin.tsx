import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, Briefcase, Plus, Trash2, Eye, EyeOff, Loader2, RefreshCw,
  Search, Download, ChevronDown, ChevronUp, FileText, ShieldCheck,
  ClipboardList, BarChart3, ToggleLeft, ToggleRight,
} from "lucide-react";

/* ── helpers ── */
const fmt = (d: string | null) => d ? new Date(d).toLocaleString() : "—";
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString() : "—";
const badge = (text: string, color = "border-border bg-muted text-muted-foreground") =>
  <span className={`text-xs px-2 py-0.5 border whitespace-nowrap ${color}`}>{text}</span>;

const statusBadge = (status: string) => {
  switch (status) {
    case "active": return badge("Active", "border-green-700 bg-green-950/30 text-green-400");
    case "inactive": return badge("Inactive", "border-border bg-muted text-muted-foreground");
    case "qualified": return badge("Qualified", "border-blue-700 bg-blue-950/30 text-blue-400");
    case "disqualified": return badge("Disqualified", "border-red-700 bg-red-950/30 text-red-400");
    case "converted": return badge("Converted", "border-purple-700 bg-purple-950/30 text-purple-400");
    default: return badge(status || "active");
  }
};

function downloadCsv(rows: Record<string, any>[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map(r => keys.map(k => {
      const v = r[k] ?? "";
      const s = String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ════════════════════════════════════════════════════════
   Contacts Tab — full CRM view of cms_contacts
   ════════════════════════════════════════════════════════ */
const ContactsTab = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const pageSize = 25;

  const load = useCallback(async (p = 0) => {
    setLoading(true);
    let query = supabase
      .from("cms_contacts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(p * pageSize, (p + 1) * pageSize - 1);
    if (search.trim()) {
      query = query.or(
        `email.ilike.%${search.trim()}%,first_name.ilike.%${search.trim()}%,last_name.ilike.%${search.trim()}%,company.ilike.%${search.trim()}%`
      );
    }
    if (statusFilter !== "all") {
      query = query.eq("lifecycle_stage", statusFilter);
    }
    const { data, count } = await query;
    setContacts(data || []);
    setTotal(count || 0);
    setPage(p);
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { load(0); }, [statusFilter]);

  const updateLifecycle = async (id: string, stage: string) => {
    await supabase.from("cms_contacts").update({ lifecycle_stage: stage }).eq("id", id);
    load(page);
  };

  const exportAll = async () => {
    const { data } = await supabase.from("cms_contacts").select("*").order("created_at", { ascending: false }).limit(1000);
    if (data) downloadCsv(data, `contacts_export_${new Date().toISOString().split("T")[0]}.csv`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <Input placeholder="Search by name, email, company..." value={search}
          onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && load(0)} className="flex-1 min-w-[200px]" />
        <Button variant="outline" size="sm" onClick={() => load(0)} className="gap-2"><Search className="w-4 h-4" />Search</Button>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(""); load(0); }} className="gap-2"><RefreshCw className="w-4 h-4" />Reset</Button>
        <Button variant="outline" size="sm" onClick={exportAll} className="gap-2 ml-auto"><Download className="w-4 h-4" />Export CSV</Button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "lead", "mql", "sql", "opportunity", "customer", "subscriber"].map(s => (
          <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" className="text-xs capitalize"
            onClick={() => setStatusFilter(s)}>{s === "all" ? "All" : s.toUpperCase()}</Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : contacts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No contacts found.</p>
      ) : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["", "Name", "Email", "Company", "Phone", "Source", "Lifecycle", "Tier", "EMS", "Urgency", "Risk", "Price", "HubSpot", "Created", "Actions"].map(h => (
                  <th key={h} className="text-left px-3 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contacts.map(c => (
                <>
                  <tr key={c.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                    <td className="px-3 py-3">{expandedId === c.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</td>
                    <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{[c.first_name, c.last_name].filter(Boolean).join(" ") || "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{c.email}</td>
                    <td className="px-3 py-3 text-muted-foreground">{c.company || "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{c.phone || "—"}</td>
                    <td className="px-3 py-3">{badge(c.source || "website")}</td>
                    <td className="px-3 py-3">{statusBadge(c.lifecycle_stage || "lead")}</td>
                    <td className="px-3 py-3 text-muted-foreground">{c.mk_recommended_tier || "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{c.mk_ems_score ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{c.mk_onb_urgency_score ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{c.mk_onb_risk_score ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{c.mk_monthly_price ? `$${c.mk_monthly_price}` : "—"}</td>
                    <td className="px-3 py-3">
                      {c.hubspot_synced
                        ? badge("Synced", "border-green-700 bg-green-950/30 text-green-400")
                        : badge("Pending", "border-yellow-700 bg-yellow-950/30 text-yellow-400")}
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmt(c.created_at)}</td>
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <select className="text-xs bg-background border border-border px-2 py-1"
                        value={c.lifecycle_stage || "lead"}
                        onChange={e => updateLifecycle(c.id, e.target.value)}>
                        <option value="lead">Lead</option>
                        <option value="mql">MQL</option>
                        <option value="sql">SQL</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="customer">Customer</option>
                        <option value="subscriber">Subscriber</option>
                      </select>
                    </td>
                  </tr>
                  {expandedId === c.id && (
                    <tr key={`${c.id}-detail`}>
                      <td colSpan={15} className="px-6 py-4 bg-muted/20 border-t-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div><strong className="text-muted-foreground">Job Title:</strong> <span className="text-foreground">{c.job_title || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Website:</strong> <span className="text-foreground">{c.website || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Industry:</strong> <span className="text-foreground">{c.mk_industry_vertical || c.industry || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Org Size:</strong> <span className="text-foreground">{c.org_size || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Profile Type:</strong> <span className="text-foreground">{c.mk_onb_profile_type || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Deal Size:</strong> <span className="text-foreground">{c.mk_onb_estimated_deal_size || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Timeline:</strong> <span className="text-foreground">{c.mk_onb_timeline || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Priority:</strong> <span className="text-foreground">{c.mk_onb_priority || "—"}</span></div>
                          <div><strong className="text-muted-foreground">IT Situation:</strong> <span className="text-foreground">{c.mk_onb_it_situation || "—"}</span></div>
                          <div><strong className="text-muted-foreground">IT Team Size:</strong> <span className="text-foreground">{c.mk_it_team_size || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Endpoints:</strong> <span className="text-foreground">{c.mk_endpoint_count || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Locations:</strong> <span className="text-foreground">{c.mk_location_count || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Remote %:</strong> <span className="text-foreground">{c.mk_remote_workforce_pct || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Email Platform:</strong> <span className="text-foreground">{c.mk_email_platform || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Compliance:</strong> <span className="text-foreground">{c.mk_compliance_in_scope || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Compliance Deadline:</strong> <span className="text-foreground">{c.mk_compliance_deadline_date || "—"}</span></div>

                          {/* Flags */}
                          <div className="col-span-2 md:col-span-4 pt-2 border-t border-border">
                            <strong className="text-muted-foreground block mb-1">Routing Flags:</strong>
                            <div className="flex flex-wrap gap-1">
                              {c.mk_fast_track && badge("Fast Track", "border-red-700 bg-red-950/30 text-red-400")}
                              {c.mk_ir_escalation && badge("IR Escalation", "border-red-700 bg-red-950/30 text-red-400")}
                              {c.mk_flag_security_remediation && badge("Security Remediation")}
                              {c.mk_flag_infra_assessment && badge("Infra Assessment")}
                              {c.mk_flag_cloud_strategy && badge("Cloud Strategy")}
                              {c.mk_flag_cost_optimization && badge("Cost Optimization")}
                              {c.mk_flag_growth_enablement && badge("Growth Enablement")}
                              {c.mk_flag_compliance && badge("Compliance")}
                              {c.mk_flag_understaffed_it && badge("Understaffed IT")}
                              {c.mk_multisite && badge("Multi-site")}
                              {c.mk_upsell_ready && badge("Upsell Ready", "border-blue-700 bg-blue-950/30 text-blue-400")}
                            </div>
                          </div>

                          {/* Maturity Scores */}
                          <div className="col-span-2 md:col-span-4 pt-2 border-t border-border">
                            <strong className="text-muted-foreground block mb-1">Control Family Maturity:</strong>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                ["Infrastructure", c.mk_cf_infrastructure_maturity],
                                ["SecOps", c.mk_cf_secops_maturity],
                                ["IAM", c.mk_cf_iam_maturity],
                                ["Cloud", c.mk_cf_cloud_maturity],
                                ["Data Protection", c.mk_cf_dataprotection_maturity],
                                ["Automation", c.mk_cf_automation_maturity],
                                ["Cost", c.mk_cf_cost_maturity],
                                ["Business Gov", c.mk_cf_business_gov_maturity],
                              ].map(([label, val]) => (
                                <div key={String(label)}><span className="text-muted-foreground">{label}:</span> <span className="font-mono text-foreground">{val ?? 0}</span></div>
                              ))}
                            </div>
                          </div>

                          <div><strong className="text-muted-foreground">HubSpot ID:</strong> <span className="text-foreground font-mono">{c.hubspot_contact_id || "—"}</span></div>
                          <div><strong className="text-muted-foreground">HubSpot Synced:</strong> <span className="text-foreground">{c.hubspot_synced_at ? fmt(c.hubspot_synced_at) : "—"}</span></div>
                          {c.hubspot_error && <div className="col-span-2"><strong className="text-destructive">HubSpot Error:</strong> <span className="text-destructive">{c.hubspot_error}</span></div>}
                          <div><strong className="text-muted-foreground">IP:</strong> <span className="text-foreground font-mono">{c.ip_address || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Updated:</strong> <span className="text-foreground">{fmt(c.updated_at)}</span></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{total} contacts · Page {page + 1}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => load(page - 1)}>Previous</Button>
          <Button variant="outline" size="sm" disabled={contacts.length < pageSize} onClick={() => load(page + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Leads Tab — with active/inactive status toggles
   ════════════════════════════════════════════════════════ */
const LeadsTab = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    const { data } = await query;
    setLeads(data || []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const toggleStatus = async (id: string, current: string) => {
    const next = current === "active" ? "inactive" : current === "inactive" ? "qualified" : current === "qualified" ? "disqualified" : "active";
    await supabase.from("leads").update({ status: next }).eq("id", id);
    load();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    load();
  };

  const exportAll = () => { if (leads.length) downloadCsv(leads, `leads_${new Date().toISOString().split("T")[0]}.csv`); };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "inactive", "qualified", "disqualified", "converted"].map(s => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" className="text-xs capitalize"
              onClick={() => setStatusFilter(s)}>{s === "all" ? `All (${leads.length})` : s}</Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={exportAll} className="gap-2"><Download className="w-4 h-4" />Export CSV</Button>
      </div>
      {leads.length === 0 ? <p className="text-muted-foreground text-center py-12">No leads yet.</p> : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Name", "Email", "Company", "Phone", "Industry", "Org Size", "Source", "Tier", "Status", "Created", "Actions"].map(h => (
                  <th key={h} className="text-left px-3 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map(l => (
                <tr key={l.id} className="hover:bg-muted/30">
                  <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{[l.first_name, l.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{l.email}</td>
                  <td className="px-3 py-3 text-muted-foreground">{l.company || "—"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{l.phone || "—"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{l.industry || "—"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{l.org_size || "—"}</td>
                  <td className="px-3 py-3">{badge(l.source || "—")}</td>
                  <td className="px-3 py-3 text-muted-foreground">{l.recommended_tier || "—"}</td>
                  <td className="px-3 py-3">{statusBadge(l.status || "active")}</td>
                  <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmt(l.created_at)}</td>
                  <td className="px-3 py-3">
                    <select className="text-xs bg-background border border-border px-2 py-1"
                      value={l.status || "active"}
                      onChange={e => updateStatus(l.id, e.target.value)}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="qualified">Qualified</option>
                      <option value="disqualified">Disqualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Lead Exports Tab — ThreatAI CSV exports
   ════════════════════════════════════════════════════════ */
const LeadExportsTab = () => {
  const [exports, setExports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("lead_exports").select("*").order("created_at", { ascending: false }).limit(200);
      setExports(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{exports.length} exports</p>
      {exports.length === 0 ? <p className="text-muted-foreground text-center py-12">No exports yet.</p> : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Name", "Email", "Business", "Role", "HubSpot", "Error", "Created"].map(h => (
                  <th key={h} className="text-left px-3 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {exports.map(e => (
                <tr key={e.id} className="hover:bg-muted/30">
                  <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{[e.first_name, e.last_name].filter(Boolean).join(" ")}</td>
                  <td className="px-3 py-3 text-muted-foreground">{e.email}</td>
                  <td className="px-3 py-3 text-muted-foreground">{e.business_name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{e.role}</td>
                  <td className="px-3 py-3">
                    {e.hubspot_synced
                      ? badge("Synced", "border-green-700 bg-green-950/30 text-green-400")
                      : badge("Pending", "border-yellow-700 bg-yellow-950/30 text-yellow-400")}
                  </td>
                  <td className="px-3 py-3 text-xs text-destructive">{e.error_message || "—"}</td>
                  <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmt(e.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Assessments Tab — with Q&A answers display
   ════════════════════════════════════════════════════════ */
const AssessmentsTab = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("assessment_sessions").select("*").order("created_at", { ascending: false }).limit(200);
      setSessions(data || []);
      setLoading(false);
    })();
  }, []);

  const exportAll = () => { if (sessions.length) downloadCsv(sessions, `assessments_${new Date().toISOString().split("T")[0]}.csv`); };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  const statusColor = (s: string) => {
    if (s === "completed") return "border-green-700 bg-green-950/30 text-green-400";
    if (s === "in_progress") return "border-yellow-700 bg-yellow-950/30 text-yellow-400";
    return "border-border bg-muted text-muted-foreground";
  };

  // Render answers JSON as readable Q&A
  const renderAnswers = (answers: any) => {
    if (!answers || typeof answers !== "object") return <p className="text-muted-foreground">No answers recorded.</p>;
    const entries = Object.entries(answers);
    if (entries.length === 0) return <p className="text-muted-foreground">No answers recorded.</p>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {entries.map(([key, val]) => (
          <div key={key} className="flex gap-2">
            <span className="text-muted-foreground font-mono text-[11px] min-w-[140px]">{key}:</span>
            <span className="text-foreground text-[11px] break-all">
              {Array.isArray(val) ? val.join(", ") : typeof val === "object" && val !== null ? JSON.stringify(val) : String(val ?? "—")}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{sessions.length} sessions</p>
        <Button variant="outline" size="sm" onClick={exportAll} className="gap-2"><Download className="w-4 h-4" />Export CSV</Button>
      </div>
      {sessions.length === 0 ? <p className="text-muted-foreground text-center py-12">No assessment sessions yet.</p> : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["", "Name", "Email", "Company", "Status", "Tier", "EMS", "Urgency", "Risk", "Price", "HubSpot", "Started", "Completed"].map(h => (
                  <th key={h} className="text-left px-3 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sessions.map(s => (
                <>
                  <tr key={s.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}>
                    <td className="px-3 py-3">{expandedId === s.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</td>
                    <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{[s.first_name, s.last_name].filter(Boolean).join(" ") || "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{s.email || "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{s.company || "—"}</td>
                    <td className="px-3 py-3">{badge(s.status || "unknown", statusColor(s.status || ""))}</td>
                    <td className="px-3 py-3 text-muted-foreground">{s.recommended_tier || "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{s.ems_score ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{s.urgency_score ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{s.risk_score ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{s.monthly_price ? `$${s.monthly_price}` : "—"}</td>
                    <td className="px-3 py-3">
                      {s.hubspot_contact_id
                        ? badge("Synced", "border-green-700 bg-green-950/30 text-green-400")
                        : badge("—")}
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmt(s.created_at)}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmt(s.completed_at)}</td>
                  </tr>
                  {expandedId === s.id && (
                    <tr key={`${s.id}-detail`}>
                      <td colSpan={13} className="px-6 py-4 bg-muted/20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
                          <div><strong className="text-muted-foreground">Role:</strong> <span className="text-foreground">{s.role || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Org Stage:</strong> <span className="text-foreground">{s.org_stage || "—"}</span></div>
                          <div><strong className="text-muted-foreground">IT Situation:</strong> <span className="text-foreground">{s.it_situation || "—"}</span></div>
                          <div><strong className="text-muted-foreground">IT Team Size:</strong> <span className="text-foreground">{s.it_team_size ?? "—"}</span></div>
                          <div><strong className="text-muted-foreground">Endpoints:</strong> <span className="text-foreground">{s.endpoint_count ?? "—"}</span></div>
                          <div><strong className="text-muted-foreground">Locations:</strong> <span className="text-foreground">{s.location_count ?? "—"}</span></div>
                          <div><strong className="text-muted-foreground">Industry:</strong> <span className="text-foreground">{s.industry || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Timeline:</strong> <span className="text-foreground">{s.timeline || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Profile Type:</strong> <span className="text-foreground">{s.profile_type || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Deal Size:</strong> <span className="text-foreground">{s.estimated_deal_size || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Priority:</strong> <span className="text-foreground">{s.primary_priority || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Complexity:</strong> <span className="text-foreground font-mono">{s.complexity_score ?? "—"}</span></div>
                          <div><strong className="text-muted-foreground">Current Flow:</strong> <span className="text-foreground">{s.current_flow || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Current Question:</strong> <span className="text-foreground font-mono">{s.current_question || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Completed Flows:</strong> <span className="text-foreground">{(s.completed_flows || []).join(", ") || "—"}</span></div>
                          <div><strong className="text-muted-foreground">Compliance:</strong> <span className="text-foreground">{(s.compliance_frameworks || []).join(", ") || "—"}</span></div>
                          <div className="col-span-2 md:col-span-4 pt-2 border-t border-border">
                            <strong className="text-muted-foreground block mb-1">Control Family Maturity:</strong>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                ["Infrastructure", s.cf_infrastructure_maturity],
                                ["SecOps", s.cf_secops_maturity],
                                ["IAM", s.cf_iam_maturity],
                                ["Cloud", s.cf_cloud_maturity],
                                ["Data Protection", s.cf_data_protection_maturity],
                                ["Automation", s.cf_automation_maturity],
                                ["Cost", s.cf_cost_maturity],
                                ["Business Gov", s.cf_business_gov_maturity],
                                ["DR/BC", s.cf_dr_bc_maturity],
                                ["Security PS", s.cf_security_ps_maturity],
                              ].map(([label, val]) => (
                                <div key={String(label)}><span className="text-muted-foreground">{label}:</span> <span className="font-mono text-foreground">{val ?? 0}</span></div>
                              ))}
                            </div>
                          </div>
                          <div><strong className="text-muted-foreground">HubSpot ID:</strong> <span className="font-mono text-foreground">{s.hubspot_contact_id || "—"}</span></div>
                          <div><strong className="text-muted-foreground">HubSpot Synced:</strong> <span className="text-foreground">{fmt(s.hubspot_synced_at)}</span></div>
                          <div><strong className="text-muted-foreground">Key Gaps:</strong> <span className="text-foreground">{(s.key_gap_flags || []).join(", ") || "—"}</span></div>
                          <div><strong className="text-muted-foreground">MSP Issues:</strong> <span className="text-foreground">{(s.msp_issues || []).join(", ") || "—"}</span></div>
                        </div>

                        {/* Q&A Answers */}
                        <div className="pt-3 border-t border-border">
                          <strong className="text-muted-foreground block mb-2 text-xs uppercase tracking-wider">Assessment Questions & Answers</strong>
                          {renderAnswers(s.answers)}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Careers Tab
   ════════════════════════════════════════════════════════ */
const CareersTab = () => {
  const [postings, setPostings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", department: "", location: "Remote / Hybrid", description: "",
    employment_type: "Full-time", salary_range: "", requirements: "",
    nice_to_haves: "", application_email: "careers@managekube.com",
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("cms_career_postings").select("*").order("sort_order");
    setPostings(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("cms_career_postings").update({
      is_published: !current, published_at: !current ? new Date().toISOString() : null,
    }).eq("id", id);
    load();
  };

  const deletePosting = async (id: string) => {
    if (!confirm("Delete this posting?")) return;
    await supabase.from("cms_career_postings").delete().eq("id", id);
    load();
  };

  const savePosting = async () => {
    const payload = {
      title: form.title, department: form.department, location: form.location,
      description: form.description, employment_type: form.employment_type,
      salary_range: form.salary_range || null,
      requirements: form.requirements ? form.requirements.split("\n").filter(Boolean) : null,
      nice_to_haves: form.nice_to_haves ? form.nice_to_haves.split("\n").filter(Boolean) : null,
      application_email: form.application_email,
    };
    if (editId) { await supabase.from("cms_career_postings").update(payload).eq("id", editId); }
    else { await supabase.from("cms_career_postings").insert(payload); }
    setEditId(null);
    setForm({ title: "", department: "", location: "Remote / Hybrid", description: "", employment_type: "Full-time", salary_range: "", requirements: "", nice_to_haves: "", application_email: "careers@managekube.com" });
    load();
  };

  const startEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      title: p.title, department: p.department, location: p.location || "",
      description: p.description, employment_type: p.employment_type || "Full-time",
      salary_range: p.salary_range || "", requirements: (p.requirements || []).join("\n"),
      nice_to_haves: (p.nice_to_haves || []).join("\n"),
      application_email: p.application_email || "careers@managekube.com",
    });
  };

  return (
    <div className="space-y-6">
      <div className="border border-border p-6 bg-card space-y-4">
        <h3 className="font-bold text-foreground">{editId ? "Edit Posting" : "New Career Posting"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Job Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <Input placeholder="Department *" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
          <Input placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          <Input placeholder="Employment Type" value={form.employment_type} onChange={e => setForm(f => ({ ...f, employment_type: e.target.value }))} />
          <Input placeholder="Salary Range" value={form.salary_range} onChange={e => setForm(f => ({ ...f, salary_range: e.target.value }))} />
          <Input placeholder="Application Email" value={form.application_email} onChange={e => setForm(f => ({ ...f, application_email: e.target.value }))} />
        </div>
        <textarea placeholder="Job Description *" className="w-full h-24 px-3 py-2 border border-border bg-background text-foreground text-sm" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <textarea placeholder="Requirements (one per line)" className="w-full h-20 px-3 py-2 border border-border bg-background text-foreground text-sm" value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} />
        <textarea placeholder="Nice to Haves (one per line)" className="w-full h-16 px-3 py-2 border border-border bg-background text-foreground text-sm" value={form.nice_to_haves} onChange={e => setForm(f => ({ ...f, nice_to_haves: e.target.value }))} />
        <div className="flex gap-3">
          <Button onClick={savePosting} disabled={!form.title || !form.department || !form.description}>{editId ? "Update" : "Create"} Posting</Button>
          {editId && <Button variant="ghost" onClick={() => { setEditId(null); setForm({ title: "", department: "", location: "Remote / Hybrid", description: "", employment_type: "Full-time", salary_range: "", requirements: "", nice_to_haves: "", application_email: "careers@managekube.com" }); }}>Cancel</Button>}
        </div>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div> : postings.length === 0 ? <p className="text-muted-foreground text-center py-8">No career postings yet.</p> : (
        <div className="space-y-3">
          {postings.map(p => (
            <div key={p.id} className="flex items-center justify-between gap-4 border border-border p-4 bg-card">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-foreground truncate">{p.title}</h4>
                  {badge(p.is_published ? "Published" : "Draft", p.is_published ? "border-green-700 bg-green-950/30 text-green-500" : "border-border bg-muted text-muted-foreground")}
                </div>
                <p className="text-xs text-muted-foreground">{p.department} · {p.location} · {p.employment_type}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => togglePublish(p.id, p.is_published)}>{p.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                <Button variant="ghost" size="sm" onClick={() => startEdit(p)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => deletePosting(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Applications Tab
   ════════════════════════════════════════════════════════ */
const ApplicationsTab = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("cms_career_applications").select("*").order("created_at", { ascending: false });
      setApps(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
  if (apps.length === 0) return <p className="text-muted-foreground text-center py-12">No applications yet.</p>;

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {["Name", "Email", "Phone", "LinkedIn", "Status", "Applied"].map(h => (
              <th key={h} className="text-left px-3 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {apps.map(a => (
            <tr key={a.id} className="hover:bg-muted/30">
              <td className="px-3 py-3 font-medium text-foreground">{a.first_name} {a.last_name}</td>
              <td className="px-3 py-3 text-muted-foreground">{a.email}</td>
              <td className="px-3 py-3 text-muted-foreground">{a.phone || "—"}</td>
              <td className="px-3 py-3 text-muted-foreground">{a.linkedin_url ? <a href={a.linkedin_url} target="_blank" className="underline">View</a> : "—"}</td>
              <td className="px-3 py-3">{badge(a.status || "new")}</td>
              <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmt(a.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Main CMS Page — NO Header/Footer/Banner
   ════════════════════════════════════════════════════════ */
const CmsAdmin = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple admin header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">ManageKube CRM</h1>
          <span className="text-xs text-muted-foreground">Admin Dashboard</span>
        </div>
        <a href="/home" className="text-xs text-muted-foreground hover:text-foreground">← Back to Site</a>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6">
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="w-full justify-start bg-card border border-border mb-6 h-auto flex-wrap">
            <TabsTrigger value="contacts" className="gap-2"><Users className="w-4 h-4" />Contacts</TabsTrigger>
            <TabsTrigger value="leads" className="gap-2"><ClipboardList className="w-4 h-4" />Leads</TabsTrigger>
            <TabsTrigger value="assessments" className="gap-2"><BarChart3 className="w-4 h-4" />Assessments</TabsTrigger>
            <TabsTrigger value="exports" className="gap-2"><FileText className="w-4 h-4" />Threat Exports</TabsTrigger>
            <TabsTrigger value="careers" className="gap-2"><Briefcase className="w-4 h-4" />Careers</TabsTrigger>
            <TabsTrigger value="applications" className="gap-2"><Plus className="w-4 h-4" />Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts"><ContactsTab /></TabsContent>
          <TabsContent value="leads"><LeadsTab /></TabsContent>
          <TabsContent value="assessments"><AssessmentsTab /></TabsContent>
          <TabsContent value="exports"><LeadExportsTab /></TabsContent>
          <TabsContent value="careers"><CareersTab /></TabsContent>
          <TabsContent value="applications"><ApplicationsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CmsAdmin;
