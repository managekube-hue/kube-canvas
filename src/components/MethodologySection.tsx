import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const phases = [
  {
    id: "assess",
    number: "01",
    label: "ASSESS",
    kubes: ["Assessment Kube", "Compliance Kube"],
    description: "Map current state. Document infrastructure. Identify gaps. Build your transformation roadmap.",
  },
  {
    id: "remediate",
    number: "02",
    label: "REMEDIATE",
    kubes: ["Product Kube", "MSSP Kube", "Industry Kube"],
    description: "Close compliance gaps. Implement security controls. Deploy infrastructure.",
  },
  {
    id: "manage",
    number: "03",
    label: "MANAGE",
    kubes: ["MSP Kube", "MSSP Kube"],
    description: "24/7 operations. Service desk. NOC/SOC. Continuous monitoring.",
  },
  {
    id: "optimize",
    number: "04",
    label: "OPTIMIZE",
    kubes: ["Advisory Kube", "Innovation Kube"],
    description: "Strategic guidance. Cost optimization. Automation. Continuous improvement.",
  },
];

export const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-white" id="methodology">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-24"
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
              The Methodology
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              One methodology.
              <br />
              <span className="text-muted-foreground">Four phases. Eight Kubes.</span>
            </h2>
          </motion.div>

          {/* Phases - Staggered Layout, Not Grid Boxes */}
          <div className="space-y-0">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="border-t border-border py-12 lg:py-16 group hover:bg-[#FAFAFA] transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-sm text-muted-foreground">{phase.number}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="font-display text-3xl lg:text-4xl text-foreground">{phase.label}</h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-mono text-lg text-muted-foreground leading-relaxed">{phase.description}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="space-y-2">
                      {phase.kubes.map((kube) => (
                        <p key={kube} className="font-mono text-base text-foreground">→ {kube}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <Link
              to="/kubes"
              className="inline-flex items-center gap-3 font-mono text-lg text-foreground hover:text-muted-foreground transition-colors group"
            >
              Explore all eight Kubes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
