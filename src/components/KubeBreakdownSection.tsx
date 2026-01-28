import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const kubes = [
  {
    id: "assessment",
    name: "Assessment",
    tagline: "FREE entry point",
    description: "Infrastructure inventory, security assessment, compliance mapping, remediation roadmap.",
  },
  {
    id: "compliance",
    name: "Compliance",
    tagline: "Framework gaps closed",
    description: "Gap remediation, evidence automation, policy development, audit management.",
  },
  {
    id: "mssp",
    name: "MSSP",
    tagline: "24/7 SOC operations",
    description: "Threat detection, managed EDR/XDR, vulnerability management, Zero Trust architecture.",
  },
  {
    id: "msp",
    name: "MSP",
    tagline: "NOC & Service Desk",
    description: "L1-L3 support, hybrid infrastructure, managed workplace, BCDR.",
  },
  {
    id: "advisory",
    name: "Advisory",
    tagline: "vCIO & vCISO",
    description: "Strategic planning, security governance, Cloud FinOps, M&A due diligence.",
  },
  {
    id: "innovation",
    name: "Innovation",
    tagline: "AI & Automation",
    description: "Hyperautomation, DevSecOps, data intelligence, custom development.",
  },
  {
    id: "industry",
    name: "Industry",
    tagline: "9 vertical platforms",
    description: "Pre-built BLOCK platforms for manufacturing, healthcare, finance, and more.",
  },
  {
    id: "product",
    name: "Product",
    tagline: "Dell & IBM partnership",
    description: "Validated architectures, certified expertise, integrated technology stack.",
  },
];

export const KubeBreakdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-white" id="kubes">
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
              Capabilities
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Eight integrated modules.
            </h2>
          </motion.div>

          {/* 4x2 Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {kubes.map((kube, index) => (
              <motion.a
                key={kube.id}
                href={`#${kube.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="bg-background p-6 group hover:bg-foreground transition-colors duration-300"
              >
                <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60 transition-colors block mb-2">
                  {kube.tagline}
                </span>
                <h3 className="font-display text-xl text-foreground group-hover:text-background transition-colors mb-3">
                  {kube.name}
                </h3>
                <p className="font-mono text-xs text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed mb-4">
                  {kube.description}
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
