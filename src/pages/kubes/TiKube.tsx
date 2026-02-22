/** DO NOT TOUCH: v2.0 spec copy: TI merged into VDR/STRIKE per v2.0 spec */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function TiKube() {
  return <ServiceLayerPage
    category="Intelligence & Risk"
    name="Threat Intelligence"
    headline="Know Your Adversary. Before They Move Against You."
    narrative={[
      "Threat intelligence exists in abundance. IOC feeds, threat actor profiles, dark web monitoring, vulnerability disclosures the volume of raw intelligence available to security teams has never been higher. The problem is not access to information. The problem is the gap between generic threat data and actionable knowledge about the specific threats targeting your organization, your industry, and your infrastructure.",
      "Threat Intelligence aggregates, analyzes, and operationalizes threat intelligence from global feeds, industry sources, and internal telemetry. MISP provides threat actor tracking, IOC correlation, and campaign attribution. EPSS scoring ensures your team focuses on vulnerabilities with the highest real-world exploitation probability, not just the highest CVSS scores.",
    ]}
    capabilities={[
      "MISP threat sharing platform for IOC correlation and enrichment",
      "EPSS vulnerability scoring ranking by real-world exploitation likelihood",
      "Threat actor tracking with campaign attribution",
      "STIX/TAXII feed ingestion for standardized intelligence sharing",
      "Dark web monitoring for credential exposure and targeting signals",
      "Industry-specific threat reports and strategic intelligence",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous dark web monitoring, threat actor tracking, and active campaign intelligence collection." },
      { stage: "Identify", desc: "IOC validation and environmental relevance mapping." },
      { stage: "Alert", desc: "Curated notification of high-relevance threat intelligence." },
      { stage: "Triage", desc: "Analyst review of intelligence applicability and detection coverage gap identification." },
    ]}
    similar={[
      { label: "Vulnerability Detection & Prioritization", href: "/service-layer/vdr" },
      { label: "STRIKE Strategic Intelligence", href: "/service-layer/strike" },
      { label: "Governance, Risk & Compliance", href: "/service-layer/grc" },
    ]}
  />;
}
