import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function NistCsf() {
  return (
    <ComplianceDetailPage
      framework="NIST CSF"
      fullName="NIST Cybersecurity Framework 2.0"
      audience="All Organizations Seeking Risk-Based Security Program Development"
      tagline="NIST CSF 2.0 implementation — Govern, Identify, Protect, Detect, Respond, and Recover."
      description="ManageKube delivers managed NIST Cybersecurity Framework 2.0 implementation for organizations building or maturing their security programs. We assess your current cybersecurity posture against the six CSF 2.0 Functions, develop your target state profile, build a prioritized roadmap, and deliver the continuous monitoring program required to maintain and improve your security posture over time."
      features={[
        "NIST CSF 2.0 — six Function coverage: Govern, Identify, Protect, Detect, Respond, Recover",
        "Current Profile development — documenting your as-is cybersecurity posture",
        "Target Profile development — defining your desired security outcomes",
        "Gap analysis and prioritized implementation roadmap",
        "Organizational context and risk governance program development",
        "Asset management and risk assessment program implementation",
        "Identity management, authentication, and access control program",
        "Continuous detection capabilities — threat and anomaly detection program",
        "Incident response program development and tabletop exercise coordination",
        "Recovery planning and business continuity program documentation",
        "Supply chain risk management program development",
        "Third-party risk assessment program implementation",
        "Metrics and measurement program — security outcome tracking",
        "Executive reporting and board-level risk communication",
        "CSF implementation tier assessment — from Partial to Adaptive",
      ]}
      managedServices={[
        {
          title: "CSF Assessment & Roadmap",
          items: [
            "Current Profile assessment across all six Functions and 22 Categories",
            "Target Profile definition aligned to your risk tolerance and business requirements",
            "Gap analysis with prioritized implementation roadmap",
            "Implementation tier scoring and improvement recommendations",
            "Board and executive reporting package development",
          ],
        },
        {
          title: "Continuous CSF Program Management",
          items: [
            "Ongoing posture monitoring against Target Profile",
            "Quarterly CSF maturity assessments and progress reporting",
            "Control implementation support across all six Functions",
            "Annual Current Profile refresh and Target Profile review",
            "Regulatory framework mapping — aligning CSF to HIPAA, PCI-DSS, CMMC requirements",
          ],
        },
      ]}
      similar={[
        { label: "ISO 27001", href: "/compliance/iso-27001" },
        { label: "CIS Controls v8.1", href: "/compliance/cis-controls" },
        { label: "NIST 800-53", href: "/compliance/nist-800-53" },
      ]}
    />
  );
}
