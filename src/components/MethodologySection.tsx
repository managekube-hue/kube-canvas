/** DO NOT TOUCH - Methodology section with zigzag tree/branch roadmap design */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Target, Wrench, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  {
    number: "01",
    title: "Assess",
    description: "Comprehensive discovery of your infrastructure, security posture, and compliance gaps. Free for qualified engagements.",
    kubes: ["Assessment Kube", "Compliance Kube"],
    icon: Target,
  },
  {
    number: "02",
    title: "Remediate",
    description: "Close the gaps. Deploy infrastructure. Implement controls. Configure platforms for your specific industry.",
    kubes: ["Product Kube", "Industry Kube", "MSSP Kube"],
    icon: Wrench,
  },
  {
    number: "03",
    title: "Manage",
    description: "24/7 operations. Service desk. Security monitoring. Proactive maintenance with SLA-backed support.",
    kubes: ["MSP Kube", "MSSP Kube"],
    icon: Settings,
  },
  {
    number: "04",
    title: "Optimize",
    description: "Continuous improvement. FinOps. Process automation. Strategic guidance from virtual executives.",
    kubes: ["Advisory Kube", "Innovation Kube"],
    icon: TrendingUp,
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

        {/* TRUE ZIGZAG TREE ROADMAP - Cards alternate LEFT and RIGHT with central trunk */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central vertical trunk line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/30 -translate-x-1/2 hidden lg:block"
            style={{ zIndex: 1 }}
          />

          <div className="space-y-0">
            {phases.map((phase, index) => {
              const isLeft = index % 2 === 0;
              const Icon = phase.icon;
              
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                  className="relative"
                >
                  {/* Desktop Layout: True Zigzag */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0 items-center min-h-[280px]">
                    
                    {/* LEFT SIDE */}
                    <div className={`${isLeft ? 'pr-16' : ''}`}>
                      {isLeft && (
                        <div className="relative">
                          {/* Horizontal branch from card to trunk */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "64px" } : {}}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                            className="absolute right-0 top-1/2 h-0.5 bg-gradient-to-r from-border to-primary/50"
                            style={{ transform: 'translateX(100%)' }}
                          />
                          
                          {/* Content Card - LEFT aligned */}
                          <motion.div
                            whileHover={{ scale: 1.02, x: -8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-card border border-border p-8 relative text-right ml-auto max-w-lg"
                          >
                            {/* Phase number watermark */}
                            <span className="absolute top-4 right-6 text-6xl font-bold text-primary/15 select-none">
                              {phase.number}
                            </span>

                            <h3 className="text-3xl lg:text-4xl font-display text-foreground mb-4 relative z-10">
                              {phase.title}
                            </h3>
                            <p className="text-body-lg text-muted-foreground mb-6 relative z-10">
                              {phase.description}
                            </p>
                            
                            {/* Kube Tags */}
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

                    {/* CENTER: Icon Node on the Trunk */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.15, type: "spring", stiffness: 200 }}
                      className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center z-20 shadow-xl"
                      style={{ boxShadow: "0 0 40px hsl(var(--primary) / 0.5)" }}
                    >
                      <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <div className={`${!isLeft ? 'pl-16' : ''}`}>
                      {!isLeft && (
                        <div className="relative">
                          {/* Horizontal branch from trunk to card */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "64px" } : {}}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                            className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-l from-border to-primary/50"
                            style={{ transform: 'translateX(-100%)' }}
                          />
                          
                          {/* Content Card - RIGHT aligned */}
                          <motion.div
                            whileHover={{ scale: 1.02, x: 8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-card border border-border p-8 relative text-left mr-auto max-w-lg"
                          >
                            {/* Phase number watermark */}
                            <span className="absolute top-4 left-6 text-6xl font-bold text-primary/15 select-none">
                              {phase.number}
                            </span>

                            <h3 className="text-3xl lg:text-4xl font-display text-foreground mb-4 relative z-10">
                              {phase.title}
                            </h3>
                            <p className="text-body-lg text-muted-foreground mb-6 relative z-10">
                              {phase.description}
                            </p>
                            
                            {/* Kube Tags */}
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
                  </div>

                  {/* Mobile Layout: Stacked with left accent */}
                  <div className="lg:hidden relative pl-16 pb-12">
                    {/* Vertical line for mobile */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
                    
                    {/* Icon node for mobile */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="absolute left-0 top-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg"
                    >
                      <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
                    </motion.div>

                    {/* Content Card for mobile */}
                    <div className="bg-card border border-border p-6 relative">
                      <span className="absolute top-3 right-4 text-4xl font-bold text-primary/15 select-none">
                        {phase.number}
                      </span>
                      <h3 className="text-2xl font-display text-foreground mb-3">{phase.title}</h3>
                      <p className="text-body text-muted-foreground mb-4">{phase.description}</p>
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
                  </div>
                </motion.div>
              );
            })}
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
