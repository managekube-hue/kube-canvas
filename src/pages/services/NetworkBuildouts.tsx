import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function NetworkBuildouts() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Network Infrastructure Buildouts"
    tagline="Enterprise network design, deployment, and migration for wired, wireless, and SD-WAN infrastructure."
    description="Network Infrastructure Buildouts deliver enterprise network design and deployment for new facilities, office expansions, and technology refreshes. Structured cabling, switching and routing, wireless infrastructure, SD-WAN implementation, and security appliance deployment — engineered, deployed, and documented by certified network professionals."
    sections={[
      {
        title: "Network Design & Architecture",
        items: [
          "Network architecture design with redundancy and failover",
          "IP addressing, VLAN design, and segmentation planning",
          "Bandwidth and capacity planning for current and projected needs",
          "Wireless RF survey and heat mapping for optimal AP placement",
          "SD-WAN architecture design and circuit selection",
        ],
      },
      {
        title: "Deployment & Installation",
        items: [
          "Structured cabling installation (Cat6a, fiber, trunking)",
          "Switch, router, and firewall rack-and-stack deployment",
          "Wireless access point installation and controller configuration",
          "SD-WAN appliance deployment and circuit cutover",
          "Quality of Service (QoS) and traffic shaping configuration",
        ],
      },
      {
        title: "Security Integration",
        items: [
          "Next-generation firewall deployment and policy configuration",
          "Network access control (NAC) implementation",
          "Intrusion prevention system (IPS) deployment and tuning",
          "Micro-segmentation for zero-trust network architecture",
          "VPN and remote access infrastructure deployment",
        ],
      },
      {
        title: "Testing & Documentation",
        items: [
          "End-to-end connectivity testing and performance validation",
          "Cable certification testing with documentation",
          "As-built documentation with rack diagrams and topology maps",
          "Configuration backup and change management procedures",
          "Knowledge transfer and operations handoff to your team",
        ],
      },
    ]}
    similar={[
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
      { label: "Network Performance Monitoring", href: "/service-layer/npm" },
      { label: "Physical Security Integration", href: "/services/physical-security" },
    ]}
  />;
}
