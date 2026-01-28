import { KubePageTemplate } from "@/components/KubePageTemplate";

const MSSPKube = () => {
  return (
    <KubePageTemplate
      name="MSSP Kube"
      tagline="24/7 SOC Operations"
      phase="MANAGE"
      description="Continuous threat detection, response, and cyber risk management. Security operations center without the overhead."
      narrative="Cyber Defense Managed Services delivers a fully managed security operations and advisory program, combining 24/7 SOC operations, managed detection and response, security architecture, and Governance, Risk, and Compliance (GRC) services. It is delivered as an MSSP model with virtual executive leadership (vCISO) to align security with business risk. For organizations that can't afford a security breach."
      blocks={[
        {
          id: "mdr",
          name: "Managed Detection & Response (MDR)",
          description: "Always-on detection and response across endpoints, identities, and infrastructure.",
          details: "Endpoint and Extended Detection and Response (EDR/XDR) provides managed EDR and XDR for behavioral monitoring, ransomware prevention, and endpoint containment. Managed SIEM and Security Analytics encompasses design, deployment, and 24/7 operation of SIEM including collection, correlation, detection rules, and alert tuning. Managed SOC delivers round-the-clock monitoring, incident triage, containment guidance, and escalation through playbook-driven response.",
          useCases: [
            "Ransomware prevention and rapid response",
            "Advanced threat hunting across endpoints",
            "Compliance evidence for endpoint protection",
            "Log centralization and threat hunting",
          ],
          products: ["CrowdStrike", "SentinelOne", "Huntress", "Sophos MDR", "QRadar", "Microsoft Sentinel"],
        },
        {
          id: "defensive-security",
          name: "Defensive Security Architecture",
          description: "Preventive controls and secure design to reduce the attack surface.",
          details: "Zero Trust Network Access (ZTNA) encompasses design and implementation of secure network architectures based on least privilege and identity-centric access, including network segmentation and secure remote access. Security as a Service provides Email Security Gateway capabilities including anti-phishing, malware scanning, and email encryption, along with Dark Web Monitoring for credential and brand monitoring.",
          useCases: [
            "Zero Trust transformation initiatives",
            "Cloud security architecture",
            "Network segmentation projects",
            "Email security hardening",
          ],
          products: ["Prisma Access", "Zscaler", "Proofpoint", "Mimecast", "Abnormal Security"],
        },
        {
          id: "offensive-security",
          name: "Offensive Security & Vulnerability Management",
          description: "Proactive testing and continuous vulnerability reduction.",
          details: "Penetration Testing as a Service (PTaaS) offers scheduled and on-demand penetration tests across network, application, cloud, and social engineering vectors with remediation guidance. Vulnerability Management provides continuous scanning, prioritization based on risk, and remediation tracking. Red Team and Purple Team Exercises test detection and response capabilities.",
          useCases: [
            "PCI DSS quarterly scanning requirements",
            "Risk reduction programs",
            "M&A due diligence support",
            "SOC playbook validation",
          ],
          products: ["Tenable", "Qualys", "Rapid7", "HackerOne", "Cobalt"],
        },
        {
          id: "soc",
          name: "Security Operations Center (SOC)",
          description: "The command center delivering Cyber Defense Managed Services.",
          details: "Core SOC Services includes 24/7 incident detection and response, log and event monitoring, threat hunting, and forensics support, along with SIEM and log management for centralized visibility. Threat Intelligence and Dark Web Monitoring provides continuous monitoring of global threat feeds and underground markets. Preventative Security Operations encompasses email security tuning and zero trust policy enforcement.",
          useCases: [
            "Organizations without internal security teams",
            "Companies needing 24/7 coverage",
            "Compliance mandating continuous monitoring",
            "Post-incident forensics and response",
          ],
          products: ["QRadar", "Splunk", "Microsoft Sentinel", "Recorded Future", "Mandiant"],
        },
      ]}
      deliverables={[
        "24/7 Threat Monitoring & Alerting",
        "Incident Response Playbooks",
        "Monthly Security Reports & Metrics",
        "Vulnerability Remediation Tracking",
        "Threat Intelligence Feeds",
        "Compliance-Ready Documentation",
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
