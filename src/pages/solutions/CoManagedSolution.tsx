/** Co-Managed — /solutions/by-service-type/co-managed — word-for-word from Solutions.docx page 15 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function CoManagedSolution() {
  return (
    <SolutionsNarrativePage
      category="Solutions › By Service Type"
      title="Co-Managed"
      tagline="We Operate. You Participate."
      description="You Want Visibility and Control. You Do Not Want 24/7 Platform Management."
      sections={[
        {
          title: "The Co-Managed Model",
          body: "Co-Managed is for organizations with internal security staff who intend to remain operationally involved. The team wants to see what is happening, participate in triage decisions, and engage in response during business hours. But it does not want to manage the platform continuously or maintain a follow-the-sun staffing model to cover nights, weekends, and holidays. Co-Managed delivers: we operate the Kubric platform continuously. Your team participates in triage and response during business hours. We cover what your team does not.",
        },
        {
          title: "What Co-Managed Includes",
          items: [
            "24/7 Platform Operations — We monitor, tune, and maintain the Kubric platform continuously. Your team does not manage the platform.",
            "Business Hours Participation — Your team receives alerts during business hours. You triage, make decisions, and participate in response according to your internal processes.",
            "After-Hours Coverage — We handle nights, weekends, and holidays. Incidents are triaged and contained. Your team is briefed at the start of the next business day with full context.",
            "Shared Methodology — We handle Hunt, Identify, and Alert continuously. Triage, Diagnose, and Remediate are shared based on your team's availability. Document and Close are handled by whoever closes the incident.",
            "Compliance Evidence — Evidence is collected automatically. Audit packages are generated on demand.",
            "Quarterly Business Reviews — Incidents, trends, and recommendations reviewed with your team on a defined cadence.",
          ],
        },
        {
          title: "Who It Is For",
          items: [
            "Organizations with in-house security staff during business hours",
            "Organizations that want visibility and operational involvement without 24/7 coverage burden",
            "Teams building internal security maturity with partner support as a complement",
            "Organizations that need after-hours coverage but want to retain daytime decision authority",
          ],
        },
      ]}
      ctaPrimary={{ label: "Contact Sales", href: "/contact" }}
      ctaSecondary={{ label: "View Service Tiers", href: "/service-tiers" }}
      relatedLinks={[
        { label: "Fully Managed", href: "/solutions/by-service-type/fully-managed" },
        { label: "Self-Managed", href: "/solutions/by-service-type/self-managed" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
