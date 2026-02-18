import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function LegacyIntegrations() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Legacy System Integrations"
    tagline="Bridging aging infrastructure with modern security and operations platforms."
    description="Legacy System Integrations bridge the gap between aging infrastructure and modern security and operations platforms. Reverse engineering legacy protocols, developing custom integrations for unsupported systems, data migration, and phased modernization planning."
    sections={[
      { title: "Legacy Integration Services", items: ["Legacy protocol analysis", "Custom adapter development", "Data extraction and migration", "API gateway implementation"] },
      { title: "Modernization", items: ["Middleware and ESB solutions", "Phased modernization planning", "Risk mitigation and contingency planning", "Documentation and knowledge transfer"] },
    ]}
  />;
}
