/** DO NOT TOUCH — v2.0 Service Layer module template */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

interface MethodologyStep {
  stage: string;
  desc: string;
}

interface ServiceLayerPageProps {
  category: string;
  name: string;
  headline: string;
  narrative: string[];
  capabilities: string[];
  capabilitiesHeading?: string;
  whatYouReceive?: string[];
  methodology?: MethodologyStep[];
  architectureNotes?: string[];
  similar?: { label: string; href: string }[];
}

export const ServiceLayerPage = ({
  category, name, headline, narrative, capabilities, capabilitiesHeading,
  whatYouReceive, methodology, architectureNotes, similar = []
}: ServiceLayerPageProps) => {
  return (
    <PageLayout>
      {/* Hero */}
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
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">{category}</span>
              <span className="text-white/30">·</span>
              <span className="text-xs font-bold tracking-widest uppercase text-white/50">SERVICE LAYER</span>
            </div>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-6">{name}</h1>
            <p className="text-xl text-white/80 font-semibold">{headline}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Narrative */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          {narrative.map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-6">{para}</p>
          ))}
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <h2 className="text-2xl font-black text-foreground mb-8">{capabilitiesHeading || "Core Capabilities"}</h2>
          <div className="space-y-3">
            {capabilities.map((cap, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-4 border border-border bg-white">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{cap}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Actually Receive */}
      {whatYouReceive && whatYouReceive.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <h2 className="text-2xl font-black text-foreground mb-8">What You Actually Receive</h2>
            {whatYouReceive.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Methodology Coverage */}
      {methodology && methodology.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <h2 className="text-2xl font-black text-foreground mb-8">Methodology Coverage</h2>
            <div className="space-y-3">
              {methodology.map((step, i) => (
                <motion.div key={step.stage} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-5 border border-border bg-white">
                  <h4 className="font-bold text-foreground mb-1">{step.stage}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Architecture Notes */}
      {architectureNotes && architectureNotes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            {architectureNotes.map((note, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">{note}</p>
            ))}
          </div>
        </section>
      )}

      {/* CTA + Related */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-tiers" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View Service Tiers
            </Link>
          </div>
          {similar.length > 0 && (
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Related Capabilities</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {similar.map((s) => (
                  <Link key={s.label} to={s.href}
                    className="group bg-white p-6 flex items-center justify-between hover:bg-secondary transition-colors">
                    <span className="text-sm font-semibold text-foreground group-hover:text-brand-orange transition-colors">{s.label}</span>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};
