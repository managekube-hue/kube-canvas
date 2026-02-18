import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function Xmm() {
  return <ServiceDetailPage
    category="SME Platform"
    name="XMM — SME Platform"
    tagline="Advanced security and operations for growing organizations with 12 Kubes."
    description="XMM provides advanced security and operations for mid-market organizations. Built on 12 Kubes with extended detection and response capabilities across mobile, applications, cloud, and disaster recovery."
    sections={[
      { title: "Included Kubes (12 Advanced)", items: ["All 7 XRO Kubes", "MDM KUBE — Mobile Device Management", "APM KUBE — Application Performance Monitoring", "CDR KUBE — Cloud Detection & Response", "ADR KUBE — Application Detection & Response", "BDR KUBE — Backup & Disaster Recovery"] },
      { title: "Extended Capabilities", items: ["Extended detection across 12 surfaces", "Mobile and application monitoring", "Cloud security posture management", "Web application firewall", "Disaster recovery orchestration", "External attack surface management (included)", "Cyber risk quantification (included)", "Third-party cyber risk management (comprehensive)"] },
    ]}
  />;
}
