import { KubeDetailPage } from "@/components/KubeDetailPage";

export default function HoneypotModule() {
  return (
    <KubeDetailPage
      code="HONEYPOT"
      name="Deception-Based Threat Detection"
      tagline="Deploy decoy assets across your network to detect lateral movement, insider threats, and advanced persistent threats."
      category="Security Detection & Response"
      description="Honeypot deploys high-fidelity decoy systems — fake servers, credentials, files, and network services — that blend seamlessly into your environment. Any interaction with a decoy is, by definition, malicious — giving you zero-false-positive alerting for lateral movement and insider threats."
      fullDescription="Traditional detection relies on signatures and anomalies — both generate noise. Deception technology flips the model: decoys have no legitimate business purpose, so every touch is an alert worth investigating. Honeypot deploys and manages decoy infrastructure across your network, cloud, and Active Directory, providing high-confidence detections that catch attackers who have already bypassed perimeter defences."
      capabilities={[
        {
          title: "Decoy Deployment",
          items: [
            "Network honeypots (SSH, RDP, SMB, HTTP)",
            "Honey credentials in Active Directory",
            "Honey files and canary documents",
            "Cloud decoy instances (AWS, Azure, GCP)",
          ],
        },
        {
          title: "Detection & Alerting",
          items: [
            "Zero false-positive interaction alerts",
            "Lateral movement detection",
            "Insider threat identification",
            "Attacker TTP capture and profiling",
          ],
        },
        {
          title: "Intelligence Integration",
          items: [
            "Automatic IOC extraction from interactions",
            "MITRE ATT&CK mapping of attacker behaviour",
            "Integration with STRIKE and TI modules",
            "Forensic evidence preservation",
          ],
        },
      ]}
      similar={[
        { label: "ITDR — Identity Threat Detection", href: "/service-layer/itdr" },
        { label: "NDR — Network Detection", href: "/service-layer/ndr" },
        { label: "STRIKE — Strategic Intelligence", href: "/service-layer/strike" },
      ]}
    />
  );
}
