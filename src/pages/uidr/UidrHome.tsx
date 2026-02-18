import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, Zap, BookOpen
} from "lucide-react";

const DR_MODULES = [
  { id: "EDR", full: "Endpoint Detection & Response", icon: Shield, color: "#3b82f6", href: "/uidr/docs/edr", kube: "/kubes/cdr-kube" },
  { id: "ITDR", full: "Identity Threat Detection & Response", icon: Fingerprint, color: "#a855f7", href: "/uidr/docs/itdr", kube: "/kubes/itdr-kube" },
  { id: "NDR", full: "Network Detection & Response", icon: Network, color: "#22c55e", href: "/uidr/docs/ndr", kube: "/kubes/ndr-kube" },
  { id: "CDR", full: "Cloud Detection & Response", icon: Cloud, color: "#06b6d4", href: "/uidr/docs/cdr", kube: "/kubes/cdr-kube" },
  { id: "SDR", full: "SaaS Detection & Response", icon: Globe, color: "#f59e0b", href: "/uidr/docs/sdr", kube: "/kubes/sdr-kube" },
  { id: "ADR", full: "Application Detection & Response", icon: Square, color: "#ef4444", href: "/uidr/docs/adr", kube: "/kubes/adr-kube" },
  { id: "DDR", full: "Data Detection & Response", icon: Database, color: "#8b5cf6", href: "/uidr/docs/ddr", kube: "/kubes/ddr-kube" },
  { id: "VDR", full: "Vulnerability Detection & Response", icon: Bug, color: "#f97316", href: "/uidr/docs/vdr", kube: "/kubes/vdr-kube" },
  { id: "MDR", full: "Managed Detection & Response", icon: Headphones, color: "#64748b", href: "/uidr/docs/mdr", kube: "/kubes/advisory-kube" },
  { id: "TI", full: "Threat Intelligence", icon: Radar, color: "#fb923c", href: "/uidr/docs/ti", kube: "/kubes/ti-kube" },
  { id: "CFDR", full: "Configuration Drift Detection & Response", icon: Settings2, color: "#22d3ee", href: "/uidr/docs/cfdr", kube: "/kubes/grc-kube" },
  { id: "BDR", full: "Backup & Disaster Recovery", icon: HardDrive, color: "#34d399", href: "/uidr/docs/bdr", kube: "/kubes/bdr-kube" },
  { id: "NPM", full: "Network Performance Management", icon: Radar, color: "#60a5fa", href: "/uidr/docs/npm", kube: "/kubes/npm-kube" },
  { id: "MDM", full: "Mobile Device Management", icon: Smartphone, color: "#fb923c", href: "/uidr/docs/mdm", kube: "/kubes/mdm-kube" },
  { id: "APM", full: "Application Performance Management", icon: Activity, color: "#4ade80", href: "/uidr/docs/apm", kube: "/kubes/apm-kube" },
  { id: "GRC", full: "Governance, Risk & Compliance", icon: Scale, color: "#fbbf24", href: "/uidr/docs/grc", kube: "/kubes/grc-kube" },
  { id: "PSA", full: "Professional Services Automation", icon: Briefcase, color: "#f472b6", href: "/uidr/docs/psa", kube: "/kubes/advisory-kube" },
  { id: "KAI", full: "AI Orchestration Layer", icon: Zap, color: "#38bdf8", href: "/uidr/docs/kai", kube: "/our-tools/kubric-ai" },
];

const STATS = [
  { value: "18", label: "DR MODULES" },
  { value: "120k+", label: "DETECTION ASSETS" },
  { value: "10G", label: "LINE RATE ANALYSIS" },
  { value: "70B", label: "LOCAL LLM REASONING" },
];

export default function UidrHome() {
  return (
    <UidrLayout>
      <div className="min-h-screen flex flex-col">
        {/* Hero */}
        <div className="max-w-7xl mx-auto w-full px-6 pt-16 pb-16 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">V1.0.0-RC.1</span>
              <span className="text-white/30 text-xs">OPEN CORE · APACHE 2.0</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-8">
              <span className="text-white">Kubric<br />UIDR</span>
              <br />
              <span className="text-blue-500">Platform</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-md">
              Unified Infrastructure Detection & Response. 18 modules. One autonomous orchestration layer — from kernel-level eBPF to automated invoicing.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-10 max-w-md">
              Built by Kubric to power the managed services that deliver real security outcomes. Every Kube maps to a DR module. Every event flows through NATS JetStream.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/uidr/docs"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded text-base transition-colors flex items-center gap-2"
              >
                <BookOpen size={18} />
                Read Kubric Docs
              </Link>
              <Link
                to="/uidr/contributors"
                className="border border-white/20 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded text-base transition-colors"
              >
                Become a Contributor
              </Link>
            </div>
          </div>

          {/* Right — All 18 Module Cards */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4 font-bold">18 DR Modules — Click to explore docs</p>
            <div className="grid grid-cols-3 gap-2">
              {DR_MODULES.map(mod => (
                <Link
                  key={mod.id}
                  to={mod.href}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/10 bg-[#111111] hover:border-white/25 hover:bg-[#1a1a1a] transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${mod.color}20` }}>
                    <mod.icon size={18} style={{ color: mod.color }} />
                  </div>
                  <span className="text-xs font-black text-white tracking-wider">{mod.id}</span>
                  <span className="text-[9px] text-white/35 text-center leading-tight line-clamp-2">{mod.full}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What is UIDR */}
        <div className="border-t border-white/10 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-black text-white mb-4">What is UIDR?</h2>
            <p className="text-white/50 text-lg max-w-3xl leading-relaxed mb-8">
              UIDR is Kubric's open-core detection and response framework. It defines how every managed service is delivered — from the Rust eBPF agent collecting kernel-level telemetry, to the KAI CrewAI personas that triage, remediate, bill, and communicate autonomously.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "K-XRO Super Agent", desc: "Rust-based endpoint agent with eBPF hooks, YARA-X malware scanning, file integrity monitoring, and NATS JetStream publishing.", href: "/uidr/platform" },
                { title: "KAI Orchestration", desc: "13 CrewAI personas (Triage, Keeper, Sentinel, Foresight, Analyst, Hunter...) coordinated through NATS subjects and Temporal workflows.", href: "/uidr/platform" },
                { title: "K-DOCS Monorepo", desc: "Complete technical reference: 13 sections, 120k+ detection assets, full library-to-module mapping from K-MAP-001 through K-MAP-020.", href: "/uidr/docs" },
              ].map(card => (
                <Link
                  key={card.title}
                  to={card.href}
                  className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-blue-500/30 hover:bg-[#151515] transition-all"
                >
                  <h3 className="text-lg font-black text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
                  <p className="text-xs text-blue-400 mt-4 font-semibold">Learn more →</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UidrLayout>
  );
}
