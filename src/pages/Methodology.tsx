import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const phases = [
  {
    number: "01",
    label: "ASSESS",
    kubes: ["Assessment Kube", "Compliance Kube"],
    description: "Map your current state. Document infrastructure. Identify security gaps. Build your transformation roadmap.",
    deliverables: ["Infrastructure Inventory", "Security Assessment Report", "Compliance Gap Analysis", "Prioritized Remediation Roadmap"],
  },
  {
    number: "02",
    label: "REMEDIATE",
    kubes: ["Product Kube", "MSSP Kube", "Industry Kube"],
    description: "Close the gaps identified in assessment. Implement security controls. Deploy infrastructure. Configure systems.",
    deliverables: ["Security Control Implementation", "Infrastructure Deployment", "Policy Development", "Evidence Automation"],
  },
  {
    number: "03",
    label: "MANAGE",
    kubes: ["MSP Kube", "MSSP Kube"],
    description: "Day-to-day operations. 24/7 monitoring. Service desk. Incident response. Continuous threat detection.",
    deliverables: ["24/7 NOC/SOC Operations", "L1-L3 Service Desk", "Incident Management", "Continuous Monitoring"],
  },
  {
    number: "04",
    label: "OPTIMIZE",
    kubes: ["Advisory Kube", "Innovation Kube"],
    description: "Strategic guidance. Cost optimization. Process automation. Continuous improvement.",
    deliverables: ["Quarterly Business Reviews", "Cost Optimization Reports", "Automation Implementation", "Strategic Roadmapping"],
  },
];

const Methodology = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6"
            >
              The Methodology
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-8"
            >
              Assess. Remediate.
              <br />
              <span className="text-muted-foreground">Manage. Optimize.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-lg lg:text-xl text-muted-foreground max-w-2xl"
            >
              A systematic approach to IT transformation. Every engagement follows the same proven cycle.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t border-border py-16 lg:py-24"
              >
                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-sm text-muted-foreground">{phase.number}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-6">{phase.label}</h2>
                    <div className="space-y-2">
                      {phase.kubes.map((kube) => (
                        <p key={kube} className="font-mono text-base text-muted-foreground">→ {kube}</p>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="font-mono text-lg text-foreground leading-relaxed">{phase.description}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">Deliverables</p>
                    <ul className="space-y-2">
                      {phase.deliverables.map((d) => (
                        <li key={d} className="font-mono text-base text-muted-foreground">{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-8">
              Ready to start?
            </h2>
            <Link
              to="/kubes"
              className="inline-flex items-center gap-3 font-mono text-lg text-foreground hover:text-muted-foreground transition-colors group"
            >
              Explore the eight Kubes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Methodology;
