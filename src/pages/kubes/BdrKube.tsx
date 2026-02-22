import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function BdrKube() {
  return <KubeDetailPage
    code="BDR"
    name="Recovery That's Verifiable and Auditable"
    tagline="Backup verification and disaster recovery orchestration for RTO/RPO compliance."
    category="Infrastructure & Operations"
    description="BDR KUBE delivers enterprise backup and disaster recovery with automated verification and compliance reporting. Provide backup orchestration, verification testing, and recovery automation ensuring RTO/RPO compliance with auditable proof of recoverability."
    fullDescription="A backup you haven't tested is a promise you can't keep. BDR KUBE continuously verifies backup integrity and tests recovery procedures, generating auditable proof of recoverability. Immutable backup storage and air-gapped copies protect against ransomware, while DRLM orchestrates full disaster recovery."
    capabilities={[
      { title: "Backup & Recovery", items: ["Backup Server integration", "Enterprise backup orchestration", "DRLM disaster recovery orchestration", "Automated backup verification"] },
      { title: "Verification & Testing", items: ["Recovery testing and validation", "RTO/RPO tracking and reporting", "Compliance documentation", "Audit-ready evidence"] },
      { title: "Protection", items: ["Immutable backup storage", "Ransomware protection", "Air-gapped backup copies", "Encryption verification"] },
    ]}
    similar={[
      { label: "CFDR", href: "/service-layer/cfdr" },
      { label: "CIO", href: "/service-layer/cio" },
    ]}
  />;
}
