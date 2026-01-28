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
    <section ref={ref} className="py-32 lg:py-48 section-white" id="methodology">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <div className="accent-line mb-8" />
          <h2 className="text-headline text-foreground mb-6">
            One Methodology.<br />Four Phases.
          </h2>
          <p className="text-body-xl text-muted-foreground">
            Every engagement follows this proven sequence. The Kubes activate at each phase to deliver exactly what you need.
          </p>
        </motion.div>

        {/* Phases */}
        <div className="space-y-0">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="border-t border-border py-12 lg:py-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="text-display text-brand-orange">{phase.number}</span>
              </div>

              {/* Title */}
              <div className="lg:col-span-2">
                <h3 className="text-title text-foreground">{phase.title}</h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-5">
                <p className="text-body-lg text-muted-foreground">{phase.description}</p>
              </div>

              {/* Kubes */}
              <div className="lg:col-span-3">
                <div className="text-caption text-muted-foreground mb-3">Active Kubes</div>
                <div className="space-y-2">
                  {phase.kubes.map((kube) => (
                    <div key={kube} className="text-body text-foreground">{kube}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-border pt-12 mt-8"
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
