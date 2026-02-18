/** Shared template for compliance framework pages */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

interface ComplianceDetailPageProps {
  framework: string;
  fullName: string;
  audience: string;
  description: string;
  features: string[];
  similar?: { label: string; href: string }[];
}

export const ComplianceDetailPage = ({ framework, fullName, audience, description, features, similar = [] }: ComplianceDetailPageProps) => {
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
            <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">Compliance Framework</span>
            <div className="h-1 w-16 bg-brand-orange my-6" />
            <h1 className="text-headline text-white mb-3">{framework}</h1>
            <p className="text-xl text-brand-orange italic mb-4">{fullName}</p>
            <p className="text-sm text-white/50 mb-6 uppercase tracking-wider">{audience}</p>
            <p className="text-body-lg text-white/70 max-w-2xl">{description}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
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

      {/* You May Also Like */}
      {similar.length > 0 && (
        <section className="section-white py-16 border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-10">You May Also Like</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {similar.map((s) => (
                <Link
                  key={s.label}
                  to={s.href}
                  className="group bg-white p-8 flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-brand-orange transition-colors">{s.label}</span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};
