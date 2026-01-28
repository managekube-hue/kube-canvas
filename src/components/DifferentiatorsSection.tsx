import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const DifferentiatorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-foreground text-background" id="differentiators">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Large Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-24"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-background leading-[1.05] max-w-5xl">
              We turned services into configurable Blocks. 
              Choose what you need. Skip what you don't.
            </h2>
          </motion.div>

          {/* Three Points - Horizontal Flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid lg:grid-cols-3 gap-16 lg:gap-12"
          >
            <div>
              <span className="font-mono text-sm text-background/50 block mb-4">01</span>
              <h3 className="font-display text-2xl lg:text-3xl text-background mb-4">Productized</h3>
              <p className="font-mono text-base lg:text-lg text-background/70 leading-relaxed">
                No bloated contracts. Configurable Blocks. Clear deliverables.
              </p>
            </div>
            <div>
              <span className="font-mono text-sm text-background/50 block mb-4">02</span>
              <h3 className="font-display text-2xl lg:text-3xl text-background mb-4">Flexible</h3>
              <p className="font-mono text-base lg:text-lg text-background/70 leading-relaxed">
                Six pricing models. Pay for what you use. Scale up or down monthly.
              </p>
            </div>
            <div>
              <span className="font-mono text-sm text-background/50 block mb-4">03</span>
              <h3 className="font-display text-2xl lg:text-3xl text-background mb-4">Scalable</h3>
              <p className="font-mono text-base lg:text-lg text-background/70 leading-relaxed">
                $99 automation templates to enterprise BLOCK platforms. Same team.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-3 font-mono text-lg text-background hover:text-background/70 transition-colors group"
            >
              View pricing models
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
