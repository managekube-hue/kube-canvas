import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Iso27001() {
  return (
    <ComplianceDetailPage
      framework="ISO 27001"
      fullName="International Information Security Management System Standard"
      audience="Global Organizations Seeking ISMS Certification"
      tagline="ISO 27001:2022 ISMS implementation and certification readiness — 93 controls across 4 themes."
      description="ManageKube delivers managed ISO 27001 compliance for organizations pursuing international ISMS certification. We implement the full ISO 27001:2022 control framework — 93 controls across four themes — manage the risk treatment process, automate evidence collection, and coordinate the certification audit with your accredited certification body. You get a maintained, audit-ready ISMS without building a full GRC program in-house."
      features={[
        "ISO 27001:2022 — 93 controls across Organizational, People, Physical, and Technological themes",
        "ISMS policy development, approval, and document management",
        "Information security risk assessment and risk treatment plan management",
        "Statement of Applicability (SoA) development and maintenance",
        "Continuous control monitoring across all implemented controls",
        "Evidence collection and archival — audit-ready documentation",
        "Internal audit program delivery — mandatory under ISO 27001 Clause 9.2",
        "Management review documentation and preparation",
        "Corrective action tracking and nonconformity management",
        "Certification body coordination — Stage 1 and Stage 2 audit support",
        "Supplier relationship security controls — documentation and monitoring",
        "Asset management inventory and classification maintenance",
        "Business continuity and disaster recovery documentation",
        "Incident management log and post-incident review documentation",
        "Surveillance audit and recertification preparation",
      ]}
      managedServices={[
        {
          title: "ISMS Implementation",
          items: [
            "Organizational context analysis — understanding interested parties, scope, and boundaries",
            "Risk assessment methodology selection and execution",
            "Control selection and Statement of Applicability documentation",
            "Policy and procedure library development",
            "Staff awareness training program coordination",
          ],
        },
        {
          title: "Certification & Ongoing Management",
          items: [
            "Certification body selection guidance",
            "Stage 1 (document review) and Stage 2 (on-site audit) support and coordination",
            "Nonconformity and observation remediation management",
            "Annual surveillance audit preparation and support",
            "3-year recertification cycle management",
          ],
        },
      ]}
      similar={[
        { label: "SOC 2", href: "/compliance/soc2" },
        { label: "NIST CSF", href: "/compliance/nist-csf" },
        { label: "HIPAA", href: "/compliance/hipaa" },
      ]}
    />
  );
}
