import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const bySector = [
  { name: "Manufacturing", desc: "OT/IT convergence, supply chain security, and intellectual property protection.", href: "/solutions/manufacturing" },
  { name: "Healthcare", desc: "HIPAA compliance, PHI protection, and medical device security.", href: "/solutions/healthcare" },
  { name: "Public Sector", desc: "CJIS, FedRAMP, and government compliance for state & local.", href: "/solutions/public-sector" },
  { name: "Financial Services", desc: "PCI-DSS, SOX compliance, and financial fraud prevention.", href: "/solutions/financial-services" },
  { name: "Retail", desc: "PCI-DSS, supply chain risk, and customer data protection.", href: "/solutions/retail" },
  { name: "Technology (MSPs/MSSPs)", desc: "Multi-tenant platforms and white-label security solutions.", href: "/solutions/technology" },
];

const bySize = [
  { name: "SMB", desc: "Turnkey security and operations for small businesses with limited IT staff.", href: "/solutions/smb" },
  { name: "SME", desc: "Flexible platform for growing mid-market companies.", href: "/solutions/sme" },
  { name: "Enterprise", desc: "Enterprise-grade customization, dedicated support, and advanced features.", href: "/solutions/enterprise" },
];

export default function SolutionsHub() {
  return (
    <PageLayout>
      <section className="section-dark pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-4">Solutions</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              Industry-specific and market-tailored solutions that address unique compliance and operational needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-title mb-10 border-l-4 border-brand-orange pl-4">By Industry</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bySector.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={item.href} className="group block p-6 border border-border hover:border-brand-orange transition-colors">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center gap-1">View Solutions <ArrowRight size={11} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-off-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-title mb-10 border-l-4 border-brand-orange pl-4">By Market Size</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {bySize.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={item.href} className="group block p-6 bg-white border border-border hover:border-brand-orange transition-colors">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center gap-1">Explore <ArrowRight size={11} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
