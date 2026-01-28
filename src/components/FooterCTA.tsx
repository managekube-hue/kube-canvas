import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const FooterCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 section-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-8">
            Ready to transform?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#assessment"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 font-mono text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Start Free Assessment
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-foreground text-foreground px-8 py-4 font-mono text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
