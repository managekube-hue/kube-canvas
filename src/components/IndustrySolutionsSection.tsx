import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const industries = [
  { id: "m2block", name: "Manufacturing", block: "M2BLOCK", focus: "OT Security, CMMC, Predictive Maintenance" },
  { id: "h2block", name: "Healthcare", block: "H2BLOCK", focus: "HIPAA, Ransomware Immunity, EHR Performance" },
  { id: "f2block", name: "Financial Services", block: "F2BLOCK", focus: "SOC 2, PCI DSS, Fraud Detection" },
  { id: "r2block", name: "Retail", block: "R2BLOCK", focus: "PCI Compliance, Omnichannel, Supply Chain" },
  { id: "t2block", name: "Transportation", block: "T2BLOCK", focus: "Fleet Management, IoT Security, Logistics" },
  { id: "me2block", name: "Mining & Extraction", block: "ME2BLOCK", focus: "Remote Operations, OT/IT Convergence" },
  { id: "eu2block", name: "Energy & Utilities", block: "EU2BLOCK", focus: "NERC CIP, Grid Security, SCADA" },
  { id: "ps2block", name: "Public Sector", block: "PS2BLOCK", focus: "FedRAMP, StateRAMP, Citizen Services" },
  { id: "tc2block", name: "Telecom", block: "TC2BLOCK", focus: "5G Security, Network Automation" },
];

export const IndustrySolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-white" id="industry">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Industry Solutions
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-4">
              Pre-built platforms for
              <br />
              regulated industries.
            </h2>
            <p className="font-mono text-base text-muted-foreground max-w-xl">
              Dell infrastructure. IBM software. Compliance built in.
            </p>
          </motion.div>

          {/* 3x3 Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {industries.map((industry, index) => (
              <motion.a
                key={industry.id}
                href={`#${industry.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="bg-background p-6 group hover:bg-foreground transition-colors duration-300"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display text-lg text-foreground group-hover:text-background transition-colors">
                    {industry.name}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60 transition-colors">
                    {industry.block}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground group-hover:text-background/70 transition-colors mb-4">
                  {industry.focus}
                </p>
                <span className="font-mono text-xs text-foreground group-hover:text-background transition-colors flex items-center gap-1">
                  Explore
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
