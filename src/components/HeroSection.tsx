/** DO NOT TOUCH - Premium hero section with full-bleed datacenter video */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TypewriterText } from "./TypewriterText";
import datacenterVideo from "@/assets/datacenter-walkthrough.mp4";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24 pb-24 overflow-hidden bg-black">
      {/* Video Background — prominent, person walking into NOC */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        >
          <source src={datacenterVideo} type="video/mp4" />
        </video>
        {/* Strong left-pull gradient so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
              text="One Service Provider."
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
            Zero Silos.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.2 }}
            className="text-body-xl text-white/75 max-w-xl mb-12"
          >
            Complete visibility across NOC, SOC, and business operations. We manage your infrastructure, security, and compliance so you can focus on growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-orange/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors group"
            >
              Our Methodology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
};
/** END DO NOT TOUCH */
