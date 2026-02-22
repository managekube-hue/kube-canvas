import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { InteractiveKubeWheel } from "@/components/InteractiveKubeWheel";
// PageBanner now handles the child-page video internally

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface Block {
  id: string;
  name: string;
  description: string;
  details?: string;
  useCases?: string[];
  products?: string[];
}

interface KubePageTemplateProps {
  name: string;
  tagline: string;
  description: string;
  phase: string;
  narrative?: string;
  blocks: Block[];
  deliverables: string[];
  relatedKubes: { name: string; href: string }[];
}

export const KubePageTemplate = ({
  name,
  tagline,
  description,
  phase,
  narrative,
  blocks,
  deliverables,
  relatedKubes,
}: KubePageTemplateProps) => {
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);

  const toggleBlock = (blockId: string) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId]
    );
  };

  // Create IDs for blocks if not provided
  const blocksWithIds = blocks.map((block, i) => ({
    ...block,
    id: block.id || `block-${i}`,
  }));

  return (
    <PageLayout>
      {/* Gradient Banner */}
      <PageBanner title={name} subtitle={description} phase={phase} />

      {/* Narrative Section */}
      {narrative && (
        <section className="py-20 lg:py-24 bg-white border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-label text-muted-foreground mb-6"
              >
                OVERVIEW
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-body-xl text-foreground leading-relaxed"
              >
                {narrative}
              </motion.p>
            </div>
          </div>
        </section>
      )}

      {/* Block Buttons - Quick access for non-wheel users */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <p className="text-label text-muted-foreground mb-2">{tagline}</p>
            <h2 className="text-xl font-bold text-foreground">
              Quick Access: Select Blocks
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {blocksWithIds.map((block, index) => (
              <motion.button
                key={block.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  setActiveBlock(block);
                  document.getElementById('wheel-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-5 py-3 text-sm font-semibold transition-all border-2 ${
                  activeBlock?.id === block.id
                    ? "border-foreground bg-foreground text-white"
                    : selectedBlocks.includes(block.id)
                    ? "border-brand-orange bg-brand-orange text-white"
                    : "border-border bg-white text-foreground hover:border-foreground"
                }`}
              >
                {block.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Wheel Section - 60% left, 40% right */}
      <section id="wheel-section" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-label text-muted-foreground mb-2"
            >
              INTERACTIVE CONFIGURATION
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl font-bold text-foreground"
            >
              Explore {name.replace(" Kube", "").replace(" Module", "")} Blocks
            </motion.h2>
          </div>

          <InteractiveKubeWheel
            kubeName={name}
            blocks={blocksWithIds}
            selectedBlocks={selectedBlocks}
            onToggleBlock={toggleBlock}
            activeBlock={activeBlock}
            onSetActiveBlock={setActiveBlock}
          />
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="text-label text-background/50 mb-6">What You Get</p>
                <h2 className="text-headline text-background">Deliverables</h2>
              </div>
              <div className="space-y-4">
                {deliverables.map((d, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-body-lg text-background/80 border-l-4 border-brand-orange pl-6 py-2"
                  >
                    {d}
                  </motion.p>
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
            <p className="text-label text-muted-foreground mb-12">Related Modules</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedKubes.map((kube) => (
                <Link
                  key={kube.name}
                  to={kube.href}
                  className="group border-t-2 border-border pt-6 hover:border-brand-orange transition-colors"
                >
                  <h3 className="text-title text-foreground mb-2 group-hover:translate-x-2 transition-transform">
                    {kube.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};
