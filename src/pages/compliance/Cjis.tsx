import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Cjis() {
  return (
    <ComplianceDetailPage
      framework="CJIS"
      fullName="Criminal Justice Information Services Security Policy"
      audience="Law Enforcement Agencies, Government Entities & Service Providers"
      tagline="CJIS Security Policy compliance management — protecting Criminal Justice Information for law enforcement."
      description="ManageKube delivers managed CJIS compliance for law enforcement agencies, government entities, and service providers that access, store, or transmit Criminal Justice Information (CJI). We implement the FBI CJIS Security Policy controls across all 13 policy areas, manage advanced authentication requirements, monitor CJI access, and deliver the audit-ready documentation required for state CJIS Systems Officer (CSO) compliance reviews."
      features={[
        "CJIS Security Policy compliance across all 13 policy areas",
        "Advanced Authentication (AA) implementation — FBI-mandated MFA requirements",
        "CJI data classification, protection, and access monitoring",
        "Audit and accountability logging — comprehensive CJI access audit trails",
        "Personnel security — background check verification tracking and management",
        "Physical security controls documentation and monitoring integration",
        "Incident response for CJI security incidents — state and FBI notification procedures",
        "Mobile device management for CJI-accessing devices",
        "Encryption verification — CJI transmission and storage protection",
        "Access control enforcement — need-to-know and least-privilege for CJI systems",
        "Information exchange agreements (IEA) documentation and tracking",
        "Network security monitoring for CJI systems",
        "Configuration management for CJI-connected systems",
        "Security awareness training documentation for CJI personnel",
        "State CJIS Systems Officer (CSO) compliance coordination support",
      ]}
      managedServices={[
        {
          title: "CJIS Assessment & Gap Analysis",
          items: [
            "CJI system and network scoping and boundary definition",
            "Policy area-by-policy area control gap assessment",
            "Advanced Authentication requirements review and implementation planning",
            "Personnel security documentation review and gap identification",
            "CSO compliance review preparation and documentation",
          ],
        },
        {
          title: "Ongoing CJIS Compliance Management",
          items: [
            "Continuous monitoring of CJI access controls and audit logs",
            "Periodic compliance verification across all 13 CJIS policy areas",
            "Personnel security record management and background check tracking",
            "Annual CJIS compliance assessment and remediation management",
            "CSO audit support and documentation delivery",
          ],
        },
      ]}
      similar={[
        { label: "CMMC", href: "/compliance/cmmc" },
        { label: "NIST 800-53", href: "/compliance/nist-800-53" },
        { label: "NIST 800-171", href: "/compliance/nist-800-171" },
      ]}
    />
  );
}
