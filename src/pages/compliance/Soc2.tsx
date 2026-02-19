import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Soc2() {
  return (
    <ComplianceDetailPage
      framework="SOC 2"
      fullName="Service Organization Control 2"
      audience="SaaS Providers & Service Organizations"
      tagline="SOC 2 Type I and Type II readiness — continuous control monitoring with automated evidence collection."
      description="ManageKube delivers SOC 2 compliance management for SaaS providers and service organizations pursuing Type I and Type II audit certifications. We continuously monitor your Trust Service Criteria controls, automate evidence collection across all five TSC categories, and manage the audit coordination process — so your team can stay focused on product and service delivery while we handle the compliance operations."
      features={[
        "Trust Service Criteria monitoring — Security, Availability, Confidentiality, Processing Integrity, and Privacy",
        "Continuous control testing and verification against TSC requirements",
        "Automated evidence collection from your cloud, infrastructure, and application environments",
        "SOC 2 Type I and Type II readiness assessment and gap analysis",
        "Audit trail management, log collection, and integrity verification",
        "Change management tracking and documentation for the audit period",
        "Incident response documentation and exception tracking",
        "Third-party service provider monitoring and sub-processor documentation",
        "User access review automation and periodic recertification workflows",
        "Risk assessment and risk management program documentation",
        "Vendor management program documentation",
        "Penetration testing coordination and evidence documentation",
        "Security awareness training documentation and verification",
        "System description and boundary documentation maintenance",
        "Auditor coordination and evidence room management",
      ]}
      managedServices={[
        {
          title: "SOC 2 Readiness Program",
          items: [
            "Trust Service Criteria scoping — which TSCs apply to your service commitments",
            "Control mapping against your environment and existing toolset",
            "Gap identification with effort and cost estimates for remediation",
            "Audit period planning — observation window selection and evidence collection calendar",
            "Auditor selection guidance and kickoff coordination",
          ],
        },
        {
          title: "Continuous SOC 2 Management",
          items: [
            "Continuous monitoring of all in-scope TSC controls",
            "Automated evidence collection — reducing manual audit burden",
            "Exception management — identifying and resolving control failures before they become audit findings",
            "Type II audit support — evidence delivery, auditor Q&A, and management response drafting",
            "Post-audit remediation management and Type II renewal preparation",
          ],
        },
      ]}
      similar={[
        { label: "ISO 27001", href: "/compliance/iso-27001" },
        { label: "HIPAA", href: "/compliance/hipaa" },
        { label: "PCI-DSS", href: "/compliance/pci-dss" },
      ]}
    />
  );
}
