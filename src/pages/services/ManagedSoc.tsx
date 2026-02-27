import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedSoc() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed SOC"
    tagline="24/7 security operations center with threat hunting, incident response, and compliance reporting."
    description="Our Managed SOC is staffed by expert analysts and powered by the Kubric XDR platform. We deliver 24/7 threat detection, hunting, incident response, and compliance reporting, fully managed so your organization stays protected without building an in-house security team."
    sections={[
      {
        title: "Security Monitoring",
        items: [
          "24/7/365 security event monitoring and correlation",
          "Real-time threat detection, triage, and alerting",
          "SIEM log ingestion and normalization across all sources",
          "Automated playbook-driven initial response",
        ],
      },
      {
        title: "Threat Hunting & Response",
        items: [
          "Proactive threat hunting campaigns (weekly cadence)",
          "Incident response and containment with defined SLAs",
          "Malware analysis, reverse engineering, and IOC extraction",
          "Threat actor attribution and kill-chain mapping",
        ],
      },
      {
        title: "Compliance Reporting",
        items: [
          "Framework-aligned reporting (SOC 2, HIPAA, PCI-DSS, CMMC)",
          "Evidence collection and audit-ready documentation",
          "Policy violation alerting and remediation tracking",
          "Continuous compliance monitoring dashboards",
        ],
      },
      {
        title: "Intelligence & Briefings",
        items: [
          "Quarterly threat intelligence briefings for leadership",
          "Monthly threat landscape reports tailored to your industry",
          "Incident post-mortems with lessons learned and recommendations",
          "Annual penetration testing coordination and oversight",
          "Executive security reporting with risk scoring",
        ],
      },
    ]}
    similar={[
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Managed Compliance & GRC", href: "/services/managed-compliance" },
      { label: "Governance, Risk & Compliance", href: "/service-layer/grc" },
    ]}
  />;
}
