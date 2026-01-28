import { KubePageTemplate } from "@/components/KubePageTemplate";

const ProductKube = () => {
  return (
    <KubePageTemplate
      name="Product Kube"
      tagline="Dell & IBM Partnership"
      phase="REMEDIATE"
      description="Strategic partnerships with Dell and IBM delivering validated reference architectures and certified expertise. The project configurator that pulls SKUs and generates BOMs for implementation."
      blocks={[
        {
          id: "infrastructure-hardware",
          name: "Infrastructure & Hardware",
          description: "Servers/Storage (PowerEdge/VxRail), Network/Edge (Meraki/PowerSwitch), and endpoint devices.",
          details: "Dell PowerEdge servers, VxRail HCI, PowerStore and PowerScale storage, networking solutions. All validated and designed for your workload.",
          useCases: [
            "Data center refresh",
            "HCI deployments",
            "Edge computing",
          ],
        },
        {
          id: "managed-workplace-products",
          name: "Managed Workplace",
          description: "UCaaS (Teams/RingCentral/Webex), CCaaS (Genesys/NICE), and SaaS Ops (M365/Intune).",
          details: "Unified communications and collaboration solutions. From Microsoft 365 to contact center platforms, we configure and deploy workplace technology.",
          useCases: [
            "Teams Phone deployments",
            "Contact center modernization",
            "SaaS operations management",
          ],
        },
        {
          id: "cloud-data",
          name: "Cloud & Data",
          description: "IaaS/PaaS (Azure/AWS/GCP), Backup/DR (PowerProtect/Veeam), and watsonx.data analytics.",
          details: "Cloud infrastructure design and deployment. From IaaS workloads to data platforms, we architect solutions across Azure, AWS, and GCP.",
          useCases: [
            "Cloud migration",
            "Hybrid cloud architecture",
            "Data platform modernization",
          ],
        },
        {
          id: "security-implementation",
          name: "Security Implementation",
          description: "SIEM (QRadar/Sentinel), EDR (CrowdStrike/SentinelOne), and ZTNA (Prisma/Zscaler).",
          details: "Security technology implementation. From SIEM deployments to Zero Trust architecture, we implement and configure security controls.",
          useCases: [
            "Security stack modernization",
            "SIEM implementation",
            "Zero Trust initiatives",
          ],
        },
        {
          id: "automation-development",
          name: "Automation & Development",
          description: "RPA (UiPath/watsonx Orchestrate), DevSecOps (OpenShift/GitLab), and custom applications.",
          details: "Automation platforms and development tools. From RPA deployments to container platforms and CI/CD pipelines.",
          useCases: [
            "RPA platform deployment",
            "Kubernetes/OpenShift",
            "GitLab/DevSecOps tooling",
          ],
        },
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
