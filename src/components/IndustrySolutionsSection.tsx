import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const industries = [
  { id: "manufacturing", name: "Manufacturing", block: "M2BLOCK", href: "/industries/manufacturing" },
  { id: "healthcare", name: "Healthcare", block: "H2BLOCK", href: "/industries/healthcare" },
  { id: "financial", name: "Financial Services", block: "F2BLOCK", href: "/industries/financial-services" },
  { id: "retail", name: "Retail", block: "R2BLOCK", href: "/industries/retail" },
  { id: "transportation", name: "Transportation", block: "T2BLOCK", href: "/industries/transportation" },
  { id: "mining", name: "Mining & Extraction", block: "ME2BLOCK", href: "/industries/mining-extraction" },
  { id: "energy", name: "Energy & Utilities", block: "EU2BLOCK", href: "/industries/energy-utilities" },
  { id: "public", name: "Public Sector", block: "PS2BLOCK", href: "/industries/public-sector" },
  { id: "telecom", name: "Telecommunications", block: "TC2BLOCK", href: "/industries/telecommunications" },
];

export const IndustrySolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-white" id="industries">
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
              Industry Solutions
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] max-w-4xl">
              Pre-built platforms for
              <br />
              <span className="text-muted-foreground">regulated industries.</span>
            </h2>
          </motion.div>

          {/* Industries - Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <Link
                  to={industry.href}
                  className="block border-t border-border py-8 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl lg:text-2xl text-foreground mb-1 group-hover:translate-x-2 transition-transform">
                        {industry.name}
                      </h3>
                      <span className="font-mono text-sm text-muted-foreground">{industry.block}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
