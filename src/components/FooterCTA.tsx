import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const FooterCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-white border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-12">
            Ready to transform?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#assessment"
              className="inline-flex items-center justify-center bg-foreground text-background px-10 py-5 font-mono text-base uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Start Free Assessment
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border-2 border-foreground text-foreground px-10 py-5 font-mono text-base uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
