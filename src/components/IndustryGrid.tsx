import { motion } from "framer-motion";
import { Factory, Heart, Landmark, ShoppingCart, Truck, HardHat, Zap, Building, Radio, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Factory,
    code: "M2BLOCK",
    name: "Manufacturing",
    tagline: "Production Excellence",
    description: "Integrated services for predictive maintenance, quality control, and secure OT/IT convergence. Utilizes Dell PowerEdge XR rugged servers and IBM Maximo to deliver 99.9% uptime.",
  },
  {
    icon: Heart,
    code: "H2BLOCK",
    name: "Healthcare",
    tagline: "Clinical Excellence",
    description: "Secure infrastructure services for clinical excellence, HIPAA compliance, and ransomware immunity. Utilizes Dell PowerMax for EHR performance and IBM Maximo for medical equipment.",
  },
  {
    icon: Landmark,
    code: "F2BLOCK",
    name: "Financial Services",
    tagline: "Mission-Critical Operations",
    description: "Resilient services for real-time fraud detection, T+0 regulatory reporting, and zero-trust access. Integrates Dell PowerMax and IBM z16 mainframe.",
  },
  {
    icon: ShoppingCart,
    code: "R2BLOCK",
    name: "Retail",
    tagline: "Omnichannel Commerce",
    description: "Managed services for unified omnichannel fulfillment, store operations management, and AI personalization. Utilizes Dell NativeEdge and IBM Sterling Order Management.",
  },
  {
    icon: Truck,
    code: "T2BLOCK",
    name: "Transportation",
    tagline: "Fleet Intelligence",
    description: "Integrated services for real-time fleet visibility, predictive maintenance, and logistics optimization. Delivers 98% on-time performance.",
  },
  {
    icon: HardHat,
    code: "ME2BLOCK",
    name: "Mining & Extraction",
    tagline: "Remote Operations Resilience",
    description: "Resilient services for remote operations, OT security, and environmental compliance. Delivers zero safety incidents.",
  },
  {
    icon: Zap,
    code: "EU2BLOCK",
    name: "Energy & Utilities",
    tagline: "Grid Resilience",
    description: "Managed services for grid stability, renewable integration, and NERC-CIP compliance. Utilizes Dell NativeEdge for substation management.",
  },
  {
    icon: Building,
    code: "PS2BLOCK",
    name: "Public Sector",
    tagline: "Citizen Services Digitization",
    description: "Managed services for secure citizen services, FedRAMP compliance, and smart city infrastructure. Utilizes Dell FedRAMP-authorized infrastructure.",
  },
  {
    icon: Radio,
    code: "TC2BLOCK",
    name: "Telecommunications",
    tagline: "Network Transformation",
    description: "Managed services for 5G core network transformation, edge monetization, and network automation. Utilizes Dell PowerEdge 17G servers for Open RAN.",
  },
];

export const IndustryGrid = () => {
  return (
    <section className="py-24 lg:py-32 section-light" id="industry">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6"
          style={{ color: "hsl(0 0% 2%)" }}
        >
          INDUSTRY-SPECIFIC SOLUTIONS.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-center max-w-3xl mx-auto mb-16"
          style={{ color: "hsl(0 0% 40%)" }}
        >
          Nine pre-integrated BLOCKs combining Dell infrastructure and IBM intelligence specifically architected for your vertical.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-4">
                <industry.icon className="w-8 h-8 text-primary" />
                <span className="font-mono text-xs px-2 py-1 rounded bg-secondary" style={{ color: "hsl(0 0% 40%)" }}>
                  {industry.code}
                </span>
              </div>

              <h3 className="font-display text-xl mb-1" style={{ color: "hsl(0 0% 2%)" }}>
                {industry.name}
              </h3>
              <div className="font-mono text-xs text-primary uppercase tracking-wider mb-4">
                {industry.tagline}
              </div>

              <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 40%)" }}>
                {industry.description}
              </p>

              <a
                href={`#${industry.code.toLowerCase()}`}
                className="font-mono text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                VIEW {industry.code} SOLUTIONS
                <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
