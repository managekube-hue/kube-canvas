/** By Service Type: /solutions/by-service-type, word-for-word from Solutions.docx page 13 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function ByServiceType() {
  return (
    <SolutionsNarrativePage
      category="Solutions"
      title="By Service Type"
      tagline="One Service Provider. Three Ways to Operate."
      description="Choose How You Want to Operate."
      sections={[
        {
          title: "Your Operational Model",
          body: "Not every organization wants the same operational relationship with its service partner. Some want full outsourcing: outcomes delivered without internal management. Some want partnership: involvement in triage and response during business hours, with coverage extended for nights and weekends. Some want the tools and architecture, operated entirely by their own team. By Service Type allows you to select your operational model: Fully Managed, Co-Managed, or Self-Managed.",
        },
        {
          title: "Service Types",
          items: [
             "Fully Managed: We operate everything. Your team receives outcomes. 24/7 coverage. No tool tuning. No staffing requirements. Results delivered continuously.",
            "Co-Managed: We operate the core. Your team participates in triage and response during business hours. You retain visibility and decision authority. We extend coverage for nights, weekends, and holidays.",
            "Self-Managed: You operate the tools. We provide the architecture, continuous updates, and technical support. Your team runs its own detection and response program on enterprise-grade infrastructure.",
          ],
        },
      ]}
      ctaPrimary={{ label: "Fully Managed", href: "/solutions/by-service-type/fully-managed" }}
      ctaSecondary={{ label: "Co-Managed", href: "/solutions/by-service-type/co-managed" }}
      ctaTertiary={{ label: "Self-Managed", href: "/solutions/by-service-type/self-managed" }}
      relatedLinks={[
        { label: "By Market Size", href: "/solutions/by-market-size" },
        { label: "Find By Problem", href: "/find-by-problem" },
        { label: "Service Tiers", href: "/service-tiers" },
      ]}
    />
  );
}
