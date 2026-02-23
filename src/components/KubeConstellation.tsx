/** Powered by Kubric UIDR — constellation bubble display with hover tooltips */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const ORANGE = "#993619";

interface KubeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  href: string;
  desc: string;
}

const KUBES: KubeNode[] = [
  // Row 1 — top
  { id: "ITDR", label: "ITDR", x: 52, y: 2, href: "/kubes/itdr", desc: "Identity Threat Detection & Response" },
  // Row 2
  { id: "GRC", label: "GRC", x: 22, y: 10, href: "/kubes/grc", desc: "Governance, Risk & Compliance" },
  { id: "CIO", label: "CIO", x: 44, y: 12, href: "/kubes/cio", desc: "CIO Advisory & Strategy" },
  { id: "ADVISORY", label: "Advisory", x: 72, y: 8, href: "/kubes/advisory", desc: "Strategic Advisory Services" },
  // Row 3
  { id: "VDR", label: "VDR", x: 32, y: 22, href: "/kubes/vdr", desc: "Vulnerability Detection & Response" },
  { id: "NPM", label: "NPM", x: 52, y: 20, href: "/kubes/npm", desc: "Network Performance Monitoring" },
  { id: "NDR", label: "NDR", x: 78, y: 24, href: "/kubes/ndr", desc: "Network Detection & Response" },
  // Row 4
  { id: "ASSESSMENT", label: "Assess", x: 18, y: 34, href: "/kubes/assessment", desc: "Security & Infrastructure Assessments" },
  // Row 5 — middle band
  { id: "MSSP", label: "MSSP", x: 8, y: 46, href: "/kubes/mssp", desc: "Managed Security Service Provider" },
  { id: "DDR", label: "DDR", x: 22, y: 48, href: "/kubes/ddr", desc: "Data Detection & Response" },
  { id: "TI", label: "TI", x: 40, y: 42, href: "/kubes/ti", desc: "Threat Intelligence" },
  { id: "MDM", label: "MDM", x: 68, y: 44, href: "/kubes/mdm", desc: "Mobile Device Management" },
  { id: "COMPLIANCE", label: "Comply", x: 80, y: 50, href: "/kubes/compliance", desc: "Compliance Management" },
  // Row 6
  { id: "MSP", label: "MSP", x: 22, y: 60, href: "/kubes/msp", desc: "Managed Service Provider Operations" },
  { id: "BDR", label: "BDR", x: 36, y: 62, href: "/kubes/bdr", desc: "Backup & Disaster Recovery" },
  { id: "APM", label: "APM", x: 56, y: 60, href: "/kubes/apm", desc: "Application Performance Monitoring" },
  { id: "CDR", label: "CDR", x: 78, y: 62, href: "/kubes/cdr", desc: "Cloud Detection & Response" },
  // Row 7
  { id: "PRODUCT", label: "Product", x: 16, y: 74, href: "/kubes/product", desc: "Product Engineering & Development" },
  { id: "ADR", label: "ADR", x: 34, y: 76, href: "/kubes/adr", desc: "Application Detection & Response" },
  { id: "CFDR", label: "CFDR", x: 48, y: 70, href: "/kubes/cfdr", desc: "Cloud & FinOps Detection & Response" },
  { id: "INDUSTRY", label: "Industry", x: 72, y: 74, href: "/kubes/industry", desc: "Industry-Specific Solutions" },
  // Row 8 — bottom
  { id: "INNOVATION", label: "Innovate", x: 58, y: 82, href: "/kubes/innovation", desc: "Innovation & Emerging Technology" },
  { id: "SDR", label: "SDR", x: 40, y: 88, href: "/kubes/sdr", desc: "Security Detection & Response" },
];

export const KubeConstellation = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24" style={{ background: "#FEFBF6" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Our Service Provider</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
            <h2 className="font-black mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}>
              Powered by Kubric UIDR
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#393837" }}>
              Our proprietary system combines RMM, PSA, and Microsoft 365 management into one unified system — enabling the capabilities and outcomes we deliver as your managed services partner.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Unlimited endpoint monitoring",
                "Smart ticketing & workflow automation",
                "Multi-tenant M365 administration",
                "Automated patch management",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} style={{ color: ORANGE, flexShrink: 0 }} />
                  <span className="text-[14px]" style={{ color: "#393837" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/our-tools/kubric-uidr" className="inline-flex items-center gap-2 text-[14px] font-semibold transition-all hover:gap-3" style={{ color: ORANGE }}>
              Learn More <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — constellation */}
          <div className="relative" style={{ minHeight: 480 }}>
            {/* Category labels */}
            <span className="absolute top-0 right-0 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: ORANGE }}>Infrastructure & Operations</span>
            <span className="absolute bottom-0 right-0 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: ORANGE }}>Intelligence & Governance</span>

            {/* Center hub */}
            <motion.div
              className="absolute rounded-full flex flex-col items-center justify-center z-10"
              style={{
                width: 100,
                height: 100,
                left: "calc(48% - 50px)",
                top: "calc(38% - 50px)",
                background: "#1D1D1B",
                border: `3px solid ${ORANGE}`,
                boxShadow: `0 0 30px rgba(153,54,25,0.25)`,
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                  className="absolute group cursor-default"
                  style={{
                    left: `${kube.x}%`,
                    top: `${kube.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                  onMouseEnter={() => setHovered(kube.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      width: 52,
                      height: 52,
                      background: isHovered ? ORANGE : "#1D1D1B",
                      border: `1px solid ${isHovered ? ORANGE : "rgba(29,29,27,0.3)"}`,
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
                      style={{ background: "#1D1D1B", border: "1px solid rgba(205,202,197,0.15)" }}
                    >
                      <span className="text-white text-[11px] font-medium">{kube.desc}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
