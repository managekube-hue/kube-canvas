import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const industries = [
  "Manufacturing",
  "Healthcare",
  "Financial Services",
  "Retail",
  "Transportation",
  "Mining & Extraction",
  "Energy & Utilities",
  "Public Sector",
  "Telecom",
];

const scales = ["Small Business", "Mid-Market", "Enterprise"];

const painPoints = ["Compliance", "Security", "Infrastructure", "Cost"];

export const AssessmentConfiguratorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [industry, setIndustry] = useState("");
  const [scale, setScale] = useState("");
  const [painPoint, setPainPoint] = useState("");

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="assessment">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-center text-foreground mb-6"
          >
            START WITH A FREE ASSESSMENT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-body-lg text-muted-foreground text-center mb-12"
          >
            Get your exact roadmap.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-enterprise space-y-8"
          >
            {/* Step 1: Industry */}
            <div>
              <label className="font-mono text-sm uppercase tracking-widest text-foreground mb-3 block">
                STEP 1: Industry
              </label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full appearance-none bg-background border border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Select your industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="font-mono text-sm uppercase tracking-widest text-foreground mb-3 block">
                STEP 2: Scale
              </label>
              <div className="grid grid-cols-3 gap-3">
                {scales.map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`px-4 py-3 border font-mono text-xs transition-all ${
                      scale === s
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pain Point */}
            <div>
              <label className="font-mono text-sm uppercase tracking-widest text-foreground mb-3 block">
                STEP 3: Primary Pain Point
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {painPoints.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPainPoint(p)}
                    className={`px-4 py-3 border font-mono text-xs transition-all ${
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
              className="w-full btn-primary"
              disabled={!industry || !scale || !painPoint}
            >
              GENERATE MY ASSESSMENT PLAN
            </button>

            <p className="font-mono text-xs text-muted-foreground text-center">
              Your customized transformation roadmap delivered via email within 24 hours.
              <br />
              No cost. No obligation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
