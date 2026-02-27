import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function PenetrationTesting() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Penetration Testing"
    tagline="Manual adversarial testing across network, application, cloud, and social engineering vectors."
    description="Penetration Testing simulates real-world attacks to identify exploitable vulnerabilities before threat actors do. Our certified ethical hackers (OSCP, OSCE, GPEN) perform manual testing across networks, web applications, APIs, mobile apps, and cloud infrastructure, going far beyond automated scanning to find the vulnerabilities that matter."
    sections={[
      {
        title: "Network Penetration Testing",
        items: [
          "External network penetration testing from internet-facing perimeter",
          "Internal network penetration testing simulating insider threats",
          "Wireless network security testing (WPA2/3, rogue AP detection)",
          "Network segmentation validation and lateral movement assessment",
          "VPN and remote access infrastructure testing",
        ],
      },
      {
        title: "Application Security Testing",
        items: [
          "Web application penetration testing (OWASP Top 10)",
          "API security testing (REST, GraphQL, SOAP)",
          "Mobile application testing (iOS and Android)",
          "Single sign-on (SSO) and authentication bypass testing",
          "Business logic and authorization flaw testing",
        ],
      },
      {
        title: "Advanced Adversarial Testing",
        items: [
          "Social engineering campaigns (phishing, vishing, pretexting)",
          "Physical security testing and facility breach simulation",
          "Red team exercises with full-scope adversary emulation",
          "Purple team engagements with collaborative defense improvement",
          "Cloud infrastructure penetration testing (AWS, Azure, GCP)",
        ],
      },
      {
        title: "Reporting & Remediation",
        items: [
          "Detailed technical findings with proof-of-concept exploits",
          "Risk-rated vulnerability prioritization with CVSS scoring",
          "Remediation guidance and hardening recommendations",
          "Executive summary with attack narrative for leadership",
          "Post-remediation retest validation (included)",
        ],
      },
    ]}
    similar={[
      { label: "Security Assessments", href: "/services/security-assessments" },
      { label: "Vulnerability Detection & Response", href: "/service-layer/vdr" },
      { label: "Compliance Gap Analysis", href: "/services/compliance-gap-analysis" },
    ]}
  />;
}
