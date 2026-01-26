import { motion } from "framer-motion";
import { Shield, Check } from "lucide-react";

const frameworks = [
  "NIST 800-53",
  "ISO 27001:2022",
  "SOC 2",
  "PCI DSS v4.0",
  "CMMC Level 2/3",
  "HIPAA",
  "FedRAMP",
  "NIST CSF 2.0",
  "CIS Controls v8.1",
  "FIPS 140-2/3",
];

const capabilities = [
  {
    title: "Smart Question Consolidation",
    description: "85-120 questions covering 1,200+ controls through multi-framework mapping.",
  },
  {
    title: "Automated Evidence Collection",
    description: "Direct integration with Dell CloudIQ, IBM QRadar, and infrastructure platforms.",
  },
  {
    title: "Remediation Roadmaps",
    description: "90-day implementation plans with resource allocation and timeline visibility.",
  },
  {
    title: "Continuous Monitoring",
    description: "Ongoing compliance posture tracking with drift detection and automated alerts.",
  },
];

export const ComplianceSection = () => {
  return (
    <section className="py-24 lg:py-32 section-light" id="compliance">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6"
          style={{ color: "hsl(0 0% 2%)" }}
        >
          ACHIEVE CONTINUOUS COMPLIANCE.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-center max-w-3xl mx-auto mb-16"
          style={{ color: "hsl(0 0% 40%)" }}
        >
          The Assessment Kube identifies technical gaps. We then implement controls that deliver continuous compliance across all major industry frameworks.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Frameworks Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl mb-6" style={{ color: "hsl(0 0% 2%)" }}>
              SUPPORTED FRAMEWORKS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {frameworks.map((framework, index) => (
                <motion.div
                  key={framework}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-border/20"
                >
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-mono text-sm" style={{ color: "hsl(0 0% 20%)" }}>
                    {framework}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl mb-6" style={{ color: "hsl(0 0% 2%)" }}>
              COMPLIANCE BY DESIGN
            </h3>
            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-5 shadow-sm border border-border/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-base mb-1" style={{ color: "hsl(0 0% 2%)" }}>
                        {capability.title}
                      </h4>
                      <p className="font-mono text-sm" style={{ color: "hsl(0 0% 40%)" }}>
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
