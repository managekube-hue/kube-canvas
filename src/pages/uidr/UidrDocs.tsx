import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import { kdocsTree } from "@/data/kdocs-tree";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, Search,
  ChevronDown, ChevronRight, Folder, FolderOpen
} from "lucide-react";

// DR Module data matching the screenshot
const DR_MODULES = [
  { id: "EDR", full: "Endpoint Detection & Response", icon: Shield, color: "#3b82f6", href: "/uidr/docs/edr", code: "K-EDR-01" },
  { id: "ITDR", full: "Identity Threat Detection & Response", icon: Fingerprint, color: "#a855f7", href: "/uidr/docs/itdr", code: "K-ITDR-02" },
  { id: "NDR", full: "Network Detection & Response", icon: Network, color: "#22c55e", href: "/uidr/docs/ndr", code: "K-NDR-03" },
  { id: "CDR", full: "Cloud Detection & Response", icon: Cloud, color: "#06b6d4", href: "/uidr/docs/cdr", code: "K-CDR-04" },
  { id: "SDR", full: "SaaS Detection & Response", icon: Globe, color: "#f59e0b", href: "/uidr/docs/sdr", code: "K-SDR-05" },
  { id: "ADR", full: "Application Detection & Response", icon: Square, color: "#ef4444", href: "/uidr/docs/adr", code: "K-ADR-06" },
  { id: "DDR", full: "Data Detection & Response", icon: Database, color: "#8b5cf6", href: "/uidr/docs/ddr", code: "K-DDR-07" },
  { id: "VDR", full: "Vulnerability Detection & Response", icon: Bug, color: "#f97316", href: "/uidr/docs/vdr", code: "K-VDR-08" },
  { id: "MDR", full: "Managed Detection & Response", icon: Headphones, color: "#64748b", href: "/uidr/docs/mdr", code: "K-MDR-09" },
];
const TI_MODULES = [
  { id: "TI", full: "Threat Intelligence", icon: Radar, color: "#fb923c", href: "/uidr/docs/ti", code: "K-TI-10" },
];
const OPS_MODULES = [
  { id: "CFDR", full: "Configuration Drift Detection & Response", icon: Settings2, color: "#22d3ee", href: "/uidr/docs/cfdr", code: "K-CFDR-11" },
  { id: "BDR", full: "Backup & Disaster Recovery", icon: HardDrive, color: "#34d399", href: "/uidr/docs/bdr", code: "K-BDR-12" },
  { id: "NPM", full: "Network Performance Management", icon: Radar, color: "#60a5fa", href: "/uidr/docs/npm", code: "K-NPM-13" },
  { id: "UEM", full: "Unified Endpoint Management", icon: Settings2, color: "#a3e635", href: "/uidr/docs/uem", code: "K-UEM-14" },
  { id: "MDM", full: "Mobile Device Management", icon: Smartphone, color: "#fb923c", href: "/uidr/docs/mdm", code: "K-MDM-15" },
  { id: "APM", full: "Application Performance Management", icon: Activity, color: "#4ade80", href: "/uidr/docs/apm", code: "K-APM-16" },
];
const GOV_MODULES = [
  { id: "GRC", full: "Governance, Risk & Compliance", icon: Scale, color: "#fbbf24", href: "/uidr/docs/grc", code: "K-GRC-17" },
  { id: "PSA", full: "Professional Services Automation", icon: Briefcase, color: "#f472b6", href: "/uidr/docs/psa", code: "K-PSA-18" },
];

const INTEGRATION_TABLE = [
  { strategy: "Direct Import", license: "MIT / Apache 2.0 / BSD", approach: "Add to go.mod or Cargo.toml" },
  { strategy: "Vendor Data", license: "GPL 2.0 (rules/data)", approach: "Vendor YAML/JSON into /vendor" },
  { strategy: "Subprocess", license: "AGPL 3.0", approach: "Execute as child process" },
  { strategy: "REST API Pull", license: "Public API / ToS", approach: "Scheduled HTTP GET, cache in ClickHouse" },
  { strategy: "FFI Binding", license: "LGPL 3.0", approach: "Static/dynamic link via Rust bindgen" },
];

