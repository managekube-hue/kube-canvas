/** SMB Solutions: /solutions/by-market-size/smb: word-for-word from Solutions.docx pages 6-7 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function SolutionSmb() {
  return (
    <SolutionsNarrativePage
      category="Solutions › By Market Size"
      title="SMB Solutions"
      tagline="Enterprise-Grade Security. Built for Lean Teams."
      description="You Face the Same Threats as Enterprises. You Do Not Have the Same Team."
      sections={[
        {
          title: "The SMB Challenge",
          body: "SMB organizations confront the same adversaries as large enterprises — phishing, ransomware, credential theft, supply chain compromise. The attacks do not scale down because the target is smaller. But the SMB does not have a 24/7 security operations center, a dedicated compliance officer, or the internal bandwidth to manage a portfolio of security tools. SMB Solutions deliver enterprise-grade protection without enterprise-grade operational complexity.",
        },
        {
          title: "What SMBs Need",
          items: [
            "Coverage Without Complexity — Security that operates without constant manual tuning. Tools that integrate without ongoing integration projects. Services that deliver outcomes without requiring internal oversight to sustain them.",
            "24/7 Protection — Adversaries operate at night, on weekends, and during holidays. Coverage must match that reality, not the organization's business hours.",
            "Compliance Foundation — Whether SOC 2, HIPAA, or CMMC, compliance posture must be built and maintained without a dedicated compliance function on staff.",
            "Predictable Cost — Security spend must be predictable. No cost overruns. No surprise scope expansions. No budget consumed by incidents that could have been prevented.",
            "One Partner — One partner for infrastructure, security, compliance, and IT. Not a different vendor for every discipline.",
          ],
        },
        {
          title: "Recommended Solutions",
          items: [
            "Managed SOC — 24/7 security monitoring and incident response. KubricAI reduces noise so the team sees only what matters.",
            "Managed Compliance — Continuous monitoring against relevant frameworks. Automated evidence collection. Audit-ready always.",
            "Core Infrastructure Orchestration — Know what is in your environment. Continuous asset discovery. Configuration baseline monitoring.",
            "Help Desk Services — End-user support so the internal team focuses on strategic priorities.",
          ],
        },
        {
          title: "SMB Service Tiers",
          body: "SMB organizations typically engage at the Essentials or Advanced tier, depending on compliance requirements and internal team depth.",
          items: [
            "Essentials — Detection and triage for organizations with internal IT staff who handle remediation.",
            "Advanced — Full detection through remediation for organizations that require incidents contained without platform management.",
          ],
        },
      ]}
      ctaPrimary={{ label: "Contact Sales", href: "/contact" }}
      ctaSecondary={{ label: "View Service Tiers", href: "/service-tiers" }}
      relatedLinks={[
        { label: "SME Solutions", href: "/solutions/by-market-size/sme" },
        { label: "Enterprise Solutions", href: "/solutions/by-market-size/enterprise" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
