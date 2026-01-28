import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const differentiators = [
  {
    number: "01",
    title: "Productized Services",
    description: "We turned services into configurable Blocks. Choose what you need. Skip what you don't. No bloated contracts.",
  },
  {
    number: "02",
    title: "Flexible Pricing",
    description: "Six pricing models. Precision Pay™, Flex Core™, Outcome-Based, Project Credits™, Fractional™, Hybrid Commit™.",
  },
  {
    number: "03",
    title: "Scalable From Day One",
    description: "$99 automation templates to full enterprise BLOCK platforms. Same team, same methodology, any scale.",
  },
];

export const DifferentiatorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="differentiators">
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
              Why ManageKube
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Built different.
            </h2>
          </motion.div>

          {/* Three Column Grid */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <span className="font-mono text-xs text-muted-foreground mb-4 block">
                  {item.number}
                </span>
                <h3 className="font-display text-xl lg:text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-muted-foreground transition-colors group"
            >
              View pricing models
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
