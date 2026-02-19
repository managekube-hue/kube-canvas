import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Nist80053() {
  return (
    <ComplianceDetailPage
      framework="NIST 800-53"
      fullName="Security and Privacy Controls for Information Systems and Organizations"
      audience="Federal Agencies, Critical Infrastructure & FedRAMP Cloud Providers"
      tagline="NIST SP 800-53 Rev 5 — 1,000+ controls across 20 families for federal systems and FedRAMP compliance."
      description="ManageKube delivers managed NIST SP 800-53 compliance for federal agencies, critical infrastructure operators, and FedRAMP cloud service providers. We implement and continuously verify the 1,000+ security and privacy controls across 20 control families, generate Authorization to Operate (ATO) documentation packages, and manage the ongoing continuous monitoring program required for federal system accreditation."
      features={[
        "NIST SP 800-53 Rev 5 — 1,000+ security and privacy controls",
        "20 control families — from Access Control (AC) through System and Services Acquisition (SA)",
        "Baseline selection — Low, Moderate, and High impact baselines",
        "Control tailoring and overlay documentation",
        "Automated control verification and continuous monitoring",
        "System Security Plan (SSP) development and maintenance",
        "Security Assessment Report (SAR) and Plan of Action and Milestones (POA&M) management",
        "Authorization package generation for ATO processes",
        "FedRAMP compliance support — JAB and Agency ATO paths",
        "Continuous monitoring strategy development and execution",
        "Privacy control implementation — NIST 800-53 Appendix J",
        "Supply chain risk management (SCRM) controls",
        "Configuration management and change control documentation",
        "Incident response program documentation and testing",
        "Penetration testing coordination and evidence documentation",
      ]}
      managedServices={[
        {
          title: "Authorization Package Development",
          items: [
            "System categorization — FIPS 199 and NIST 800-60",
            "Control selection and tailoring for system impact level",
            "SSP development with control implementation statements",
            "Security control assessment planning and execution",
            "ATO package compilation and submission support",
          ],
        },
        {
          title: "Continuous Monitoring Program",
          items: [
            "Ongoing control verification across all implemented controls",
            "Vulnerability scanning and patch management documentation",
            "Annual security control assessment coordination",
            "POA&M tracking and remediation management",
            "Authorization boundary change management and impact analysis",
          ],
        },
      ]}
      similar={[
        { label: "CMMC", href: "/compliance/cmmc" },
        { label: "NIST 800-171", href: "/compliance/nist-800-171" },
        { label: "FedRAMP", href: "/compliance/fedramp" },
      ]}
    />
  );
}
