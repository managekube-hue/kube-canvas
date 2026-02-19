import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Nist800171() {
  return (
    <ComplianceDetailPage
      framework="NIST 800-171"
      fullName="Protecting Controlled Unclassified Information in Nonfederal Systems"
      audience="Federal Contractors & Defense Industrial Base"
      tagline="NIST SP 800-171 compliance management — 110 security requirements protecting CUI."
      description="ManageKube delivers managed NIST SP 800-171 compliance for federal contractors protecting Controlled Unclassified Information (CUI). We verify all 110 security requirements across 14 control families, manage your System Security Plan (SSP), track your SPRS score, and maintain the POA&M — keeping your organization compliant with DFARS clause 252.204-7012 and ready for CMMC Level 2 certification."
      features={[
        "All 110 NIST SP 800-171 Rev 2 security requirement verification",
        "14 control family coverage — from Access Control through System and Information Integrity",
        "CUI identification, classification, and protection monitoring",
        "System Security Plan (SSP) development and maintenance",
        "SPRS (Supplier Performance Risk System) score management and documentation",
        "POA&M development, tracking, and remediation closure verification",
        "Access control enforcement — CUI system and network access management",
        "System and communications protection — CUI transmission monitoring",
        "Continuous monitoring — automated control verification",
        "DFARS clause 252.204-7012 compliance documentation",
        "Incident response — CUI reportable incident handling and DoD notification procedures",
        "Configuration management — baseline development and change control",
        "Media protection — CUI storage, transport, and sanitization controls",
        "Personnel security — background check documentation and access management",
        "CMMC Level 2 alignment assessment and readiness reporting",
      ]}
      managedServices={[
        {
          title: "Assessment & SSP Development",
          items: [
            "CUI scoping and system boundary definition",
            "Requirement-by-requirement control assessment",
            "SSP development with implementation descriptions",
            "SPRS score calculation and submission support",
            "POA&M development with realistic remediation timelines",
          ],
        },
        {
          title: "Ongoing Compliance Management",
          items: [
            "Monthly control verification across all 110 requirements",
            "Automated evidence collection and documentation",
            "POA&M remediation tracking and closure verification",
            "Annual SSP review and update",
            "CMMC Level 2 assessment readiness package delivery",
          ],
        },
      ]}
      similar={[
        { label: "CMMC", href: "/compliance/cmmc" },
        { label: "NIST 800-53", href: "/compliance/nist-800-53" },
        { label: "CJIS", href: "/compliance/cjis" },
      ]}
    />
  );
}
