import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function NdrKube() {
  return <KubeDetailPage
    code="NDR KUBE"
    name="Network Threats Detected at the Source"
    tagline="Deep packet inspection and behavioral analysis for network-based threat detection."
    category="Security Detection & Response"
    description="NDR KUBE performs deep packet inspection and behavioral analysis to detect network-based threats that bypass traditional perimeter defenses, identifying C2 beaconing, data exfiltration attempts, lateral movement, and zero-day exploits in real-time."
    fullDescription="Traditional firewalls miss what NDR KUBE catches. By analyzing traffic patterns and behavioral baselines, NDR KUBE identifies threats inside the network perimeter — command-and-control beaconing, data staging, and adversary lateral movement are detected and contained before damage occurs."
    capabilities={[
      { title: "Network Threat Detection", items: ["Deep packet inspection (DPI)", "Network security monitoring", "Behavioral analysis", "IDS/IPS capabilities"] },
      { title: "Threat Hunting", items: ["C2 beaconing detection", "Data exfiltration monitoring", "Zero-day exploit detection", "Lateral movement tracking"] },
      { title: "Response", items: ["Automated blocking", "Quarantine workflows", "SOAR integration", "Forensic packet capture"] },
    ]}
    similar={[
      { label: "ITDR KUBE", href: "/kubes/itdr-kube" },
      { label: "CDR KUBE", href: "/kubes/cdr-kube" },
      { label: "DDR KUBE", href: "/kubes/ddr-kube" },
    ]}
  />;
}
