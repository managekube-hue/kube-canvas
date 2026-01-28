import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const industries = [
  { id: "manufacturing", name: "Manufacturing", block: "M2BLOCK", href: "/industries/manufacturing", focus: "OT Security, CMMC, Predictive Maintenance" },
  { id: "healthcare", name: "Healthcare", block: "H2BLOCK", href: "/industries/healthcare", focus: "HIPAA, Ransomware Immunity, EHR Performance" },
  { id: "financial", name: "Financial Services", block: "F2BLOCK", href: "/industries/financial-services", focus: "SOC 2, PCI DSS, Fraud Detection" },
  { id: "retail", name: "Retail", block: "R2BLOCK", href: "/industries/retail", focus: "PCI Compliance, Omnichannel, Supply Chain" },
  { id: "transportation", name: "Transportation", block: "T2BLOCK", href: "/industries/transportation", focus: "Fleet Management, IoT Security, Logistics" },
  { id: "mining", name: "Mining & Extraction", block: "ME2BLOCK", href: "/industries/mining-extraction", focus: "Remote Operations, OT/IT Convergence" },
  { id: "energy", name: "Energy & Utilities", block: "EU2BLOCK", href: "/industries/energy-utilities", focus: "NERC CIP, Grid Security, SCADA" },
  { id: "public", name: "Public Sector", block: "PS2BLOCK", href: "/industries/public-sector", focus: "FedRAMP, StateRAMP, Citizen Services" },
  { id: "telecom", name: "Telecommunications", block: "TC2BLOCK", href: "/industries/telecommunications", focus: "5G Security, Network Automation" },
];

const IndustryKube = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
                REMEDIATE Phase
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-sm text-muted-foreground">9 vertical platforms</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-8"
            >
              Industry Kube
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed"
            >
              Nine pre-integrated BLOCK platforms combining Dell infrastructure and IBM intelligence software specifically architected for your vertical. Compliance built in. Best practices pre-configured.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={industry.href}
                  className="block border-t border-border py-12 lg:py-16 group hover:bg-white transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4">
                      <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-2 group-hover:translate-x-2 transition-transform">
                        {industry.name}
                      </h2>
                      <span className="font-mono text-lg text-muted-foreground">{industry.block}</span>
                    </div>
                    <div className="lg:col-span-6">
                      <p className="font-mono text-lg text-muted-foreground">{industry.focus}</p>
                    </div>
                    <div className="lg:col-span-2 flex justify-end">
                      <ArrowRight className="w-6 h-6 text-foreground group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IndustryKube;
