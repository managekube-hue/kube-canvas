import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const phases = [
  {
    id: "assess",
    number: "01",
    label: "ASSESS",
    kubes: ["Assessment Kube", "Compliance Kube"],
    description: "Map current state, document infrastructure, identify security gaps, build transformation roadmap.",
  },
  {
    id: "remediate",
    number: "02",
    label: "REMEDIATE",
    kubes: ["Product Kube", "MSSP Kube", "Industry Kube"],
    description: "Close compliance gaps, implement security controls, deploy infrastructure.",
  },
  {
    id: "manage",
    number: "03",
    label: "MANAGE",
    kubes: ["MSP Kube", "MSSP Kube"],
    description: "24/7 operations, service desk, NOC/SOC, continuous monitoring.",
  },
  {
    id: "optimize",
    number: "04",
    label: "OPTIMIZE",
    kubes: ["Advisory Kube", "Innovation Kube"],
    description: "Strategic guidance, cost optimization, automation, continuous improvement.",
  },
];

export const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 lg:py-32 section-white" id="methodology">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 lg:mb-24"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Our Methodology
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-6">
              One methodology. Four phases.
              <br />
              Eight integrated modules.
            </h2>
          </motion.div>

          {/* Phases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setActivePhase(phase.id)}
                onMouseLeave={() => setActivePhase(null)}
                className={`bg-background p-6 lg:p-8 cursor-pointer transition-all duration-300 ${
                  activePhase === phase.id ? "bg-foreground text-background" : ""
                }`}
              >
                <span className={`font-mono text-xs tracking-wider mb-4 block ${
                  activePhase === phase.id ? "text-background/60" : "text-muted-foreground"
                }`}>
                  {phase.number}
                </span>
                
                <h3 className={`font-display text-2xl mb-4 ${
                  activePhase === phase.id ? "text-background" : "text-foreground"
                }`}>
                  {phase.label}
                </h3>
                
                <p className={`font-mono text-sm leading-relaxed mb-6 ${
                  activePhase === phase.id ? "text-background/80" : "text-muted-foreground"
                }`}>
                  {phase.description}
                </p>
                
                <div className="space-y-1">
                  {phase.kubes.map((kube) => (
                    <p key={kube} className={`font-mono text-xs ${
                      activePhase === phase.id ? "text-background/60" : "text-muted-foreground"
                    }`}>
                      → {kube}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <a
              href="#kubes"
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-muted-foreground transition-colors group"
            >
              Explore all eight modules
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
