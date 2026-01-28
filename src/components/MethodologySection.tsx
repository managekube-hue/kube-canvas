/** DO NOT TOUCH - Methodology section with zigzag tree/branch roadmap design */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  {
    number: "01",
    title: "Assess",
    description: "Comprehensive discovery of your infrastructure, security posture, and compliance gaps. Free for qualified engagements.",
    kubes: ["Assessment Kube", "Compliance Kube"],
  },
  {
    number: "02",
    title: "Remediate",
    description: "Close the gaps. Deploy infrastructure. Implement controls. Configure platforms for your specific industry.",
    kubes: ["Product Kube", "Industry Kube", "MSSP Kube"],
  },
  {
    number: "03",
    title: "Manage",
    description: "24/7 operations. Service desk. Security monitoring. Proactive maintenance with SLA-backed support.",
    kubes: ["MSP Kube", "MSSP Kube"],
  },
  {
    number: "04",
    title: "Optimize",
    description: "Continuous improvement. FinOps. Process automation. Strategic guidance from virtual executives.",
    kubes: ["Advisory Kube", "Innovation Kube"],
  },
];

export const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 section-white overflow-hidden" id="methodology">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-24"
        >
          <div className="accent-line mb-8" />
          <h2 className="text-headline text-foreground mb-6">
            One Methodology.<br />Four Phases.
          </h2>
          <p className="text-body-xl text-muted-foreground">
            Every engagement follows this proven sequence. The Kubes activate at each phase to deliver exactly what you need.
          </p>
        </motion.div>

        {/* TRUE ZIGZAG TREE - Cards alternate LEFT and RIGHT with central trunk */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Central vertical trunk line - THE TREE TRUNK */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/30 -translate-x-1/2 hidden lg:block"
            style={{ zIndex: 1 }}
          />

          {/* Desktop: TRUE ZIGZAG LAYOUT */}
          <div className="hidden lg:block space-y-0">
            {phases.map((phase, index) => {
              const isLeft = index % 2 === 0; // 01 left, 02 right, 03 left, 04 right
              
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative grid grid-cols-2 gap-0 min-h-[220px] items-center"
                >
                  {/* LEFT COLUMN */}
                  <div className={`${isLeft ? 'pr-20' : ''}`}>
                    {isLeft && (
                      <div className="relative">
                        {/* Horizontal branch line from card to trunk */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "80px" } : {}}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                          className="absolute right-0 top-1/2 h-0.5 bg-primary/40 -translate-y-1/2"
                          style={{ right: "-80px" }}
                        />
                        
                        {/* Node dot on trunk */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
                          className="absolute w-4 h-4 rounded-full bg-primary top-1/2 -translate-y-1/2"
                          style={{ right: "-88px" }}
                        />

                        {/* Content Card - LEFT */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: -8 }}
                          transition={{ duration: 0.3 }}
                          className="bg-card border border-border p-8 text-right ml-auto"
                        >
                          {/* Phase number - large, prominent */}
                          <span className="block font-display text-7xl text-primary/20 mb-2 leading-none">
                            {phase.number}
                          </span>
                          <h3 className="text-3xl lg:text-4xl font-display text-foreground mb-4">
                            {phase.title}
                          </h3>
                          <p className="text-body-lg text-muted-foreground mb-6">
                            {phase.description}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {phase.kubes.map((kube) => (
                              <span
                                key={kube}
                                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
                              >
                                {kube}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className={`${!isLeft ? 'pl-20' : ''}`}>
                    {!isLeft && (
                      <div className="relative">
                        {/* Horizontal branch line from trunk to card */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "80px" } : {}}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                          className="absolute left-0 top-1/2 h-0.5 bg-primary/40 -translate-y-1/2"
                          style={{ left: "-80px" }}
                        />
                        
                        {/* Node dot on trunk */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
                          className="absolute w-4 h-4 rounded-full bg-primary top-1/2 -translate-y-1/2"
                          style={{ left: "-88px" }}
                        />

                        {/* Content Card - RIGHT */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: 8 }}
                          transition={{ duration: 0.3 }}
                          className="bg-card border border-border p-8 text-left mr-auto"
                        >
                          {/* Phase number - large, prominent */}
                          <span className="block font-display text-7xl text-primary/20 mb-2 leading-none">
                            {phase.number}
                          </span>
                          <h3 className="text-3xl lg:text-4xl font-display text-foreground mb-4">
                            {phase.title}
                          </h3>
                          <p className="text-body-lg text-muted-foreground mb-6">
                            {phase.description}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-start">
                            {phase.kubes.map((kube) => (
                              <span
                                key={kube}
                                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
                              >
                                {kube}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: Stacked layout with left accent */}
          <div className="lg:hidden space-y-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary/30"
              >
                {/* Node dot */}
                <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary -translate-x-1/2" />
                
                <div className="bg-card border border-border p-6">
                  <span className="block font-display text-5xl text-primary/20 mb-2 leading-none">
                    {phase.number}
                  </span>
                  <h3 className="text-2xl font-display text-foreground mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-body text-muted-foreground mb-4">
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.kubes.map((kube) => (
                      <span
                        key={kube}
                        className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
                      >
                        {kube}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-24"
        >
          <Link
            to="/methodology"
            className="inline-flex items-center gap-3 text-subtitle text-foreground hover:text-primary transition-colors group"
          >
            Explore the full methodology
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
