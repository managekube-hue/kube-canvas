import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

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

  const isComplete = industry && scale && painPoint;

  return (
    <section ref={ref} className="py-24 lg:py-32 section-off-white" id="assessment">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Get Started
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-4">
              Start with a free assessment.
            </h2>
            <p className="font-mono text-base text-muted-foreground">
              Get your exact transformation roadmap in 24 hours.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background border border-border p-8 lg:p-12"
          >
            {/* Step 1: Industry */}
            <div className="mb-8">
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                01 — Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 font-mono text-sm text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Step 2: Scale */}
            <div className="mb-8">
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                02 — Scale
              </label>
              <div className="flex flex-wrap gap-2">
                {scales.map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`px-4 py-2 border font-mono text-xs transition-all ${
                      scale === s
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pain Point */}
            <div className="mb-10">
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                03 — Primary Challenge
              </label>
              <div className="flex flex-wrap gap-2">
                {painPoints.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPainPoint(p)}
                    className={`px-4 py-2 border font-mono text-xs transition-all ${
                      painPoint === p
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
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
              className={`w-full py-4 font-mono text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                isComplete
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Generate Assessment Plan
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="font-mono text-xs text-muted-foreground text-center mt-6">
              No cost. No obligation. Results in 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
