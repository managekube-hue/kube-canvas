import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="problem">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Problem Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                The Problem
              </p>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-6 leading-tight">
                Your IT is fragmented.
                <br />
                We make it coherent.
              </h2>
              <p className="font-mono text-base text-muted-foreground leading-relaxed mb-8">
                Most organizations manage IT through 8-12 separate vendors. 
                No single team owns the integration. Incidents cascade. 
                Audits fail. Costs compound.
              </p>
              <p className="font-mono text-base text-foreground leading-relaxed">
                We replace the chaos with a single methodology: 
                Assess → Remediate → Manage → Optimize.
              </p>
            </motion.div>

            {/* Right Column - Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Before */}
              <div className="p-6 lg:p-8 bg-background border border-border">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                  Typical Organization
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-display text-4xl text-foreground">12</span>
                  <span className="font-mono text-sm text-muted-foreground">separate vendors</span>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-2 w-3 bg-muted-foreground/40" />
                  ))}
                </div>
                <ul className="space-y-1">
                  <li className="font-mono text-sm text-muted-foreground">Fragmented ownership</li>
                  <li className="font-mono text-sm text-muted-foreground">Gaps between services</li>
                  <li className="font-mono text-sm text-muted-foreground">Reactive firefighting</li>
                </ul>
              </div>

              {/* After */}
              <div className="p-6 lg:p-8 bg-foreground text-background">
                <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-4">
                  ManageKube Approach
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-display text-4xl text-background">1</span>
                  <span className="font-mono text-sm text-background/80">integrated team</span>
                </div>
                <div className="flex gap-1 mb-4">
                  <div className="h-2 w-full max-w-[24px] bg-background" />
                </div>
                <ul className="space-y-1">
                  <li className="font-mono text-sm text-background/80">Single accountability</li>
                  <li className="font-mono text-sm text-background/80">Systematic methodology</li>
                  <li className="font-mono text-sm text-background/80">Proactive optimization</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
