import { useParams, Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import { docModules } from "@/data/docs-modules";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, Zap, ChevronLeft, ChevronRight, BookOpen
} from "lucide-react";

const MODULE_META: Record<string, { icon: React.ElementType; color: string; code: string; capabilities: string[] }> = {
  edr:  { icon: Shield,     color: "#3b82f6", code: "K-EDR-01",  capabilities: ["eBPF syscall monitoring","Falco process engine","3,000+ Sigma rules","YARA-X malware scanning","Suricata IDS rules","Velociraptor forensics"] },
  itdr: { icon: Fingerprint,color: "#a855f7", code: "K-ITDR-02", capabilities: ["BloodHound AD paths","Cypher query engine","Sigma AD rules","MISP taxonomies","AlienVault OTX feeds","Neo4j graph storage"] },
  ndr:  { icon: Network,    color: "#22c55e", code: "K-NDR-03",  capabilities: ["nDPI L7 DPI (FFI)","RITA beacon detection","Suricata ET rules","Zeek scripts","JA3 TLS fingerprinting","ModSecurity CRS"] },
  cdr:  { icon: Cloud,      color: "#06b6d4", code: "K-CDR-04",  capabilities: ["Falco K8s runtime rules","CloudQuery asset discovery","Trivy container scanning","Kube-bench CIS compliance","BloodHound Azure IAM","Sigma cloud audit rules"] },
  sdr:  { icon: Globe,      color: "#f59e0b", code: "K-SDR-05",  capabilities: ["Wazuh O365 module","Sigma SaaS rules","BloodHound OAuth queries","MISP exfil taxonomies","Sigma Google Workspace","Nuclei SaaS templates"] },
  adr:  { icon: Square,     color: "#ef4444", code: "K-ADR-06",  capabilities: ["ModSecurity CRS rules","Suricata HTTP rules","Kong Go Plugin SDK","Nuclei API templates","ModSecurity injection rules","Zeek HTTP scripts"] },
  ddr:  { icon: Database,   color: "#8b5cf6", code: "K-DDR-07",  capabilities: ["TruffleHog secrets detection","Gitleaks config scan","OpenDLP regex patterns","YARA-X PII rules","Presidio PII analyzer","RITA exfil detection"] },
  vdr:  { icon: Bug,        color: "#f97316", code: "K-VDR-08",  capabilities: ["Nuclei engine scanning","Trivy vulnerability DB","NVD API v2.0","FIRST EPSS scoring","CISA KEV active exploits","Checkov IaC scanning"] },
  mdr:  { icon: Headphones, color: "#64748b", code: "K-MDR-09",  capabilities: ["TheHive case management","Cortex analyzer chains","Shuffle SOAR playbooks","Velociraptor threat hunting","Sigma hunting rules","MISP galaxy clusters"] },
  ti:   { icon: Radar,      color: "#fb923c", code: "K-TI-10",   capabilities: ["MISP taxonomies & galaxies","AlienVault OTX feeds","AbuseIPDB reputation","MITRE ATT&CK STIX","Zeek Intel framework","OpenCTI connectors"] },
  cfdr: { icon: Settings2,  color: "#22d3ee", code: "K-CFDR-11", capabilities: ["OPA policy as code","Kyverno K8s policies","OpenSCAP LGPL binding","CIS Benchmark XCCDF","NIST OSCAL JSON","Rudder drift detection"] },
  bdr:  { icon: HardDrive,  color: "#34d399", code: "K-BDR-12",  capabilities: ["Restic file backups","Velero K8s backups","Proxmox VM API","MinIO object storage","Prometheus backup metrics","Velero DR automation"] },
  npm:  { icon: Radar,      color: "#60a5fa", code: "K-NPM-13",  capabilities: ["Prometheus Go client","Node Exporter metrics","nDPI L7 flow analysis","VictoriaMetrics TSDB","blackbox_exporter probing","Alertmanager rules"] },
  uem:  { icon: Settings2,  color: "#a3e635", code: "K-UEM-14",  capabilities: ["Osquery Go SDK","FleetDM fleet policies","SaltStack deployment","Ansible Runner","Trivy SBOM inventory","Prometheus HW monitoring"] },
  mdm:  { icon: Smartphone, color: "#fb923c", code: "K-MDM-15",  capabilities: ["MicroMDM iOS management","Apple MDM protocol","Headwind MDM Android","Android Enterprise API","MicroMDM enrollment","MDM compliance enforcement"] },
  apm:  { icon: Activity,   color: "#4ade80", code: "K-APM-16",  capabilities: ["OpenTelemetry Go SDK","Prometheus metrics","Jaeger tracing","Grafana dashboards","Loki log aggregation","Tempo distributed tracing"] },
  grc:  { icon: Scale,      color: "#fbbf24", code: "K-GRC-17",  capabilities: ["NIST OSCAL compliance","OPA policy engine","OpenSCAP audit","MITRE ATT&CK mapping","CISA KEV tracking","Audit evidence generation"] },
  psa:  { icon: Briefcase,  color: "#f472b6", code: "K-PSA-18",  capabilities: ["ERPNext DocType schema","Frappe billing engine","Stripe Go SDK","Twilio SMS alerts","VAPI phone automation","ClickHouse usage audit"] },
  kai:  { icon: Zap,        color: "#38bdf8", code: "K-KAI-03",  capabilities: ["CrewAI persona orchestration","NATS JetStream routing","Temporal workflow engine","Ollama local LLM","vLLM GPU inference","n8n automation workflows"] },
};

