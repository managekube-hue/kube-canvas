import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 section-off-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Large statement */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-headline text-foreground leading-tight mb-16"
          >
            Most organizations manage IT through{" "}
            <span className="text-brand-orange">8–12 separate vendors</span>.
            No one owns the integration. Audits fail. Incidents cascade. Costs compound.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="divider origin-left mb-16"
          />

          {/* Solution statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-title text-foreground mb-6">
                We replace the chaos with one systematic methodology.
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Assess → Remediate → Manage → Optimize. Every engagement follows this sequence. 
                No gaps. No handoffs. No surprises.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="text-display text-brand-orange">1</div>
                <div>
                  <div className="text-subtitle text-foreground">Single Accountability</div>
                  <div className="text-body text-muted-foreground">One team owns the outcome</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-display text-brand-orange">∞</div>
                <div>
                  <div className="text-subtitle text-foreground">Continuous Optimization</div>
                  <div className="text-body text-muted-foreground">Not a project, a partnership</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
