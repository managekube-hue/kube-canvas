import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const industries = [
  {
    id: "manufacturing",
    name: "M2BLOCK",
    title: "Manufacturing",
    description: "Smart factory OT/IT convergence, predictive maintenance, and supply chain optimization.",
    href: "/industries/manufacturing",
  },
  {
    id: "healthcare",
    name: "H2BLOCK",
    title: "Healthcare",
    description: "HIPAA-compliant infrastructure, telehealth platforms, and clinical system integrations.",
    href: "/industries/healthcare",
  },
  {
    id: "financial-services",
    name: "F2BLOCK",
    title: "Financial Services",
    description: "SOX/PCI compliance, fraud detection, and secure trading infrastructure.",
    href: "/industries/financial-services",
  },
  {
    id: "retail",
    name: "R2BLOCK",
    title: "Retail",
    description: "PCI-compliant POS, omnichannel integration, and inventory optimization.",
    href: "/industries/retail",
  },
  {
    id: "transportation",
    name: "T2BLOCK",
    title: "Transportation",
    description: "Fleet management, logistics optimization, and DOT compliance.",
    href: "/industries/transportation",
  },
  {
    id: "mining-extraction",
    name: "ME2BLOCK",
    title: "Mining & Extraction",
    description: "Remote site connectivity, safety systems, and environmental monitoring.",
    href: "/industries/mining-extraction",
  },
  {
    id: "energy-utilities",
    name: "EU2BLOCK",
    title: "Energy & Utilities",
    description: "NERC CIP compliance, SCADA security, and smart grid infrastructure.",
    href: "/industries/energy-utilities",
  },
  {
    id: "public-sector",
    name: "PS2BLOCK",
    title: "Public Sector",
    description: "FedRAMP/StateRAMP compliance, citizen services, and secure government infrastructure.",
    href: "/industries/public-sector",
  },
  {
    id: "telecommunications",
    name: "TC2BLOCK",
    title: "Telecommunications",
    description: "Network operations, 5G infrastructure, and carrier-grade security.",
    href: "/industries/telecommunications",
  },
];

const IndustryKube = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Industry Kube"
        subtitle="Pre-configured solution platforms for 9 verticals. Each BLOCK combines Dell infrastructure with IBM intelligence, tuned to your industry's specific compliance, operational, and technology requirements."
        phase="REMEDIATE"
      />

      {/* Industry Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-label text-muted-foreground mb-12"
            >
              9 Industry Platforms
            </motion.p>

            <div className="space-y-0">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border"
                >
                  <Link
                    to={industry.href}
                    className="group block py-8 lg:py-10"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-2">
                        <span className="text-label text-brand-orange font-bold">
                          {industry.name}
                        </span>
                      </div>
                      <div className="lg:col-span-3">
                        <h3 className="text-title text-foreground group-hover:translate-x-2 transition-transform">
                          {industry.title}
                        </h3>
                      </div>
                      <div className="lg:col-span-6">
                        <p className="text-body-lg text-muted-foreground">
                          {industry.description}
                        </p>
                      </div>
                      <div className="lg:col-span-1 flex justify-end">
                        <ArrowRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="text-label text-white/50 mb-6">How Industry Kubes Work</p>
                <h2 className="text-headline text-white">
                  Pre-configured for your vertical
                </h2>
              </div>
              <div className="space-y-8">
                <div className="border-l-4 border-brand-orange pl-6">
                  <h3 className="text-title text-white mb-2">Compliance Built-In</h3>
                  <p className="text-body-lg text-white/70">
                    Industry-specific frameworks (HIPAA, PCI, NERC CIP, etc.) are pre-mapped with controls and evidence collection.
                  </p>
                </div>
                <div className="border-l-4 border-brand-orange pl-6">
                  <h3 className="text-title text-white mb-2">Validated Architectures</h3>
                  <p className="text-body-lg text-white/70">
                    Dell and IBM reference architectures tested and certified for your industry's workloads.
                  </p>
                </div>
                <div className="border-l-4 border-brand-orange pl-6">
                  <h3 className="text-title text-white mb-2">Accelerated Deployment</h3>
                  <p className="text-body-lg text-white/70">
                    Pre-built integrations and configurations reduce implementation time by 40-60%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-headline text-foreground mb-8">Find your industry solution</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#assessment" className="btn-primary">
                Start Free Assessment
              </Link>
              <Link to="/contact" className="btn-secondary">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IndustryKube;

