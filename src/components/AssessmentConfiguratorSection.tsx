import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const industries = [
  "Manufacturing", "Healthcare", "Financial Services", "Retail", "Transportation",
  "Mining & Extraction", "Energy & Utilities", "Public Sector", "Telecommunications",
];

const scales = ["Small Business", "Mid-Market", "Enterprise"];
const challenges = ["Compliance", "Security", "Infrastructure", "Cost"];

export const AssessmentConfiguratorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [industry, setIndustry] = useState("");
  const [scale, setScale] = useState("");
  const [challenge, setChallenge] = useState("");

  const isComplete = industry && scale && challenge;

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-[#FAFAFA]" id="assessment">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-16"
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Get Started
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
              Start with a free assessment.
            </h2>
            <p className="font-mono text-lg lg:text-xl text-muted-foreground max-w-2xl">
              Get your exact transformation roadmap in 24 hours. No cost. No obligation.
            </p>
          </motion.div>

          {/* Form - Clean, Not Boxy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Step 1 */}
            <div>
              <label className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4 block">
                01 — Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-transparent border-b-2 border-border py-4 font-mono text-xl text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Step 2 */}
            <div>
              <label className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4 block">
                02 — Scale
              </label>
              <div className="flex flex-wrap gap-4">
                {scales.map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`px-6 py-3 border-2 font-mono text-base transition-all ${
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

            {/* Step 3 */}
            <div>
              <label className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4 block">
                03 — Primary Challenge
              </label>
              <div className="flex flex-wrap gap-4">
                {challenges.map((c) => (
                  <button
                    key={c}
                    onClick={() => setChallenge(c)}
                    className={`px-6 py-3 border-2 font-mono text-base transition-all ${
                      challenge === c
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8">
              <button
                disabled={!isComplete}
                className={`inline-flex items-center gap-3 px-10 py-5 font-mono text-lg uppercase tracking-wider transition-all ${
                  isComplete
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Generate Assessment Plan
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
