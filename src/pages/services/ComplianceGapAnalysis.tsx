import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ComplianceGapAnalysis() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Compliance Gap Analysis"
    tagline="Framework-specific gap assessments identifying control deficiencies and remediation requirements."
    description="Compliance Gap Analysis evaluates your current security and operational posture against regulatory frameworks like CMMC, HIPAA, SOC 2, PCI-DSS, NIST 800-171, and ISO 27001. Our GRC analysts map your existing controls, identify gaps, and deliver prioritized remediation plans with effort estimates, cost projections, and timelines."
    sections={[
      {
        title: "Scoping & Framework Selection",
        items: [
          "Regulatory applicability analysis for your industry and geography",
          "Framework selection and control mapping (CMMC, HIPAA, SOC 2, PCI-DSS, NIST, ISO)",
          "Scope boundary definition and system inventory",
          "Stakeholder interviews and process documentation review",
          "Data flow mapping for regulated information types",
        ],
      },
      {
        title: "Control Evaluation",
        items: [
          "Control-by-control assessment against selected framework requirements",
          "Evidence collection and validation for existing controls",
          "Technical testing and configuration verification",
          "Policy and procedure completeness review",
          "Third-party and vendor control assessment",
        ],
      },
      {
        title: "Gap Identification & Prioritization",
        items: [
          "Gap severity classification (critical, high, medium, low)",
          "Risk-weighted prioritization based on business impact and exploitability",
          "Quick-win identification for immediate compliance improvement",
          "Dependency mapping between remediation items",
          "Regulatory deadline alignment and timeline pressure analysis",
        ],
      },
      {
        title: "Remediation Roadmap & Deliverables",
        items: [
          "Phased remediation plan with resource and cost estimates",
          "Compliance roadmap aligned to audit timelines",
          "Executive summary presentation for leadership and board",
          "Detailed technical findings with remediation procedures",
          "Ongoing advisory retainer options for remediation support",
        ],
      },
    ]}
    similar={[
      { label: "Managed Compliance & GRC", href: "/services/managed-compliance" },
      { label: "Security Assessments", href: "/services/security-assessments" },
      { label: "Governance, Risk & Compliance", href: "/service-layer/grc" },
    ]}
  />;
}
