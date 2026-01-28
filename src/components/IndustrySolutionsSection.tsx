import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const industries = [
  { name: "Manufacturing", block: "M2BLOCK", href: "/industries/manufacturing" },
  { name: "Healthcare", block: "H2BLOCK", href: "/industries/healthcare" },
  { name: "Financial Services", block: "F2BLOCK", href: "/industries/financial-services" },
  { name: "Retail", block: "R2BLOCK", href: "/industries/retail" },
  { name: "Transportation", block: "T2BLOCK", href: "/industries/transportation" },
  { name: "Mining & Extraction", block: "ME2BLOCK", href: "/industries/mining-extraction" },
  { name: "Energy & Utilities", block: "EU2BLOCK", href: "/industries/energy-utilities" },
  { name: "Public Sector", block: "PS2BLOCK", href: "/industries/public-sector" },
  { name: "Telecommunications", block: "TC2BLOCK", href: "/industries/telecommunications" },
];

export const IndustrySolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 section-off-white" id="industries">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-20"
        >
          <div className="accent-line mb-8" />
          <h2 className="text-headline text-foreground mb-6">
            Pre-built platforms for{" "}
            <span className="text-brand-orange">regulated industries</span>
          </h2>
          <p className="text-body-xl text-muted-foreground">
            Each BLOCK combines Dell infrastructure, IBM software, and compliance frameworks 
            specific to your vertical. Deployed in weeks, not months.
          </p>
        </motion.div>

        {/* Industries Grid - 3 columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.block}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 + index * 0.05 }}
            >
              <Link
                to={industry.href}
                className="block border-t border-border py-8 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-title text-foreground group-hover:text-brand-orange transition-colors mb-2">
                      {industry.name}
                    </div>
                    <div className="text-label text-muted-foreground">{industry.block}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-2 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
