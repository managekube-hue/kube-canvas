/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.14-15) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function ItdrKube() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Identity Threat Detection & Response"
    headline="The Attacker Already Has the Credentials. The Defining Question Is Whether You Know It."
    narrative={[
      "Credential compromise is the leading initial attack vector in the majority of breaches. Perimeter security assumes the threat originates outside the network. Compromised credentials eliminate that assumption; the attacker is authenticated at the moment damage begins, indistinguishable from your legitimate users until behavioral anomalies accumulate to detectable thresholds.",
      "The signals are present in your identity infrastructure now: impossible travel, logins from unrecognized devices, privileged account access outside operating hours, lateral movement through service accounts, and escalating permission requests. Without a layer designed specifically to detect and correlate identity abuse at behavioral scale, these signals are absorbed into volume.",
      "Identity Threat Detection & Response monitors every authentication event, access decision, and privilege escalation across your identity infrastructure continuously, against behavioral baselines that make anomalies visible at the moment of occurrence.",
    ]}
    capabilities={[
      "Authentication anomaly detection: impossible travel, unusual login times, unrecognized devices, and access from new locations",
      "Privilege escalation monitoring detecting unauthorized elevation of account permissions as it occurs, not retrospectively",
      "Lateral movement detection identifying credential-based traversal across systems and directory domains",
      "Service account behavioral monitoring non-human identities carry elevated permissions with no human baseline; they are frequently targeted and frequently overlooked",
      "MFA bypass and session token theft detection identifying attacks that circumvent authentication controls that are in place",
      "UEBA per-user, per-role, per-system baseline learning distinguishing genuine threats from legitimate behavioral changes",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous behavioral scanning across authentication and access logs." },
      { stage: "Identify", desc: "Anomaly validation and cross-system correlation to establish attack scope." },
      { stage: "Alert", desc: "Priority notification with behavioral context and risk scoring." },
      { stage: "Triage", desc: "Analyst review and lateral movement scope assessment." },
      { stage: "Diagnose", desc: "Full identity attack chain reconstruction and patient-zero identification." },
      { stage: "Remediate", desc: "Account suspension, session termination, credential reset, and access revocation all documented." },
    ]}
    similar={[
      { label: "Network Threat Detection & Response", href: "/service-layer/ndr" },
      { label: "Cloud Detection & Response", href: "/service-layer/cdr" },
      { label: "Application Threat Containment", href: "/service-layer/adr" },
    ]}
  />;
}
