/** By Market Size: /solutions/by-market-size, word-for-word from Solutions.docx page 5 */
import { SolutionsNarrativePage } from "@/components/SolutionsNarrativePage";

export default function ByMarketSize() {
  return (
    <SolutionsNarrativePage
      category="Solutions"
      title="By Market Size"
      tagline="Solutions Structured for SMB, SME, and Enterprise."
      description="Your Size Determines Your Needs. Your Solution Should Match."
      sections={[
        {
          title: "Your Size Determines Your Needs",
          body: "A 50-person company has different security and IT requirements than a 500-person company. A 5,000-person enterprise has different requirements than both. Compliance obligations scale. Threat profiles scale. Team maturity scales. Budget scales. A solution designed for one size does not serve the others well.",
        },
      ]}
      tableData={[
        { col1: "SMB", col2: "50–250 employees.", col3: "Lean teams. Growing fast. Need enterprise-grade coverage without enterprise-grade complexity." },
        { col1: "SME", col2: "250–1,000 employees.", col3: "Dedicated IT and security staff. Multiple locations. Compliance pressure increasing." },
        { col1: "Enterprise", col2: "1,000+ employees.", col3: "Mature teams. Complex environments. Extensive regulatory requirements. Global operations." },
      ]}
      ctaPrimary={{ label: "SMB Solutions", href: "/solutions/by-market-size/smb" }}
      ctaSecondary={{ label: "SME Solutions", href: "/solutions/by-market-size/sme" }}
      ctaTertiary={{ label: "Enterprise Solutions", href: "/solutions/by-market-size/enterprise" }}
      relatedLinks={[
        { label: "Find By Problem", href: "/find-by-problem" },
        { label: "By Service Type", href: "/solutions/by-service-type" },
        { label: "By Industry", href: "/solutions/by-industry" },
      ]}
    />
  );
}
