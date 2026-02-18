import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function PenetrationTesting() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Penetration Testing"
    tagline="Manual penetration testing with network, application, and social engineering assessments."
    description="Penetration Testing simulates real-world attacks to identify exploitable vulnerabilities before threat actors do. Expert ethical hackers perform manual testing across networks, web applications, APIs, mobile apps, and cloud infrastructure."
    sections={[
      { title: "Testing Types", items: ["External network penetration testing", "Internal network penetration testing", "Web application penetration testing", "API security testing", "Mobile application testing", "Cloud infrastructure testing"] },
      { title: "Advanced Testing", items: ["Social engineering (phishing, vishing)", "Physical security testing", "Wireless network testing", "Red team exercises", "Purple team engagements"] },
    ]}
    similar={[
      { label: "Security Assessments", href: "/services/security-assessments" },
      { label: "VDR KUBE", href: "/kubes/vdr-kube" },
      { label: "Compliance Gap Analysis", href: "/services/compliance-gap-analysis" },
    ]}
  />;
}
