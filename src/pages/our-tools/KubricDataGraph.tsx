import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function KubricDataGraph() {
  return <ServiceDetailPage
    category="Platform Component"
    name="Kubric Data Graph"
    tagline="Real-time relationship mapping across your entire IT ecosystem."
    description="The Kubric Data Graph creates a living map of your entire IT ecosystem, connecting devices, users, applications, and security events. This contextual intelligence enables faster threat detection, automated response, and proactive risk mitigation."
    sections={[
      { title: "Key Capabilities", items: ["Real-time asset relationship mapping", "Identity and access correlation", "Security event contextualization", "Business impact analysis"] },
      { title: "Intelligence", items: ["Attack path visualization", "Dependency tracking", "Behavioral baseline establishment", "Automated context enrichment"] },
    ]}
  />;
}
