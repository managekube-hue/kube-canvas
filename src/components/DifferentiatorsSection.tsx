import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Blocks, Gauge, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: Blocks,
    title: "PRODUCTIZED SERVICES",
    description: "We turned services into configurable Blocks.",
    details: "Choose what you need. Skip what you don't.",
    cta: "View Blocks",
    href: "#blocks",
  },
  {
    icon: Gauge,
    title: "FLEXIBLE PRICING",
    description: "6 pricing models.",
    details: "Pay for what you use. Scale up/down monthly.",
    cta: "View Models",
    href: "#pricing",
  },
  {
    icon: TrendingUp,
    title: "SCALABLE FROM DAY ONE",
    description: "$99 automation templates to enterprise BLOCK platforms.",
    details: "Same team.",
    cta: "See Scale",
    href: "#scale",
  },
];

export const DifferentiatorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="differentiators">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="card-enterprise flex flex-col h-full"
              >
                <item.icon className="w-8 h-8 text-foreground mb-6" strokeWidth={1.5} />
                
                <h3 className="font-display text-xl lg:text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                
                <p className="text-body text-muted-foreground mb-2">
                  {item.description}
                </p>
                
                <p className="text-body-sm text-muted-foreground mb-6 flex-grow">
                  {item.details}
                </p>
                
                <a
                  href={item.href}
                  className="font-mono text-sm text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2 group"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
