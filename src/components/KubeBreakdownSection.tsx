import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const kubes = [
  {
    id: "assessment",
    name: "Assessment",
    tagline: "FREE entry point",
    description: "Infrastructure inventory, security assessment, compliance mapping, remediation roadmap.",
    href: "/kubes/assessment-kube",
  },
  {
    id: "compliance",
    name: "Compliance",
    tagline: "Framework gaps closed",
    description: "Gap remediation, evidence automation, policy development, audit management.",
    href: "/kubes/compliance-kube",
  },
  {
    id: "mssp",
    name: "MSSP",
    tagline: "24/7 SOC operations",
    description: "Threat detection, managed EDR/XDR, vulnerability management, Zero Trust architecture.",
    href: "/kubes/mssp-kube",
  },
  {
    id: "msp",
    name: "MSP",
    tagline: "NOC & Service Desk",
    description: "L1-L3 support, hybrid infrastructure, managed workplace, BCDR.",
    href: "/kubes/msp-kube",
  },
  {
    id: "advisory",
    name: "Advisory",
    tagline: "vCIO & vCISO",
    description: "Strategic planning, security governance, Cloud FinOps, M&A due diligence.",
    href: "/kubes/advisory-kube",
  },
  {
    id: "innovation",
    name: "Innovation",
    tagline: "AI & Automation",
    description: "Hyperautomation, DevSecOps, data intelligence, custom development.",
    href: "/kubes/innovation-kube",
  },
  {
    id: "industry",
    name: "Industry",
    tagline: "9 vertical platforms",
    description: "Pre-built BLOCK platforms for manufacturing, healthcare, finance, and more.",
    href: "/kubes/industry-kube",
  },
  {
    id: "product",
    name: "Product",
    tagline: "Dell & IBM partnership",
    description: "Validated architectures, certified expertise, integrated technology stack.",
    href: "/kubes/product-kube",
  },
];

export const KubeBreakdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-[#FAFAFA]" id="kubes">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-24"
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Capabilities
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              Eight integrated Kubes.
            </h2>
          </motion.div>

          {/* Kubes List - Staggered Row Layout */}
          <div className="space-y-0">
            {kubes.map((kube, index) => (
              <motion.div
                key={kube.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              >
                <Link
                  to={kube.href}
                  className="block border-t border-border py-10 lg:py-12 group hover:bg-white transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12"
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-3">
                      <h3 className="font-display text-2xl lg:text-3xl text-foreground group-hover:translate-x-2 transition-transform">
                        {kube.name}
                      </h3>
                    </div>
                    <div className="lg:col-span-2">
                      <span className="font-mono text-sm text-muted-foreground">{kube.tagline}</span>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="font-mono text-base text-muted-foreground">{kube.description}</p>
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
      </div>
    </section>
  );
};
