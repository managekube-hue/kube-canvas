import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSPKube = () => {
  return (
    <KubePageTemplate
      name="MSP Kube"
      tagline="NOC & Service Desk"
      phase="MANAGE"
      description="Fully managed or co-managed infrastructure stack. End-user productivity, hybrid infrastructure, and business continuity from a dedicated NOC. Your IT operations, systematized."
      blocks={[
        {
          id: "service-desk",
          name: "Service Desk (L1-L3)",
          description: "24×7 or business-hours helpdesk with incident management, request fulfillment, and escalation.",
          details: "Tiered support from password resets to complex troubleshooting. We integrate with your ticketing systems and provide dedicated or shared resources based on your needs.",
          useCases: [
            "Growing companies without internal IT staff",
            "After-hours support coverage",
            "Reducing ticket backlog",
          ],
        },
        {
          id: "hybrid-infrastructure",
          name: "Hybrid Infrastructure",
          description: "Management of servers, network, storage, and IaaS/PaaS across on-prem and cloud.",
          details: "Unified management of your entire infrastructure stack. Proactive monitoring, patching, and optimization across Azure, AWS, GCP, and on-premises environments.",
          useCases: [
            "Multi-cloud environment management",
            "Legacy infrastructure alongside cloud",
            "Infrastructure optimization",
          ],
        },
        {
          id: "managed-workplace",
          name: "Managed Workplace",
          description: "UCaaS (Teams/RingCentral/Webex), CCaaS (Genesys/NICE), SaaS Ops (M365/Intune), and Unified Endpoint Management.",
          details: "Complete management of your end-user computing environment. From collaboration tools to endpoint management, we ensure your workforce stays productive.",
          useCases: [
            "Microsoft 365 administration",
            "Unified communications deployment",
            "Endpoint device management",
          ],
        },
        {
          id: "bcdr",
          name: "BCDR (DRaaS)",
          description: "Disaster Recovery as a Service, backup monitoring, and business continuity planning.",
          details: "Backup monitoring, disaster recovery testing, and business continuity planning. We ensure your critical systems can be recovered within your RTO/RPO requirements.",
          useCases: [
            "Ransomware recovery planning",
            "Compliance backup requirements",
            "DR testing and validation",
          ],
        },
      ]}
      deliverables={[
        "24/7 NOC Monitoring",
        "Tiered Service Desk Support",
        "Infrastructure Health Reports",
        "Backup & Recovery Testing",
        "SLA Performance Dashboards",
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
