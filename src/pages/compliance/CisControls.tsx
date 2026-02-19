import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function CisControls() {
  return (
    <ComplianceDetailPage
      framework="CIS Controls v8.1"
      fullName="Center for Internet Security Critical Security Controls"
      audience="All Organizations Seeking Prioritized, Actionable Security Controls"
      tagline="CIS Controls v8.1 implementation — 18 Controls, 153 Safeguards, three Implementation Groups."
      description="ManageKube delivers managed CIS Controls v8.1 implementation for organizations seeking a prioritized, prescriptive security control framework. We assess your environment against all 18 Controls and 153 Safeguards, assign your Implementation Group (IG1, IG2, or IG3), and deliver the control implementation and continuous monitoring program that closes your most critical security gaps first."
      features={[
        "CIS Controls v8.1 — all 18 Controls and 153 Safeguards",
        "Implementation Group assessment — IG1, IG2, and IG3 scoping",
        "Inventory and control of enterprise assets — CIS Control 1",
        "Inventory and control of software assets — CIS Control 2",
        "Data protection program implementation — CIS Control 3",
        "Secure configuration of enterprise assets and software — CIS Control 4",
        "Account management and access control — CIS Controls 5 and 6",
        "Continuous vulnerability management — CIS Control 7",
        "Audit log management and review — CIS Control 8",
        "Email and web browser protections — CIS Control 9",
        "Malware defense and data recovery capabilities — CIS Controls 10 and 11",
        "Network infrastructure management and monitoring — CIS Controls 12 and 13",
        "Security awareness and skills training program — CIS Control 14",
        "Service provider management program — CIS Control 15",
        "Application software security program — CIS Control 16",
        "Incident response management program — CIS Control 17",
        "Penetration testing program — CIS Control 18",
      ]}
      managedServices={[
        {
          title: "CIS Controls Assessment",
          items: [
            "Implementation Group determination based on organizational risk profile",
            "Safeguard-by-safeguard gap assessment across all applicable Controls",
            "Prioritized remediation roadmap — highest-impact gaps first",
            "CIS Controls maturity scoring and benchmarking",
            "Board and executive reporting package",
          ],
        },
        {
          title: "Continuous CIS Controls Management",
          items: [
            "Ongoing monitoring across all implemented Safeguards",
            "Monthly control verification and gap tracking",
            "Implementation Group progression management",
            "Annual CIS Controls assessment and maturity scoring",
            "Mapping CIS Controls to other frameworks — NIST CSF, ISO 27001, SOC 2",
          ],
        },
      ]}
      similar={[
        { label: "NIST CSF", href: "/compliance/nist-csf" },
        { label: "ISO 27001", href: "/compliance/iso-27001" },
        { label: "SOC 2", href: "/compliance/soc2" },
      ]}
    />
  );
}
