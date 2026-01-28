import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-8"
          >
            Enterprise IT Transformation
          </motion.p>

          {/* Main Headline - Massive */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-tight text-foreground mb-10"
          >
            IT Transformation.
            <br />
            <span className="text-muted-foreground">Methodically Delivered.</span>
          </motion.h1>

          {/* Subheadline - Larger */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-lg lg:text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed"
          >
            Assessment → Remediation → Operations → Optimization.
            <br className="hidden sm:block" />
            Dell infrastructure. IBM software. One accountable team.
          </motion.p>

          {/* CTAs - Larger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-6 mb-24"
          >
            <a
              href="#assessment"
              className="inline-flex items-center justify-center bg-foreground text-background px-10 py-5 font-mono text-base uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Build My Engagement Plan
            </a>
            <a
              href="/methodology"
              className="inline-flex items-center gap-3 px-10 py-5 font-mono text-base text-foreground hover:text-muted-foreground transition-colors group"
            >
              View Methodology
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          {/* Stats - Horizontal, not boxes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-baseline gap-16 lg:gap-24"
          >
            <div>
              <span className="font-display text-6xl lg:text-7xl text-foreground">8</span>
              <span className="font-mono text-base lg:text-lg text-muted-foreground ml-3">Kubes</span>
            </div>
            <div>
              <span className="font-display text-6xl lg:text-7xl text-foreground">3</span>
              <span className="font-mono text-base lg:text-lg text-muted-foreground ml-3">Tiers</span>
            </div>
            <div>
              <span className="font-display text-6xl lg:text-7xl text-foreground">1,200+</span>
              <span className="font-mono text-base lg:text-lg text-muted-foreground ml-3">Controls</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
