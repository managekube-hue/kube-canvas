import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSPKube = () => {
  return (
    <KubePageTemplate
      name="MSP Kube"
      tagline="NOC & Service Desk"
      phase="MANAGE"
      description="Fully managed or co-managed infrastructure stack. End-user productivity, hybrid infrastructure, and business continuity from a dedicated NOC. Your IT operations, systematized."
      blocks={[
        { name: "Service Desk (L1-L3)", description: "24×7 or business-hours helpdesk with incident management, request fulfillment, and escalation." },
        { name: "Hybrid Infrastructure", description: "Management of servers, network, storage, and IaaS/PaaS across on-prem and cloud." },
        { name: "Managed Workplace", description: "UCaaS (Teams/RingCentral/Webex), CCaaS (Genesys/NICE), SaaS Ops (M365/Intune), and Unified Endpoint Management." },
        { name: "BCDR (DRaaS)", description: "Disaster Recovery as a Service, backup monitoring, and business continuity planning." },
      ]}
      deliverables={[
        "24/7 NOC Monitoring",
        "Tiered Service Desk",
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
