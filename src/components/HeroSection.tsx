import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ServerRack } from "@/components/ServerRack";

const metrics = [
  { value: "8", label: "MODULES", sublabel: "Integrated service delivery" },
  { value: "3", label: "TIERS", sublabel: "SMB to enterprise scale" },
  { value: "1,200+", label: "CONTROLS", sublabel: "Compliance controls mapped" },
];

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 section-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy (60%) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.9] tracking-tight mb-8"
            >
              TRANSFORM IT.
              <br />
              AT ANY SCALE.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-body-lg text-muted-foreground max-w-xl mb-8"
            >
              Free assessment reveals your exact transformation path.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-16"
            >
              <a href="#assessment" className="btn-primary">
                START FREE ASSESSMENT
              </a>
              <a
                href="#methodology"
                className="btn-secondary flex items-center gap-2 group"
              >
                Explore Methodology
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Server Rack + Metrics (40%) */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex flex-col items-center lg:items-end gap-8">
              {/* Server Rack Animation */}
              <ServerRack />

              {/* Metrics */}
              <div className="space-y-4 w-full max-w-[280px]">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                    className="card-enterprise flex items-center gap-4 p-4"
                  >
                    <span className="font-display text-3xl lg:text-4xl text-foreground">
                      {metric.value}
                    </span>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-foreground">
                        {metric.label}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {metric.sublabel}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
