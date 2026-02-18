import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function GrcKube() {
  return <KubeDetailPage
    code="GRC KUBE"
    name="Governance, Risk & Compliance"
    tagline="CISO Assistant integration with 100+ compliance frameworks for automated gap analysis and remediation tracking."
    category="Intelligence & Governance"
    description="GRC KUBE operationalizes governance, risk, and compliance through automated control monitoring and evidence collection. CISO Assistant maps controls across 100+ frameworks, performs continuous gap analysis, tracks remediation, and generates audit-ready compliance reports."
    fullDescription="Compliance is continuous, not periodic. GRC KUBE integrates CISO Assistant to provide a single compliance management platform across all regulatory obligations. Cross-framework control mapping eliminates duplicate evidence collection, while automated gap analysis identifies exactly what needs attention before your next audit."
    capabilities={[
      { title: "GRC Capabilities", items: ["100+ compliance framework support", "CISO Assistant integration", "Automated control mapping", "Continuous gap analysis"] },
      { title: "Evidence & Audit", items: ["Evidence collection and archival", "Remediation workflow tracking", "Audit report generation", "Risk assessment and scoring"] },
      { title: "Governance", items: ["Policy and procedure management", "Third-party risk tracking", "Board-level reporting", "Risk register management"] },
    ]}
    similar={[
      { label: "CFDR KUBE", href: "/kubes/cfdr-kube" },
      { label: "TI KUBE", href: "/kubes/ti-kube" },
      { label: "VDR KUBE", href: "/kubes/vdr-kube" },
    ]}
  />;
}
