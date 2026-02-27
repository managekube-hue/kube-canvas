export type Pillar = "infra" | "detection" | "intel";

export interface KubeModule {
  id: string;
  label: string;
  fullName: string;
  pillar: Pillar;
  desc: string;
  href: string;
}

export const MODULES: KubeModule[] = [
  // Infrastructure (6)
  { id: "CIO", label: "CIO", fullName: "Chief Infrastructure Orchestrator", pillar: "infra", desc: "Unified infrastructure visibility and control across hybrid environments.", href: "/service-layer/cio" },
  { id: "NPM", label: "NPM", fullName: "Network Performance Management", pillar: "infra", desc: "Deep packet inspection, flow analysis, and network health scoring.", href: "/service-layer/npm" },
  { id: "MDM", label: "MDM", fullName: "Mobile Device Management", pillar: "infra", desc: "Endpoint enrollment, policy enforcement, and remote wipe capabilities.", href: "/service-layer/mdm" },
  { id: "APM", label: "APM", fullName: "Application Performance Management", pillar: "infra", desc: "Real-time application tracing, latency analysis, and dependency mapping.", href: "/service-layer/apm" },
  { id: "CFDR", label: "CFDR", fullName: "Cloud Firewall Detection & Response", pillar: "infra", desc: "Cloud-native firewall policy management and anomaly detection.", href: "/service-layer/cfdr" },
  { id: "BDR", label: "BDR", fullName: "Backup & Disaster Recovery", pillar: "infra", desc: "Immutable backups, RTO validation, and automated failover testing.", href: "/service-layer/bdr" },
  // Detection & Response (9)
  { id: "ITDR", label: "ITDR", fullName: "Identity Threat Detection & Response", pillar: "detection", desc: "Credential abuse detection, privilege escalation alerts, and identity hygiene.", href: "/service-layer/itdr" },
  { id: "NDR", label: "NDR", fullName: "Network Detection & Response", pillar: "detection", desc: "East-west traffic analysis, lateral movement detection, and network forensics.", href: "/service-layer/ndr" },
  { id: "CDR", label: "CDR", fullName: "Cloud Detection & Response", pillar: "detection", desc: "Cloud workload protection, misconfiguration detection, and runtime defense.", href: "/service-layer/cdr" },
  { id: "SDR", label: "SDR", fullName: "SaaS Detection & Response", pillar: "detection", desc: "SaaS application monitoring, shadow IT discovery, and data exfiltration alerts.", href: "/service-layer/sdr" },
  { id: "ADR", label: "ADR", fullName: "Application Detection & Response", pillar: "detection", desc: "Runtime application security, code-level threat detection, and API protection.", href: "/service-layer/adr" },
  { id: "DDR", label: "DDR", fullName: "Data Detection & Response", pillar: "detection", desc: "Data classification, movement tracking, and exfiltration prevention.", href: "/service-layer/ddr" },
  { id: "STRIKE", label: "STRIKE", fullName: "Offensive Security Testing", pillar: "detection", desc: "Red team operations, penetration testing, and adversary simulation.", href: "/service-layer/strike" },
  { id: "EASM", label: "EASM", fullName: "External Attack Surface Management", pillar: "detection", desc: "Continuous asset discovery, exposure scoring, and shadow infrastructure detection.", href: "/service-layer/easm" },
  { id: "HONEYPOT", label: "HONEYPOT", fullName: "Deception Technology", pillar: "detection", desc: "Decoy infrastructure, attacker luring, and early breach indicators.", href: "/service-layer/honeypot" },
  // Intelligence (5)
  { id: "TI", label: "TI", fullName: "Threat Intelligence", pillar: "intel", desc: "CVE enrichment, EPSS scoring, dark-web monitoring, and IOC feeds.", href: "/service-layer/ti" },
  { id: "VDR", label: "VDR", fullName: "Vulnerability Detection & Response", pillar: "intel", desc: "Continuous scanning, risk-based prioritisation, and patch orchestration.", href: "/service-layer/vdr" },
  { id: "GRC", label: "GRC", fullName: "Governance, Risk & Compliance", pillar: "intel", desc: "Policy engine, control mapping, audit evidence collection, and risk scoring.", href: "/service-layer/grc" },
  { id: "MSP", label: "MSP", fullName: "Managed Service Provider", pillar: "intel", desc: "Multi-tenant service delivery, SLA monitoring, and operational dashboards.", href: "/service-layer/msp" },
  { id: "MSSP", label: "MSSP", fullName: "Managed Security Service Provider", pillar: "intel", desc: "Security-as-a-service delivery, SOC operations, and client reporting.", href: "/service-layer/mssp" },
];

export const PILLAR_COLORS: Record<Pillar, string> = {
  infra: "#22d3ee",      // cyan
  detection: "#f97316",  // orange
  intel: "#eab308",      // gold
};

export const PILLAR_LABELS: Record<Pillar, string> = {
  infra: "Infrastructure",
  detection: "Detection & Response",
  intel: "Intelligence",
};
