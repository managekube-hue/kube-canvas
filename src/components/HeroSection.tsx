import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "./AnimatedCounter";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-28 lg:pt-36 section-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl">
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="accent-line mb-10"
          />

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-hero text-foreground mb-8"
          >
            IT Transformation
            <br />
            <span className="text-brand-orange">at Any Scale</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-body-xl text-muted-foreground max-w-2xl mb-12"
          >
            From $99 automation templates to enterprise platform deployments. 
            Dell infrastructure. IBM software. One accountable team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-24"
          >
            <Link to="/contact" className="btn-primary">
              Start Free Assessment
            </Link>
            <Link
              to="/methodology"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              Our Methodology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats Row - Centered with Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="border-t border-border pt-12"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-16 justify-items-center max-w-4xl mx-auto">
              <AnimatedCounter end={8} label="Kubes" duration={1500} />
              <AnimatedCounter end={9} label="Industry Platforms" duration={1700} />
              <AnimatedCounter end={6} label="Pricing Models" duration={1900} />
              <AnimatedCounter end={1200} suffix="+" label="Controls Mapped" highlight duration={2200} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
