import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const phases = [
  {
    id: "assess",
    label: "ASSESS",
    kubes: ["Assessment", "Compliance"],
  },
  {
    id: "remediate",
    label: "REMEDIATE",
    kubes: ["Product", "MSSP", "Industry"],
  },
  {
    id: "manage",
    label: "MANAGE",
    kubes: ["MSP", "MSSP"],
  },
  {
    id: "optimize",
    label: "OPTIMIZE",
    kubes: ["Advisory", "Innovation"],
  },
];

export const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 section-white"
      id="methodology"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-center text-foreground mb-20"
          >
            ONE METHODOLOGY. FOUR PHASES. EIGHT MODULES.
          </motion.h2>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />

            {/* Phases */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  {/* Phase Box */}
                  <button
                    onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                    className={`phase-box w-full text-center mb-4 ${
                      activePhase === phase.id ? "active" : ""
                    }`}
                  >
                    <span className="font-display text-xl lg:text-2xl">
                      {phase.label}
                    </span>
                  </button>

                  {/* Arrow (except last) */}
                  {index < phases.length - 1 && (
                    <span className="hidden md:block absolute top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-2xl"
                      style={{ left: `${(index + 1) * 25 - 2}%` }}>
                      →
                    </span>
                  )}

                  {/* Kubes List */}
                  <div className={`space-y-1 transition-all duration-300 ${
                    activePhase === phase.id || activePhase === null ? "opacity-100" : "opacity-30"
                  }`}>
                    {phase.kubes.map((kube) => (
                      <p
                        key={kube}
                        className="font-mono text-sm text-muted-foreground"
                      >
                        {kube}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Closing Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-body text-foreground text-center mt-16"
          >
            Every engagement follows this sequence.
            <br />
            No gaps. No handoffs. No surprises.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
