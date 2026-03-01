import { KubePageTemplate } from "@/components/KubePageTemplate";

const ProductKube = () => {
  return (
    <KubePageTemplate
      name="Product Kube"
      tagline="Infrastructure & Software"
      phase="REMEDIATE"
      description="Validated reference architectures and certified expertise. The project configurator that generates BOMs for implementation."
      narrative="The Product Kube is your gateway to validated infrastructure and software solutions. Strategic partnerships deliver pre-integrated reference architectures designed for your workload. From PowerEdge servers and VxRail HCI to cloud platforms and security tools, all configured, staged, and deployed by certified engineers. The project configurator pulls SKUs and generates bills of materials for seamless implementation."
      blocks={[
        {
          id: "infrastructure-hardware",
          name: "Infrastructure & Hardware",
          description: "Servers, storage, networking, and endpoint devices with validated architectures.",
          details: "PowerEdge servers, VxRail HCI, PowerStore and PowerScale storage, networking solutions. All validated and designed for your workload. Includes hardware procurement, staging, configuration, and deployment by certified engineers. Support for data center refresh, HCI deployments, and edge computing.",
          useCases: [
            "Data center refresh",
            "HCI deployments",
            "Edge computing",
            "Server consolidation",
          ],
          products: ["PowerEdge R760", "VxRail E-Series", "PowerStore", "PowerScale", "PowerSwitch"],
        },
        {
          id: "managed-workplace-products",
          name: "Workplace & Collaboration",
          description: "UCaaS, CCaaS, SaaS Ops, and endpoint solutions for the modern workforce.",
          details: "Unified communications and collaboration solutions. From Microsoft 365 to contact center platforms, we configure and deploy workplace technology. Teams Phone, RingCentral, Genesys contact center, and endpoint management through Intune and APEX PC-as-a-Service.",
          useCases: [
            "Teams Phone deployments",
            "Contact center modernization",
            "SaaS operations management",
            "Endpoint refresh programs",
          ],
          products: ["Microsoft Teams", "RingCentral", "Webex", "Genesys", "APEX PCaaS"],
        },
        {
          id: "cloud-data",
          name: "Cloud & Data Platforms",
          description: "IaaS/PaaS, backup/DR, and data analytics platforms across cloud providers.",
          details: "Cloud infrastructure design and deployment across Azure, AWS, and GCP. From IaaS workloads to data platforms, we architect hybrid and multi-cloud solutions. Includes backup and DR with PowerProtect, Veeam, and cloud-native options. Data platform modernization with analytics capabilities.",
          useCases: [
            "Cloud migration",
            "Hybrid cloud architecture",
            "Data platform modernization",
            "Backup and DR implementation",
          ],
          products: ["Azure", "AWS", "GCP", "PowerProtect", "Veeam", "watsonx.data"],
        },
        {
          id: "security-implementation",
          name: "Security Stack",
          description: "SIEM, EDR, ZTNA, and security platform implementations.",
          details: "Security technology implementation from SIEM deployments to Zero Trust architecture. We implement and configure security controls aligned with your risk profile and compliance requirements. Includes detection and response platforms, identity solutions, and network security.",
          useCases: [
            "Security stack modernization",
            "SIEM implementation",
            "Zero Trust initiatives",
            "EDR deployment",
          ],
          products: ["QRadar", "Microsoft Sentinel", "CrowdStrike", "SentinelOne", "Prisma", "Zscaler"],
        },
        {
          id: "automation-development",
          name: "Automation & DevOps",
          description: "RPA platforms, DevSecOps tooling, and container infrastructure.",
          details: "Automation platforms and development tools. From RPA deployments with UiPath and watsonx Orchestrate to container platforms with OpenShift and Kubernetes. CI/CD pipelines with GitLab, security scanning, and infrastructure-as-code implementations.",
          useCases: [
            "RPA platform deployment",
            "Kubernetes/OpenShift",
            "GitLab/DevSecOps tooling",
            "Infrastructure automation",
          ],
          products: ["UiPath", "watsonx Orchestrate", "OpenShift", "GitLab", "Terraform"],
        },
      ]}
      deliverables={[
        "Validated Architecture Design",
        "Bill of Materials (BOM)",
        "Implementation Timeline",
        "Procurement Coordination",
        "Deployment & Configuration",
        "Knowledge Transfer & Documentation",
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
