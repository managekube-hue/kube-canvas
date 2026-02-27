/** Premium hero section with full-bleed datacenter video + KubeConstellation */
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TypewriterText } from "./TypewriterText";
import datacenterVideo from "@/assets/datacenter-walkthrough.mp4";

const ORANGE = "#993619";

interface KubeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  desc: string;
}

const KUBES: KubeNode[] = [
  { id: "ITDR", label: "ITDR", x: 72, y: 8, desc: "Identity Threat Detection & Response" },
  { id: "GRC", label: "GRC", x: 48, y: 18, desc: "Governance, Risk & Compliance" },
  { id: "CIO", label: "CIO", x: 65, y: 20, desc: "CIO Advisory & Strategy" },
  { id: "VDR", label: "VDR", x: 52, y: 32, desc: "Vulnerability Detection & Response" },
  { id: "NPM", label: "NPM", x: 72, y: 30, desc: "Network Performance Monitoring" },
  { id: "NDR", label: "NDR", x: 85, y: 36, desc: "Network Detection & Response" },
  { id: "DDR", label: "DDR", x: 40, y: 48, desc: "Data Detection & Response" },
  { id: "TI", label: "TI", x: 50, y: 46, desc: "Threat Intelligence" },
  { id: "MDM", label: "MDM", x: 80, y: 46, desc: "Mobile Device Management" },
  { id: "BDR", label: "BDR", x: 52, y: 62, desc: "Backup & Disaster Recovery" },
  { id: "APM", label: "APM", x: 72, y: 62, desc: "Application Performance Monitoring" },
  { id: "CDR", label: "CDR", x: 85, y: 60, desc: "Cloud Detection & Response" },
  { id: "CFDR", label: "CFDR", x: 62, y: 70, desc: "Cloud & FinOps Detection & Response" },
  { id: "ADR", label: "ADR", x: 48, y: 76, desc: "Application Detection & Response" },
  { id: "SDR", label: "SDR", x: 62, y: 84, desc: "Security Detection & Response" },
];

export const HeroSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24 pb-24 overflow-hidden bg-black">
      {/* Video Background: prominent, person walking into NOC */}
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

      {/* Content: two-column, text left, constellation right */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: headline + CTAs */}
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

          {/* Right: KubeConstellation overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="hidden lg:block relative"
            style={{ minHeight: 500 }}
          >
            {/* Category labels */}
            <span className="absolute top-0 right-0 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: ORANGE }}>Infrastructure & Operations</span>
            <span className="absolute bottom-0 right-0 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: ORANGE }}>Intelligence & Governance</span>

            {/* Center hub */}
            <motion.div
              className="absolute rounded-full flex flex-col items-center justify-center z-10"
              style={{
                width: 100,
                height: 100,
                left: "calc(62% - 50px)",
                top: "calc(46% - 50px)",
                background: "rgba(29,29,27,0.85)",
                border: `3px solid ${ORANGE}`,
                boxShadow: `0 0 40px rgba(153,54,25,0.35)`,
                backdropFilter: "blur(8px)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <span className="text-white text-[11px] font-black tracking-wider">Manage</span>
              <span className="text-white text-[11px] font-black tracking-wider">Kube</span>
            </motion.div>

            {/* Kube bubbles */}
            {KUBES.map((kube, i) => {
              const isHovered = hovered === kube.id;
              return (
                <motion.div
                  key={kube.id}
                  className="absolute cursor-default"
                  style={{
                    left: `${kube.x}%`,
                    top: `${kube.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + i * 0.05 }}
                  onMouseEnter={() => setHovered(kube.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      width: 52,
                      height: 52,
                      background: isHovered ? ORANGE : "rgba(29,29,27,0.8)",
                      border: `1px solid ${isHovered ? ORANGE : "rgba(255,255,255,0.15)"}`,
                      backdropFilter: "blur(6px)",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    <span className="text-white text-[11px] font-bold tracking-wide">{kube.label}</span>
                  </div>

                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-3 py-2 rounded z-20"
                      style={{ background: "rgba(29,29,27,0.95)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <span className="text-white text-[11px] font-medium">{kube.desc}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
};
