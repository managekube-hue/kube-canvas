import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="problem">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8"
          >
            VENDOR SPRAWL KILLS EFFICIENCY
          </motion.h2>

          {/* Problem Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-16"
          >
            Most organizations manage IT through 8-12 separate vendors.
            No single team owns the integration.
            Audits fail. Incidents cascade. Costs compound.
          </motion.p>

          {/* Comparison Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* Before Card */}
            <div className="card-enterprise text-left">
              <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
                TYPICAL ORGANIZATION
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-display text-2xl text-foreground mb-2">12 vendors</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-3 w-4 bg-foreground" />
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-body-sm text-muted-foreground">Fragmented ownership</p>
                  <p className="text-body-sm text-muted-foreground">Gaps between services</p>
                  <p className="text-body-sm text-muted-foreground">Reactive firefighting</p>
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="card-enterprise text-left border-foreground">
              <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
                MANAGEKUBE APPROACH
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-display text-2xl text-foreground mb-2">1 integrated team</div>
                  <div className="flex gap-1">
                    <div className="h-3 w-full bg-foreground max-w-[48px]" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-body-sm text-foreground">Single accountability</p>
                  <p className="text-body-sm text-foreground">Systematic methodology</p>
                  <p className="text-body-sm text-foreground">Proactive optimization</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Closing Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-body text-foreground"
          >
            We replace the sprawl with a single methodology.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
