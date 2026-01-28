/** DO NOT TOUCH - Premium hero section with video background, typewriter, automation animation */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "./AnimatedCounter";
import { TypewriterText } from "./TypewriterText";
import { AutomationAnimation } from "./AutomationAnimation";
import datacenterVideo from "@/assets/datacenter-walkthrough.mp4";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden bg-foreground">
      {/* Video Background - pushed back with overlay */}
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
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-primary mb-10"
            />

            {/* Main Headline with Typewriter */}
            <h1 className="text-hero text-background mb-4">
              <TypewriterText
                text="IT Transformation"
                speed={70}
                delay={300}
              />
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <span className="text-hero text-primary">at Any Scale</span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2 }}
              className="text-body-xl text-background/70 max-w-xl mt-8 mb-12"
            >
              From $99 automation templates to enterprise platform deployments. 
              Dell infrastructure. IBM software. One accountable team.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link to="/contact" className="btn-primary">
                Start Free Assessment
              </Link>
              <Link
                to="/methodology"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-background/30 text-background font-semibold hover:bg-background hover:text-foreground transition-all duration-200 group"
              >
                Our Methodology
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="border-t border-background/20 pt-12"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                <AnimatedCounter end={8} label="Kubes" duration={1500} light />
                <AnimatedCounter end={9} label="Industry Platforms" duration={1700} light />
                <AnimatedCounter end={6} label="Pricing Models" duration={1900} light />
                <AnimatedCounter end={1200} suffix="+" label="Controls Mapped" highlight duration={2200} light />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Automation Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="hidden lg:block"
          >
            <AutomationAnimation />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
