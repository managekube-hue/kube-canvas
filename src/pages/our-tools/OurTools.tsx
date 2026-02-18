import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const tools = [
  { name: "How Kubric Works", desc: "Understand the architecture behind Kubric's unified infrastructure, operations, detection, and response platform. See how RMM, PSA, SIEM, and XDR capabilities work together to eliminate silos.", href: "/our-tools/how-kubric-works" },
  { name: "Kubric UIDR Platform", desc: "The core RMM, PSA, and Microsoft 365 management platform delivering unified IT operations at scale.", href: "/our-tools/kubric-uidr" },
  { name: "Kubric Data Graph", desc: "Real-time relationship mapping across infrastructure, identities, and security events for intelligent decision-making.", href: "/our-tools/kubric-data-graph" },
  { name: "KubricAI", desc: "AI-powered orchestration using CrewAI for predictive threat detection, automated remediation, and intelligent prioritization.", href: "/our-tools/kubric-ai" },
];

export default function OurTools() {
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
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-6">Our Tools</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              Discover the unified platform that powers detection, response, and operations across your entire infrastructure.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      <section className="section-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={tool.href} className="group block p-8 border border-border hover:border-brand-orange transition-colors">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tool.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Learn More <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
