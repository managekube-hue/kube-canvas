/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const contentScope = [
  { title: "Entity Relationship Correlation", desc: "The Data Graph ingests signals from every Service Layer capability and builds a dynamic graph of entity relationships — assets, users, processes, network flows, identities." },
  { title: "Cross-Discipline Correlation", desc: "This is what enables cross-discipline correlation: NDR catches the lateral movement, ITDR catches the identity abuse, Data Graph shows they're the same attack." },
  { title: "Example Correlation Scenarios", desc: "An endpoint connecting to an unusual external IP (NDR) while a privileged account logs in from a new location (ITDR) — the Data Graph correlates these into a single incident." },
  { title: "Analytics & Relationship Discovery", desc: "Surfaces the relationships that individual tools miss. Reduces objections from buyers with siloed point-tool experience." },
];

export default function KubricDataGraph() {
  return (
    <PageLayout>
      <PageBanner
        title="Kubric Data Graph"
        subtitle="The correlation engine that connects telemetry across all Service Layer capabilities and surfaces the relationships that individual tools miss."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">Platform Component</p>
          <h2 className="text-headline text-foreground mb-4">Real-Time Entity Relationship Correlation</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            The Data Graph ingests signals from every Service Layer capability and builds a dynamic graph of entity relationships — assets, users, processes, network flows, identities. Technical buyers understand the correlation depth. Reduces objections from buyers with siloed point-tool experience.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {contentScope.map((s, i) => (
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
            <Link to="/how-it-works/kubricai" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View KubricAI
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
