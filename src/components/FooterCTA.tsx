import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const FooterCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 section-white border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#assessment" className="btn-primary">
            START FREE ASSESSMENT
          </a>
          <a href="#shop" className="btn-secondary">
            EXPLORE SHOP
          </a>
          <a href="#contact" className="btn-secondary">
            CONTACT SALES
          </a>
        </motion.div>
      </div>
    </section>
  );
};
