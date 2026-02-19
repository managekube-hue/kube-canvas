import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function PciDss() {
  return (
    <ComplianceDetailPage
      framework="PCI-DSS"
      fullName="Payment Card Industry Data Security Standard"
      audience="Merchants, Payment Processors & Retail Organizations"
      tagline="PCI-DSS compliance management — all 12 requirements, continuous cardholder data environment monitoring."
      description="ManageKube delivers managed PCI-DSS compliance for merchants, payment processors, and retail organizations protecting cardholder data. We monitor your cardholder data environment (CDE) continuously, verify network segmentation, automate vulnerability scanning, and manage the evidence collection process required for QSA assessments — across all 12 PCI-DSS v4.0 requirements."
      features={[
        "Cardholder data environment (CDE) scoping, discovery, and continuous monitoring",
        "Network segmentation verification — segmentation testing and documentation",
        "All 12 PCI-DSS v4.0 requirements coverage and control mapping",
        "Automated vulnerability scanning — quarterly ASV scanning coordination",
        "Log management, monitoring, and 12-month retention verification",
        "File integrity monitoring (FIM) across all CDE systems",
        "Access control enforcement and privileged access monitoring",
        "Encryption verification — TLS, key management, and cardholder data protection",
        "QSA assessment coordination and evidence room management",
        "Penetration testing coordination — annual and segmentation testing",
        "Security awareness training documentation for card-handling personnel",
        "Third-party service provider (TPSP) compliance monitoring and documentation",
        "Patch management verification and change management documentation",
        "Incident response plan maintenance and card-brand notification procedures",
        "SAQ and ROC documentation support",
      ]}
      managedServices={[
        {
          title: "CDE Scoping & Assessment",
          items: [
            "Cardholder data flow mapping and CDE boundary definition",
            "Network segmentation assessment and documentation",
            "Requirement-by-requirement gap analysis across PCI-DSS v4.0",
            "Compensating control identification and documentation",
            "QSA pre-assessment readiness review",
          ],
        },
        {
          title: "Continuous PCI-DSS Management",
          items: [
            "Real-time CDE monitoring and alerting",
            "Quarterly ASV vulnerability scan coordination and remediation tracking",
            "Annual penetration testing coordination and evidence documentation",
            "Evidence collection and audit package delivery for QSA assessments",
            "Post-assessment finding remediation management",
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
