import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const platforms = [
  {
    code: "XRO",
    name: "Small Business Platform",
    audience: "Small Business",
    tagline: "Complete security and operations for small businesses with 7 essential Kubes.",
    kubes: ["CIO KUBE", "NPM KUBE", "ITDR KUBE", "NDR KUBE", "VDR KUBE", "CFDR KUBE", "GRC KUBE"],
    href: "/products/xro",
    featured: false,
  },
  {
    code: "XMM",
    name: "SME Platform",
    audience: "Small/Medium Enterprise",
    tagline: "Advanced security and operations for growing organizations with 12 Kubes.",
    kubes: ["All 7 XRO Kubes", "MDM KUBE", "APM KUBE", "CDR KUBE", "ADR KUBE", "BDR KUBE"],
    href: "/products/xmm",
    featured: true,
  },
  {
    code: "XME",
    name: "Enterprise Platform",
    audience: "Enterprise",
    tagline: "Complete enterprise coverage with all 15 Kubes and premium capabilities.",
    kubes: ["All 12 XMM Kubes", "SDR KUBE", "DDR KUBE", "TI KUBE"],
    href: "/products/xme",
    featured: false,
  },
];

export default function Products() {
  return (
    <PageLayout>
      <section className="section-dark pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-4">Choose What's Right For You</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              Purpose-built security and operations platforms. &gt;90% MITRE ATT&CK coverage. Unified threat detection, correlation, and automated response powered by the Kubric Data Graph and KubricAI.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-off-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {platforms.map((p, i) => (
              <motion.div key={p.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative bg-white p-8 ${p.featured ? "ring-2 ring-brand-orange" : "border border-border"}`}>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1 uppercase tracking-wider">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">{p.audience}</span>
                  <h2 className="text-3xl font-black mt-2 mb-1">{p.code}</h2>
                  <p className="text-sm font-semibold text-muted-foreground">{p.name}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{p.tagline}</p>
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3">Included Kubes</h4>
                  <ul className="space-y-2">
                    {p.kubes.map((k) => (
                      <li key={k} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-brand-orange flex-shrink-0" />
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={p.href} className={`block text-center py-3 text-sm font-bold uppercase tracking-wider transition-colors ${p.featured ? "bg-brand-orange text-white hover:bg-brand-orange/90" : "border border-foreground hover:bg-foreground hover:text-white"}`}>
                  Learn More <ArrowRight size={14} className="inline ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
