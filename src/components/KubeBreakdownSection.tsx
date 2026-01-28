import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const kubes = [
  {
    id: "assessment",
    name: "Assessment",
    tagline: "The Free Entry Point",
    description: "Comprehensive infrastructure, security, and compliance discovery. Generates your transformation roadmap.",
    href: "/kubes/assessment-kube",
  },
  {
    id: "compliance",
    name: "Compliance",
    tagline: "Framework Mastery",
    description: "NIST, SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS. Policy development. Evidence automation. Audit support.",
    href: "/kubes/compliance-kube",
  },
  {
    id: "mssp",
    name: "MSSP",
    tagline: "Security Operations",
    description: "24/7 SOC. EDR/XDR. Vulnerability management. Threat hunting. Incident response.",
    href: "/kubes/mssp-kube",
  },
  {
    id: "msp",
    name: "MSP",
    tagline: "IT Operations",
    description: "Service desk L1–L3. Hybrid infrastructure. Cloud management. BCDR. End-user support.",
    href: "/kubes/msp-kube",
  },
  {
    id: "advisory",
    name: "Advisory",
    tagline: "Strategic Leadership",
    description: "Virtual CISO. Virtual CIO. Cloud FinOps. Technology roadmapping. M&A due diligence.",
    href: "/kubes/advisory-kube",
  },
  {
    id: "innovation",
    name: "Innovation",
    tagline: "Automation & AI",
    description: "Hyperautomation. RPA. AI agents. DevSecOps. Process intelligence.",
    href: "/kubes/innovation-kube",
  },
  {
    id: "industry",
    name: "Industry",
    tagline: "9 Vertical Platforms",
    description: "Pre-built BLOCKs for manufacturing, healthcare, financial services, and 6 more regulated verticals.",
    href: "/kubes/industry-kube",
  },
  {
    id: "product",
    name: "Product",
    tagline: "The Configurator",
    description: "Project scoping. BOM generation. Dell infrastructure. IBM software. Partner procurement.",
    href: "/kubes/product-kube",
  },
];

export const KubeBreakdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 section-white" id="kubes">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <div className="accent-line mb-8" />
          <h2 className="text-headline text-foreground mb-6">
            Eight <span className="text-brand-orange">Kubes</span>.
            <br />Infinite Configurations.
          </h2>
          <p className="text-body-xl text-muted-foreground">
            Each Kube contains configurable Blocks—specific capabilities you can add, remove, or scale independently.
          </p>
        </motion.div>

        {/* Kubes List */}
        <div className="space-y-0">
          {kubes.map((kube, index) => (
            <motion.div
              key={kube.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            >
              <Link
                to={kube.href}
                className="block border-t border-border py-8 lg:py-10 group"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* Name */}
                  <div className="lg:col-span-3">
                    <h3 className="text-title text-foreground group-hover:text-brand-orange transition-colors">
                      {kube.name}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <div className="lg:col-span-2">
                    <span className="text-label text-brand-orange">{kube.tagline}</span>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-6">
                    <p className="text-body-lg text-muted-foreground">{kube.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="lg:col-span-1 flex justify-end">
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="border-t border-border pt-12 mt-8"
        >
          <Link
            to="/kubes"
            className="inline-flex items-center gap-3 text-subtitle text-foreground hover:text-brand-orange transition-colors group"
          >
            Explore all Kubes
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
