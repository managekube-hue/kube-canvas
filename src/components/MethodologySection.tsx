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

        {/* Zigzag Tree Roadmap */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20 -translate-x-1/2"
            style={{ zIndex: 0 }}
          />

          {phases.map((phase, index) => {
            const isLeft = index % 2 === 0;
            const Icon = phase.icon;
            
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Branch line connecting to center */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "50%" } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  className={`hidden lg:block absolute top-1/2 h-px bg-gradient-to-r ${
                    isLeft 
                      ? "right-1/2 from-transparent to-primary/50" 
                      : "left-1/2 from-primary/50 to-transparent"
                  }`}
                  style={{ width: "calc(50% - 40px)" }}
                />

                {/* Center node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.2, type: "spring" }}
                  className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg"
                  style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
                >
                  <Icon className="w-7 h-7 text-background" strokeWidth={1.5} />
                </motion.div>

                {/* Content card */}
                <div className={`w-full lg:w-[calc(50%-60px)] ${isLeft ? "lg:pr-8" : "lg:pl-8"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-card border border-border p-8 relative ${
                      isLeft ? "lg:mr-auto lg:text-right" : "lg:ml-auto lg:text-left"
                    }`}
                  >
                    {/* Phase number accent */}
                    <div className={`absolute ${isLeft ? "right-8" : "left-8"} -top-4`}>
                      <span className="text-display text-primary/20 font-bold">{phase.number}</span>
                    </div>

                    <h3 className="text-title text-foreground mb-4 mt-6">{phase.title}</h3>
                    <p className="text-body-lg text-muted-foreground mb-6">{phase.description}</p>
                    
                    {/* Active Kubes */}
                    <div className={`flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}>
                      {phase.kubes.map((kube) => (
                        <span
                          key={kube}
                          className="px-3 py-1 text-caption bg-primary/10 text-primary border border-primary/20"
                        >
                          {kube}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for opposite side on mobile */}
                <div className="hidden lg:block w-[calc(50%-60px)]" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-20"
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
