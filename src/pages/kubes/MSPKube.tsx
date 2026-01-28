import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSPKube = () => {
  return (
    <KubePageTemplate
      name="MSP Kube"
      tagline="NOC & Service Desk"
      phase="MANAGE"
      description="Fully managed or co-managed infrastructure and operations stack. End-user productivity, hybrid infrastructure, and business continuity from a dedicated Network Operations Center."
      narrative="I&O Managed Services delivers a fully managed or co-managed infrastructure and operations stack, covering end-user productivity, hybrid infrastructure, and business continuity. It is operated from a dedicated Network Operations Center (NOC) and extends into managed cloud services for public, private, and hybrid environments. This Kube is designed for clients seeking ongoing operational support and day-to-day service delivery—your IT operations, systematized."
      blocks={[
        {
          id: "managed-workplace",
          name: "Managed Workplace & Productivity",
          description: "End-user and collaboration services to keep your workforce productive and secure.",
          details: "Unified Communications as a Service (UCaaS) provides telephony, VoIP, and collaboration through Teams and RingCentral. Contact Center as a Service (CCaaS) delivers cloud contact center platforms. SaaS Operations optimizes Microsoft 365 through license management, policy governance, and tenant hygiene. Unified Endpoint Management encompasses MDM, endpoint configuration, asset tracking, and compliance.",
          useCases: [
            "Microsoft 365 administration and optimization",
            "Unified communications deployment",
            "Endpoint device management across hybrid workforce",
            "Contact center modernization",
          ],
          products: ["Microsoft Teams", "RingCentral", "Webex", "Genesys", "NICE", "Microsoft 365", "Intune"],
        },
        {
          id: "hybrid-infrastructure",
          name: "Hybrid Infrastructure Management",
          description: "Design, operation, and lifecycle management of on-premises, cloud, and edge infrastructure.",
          details: "Managed IaaS and PaaS covers deployment and operations of Azure, AWS, GCP, private cloud, and virtual data centers. Infrastructure Lifecycle Management addresses procurement, staging, deployment, warranty, repair, and refresh planning. Network and Edge Operations includes switches, firewalls, Wi-Fi, SD-WAN, and edge device support.",
          useCases: [
            "Multi-cloud environment management",
            "Legacy infrastructure alongside cloud",
            "Infrastructure optimization and refresh",
            "Network administration and SD-WAN",
          ],
          products: ["Azure", "AWS", "GCP", "Cisco Meraki", "PowerSwitch", "VxRail"],
        },
        {
          id: "bcdr",
          name: "Business Continuity & Data Resilience",
          description: "Protection of critical data and rapid recovery of services to meet RTO and RPO targets.",
          details: "Disaster Recovery as a Service (DRaaS) offers backup, replication, and failover for key workloads across on-premises and cloud environments, along with business continuity planning and runbook execution. Backup and Recovery Services encompasses policy design, backup monitoring, testing, and restore support across endpoints, servers, and SaaS platforms.",
          useCases: [
            "Ransomware recovery planning",
            "Compliance backup requirements",
            "DR testing and validation",
            "SaaS data protection",
          ],
          products: ["PowerProtect", "Veeam", "Zerto", "Azure Site Recovery"],
        },
        {
          id: "noc",
          name: "Network Operations Center (NOC)",
          description: "Centralized monitoring, incident response, and service management for managed services.",
          details: "Service Desk and IT Support (Tier 1–3) delivers 24×7 or business-hours helpdesk coverage with incident, request, and problem management. Managed and Co-Managed IT Services provides full outsourcing or collaboration with internal IT teams. Asset and Licensing Management maintains IT inventory, lifecycle tracking, and software licensing across environments.",
          useCases: [
            "24/7 helpdesk coverage",
            "After-hours support",
            "Reducing ticket backlog",
            "IT asset lifecycle management",
          ],
          products: ["ServiceNow", "ConnectWise", "Autotask", "NinjaOne"],
        },
        {
          id: "managed-cloud",
          name: "Managed Cloud Services",
          description: "Cloud-focused services extending NOC capabilities into public and private cloud environments.",
          details: "IaaS Management provides design, provisioning, and 24×7 operations for Azure, AWS, GCP, private cloud, and cloud storage. Cloud Platform Operations delivers management of platform services, monitoring, patching, and incident response. Hybrid and Multi-Cloud Governance establishes security baselines, identity integration, and policy-driven workload placement.",
          useCases: [
            "Cloud migration support",
            "Multi-cloud governance",
            "Cloud cost optimization",
            "Platform-as-a-Service management",
          ],
          products: ["Azure", "AWS", "GCP", "Terraform", "Kubernetes"],
        },
      ]}
      deliverables={[
        "24/7 NOC Monitoring & Alerting",
        "Tiered Service Desk Support (L1-L3)",
        "Infrastructure Health Reports",
        "Backup & Recovery Testing",
        "SLA Performance Dashboards",
        "Monthly Operational Reviews",
      ]}
      relatedKubes={[
        { name: "MSSP Kube", href: "/kubes/mssp-kube" },
        { name: "Product Kube", href: "/kubes/product-kube" },
        { name: "Advisory Kube", href: "/kubes/advisory-kube" },
      ]}
    />
  );
};

export default MSPKube;
