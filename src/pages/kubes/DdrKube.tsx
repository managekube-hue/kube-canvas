import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function DdrKube() {
  return <KubeDetailPage
    code="DDR KUBE"
    name="Data Misuse and Exfiltration Detection"
    tagline="Data loss prevention for PII/PCI exposure detection and exfiltration monitoring."
    category="Security Detection & Response"
    description="DDR KUBE prevents data loss and detects exfiltration attempts through data loss prevention (DLP) controls. Scan for exposed secrets and credentials while monitoring for PII, PCI, PHI, and other sensitive data patterns."
    fullDescription="Data is your most valuable asset. DDR KUBE applies pattern matching and behavioral analysis to identify sensitive data moving to unauthorized destinations — whether through email, file transfers, cloud uploads, or network channels. Integration with NDR KUBE provides network-layer exfiltration detection."
    capabilities={[
      { title: "Data Protection", items: ["Data Loss Prevention (DLP)", "Secrets scanning", "OpenDLP pattern matching", "PII/PCI/PHI detection"] },
      { title: "Exfiltration Detection", items: ["Credential exposure monitoring", "Data exfiltration detection", "Email and file transfer monitoring", "Cloud storage scanning"] },
      { title: "Activity Monitoring", items: ["Database activity monitoring", "User behavior analytics", "Insider threat detection", "Forensic investigation support"] },
    ]}
    similar={[
      { label: "ADR KUBE", href: "/kubes/adr-kube" },
      { label: "CDR KUBE", href: "/kubes/cdr-kube" },
      { label: "ITDR KUBE", href: "/kubes/itdr-kube" },
    ]}
  />;
}
