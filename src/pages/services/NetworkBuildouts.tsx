import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function NetworkBuildouts() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Network Infrastructure Buildouts"
    tagline="Enterprise network design, deployment, and migration for wired, wireless, and SD-WAN infrastructure."
    description="Network Infrastructure Buildouts deliver enterprise network design and deployment for new facilities, office expansions, and technology refreshes. Structured cabling, switching and routing, wireless infrastructure, SD-WAN implementation, and security appliance deployment."
    sections={[
      { title: "Network Buildout Services", items: ["Network architecture design", "Structured cabling installation", "Switch and router deployment", "Wireless network design and installation", "SD-WAN implementation"] },
      { title: "Security & Documentation", items: ["Firewall and security appliance deployment", "Network segmentation and VLANs", "Quality of Service (QoS) configuration", "Testing, validation, and documentation"] },
    ]}
  />;
}
