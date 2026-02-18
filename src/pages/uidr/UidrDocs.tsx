import { useState } from "react";
import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, BookOpen, Search, ExternalLink, Lock
} from "lucide-react";

const MODULE_META = {
  edr:  { icon: Shield,      color: "#3b82f6", code: "K-EDR-01",  name: "EDR",  fullName: "Endpoint Detection & Response" },
  itdr: { icon: Fingerprint, color: "#a855f7", code: "K-ITDR-02", name: "ITDR", fullName: "Identity Threat Detection & Response" },
  ndr:  { icon: Network,     color: "#22c55e", code: "K-NDR-03",  name: "NDR",  fullName: "Network Detection & Response" },
  cdr:  { icon: Cloud,       color: "#06b6d4", code: "K-CDR-04",  name: "CDR",  fullName: "Cloud Detection & Response" },
  sdr:  { icon: Globe,       color: "#f59e0b", code: "K-SDR-05",  name: "SDR",  fullName: "SaaS Detection & Response" },
  adr:  { icon: Square,      color: "#ef4444", code: "K-ADR-06",  name: "ADR",  fullName: "Application Detection & Response" },
  ddr:  { icon: Database,    color: "#8b5cf6", code: "K-DDR-07",  name: "DDR",  fullName: "Data Detection & Response" },
  vdr:  { icon: Bug,         color: "#f97316", code: "K-VDR-08",  name: "VDR",  fullName: "Vulnerability Detection & Response" },
  mdr:  { icon: Headphones,  color: "#64748b", code: "K-MDR-09",  name: "MDR",  fullName: "Managed Detection & Response" },
  ti:   { icon: Radar,       color: "#fb923c", code: "K-TI-10",   name: "TI",   fullName: "Threat Intelligence" },
  cfdr: { icon: Settings2,   color: "#22d3ee", code: "K-CFDR-11", name: "CFDR", fullName: "Configuration Drift Detection & Response" },
  bdr:  { icon: HardDrive,   color: "#34d399", code: "K-BDR-12",  name: "BDR",  fullName: "Backup & Disaster Recovery" },
  npm:  { icon: Radar,       color: "#60a5fa", code: "K-NPM-13",  name: "NPM",  fullName: "Network Performance Management" },
  uem:  { icon: Settings2,   color: "#a3e635", code: "K-UEM-14",  name: "UEM",  fullName: "Unified Endpoint Management" },
  mdm:  { icon: Smartphone,  color: "#fb923c", code: "K-MDM-15",  name: "MDM",  fullName: "Mobile Device Management" },
  apm:  { icon: Activity,    color: "#4ade80", code: "K-APM-16",  name: "APM",  fullName: "Application Performance Management" },
  grc:  { icon: Scale,       color: "#fbbf24", code: "K-GRC-17",  name: "GRC",  fullName: "Governance, Risk & Compliance" },
  psa:  { icon: Briefcase,   color: "#f472b6", code: "K-PSA-18",  name: "PSA",  fullName: "Professional Services Automation" },
};

const SIDEBAR_GROUPS = [
  { label: "DETECTION & RESPONSE", ids: ["edr","itdr","ndr","cdr","sdr","adr","ddr","vdr","mdr"] },
  { label: "INTELLIGENCE",          ids: ["ti"] },
  { label: "OPERATIONS",            ids: ["cfdr","bdr","npm","uem","mdm","apm"] },
  { label: "GOVERNANCE & BUSINESS", ids: ["grc","psa"] },
];

const INTEGRATION_STRATEGIES = [
  { strategy: "Direct Import",  license: "MIT / Apache 2.0 / BSD",  approach: "Add to go.mod or Cargo.toml" },
  { strategy: "Vendor Data",    license: "GPL 2.0 (rules/data)",     approach: "Vendor YAML/JSON into /vendor" },
  { strategy: "Subprocess",     license: "AGPL 3.0",                 approach: "Execute as child process" },
  { strategy: "REST API Pull",  license: "Public API / ToS",         approach: "Scheduled HTTP GET, cache in ClickHouse" },
  { strategy: "FFI Binding",    license: "LGPL 3.0",                 approach: "Static/dynamic link via Rust bindgen" },
];

