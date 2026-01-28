import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  subtitle: string;
  phase?: string;
}

export const PageBanner = ({ title, subtitle, phase }: PageBannerProps) => {
  return (
    <section
      className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          hsl(0 0% 6%) 0%, 
          hsl(0 0% 12%) 35%, 
          hsl(24 95% 35%) 65%, 
          hsl(24 95% 45%) 85%, 
          hsl(0 0% 50%) 100%
        )`,
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100% / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100% / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl">
          {phase && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 text-label tracking-widest">
                {phase} PHASE
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-hero text-white mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-xl text-white/80 max-w-3xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
