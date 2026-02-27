/** Interactive SVG pie-wheel showing all managed capabilities with hover tooltips */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#993619";

interface WheelSegment {
  id: string;
  label: string;
  shortLabel: string;
  desc: string;
}

interface ManagedServicesWheelProps {
  title?: string;
  subtitle?: string;
  segments: WheelSegment[];
  hubLabel?: string;
  /** "light" = cream bg (#FEFBF6), "dark" = dark bg (#1D1D1B) */
  variant?: "light" | "dark";
}

export const ManagedServicesWheel = ({
  title = "Capabilities at a Glance",
  subtitle = "Hover any segment to see what's included.",
  segments,
  hubLabel = "MANAGE\nKUBE",
  variant = "light",
}: ManagedServicesWheelProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const isLight = variant === "light";
  const bgColor = isLight ? "#FAF7F2" : "#1D1D1B";
  const textColor = isLight ? "#1D1D1B" : "#fff";
  const mutedColor = isLight ? "#615C58" : "rgba(205,202,197,0.55)";
  const segFill = isLight ? "#E8E2DA" : "#393837";
  const segStroke = isLight ? "#D4CEC6" : bgColor;
  const segLabelColor = isLight ? "#3D3A37" : "#fff";
  const hubFill = isLight ? "#FAF7F2" : "#1D1D1B";
  const hubTextColor = isLight ? "#1D1D1B" : "#fff";

  const total = segments.length;
  const cx = 250;
  const cy = 250;
  const centerRadius = 72;
  const innerRadius = 82;
  const outerRadius = 200;
  const labelRadius = (innerRadius + outerRadius) / 2;

  const getPath = (i: number) => {
    const angle = (2 * Math.PI) / total;
    const gap = 0.02;
    const startAngle = i * angle - Math.PI / 2 + gap;
    const endAngle = startAngle + angle - 2 * gap;

    const x1 = cx + Math.cos(startAngle) * outerRadius;
    const y1 = cy + Math.sin(startAngle) * outerRadius;
    const x2 = cx + Math.cos(endAngle) * outerRadius;
    const y2 = cy + Math.sin(endAngle) * outerRadius;
    const x3 = cx + Math.cos(endAngle) * innerRadius;
    const y3 = cy + Math.sin(endAngle) * innerRadius;
    const x4 = cx + Math.cos(startAngle) * innerRadius;
    const y4 = cy + Math.sin(startAngle) * innerRadius;

    const largeArc = angle - 2 * gap > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  const getLabelPos = (i: number) => {
    const angle = (2 * Math.PI) / total;
    const mid = i * angle + angle / 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(mid) * labelRadius,
      y: cy + Math.sin(mid) * labelRadius,
      angleDeg: (mid * 180) / Math.PI,
    };
  };

  const hoveredSegment = segments.find(s => s.id === hovered);

  return (
    <section className="py-24" style={{ background: bgColor }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text + detail panel */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>
              Interactive Capabilities
            </p>
            <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
            <h2
              className="font-black mb-4 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "'Special Elite', serif", color: textColor }}
            >
              {title}
            </h2>
            <p className="text-[15px] leading-relaxed mb-10" style={{ color: mutedColor }}>
              {subtitle}
            </p>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              {hoveredSegment ? (
                <motion.div
                  key={hoveredSegment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-lg"
                  style={{
                    background: isLight ? "#fff" : "#252523",
                    border: `1px solid ${isLight ? "rgba(29,29,27,0.08)" : "rgba(205,202,197,0.08)"}`,
                    boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: ORANGE }}>
                    Selected Capability
                  </span>
                  <h3
                    className="text-xl font-black mt-2 mb-3"
                    style={{ fontFamily: "'Special Elite', serif", color: textColor }}
                  >
                    {hoveredSegment.label}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: mutedColor }}>
                    {hoveredSegment.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 rounded-lg flex items-center justify-center"
                  style={{
                    background: isLight ? "rgba(29,29,27,0.03)" : "rgba(205,202,197,0.04)",
                    border: `1px dashed ${isLight ? "rgba(29,29,27,0.12)" : "rgba(205,202,197,0.12)"}`,
                    minHeight: 120,
                  }}
                >
                  <p className="text-[13px]" style={{ color: isLight ? "rgba(29,29,27,0.35)" : "rgba(205,202,197,0.3)" }}>
                    Hover a segment on the wheel to explore capabilities
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — SVG wheel */}
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 500 500"
              className="w-full max-w-[500px]"
              style={{ overflow: "visible" }}
            >
              {/* Decorative outer rings */}
              <circle cx={cx} cy={cy} r={outerRadius + 16} fill="none" stroke={isLight ? "rgba(29,29,27,0.08)" : "rgba(205,202,197,0.08)"} strokeWidth="1" strokeDasharray="4 4" />
              <circle cx={cx} cy={cy} r={outerRadius + 30} fill="none" stroke={isLight ? "rgba(29,29,27,0.04)" : "rgba(205,202,197,0.04)"} strokeWidth="1" strokeDasharray="2 6" />

              {/* Segments */}
              {segments.map((seg, i) => {
                const isActive = hovered === seg.id;
                const midAngle = i * (2 * Math.PI / total) + (Math.PI / total) - Math.PI / 2;
                const pushX = isActive ? Math.cos(midAngle) * 8 : 0;
                const pushY = isActive ? Math.sin(midAngle) * 8 : 0;
                return (
                  <motion.path
                    key={seg.id}
                    d={getPath(i)}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    fill={isActive ? ORANGE : segFill}
                    stroke={segStroke}
                    strokeWidth={isLight ? 1.5 : 2}
                    className="cursor-pointer"
                    onMouseEnter={() => setHovered(seg.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      transform: `translate(${pushX}px, ${pushY}px)`,
                      transition: "transform 0.25s ease, fill 0.2s ease",
                    }}
                  />
                );
              })}

              {/* Labels on segments */}
              {segments.map((seg, i) => {
                const pos = getLabelPos(i);
                let textRot = pos.angleDeg;
                // Flip text so it's always readable
                if (textRot > 90 && textRot < 270) textRot += 180;
                if (textRot > 90 && textRot <= 180) textRot += 180;
                const fontSize = total > 10 ? 8 : total > 8 ? 9 : 10;
                const isActive = hovered === seg.id;
                const midAngle = i * (2 * Math.PI / total) + (Math.PI / total) - Math.PI / 2;
                const pushX = isActive ? Math.cos(midAngle) * 8 : 0;
                const pushY = isActive ? Math.sin(midAngle) * 8 : 0;
                return (
                  <text
                    key={`lbl-${seg.id}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? "#fff" : segLabelColor}
                    className="pointer-events-none font-bold select-none"
                    style={{
                      fontSize: `${fontSize}px`,
                      transform: `translate(${pushX}px, ${pushY}px) rotate(${textRot}deg)`,
                      transformOrigin: `${pos.x}px ${pos.y}px`,
                      letterSpacing: "0.06em",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    {seg.shortLabel}
                  </text>
                );
              })}

              {/* Center hub */}
              <motion.circle
                cx={cx} cy={cy} r={centerRadius}
                fill={hubFill}
                stroke={ORANGE}
                strokeWidth="3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ transformOrigin: `${cx}px ${cy}px`, filter: isLight ? `drop-shadow(0 0 20px rgba(153,54,25,0.2))` : `drop-shadow(0 0 24px rgba(153,54,25,0.35))` }}
              />
              <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="middle" fill={hubTextColor} className="font-black" style={{ fontSize: "13px", letterSpacing: "0.14em" }}>
                MANAGE
              </text>
              <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="middle" fill={hubTextColor} className="font-black" style={{ fontSize: "13px", letterSpacing: "0.14em" }}>
                KUBE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Pre-built segment sets ── */

export const FULLY_MANAGED_SEGMENTS: WheelSegment[] = [
  { id: "soc", label: "Managed SOC", shortLabel: "SOC", desc: "24/7 security operations center with threat hunting, incident response, and continuous monitoring by certified analysts." },
  { id: "noc", label: "Managed NOC", shortLabel: "NOC", desc: "Proactive infrastructure monitoring, performance management, and remediation across hybrid environments." },
  { id: "compliance", label: "Managed Compliance", shortLabel: "GRC", desc: "Continuous compliance posture management across 100+ frameworks with automated evidence collection." },
  { id: "cloud", label: "Managed Cloud", shortLabel: "CLOUD", desc: "Full lifecycle cloud infrastructure management, cost optimization, and multi-cloud governance." },
  { id: "helpdesk", label: "Help Desk Services", shortLabel: "HELP DESK", desc: "Tiered support from L1 through L3 with defined SLAs, ticketing, and escalation procedures." },
  { id: "vciso", label: "vCISO & Advisory", shortLabel: "vCISO", desc: "Executive-level security leadership, risk assessments, board reporting, and strategic roadmaps." },
  { id: "assessment", label: "Security Assessments", shortLabel: "ASSESS", desc: "Scheduled vulnerability assessments, penetration testing, and security posture evaluations." },
  { id: "bdr", label: "Backup & DR", shortLabel: "BDR", desc: "Enterprise backup, disaster recovery planning, and business continuity management." },
  { id: "edr", label: "Endpoint Security", shortLabel: "EDR", desc: "Endpoint detection and response, device compliance, and threat containment across all managed endpoints." },
  { id: "ti", label: "Threat Intelligence", shortLabel: "THREAT INTEL", desc: "Curated threat feeds, CVE tracking, and contextual intelligence integrated into every detection workflow." },
];

export const CO_MANAGED_SEGMENTS: WheelSegment[] = [
  { id: "soc", label: "Shared SOC", shortLabel: "SOC", desc: "We hunt threats 24/7. Your team triages during business hours. We cover nights, weekends, and holidays." },
  { id: "noc", label: "Shared NOC", shortLabel: "NOC", desc: "Continuous infrastructure monitoring with shared escalation and daytime collaboration with your team." },
  { id: "compliance", label: "Shared Compliance", shortLabel: "GRC", desc: "Automated evidence collection and shared audit preparation. Your team stays in the loop on all compliance activity." },
  { id: "cloud", label: "Shared Cloud Ops", shortLabel: "CLOUD", desc: "Shared cloud management where your team controls architecture decisions and we handle day-to-day operations." },
  { id: "helpdesk", label: "Shared Help Desk", shortLabel: "HELP DESK", desc: "Your team handles daytime L1 support. We cover after-hours, overflow, and escalation." },
  { id: "methodology", label: "Shared Methodology", shortLabel: "METHOD", desc: "We handle Hunt, Identify, and Alert continuously. Triage, Diagnose, and Remediate are shared based on your team's availability." },
  { id: "platform", label: "Platform Operations", shortLabel: "PLATFORM", desc: "We monitor, tune, and maintain the Kubric platform continuously. Your team does not manage the platform." },
  { id: "reporting", label: "Executive Reporting", shortLabel: "REPORTS", desc: "Quarterly business reviews, incident trends, and forward-looking recommendations reviewed with your leadership." },
];
