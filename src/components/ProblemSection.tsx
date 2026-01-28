import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-[#FAFAFA]" id="problem">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Large Editorial Layout */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-20"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] max-w-4xl">
              Your IT is fragmented.
              <br />
              <span className="text-muted-foreground">We make it coherent.</span>
            </h2>
          </motion.div>

          {/* Two Column - Text Heavy, Not Boxes */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-mono text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
                Most organizations manage IT through 8-12 separate vendors. 
                No single team owns the integration. Incidents cascade. 
                Audits fail. Costs compound.
              </p>
              <p className="font-mono text-lg lg:text-xl text-foreground leading-relaxed">
                We replace the chaos with a single methodology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-12"
            >
              {/* Before/After - Not Boxes */}
              <div className="border-l-2 border-muted-foreground/30 pl-8">
                <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground block mb-3">Typical Organization</span>
                <span className="font-display text-5xl text-foreground">12</span>
                <span className="font-mono text-lg text-muted-foreground ml-3">separate vendors</span>
              </div>
              
              <div className="border-l-2 border-foreground pl-8">
                <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground block mb-3">ManageKube Approach</span>
                <span className="font-display text-5xl text-foreground">1</span>
                <span className="font-mono text-lg text-muted-foreground ml-3">integrated team</span>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <Link
              to="/methodology"
              className="inline-flex items-center gap-3 font-mono text-lg text-foreground hover:text-muted-foreground transition-colors group"
            >
              See how it works
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
