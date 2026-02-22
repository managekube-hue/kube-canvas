/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const tools = [
  { name: "Platform Overview", desc: "Full platform architecture overview. How telemetry from all Service Layer capabilities flows into Kubric, how the Data Graph correlates signals, and how KubricAI surfaces prioritized detections.", href: "/how-it-works/platform-overview" },
  { name: "Kubric UIDR", desc: "The orchestration and management layer. It unifies detection signals from across the Service Layer, manages response workflows, and provides the operational interface for NOC/SOC teams.", href: "/how-it-works/kubric-uidr" },
  { name: "Kubric Data Graph", desc: "The correlation engine that connects telemetry across all Service Layer capabilities and surfaces the relationships that individual tools miss.", href: "/how-it-works/kubric-data-graph" },
  { name: "KubricAI", desc: "The machine learning and AI layer that drives detection prioritization, automated triage, and intelligent response recommendations across the Service Layer.", href: "/how-it-works/kubricai" },
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
            <h1 className="text-headline text-white mb-6">How It Works</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              The technology platform that delivers the Service Layer capabilities. This is how ManageKube actually does it — orchestration, correlation, and AI-assisted detection.
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

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">ManageKube is backed by a real platform — not a patchwork of third-party tools. The Service Layer runs on Kubric.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
                See It In Your Environment <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/service-layer" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
                View Service Layer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
