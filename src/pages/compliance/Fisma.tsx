import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function Fisma() {
  return (
    <ComplianceDetailPage
      framework="FISMA"
      fullName="Federal Information Security Modernization Act"
      audience="Federal Agencies & Government Contractors"
      tagline="FISMA compliance management — annual assessments, continuous monitoring, and ATO maintenance."
      description="ManageKube delivers managed FISMA compliance for federal agencies and government contractors required to protect federal information systems. We implement the FISMA compliance lifecycle — risk categorization, control selection, security assessment, authorization, and continuous monitoring — aligned to NIST SP 800-37 Rev 2 (Risk Management Framework) and NIST SP 800-53 Rev 5 security controls."
      features={[
        "FISMA compliance aligned to NIST Risk Management Framework (RMF) — SP 800-37 Rev 2",
        "System categorization — FIPS 199 and NIST SP 800-60 impact level determination",
        "Security control selection from NIST SP 800-53 Rev 5 baselines",
        "System Security Plan (SSP) development and ongoing maintenance",
        "Security Assessment Report (SAR) development and management",
        "Plan of Action and Milestones (POA&M) tracking and remediation management",
        "Authorization to Operate (ATO) package development and submission",
        "Ongoing Authorization (OA) program development and execution",
        "Continuous monitoring strategy aligned to NIST SP 800-137",
        "FISMA annual reporting support — OMB and DHS reporting requirements",
        "Inspector General (IG) assessment preparation and support",
        "Penetration testing coordination and documentation",
        "Incident response program — US-CERT reporting compliance",
        "Privacy impact assessment (PIA) and System of Records Notice (SORN) support",
        "Interconnection security agreements (ISA) documentation and management",
      ]}
      managedServices={[
        {
          title: "ATO Package Development",
          items: [
            "System boundary definition and scoping",
            "FIPS 199 system categorization documentation",
            "Control selection, tailoring, and implementation documentation",
            "Security assessment planning and execution",
            "ATO package compilation and Authorizing Official (AO) submission support",
          ],
        },
        {
          title: "Continuous Monitoring Program",
          items: [
            "Ongoing control monitoring aligned to NIST SP 800-137",
            "Monthly vulnerability scanning and reporting",
            "Annual security assessment and ATO renewal support",
            "POA&M remediation tracking and closure documentation",
            "FISMA annual reporting data collection and compilation",
          ],
        },
      ]}
      similar={[
        { label: "NIST 800-53", href: "/compliance/nist-800-53" },
        { label: "FedRAMP", href: "/compliance/fedramp" },
        { label: "CMMC", href: "/compliance/cmmc" },
      ]}
    />
  );
}
