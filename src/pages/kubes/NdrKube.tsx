/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.16-17) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function NdrKube() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Network Threat Detection & Response"
    headline="Attackers Traverse Networks. Your Visibility Must Match Their Movement."
    narrative={[
      "Perimeter controls are necessary. They are not sufficient. Once an adversary has established a foothold through a phishing payload, a compromised credential, or a vulnerable internet-facing service perimeter enforcement no longer applies. The consequential question is whether you can observe them moving.",
      "Lateral movement occurs on your internal network, over legitimate protocols, across legitimate ports, using credentials that appear legitimate. Without continuous traffic analysis at the behavioral level, internal movement is invisible until the adversary reaches their objective.",
      "Network Threat Detection & Response analyzes your network traffic continuously not at the perimeter only, not against known-bad signatures only, but at the behavioral level that reveals adversary activity during the most damaging phase of an attack.",
    ]}
    capabilities={[
      "East-west traffic analysis monitoring internal network communications for lateral movement and anomalous traversal",
      "Command-and-control beaconing and exfiltration channel detection identifying channels disguised as legitimate traffic",
      "DNS anomaly detection: tunneling, domain generation algorithm activity, and malicious resolution patterns",
      "Encrypted traffic analysis detecting threats in TLS-encrypted traffic without decryption requirements",
      "Protocol misuse detection: SMB, RDP, WMI leveraged for malicious lateral movement",
      "Network segmentation violation alerting when traffic crosses boundaries that should be enforced",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous traffic analysis for behavioral anomalies across all network segments." },
      { stage: "Identify", desc: "Signal validation, traffic context enrichment, and ITDR correlation." },
      { stage: "Alert", desc: "Priority notification with traffic context and behavioral deviation detail." },
      { stage: "Triage", desc: "Analyst review, lateral movement scope assessment, and attack chain correlation." },
      { stage: "Diagnose", desc: "Full traversal path reconstruction and C2 infrastructure identification." },
      { stage: "Remediate", desc: "Network isolation, firewall rule enforcement, and C2 channel blocking all documented." },
    ]}
    similar={[
      { label: "Identity Threat Detection & Response", href: "/service-layer/itdr" },
      { label: "Cloud Detection & Response", href: "/service-layer/cdr" },
      { label: "Data Exfiltration Detection & Response", href: "/service-layer/ddr" },
    ]}
  />;
}