const ALL_MODULES = docModules;

export default function UidrModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const mod = ALL_MODULES.find(m => m.id === moduleId);
  const modIndex = ALL_MODULES.findIndex(m => m.id === moduleId);
  const prevMod = modIndex > 0 ? ALL_MODULES[modIndex - 1] : null;
  const nextMod = modIndex < ALL_MODULES.length - 1 ? ALL_MODULES[modIndex + 1] : null;
  const meta = moduleId ? MODULE_META[moduleId] : null;

  const SIDEBAR_GROUPS = [
    { label: "DETECTION & RESPONSE", ids: ["edr","itdr","ndr","cdr","sdr","adr","ddr","vdr","mdr"] },
    { label: "INTELLIGENCE",         ids: ["ti"] },
    { label: "OPERATIONS",           ids: ["cfdr","bdr","npm","uem","mdm","apm"] },
    { label: "GOVERNANCE & BUSINESS",ids: ["grc","psa"] },
  ];

  if (!mod || !meta) {
    return (
      <UidrLayout>
        <div className="flex items-center justify-center h-screen text-white">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Module Not Found</h1>
            <Link to="/uidr/docs" className="text-blue-400 hover:underline text-xl">← Back to Docs</Link>
          </div>
        </div>
      </UidrLayout>
    );
  }

  const Icon = meta.icon;

  return (
    <UidrLayout>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 border-r border-white/10 bg-[#0a0a0a] sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="p-4">
            <Link to="/uidr/docs" className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <BookOpen size={14} />
              <span>Overview</span>
            </Link>
            {SIDEBAR_GROUPS.map(group => (
              <div key={group.label} className="mb-5">
                <p className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-2">{group.label}</p>
                {group.ids.map(id => {
                  const m = ALL_MODULES.find(x => x.id === id);
                  const mm = MODULE_META[id];
                  if (!m || !mm) return null;
                  const isActive = id === moduleId;
                  return (
                    <Link
                      key={id}
                      to={`/uidr/docs/${id}`}
                      className={`flex items-center justify-between px-2 py-1.5 rounded text-sm mb-0.5 transition-colors ${
                        isActive ? "bg-white/10 text-white font-bold" : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <mm.icon size={13} style={{ color: mm.color }} />
                        <span className={isActive ? "font-bold" : ""}>{m.code}</span>
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">{mm.code}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link to="/uidr/docs" className="hover:text-white transition-colors">Docs</Link>
              <span>/</span>
              <span className="text-white/40">
                {SIDEBAR_GROUPS.find(g => g.ids.includes(moduleId!))?.label
                  .split(" ")[0]
                  .replace("DETECTION", "Detection & Response")
                  .replace("INTELLIGENCE", "Intelligence")
                  .replace("OPERATIONS", "Operations")
                  .replace("GOVERNANCE", "Governance & Business") ?? "Module"}
              </span>
              <span>/</span>
              <span className="text-white font-bold">{mod.code}</span>
            </div>

            {/* Header */}
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${meta.color}20`, border: `1px solid ${meta.color}40` }}>
                <Icon size={32} style={{ color: meta.color }} />
              </div>
              <div>
                <p className="text-sm font-mono text-white/40 mb-1">{meta.code}</p>
                <h1 className="text-5xl font-black text-white leading-tight">{mod.name}</h1>
              </div>
            </div>

            <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-3xl">{mod.description}</p>

            {/* Capabilities */}
            <div className="mb-10">
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2">
                <span>🔧</span> Capabilities
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {meta.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/10 bg-[#111111] text-base text-white/80"
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: meta.color }} />
                    <span className="text-base">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Libraries & Integration */}
            <div className="mb-10">
              <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2">
                <span>🔗</span> Libraries &amp; Integration
              </h2>
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#111111]">
                      <th className="text-left px-5 py-4 text-white/40 font-bold text-sm tracking-wider">Library</th>
                      <th className="text-left px-5 py-4 text-white/40 font-bold text-sm tracking-wider">License</th>
                      <th className="text-left px-5 py-4 text-white/40 font-bold text-sm tracking-wider">Integration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mod.libraries.map((lib, i) => {
                      const integrationStrategy = lib.license.includes("AGPL") ? "Execute as subprocess"
                        : lib.license.includes("LGPL") ? "FFI binding"
                        : lib.license.includes("GPL 3.0") ? "Go service/lib"
                        : lib.license.includes("GPL 2.0") ? "Vendor rules as data"
                        : lib.license.includes("embed") ? lib.license.split("—")[1]?.trim() ?? "Embed library"
                        : "Embed library";
                      const licenseShort = lib.license.split("—")[0].trim();
                      const licenseColor = licenseShort.includes("MIT") || licenseShort.includes("Apache") || licenseShort.includes("BSD") || licenseShort.includes("CC0")
                        ? "#22c55e"
                        : licenseShort.includes("LGPL") || licenseShort.includes("MPL")
                        ? "#3b82f6"
                        : licenseShort.includes("GPL 2.0")
                        ? "#f59e0b"
                        : licenseShort.includes("GPL 3.0") || licenseShort.includes("AGPL")
                        ? "#f97316"
                        : "#94a3b8";
                      return (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-5 py-4 font-semibold text-white text-base">{lib.library}</td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded text-xs font-bold" style={{ backgroundColor: `${licenseColor}20`, color: licenseColor }}>
                              {licenseShort}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-white/60 text-base">{integrationStrategy}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monorepo Integration Principle */}
            <div className="mb-12 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <h3 className="text-lg font-black text-white mb-3 flex items-center gap-2">
                <span>⚖️</span> Monorepo Integration Principle
              </h3>
              <p className="text-white/60 text-base leading-relaxed mb-3">
                Import the library, not the product. Where AGPL prevents embedding, call as a subprocess. Where GPL covers rules/data, vendor the data files. Build Kubric on top — not from scratch.
              </p>
              <code className="block text-sm font-mono text-green-400 bg-black/40 p-3 rounded leading-relaxed break-all">
                {mod.monorepoNote}
              </code>
            </div>

            {/* Read Technical Docs CTA */}
            <div className="mb-12 p-6 rounded-xl border border-white/10 bg-[#111111] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white mb-1">Ready to go deeper?</h3>
                <p className="text-white/50 text-base">Explore the full K-DOCS technical architecture, source files, and implementation details.</p>
              </div>
              <Link
                to="/uidr/technical-docs"
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors flex items-center gap-2 ml-6"
              >
                <BookOpen size={18} />
                Read Technical Docs
              </Link>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-4 border-t border-white/10 pt-8">
              {prevMod ? (
                <Link
                  to={`/uidr/docs/${prevMod.id}`}
                  className="flex-1 flex items-center gap-3 p-5 rounded-xl border border-white/10 bg-[#111111] hover:border-white/25 hover:bg-[#1a1a1a] transition-all group"
                >
                  <ChevronLeft size={20} className="text-white/40 group-hover:text-white transition-colors" />
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Previous</p>
                    <p className="text-lg font-black text-white">{prevMod.name}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}
              {nextMod ? (
                <Link
                  to={`/uidr/docs/${nextMod.id}`}
                  className="flex-1 flex items-center justify-end gap-3 p-5 rounded-xl border border-white/10 bg-[#111111] hover:border-white/25 hover:bg-[#1a1a1a] transition-all group text-right"
                >
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Next</p>
                    <p className="text-lg font-black text-white">{nextMod.name}</p>
                  </div>
                  <ChevronRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </main>
      </div>
    </UidrLayout>
  );
}
