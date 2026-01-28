import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const metrics = [
  { value: "8", label: "MODULES" },
  { value: "3", label: "TIERS" },
  { value: "1,200+", label: "CONTROLS" },
];

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 section-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {/* Content First - Always */}
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6"
          >
            Enterprise IT Transformation
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-tight text-foreground mb-8"
          >
            IT Transformation.
            <br />
            <span className="text-muted-foreground">Methodically Delivered.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-base lg:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed"
          >
            Assessment → Remediation → Operations → Optimization.
            <br className="hidden sm:block" />
            Dell infrastructure. IBM software. One accountable team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-20"
          >
            <a
              href="#assessment"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 font-mono text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Build My Engagement Plan
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center gap-2 px-8 py-4 font-mono text-sm text-foreground hover:text-muted-foreground transition-colors group"
            >
              View Methodology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-12 lg:gap-16 pt-12 border-t border-border"
          >
            {metrics.map((metric, index) => (
              <div key={metric.label} className="text-left">
                <div className="font-display text-3xl lg:text-4xl text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle decorative element - far right, desktop only */}
      <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[60vh] bg-gradient-to-b from-transparent via-border to-transparent" />
    </section>
  );
};
