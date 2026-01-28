import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface KubePageTemplateProps {
  name: string;
  tagline: string;
  description: string;
  phase: string;
  blocks: { name: string; description: string }[];
  deliverables: string[];
  relatedKubes: { name: string; href: string }[];
}

export const KubePageTemplate = ({
  name,
  tagline,
  description,
  phase,
  blocks,
  deliverables,
  relatedKubes,
}: KubePageTemplateProps) => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
                {phase} Phase
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-sm text-muted-foreground">{tagline}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-8"
            >
              {name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-12"
            >
              Blocks in this Kube
            </motion.p>
            <div className="space-y-0">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-border py-10 lg:py-12"
                >
                  <div className="grid lg:grid-cols-2 gap-6">
                    <h3 className="font-display text-2xl lg:text-3xl text-foreground">{block.name}</h3>
                    <p className="font-mono text-base lg:text-lg text-muted-foreground leading-relaxed">{block.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.25em] text-background/50 mb-6">
                  What You Get
                </p>
                <h2 className="font-display text-4xl lg:text-5xl text-background">
                  Deliverables
                </h2>
              </div>
              <div className="space-y-4">
                {deliverables.map((d, i) => (
                  <p key={i} className="font-mono text-lg text-background/80 border-l-2 border-background/30 pl-6">
                    {d}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Kubes */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-12">
              Related Kubes
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedKubes.map((kube) => (
                <Link
                  key={kube.name}
                  to={kube.href}
                  className="group border-t border-border pt-6"
                >
                  <h3 className="font-display text-2xl text-foreground mb-2 group-hover:translate-x-2 transition-transform">
                    {kube.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-8">
              Ready to get started?
            </h2>
            <a
              href="/#assessment"
              className="inline-flex items-center justify-center bg-foreground text-background px-10 py-5 font-mono text-base uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Start Free Assessment
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
