import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function TiKube() {
  return <KubeDetailPage
    code="TI"
    name="Threat Intelligence That Informs Action"
    tagline="MISP integration with EPSS scoring for predictive threat intelligence and proactive defense."
    category="Intelligence & Governance"
    description="TI KUBE aggregates, analyzes, and operationalizes threat intelligence from global feeds, industry sources, and internal telemetry. MISP provides threat actor tracking, IOC correlation, and campaign attribution."
    fullDescription="Knowing what attackers are doing before they target you changes the game. TI KUBE integrates MISP for comprehensive threat actor tracking and IOC correlation, while EPSS scoring ensures your team focuses on vulnerabilities with the highest real-world exploitation probability — not just the highest CVSS scores."
    capabilities={[
      { title: "Threat Intelligence", items: ["MISP threat sharing platform", "Threat analysis", "EPSS vulnerability scoring", "IOC correlation and enrichment"] },
      { title: "Intelligence Operations", items: ["Threat actor tracking", "Campaign attribution", "Automated IOC blocking", "Intelligence feed integration"] },
      { title: "Strategic Intelligence", items: ["Tactical and strategic intelligence", "STIX/TAXII feed ingestion", "Dark web monitoring", "Industry-specific threat reports"] },
    ]}
    similar={[
      { label: "VDR", href: "/service-layer/vdr" },
      { label: "GRC", href: "/service-layer/grc" },
    ]}
  />;
}
