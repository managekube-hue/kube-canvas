/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.38-40) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function StrikeModule() {
  return <ServiceLayerPage
    category="Intelligence & Risk"
    name="STRIKE Strategic Intelligence"
    headline="Know Your Adversary. Before They Move Against You."
    narrative={[
      "Threat intelligence exists in abundance. IOC feeds, threat actor profiles, dark web monitoring, vulnerability disclosures the volume of raw intelligence available to security teams has never been higher. The problem is not access to information. The problem is the gap between generic threat data and actionable knowledge about the specific threats targeting your organization, your industry, and your infrastructure.",
      "Generic intelligence feeds flood SIEM platforms with indicators that may be technically valid but carry no operational relevance to your specific environment. Your team processes the volume, derives limited value, and progressively loses confidence in the intelligence program as a decision-making input. Meanwhile, threat actors who specialize in your sector are developing tactics, techniques, and procedures designed specifically to circumvent the controls your industry deploys and that operationally relevant intelligence is not in your commodity feed.",
      "STRIKE Strategic Intelligence delivers curated, operationalized threat intelligence mapped to your specific environment, industry vertical, and organizational threat profile so every intelligence product your team receives is directly relevant to decisions they need to make in the current operational period, not to the generic threat landscape that affects everyone abstractly and no one specifically.",
    ]}
    capabilities={[
      "Threat actor profiling specific to your industry vertical and organizational footprint not the generic threat landscape report, but your threat landscape, with named actors and documented TTPs relevant to your sector, your asset types, and your regulatory context",
      "Tactical IOC feeds filtered for environmental relevance indicators that matter to your specific infrastructure surfaced automatically, not bulk feeds requiring manual triage to determine what is applicable",
      "Dark web and deep web monitoring for credential exposure, data leakage, and targeting signals early warning before an attack being prepared for your organization has been executed",
      "TTP analysis mapped to the MITRE ATT&CK framework you see not only what threat actors are doing but precisely how, enabling detection engineering informed by actual adversary behavior rather than hypothetical attack scenarios",
      "Campaign tracking monitoring active threat campaigns targeting your sector in real time so you know when your industry is in a specific threat actor's operational crosshairs and can act before the campaign reaches your environment",
      "Strategic intelligence reports formatted for executive and board-level consumption technical threat data translated into business risk language that enables governance decisions and supports accurate risk disclosure",
    ]}
    whatYouReceive={[
      "Your team knows which threat actors are actively targeting your industry, what specific techniques they are currently employing, and whether indicators of their activity are present in your monitored environment. That knowledge drives detection tuning, remediation prioritization, and security program investment decisions replacing reactive posture management with adversary-informed planning.",
      "Dark web monitoring surfaces credential exposure before adversaries act on the access. The window between a credential appearing on a dark web marketplace and being operationalized in an attack is frequently measured in hours. STRIKE compresses your response window to match, triggering credential remediation workflows before the exposed access is used against your environment.",
      "Executive and board communications are supported by intelligence products that translate adversary activity into business risk language enabling security investment decisions grounded in current threat behavior rather than theoretical frameworks, and supporting accurate risk disclosure to boards, audit committees, and regulators who require that language.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous dark web monitoring, threat actor tracking, and active campaign intelligence collection." },
      { stage: "Identify", desc: "IOC validation and environmental relevance mapping against your specific infrastructure profile." },
      { stage: "Alert", desc: "Curated notification of high-relevance threat intelligence with directly actionable operational context." },
      { stage: "Triage", desc: "Analyst review of intelligence applicability and detection coverage gap identification." },
      { stage: "Diagnose", desc: "Threat actor TTP analysis and attack surface mapping against current adversary capability." },
      { stage: "Remediate", desc: "Detection rule tuning, IOC blocking, and credential or exposure remediation workflows." },
      { stage: "Document", desc: "Intelligence product packaging for compliance evidence and executive reporting requirements." },
      { stage: "Close", desc: "Campaign tracking closure and post-campaign analysis filed for future detection improvement." },
    ]}
    architectureNotes={[
      "Intelligence That Drives Operations: STRIKE intelligence is operationalized into the detection layer automatically. IOCs from active campaigns targeting your sector are converted into detection rules without requiring manual engineering effort from your team. Intelligence flows from collection through operationalization without human intervention in the processing chain.",
      "Industry-specific profiling means threat actor coverage is constructed around the sectors, target types, and operational TTPs relevant to your organization not the generic landscape that treats every organization as an equivalent target facing equivalent risk.",
      "MITRE ATT&CK mapping connects incoming intelligence to your defensive coverage state identifying which adversary techniques you currently detect and which techniques active threat actors can execute without triggering any alert in your current configuration.",
      "Executive intelligence products enable accurate board-level risk communication translating threat actor behavioral data into governance and disclosure language without requiring board members to parse technical threat intelligence reports that were written for analysts.",
    ]}
    similar={[
      { label: "Vulnerability Detection & Prioritization", href: "/service-layer/vdr" },
      { label: "External Attack Surface Management", href: "/service-layer/easm" },
      { label: "Honeypot & Deception Network", href: "/service-layer/honeypot" },
    ]}
  />;
}
