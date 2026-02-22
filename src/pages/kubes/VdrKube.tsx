import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function VdrKube() {
  return <KubeDetailPage
    code="VDR"
    name="Vulnerabilities Prioritized by Real Risk"
    tagline="Vulnerability management with EPSS-based risk scoring for intelligent patch prioritization."
    category="Intelligence & Governance"
    description="VDR KUBE modernizes vulnerability management by combining traditional scanning with AI-powered risk prioritization. Identify vulnerabilities across infrastructure, applications, and containers."
    fullDescription="Most organizations have thousands of vulnerabilities. VDR KUBE uses EPSS scoring and Data Graph context to identify the handful that pose real risk — prioritizing remediation based on real-world exploitability and business impact, not just CVSS scores. The result is faster patching where it matters most."
    capabilities={[
      { title: "Vulnerability Management", items: ["Trivy container and OS scanning", "Greenbone (OpenVAS) network scanning", "EPSS-based risk prioritization", "CVSS score correlation"] },
      { title: "Prioritization", items: ["Asset criticality weighting", "Patch prioritization workflows", "Vulnerability trending and analytics", "Remediation tracking and SLAs"] },
      { title: "Integration", items: ["Integration with ticketing systems", "Data Graph context enrichment", "CI/CD pipeline scanning", "Compliance framework alignment"] },
    ]}
    similar={[
      { label: "TI", href: "/service-layer/ti" },
      { label: "GRC", href: "/service-layer/grc" },
    ]}
  />;
}
