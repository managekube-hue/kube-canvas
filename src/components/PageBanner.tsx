import { motion } from "framer-motion";
import childPageVideo from "@/assets/child-page.mp4";

interface PageBannerProps {
  title: string;
  subtitle: string;
  phase?: string;
}

export const PageBanner = ({ title, subtitle, phase }: PageBannerProps) => {
  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center">
      {/* Video background — higher visibility */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        >
          <source src={childPageVideo} type="video/mp4" />
        </video>
        {/* Lighter gradient overlays so video shows through */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.80) 25%, rgba(12,12,12,0.45) 60%, rgba(12,12,12,0.25) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,0.90) 0%, transparent 40%, rgba(12,12,12,0.35) 100%)" }} />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10 py-32 lg:py-40">
        <div className="max-w-5xl">
          {phase && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                {phase}
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-1 mb-12"
            style={{ background: "#993619" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white mb-10"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 900,
              fontFamily: "'Special Elite', serif",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-3xl"
            style={{ fontSize: "18px", lineHeight: 1.8, color: "rgba(255,255,255,0.70)" }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Bottom fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
