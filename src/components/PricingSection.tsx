import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const pricingModels = [
  {
    id: "precision-pay",
    name: "Precision Pay™",
    description: "Pay for what you consume. Weekly billing. No minimums.",
  },
  {
    id: "flex-core",
    name: "Flex Core™",
    description: "Modular tiers. Add or remove services monthly.",
  },
  {
    id: "outcome-based",
    name: "Outcome-Based",
    description: "Pay for results. Share savings. Uptime SLA credits.",
  },
  {
    id: "project-credits",
    name: "Project Credits™",
    description: "Prepaid bank. Use across any service. 15% volume discount.",
  },
  {
    id: "fractional",
    name: "Fractional™",
    description: "vCISO/vCIO on-demand. 4-hour minimum. Executive access.",
  },
  {
    id: "hybrid-commit",
    name: "Hybrid Commit™",
    description: "Fixed baseline plus consumption overages. Best of both.",
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="pricing">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Pricing
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-4">
              Six ways to pay.
            </h2>
            <p className="font-mono text-base text-muted-foreground max-w-xl">
              From $99 automation templates to enterprise platform engagements. Zero lock-in.
            </p>
          </motion.div>

          {/* 3x2 Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                className="p-6 lg:p-8 bg-background border border-border hover:border-foreground transition-colors"
              >
                <h3 className="font-display text-lg lg:text-xl text-foreground mb-3">
                  {model.name}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                  {model.description}
                </p>
                <a
                  href={`#${model.id}`}
                  className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors flex items-center gap-1 group"
                >
                  Learn more
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
