/** Fully Managed — /solutions/by-service-type/fully-managed — word-for-word from Solutions.docx pages 14 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function FullyManagedSolution() {
  return (
    <SolutionsNarrativePage
      category="Solutions › By Service Type"
      title="Fully Managed"
      tagline="We Operate. You Receive Outcomes."
      description="You Have a Business to Operate. Let Us Operate the Security."
      sections={[
        {
          title: "The Fully Managed Model",
          body: "Fully Managed is for organizations that require security outcomes without security operational overhead. The organization does not want to manage tools, tune detections, or staff a 24/7 security operations center. It wants threats detected, incidents responded to, compliance maintained, and evidence produced — without directing internal resources toward how those outcomes are achieved. Fully Managed delivers: we operate the Kubric platform continuously. Your team receives outcomes.",
        },
        {
          title: "What Fully Managed Includes",
          items: [
            "24/7 Platform Operations — We monitor, tune, and maintain the Kubric platform continuously. Your team has no platform management responsibilities.",
            "Full Methodology Coverage — Every detection runs through Hunt, Identify, Alert, Triage, Diagnose, Remediate, Document, and Close — according to your service tier.",
            "Incident Response — We respond to incidents. We contain, remediate, document, and close. Your team is notified of outcomes, not tasked with producing them.",
            "Compliance Evidence — Evidence is collected automatically throughout operations. Audit packages are generated on demand without manual preparation.",
            "Quarterly Business Reviews — Incidents, trends, and forward-looking recommendations reviewed with your leadership on a defined cadence.",
            "Dedicated Service Delivery Manager — One named point of contact. One team that maintains continuity of knowledge about your environment.",
          ],
        },
        {
          title: "Who It Is For",
          items: [
            "Organizations without 24/7 security staff",
            "Organizations that want detection and response entirely managed externally",
            "Lean IT and security teams stretched across too many priorities",
            "Organizations that require security outcomes without the operational overhead of producing them internally",
          ],
        },
      ]}
      ctaPrimary={{ label: "Contact Sales", href: "/contact" }}
      ctaSecondary={{ label: "View Service Tiers", href: "/service-tiers" }}
      relatedLinks={[
        { label: "Co-Managed", href: "/solutions/by-service-type/co-managed" },
        { label: "Self-Managed", href: "/solutions/by-service-type/self-managed" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
