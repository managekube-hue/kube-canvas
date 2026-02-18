/** Shared template for compliance framework pages */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

interface ComplianceDetailPageProps {
  framework: string;
  fullName: string;
  audience: string;
  description: string;
  features: string[];
}

export const ComplianceDetailPage = ({ framework, fullName, audience, description, features }: ComplianceDetailPageProps) => {
  return (
    <PageLayout>
      <section className="section-dark pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">Compliance Framework</span>
            <div className="h-1 w-16 bg-brand-orange my-6" />
            <h1 className="text-headline text-white mb-3">{framework}</h1>
            <p className="text-xl text-brand-orange italic mb-4">{fullName}</p>
            <p className="text-sm text-white/50 mb-6 uppercase tracking-wider">{audience}</p>
            <p className="text-body-lg text-white/70 max-w-2xl">{description}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-off-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-title mb-10">Features & Coverage</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white p-5 flex items-start gap-3">
                <Shield size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start your {framework} compliance journey</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/assessment" className="btn-primary inline-flex items-center gap-2">Free Gap Analysis <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-secondary">Talk to a Compliance Expert</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
