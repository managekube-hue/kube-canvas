/**
 * DO NOT TOUCH - Interactive Kube Wheel Component
 * 60/40 layout with wheel on left, detail panel on right
 * Shows ALL blocks in the wheel - no limit
 * Functionality and UI design are COMPLETED - do not modify
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ChevronRight } from "lucide-react";
import { BOMSelectionModal } from "./BOMSelectionModal";

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
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [bomModalOpen, setBomModalOpen] = useState(false);

  // Calculate pie segment path - supports ANY number of blocks
  const getSegmentPath = (index: number, total: number, innerRadius: number, outerRadius: number) => {
    const anglePerSegment = (2 * Math.PI) / total;
    const startAngle = index * anglePerSegment - Math.PI / 2;
    const endAngle = startAngle + anglePerSegment;
    const gap = 0.02;

    const x1 = Math.cos(startAngle + gap) * outerRadius;
    const y1 = Math.sin(startAngle + gap) * outerRadius;
    const x2 = Math.cos(endAngle - gap) * outerRadius;
    const y2 = Math.sin(endAngle - gap) * outerRadius;
    const x3 = Math.cos(endAngle - gap) * innerRadius;
    const y3 = Math.sin(endAngle - gap) * innerRadius;
    const x4 = Math.cos(startAngle + gap) * innerRadius;
    const y4 = Math.sin(startAngle + gap) * innerRadius;

    const largeArcFlag = anglePerSegment > Math.PI ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `;
  };

  const getLabelPosition = (index: number, total: number, radius: number) => {
    const anglePerSegment = (2 * Math.PI) / total;
    const midAngle = index * anglePerSegment + anglePerSegment / 2 - Math.PI / 2;
    return {
      x: Math.cos(midAngle) * radius,
      y: Math.sin(midAngle) * radius,
    };
  };

  const centerRadius = 70;
  const innerRadius = 75;
  const outerRadius = 160;
  const labelRadius = (innerRadius + outerRadius) / 2;

  const handleAddToBOM = () => {
    if (activeBlock && activeBlock.products && activeBlock.products.length > 0) {
      setBomModalOpen(true);
    } else if (activeBlock) {
      onToggleBlock(activeBlock.id);
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Left Side - 60% - Interactive Pie Wheel */}
        <div className="lg:col-span-3 relative flex items-center justify-center min-h-[450px] lg:min-h-[550px]">
          <div className="relative">
            <svg 
              width="400" 
              height="400" 
              viewBox="-200 -200 400 400"
              className="transform transition-transform duration-300"
            >
              {/* Decorative outer rings */}
              <circle 
                cx="0" 
                cy="0" 
                r="175" 
                fill="none" 
                stroke="hsl(var(--border))" 
                strokeWidth="1" 
                strokeDasharray="4 4"
                opacity="0.3"
              />
              <circle 
                cx="0" 
                cy="0" 
                r="190" 
                fill="none" 
                stroke="hsl(var(--border))" 
                strokeWidth="1" 
                strokeDasharray="2 6"
                opacity="0.2"
              />

              {/* Pie Segments for ALL Blocks - No limit */}
              {blocks.map((block, index) => {
                const isSelected = selectedBlocks.includes(block.id);
                const isActive = activeBlock?.id === block.id;
                const isHovered = hoveredSegment === block.id;

                return (
                  <motion.path
                    key={block.id}
                    d={getSegmentPath(index, blocks.length, innerRadius, outerRadius)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    fill={
                      isActive 
                        ? "hsl(24 95% 53%)" 
                        : isSelected 
                        ? "hsl(24 95% 53% / 0.7)" 
                        : isHovered 
                        ? "hsl(var(--muted))"
                        : "hsl(var(--background))"
                    }
                    stroke={
                      isActive || isSelected
                        ? "hsl(24 95% 53%)"
                        : "hsl(var(--border))"
                    }
                    strokeWidth={isActive ? 2 : 1}
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => onSetActiveBlock(isActive ? null : block)}
                    onMouseEnter={() => setHoveredSegment(block.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                );
              })}

              {/* Segment Labels - Dynamic font size based on block count */}
              {blocks.map((block, index) => {
                const pos = getLabelPosition(index, blocks.length, labelRadius);
                const isActive = activeBlock?.id === block.id;
                const isSelected = selectedBlocks.includes(block.id);
                
                const anglePerSegment = (360) / blocks.length;
                const midAngle = index * anglePerSegment + anglePerSegment / 2 - 90;
                let textRotation = midAngle;
                if (midAngle > 90 && midAngle < 270) {
                  textRotation = midAngle + 180;
                }

                // Smaller font for more blocks
                const fontSize = blocks.length > 6 ? "8px" : blocks.length > 4 ? "10px" : "11px";

                return (
                  <g 
                    key={`label-${block.id}`}
                    className="pointer-events-none"
                  >
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`font-semibold transition-colors ${
                        isActive || isSelected ? "fill-white" : "fill-foreground"
                      }`}
                      style={{
                        fontSize,
                        transform: `rotate(${textRotation}deg)`,
                        transformOrigin: `${pos.x}px ${pos.y}px`,
                      }}
                    >
                      {block.name.length > 15 
                        ? block.name.split(' ').map((word, i) => (
                            <tspan 
                              key={i} 
                              x={pos.x} 
                              dy={i === 0 ? "-0.5em" : "1.1em"}
                            >
                              {word}
                            </tspan>
                          ))
                        : block.name
                      }
                    </text>
                  </g>
                );
              })}

              {/* Center Hub */}
              <motion.circle
                cx="0"
                cy="0"
                r={centerRadius}
                fill="hsl(var(--foreground))"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="drop-shadow-xl"
              />
              
              {/* Center Text */}
              <text
                x="0"
                y="-8"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-sm font-bold tracking-wider"
              >
                {kubeName.replace(" Kube", "").toUpperCase()}
              </text>
              <text
                x="0"
                y="12"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white/60 text-[10px] font-medium tracking-widest"
              >
                KUBE
              </text>
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
                          className="px-3 py-1.5 text-xs font-medium bg-secondary text-foreground"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to BOM Button - Opens Modal for granular selection */}
                <div className="pt-4">
                  <button
                    onClick={handleAddToBOM}
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
                  <ChevronRight className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <p className="text-body text-muted-foreground">
                  Select a block to view details
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

      {/* BOM Selection Modal */}
      {activeBlock && (
        <BOMSelectionModal
          isOpen={bomModalOpen}
          onClose={() => setBomModalOpen(false)}
          blockName={activeBlock.name}
          blockDescription={activeBlock.description}
          products={activeBlock.products || []}
          onConfirm={(selections) => {
            console.log("BOM Selections:", selections);
            onToggleBlock(activeBlock.id);
          }}
        />
      )}
    </>
  );
};