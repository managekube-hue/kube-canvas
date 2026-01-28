/** DO NOT TOUCH - HeroSection with CSS Logo Recreation */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "./AnimatedCounter";

/** DO NOT TOUCH - ManageKube Logo Component - Exact recreation as CSS/text */
const ManageKubeLogo = () => {
  return (
    <div className="relative inline-block">
      {/* Main logo container */}
      <div className="relative">
        {/* "manage" text with corner brackets */}
        <div className="relative inline-block">
          {/* Top-left corner bracket */}
          <div className="absolute -top-2 -left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-foreground" />
          {/* Top-right corner bracket */}
          <div className="absolute -top-2 -right-3 w-6 h-6 border-t-[3px] border-r-[3px] border-foreground" />
          
          <span className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground tracking-tight lowercase">
            manage
          </span>
          
          {/* Bottom-right corner bracket - positioned to overlap with Kube */}
          <div className="absolute bottom-0 -right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-foreground" />
        </div>
        
        {/* "Kube" text in orange - positioned below and slightly overlapping */}
        <div className="relative -mt-2 sm:-mt-3 lg:-mt-4">
          <span className="text-6xl sm:text-7xl lg:text-9xl font-bold text-brand-orange tracking-tight">
            Kube
          </span>
        </div>
        
        {/* "IT SERVICES." tagline with orange dot */}
        <div className="flex items-center justify-end mt-1 lg:mt-2">
          <span className="text-sm sm:text-base lg:text-lg font-semibold text-foreground tracking-widest uppercase">
            IT SERVICES
          </span>
          <span className="text-brand-orange text-2xl lg:text-3xl font-bold ml-0.5">.</span>
        </div>
      </div>
    </div>
  );
};
/** END DO NOT TOUCH - Logo Component */

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 lg:pt-24 section-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl">
          {/* Logo above headline - CSS recreation of ManageKube logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 lg:mb-16"
          >
            <ManageKubeLogo />
          </motion.div>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="accent-line mb-8"
          />

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8"
          >
            IT Transformation{" "}
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
