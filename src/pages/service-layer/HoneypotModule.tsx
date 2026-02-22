/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.44-46) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function HoneypotModule() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Honeypot & Deception Network"
    headline="If They Touch the Decoy, You Know They Are Already Inside."
    narrative={[
      "Behavioral detection is operationally powerful. It is also probabilistic comparing current activity against baselines and flagging deviations that exceed configured thresholds. Sophisticated adversaries who move deliberately, blend with normal traffic patterns, and operate within the boundaries of legitimate access can maintain a presence in your environment for extended periods before their behavioral signature accumulates to a detectable level.",
      "Deception technology eliminates the probabilistic element for a specific and critical category of adversary activity. A honeypot—a fake credential placed in a location adversaries search during lateral movement, a decoy file share with a plausible name, a non-existent database with realistic-appearing data—has no legitimate users and no legitimate access pattern. Any interaction with deception infrastructure is unambiguously malicious. No false positives. No threshold calibration. No baseline comparison. The detection is categorical.",
      "The Honeypot and Deception Network deploys decoy infrastructure across your environment that legitimate users will never encounter in normal operations so that when an adversary does encounter it, you know immediately, with certainty, that an adversary is operating in your environment.",
    ]}
    capabilities={[
      "Breadcrumb credential deployment: fake credentials placed in the locations adversaries search during lateral movement: browser credential stores, configuration files, memory locations, and registry entries. They are constructed to appear genuine. They are not.",
      "Decoy file shares, databases, and endpoints with realistic-appearing data and legitimate-looking network presence adversaries cannot distinguish them from production infrastructure without triggering the detection they are attempting to avoid.",
      "Honey token deployment: fake API keys, cloud credentials, and access tokens that generate high-confidence alerts the moment they are used anywhere against any system by any process.",
      "Decoy Active Directory objects: fictitious service accounts, synthetic administrator credentials, and fake sensitive group memberships that adversaries enumerating Active Directory will encounter and attempt to use.",
      "Network decoy services: listening on ports adversaries enumerate during reconnaissance; contact with these services is not ambiguous activity, it is a confirmed detection event.",
      "Deception telemetry correlation: mapping adversary movement through the deception layer to your real infrastructure topology, revealing not only that the adversary is present but where they have been and what paths they have traversed.",
    ]}
    whatYouReceive={[
      "The adversary who has successfully evaded your perimeter controls, maintained a behavioral profile below detection thresholds, and operated patiently within your environment will eventually reach a decision point: should they use this credential, access this file share, try this endpoint? When they do, they trigger a detection that carries zero false positive risk. No analyst calibration is required to determine whether the alert is genuine. It is definitionally genuine.",
      "Early warning time expands dramatically. An adversary present in your environment for weeks without triggering behavioral detection will reveal themselves during lateral movement by encountering deception assets placed precisely in the paths that lateral movement requires. That detection occurs weeks before they would otherwise reach their operational objective. The dwell time advantage that sustained attacks depend on is eliminated by architectural design.",
      "Internal threat intelligence of exceptional operational value is generated from your own environment. The adversary's specific techniques, tools, movement patterns, and behavioral fingerprints captured in deception telemetry produce intelligence that tunes detection capabilities across every other Service Layer discipline. Intelligence derived from an attacker operating against your actual infrastructure is more relevant than any external feed.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous monitoring of all deception infrastructure across every deployment point in the environment." },
      { stage: "Identify", desc: "Adversary interaction validation and real versus deceptive infrastructure contact mapping." },
      { stage: "Alert", desc: "Immediate high-confidence notification on any deception touch zero false positive risk by architectural design." },
      { stage: "Triage", desc: "Analyst confirmation of adversary presence and initial lateral movement scope and path assessment." },
      { stage: "Diagnose", desc: "Full adversary movement reconstruction using deception telemetry combined with ITDR and NDR correlation." },
      { stage: "Remediate", desc: "Adversary eviction, compromised system isolation, and credential revocation across affected systems." },
      { stage: "Document", desc: "Attack chain evidence packaging for forensics, legal proceedings, and regulatory reporting." },
      { stage: "Close", desc: "Deception layer reconfiguration, lessons learned integration, and detection rule updates informed by observed adversary behavior." },
    ]}
    architectureNotes={[
      "Detection Certainty That No Behavioral System Can Provide: Deception-generated alerts carry zero false positive risk by architectural definition there is no legitimate operational reason for any user, system, or process to interact with deception infrastructure. The alert does not require analyst calibration. It requires analyst response.",
      "Sophisticated adversaries who move slowly and deliberately to stay below behavioral detection thresholds cannot evade deception technology through patience or operational discipline. They cannot distinguish real infrastructure from deceptive infrastructure without triggering it. Their tradecraft works against behavioral detection systems. It does not work against assets that are definitionally untouchable by legitimate operations.",
      "Breadcrumb deployment is targeted at the resources adversaries specifically seek during lateral movement credentials in the locations they search, access tokens in the formats they harvest, service accounts in the directories they enumerate. Coverage is adversary-workflow-informed, not broadly distributed.",
      "Integration with ITDR and NDR means a deception trigger is immediately correlated with any pre-existing behavioral signals from the same hosts or identities revealing whether the adversary was already generating anomalies that had not yet crossed automated detection thresholds, and providing full attack context from the first moment of confirmed detection.",
    ]}
    similar={[
      { label: "Identity Threat Detection & Response", href: "/service-layer/itdr" },
      { label: "Network Threat Detection & Response", href: "/service-layer/ndr" },
      { label: "STRIKE Strategic Intelligence", href: "/service-layer/strike" },
    ]}
  />;
}
