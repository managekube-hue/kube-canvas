import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Block {
  id: string;
  name: string;
  description: string;
  details?: string;
  useCases?: string[];
  compliance?: string[];
}

interface KubePageTemplateProps {
  name: string;
  tagline: string;
  description: string;
  phase: string;
  blocks: Block[];
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

      {/* Interactive Wheel Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-label text-muted-foreground mb-4"
            >
              {tagline}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-headline text-foreground"
            >
              Explore {name.replace(" Kube", "")} Blocks
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Visual Wheel */}
            <div className="relative flex items-center justify-center min-h-[450px] lg:min-h-[550px]">
              {/* Center hub */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center z-10 shadow-xl"
                style={{ background: "hsl(24 95% 53%)" }}
              >
                <span className="text-white font-bold text-center text-sm lg:text-base leading-tight px-4">
                  {name.replace(" Kube", "").toUpperCase()}
                  <br />
                  KUBE
                </span>
              </motion.div>

              {/* Block nodes in circular layout */}
              {blocksWithIds.map((block, index) => {
                const angleStep = 360 / blocksWithIds.length;
                const angle = (index * angleStep - 90) * (Math.PI / 180);
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = selectedBlocks.includes(block.id);
                const isActive = activeBlock?.id === block.id;

                return (
                  <motion.button
                    key={block.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                    onClick={() => setActiveBlock(block)}
                    className={`absolute w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-center p-2 lg:p-3 transition-all duration-300 cursor-pointer border-2 shadow-lg ${
                      isActive
                        ? "border-foreground bg-foreground text-white scale-110 z-20"
                        : isSelected
                        ? "border-[hsl(24_95%_53%)] bg-[hsl(24_95%_53%)] text-white"
                        : "border-border bg-white hover:border-foreground hover:scale-105"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <span className="text-[10px] lg:text-xs font-semibold leading-tight">
                      {block.name}
                    </span>
                  </motion.button>
                );
              })}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
                {blocksWithIds.map((block, index) => {
                  const angleStep = 360 / blocksWithIds.length;
                  const angle = (index * angleStep - 90) * (Math.PI / 180);
                  const x2 = 250 + Math.cos(angle) * 140;
                  const y2 = 250 + Math.sin(angle) * 140;
                  const isSelected = selectedBlocks.includes(block.id);
                  return (
                    <motion.line
                      key={block.id}
                      x1="250"
                      y1="250"
                      x2={x2}
                      y2={y2}
                      stroke={isSelected ? "hsl(24 95% 53%)" : "hsl(0 0% 85%)"}
                      strokeWidth="2"
                      strokeDasharray={isSelected ? "0" : "6"}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Detail Panel */}
            <div className="lg:pl-8">
              {activeBlock ? (
                <motion.div
                  key={activeBlock.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-headline text-foreground mb-4">
                      {activeBlock.name}
                    </h3>
                    <p className="text-body-lg text-muted-foreground">
                      {activeBlock.description}
                    </p>
                  </div>

                  {activeBlock.details && (
                    <div className="border-t border-border pt-8">
                      <h4 className="text-label text-muted-foreground mb-4">
                        What's Included
                      </h4>
                      <p className="text-body text-foreground">{activeBlock.details}</p>
                    </div>
                  )}

                  {activeBlock.useCases && activeBlock.useCases.length > 0 && (
                    <div className="border-t border-border pt-8">
                      <h4 className="text-label text-muted-foreground mb-4">
                        Use Cases
                      </h4>
                      <ul className="space-y-3">
                        {activeBlock.useCases.map((useCase, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-body text-foreground"
                          >
                            <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => toggleBlock(activeBlock.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                        selectedBlocks.includes(activeBlock.id)
                          ? "bg-foreground text-white"
                          : "bg-brand-orange text-white hover:bg-opacity-90"
                      }`}
                    >
                      {selectedBlocks.includes(activeBlock.id) ? (
                        <>
                          <Check className="w-5 h-5" />
                          Added to BOM
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          Add to BOM
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 bg-secondary/50"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-6">
                    <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-body-xl text-muted-foreground">
                    Click a block in the wheel
                    <br />
                    to explore capabilities
                  </p>
                </motion.div>
              )}

              {/* Selected blocks summary */}
              {selectedBlocks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-8 bg-foreground text-white"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingCart className="w-5 h-5" />
                    <h4 className="text-label text-white">
                      Selected Blocks ({selectedBlocks.length})
                    </h4>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {selectedBlocks.map((id) => {
                      const block = blocksWithIds.find((b) => b.id === id);
                      return block ? (
                        <li
                          key={id}
                          className="flex items-center gap-3 text-body text-white/80"
                        >
                          <Check className="w-4 h-4 text-brand-orange" />
                          {block.name}
                        </li>
                      ) : null;
                    })}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary text-sm py-3 px-6">
                      Request Quote
                    </Link>
                    <Link
                      to="/#assessment"
                      className="bg-white text-foreground px-6 py-3 font-semibold text-sm hover:bg-white/90 transition-colors"
                    >
                      Take Assessment
                    </Link>
                  </div>
                </motion.div>
              )}
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
            <p className="text-label text-muted-foreground mb-12">Related Kubes</p>
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

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-headline text-foreground mb-8">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#assessment" className="btn-primary">
                Start Free Assessment
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
