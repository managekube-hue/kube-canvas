import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSSPKube = () => {
  return (
    <KubePageTemplate
      name="MSSP Kube"
      tagline="24/7 SOC Operations"
      phase="MANAGE"
      description="Continuous threat detection, response, and cyber risk management for organizations that can't afford a security breach. Your security operations center, without the overhead."
      blocks={[
        {
          id: "soc-monitoring",
          name: "24/7 SOC Monitoring",
          description: "Round-the-clock threat detection, triage, and containment from our security operations center.",
          details: "Our SOC analysts monitor your environment 24/7/365, providing real-time threat detection, incident triage, and rapid containment. We integrate with your existing tooling while providing enterprise-grade visibility.",
          useCases: [
            "Organizations without internal security teams",
            "Companies needing 24/7 coverage beyond business hours",
            "Compliance requirements mandating continuous monitoring",
          ],
        },
        {
          id: "edr-xdr",
          name: "Managed EDR/XDR",
          description: "Endpoint behavioral analysis and response with leading platforms like CrowdStrike and SentinelOne.",
          details: "We deploy and manage endpoint detection and response across your entire fleet. Our analysts tune detections, investigate alerts, and coordinate response actions.",
          useCases: [
            "Ransomware prevention and rapid response",
            "Advanced threat hunting across endpoints",
            "Compliance evidence for endpoint protection",
          ],
        },
        {
          id: "vulnerability-mgmt",
          name: "Vulnerability Management",
          description: "Continuous scanning, prioritization, and remediation tracking across your environment.",
          details: "Regular vulnerability assessments with risk-based prioritization. We track remediation progress and provide actionable reports for compliance and risk reduction.",
          useCases: [
            "PCI DSS quarterly scanning requirements",
            "Risk reduction programs",
            "M&A due diligence support",
          ],
        },
        {
          id: "security-architecture",
          name: "Security Architecture",
          description: "Zero Trust implementation, network segmentation, and perimeter security design.",
          details: "We design and implement security architectures aligned with Zero Trust principles. From network segmentation to identity-aware access controls.",
          useCases: [
            "Zero Trust transformation initiatives",
            "Cloud security architecture",
            "Network segmentation projects",
          ],
        },
      ]}
      deliverables={[
        "24/7 Threat Monitoring & Alerting",
        "Incident Response Playbooks",
        "Monthly Security Reports & Metrics",
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
