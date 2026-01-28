import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const industries = [
  "Manufacturing",
  "Healthcare",
  "Financial Services",
  "Retail",
  "Transportation",
  "Mining & Extraction",
  "Energy & Utilities",
  "Public Sector",
  "Telecommunications",
];

const scales = [
  { label: "Small Business", description: "Under 50 employees" },
  { label: "Mid-Market", description: "50–500 employees" },
  { label: "Enterprise", description: "500+ employees" },
];

const painPoints = [
  "Compliance",
  "Security",
  "Infrastructure",
  "Cost Optimization",
];

export const AssessmentConfiguratorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [industry, setIndustry] = useState("");
  const [scale, setScale] = useState("");
  const [painPoint, setPainPoint] = useState("");

  const isComplete = industry && scale && painPoint;

  return (
    <section ref={ref} className="py-32 lg:py-48 section-white" id="assessment">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="accent-line mb-8" />
            <h2 className="text-headline text-foreground mb-6">
              Start with a{" "}
              <span className="text-brand-orange">free assessment</span>
            </h2>
            <p className="text-body-xl text-muted-foreground mb-8">
              Get your customized transformation roadmap. No cost. No obligation. 
              Delivered within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-body-lg text-muted-foreground">
                  Infrastructure inventory and assessment
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-body-lg text-muted-foreground">
                  Security posture analysis
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-body-lg text-muted-foreground">
                  Compliance gap identification
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-body-lg text-muted-foreground">
                  Recommended Kube configuration and pricing
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-secondary p-8 lg:p-12"
          >
            <div className="space-y-8">
              {/* Industry */}
              <div>
                <label className="text-label text-foreground block mb-4">
                  1. Your Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-background border-2 border-border px-4 py-4 text-body-lg text-foreground focus:outline-none focus:border-brand-orange transition-colors"
                >
                  <option value="">Select industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Scale */}
              <div>
                <label className="text-label text-foreground block mb-4">
                  2. Organization Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {scales.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setScale(s.label)}
                      className={`p-4 border-2 text-left transition-all ${
                        scale === s.label
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      <div className="text-body font-semibold">{s.label}</div>
                      <div className={`text-sm ${scale === s.label ? "text-background/70" : "text-muted-foreground"}`}>
                        {s.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pain Point */}
              <div>
                <label className="text-label text-foreground block mb-4">
                  3. Primary Pain Point
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {painPoints.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPainPoint(p)}
                      className={`px-6 py-4 border-2 text-body font-medium transition-all ${
                        painPoint === p
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                disabled={!isComplete}
                className={`w-full py-5 text-body-lg font-semibold flex items-center justify-center gap-3 transition-all ${
                  isComplete
                    ? "bg-brand-orange text-white hover:bg-opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Generate My Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
