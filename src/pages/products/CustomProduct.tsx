/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const useCases = [
  { title: "Co-Managed IT Teams", desc: "Your team runs day-to-day operations. Our engineers augment your staff with specialized capabilities — SOC, compliance, cloud security — on demand." },
  { title: "Channel Partners & White-Label", desc: "MSPs and MSSPs can white-label ManageKube's Service Layer capabilities under their own brand with full multi-tenant architecture support." },
  { title: "Vertical-Specific Requirements", desc: "Regulated industries with unique compliance stacks, OT/IT convergence needs, or non-standard security requirements get a capability set built for their context." },
  { title: "Bespoke Engagements", desc: "Any combination of Service Layer capabilities assembled for a specific client context. No standard tier required — build exactly what you need." },
];

export default function CustomProduct() {
  return (
    <PageLayout>
      <PageBanner
        title="Custom Tier"
        subtitle="Tailored capability selection — any combination of Service Layer capabilities assembled for your specific context."
        phase="Service Tiers"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">Bespoke Engagements</p>
          <h2 className="text-headline text-foreground mb-4">Not every organization fits a standard tier</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Custom Tier captures the enterprise-adjacent and channel partner deals that require a direct sales conversation. Co-managed augmentation, white-label delivery for MSPs/MSSPs, or vertical-specific capability stacks.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {useCases.map((uc) => (
              <div key={uc.title} className="p-8 border border-border">
                <h3 className="text-lg font-black text-foreground mb-3">{uc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-tiers/xme-enterprise" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View Enterprise Tier
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
