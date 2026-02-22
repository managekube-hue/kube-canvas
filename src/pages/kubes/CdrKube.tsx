/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.34-35) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function CdrKube() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Cloud Detection & Response"
    headline="Your Cloud Environment Is Not Inherently Secure. It Is Inherently Complex."
    narrative={[
      "Cloud providers secure the infrastructure layer. Your organization is responsible for everything operating on it configurations, identities, data, workloads, and access controls. That boundary is clearly defined in documentation. In practice, it is where the majority of cloud security failures originate. Misconfigured storage buckets. Overpermissioned service accounts. Internal APIs exposed to the public internet. Resources provisioned outside the change control process by development teams operating at deployment velocity.",
      "Cloud environments change faster than any other component of your infrastructure. Every new service deployed, every IAM role created, every security group modified represents a potential misconfiguration. The velocity of cloud change is precisely why point-in-time cloud security assessments consistently fail what was properly configured at nine in the morning may represent a critical exposure by eleven.",
      "Cloud Detection and Response monitors your cloud environment continuously detecting misconfigurations, unauthorized access, suspicious workload behavior, and lateral movement between cloud services in real time, matched to the velocity of cloud operations.",
    ]}
    capabilitiesHeading="What the Capability Actually Does"
    capabilities={[
      "Cloud Security Posture Management continuous scanning for misconfigurations across AWS, Azure, and GCP, not periodic point-in-time assessment",
      "Cloud workload protection monitoring runtime behavior of containers, serverless functions, and virtual machines against established behavioral baselines",
      "Identity and access anomaly detection for cloud IAM overpermissioned roles, unusual API call patterns, and unauthorized access across cloud identity types",
      "Data store exposure monitoring publicly accessible storage, databases, and exposed secrets are flagged before external parties discover them",
      "Cloud-to-cloud lateral movement detection identifying adversaries traversing cloud service boundaries after initial cloud compromise",
      "Infrastructure-as-code drift detection identifying deployed resources that have diverged from Terraform or CloudFormation declarations",
    ]}
    whatYouReceive={[
      "Every misconfiguration that could expose your cloud environment is detected and queued for remediation before it is exploited. Public storage exposure, overpermissioned IAM roles, and insecure security group configurations are surfaced continuously not discovered during a quarterly assessment or in a breach notification from a third-party researcher.",
      "Unauthorized cloud access is detected from behavioral signals unusual API call patterns, access from unexpected geographic locations, and identity anomalies indicating compromised credentials.",
      "Your cloud security posture is visible in real time not as a quarterly snapshot report. A continuously updated picture of every cloud resource, configuration, and access pattern across your entire cloud estate, available as an operational baseline rather than a periodic deliverable.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous posture scanning and behavioral analysis across all monitored cloud environments." },
      { stage: "Identify", desc: "Misconfiguration validation, access anomaly correlation, and cross-cloud lateral movement scope assessment." },
      { stage: "Alert", desc: "Priority notification with cloud resource context and misconfiguration risk scoring." },
      { stage: "Triage", desc: "Analyst review and determination of exploitation risk versus configuration error." },
      { stage: "Diagnose", desc: "Full cloud attack chain reconstruction, blast radius assessment, and data exposure scope." },
      { stage: "Remediate", desc: "Misconfiguration correction, access revocation, workload isolation, and IaC remediation all documented." },
    ]}
    architectureNotes={[
      "Cloud Security That Matches the Velocity of Cloud Operations: Continuous scanning means misconfigurations are detected within minutes of introduction not weeks later at the next scheduled assessment. The window between a misconfiguration being introduced and being exploited is frequently hours for high-profile exposure types.",
      "IaC drift detection closes the most common cloud security failure mode the gap between declared infrastructure state and actual deployed state. Infrastructure that passed code review and is running something different in production is simultaneously a compliance gap, an audit finding, and a potential security exposure.",
      "Cloud-to-cloud lateral movement detection covers the attack paths between cloud services that perimeter and endpoint tools cannot observe. When an adversary moves from a compromised storage bucket to a connected serverless function to a downstream database, that traversal is visible in the platform.",
      "Multi-cloud coverage is standard AWS, Azure, and GCP monitored through a unified platform with consistent alert taxonomy and a single investigation workflow, eliminating the context-switching overhead of operating separate security tools per cloud provider.",
    ]}
    similar={[
      { label: "Network Threat Detection & Response", href: "/service-layer/ndr" },
      { label: "Software Supply Chain Detection & Response", href: "/service-layer/sdr" },
      { label: "Managed Cloud & FinOps", href: "/services/managed-cloud" },
    ]}
  />;
}
