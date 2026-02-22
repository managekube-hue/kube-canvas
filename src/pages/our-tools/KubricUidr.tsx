/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const capabilities = [
  "Unified detection and response orchestration",
  "How UIDR powers the Service Layer",
  "Remote monitoring and management",
  "Professional services automation",
  "Microsoft 365 administration",
  "Identity management and security baselines",
  "Patch management and deployment",
  "Response workflow management",
  "Multi-tenant architecture",
  "Operational interface for NOC/SOC teams",
];

export default function KubricUidr() {
  return (
    <PageLayout>
      <PageBanner
        title="Kubric UIDR"
        subtitle="The Unified Infrastructure Detection & Response platform. The orchestration and management layer that unifies detection signals from across the Service Layer."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">Platform Component</p>
          <h2 className="text-headline text-foreground mb-4">Unified Detection & Response Orchestration</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            UIDR is the orchestration and management layer. It unifies detection signals from across the Service Layer, manages response workflows, and provides the operational interface for NOC/SOC teams. For managed service buyers, it explains the technology backbone. For self-managed and open-source users, this page bridges to the technical documentation.
          </p>

          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {capabilities.map((cap, i) => (
              <motion.div key={cap} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-sm text-muted-foreground p-4 border border-border">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                {cap}
              </motion.div>
            ))}
          </div>

          <div className="p-8 border-2 border-brand-orange/20 bg-brand-orange/5 mb-12">
            <p className="text-sm font-bold text-foreground mb-2">Open Source / Self-Managed</p>
            <p className="text-sm text-muted-foreground mb-4">
              For self-managed and open-source users, full technical documentation, GitHub onboarding, and module docs are available on the Kubric UIDR documentation site.
            </p>
            <a href="https://kubricuidr.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:underline">
              Open Source Platform <ExternalLink size={14} />
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              See UIDR In Action <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/how-it-works/kubric-data-graph" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View Kubric Data Graph
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
