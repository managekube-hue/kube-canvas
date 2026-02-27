/** Self-Managed: /solutions/by-service-type/self-managed: word-for-word from Solutions.docx pages 16-17 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function SelfManagedSolution() {
  return (
    <SolutionsNarrativePage
      category="Solutions › By Service Type"
      title="Self-Managed"
      tagline="You Operate. We Provide the Toolset."
      description="You Have a Mature Team. You Want Enterprise-Grade Infrastructure Without Building It Yourself."
      sections={[
        {
          title: "The Self-Managed Model",
          body: "Self-Managed is for organizations with experienced security teams who intend to operate their own detection and response program, but have no interest in building and maintaining the underlying infrastructure from scratch. The same Kubric architecture that powers ManageKube managed services is available as a licensed toolset for internal operation. Self-Managed delivers: we provide the toolset, updates, and support. Your team runs detection and response.",
        },
        {
          title: "What Self-Managed Includes",
          items: [
             "Kubric License: Full access to the Kubric toolset with all 23 capabilities available for internal operation.",
            "Continuous Updates: Toolset updates, new detection capabilities, and threat intelligence feeds delivered continuously without manual intervention.",
            "Documentation and Training: Comprehensive documentation and structured training for your internal team.",
            "Support Access: Technical support for configuration questions and capability questions.",
            "Community Access: Access to the user community, shared detection content, and documented best practices.",
            "Optional Advisory Services: Access to ManageKube assessments, penetration testing, and consulting engagements when deep external expertise is required.",
          ],
        },
        {
          title: "What Self-Managed Does Not Include",
          items: [
            "24/7 operations — your team operates the toolset",
            "Incident response — your team responds to incidents",
            "Detection tuning and optimization — your team tunes and maintains detection logic",
            "Compliance evidence collection configuration — your team configures evidence collection workflows",
          ],
        },
        {
          title: "Who It Is For",
          items: [
            "Mature security organizations with experienced analysts and engineers",
            "Organizations that require full operational control over detection and response",
            "Organizations with compliance or regulatory requirements that mandate in-house security operations",
            "Organizations with the staffing and expertise to operate an enterprise-grade security program internally",
          ],
        },
      ]}
      ctaPrimary={{ label: "Contact Sales", href: "/contact" }}
      ctaSecondary={{ label: "View Service Tiers", href: "/service-tiers" }}
      relatedLinks={[
        { label: "Fully Managed", href: "/solutions/by-service-type/fully-managed" },
        { label: "Co-Managed", href: "/solutions/by-service-type/co-managed" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
