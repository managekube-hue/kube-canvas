/** DO NOT TOUCH - Premium hero section with video overlay and automation visualization */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "./AnimatedCounter";
import { TypewriterText } from "./TypewriterText";
import { AutomationNetwork } from "./AutomationNetwork";
import datacenterVideo from "@/assets/datacenter-walkthrough.mp4";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden bg-black">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={datacenterVideo} type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Headlines */}
          <div className="max-w-2xl">
            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-brand-orange mb-10"
            />

            {/* Main Headline with Typewriter Effect */}
            <h1 className="text-hero text-white mb-4">
              <TypewriterText 
                text="IT TRANSFORMATION." 
                speed={60} 
                delay={300}
              />
            </h1>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="text-hero text-brand-orange mb-8"
            >
              AT ANY SCALE.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.2 }}
              className="text-body-xl text-white/70 max-w-xl mb-12"
            >
              From $99 automation templates to enterprise platform deployments. 
              Dell infrastructure. IBM software. One accountable team.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link 
                to="/assessment" 
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-orange/90 transition-colors"
              >
                Start Free Assessment
              </Link>
              <Link
                to="/methodology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors group"
              >
                Our Methodology
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* 3-Column Capability Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="pt-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {/* Column 1: What You Get */}
                <div className="bg-black/80 border border-brand-orange/30 p-6 backdrop-blur-sm">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-brand-orange mb-4">
                    What You Get
                  </h3>
                  <p className="font-mono text-lg text-white font-bold mb-3">
                    SINGLE TEAM
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-2">
                    No vendor sprawl.
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-2">
                    One SLA.
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-4">
                    Clear ownership.
                  </p>
                  <p className="font-mono text-2xl text-brand-orange font-bold">
                    8 vendors → 1 team
                  </p>
                </div>

                {/* Column 2: How Assessment Works */}
                <div className="bg-black/80 border border-brand-orange/30 p-6 backdrop-blur-sm">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-brand-orange mb-4">
                    How Assessment Works
                  </h3>
                  <p className="font-mono text-lg text-white font-bold mb-3">
                    AGENT-BASED DISCOVERY
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-2">
                    Deploy lightweight agents
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-2">
                    Real-time inventory
                  </p>
                  <p className="font-mono text-sm text-white/70">
                    Automatic gap analysis
                  </p>
                </div>

                {/* Column 3: Assessment → Revenue */}
                <div className="bg-black/80 border border-brand-orange/30 p-6 backdrop-blur-sm">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-brand-orange mb-4">
                    Assessment → Recommendations
                  </h3>
                  <p className="font-mono text-lg text-white font-bold mb-3">
                    PRODUCT & SERVICE FIT
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-2">
                    Assessment reveals gaps
                  </p>
                  <p className="font-mono text-sm text-white/70 mb-2">
                    We recommend exact SKUs
                  </p>
                  <p className="font-mono text-sm text-white/70">
                    + Kubes to close them
                  </p>
                </div>
              </div>

              {/* Full-Width CTA Button */}
              <Link
                to="/assessment"
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-orange/90 transition-colors"
              >
                Build My Engagement Plan
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Automation Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden lg:block"
          >
            <AutomationNetwork />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
/** END DO NOT TOUCH */
