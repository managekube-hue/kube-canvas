import { KubeDetailPage } from "@/components/KubeDetailPage";

export default function StrikeModule() {
  return (
    <KubeDetailPage
      code="STRIKE"
      name="Strategic Threat Intelligence & Kill-chain Enrichment"
      tagline="Advanced adversary tracking, campaign attribution, and kill-chain mapping for proactive defence."
      category="Intelligence & Governance"
      description="STRIKE delivers operationalised strategic intelligence that goes beyond indicators of compromise. Track adversary campaigns, map kill-chains to your infrastructure, and receive actionable briefings that inform executive decision-making and SOC prioritisation."
      fullDescription="Most threat intelligence feeds drown teams in noise. STRIKE filters, correlates, and contextualises intelligence from commercial, open-source, and dark-web sources into adversary profiles mapped directly to your attack surface. Weekly strategic briefings, campaign-specific hunt packages, and automated MITRE ATT&CK mapping give your security team — and your board — the context they need to act decisively."
      capabilities={[
        {
          title: "Adversary Tracking",
          items: [
            "Named threat actor profiling",
            "Campaign attribution and timeline mapping",
            "Dark web and underground forum monitoring",
            "Geopolitical risk correlation",
          ],
        },
        {
          title: "Kill-Chain Intelligence",
          items: [
            "MITRE ATT&CK technique mapping",
            "Kill-chain gap analysis against your defences",
            "Automated hunt package generation",
            "TTP-based detection rule creation",
          ],
        },
        {
          title: "Executive Reporting",
          items: [
            "Weekly strategic intelligence briefings",
            "Board-ready risk summaries",
            "Industry-specific threat landscape reports",
            "Compliance-mapped intelligence outputs",
          ],
        },
      ]}
      similar={[
        { label: "TI — Threat Intelligence", href: "/service-layer/ti" },
        { label: "VDR — Vulnerability Detection", href: "/service-layer/vdr" },
        { label: "NDR — Network Detection", href: "/service-layer/ndr" },
      ]}
    />
  );
}
