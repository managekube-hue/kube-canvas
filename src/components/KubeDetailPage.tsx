/** Shared template for all 15 new Kube detail pages */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Capability {
  title: string;
  items: string[];
}

interface KubeDetailPageProps {
  code: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  fullDescription: string;
  capabilities: Capability[];
  similar?: { label: string; href: string }[];
}

export const KubeDetailPage = ({
  code, name, tagline, category, description, fullDescription, capabilities, similar = []
}: KubeDetailPageProps) => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-dark pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">{category}</span>
                <span className="text-white/30">·</span>
                <span className="text-xs font-bold tracking-widest uppercase text-white/50">KUBES</span>
              </div>
              <div className="h-1 w-16 bg-brand-orange mb-8" />
              <h1 className="text-display text-white mb-3">
                <span className="text-brand-orange">{code}</span>
              </h1>
              <p className="text-2xl font-semibold text-white mb-4">{name}</p>
              <p className="text-xl text-white/60 mb-6 italic">{tagline}</p>
              <p className="text-body-lg text-white/70 max-w-2xl">{description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full description */}
      <section className="section-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-body-lg text-muted-foreground leading-relaxed">{fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-off-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-title mb-12">Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white p-8"
              >
                <h3 className="text-lg font-bold mb-4 text-foreground">{cap.title}</h3>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-brand-orange mt-1 flex-shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
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
