import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const DifferentiatorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 section-dark">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Large Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="max-w-5xl mb-24"
        >
          <h2 className="text-headline text-white leading-tight">
            We turned consulting into{" "}
            <span className="text-brand-orange">configurable products</span>.
            Choose what you need. Skip what you don't.
          </h2>
        </motion.div>

        {/* Three Points */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid lg:grid-cols-3 gap-16 lg:gap-12 mb-20"
        >
          <div>
            <div className="text-display text-brand-orange mb-6">01</div>
            <h3 className="text-title text-white mb-4">Productized</h3>
            <p className="text-body-lg text-white/70">
              Kubes contain Blocks. Blocks contain services. 
              No bloated contracts. Clear scope. Clear pricing. Clear outcomes.
            </p>
          </div>
          <div>
            <div className="text-display text-brand-orange mb-6">02</div>
            <h3 className="text-title text-white mb-4">Flexible</h3>
            <p className="text-body-lg text-white/70">
              Six pricing models from consumption-based to committed. 
              Scale up or down monthly. Zero lock-in.
            </p>
          </div>
          <div>
            <div className="text-display text-brand-orange mb-6">03</div>
            <h3 className="text-title text-white mb-4">Scalable</h3>
            <p className="text-body-lg text-white/70">
              $99 n8n automation templates. $2M enterprise platform deployments. 
              Same methodology. Same team. Same accountability.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/pricing"
            className="inline-flex items-center gap-3 text-subtitle text-white hover:text-brand-orange transition-colors group"
          >
            View all pricing models
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
