import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, Search,
  ChevronDown, ChevronRight, ExternalLink
} from "lucide-react";

// ─── Module Data ─────────────────────────────────────────────────────────────
const DR_MODULES = [
  { id: "edr",  full: "Endpoint Detection & Response",          icon: Shield,    color: "#3b82f6", href: "/uidr/docs/edr",  code: "K-EDR-01" },
  { id: "itdr", full: "Identity Threat Detection & Response",   icon: Fingerprint, color: "#a855f7", href: "/uidr/docs/itdr", code: "K-ITDR-02" },
  { id: "ndr",  full: "Network Detection & Response",           icon: Network,   color: "#22c55e", href: "/uidr/docs/ndr",  code: "K-NDR-03" },
  { id: "cdr",  full: "Cloud Detection & Response",             icon: Cloud,     color: "#06b6d4", href: "/uidr/docs/cdr",  code: "K-CDR-04" },
  { id: "sdr",  full: "SaaS Detection & Response",              icon: Globe,     color: "#f59e0b", href: "/uidr/docs/sdr",  code: "K-SDR-05" },
  { id: "adr",  full: "Application Detection & Response",       icon: Square,    color: "#ef4444", href: "/uidr/docs/adr",  code: "K-ADR-06" },
  { id: "ddr",  full: "Data Detection & Response",              icon: Database,  color: "#8b5cf6", href: "/uidr/docs/ddr",  code: "K-DDR-07" },
  { id: "vdr",  full: "Vulnerability Detection & Response",     icon: Bug,       color: "#f97316", href: "/uidr/docs/vdr",  code: "K-VDR-08" },
  { id: "mdr",  full: "Managed Detection & Response",           icon: Headphones, color: "#64748b", href: "/uidr/docs/mdr",  code: "K-MDR-09" },
];
const TI_MODULES = [
  { id: "ti",   full: "Threat Intelligence",                    icon: Radar,     color: "#fb923c", href: "/uidr/docs/ti",   code: "K-TI-10" },
];
const OPS_MODULES = [
  { id: "cfdr", full: "Configuration Drift Detection & Response", icon: Settings2, color: "#22d3ee", href: "/uidr/docs/cfdr", code: "K-CFDR-11" },
  { id: "bdr",  full: "Backup & Disaster Recovery",             icon: HardDrive, color: "#34d399", href: "/uidr/docs/bdr",  code: "K-BDR-12" },
  { id: "npm",  full: "Network Performance Management",         icon: Radar,     color: "#60a5fa", href: "/uidr/docs/npm",  code: "K-NPM-13" },
  { id: "uem",  full: "Unified Endpoint Management",            icon: Settings2, color: "#a3e635", href: "/uidr/docs/uem",  code: "K-UEM-14" },
  { id: "mdm",  full: "Mobile Device Management",               icon: Smartphone, color: "#fb923c", href: "/uidr/docs/mdm",  code: "K-MDM-15" },
  { id: "apm",  full: "Application Performance Management",     icon: Activity,  color: "#4ade80", href: "/uidr/docs/apm",  code: "K-APM-16" },
];
const GOV_MODULES = [
  { id: "grc",  full: "Governance, Risk & Compliance",          icon: Scale,     color: "#fbbf24", href: "/uidr/docs/grc",  code: "K-GRC-17" },
  { id: "psa",  full: "Professional Services Automation",       icon: Briefcase, color: "#f472b6", href: "/uidr/docs/psa",  code: "K-PSA-18" },
];

const INTEGRATION_TABLE = [
  { strategy: "Direct Import",  license: "MIT / Apache 2.0 / BSD",  approach: "Add to go.mod or Cargo.toml" },
  { strategy: "Vendor Data",    license: "GPL 2.0 (rules/data)",     approach: "Vendor YAML/JSON into /vendor" },
  { strategy: "Subprocess",     license: "AGPL 3.0",                 approach: "Execute as child process" },
  { strategy: "REST API Pull",  license: "Public API / ToS",         approach: "Scheduled HTTP GET, cache in ClickHouse" },
  { strategy: "FFI Binding",    license: "LGPL 3.0",                 approach: "Static/dynamic link via Rust bindgen" },
];

const SIDEBAR_GROUPS = [
  { label: "DETECTION & RESPONSE", modules: DR_MODULES },
  { label: "INTELLIGENCE",         modules: TI_MODULES },
  { label: "OPERATIONS",           modules: OPS_MODULES },
  { label: "GOVERNANCE & BUSINESS", modules: GOV_MODULES },
];

