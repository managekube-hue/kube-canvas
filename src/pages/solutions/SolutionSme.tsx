/** SME Solutions: /solutions/by-market-size/sme: word-for-word from Solutions.docx pages 8-9 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function SolutionSme() {
  return (
    <SolutionsNarrativePage
      category="Solutions › By Market Size"
      title="SME Solutions"
      tagline="Growing Organizations. Growing Requirements."
      description="You Have Grown Beyond Startup Mode. Your Security Program Needs to Keep Pace."
      sections={[
        {
          title: "The SME Challenge",
          body: "SME organizations have dedicated IT and security staff. The team has grown beyond a single generalist. But it is stretched thin. Compliance pressure is intensifying: SOC 2, ISO 27001, CMMC, HIPAA, PCI. Environments have grown more complex. The tools and processes that functioned at 50 employees are creating friction at 500. SME Solutions deliver the operational depth the organization requires without the overhead it cannot absorb.",
        },
        {
          title: "What SMEs Need",
          items: [
            "Depth Without Overhead: Threat hunting, vulnerability prioritization, cloud security posture management, capabilities that require depth to operate, without adding headcount to manage each one.",
            "Compliance Acceleration: Audits are on the calendar. SOC 2. ISO 27001. CMMC. Possibly HIPAA or PCI. Compliance posture must be built, maintained, and evidenced without a dedicated compliance function.",
            "Cloud Visibility and Control: Cloud presence has expanded, possibly across multiple providers. Costs are drifting. Security posture is fragmented. Visibility and control are required across all of it.",
            "Tool Consolidation: Tools have accumulated. They do not share data or context. The team needs a unified service provider, not an expanding portfolio of point solutions.",
            "Partnership, Not Just Vendor Relationship: A partner who understands the business, engages at a strategic level, and is capable of growing alongside the organization.",
          ],
        },
        {
          title: "Recommended Solutions",
          items: [
            "Managed SOC: 24/7 security operations with threat hunting. Full methodology coverage through remediation and closure.",
            "Managed Compliance: Continuous monitoring across multiple frameworks simultaneously. Automated evidence collection. Audit packages generated on demand.",
            "Managed Cloud & FinOps: Cloud cost optimization and security monitoring across AWS, Azure, and GCP. Right-sizing recommendations with projected savings.",
            "Network Performance Monitoring: Proactive network visibility with behavioral baselining before users report degradation.",
            "Advisory Services: Security assessments, penetration testing, and compliance gap analysis when deep practitioner expertise is required.",
          ],
        },
        {
          title: "SME Service Tiers",
          body: "SME organizations typically engage at the Advanced tier, with Enterprise capabilities added as compliance requirements intensify.",
          items: [
            "Advanced: Full detection through remediation. Incidents contained and resolved without overhead.",
            "Enterprise: Complete lifecycle through documentation and closure for regulated industries requiring audit-grade evidence.",
          ],
        },
      ]}
      ctaPrimary={{ label: "Contact Sales", href: "/contact" }}
      ctaSecondary={{ label: "View Service Tiers", href: "/service-tiers" }}
      relatedLinks={[
        { label: "SMB Solutions", href: "/solutions/by-market-size/smb" },
        { label: "Enterprise Solutions", href: "/solutions/by-market-size/enterprise" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
