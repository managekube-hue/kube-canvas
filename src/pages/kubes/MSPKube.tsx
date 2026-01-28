import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSPKube = () => {
  return (
    <KubePageTemplate
      name="MSP Kube"
      tagline="I&O Managed Services"
      phase="MANAGE"
      description="Fully managed or co-managed infrastructure and operations stack, covering end-user productivity, hybrid infrastructure, and business continuity."
      narrative="I&O Managed Services delivers a fully managed or co-managed infrastructure and operations stack, covering end-user productivity, hybrid infrastructure, and business continuity. It is operated from a dedicated Network Operations Center (NOC) and extends into managed cloud services for public, private, and hybrid environments. This Kube is designed for clients seeking ongoing operational support and day-to-day service delivery."
      blocks={[
        {
          id: "managed-workplace",
          name: "Managed Workplace & Productivity Block",
          description: "End-user and collaboration services to keep your workforce productive and secure.",
          details: "Unified Communications as a Service (UCaaS) provides telephony, VoIP, and collaboration services through platforms such as Microsoft Teams and RingCentral. Contact Center as a Service (CCaaS) delivers cloud contact center platforms for customer support and service desks. SaaS Operations (SaaS Ops) optimizes Microsoft 365 environments through license management, policy governance, and tenant hygiene. Unified Endpoint Management (UEM) encompasses Mobile Device Management (MDM), endpoint configuration, asset tracking, and compliance across desktops, laptops, and mobile devices.",
          useCases: [
            "UCaaS telephony and collaboration",
            "CCaaS contact center platforms",
            "Microsoft 365 optimization and governance",
            "Unified Endpoint Management across devices",
          ],
          products: ["Microsoft Teams", "RingCentral", "Microsoft 365", "Intune", "CCaaS Platforms"],
        },
        {
          id: "hybrid-infrastructure",
          name: "Hybrid Infrastructure Management Block",
          description: "Design, operation, and lifecycle management of on-premises, cloud, and edge infrastructure as part of continuous managed services.",
          details: "Managed IaaS and PaaS covers deployment and operations of Microsoft Azure, Amazon Web Services (AWS), Google Cloud Platform (GCP), private cloud, and virtual data centers. Infrastructure Lifecycle Management addresses hardware procurement for operational needs, staging, deployment, warranty management, repair, and refresh planning executed as part of ongoing service delivery. Network and Edge Operations includes network administration for switches, firewalls, and Wi-Fi, Cisco Meraki management, SD-WAN, and edge device support, along with structured cabling and physical layer services. Server and Core Services Management provides ongoing server administration and maintenance.",
          useCases: [
            "Managed IaaS and PaaS operations",
            "Infrastructure lifecycle management",
            "Network and edge device operations",
            "Server and core services management",
          ],
          products: ["Azure", "AWS", "GCP", "Cisco Meraki", "SD-WAN", "PowerEdge", "VxRail"],
        },
        {
          id: "bcdr",
          name: "Business Continuity & Data Resilience Block",
          description: "Protection of critical data and rapid recovery of services to meet business RTO and RPO targets.",
          details: "Disaster Recovery as a Service (DRaaS) offers backup, replication, and failover for key workloads across on-premises and cloud environments, along with business continuity planning and runbook execution. Backup and Recovery Services encompasses policy design, backup monitoring, testing, and restore support across endpoints, servers, and SaaS platforms.",
          useCases: [
            "Disaster Recovery as a Service (DRaaS)",
            "Business continuity planning",
            "Backup policy design and monitoring",
            "Restore support across platforms",
          ],
          products: ["PowerProtect", "Veeam", "Zerto", "Azure Site Recovery"],
        },
        {
          id: "noc",
          name: "Network Operations Center (NOC) Block",
          description: "The operational command center for I&O Managed Services, providing centralized monitoring, incident response, and service management.",
          details: "Service Desk and IT Support (Tier 1–3) delivers 24×7 or business-hours helpdesk coverage along with incident, request, and problem management. Managed and Co-Managed IT Services provides full outsourcing or collaboration with internal IT teams using shared tools and processes. Operational Hardware Management supports clients with hardware procurement for routine replacements, configuration, repair, and upgrades. Asset and Licensing Management maintains IT asset inventory, lifecycle tracking, and software licensing management. Core Infrastructure Operations encompasses network, server, MDM, and cabling operations run through standard operating procedures, SLAs, and change control.",
          useCases: [
            "24×7 Service Desk (Tier 1-3)",
            "Managed and Co-Managed IT Services",
            "Asset and licensing management",
            "Core infrastructure operations",
          ],
          products: ["ServiceNow", "ConnectWise", "Autotask", "NinjaOne"],
        },
        {
          id: "managed-cloud",
          name: "Managed Cloud Services Block",
          description: "Cloud-focused services that extend the NOC's reach into public and private cloud environments for clients requiring continuous cloud operations support.",
          details: "Infrastructure as a Service (IaaS) Management provides design, provisioning, and 24×7 operations for Azure, AWS, GCP, private cloud, and cloud storage. Cloud Platform Operations (PaaS) delivers management of platform services, monitoring, patching, and incident response. Hybrid and Multi-Cloud Governance establishes security baselines, identity integration, and policy-driven workload placement to ensure consistent security and operational standards across cloud platforms.",
          useCases: [
            "IaaS management and provisioning",
            "Cloud Platform Operations (PaaS)",
            "Hybrid and multi-cloud governance",
            "Security baselines across cloud platforms",
          ],
          products: ["Azure", "AWS", "GCP", "Terraform", "Kubernetes"],
        },
      ]}
      deliverables={[
        "24×7 NOC Monitoring & Alerting",
        "Tiered Service Desk Support (L1-L3)",
        "Infrastructure Health Reports",
        "Backup & Recovery Testing",
        "SLA Performance Dashboards",
        "Monthly Operational Reviews",
      ]}
      relatedKubes={[
        { name: "MSSP Kube", href: "/kubes/mssp-kube" },
        { name: "Advisory Kube", href: "/kubes/advisory-kube" },
        { name: "Innovation Kube", href: "/kubes/innovation-kube" },
      ]}
    />
  );
};

export default MSPKube;
