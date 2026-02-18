import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function Xme() {
  return <ServiceDetailPage
    category="Enterprise Platform"
    name="XME — Enterprise Platform"
    tagline="Complete enterprise security and operations with all 15 Kubes and premium capabilities."
    description="XME delivers the complete security and operations platform for enterprises. All 15 Kubes provide comprehensive coverage across infrastructure, applications, cloud, supply chain, data, and threat intelligence."
    sections={[
      { title: "All 15 Kubes Included", items: ["All 12 XMM Kubes", "SDR KUBE — Software Supply Chain Detection & Response", "DDR KUBE — Data Detection & Response (Data Loss Prevention)", "TI KUBE — Threat Intelligence"] },
      { title: "Enterprise Capabilities", items: ["Supply chain cyber risk (SCDR) — included", "STRIKE strategic intelligence — included", "Attack surface intelligence — included", "Intelligence feeds (STIX/TAXII) — included", "MIR incident response — included", "Honeypots — included", "Software supply chain protection", "Data loss prevention"] },
    ]}
  />;
}
