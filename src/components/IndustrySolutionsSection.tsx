import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Factory, HeartPulse, Landmark, ShoppingCart, Truck, Mountain, Zap, Building, Radio } from "lucide-react";

const industries = [
  {
    id: "m2block",
    name: "MANUFACTURING",
    block: "M2BLOCK",
    icon: Factory,
    features: ["OT Security", "CMMC", "Predictive Maintenance"],
  },
  {
    id: "h2block",
    name: "HEALTHCARE",
    block: "H2BLOCK",
    icon: HeartPulse,
    features: ["HIPAA", "Ransomware Recovery", "Patient Data Protection"],
  },
  {
    id: "f2block",
    name: "FINANCIAL SERVICES",
    block: "F2BLOCK",
    icon: Landmark,
    features: ["SOC 2", "PCI DSS", "Fraud Detection"],
  },
  {
    id: "r2block",
    name: "RETAIL",
    block: "R2BLOCK",
    icon: ShoppingCart,
    features: ["PCI Compliance", "Omnichannel Security", "Supply Chain"],
  },
  {
    id: "t2block",
    name: "TRANSPORTATION",
    block: "T2BLOCK",
    icon: Truck,
    features: ["Fleet Management", "IoT Security", "Logistics Optimization"],
  },
  {
    id: "me2block",
    name: "MINING & EXTRACTION",
    block: "ME2BLOCK",
    icon: Mountain,
    features: ["Remote Operations", "OT/IT Convergence", "Environmental Monitoring"],
  },
  {
    id: "eu2block",
    name: "ENERGY & UTILITIES",
    block: "EU2BLOCK",
    icon: Zap,
    features: ["NERC CIP", "Grid Security", "SCADA Protection"],
  },
  {
    id: "ps2block",
    name: "PUBLIC SECTOR",
    block: "PS2BLOCK",
    icon: Building,
    features: ["FedRAMP", "StateRAMP", "Citizen Services"],
  },
  {
    id: "tc2block",
    name: "TELECOM",
    block: "TC2BLOCK",
    icon: Radio,
    features: ["5G Security", "Network Operations", "Service Assurance"],
  },
];

export const IndustrySolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-white" id="industry">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-center text-foreground mb-6"
          >
            PRE-BUILT PLATFORMS FOR REGULATED INDUSTRIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-body-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          >
            Dell infrastructure. IBM software. Compliance built in.
          </motion.p>

          {/* 3x3 Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {industries.map((industry, index) => (
              <motion.a
                key={industry.id}
                href={`#${industry.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="card-enterprise group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <industry.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-display text-base text-foreground">
                      {industry.name}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {industry.block}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-1 mb-4">
                  {industry.features.map((feature) => (
                    <li key={feature} className="font-mono text-xs text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <span className="font-mono text-xs text-foreground flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
