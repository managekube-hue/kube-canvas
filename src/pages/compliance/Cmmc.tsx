import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Cmmc() {
  return (
    <ComplianceDetailPage
      framework="CMMC"
      fullName="Cybersecurity Maturity Model Certification"
      audience="Defense Contractors & DoD Supply Chain"
      tagline="CMMC compliance management for defense contractors — from Level 1 through Level 3."
      description="ManageKube delivers managed CMMC compliance for defense contractors navigating the Department of Defense's Cybersecurity Maturity Model Certification requirements. We assess your current posture against CMMC Level 2 and Level 3 controls, implement the required practices, and deliver the continuous monitoring and evidence collection that sustains your certification — so your organization stays ready for C3PAO assessments and DFARS contract requirements."
      features={[
        "CMMC Level 1, Level 2, and Level 3 support",
        "NIST SP 800-171 control mapping and verification",
        "NIST SP 800-172 enhanced practice implementation",
        "Automated control testing and verification",
        "Continuous monitoring of all CMMC domains",
        "Evidence collection and archival — audit-ready",
        "POA&M tracking, remediation scheduling, and closure",
        "DFARS clause 252.204-7012 compliance documentation",
        "C3PAO assessment readiness reporting",
        "Controlled Unclassified Information (CUI) protection",
        "Multi-factor authentication enforcement",
        "System and communications protection controls",
        "Incident response for CMMC reportable incidents",
        "Supply chain risk management controls",
        "Configuration management and change control",
      ]}
      managedServices={[
        {
          title: "Assessment & Gap Analysis",
          items: [
            "CMMC scoping and boundary definition",
            "Control-by-control gap identification across all 110 NIST 800-171 practices",
            "Scored System Security Plan (SSP) review and development",
            "POA&M development and prioritization",
            "C3PAO pre-assessment readiness scoring",
          ],
        },
        {
          title: "Continuous Managed Compliance",
          items: [
            "Monthly control verification across all CMMC domains",
            "Automated evidence collection from your infrastructure",
            "Real-time compliance posture monitoring and drift detection",
            "SPRS score management and documentation",
            "Remediation workflow management and closure verification",
            "Annual assessment readiness package delivery",
          ],
        },
      ]}
      similar={[
        { label: "NIST 800-171", href: "/compliance/nist-800-171" },
        { label: "NIST 800-53", href: "/compliance/nist-800-53" },
        { label: "CJIS", href: "/compliance/cjis" },
      ]}
    />
  );
}
