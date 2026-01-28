/** DO NOT TOUCH - Kube breakdown section with 3D cubes and premium design */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Cube3D, FloatingCubes } from "./Cube3D";

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
    <section 
      ref={ref} 
      className="py-32 lg:py-48 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--brand-black)) 0%, hsl(0 0% 12%) 50%, hsl(var(--brand-black)) 100%)" }}
      id="kubes"
    >
      {/* Floating 3D Cubes Background */}
      <FloatingCubes />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/20 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <div className="h-1 w-16 bg-primary mb-8" />
          <h2 className="text-headline text-background mb-6">
            Eight <span className="text-primary">Kubes</span>.
            <br />Infinite Configurations.
          </h2>
          <p className="text-body-xl text-background/70">
            Each Kube contains configurable Blocks—specific capabilities you can add, remove, or scale independently.
          </p>
        </motion.div>

        {/* Kubes Grid - 2 columns with 3D cube accents */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {kubes.map((kube, index) => (
            <motion.div
              key={kube.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            >
              <Link
                to={kube.href}
                className="group block relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              >
                {/* Mini 3D Cube accent */}
                <motion.div
                  className="absolute -top-4 -right-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Cube3D size={40} delay={index * 0.1} />
                </motion.div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Tagline */}
                    <span className="text-caption text-primary mb-2 block">{kube.tagline}</span>
                    
                    {/* Name */}
                    <h3 className="text-title text-background group-hover:text-primary transition-colors mb-3">
                      {kube.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-body text-background/60">{kube.description}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-6 h-6 text-background/40 group-hover:text-primary group-hover:translate-x-2 transition-all flex-shrink-0 mt-8" />
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16"
        >
          <Link
            to="/kubes"
            className="inline-flex items-center gap-3 text-subtitle text-background hover:text-primary transition-colors group"
          >
            Explore all Kubes
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Large decorative cube in corner */}
      <motion.div
        className="absolute -bottom-20 -right-20 opacity-20"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Cube3D size={200} />
      </motion.div>
    </section>
  );
};
