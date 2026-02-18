import { UidrLayout } from "@/components/UidrLayout";
import { Scale, GitBranch } from "lucide-react";

const STRATEGIES = [
  {
    count: "40+",
    label: "LIBRARIES",
    title: "Direct Import",
    license: "MIT / Apache 2.0 / BSD",
    desc: "Embedded directly into the monorepo as Go/Rust packages.",
  },
  {
    count: "15+",
    label: "LIBRARIES",
    title: "Vendor Data Files",
    license: "GPL 2.0 (rules/data)",
    desc: "YAML, JSON, XML rules vendored into /vendor and loaded at runtime.",
  },
  {
    count: "8+",
    label: "LIBRARIES",
    title: "Subprocess / Sidecar",
    license: "AGPL 3.0",
    desc: "Executed as child processes, communicating via stdin/stdout or REST.",
  },
  {
    count: "6+",
    label: "LIBRARIES",
    title: "REST API Pull",
    license: "Public API / ToS",
    desc: "Scheduled HTTP GET, cached in ClickHouse for offline querying.",
  },
  {
    count: "3+",
    label: "LIBRARIES",
    title: "FFI Binding",
    license: "LGPL 3.0",
    desc: "Static/dynamic link via Rust bindgen or cgo.",
  },
];

const LIBRARY_INDEX = [
  { lib: "Aya-rs (eBPF)", module: "EDR", license: "MIT/Apache 2.0", integration: "Embed Rust crate" },
  { lib: "Falco Engine", module: "EDR", license: "Apache 2.0", integration: "Go library import" },
  { lib: "YARA-X", module: "EDR", license: "BSD-3", integration: "Embed Rust crate" },
  { lib: "Suricata ET Rules", module: "EDR", license: "GPL 2.0", integration: "Vendor rules as data" },
  { lib: "Wazuh Rules", module: "EDR", license: "GPL 2.0", integration: "Bundle XML rules" },
  { lib: "Cortex Responders", module: "EDR", license: "AGPL 3.0", integration: "Execute as subprocess" },
  { lib: "BloodHound (Go)", module: "ITDR", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "Sigma AD Rules", module: "ITDR", license: "Apache 2.0", integration: "Vendor YAML" },
  { lib: "MISP Taxonomies", module: "ITDR", license: "CC0/MIT", integration: "Embed JSON" },
  { lib: "Neo4j Go Driver", module: "ITDR", license: "Apache 2.0", integration: "Embed driver" },
  { lib: "nDPI (C→Rust FFI)", module: "NDR", license: "LGPL 3.0", integration: "FFI binding" },
  { lib: "RITA v5 (Go)", module: "NDR", license: "GPL 3.0", integration: "Subprocess" },
  { lib: "Zeek Scripts", module: "NDR", license: "BSD-3", integration: "Vendor as data" },
  { lib: "Suricata IDS Rules", module: "NDR", license: "GPL 2.0", integration: "Vendor rules as data" },
  { lib: "Falco K8s Rules", module: "CDR", license: "Apache 2.0", integration: "Vendor YAML" },
  { lib: "Nuclei Engine (Go)", module: "CDR", license: "MIT", integration: "Go library import" },
  { lib: "Trivy Scanner", module: "CDR", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "Wazuh O365 Rules", module: "SDR", license: "GPL 2.0", integration: "Vendor XML" },
  { lib: "ModSecurity CRS", module: "ADR", license: "Apache 2.0", integration: "Vendor as data" },
  { lib: "TruffleHog", module: "DDR", license: "AGPL 3.0", integration: "Subprocess" },
  { lib: "Gitleaks", module: "DDR", license: "MIT", integration: "Go library import" },
  { lib: "Presidio Analyzer", module: "DDR", license: "MIT", integration: "Python subprocess" },
  { lib: "NVD API v2", module: "VDR", license: "Public Domain", integration: "REST API pull" },
  { lib: "EPSS CSV", module: "VDR", license: "CC BY 4.0", integration: "REST pull + cache" },
  { lib: "CISA KEV", module: "VDR", license: "Public Domain", integration: "REST pull" },
  { lib: "TheHive Schema", module: "MDR", license: "AGPL 3.0", integration: "Schema as data" },
  { lib: "Shuffle SOAR", module: "MDR", license: "GPL 3.0", integration: "Config as data" },
  { lib: "Velociraptor Artifacts", module: "MDR", license: "AGPL 3.0", integration: "Artifact data" },
  { lib: "MISP Galaxies", module: "TI", license: "CC0", integration: "Embed JSON" },
  { lib: "MITRE ATT&CK STIX", module: "TI", license: "CC BY 4.0", integration: "Embed with attribution" },
  { lib: "OpenCTI Connectors", module: "TI", license: "Apache 2.0", integration: "Subprocess" },
  { lib: "SaltStack Python", module: "CFDR", license: "Apache 2.0", integration: "Python subprocess" },
  { lib: "Ansible Runner", module: "CFDR", license: "GPL 3.0", integration: "Subprocess" },
  { lib: "OPA (Go)", module: "CFDR", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "Restic (Go)", module: "BDR", license: "BSD-2", integration: "Embed Go package" },
  { lib: "Velero (Go)", module: "BDR", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "Prometheus Go Client", module: "NPM", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "VictoriaMetrics", module: "NPM", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "Osquery Go SDK", module: "UEM", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "FleetDM (Go)", module: "UEM", license: "MIT", integration: "Embed Go package" },
  { lib: "MicroMDM (Go)", module: "MDM", license: "MIT", integration: "Embed all packages" },
  { lib: "OpenTelemetry Go", module: "APM", license: "Apache 2.0", integration: "Embed Go SDK" },
  { lib: "Jaeger Go Client", module: "APM", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "NIST OSCAL JSON", module: "GRC", license: "Public Domain", integration: "Embed freely" },
  { lib: "OpenSCAP CIS XCCDF", module: "GRC", license: "CC data", integration: "Vendor as data" },
  { lib: "Sigstore (Go)", module: "GRC", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "Stripe Go SDK", module: "PSA", license: "MIT", integration: "Embed Go package" },
  { lib: "Temporal Go SDK", module: "PSA", license: "MIT", integration: "Embed Go package" },
  { lib: "Twilio Go", module: "PSA", license: "MIT", integration: "Embed Go package" },
  { lib: "NATS.io Go", module: "KAI", license: "Apache 2.0", integration: "Embed Go package" },
  { lib: "CrewAI Python", module: "KAI", license: "MIT", integration: "Python subprocess" },
  { lib: "Ollama REST", module: "KAI", license: "MIT", integration: "REST API call" },
];