export default function UidrDocs() {
  const [search, setSearch] = useState("");

  const filterIds = (ids: string[]) =>
    ids.filter(id => {
      const m = MODULE_META[id as keyof typeof MODULE_META];
      if (!m) return false;
      const q = search.toLowerCase();
      return !q || m.name.toLowerCase().includes(q) || m.fullName.toLowerCase().includes(q) || m.code.toLowerCase().includes(q);
    });

  return (
    <UidrLayout>
      <div className="flex min-h-screen" style={{ background: "#0a0a0a" }}>

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
        <aside className="w-56 flex-shrink-0 border-r border-white/10 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto" style={{ background: "#0a0a0a" }}>
          <div className="p-4">
            <Link to="/uidr/docs" className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <BookOpen size={14} />
              <span className="font-semibold">Overview</span>
            </Link>

            {SIDEBAR_GROUPS.map(group => (
              <div key={group.label} className="mb-5">
                <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {group.label}
                </p>
                {group.ids.map(id => {
                  const m = MODULE_META[id as keyof typeof MODULE_META];
                  if (!m) return null;
                  const Icon = m.icon;
                  return (
                    <Link
                      key={id}
                      to={`/uidr/docs/${id}`}
                      className="flex items-center justify-between px-2 py-1.5 rounded text-sm mb-0.5 transition-colors hover:bg-white/5 hover:text-white"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={13} style={{ color: m.color }} />
                        <span>{m.name}</span>
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{m.code}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-10">

            {/* Heading */}
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={28} className="text-white" />
              <h1 className="text-4xl font-black text-white">Documentation</h1>
            </div>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-2xl">
              Complete technical reference for all 18 Kubric UIDR modules. Each module documents the open-source libraries extracted, their licensing strategy, and integration architecture.
            </p>

            {/* Search */}
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 mb-10">
              <Search size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                type="text"
                placeholder="Search modules..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-white text-sm outline-none w-full placeholder:text-white/30"
              />
            </div>

            {/* Module Groups */}
            {SIDEBAR_GROUPS.map(group => {
              const visibleIds = filterIds(group.ids);
              if (visibleIds.length === 0) return null;

              const groupLabel = group.label.split(" ").map(w =>
                w.charAt(0) + w.slice(1).toLowerCase()
              ).join(" ").replace("& Business", "& Business").replace("& Response", "& Response");

              return (
                <section key={group.label} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-black text-white">
                      {group.label === "DETECTION & RESPONSE" ? "Detection & Response"
                       : group.label === "INTELLIGENCE" ? "Intelligence"
                       : group.label === "OPERATIONS" ? "Operations"
                       : "Governance & Business"}
                    </h2>
                    <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                      {visibleIds.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {visibleIds.map(id => {
                      const m = MODULE_META[id as keyof typeof MODULE_META];
                      const Icon = m.icon;
                      return (
                        <Link
                          key={id}
                          to={`/uidr/docs/${id}`}
                          className="flex items-center gap-4 p-5 rounded-xl border border-white/10 transition-all hover:border-white/25 hover:bg-white/5"
                          style={{ background: "#111111" }}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${m.color}20`, border: `1px solid ${m.color}30` }}>
                            <Icon size={20} style={{ color: m.color }} />
                          </div>
                          <div>
                            <p className="font-black text-white text-base">{m.name}</p>
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{m.fullName}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Integration Strategies Table */}
            <section className="mb-10">
              <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: "#111111" }}>
                <div className="px-6 py-5 border-b border-white/10">
                  <h2 className="text-xl font-black text-white">Integration Strategies</h2>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-6 py-3 font-bold" style={{ color: "#f97316" }}>Strategy</th>
                      <th className="text-left px-6 py-3 font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>License Type</th>
                      <th className="text-left px-6 py-3 font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INTEGRATION_STRATEGIES.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{row.strategy}</td>
                        <td className="px-6 py-4" style={{ color: "rgba(255,255,255,0.5)" }}>{row.license}</td>
                        <td className="px-6 py-4" style={{ color: "rgba(255,255,255,0.6)" }}>{row.approach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Technical Docs CTA */}
            <div className="rounded-xl border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-12" style={{ background: "#111111" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/10 flex-shrink-0">
                  <Lock size={20} style={{ color: "rgba(255,255,255,0.4)" }} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white mb-1">Technical Documentation</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Full K-DOCS monorepo explorer — 23 internal documents covering orchestration architecture, 120k+ detection rules, persona configurations, and internal reference materials. Authorised personnel only.
                  </p>
                </div>
              </div>
              <Link
                to="/uidr/technical-docs"
                className="flex-shrink-0 flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity rounded"
              >
                Access Technical Docs
                <ExternalLink size={14} />
              </Link>
            </div>

          </div>
        </main>
      </div>
    </UidrLayout>
  );
}
