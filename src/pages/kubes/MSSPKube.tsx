import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSSPKube = () => {
  return (
    <KubePageTemplate
      name="MSSP Kube"
      tagline="24/7 SOC operations"
      phase="MANAGE"
      description="Continuous threat detection, response, and cyber risk management. 24/7 SOC operations, MDR, security architecture, and GRC services. Your security operations center, without the overhead."
      blocks={[
        { name: "24/7 SOC Monitoring", description: "Round-the-clock threat detection, triage, and containment from our security operations center." },
        { name: "Managed EDR/XDR", description: "Endpoint behavioral analysis and response with leading platforms like CrowdStrike and SentinelOne." },
        { name: "Vulnerability Management", description: "Continuous scanning, prioritization, and remediation tracking across your environment." },
        { name: "Security Architecture", description: "Zero Trust implementation, network segmentation, and perimeter security design." },
      ]}
      deliverables={[
        "24/7 Threat Monitoring",
        "Incident Response Playbooks",
        "Monthly Security Reports",
        "Vulnerability Remediation Tracking",
        "Threat Intelligence Feeds",
      ]}
      relatedKubes={[
        { name: "MSP Kube", href: "/kubes/msp-kube" },
        { name: "Compliance Kube", href: "/kubes/compliance-kube" },
        { name: "Advisory Kube", href: "/kubes/advisory-kube" },
      ]}
    />
  );
};

export default MSSPKube;
