import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const industries = [
  {
    id: "m2block",
    name: "Manufacturing M2BLOCK",
    description: "Production excellence through intelligent operations. Predictive maintenance, automated quality control, and production optimization.",
    href: "/industries/manufacturing",
    challenge: "Unplanned downtime, quality defects, manual inspection processes",
  },
  {
    id: "h2block",
    name: "Healthcare H2BLOCK",
    description: "Clinical excellence through secure infrastructure. HIPAA compliance, EHR optimization, and medical device integration.",
    href: "/industries/healthcare",
    challenge: "Slow EHR systems, compliance requirements, cybersecurity threats",
  },
  {
    id: "f2block",
    name: "Financial Services F2BLOCK",
    description: "Regulatory compliance through resilient platforms. Real-time fraud detection, trading system performance, and audit readiness.",
    href: "/industries/financial-services",
    challenge: "Regulatory pressure, fraud prevention, transaction latency",
  },
  {
    id: "r2block",
    name: "Retail R2BLOCK",
    description: "Omnichannel excellence through unified commerce. Inventory optimization, customer experience, and store technology.",
    href: "/industries/retail",
    challenge: "Omnichannel integration, inventory visibility, customer experience",
  },
  {
    id: "t2block",
    name: "Transportation T2BLOCK",
    description: "Fleet intelligence through connected operations. Route optimization, asset tracking, and driver compliance.",
    href: "/industries/transportation",
    challenge: "Fuel costs, asset utilization, regulatory compliance",
  },
  {
    id: "me2block",
    name: "Mining & Extraction ME2BLOCK",
    description: "Remote operations through resilient infrastructure. Harsh environment computing, safety systems, and environmental compliance.",
    href: "/industries/mining-extraction",
    challenge: "Extreme environments, equipment failures, safety and compliance",
  },
  {
    id: "eu2block",
    name: "Energy & Utilities EU2BLOCK",
    description: "Grid resilience through intelligent asset management. Renewable integration, SCADA security, and sustainability reporting.",
    href: "/industries/energy-utilities",
    challenge: "Grid stability, aging assets, cybersecurity for OT",
  },
  {
    id: "ps2block",
    name: "Public Sector PS2BLOCK",
    description: "Citizen services through secure digital platforms. FedRAMP compliance, remote work enablement, and legacy modernization.",
    href: "/industries/public-sector",
    challenge: "Legacy systems, compliance requirements, citizen service delivery",
  },
  {
    id: "tc2block",
    name: "Telecommunications TC2BLOCK",
    description: "Network transformation through cloud-native infrastructure. 5G deployment, BSS/OSS modernization, and edge computing.",
    href: "/industries/telecommunications",
    challenge: "5G deployment, legacy BSS/OSS, operational expenses",
  },
];

const IndustryKube = () => {
  return (
    <PageLayout>
      <PageBanner 
        title="Industry Kube" 
        subtitle="Pre-integrated business transformation platforms designed for nine industry verticals. Each BLOCK combines enterprise infrastructure, intelligent software, and comprehensive managed services into outcome-focused solutions."
        phase="REMEDIATE"
      />

      {/* Value Proposition */}
      <section className="py-20 lg:py-24 bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-label text-muted-foreground mb-6"
            >
              THE MANAGEKUBE DIFFERENCE
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-body-xl text-foreground leading-relaxed"
            >
              Organizations engage these platforms to achieve specific business results rather than purchasing and integrating technology components independently. A manufacturing organization does not procure servers, storage systems, and software licenses separately. Instead, they engage the Manufacturing M2BLOCK platform to establish predictive maintenance capabilities, automated quality control, and production optimization. The underlying technology stack operates transparently while delivering measurable operational improvements.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-label text-muted-foreground mb-4"
            >
              NINE INDUSTRY VERTICALS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-headline text-foreground"
            >
              Select Your Industry
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={industry.href}
                  className="group block h-full p-8 bg-white border border-border hover:border-foreground transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-orange transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-body text-muted-foreground mb-4">
                    {industry.description}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-6">
                    <strong>Challenge:</strong> {industry.challenge}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-brand-orange transition-colors">
                    Explore BLOCK
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizing Section */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="text-label text-background/50 mb-6">FLEXIBLE ENGAGEMENT</p>
                <h2 className="text-headline text-background">Scale to Your Size</h2>
              </div>
              <div className="space-y-8">
                <div className="border-l-4 border-brand-orange pl-6">
                  <h3 className="text-xl font-bold text-background mb-2">Small Business Entry</h3>
                  <p className="text-body text-background/70">10-100 users, single location. $5K-15K/month.</p>
                </div>
                <div className="border-l-4 border-brand-orange pl-6">
                  <h3 className="text-xl font-bold text-background mb-2">Mid-Market Standard</h3>
                  <p className="text-body text-background/70">100-1,000 users, 2-5 locations. $25K-75K/month.</p>
                </div>
                <div className="border-l-4 border-brand-orange pl-6">
                  <h3 className="text-xl font-bold text-background mb-2">Enterprise Global</h3>
                  <p className="text-body text-background/70">1,000+ users, 10+ locations. $150K-500K+/month.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default IndustryKube;
