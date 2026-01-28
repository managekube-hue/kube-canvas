/** DO NOT TOUCH - Creative zigzag methodology section */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Search, Wrench, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  {
    number: "01",
    title: "ASSESS",
    icon: Search,
    description: "Comprehensive discovery of your infrastructure, security posture, and compliance gaps. Free for qualified engagements.",
    kubes: ["Assessment Kube", "Compliance Kube"],
    color: "from-brand-orange/20 to-transparent",
  },
  {
    number: "02",
    title: "REMEDIATE",
    icon: Wrench,
    description: "Close the gaps. Deploy infrastructure. Implement controls. Configure platforms for your specific industry.",
    kubes: ["Product Kube", "Industry Kube", "MSSP Kube"],
    color: "from-brand-orange/15 to-transparent",
  },
  {
    number: "03",
    title: "MANAGE",
    icon: Settings,
    description: "24/7 operations. Service desk. Security monitoring. Proactive maintenance with SLA-backed support.",
    kubes: ["MSP Kube", "MSSP Kube"],
    color: "from-brand-orange/20 to-transparent",
  },
  {
    number: "04",
    title: "OPTIMIZE",
    icon: TrendingUp,
    description: "Continuous improvement. FinOps. Process automation. Strategic guidance from virtual executives.",
    kubes: ["Advisory Kube", "Innovation Kube"],
    color: "from-brand-orange/15 to-transparent",
  },
];

export const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background overflow-hidden" id="methodology">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="h-1 w-20 bg-brand-orange mx-auto mb-8" />
          <h2 className="text-headline text-foreground mb-6">
            One Methodology. Four Phases.
          </h2>
          <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto">
            Every engagement follows this proven sequence. The Kubes activate at each phase to deliver exactly what you need.
          </p>
        </motion.div>

        {/* Zigzag Phases Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-orange via-brand-orange/50 to-brand-orange origin-top hidden lg:block"
          />

          {phases.map((phase, index) => {
            const isLeft = index % 2 === 0;
            const Icon = phase.icon;

            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                className={`relative grid lg:grid-cols-2 gap-8 mb-16 lg:mb-24 ${
                  isLeft ? "" : "lg:direction-rtl"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`${
                    isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:col-start-2 lg:text-left"
                  }`}
                >
                  <div
                    className={`relative p-8 lg:p-10 bg-gradient-to-br ${phase.color} border border-border hover:border-brand-orange/30 transition-colors`}
                  >
                    {/* Phase Number */}
                    <div className={`flex items-center gap-4 mb-6 ${isLeft ? "lg:justify-end" : ""}`}>
                      <span className="text-6xl lg:text-7xl font-bold text-brand-orange/30">
                        {phase.number}
                      </span>
                      <h3 className="text-title text-foreground tracking-wider">
                        {phase.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-body-lg text-muted-foreground mb-6">
                      {phase.description}
                    </p>

                    {/* Active Kubes */}
                    <div className={`${isLeft ? "lg:text-right" : ""}`}>
                      <div className="text-caption text-muted-foreground mb-3 uppercase tracking-wider">
                        Active Kubes
                      </div>
                      <div className={`flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
                        {phase.kubes.map((kube) => (
                          <span
                            key={kube}
                            className="px-3 py-1 text-sm bg-secondary text-foreground border border-border"
                          >
                            {kube}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Node on Trunk */}
                <div
                  className={`absolute left-1/2 top-8 transform -translate-x-1/2 hidden lg:flex items-center justify-center`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                    className="w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/30"
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden lg:block ${isLeft ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`} />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Link
            to="/methodology"
            className="inline-flex items-center gap-3 text-subtitle text-foreground hover:text-brand-orange transition-colors group"
          >
            Explore the full methodology
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
/** END DO NOT TOUCH */
