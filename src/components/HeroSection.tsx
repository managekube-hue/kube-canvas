import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { value: "8", label: "SPECIALIZED KUBES", sublabel: "Interconnected Capabilities" },
  { value: "3", label: "DELIVERY TIERS", sublabel: "SMB to Enterprise Scale" },
  { value: "425+", label: "CONTROLS", sublabel: "Compliance Frameworks" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-lines opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8"
          >
            IT TRANSFORMATION.
            <br />
            <span className="text-gradient-orange">METHODICALLY DELIVERED.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-16"
          >
            We replace IT complexity with a systematic methodology. The result: 
            validated architecture, continuous compliance, and measurable business outcomes.
          </motion.p>

          {/* Metrics Display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="card-glass rounded-lg p-6 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="font-display text-4xl lg:text-5xl text-white mb-2">
                  {metric.value}
                </div>
                <div className="font-display text-lg lg:text-xl text-white mb-1">
                  {metric.label}
                </div>
                <div className="font-mono text-xs lg:text-sm text-muted-foreground">
                  {metric.sublabel}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-base lg:text-lg uppercase tracking-wider px-8 lg:px-12 py-6 glow-orange"
            >
              START WITH ASSESSMENT
            </Button>
            <a
              href="#kubes"
              className="font-mono text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
            >
              View Kube Architecture
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
