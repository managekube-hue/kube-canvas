/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const sections = [
  { title: "Ingestion Layer", desc: "How data enters from Service Layer capabilities. Every module feeds telemetry into Kubric's unified ingestion pipeline — endpoints, network flows, cloud APIs, identity events, and application traces." },
  { title: "Kubric Data Graph", desc: "The correlation engine builds a dynamic graph of entity relationships — assets, users, processes, network flows, identities. NDR catches the lateral movement, ITDR catches the identity abuse, Data Graph shows they're the same attack." },
  { title: "KubricAI", desc: "Detection and prioritization. KubricAI reduces alert noise, prioritizes signals by risk and context, assists triage with recommended actions, and learns from analyst decisions over time." },
  { title: "Response Orchestration", desc: "How actions are triggered. Automated response playbooks execute across the Service Layer — isolating endpoints, revoking credentials, blocking network segments — all orchestrated through a single platform." },
];

export default function HowKubricWorks() {
  return (
    <PageLayout>
      <PageBanner
        title="Platform Overview"
        subtitle="Deep-dive into how the Kubric platform architecture works end-to-end — ingestion, correlation, detection, and response orchestration."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">Architecture</p>
          <h2 className="text-headline text-foreground mb-4">Service Layer → Platform → Response</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Full platform architecture overview. How telemetry from all Service Layer capabilities flows into Kubric, how the Data Graph correlates signals, and how KubricAI surfaces prioritized detections. Technical buyers — IT directors, security architects — understand the platform depth. This reduces the 'is this just a SIEM wrapper?' objection.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {sections.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 border border-border">
                <h3 className="text-lg font-black text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              See It In Your Environment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/how-it-works/kubric-uidr" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View Kubric UIDR
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
