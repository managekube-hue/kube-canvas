import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Block {
  id: string;
  name: string;
  description: string;
  details?: string;
  useCases?: string[];
  products?: string[];
}

interface MethodologyWheelProps {
  kubeName: string;
  kubeColor?: string;
  blocks: Block[];
  selectedBlocks: string[];
  onToggleBlock: (blockId: string) => void;
  activeBlock: Block | null;
  onSetActiveBlock: (block: Block | null) => void;
}

export const MethodologyWheel = ({
  kubeName,
  blocks,
  selectedBlocks,
  onToggleBlock,
  activeBlock,
  onSetActiveBlock,
}: MethodologyWheelProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Visual Wheel */}
      <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
        {/* Outer ring decoration */}
        <div className="absolute w-[420px] h-[420px] lg:w-[520px] lg:h-[520px] rounded-full border border-border/30" />
        <div className="absolute w-[350px] h-[350px] lg:w-[430px] lg:h-[430px] rounded-full border border-border/20" />
        
        {/* Center hub - Kube name */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-foreground flex items-center justify-center z-10 shadow-2xl"
        >
          <div className="text-center">
            <span className="text-white font-bold text-sm lg:text-base tracking-wider block">
              {kubeName.replace(" Kube", "").toUpperCase()}
            </span>
            <span className="text-white/60 text-xs font-medium tracking-widest">
              KUBE
            </span>
          </div>
        </motion.div>

        {/* Block nodes in circular layout */}
        {blocks.map((block, index) => {
          const angleStep = 360 / blocks.length;
          const angle = (index * angleStep - 90) * (Math.PI / 180);
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isSelected = selectedBlocks.includes(block.id);
          const isActive = activeBlock?.id === block.id;

          return (
            <motion.button
              key={block.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              onClick={() => onSetActiveBlock(block)}
              className={`absolute w-24 h-24 lg:w-28 lg:h-28 rounded-lg flex items-center justify-center text-center p-3 transition-all duration-300 cursor-pointer border-2 shadow-lg ${
                isActive
                  ? "border-foreground bg-foreground text-white scale-110 z-20"
                  : isSelected
                  ? "border-brand-orange bg-brand-orange text-white"
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
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
          {blocks.map((block, index) => {
            const angleStep = 360 / blocks.length;
            const angle = (index * angleStep - 90) * (Math.PI / 180);
            const x2 = 300 + Math.cos(angle) * 160;
            const y2 = 300 + Math.sin(angle) * 160;
            const isSelected = selectedBlocks.includes(block.id);
            const isActive = activeBlock?.id === block.id;
            return (
              <motion.line
                key={block.id}
                x1="300"
                y1="300"
                x2={x2}
                y2={y2}
                stroke={isActive ? "hsl(0 0% 0%)" : isSelected ? "hsl(24 95% 53%)" : "hsl(0 0% 85%)"}
                strokeWidth={isActive ? "3" : "2"}
                strokeDasharray={isSelected || isActive ? "0" : "6"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Detail Panel */}
      <div className="lg:pl-8">
        <AnimatePresence mode="wait">
          {activeBlock ? (
            <motion.div
              key={activeBlock.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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

              {activeBlock.products && activeBlock.products.length > 0 && (
                <div className="border-t border-border pt-8">
                  <h4 className="text-label text-muted-foreground mb-4">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeBlock.products.map((product, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-secondary text-sm font-medium"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onToggleBlock(activeBlock.id)}
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
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
        </AnimatePresence>

        {/* Selected blocks summary */}
        {selectedBlocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-8 bg-foreground text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <h4 className="text-label text-white">
                Selected Blocks ({selectedBlocks.length})
              </h4>
            </div>
            <ul className="space-y-3 mb-8">
              {selectedBlocks.map((id) => {
                const block = blocks.find((b) => b.id === id);
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
  );
};
