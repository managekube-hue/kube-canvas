import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import type { LucideProps } from "lucide-react";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, Layers, Zap
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

interface Module {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

const PILLARS = [
  {
    icon: Layers,
    title: "Unified Data Model",
    desc: "Every event shares the same OCSF schema, Blake3 identity, and causal ordering across all 18 modules.",
  },
  {
    icon: Settings2,
    title: "Monorepo Architecture",
    desc: "Import the library, not the product. Battle-tested OSS internals composed into a single platform.",
  },
  {
    icon: Shield,
    title: "Enterprise Provenance",
    desc: "Merkle tree audit trails, mTLS everywhere, TPM root of trust, and row-level security for multi-tenancy.",
  },
  {
    icon: Zap,
    title: "Autonomous Orchestration",
    desc: "Llama 3.1 agent personas for triage, remediation, billing, and communications with human-in-the-loop.",
  },
];

const DR_MODULES = [
  { id: "K-EDR-01", title: "Endpoint Detection & Response", desc: "Kernel-level threat detection with eBPF. Sigma rule engine with 3,000+ rules. MITRE ATT&CK mapping. Real-time malware scanning via YARA-X.", icon: Shield, color: "#3b82f6", href: "/uidr/docs/edr" },
  { id: "K-ITDR-02", title: "Identity Threat Detection & Response", desc: "Active Directory attack path analysis via BloodHound. Sigma AD detection rules. MISP taxonomy enrichment. Geo-anomaly detection via OTX.", icon: Fingerprint, color: "#a855f7", href: "/uidr/docs/itdr" },
  { id: "K-NDR-03", title: "Network Detection & Response", desc: "10G flow analysis with nDPI L7 classification. RITA beacon and exfil detection. Suricata IDS. Zeek protocol analysis. ModSecurity WAF.", icon: Network, color: "#22c55e", href: "/uidr/docs/ndr" },
  { id: "K-CDR-04", title: "Cloud Detection & Response", desc: "CloudQuery asset discovery. Trivy container scanning. Kube-bench CIS compliance. Falco K8s runtime rules. Nuclei cloud templates.", icon: Cloud, color: "#06b6d4", href: "/uidr/docs/cdr" },
  { id: "K-SDR-05", title: "SaaS Detection & Response", desc: "Office 365 and Google Workspace monitoring. Sigma SaaS rules. OAuth anomaly detection. MISP exfil taxonomies.", icon: Globe, color: "#f59e0b", href: "/uidr/docs/sdr" },
  { id: "K-ADR-06", title: "Application Detection & Response", desc: "ModSecurity CRS WAF rules. Kong API gateway SDK. Nuclei API templates. Zeek HTTP scripts. Suricata HTTP rules.", icon: Square, color: "#ef4444", href: "/uidr/docs/adr" },
  { id: "K-DDR-07", title: "Data Detection & Response", desc: "TruffleHog secret scanning. Gitleaks config. YARA-X PII rules. Presidio Analyzer. RITA exfil detection. Suricata data rules.", icon: Database, color: "#8b5cf6", href: "/uidr/docs/ddr" },
  { id: "K-VDR-08", title: "Vulnerability Detection & Response", desc: "Nuclei engine. CVE templates. Trivy SBOM. NVD API v2. EPSS scoring. CISA KEV. SSVC decision tree. Checkov IaC scanning.", icon: Bug, color: "#f97316", href: "/uidr/docs/vdr" },
  { id: "K-MDR-09", title: "Managed Detection & Response", desc: "TheHive case management. Cortex analyzer chains. Shuffle SOAR workflows. Velociraptor hunt artifacts. MISP Galaxy clusters.", icon: Headphones, color: "#64748b", href: "/uidr/docs/mdr" },
];

const OPS_MODULES = [
  { id: "K-CFDR-11", title: "Configuration Drift Detection & Response", desc: "SaltStack/Ansible remediation. Osquery drift detection. OPA/Kyverno policies. OSCAL compliance.", icon: Settings2, color: "#22d3ee", href: "/uidr/docs/cfdr" },
  { id: "K-BDR-12", title: "Backup & Disaster Recovery", desc: "Restic/Kopia snapshots. Velero K8s backup. Proxmox VM backup. MinIO object store. S3 cold lifecycle.", icon: HardDrive, color: "#34d399", href: "/uidr/docs/bdr" },
  { id: "K-NPM-13", title: "Network Performance Management", desc: "Prometheus metrics. VictoriaMetrics TSDB. nDPI flow stats. Grafana dashboards. Elastiflow schema.", icon: Radar, color: "#60a5fa", href: "/uidr/docs/npm" },
  { id: "K-UEM-14", title: "Unified Endpoint Management", desc: "Osquery SDK. FleetDM policies. SaltStack client. Ansible runner. Trivy SBOM scanning.", icon: Layers, color: "#a3e635", href: "/uidr/docs/uem" },
  { id: "K-MDM-15", title: "Mobile Device Management", desc: "MicroMDM for iOS. Headwind MDM for Android. Android Enterprise enrollment.", icon: Smartphone, color: "#fb923c", href: "/uidr/docs/mdm" },
  { id: "K-APM-16", title: "Application Performance Management", desc: "OpenTelemetry SDK. Jaeger tracing. Pyroscope profiling. VictoriaMetrics. Otel service graph.", icon: Activity, color: "#4ade80", href: "/uidr/docs/apm" },
];

const GOV_MODULES = [
  { id: "K-GRC-17", title: "Governance, Risk & Compliance", desc: "NIST OSCAL ingestion. OpenSCAP CIS benchmarks. Sigstore supply chain. OSV vulnerability API. PyFair risk modelling.", icon: Scale, color: "#fbbf24", href: "/uidr/docs/grc" },
  { id: "K-PSA-18", title: "Professional Services Automation", desc: "Temporal workflow engine. Stripe billing. Zammad ticketing. Twilio comms. gofpdf invoicing. PyFair risk quoting.", icon: Briefcase, color: "#f472b6", href: "/uidr/docs/psa" },
];

const TI_MODULES = [
  { id: "K-TI-10", title: "Threat Intelligence", desc: "MISP taxonomies. OTX REST API. AbuseIPDB. IPSum blocklist. MITRE ATT&CK STIX. OpenCTI. Zeek Intel. PhishTank.", icon: Radar, color: "#fb923c", href: "/uidr/docs/ti" },
];




const ModuleCard = ({ mod }: { mod: Module }) => (
  <Link
    to={mod.href}
    className="block bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors group"
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mod.color}20` }}>
        <mod.icon size={16} className="shrink-0" style={{ color: mod.color } as React.CSSProperties} />

      </div>
      <div>
        <p className="text-[10px] font-mono text-white/30 mb-0.5">{mod.id}</p>
        <p className="text-sm font-semibold text-white">{mod.title}</p>
      </div>
    </div>
    <p className="text-xs text-white/50 leading-relaxed">{mod.desc}</p>
    <p className="text-xs text-blue-500 mt-3 group-hover:text-blue-400 transition-colors">View module →</p>
  </Link>
);

const Section = ({ title, count, modules }: { title: string; count: number; modules: Module[] }) => (
  <div className="mb-16">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-sm text-white/40">{count} module{count !== 1 ? "s" : ""}</p>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {modules.map(mod => <ModuleCard key={mod.id} mod={mod} />)}
    </div>
  </div>
);

export default function UidrPlatform() {
  return (
    <UidrLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Hero */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <p className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">SERVICE LAYER</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
            18 Detection & Response Modules. 23 Capabilities.
          </h1>
          <h2 className="text-4xl lg:text-5xl font-black text-blue-500 mb-6">
            One Engine.
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
            Kubric extracts battle-tested algorithms from the best open-source security tools and composes them into a unified, multi-tenant detection and response platform.
          </p>
          <div className="flex items-center gap-3">
            <Link to="/uidr/docs" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors">
              Read the docs
            </Link>
            <Link to="/uidr/open-source" className="border border-white/20 text-white hover:bg-white/5 font-semibold px-5 py-2.5 rounded text-sm transition-colors">
              View libraries
            </Link>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {PILLARS.map(p => (
            <div key={p.title} className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <p.icon size={20} className="text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Modules */}
        <Section title="Detection & Response" count={9} modules={DR_MODULES} />
        <Section title="Intelligence" count={1} modules={TI_MODULES} />
        <Section title="Operations" count={6} modules={OPS_MODULES} />
        <Section title="Governance & Business" count={2} modules={GOV_MODULES} />
      </div>
    </UidrLayout>
  );
}
