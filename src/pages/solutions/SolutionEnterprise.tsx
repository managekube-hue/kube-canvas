/** Enterprise Solutions: /solutions/by-market-size/enterprise: word-for-word from Solutions.docx pages 10-11 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function SolutionEnterprise() {
  return (
    <SolutionsNarrativePage
      category="Solutions › By Market Size"
      title="Enterprise Solutions"
      tagline="Complex Environments. Mature Teams. Global Operations."
      description="You Have a Mature Team. You Need a Partner That Operates at Your Level."
      sections={[
        {
          title: "The Enterprise Challenge",
          body: "Enterprise organizations have security programs. Analysts, engineers, architects, and governance structures are in place. Tooling has been deployed. Processes have been established. What is required is not a replacement for the internal team — it is a partner capable of operating alongside it: extending coverage, filling operational gaps, and handling what the internal team should not have to manage at scale. Enterprise Solutions deliver depth, scale, and architectural partnership for organizations with complex, multi-regulatory requirements.",
        },
        {
          title: "What Enterprises Need",
          items: [
            "Global 24/7 Coverage — Global operations span time zones. The internal team cannot maintain coverage across all of them. Coverage must match the operational footprint of the organization.",
            "Regulatory Depth — FedRAMP. CMMC. PCI-DSS. HIPAA. GDPR. ISO 27001. Regulatory obligations are extensive and overlap. Evidence is required, not assurances.",
            "Custom Integration — Existing tools, workflows, and governance processes represent institutional investment. Integration is required. Replacement is not on the table.",
            "Actionable Threat Intelligence — Adversary targeting is industry-specific. Intelligence must be curated, mapped to the organization's sector, and actionable — not generic threat feeds.",
            "Deception and Proactive Hunting — Proactive detection through honeypots, deception infrastructure, threat hunting, and external attack surface monitoring — finding adversaries before they find critical assets.",
            "Partnership at the Architectural Level — A partner who engages at the architecture, strategy, and roadmap level — not one that executes tickets and generates reports.",
          ],
        },
        {
          title: "Recommended Solutions",
          items: [
            "Managed SOC (Enterprise) — 24/7 security operations with full methodology through Document and Close. Threat hunting. Deception network. STRIKE intelligence integration.",
            "Managed Compliance — Continuous monitoring across 100+ frameworks. Automated evidence collection. Audit packages generated on demand.",
            "External Attack Surface Management — Continuous mapping of internet-exposed assets. Subdomain takeover detection. Cloud exposure monitoring.",
            "STRIKE Strategic Intelligence — Curated threat intelligence mapped to your industry. Dark web monitoring. Adversary campaign tracking.",
            "Honeypot & Deception Network — Decoy infrastructure that produces high-confidence detections with zero false positives.",
            "Advisory Services — Security assessments, penetration testing, and infrastructure audits from practitioners experienced in enterprise-scale environments.",
            "Custom Automation & Integration — Bespoke automation, workflow development, and system integration for enterprise-specific operational requirements.",
          ],
        },
        {
          title: "Enterprise Service Tier",
          body: "Enterprise organizations operate at the Enterprise tier, with full methodology coverage from Hunt through Close.",
          items: [
            "Enterprise — Complete lifecycle. Every incident documented, audited, and learned from. Compliance evidence generated automatically. Post-incident prevention recommendations filed.",
            "Delivery models include Fully Managed, Co-Managed, and Self-Managed, accommodating the full range of internal team structures.",
          ],
        },
      ]}
      ctaPrimary={{ label: "Contact Sales", href: "/contact" }}
      ctaSecondary={{ label: "Enterprise Service Tier", href: "/service-tiers/xme-enterprise" }}
      relatedLinks={[
        { label: "SMB Solutions", href: "/solutions/by-market-size/smb" },
        { label: "SME Solutions", href: "/solutions/by-market-size/sme" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
