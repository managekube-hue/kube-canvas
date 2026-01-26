import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 section-light"
      id="methodology"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-8 leading-tight"
            style={{ color: "hsl(0 0% 2%)" }}
          >
            YOU DON'T NEED MORE IT VENDORS.
            <br />
            <span className="text-gradient-orange">YOU NEED A SYSTEM THAT MAKES SENSE.</span>
          </motion.h2>

          {/* Problem Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-base lg:text-lg text-center max-w-4xl mx-auto mb-12"
            style={{ color: "hsl(0 0% 40%)" }}
          >
            Most companies collect IT services like trading cards. One vendor for security. 
            Another for compliance. Someone else managing your cloud. A fourth handling backups. 
            Nobody knows how it all fits together—including the vendors themselves. 
            This leads to complexity, risk, and cost overruns.
          </motion.p>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            <div
              className="font-mono text-sm lg:text-base leading-relaxed"
              style={{ color: "hsl(0 0% 20%)" }}
            >
              <p className="mb-4">
                We built a framework designed to eliminate complexity, not add to it. 
                We don't sell individual services; we deliver a systematic methodology 
                where every Kube serves a specific function in a cohesive, end-to-end 
                transformation cycle.
              </p>
            </div>
            <div
              className="font-mono text-sm lg:text-base leading-relaxed"
              style={{ color: "hsl(0 0% 20%)" }}
            >
              <p>
                We deploy a directed acyclic graph of interdependent Kubes where Assessment 
                triggers Compliance gap analysis, Compliance cascades control requirements 
                to MSSP/MSP execution layers, Advisory synthesizes FinOps governance across 
                the stack, and Industry Kubes compose vertical-specific BOMs from the Partner 
                technology substrate.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
