import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function CdrKube() {
  return <KubeDetailPage
    code="CDR KUBE"
    name="Cloud Activity Under Continuous Control"
    tagline="Multi-cloud security monitoring for AWS, Azure, and GCP with misconfiguration detection and automated remediation."
    category="Security Detection & Response"
    description="CDR KUBE delivers cloud-native security posture management and threat detection across AWS, Azure, and GCP. Monitor cloud configurations, detect misconfigurations, track resource changes, and automatically remediate security risks."
    fullDescription="Cloud sprawl creates blind spots. CDR KUBE provides a unified view across all cloud environments with continuous configuration monitoring, identity and access analysis, and real-time alerting on misconfigurations. Automated remediation closes gaps before attackers exploit them."
    capabilities={[
      { title: "Cloud Security", items: ["AWS, Azure, and GCP coverage", "Cloud Security Posture Management (CSPM)", "Misconfiguration detection and remediation", "IAM policy analysis"] },
      { title: "Activity Monitoring", items: ["CloudTrail, Azure Activity Log, and GCP Audit monitoring", "S3/Blob/Bucket security", "Serverless security monitoring", "Container and Kubernetes security"] },
      { title: "Compliance", items: ["Automated compliance validation", "CIS benchmark alignment", "Continuous drift detection", "Evidence collection"] },
    ]}
    similar={[
      { label: "NDR KUBE", href: "/kubes/ndr-kube" },
      { label: "SDR KUBE", href: "/kubes/sdr-kube" },
    ]}
  />;
}
