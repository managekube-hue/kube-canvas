import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const pricingModels = [
  {
    id: "precision-pay",
    name: "PRECISION PAY™",
    description: "Pay for what you consume.",
    details: "Weekly billing.",
  },
  {
    id: "flex-core",
    name: "FLEX CORE™",
    description: "Modular tiers.",
    details: "Add/remove monthly.",
  },
  {
    id: "outcome-based",
    name: "OUTCOME-BASED",
    description: "Pay for results.",
    details: "Share savings. Uptime credits.",
  },
  {
    id: "project-credits",
    name: "PROJECT CREDITS™",
    description: "Prepaid bank.",
    details: "Use across any service. 15% volume discount.",
  },
  {
    id: "fractional",
    name: "FRACTIONAL™",
    description: "vCISO/vCIO on-demand.",
    details: "4-hour minimum.",
  },
  {
    id: "hybrid-commit",
    name: "HYBRID COMMIT™",
    description: "Fixed baseline + consumption overages.",
    details: "Best of both worlds.",
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="pricing">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-center text-foreground mb-6"
          >
            SIX WAYS TO PAY. ZERO LOCK-IN.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-body-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          >
            From $99 automation templates to enterprise platform engagements.
          </motion.p>

          {/* 3x2 Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pricingModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="card-enterprise"
              >
                <h3 className="font-display text-lg lg:text-xl text-foreground mb-3">
                  {model.name}
                </h3>
                
                <p className="text-body text-muted-foreground mb-2">
                  {model.description}
                </p>
                
                <p className="text-body-sm text-muted-foreground mb-6">
                  {model.details}
                </p>
                
                <a
                  href={`#${model.id}`}
                  className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors flex items-center gap-1 group"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
