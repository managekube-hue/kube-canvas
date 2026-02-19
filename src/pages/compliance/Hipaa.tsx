import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Hipaa() {
  return (
    <ComplianceDetailPage
      framework="HIPAA"
      fullName="Health Insurance Portability and Accountability Act"
      audience="Healthcare Providers, Payers & Business Associates"
      tagline="HIPAA compliance management for healthcare organizations — Security Rule, Privacy Rule, and Breach Notification Rule."
      description="ManageKube delivers managed HIPAA compliance for healthcare providers, payers, and their business associates. We protect electronic protected health information (ePHI) through continuous monitoring, automated breach detection, and BAA lifecycle management — giving your organization the audit-ready compliance posture required by OCR and your covered entity partners."
      features={[
        "ePHI discovery, classification, and inventory management",
        "Access control monitoring and minimum necessary enforcement",
        "Encryption verification across all ePHI transmission and storage",
        "Automated breach detection and notification workflow management",
        "Business Associate Agreement (BAA) tracking and renewal management",
        "Risk assessment automation — annual and triggered assessments",
        "Audit log monitoring and review — HIPAA Security Rule §164.312(b)",
        "HIPAA Security Rule compliance — Administrative, Physical, and Technical Safeguards",
        "HIPAA Privacy Rule compliance monitoring and policy management",
        "Workforce training documentation and verification tracking",
        "Contingency planning and disaster recovery documentation",
        "Device and media controls monitoring and documentation",
        "Third-party service provider compliance verification",
        "Sanction policy documentation and enforcement tracking",
        "OCR audit readiness reporting and evidence packages",
      ]}
      managedServices={[
        {
          title: "HIPAA Risk Assessment",
          items: [
            "Covered entity and business associate scope definition",
            "ePHI flow mapping across all systems and vendors",
            "Threat and vulnerability identification across the administrative, physical, and technical safeguard categories",
            "Risk analysis and risk management plan development",
            "Corrective action plan (CAP) development and implementation tracking",
          ],
        },
        {
          title: "Continuous HIPAA Compliance Management",
          items: [
            "Ongoing ePHI protection monitoring across all systems",
            "Automated Security Rule control verification",
            "BAA lifecycle management — tracking, renewal alerts, and documentation",
            "Annual HIPAA Risk Assessment delivery with updated threat landscape",
            "Breach incident response support and OCR notification coordination",
            "Audit-ready evidence packages delivered on your schedule",
          ],
        },
      ]}
      similar={[
        { label: "SOC 2", href: "/compliance/soc2" },
        { label: "ISO 27001", href: "/compliance/iso-27001" },
        { label: "NIST CSF", href: "/compliance/nist-csf" },
      ]}
    />
  );
}