const MODULE_COLORS: Record<string, string> = {
  EDR: "#3b82f6", ITDR: "#a855f7", NDR: "#22c55e", CDR: "#06b6d4",
  SDR: "#f59e0b", ADR: "#ef4444", DDR: "#8b5cf6", VDR: "#f97316",
  MDR: "#64748b", TI: "#fb923c", CFDR: "#22d3ee", BDR: "#34d399",
  NPM: "#60a5fa", UEM: "#a3e635", MDM: "#fb923c", APM: "#4ade80",
  GRC: "#fbbf24", PSA: "#f472b6", KAI: "#e879f9",
};

export default function UidrOpenSource() {
  return (
    <UidrLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Hero */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
            Built on the shoulders of <span className="text-blue-500">open<br />source.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mt-6 max-w-2xl">
            Kubric extracts and composes battle-tested algorithms from 71+ open-source libraries across 18 detection and response modules. Every integration is licensed for monorepo use.
          </p>
        </div>

        {/* Integration Strategies */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Scale size={18} className="text-blue-400" />
            <h2 className="text-lg font-bold text-white">Integration Strategies</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {STRATEGIES.map(s => (
              <div key={s.title} className="bg-[#111111] border border-white/10 rounded-xl p-6">
                <p className="text-2xl font-black text-blue-500 mb-1">
                  {s.count} <span className="text-xs font-bold text-white/40 tracking-widest">{s.label}</span>
                </p>
                <p className="text-base font-bold text-white mb-1">{s.title}</p>
                <p className="text-xs text-blue-400/70 mb-3">{s.license}</p>
                <p className="text-sm text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Library Index */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GitBranch size={18} className="text-blue-400" />
            <h2 className="text-lg font-bold text-white">Library Index</h2>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/40">Library</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/40">Module</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/40 hidden md:table-cell">License</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/40 hidden lg:table-cell">Integration</th>
                </tr>
              </thead>
              <tbody>
                {LIBRARY_INDEX.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-white">{row.lib}</td>
                    <td className="px-5 py-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: `${MODULE_COLORS[row.module] || "#3b82f6"}25`, color: MODULE_COLORS[row.module] || "#3b82f6" }}
                      >
                        {row.module}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-white/50 hidden md:table-cell">{row.license}</td>
                    <td className="px-5 py-3 text-xs text-white/40 hidden lg:table-cell">{row.integration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UidrLayout>
  );
}
