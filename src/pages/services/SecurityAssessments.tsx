import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SecurityAssessments() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Security Assessments"
    tagline="Holistic security posture evaluation with risk prioritization and actionable remediation roadmaps."
    description="Security Assessments provide a comprehensive evaluation of your security posture across infrastructure, applications, policies, and processes. Our certified assessors identify vulnerabilities, configuration weaknesses, compliance gaps, and policy deficiencies — delivering a prioritized remediation roadmap that maps risk to business impact."
    sections={[
      {
        title: "Infrastructure Assessment",
        items: [
          "Network architecture and segmentation review",
          "Server and endpoint hardening evaluation",
          "Firewall and security appliance rule analysis",
          "Wireless network security assessment",
          "Cloud infrastructure security posture review",
        ],
      },
      {
        title: "Application & Data Security",
        items: [
          "Web application vulnerability scanning",
          "API security evaluation and testing",
          "Data classification and protection analysis",
          "Database security configuration review",
          "Encryption implementation assessment (at rest, in transit)",
        ],
      },
      {
        title: "Policy & Process Review",
        items: [
          "Security policy completeness and alignment evaluation",
          "Access control and privilege management review",
          "Incident response plan assessment and tabletop exercises",
          "Security awareness program effectiveness analysis",
          "Business continuity and disaster recovery plan review",
        ],
      },
      {
        title: "Deliverables & Roadmap",
        items: [
          "Risk-prioritized findings report with CVSS and business-impact scoring",
          "90-day, 180-day, and 12-month remediation roadmaps",
          "Executive summary presentation for leadership and board",
          "Technical appendix with evidence and reproduction steps",
          "Follow-up validation assessment (included at 90 days)",
        ],
      },
    ]}
    similar={[
      { label: "Penetration Testing", href: "/services/penetration-testing" },
      { label: "IT Infrastructure Audits", href: "/services/infrastructure-audits" },
      { label: "Vulnerability Detection & Response", href: "/service-layer/vdr" },
    ]}
  />;
}