// Sidebar groups mirroring the screenshot exactly
const SIDEBAR_GROUPS = [
  {
    label: "DETECTION & RESPONSE",
    modules: DR_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
  {
    label: "INTELLIGENCE",
    modules: TI_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
  {
    label: "OPERATIONS",
    modules: OPS_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
  {
    label: "GOVERNANCE & BUSINESS",
    modules: GOV_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
];

const ModuleGrid = ({ modules }: { modules: typeof DR_MODULES }) => (
  <div className="grid grid-cols-2 gap-3">
    {modules.map(mod => (
      <Link
        key={mod.id}
        to={mod.href}
        className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mod.color}20` }}>
          <mod.icon size={16} style={{ color: mod.color } as React.CSSProperties} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{mod.id}</p>
          <p className="text-xs text-white/40 leading-tight">{mod.full}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default function UidrDocs() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "DETECTION & RESPONSE": true,
    "INTELLIGENCE": true,
    "OPERATIONS": true,
    "GOVERNANCE & BUSINESS": true,
  });
  const [search, setSearch] = useState("");

  const toggle = (label: string) =>
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));

  return (
    <UidrLayout>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 border-r border-white/10 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
          {/* Overview */}
          <div className="px-4 py-3 border-b border-white/5">
            <Link
              to="/uidr/docs"
              className={`flex items-center gap-2 text-sm font-semibold px-2 py-1.5 rounded ${
                location.pathname === "/uidr/docs" ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              <span className="text-base">📋</span> Overview
            </Link>
          </div>

          {/* Groups */}
          <div className="py-2">
            {SIDEBAR_GROUPS.map(group => (
              <div key={group.label}>
                <button
                  onClick={() => toggle(group.label)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left"
                >
                  <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{group.label}</span>
                  {openGroups[group.label]
                    ? <ChevronDown size={10} className="text-white/30" />
                    : <ChevronRight size={10} className="text-white/30" />
                  }
                </button>
                {openGroups[group.label] && (
                  <div className="pb-2">
                    {group.modules.map(mod => {
                      const isActive = location.pathname === mod.href;
                      return (
                        <Link
                          key={mod.id}
                          to={mod.href}
                          className={`flex items-center justify-between px-4 py-1.5 transition-colors ${
                            isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <mod.icon size={12} style={{ color: mod.color } as React.CSSProperties} />
                            <span className="text-xs font-medium">{mod.id}</span>
                          </div>
                          <span className="text-[9px] text-white/20 font-mono">{mod.code}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-10 py-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📘</span>
            <h1 className="text-3xl font-black text-white">Documentation</h1>
          </div>
          <p className="text-white/50 text-base mb-8 leading-relaxed max-w-2xl">
            Complete technical reference for all 18 Kubric UIDR modules. Each module documents the open-source libraries extracted, their licensing strategy, and integration architecture.
          </p>

          {/* Search */}
          <div className="relative mb-10">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search modules..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Module Sections */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-white">Detection & Response</h2>
              <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">9</span>
            </div>
            <ModuleGrid modules={DR_MODULES.filter(m => m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()) || !search)} />
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-white">Intelligence</h2>
              <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
            </div>
            <ModuleGrid modules={TI_MODULES.filter(m => m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()) || !search)} />
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-white">Operations</h2>
              <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">6</span>
            </div>
            <ModuleGrid modules={OPS_MODULES.filter(m => m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()) || !search)} />
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-white">Governance & Business</h2>
              <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">2</span>
            </div>
            <ModuleGrid modules={GOV_MODULES.filter(m => m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()) || !search)} />
          </div>

          {/* Integration Strategies Table */}
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-base font-bold text-white">Integration Strategies</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-blue-400">Strategy</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">License Type</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 hidden md:table-cell">Approach</th>
                </tr>
              </thead>
              <tbody>
                {INTEGRATION_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-3 text-sm font-bold text-white">{row.strategy}</td>
                    <td className="px-6 py-3 text-xs text-white/50">{row.license}</td>
                    <td className="px-6 py-3 text-xs text-white/40 hidden md:table-cell">{row.approach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </UidrLayout>
  );
}
