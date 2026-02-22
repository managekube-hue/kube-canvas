import { motion } from "framer-motion";
import childPageVideo from "@/assets/child-page.mp4";

interface PageBannerProps {
  title: string;
  subtitle: string;
  phase?: string;
}

export const PageBanner = ({ title, subtitle, phase }: PageBannerProps) => {
  return (
    <section className="relative pt-40 pb-36 lg:pt-56 lg:pb-52 overflow-hidden bg-black min-h-[80vh] flex items-center">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={childPageVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)
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
            className="h-1 mb-10"
            style={{ background: "#993619" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white mb-8"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 900,
              fontFamily: "'Special Elite', serif",
              lineHeight: 1.05,
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-3xl"
            style={{ fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
