/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.41-43) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function EasmModule() {
  return <ServiceLayerPage
    category="Intelligence & Risk"
    name="External Attack Surface Management"
    headline="Your Adversaries Have Already Mapped Your Exposure. The Question Is Whether You Have."
    narrative={[
      "Before an adversary engages with your defenses, they conduct reconnaissance. They map your externally exposed infrastructure systematically: domains and subdomains, IP ranges, open ports, SSL certificates, cloud storage configurations, exposed APIs, and forgotten internet-facing systems that your internal inventory has not tracked in years. This reconnaissance is automated, continuous, and free. The information adversaries compile is accurate and current by the time they act on it.",
      "Most organizations carry a substantially larger external attack surface than their security team has documented. Acquisitions introduce infrastructure that was never inventoried under the acquiring organization's security program. Cloud deployments create internet-facing resources outside formal change control processes. Development environments are exposed temporarily and then forgotten. Legacy systems remain online after their decommission schedules slipped. Each of these conditions is a standard feature of organizational infrastructure that has grown without systematic external exposure management.",
      "External Attack Surface Management continuously maps your exposure from the vantage point of an adversary, finding everything visible from the internet, assessing the risk each exposure represents, and prioritizing remediation before reconnaissance intelligence becomes an operational attack.",
    ]}
    capabilities={[
      "Automated external infrastructure discovery continuously mapping all internet-exposed assets across your entire domain footprint from an outside-in perspective that reflects what adversaries actually observe.",
      "Subdomain enumeration and takeover vulnerability detection: forgotten subdomains pointing to decommissioned infrastructure are identified before an adversary claims them.",
      "Open port and service exposure assessment with risk scoring: every exposed service evaluated for the risk it represents, not merely catalogued as present.",
      "SSL/TLS certificate monitoring: expiration alerts, weak cipher suite detection, and certificate anomalies creating either security exposure or service disruption.",
      "Cloud asset exposure monitoring: publicly accessible storage, databases, and compute resources that should be private are flagged immediately upon detection.",
      "Exposed credential and secret detection in public code repositories: API keys, connection strings, and configuration secrets accidentally committed to public repositories are identified before adversaries find and operationalize them.",
    ]}
    whatYouReceive={[
      "Every internet-facing asset in your environment is continuously inventoried, risk-assessed, and monitored against a defined exposure baseline. Forgotten subdomains are identified and remediated before adversaries execute subdomain takeover attacks. Exposed cloud storage is detected and secured before data is harvested. Expiring certificates are addressed before they generate security warnings that affect users and signal configuration neglect to adversaries scanning your infrastructure.",
      "The gap between your documented attack surface and your actual external exposure closes continuously. Each new discovery is risk-scored and incorporated into your remediation queue with context that prioritizes it appropriately against internal vulnerability findings.",
      "Your security team carries the same view of your external exposure that your adversaries are working from which means you can act on what they see before they act on it against you. The operational advantage of reconnaissance visibility belongs to the attacker by default. EASM transfers it to your defense.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous external reconnaissance scanning across all domains, IP ranges, and cloud assets." },
      { stage: "Identify", desc: "Exposed asset validation, ownership confirmation, and risk scoring against defined exposure policy." },
      { stage: "Alert", desc: "Priority notification of high-risk exposures subdomain takeover candidates, cloud data exposure, critical service exposure." },
      { stage: "Triage", desc: "Analyst review and remediation priority determination against the full exposure inventory." },
      { stage: "Diagnose", desc: "Full exposure chain analysis how the asset became exposed and what access or data it provides to an adversary." },
      { stage: "Remediate", desc: "Exposure removal, subdomain cleanup, access restriction, and certificate remediation all documented." },
    ]}
    architectureNotes={[
      "Attack Surface Management Calibrated to Adversary Reconnaissance: Discovery methodology mirrors the reconnaissance techniques adversaries actually employ finding what they find, using the same tools and vantage points, before they act on what they discover. Coverage is calibrated against attacker methodology, not against an internal definition of what the attack surface is supposed to be.",
      "Continuous scanning means new exposures created by cloud deployments, DNS changes, acquisition integration, and development environment provisioning are detected within hours not in a scheduled assessment weeks later or a breach notification months later.",
      "Subdomain takeover detection addresses one of the highest-impact, lowest-effort attack techniques in the adversary playbook one that most organizations do not monitor for systematically because it does not appear in standard vulnerability scan output.",
      "Integration with Vulnerability Detection and Prioritization means the same CVE carries dramatically different remediation priority depending on whether it is present on an internet-exposed asset or an isolated internal system. External exposure context is the single most consequential environmental factor in accurate vulnerability prioritization.",
      "Public repository scanning identifies credentials and API keys that developers accidentally commit. A consistently high-volume source of cloud environment compromises that standard EASM tooling does not cover and that adversaries actively monitor for in real time.",
    ]}
    similar={[
      { label: "Vulnerability Detection & Prioritization", href: "/service-layer/vdr" },
      { label: "STRIKE Strategic Intelligence", href: "/service-layer/strike" },
      { label: "Cloud Detection & Response", href: "/service-layer/cdr" },
    ]}
  />;
}
