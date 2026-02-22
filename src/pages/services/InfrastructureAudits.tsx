import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function InfrastructureAudits() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="IT Infrastructure Audits"
    tagline="Architecture, performance, security, and operational efficiency review across your entire environment."
    description="IT Infrastructure Audits assess your network architecture, server configurations, storage systems, virtualization platforms, and cloud infrastructure for security, performance, and operational efficiency. We identify technical debt, single points of failure, capacity constraints, and optimization opportunities — delivering a clear modernization roadmap."
    sections={[
      {
        title: "Network & Architecture Review",
        items: [
          "Network topology mapping and architecture documentation",
          "Switching, routing, and firewall configuration analysis",
          "Network segmentation and VLAN design evaluation",
          "SD-WAN and WAN optimization assessment",
          "DNS, DHCP, and IP address management review",
        ],
      },
      {
        title: "Compute & Virtualization",
        items: [
          "Server hardware health and lifecycle status assessment",
          "Hypervisor configuration review (VMware, Hyper-V, Proxmox)",
          "Virtual machine sprawl analysis and right-sizing opportunities",
          "Cluster performance and failover testing",
          "Container and Kubernetes infrastructure evaluation",
        ],
      },
      {
        title: "Storage & Data Protection",
        items: [
          "Storage utilization analysis and growth projections",
          "Backup job success rates and retention policy review",
          "Disaster recovery testing and RTO/RPO validation",
          "Data replication and high availability assessment",
          "Storage tiering and performance optimization opportunities",
        ],
      },
      {
        title: "Findings & Modernization Roadmap",
        items: [
          "Risk-prioritized findings report with severity classifications",
          "Technical debt inventory with remediation cost estimates",
          "Infrastructure refresh and modernization recommendations",
          "Capacity planning projections for 12–36 month horizons",
          "Executive findings presentation with strategic recommendations",
        ],
      },
    ]}
    similar={[
      { label: "Right-Sizing Engagements", href: "/services/right-sizing" },
      { label: "Security Assessments", href: "/services/security-assessments" },
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
    ]}
  />;
}
