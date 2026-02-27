/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.24-25) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function CfdrKube() {
  return <ServiceLayerPage
    category="Operations & Continuity"
    name="Configuration Drift Detection & Correction"
    headline="Every Unauthorized Configuration Change Is an Exposure Waiting for an Adversary."
    narrative={[
      "Configuration drift is silent by nature. A firewall rule modified during an emergency change window and never reverted. A cloud security group opened to accelerate testing and never closed. A patch silently rolled back due to a compatibility conflict. An authentication requirement disabled on a service on a temporary basis that persists indefinitely. None of these events generates a ticket. None appears in the next vulnerability scan. All create measurable exposure.",
      "Every major compliance framework CMMC, SOC 2, PCI-DSS, NIST 800-53 incorporates explicit configuration management requirements precisely because configuration integrity is the foundation on which every other security control depends. A well-patched system with misconfigured access controls is not a secure system.",
      "Configuration Drift Detection & Correction monitors every configuration state in your environment against your approved baseline continuously surfacing drift at the moment it occurs, not at the next assessment cycle.",
    ]}
    capabilities={[
      "Configuration baseline definition and version-controlled management across systems, network devices, and cloud resources",
      "Continuous drift detection comparing real-time configuration states against approved baselines across all managed assets",
      "Unauthorized change alerting with full attribution who made the change, when, and from where",
      "Automated remediation for pre-approved drift scenarios restoring known-safe configurations without analyst involvement",
      "Compliance control mapping linking configuration baselines to specific framework requirements for automatic audit documentation",
      "IaC drift detection via Terraform and CloudFormation comparison what you declared and what is deployed should match",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous configuration state comparison across all managed assets against approved baselines." },
      { stage: "Identify", desc: "Drift signal validation and change attribution." },
      { stage: "Alert", desc: "Priority notification with configuration deviation detail, affected assets, and compliance control impact." },
      { stage: "Triage", desc: "Analyst review: authorized change that went wrong versus unauthorized modification requiring investigation." },
      { stage: "Remediate", desc: "Baseline restoration, automated for pre-approved scenarios or analyst-directed for unauthorized drift." },
      { stage: "Document", desc: "Change record for compliance audit trail and policy enforcement evidence." },
    ]}
    similar={[
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
      { label: "Backup & Disaster Recovery", href: "/service-layer/bdr" },
      { label: "Governance, Risk & Compliance", href: "/service-layer/grc" },
    ]}
  />;
}
