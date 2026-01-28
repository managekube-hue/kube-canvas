import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Server, Lightbulb, BarChart3, Zap, Factory, Package, ClipboardCheck } from "lucide-react";

const kubes = [
  {
    id: "assessment",
    name: "ASSESSMENT KUBE",
    icon: ClipboardCheck,
    tagline: "FREE Entry Point",
    features: ["Infrastructure Inventory", "Security Assessment", "Compliance Mapping"],
  },
  {
    id: "compliance",
    name: "COMPLIANCE KUBE",
    icon: Shield,
    tagline: "Framework Gaps Closed",
    features: ["Gap Remediation", "Evidence Automation", "Audit Management"],
  },
  {
    id: "mssp",
    name: "MSSP KUBE",
    icon: Shield,
    tagline: "24/7 SOC, EDR/XDR, Vuln Mgmt",
    features: ["Security Operations", "Threat Detection", "Vulnerability Management"],
  },
  {
    id: "msp",
    name: "MSP KUBE",
    icon: Server,
    tagline: "NOC, Service Desk",
    features: ["Service Desk L1-L3", "Hybrid Infrastructure", "BCDR"],
  },
  {
    id: "advisory",
    name: "ADVISORY KUBE",
    icon: BarChart3,
    tagline: "vCIO/vCISO, FinOps, Strategy",
    features: ["Virtual CISO", "Virtual CIO", "Cloud FinOps"],
  },
  {
    id: "innovation",
    name: "INNOVATION KUBE",
    icon: Zap,
    tagline: "RPA, DevSecOps, AI Agents",
    features: ["Hyperautomation", "DevSecOps", "Data Intelligence"],
  },
  {
    id: "industry",
    name: "INDUSTRY KUBE",
    icon: Factory,
    tagline: "9 Vertical Platforms Pre-Built",
    features: ["M2BLOCK", "H2BLOCK", "F2BLOCK", "+6 more"],
  },
  {
    id: "product",
    name: "PRODUCT KUBE",
    icon: Package,
    tagline: "Project Config, BOM Gen",
    features: ["Dell Infrastructure", "IBM Software", "Custom BOMs"],
  },
];

export const KubeBreakdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-white" id="kubes">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-center text-foreground mb-16"
          >
            EIGHT INTEGRATED MODULES
          </motion.h2>

          {/* 4x2 Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {kubes.map((kube, index) => (
              <motion.a
                key={kube.id}
                href={`#${kube.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="card-enterprise group cursor-pointer"
              >
                <kube.icon className="w-6 h-6 text-foreground mb-4" strokeWidth={1.5} />
                
                <h3 className="font-display text-lg text-foreground mb-2">
                  {kube.name}
                </h3>
                
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  {kube.tagline}
                </p>
                
                <ul className="space-y-1 mb-4">
                  {kube.features.map((feature) => (
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
