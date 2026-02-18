import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function SdrKube() {
  return <KubeDetailPage
    code="SDR KUBE"
    name="Software Supply Risks Surfaced Early"
    tagline="SBOM analysis and dependency tracking for supply chain risk management."
    category="Security Detection & Response"
    description="SDR KUBE protects against software supply chain attacks by analyzing software bill of materials (SBOM), tracking dependencies, and identifying vulnerable or malicious components."
    fullDescription="The software supply chain is the new attack surface. SDR KUBE continuously monitors every library, container image, and third-party component for known vulnerabilities and license risks. Dependency-Track provides real-time SBOM analysis with automated alerts on newly disclosed CVEs affecting your stack."
    capabilities={[
      { title: "Supply Chain Protection", items: ["SBOM generation and analysis", "Dependency tracking and monitoring", "Vulnerability scanning", "Dependency-Track risk scoring"] },
      { title: "Component Analysis", items: ["Container image analysis", "License compliance", "Vulnerability disclosure monitoring", "Automated software composition analysis"] },
      { title: "Integration", items: ["CI/CD pipeline integration", "Git repository scanning", "Registry monitoring", "Developer workflow embedding"] },
    ]}
    similar={[
      { label: "CDR KUBE", href: "/kubes/cdr-kube" },
      { label: "VDR KUBE", href: "/kubes/vdr-kube" },
      { label: "Penetration Testing", href: "/services/penetration-testing" },
    ]}
  />;
}
