import { useState } from "react";
import { motion } from "framer-motion";

const phases = [
  {
    id: "assess",
    name: "ASSESS",
    kubes: ["Assessment Kube", "Compliance Kube"],
    role: "Identify Gaps and Create Roadmap",
    description: "We map your current state, document infrastructure, identify security gaps, and build the transformation roadmap.",
    deliverable: "Current state documentation and a 90-day implementation plan.",
    insight: "We use intelligent question consolidation to cover 1,200+ security controls in 85-120 questions.",
  },
  {
    id: "remediate",
    name: "REMEDIATE",
    kubes: ["MSSP Kube", "MSP Kube"],
    role: "Implement Controls and Infrastructure Fixes",
    description: "We take the gaps identified in Assessment and perform hands-on remediation.",
    deliverable: "Zero Trust implementation, security tool deployment, BCDR setup, network segmentation.",
    insight: "This phase implements technical controls in line with Compliance Kube requirements.",
  },
  {
    id: "manage",
    name: "MANAGE",
    kubes: ["MSP Kube", "Industry Kube"],
    role: "Maintain Day-to-Day Operations",
    description: "We deliver 24/7 support and operational stability.",
    deliverable: "24/7 NOC monitoring, end-user support, hybrid cloud operations, BCDR management.",
    insight: "We provide reliable infrastructure management for the long term.",
  },
  {
    id: "optimize",
    name: "OPTIMIZE",
    kubes: ["Advisory Kube", "Innovation Kube"],
    role: "Maximize Efficiency and Strategic Value",
    description: "We align IT strategy with business goals and build automation to improve efficiency.",
    deliverable: "Cost reduction from FinOps, automated workflows (RPA), strategic roadmaps.",
    insight: "This phase ensures IT investment delivers maximum business value.",
  },
];

export const MethodologyWheel = () => {
  const [activePhase, setActivePhase] = useState(phases[0]);

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-16"
        >
          THE MANAGEKUBE METHODOLOGY
          <br />
          <span className="text-gradient-orange">ASSESS → REMEDIATE → MANAGE → OPTIMIZE</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Wheel Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto"
          >
            {/* Outer Ring - Phases */}
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(32, 91%, 44%)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              
              {/* Background circles */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="hsl(0, 0%, 20%)" strokeWidth="1" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="hsl(0, 0%, 20%)" strokeWidth="1" />
              <circle cx="200" cy="200" r="60" fill="hsl(0, 0%, 6%)" stroke="url(#glowGradient)" strokeWidth="2" />
              
              {/* Phase segments */}
              {phases.map((phase, index) => {
                const angle = (index * 90 - 45) * (Math.PI / 180);
                const x = 200 + Math.cos(angle) * 150;
                const y = 200 + Math.sin(angle) * 150;
                const isActive = activePhase.id === phase.id;
                
                return (
                  <g key={phase.id}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={isActive ? 35 : 30}
                      fill={isActive ? "hsl(32, 91%, 44%)" : "hsl(0, 0%, 12%)"}
                      stroke={isActive ? "hsl(32, 91%, 44%)" : "hsl(0, 0%, 30%)"}
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActivePhase(phase)}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        filter: isActive ? "drop-shadow(0 0 20px hsl(32, 91%, 44%))" : "none"
                      }}
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Special Elite"
                      className="pointer-events-none"
                    >
                      {phase.name}
                    </text>
                  </g>
                );
              })}
              
              {/* Center text */}
              <text
                x="200"
                y="195"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="12"
                fontFamily="Special Elite"
              >
                METHODOLOGY
              </text>
              <text
                x="200"
                y="210"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="hsl(220, 9%, 63%)"
                fontSize="8"
                fontFamily="Roboto Mono"
              >
                Click a phase
              </text>
            </svg>
          </motion.div>

          {/* Phase Details */}
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="card-glass rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <h3 className="font-display text-2xl text-white">{activePhase.name}</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-2">KUBES INVOLVED</div>
                <div className="flex flex-wrap gap-2">
                  {activePhase.kubes.map((kube) => (
                    <span key={kube} className="px-3 py-1 rounded-full bg-secondary font-mono text-sm text-white">
                      {kube}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs text-muted-foreground mb-2">ROLE IN METHODOLOGY</div>
                <p className="font-display text-lg text-primary">{activePhase.role}</p>
              </div>

              <div>
                <div className="font-mono text-xs text-muted-foreground mb-2">DESCRIPTION</div>
                <p className="font-mono text-sm text-white/80">{activePhase.description}</p>
              </div>

              <div>
                <div className="font-mono text-xs text-muted-foreground mb-2">DELIVERABLE</div>
                <p className="font-mono text-sm text-white/80">{activePhase.deliverable}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="font-mono text-xs text-muted-foreground mb-2">KEY INSIGHT</div>
                <p className="font-mono text-sm text-primary/90 italic">{activePhase.insight}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
