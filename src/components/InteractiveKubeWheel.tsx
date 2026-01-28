import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ArrowRight, ChevronRight } from "lucide-react";

interface Product {
  name: string;
  description?: string;
}

interface Block {
  id: string;
  name: string;
  description: string;
  details?: string;
  useCases?: string[];
  products?: string[];
}

interface InteractiveKubeWheelProps {
  kubeName: string;
  blocks: Block[];
  selectedBlocks: string[];
  onToggleBlock: (blockId: string) => void;
  activeBlock: Block | null;
  onSetActiveBlock: (block: Block | null) => void;
}

export const InteractiveKubeWheel = ({
  kubeName,
  blocks,
  selectedBlocks,
  onToggleBlock,
  activeBlock,
  onSetActiveBlock,
}: InteractiveKubeWheelProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Calculate positions for blocks on outer ring
  const getBlockPosition = (index: number, total: number, radius: number) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2; // Start from top
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  // Calculate positions for products on inner ring
  const getProductPosition = (index: number, total: number, radius: number) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const outerRadius = 200;
  const innerRadius = 120;
  const centerSize = 100;

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      {/* Left Side - 60% - Interactive Wheel */}
      <div className="lg:col-span-3 relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
        <div className="relative w-full max-w-[500px] aspect-square">
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="rounded-full border border-border/20"
              style={{ width: outerRadius * 2 + 80, height: outerRadius * 2 + 80 }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="rounded-full border border-border/10"
              style={{ width: outerRadius * 2 + 120, height: outerRadius * 2 + 120 }}
            />
          </div>

          {/* Center Hub - Kube Name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-foreground flex items-center justify-center z-20 shadow-2xl"
              style={{ width: centerSize, height: centerSize }}
            >
              <div className="text-center px-2">
                <span className="text-white font-bold text-xs tracking-wider block leading-tight">
                  {kubeName.replace(" Kube", "").toUpperCase()}
                </span>
                <span className="text-white/60 text-[10px] font-medium tracking-widest">
                  KUBE
                </span>
              </div>
            </motion.div>
          </div>

          {/* Inner Ring - Products (shown when a block is active) */}
          <AnimatePresence>
            {activeBlock && activeBlock.products && activeBlock.products.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                {activeBlock.products.slice(0, 8).map((product, index) => {
                  const pos = getProductPosition(index, Math.min(activeBlock.products!.length, 8), innerRadius);
                  const isSelected = selectedProduct === product;
                  
                  return (
                    <motion.button
                      key={`${activeBlock.id}-${product}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => setSelectedProduct(isSelected ? null : product)}
                      className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-center p-1 transition-all duration-200 cursor-pointer border-2 text-[9px] font-medium leading-tight z-10 ${
                        isSelected
                          ? "border-brand-orange bg-brand-orange text-white"
                          : "border-border/50 bg-white/90 text-foreground hover:border-brand-orange hover:scale-105"
                      }`}
                      style={{
                        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                        left: '50%',
                        top: '50%',
                      }}
                    >
                      <span className="line-clamp-2">{product}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* Outer Ring - Blocks */}
          <div className="absolute inset-0 flex items-center justify-center">
            {blocks.map((block, index) => {
              const pos = getBlockPosition(index, blocks.length, outerRadius);
              const isSelected = selectedBlocks.includes(block.id);
              const isActive = activeBlock?.id === block.id;

              return (
                <motion.button
                  key={block.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  onClick={() => {
                    onSetActiveBlock(isActive ? null : block);
                    setSelectedProduct(null);
                  }}
                  className={`absolute w-20 h-20 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center text-center p-2 transition-all duration-300 cursor-pointer border-2 shadow-lg z-10 ${
                    isActive
                      ? "border-foreground bg-foreground text-white scale-110"
                      : isSelected
                      ? "border-brand-orange bg-brand-orange text-white"
                      : "border-border bg-white hover:border-foreground hover:scale-105"
                  }`}
                  style={{
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                    left: '50%',
                    top: '50%',
                  }}
                >
                  <span className="text-[10px] lg:text-xs font-semibold leading-tight">
                    {block.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
            {blocks.map((block, index) => {
              const pos = getBlockPosition(index, blocks.length, outerRadius - 40);
              const isSelected = selectedBlocks.includes(block.id);
              const isActive = activeBlock?.id === block.id;
              
              return (
                <motion.line
                  key={block.id}
                  x1="250"
                  y1="250"
                  x2={250 + pos.x}
                  y2={250 + pos.y}
                  stroke={isActive ? "hsl(var(--foreground))" : isSelected ? "hsl(24 95% 53%)" : "hsl(var(--border))"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isSelected || isActive ? "0" : "4"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Side - 40% - Detail Panel */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {activeBlock ? (
            <motion.div
              key={activeBlock.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Block Title */}
              <div>
                <p className="text-label text-brand-orange mb-2">SELECTED BLOCK</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                  {activeBlock.name}
                </h3>
                <p className="text-body text-muted-foreground">
                  {activeBlock.description}
                </p>
              </div>

              {/* What's Included */}
              {activeBlock.details && (
                <div className="border-t border-border pt-6">
                  <h4 className="text-label text-muted-foreground mb-3">
                    WHAT'S INCLUDED
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {activeBlock.details}
                  </p>
                </div>
              )}

              {/* Use Cases */}
              {activeBlock.useCases && activeBlock.useCases.length > 0 && (
                <div className="border-t border-border pt-6">
                  <h4 className="text-label text-muted-foreground mb-3">
                    USE CASES
                  </h4>
                  <ul className="space-y-2">
                    {activeBlock.useCases.map((useCase, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technology Stack */}
              {activeBlock.products && activeBlock.products.length > 0 && (
                <div className="border-t border-border pt-6">
                  <h4 className="text-label text-muted-foreground mb-3">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeBlock.products.map((product, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                          selectedProduct === product
                            ? "bg-brand-orange text-white"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to BOM Button */}
              <div className="pt-4">
                <button
                  onClick={() => onToggleBlock(activeBlock.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all w-full justify-center ${
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
              className="h-full flex flex-col items-center justify-center text-center py-16 px-8 bg-secondary/30 border border-dashed border-border"
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="text-body text-muted-foreground mb-2">
                Click a block in the wheel
              </p>
              <p className="text-sm text-muted-foreground/70">
                to explore capabilities and add to your BOM
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Blocks Summary */}
        {selectedBlocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-foreground text-white"
          >
            <h4 className="text-label text-white/70 mb-4">
              YOUR SELECTIONS ({selectedBlocks.length})
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedBlocks.map((id) => {
                const block = blocks.find((b) => b.id === id);
                return block ? (
                  <li
                    key={id}
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <Check className="w-4 h-4 text-brand-orange" />
                    {block.name}
                  </li>
                ) : null;
              })}
            </ul>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-brand-orange text-white py-3 font-semibold text-sm hover:bg-opacity-90 transition-colors">
                Request Quote
              </button>
              <button className="w-full bg-white text-foreground py-3 font-semibold text-sm hover:bg-white/90 transition-colors">
                Take Assessment
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