// ─── Module Grid ─────────────────────────────────────────────────────────────
const ModuleGrid = ({ modules }: { modules: typeof DR_MODULES }) => (
  <div className="grid grid-cols-2 gap-4">
    {modules.map(mod => (
      <Link
        key={mod.id}
        to={`/uidr/docs/${mod.id}`}
        className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group"
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mod.color}20` }}>
          <mod.icon size={22} style={{ color: mod.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xl font-black text-white">{mod.id.toUpperCase()}</p>
            <span className="text-xs font-mono text-white/25">{mod.code}</span>
          </div>
          <p className="text-sm text-white/50 leading-tight">{mod.full}</p>
        </div>
        <span className="text-white/20 group-hover:text-blue-400 transition-colors text-lg">→</span>
      </Link>
    ))}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UidrDocs() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "DETECTION & RESPONSE": true,
    "INTELLIGENCE": true,
    "OPERATIONS": true,
    "GOVERNANCE & BUSINESS": true,
  });

  const toggle = (label: string) =>
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));

  const filterMods = (arr: typeof DR_MODULES) =>
    arr.filter(m =>
      !search ||
      m.full.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <UidrLayout>
      <div className="flex min-h-screen">

        {/* ── LEFT SIDEBAR ──────────────────────────────── */}
        <aside
          className="w-60 flex-shrink-0 border-r border-white/10 sticky top-14 overflow-y-auto"
          style={{ height: "calc(100vh - 56px)", background: "#0d0d0d" }}
        >
          <div className="px-4 py-4 border-b border-white/5">
            <Link
              to="/uidr/docs"
              className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/uidr/docs"
                  ? "text-white bg-white/10"
                  : "text-white/60 hover:text-white"
              }`}
            >
              📋 Kubric Docs Home
            </Link>
          </div>
          <div className="py-3">
            {SIDEBAR_GROUPS.map(group => (
              <div key={group.label}>
                <button
                  onClick={() => toggle(group.label)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left"
                >
                  <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">{group.label}</span>
                  {openGroups[group.label]
                    ? <ChevronDown size={10} className="text-white/30" />
                    : <ChevronRight size={10} className="text-white/30" />
                  }
                </button>
                {openGroups[group.label] && (
                  <div className="pb-1">
                    {group.modules.map(mod => {
                      const isActive = location.pathname === `/uidr/docs/${mod.id}`;
                      return (
                        <Link
                          key={mod.id}
                          to={`/uidr/docs/${mod.id}`}
                          className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                            isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                          }`}
                        >
                          <mod.icon size={13} style={{ color: mod.color }} />
                          <span className="text-sm font-semibold">{mod.id.toUpperCase()}</span>
                          <span className="text-[9px] text-white/20 font-mono ml-auto">{mod.code}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technical Docs link in sidebar */}
          <div className="px-4 py-4 border-t border-white/5 mt-2">
            <Link
              to="/uidr/technical-docs"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold px-3 py-2 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all"
            >
              <ExternalLink size={13} />
              Read Technical Docs
            </Link>
          </div>
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────── */}
        <main className="flex-1 min-w-0 px-12 py-12 max-w-5xl">

          {/* Header */}
          <div className="mb-10">
            <div className="text-sm font-mono text-blue-400 mb-3 tracking-wider">KUBRIC UNIFIED INFRASTRUCTURE DR</div>
            <h1 className="text-6xl font-black text-white mb-4 leading-none">Kubric Docs</h1>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
              Complete technical reference for all 18 UIDR modules. Click any module to explore capabilities, OSS libraries, NATS subjects, and KAI integration.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-10">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search modules..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-white placeholder-white/30 text-base focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Module Groups */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-black text-white">Detection & Response</h2>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-white/60">9 modules</span>
            </div>
            <ModuleGrid modules={filterMods(DR_MODULES)} />
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-black text-white">Intelligence</h2>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-white/60">1 module</span>
            </div>
            <ModuleGrid modules={filterMods(TI_MODULES)} />
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-black text-white">Operations</h2>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-white/60">6 modules</span>
            </div>
            <ModuleGrid modules={filterMods(OPS_MODULES)} />
          </section>

          <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-black text-white">Governance & Business</h2>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-white/60">2 modules</span>
            </div>
            <ModuleGrid modules={filterMods(GOV_MODULES)} />
          </section>

          {/* Integration Strategies Table */}
          <div className="mb-12 rounded-xl border border-white/10 overflow-hidden" style={{ background: "#0d0d0d" }}>
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-black text-white">Monorepo Integration Strategies</h2>
              <p className="text-white/40 text-sm mt-1">How Kubric ingests open-source libraries based on license type</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-3 text-xs font-bold text-blue-400 uppercase tracking-wider">Strategy</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-white/40 uppercase tracking-wider">License Type</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-white/40 uppercase tracking-wider hidden md:table-cell">Approach</th>
                </tr>
              </thead>
              <tbody>
                {INTEGRATION_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4 text-base font-bold text-white">{row.strategy}</td>
                    <td className="px-6 py-4 text-sm text-white/50">{row.license}</td>
                    <td className="px-6 py-4 text-sm text-white/40 hidden md:table-cell">{row.approach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technical Docs CTA */}
          <div
            className="rounded-2xl border border-blue-500/20 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ background: "linear-gradient(135deg, #0a0f1a 0%, #0d1020 100%)" }}
          >
            <div>
              <div className="text-blue-400 text-sm font-mono mb-3 tracking-wider">FOR ENGINEERS & CONTRIBUTORS</div>
              <h3 className="text-4xl font-black text-white mb-3">Read Technical Docs</h3>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                The full K-DOCS monorepo — every source file, config, and detection asset across 13 sections, 120k+ rules. Built for developers onboarding to Kubric.
              </p>
            </div>
            <Link
              to="/uidr/technical-docs"
              className="flex-shrink-0 flex items-center gap-3 rounded-xl px-8 py-5 text-lg font-black text-white transition-colors"
              style={{ background: "#2563eb" }}
            >
              <span>📂</span>
              Open K-DOCS Explorer
              <ExternalLink size={18} />
            </Link>
          </div>
        </main>
      </div>
    </UidrLayout>
  );
}
