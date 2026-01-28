import { KubePageTemplate } from "@/components/KubePageTemplate";

const ProductKube = () => {
  return (
    <KubePageTemplate
      name="Product Kube"
      tagline="Dell & IBM partnership"
      phase="REMEDIATE"
      description="Strategic partnerships with Dell and IBM delivering validated reference architectures and certified expertise. The project configurator that pulls SKUs and generates BOMs for implementation."
      blocks={[
        { name: "Infrastructure & Hardware", description: "Servers/Storage (PowerEdge/VxRail), Network/Edge (Meraki/PowerSwitch), and endpoint devices." },
        { name: "Managed Workplace", description: "UCaaS (Teams/RingCentral/Webex), CCaaS (Genesys/NICE), and SaaS Ops (M365/Intune)." },
        { name: "Cloud & Data", description: "IaaS/PaaS (Azure/AWS/GCP), Backup/DR (PowerProtect/Veeam), and watsonx.data analytics." },
        { name: "Security Implementation", description: "SIEM (QRadar/Sentinel), EDR (CrowdStrike/SentinelOne), and ZTNA (Prisma/Zscaler)." },
        { name: "Automation & Development", description: "RPA (UiPath/watsonx Orchestrate), DevSecOps (OpenShift/GitLab), and custom applications." },
      ]}
      deliverables={[
        "Validated Architecture Design",
        "Bill of Materials (BOM)",
        "Implementation Timeline",
        "Procurement Coordination",
        "Deployment & Configuration",
      ]}
      relatedKubes={[
        { name: "Assessment Kube", href: "/kubes/assessment-kube" },
        { name: "Industry Kube", href: "/kubes/industry-kube" },
        { name: "MSP Kube", href: "/kubes/msp-kube" },
      ]}
    />
  );
};

export default ProductKube;
