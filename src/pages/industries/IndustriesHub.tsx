import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const industries = [
  { name: "Manufacturing", block: "M2BLOCK", desc: "OT/IT convergence, predictive maintenance, and AI-powered quality control for production environments.", href: "/industries/manufacturing" },
  { name: "Healthcare", block: "H2BLOCK", desc: "HIPAA compliance, EHR performance, medical device management, and cyber recovery for clinical operations.", href: "/industries/healthcare" },
  { name: "Financial Services", block: "F2BLOCK", desc: "Real-time fraud detection, GRC management, and ransomware protection for mission-critical operations.", href: "/industries/financial-services" },
  { name: "Retail", block: "R2BLOCK", desc: "Omnichannel commerce, POS security, supply chain optimization, and customer data protection.", href: "/industries/retail" },
  { name: "Transportation", block: "T2BLOCK", desc: "Fleet management, logistics optimization, and infrastructure monitoring for transport operations.", href: "/industries/transportation" },
  { name: "Mining & Extraction", block: "X2BLOCK", desc: "Remote site connectivity, safety systems, and ruggedized infrastructure for extraction operations.", href: "/industries/mining-extraction" },
  { name: "Energy & Utilities", block: "E2BLOCK", desc: "SCADA/ICS security, grid monitoring, and NERC CIP compliance for critical infrastructure.", href: "/industries/energy-utilities" },
  { name: "Public Sector", block: "G2BLOCK", desc: "CJIS, FedRAMP, and FISMA compliance with secure citizen service delivery.", href: "/industries/public-sector" },
  { name: "Telecommunications", block: "C2BLOCK", desc: "Network resilience, 5G security, and service assurance for telecom providers.", href: "/industries/telecommunications" },
];

export default function IndustriesHub() {
  return (
    <PageLayout>
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-black min-h-[42vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-4">Industries</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              Purpose-built BLOCK platforms architected for the unique compliance, operational, and security demands of each vertical.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      <section className="section-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-title mb-10 border-l-4 border-brand-orange pl-4">Industry Platforms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={item.href} className="group block p-6 border border-border hover:border-brand-orange transition-colors bg-white h-full">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">{item.block}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center gap-1">Explore Platform <ArrowRight size={11} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
