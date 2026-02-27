import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedCompliance() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed Compliance & GRC"
    tagline="Continuous compliance monitoring and evidence collection across 100+ frameworks."
    description="ManageKube Managed Compliance & GRC delivers continuous monitoring, evidence collection, and audit preparation across all your regulatory obligations. Expert GRC analysts handle the heavy lifting: mapping controls, gathering evidence, tracking remediation, and preparing your organization for audits so your team can focus on running the business."
    sections={[
      {
        title: "Continuous Monitoring",
        items: [
          "100+ framework coverage (CMMC, HIPAA, SOC 2, PCI-DSS, NIST, ISO 27001)",
          "Automated control testing and validation on recurring schedules",
          "Real-time gap identification with risk-weighted severity scoring",
          "Policy drift detection and automated alerting",
          "Continuous evidence collection and secure archival",
        ],
      },
      {
        title: "Audit Preparation & Support",
        items: [
          "Audit-ready compliance packages with pre-formatted evidence bundles",
          "Control documentation and procedure writing",
          "Remediation workflow management with assigned ownership and deadlines",
          "Direct auditor coordination and liaison during audit periods",
          "Gap remediation tracking with progress dashboards",
        ],
      },
      {
        title: "Risk Management",
        items: [
          "Enterprise risk register creation and maintenance",
          "Quantitative and qualitative risk assessment methodologies",
          "Third-party vendor risk assessments and scoring",
          "Business impact analysis (BIA) for critical systems",
          "Risk treatment plans with executive-level reporting",
        ],
      },
      {
        title: "Reporting & Governance",
        items: [
          "Monthly compliance posture reports for leadership",
          "Framework-specific dashboards with drill-down capability",
          "Quarterly business reviews with trend analysis",
          "Board-level compliance summary reporting",
          "Regulatory change tracking and impact notifications",
        ],
      },
    ]}
    similar={[
      { label: "Compliance Gap Analysis", href: "/services/compliance-gap-analysis" },
      { label: "Governance, Risk & Compliance", href: "/service-layer/grc" },
      { label: "Managed SOC", href: "/services/managed-soc" },
    ]}
  />;
}
