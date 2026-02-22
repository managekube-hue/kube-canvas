/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const contentScope = [
  "KubricAI overview — ML-driven detection prioritization",
  "How KubricAI assists triage and recommended response",
  "Learning from analyst decisions",
  "Integration with Service Layer capabilities",
  "AI-assisted vs fully automated — where human judgment is preserved",
];

export default function KubricAi() {
  return (
    <PageLayout>
      <PageBanner
        title="KubricAI"
        subtitle="The machine learning and AI layer that drives detection prioritization, automated triage, and intelligent response recommendations across the Service Layer."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">AI Platform</p>
          <h2 className="text-headline text-foreground mb-4">AI-Assisted Detection & Response</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            KubricAI reduces alert noise, prioritizes signals by risk and context, assists triage with recommended actions, and learns from analyst decisions over time. It is not a chatbot — it is the intelligence layer that makes a 24/7 managed service operationally viable at scale.
          </p>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            ManageKube's managed service is AI-assisted, not just human-labor-scaled. This reduces the 'we can do this in-house' objection.
          </p>

          <div className="grid gap-4 mb-16">
            {contentScope.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 border border-border">
                <span className="text-brand-orange font-bold mt-0.5 text-lg">▸</span>
                <p className="text-foreground font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              See It In Your Environment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-layer/strike" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View STRIKE Strategic Intelligence
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
