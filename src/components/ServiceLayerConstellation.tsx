import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ─── Module data with pillar groupings ─── */
type Pillar = "infra" | "detection" | "intel";

interface Module {
  id: string;
  label: string;
  fullName: string;
  pillar: Pillar;
  desc: string;
  href: string;
}

const MODULES: Module[] = [
  { id: "CIO", label: "CIO", fullName: "Chief Infrastructure Orchestrator", pillar: "infra", desc: "Unified infrastructure visibility and control across hybrid environments.", href: "/service-layer/cio" },
  { id: "NPM", label: "NPM", fullName: "Network Performance Management", pillar: "infra", desc: "Deep packet inspection, flow analysis, and network health scoring.", href: "/service-layer/npm" },
  { id: "MDM", label: "MDM", fullName: "Mobile Device Management", pillar: "infra", desc: "Endpoint enrollment, policy enforcement, and remote wipe capabilities.", href: "/service-layer/mdm" },
  { id: "APM", label: "APM", fullName: "Application Performance Management", pillar: "infra", desc: "Real-time application tracing, latency analysis, and dependency mapping.", href: "/service-layer/apm" },
  { id: "CFDR", label: "CFDR", fullName: "Cloud Firewall Detection & Response", pillar: "infra", desc: "Cloud-native firewall policy management and anomaly detection.", href: "/service-layer/cfdr" },
  { id: "BDR", label: "BDR", fullName: "Backup & Disaster Recovery", pillar: "infra", desc: "Immutable backups, RTO validation, and automated failover testing.", href: "/service-layer/bdr" },
  { id: "ITDR", label: "ITDR", fullName: "Identity Threat Detection & Response", pillar: "detection", desc: "Credential abuse detection, privilege escalation alerts, and identity hygiene.", href: "/service-layer/itdr" },
  { id: "NDR", label: "NDR", fullName: "Network Detection & Response", pillar: "detection", desc: "East-west traffic analysis, lateral movement detection, and network forensics.", href: "/service-layer/ndr" },
  { id: "CDR", label: "CDR", fullName: "Cloud Detection & Response", pillar: "detection", desc: "Cloud workload protection, misconfiguration detection, and runtime defense.", href: "/service-layer/cdr" },
  { id: "SDR", label: "SDR", fullName: "SaaS Detection & Response", pillar: "detection", desc: "SaaS application monitoring, shadow IT discovery, and data exfiltration alerts.", href: "/service-layer/sdr" },
  { id: "ADR", label: "ADR", fullName: "Application Detection & Response", pillar: "detection", desc: "Runtime application security, code-level threat detection, and API protection.", href: "/service-layer/adr" },
  { id: "DDR", label: "DDR", fullName: "Data Detection & Response", pillar: "detection", desc: "Data classification, movement tracking, and exfiltration prevention.", href: "/service-layer/ddr" },
  { id: "STRIKE", label: "STRIKE", fullName: "Offensive Security Testing", pillar: "detection", desc: "Red team operations, penetration testing, and adversary simulation.", href: "/service-layer/strike" },
  { id: "EASM", label: "EASM", fullName: "External Attack Surface Management", pillar: "detection", desc: "Continuous asset discovery, exposure scoring, and shadow infrastructure detection.", href: "/service-layer/easm" },
  { id: "HONEYPOT", label: "HONEYPOT", fullName: "Deception Technology", pillar: "detection", desc: "Decoy infrastructure, attacker luring, and early breach indicators.", href: "/service-layer/honeypot" },
  { id: "TI", label: "TI", fullName: "Threat Intelligence", pillar: "intel", desc: "CVE enrichment, EPSS scoring, dark-web monitoring, and IOC feeds.", href: "/service-layer/ti" },
  { id: "VDR", label: "VDR", fullName: "Vulnerability Detection & Response", pillar: "intel", desc: "Continuous scanning, risk-based prioritisation, and patch orchestration.", href: "/service-layer/vdr" },
  { id: "GRC", label: "GRC", fullName: "Governance, Risk & Compliance", pillar: "intel", desc: "Policy engine, control mapping, audit evidence collection, and risk scoring.", href: "/service-layer/grc" },
];

const PILLAR_META: Record<Pillar, { label: string; color: string; glow: string }> = {
  infra:     { label: "Infrastructure", color: "hsl(var(--primary))",   glow: "hsl(var(--primary) / 0.4)" },
  detection: { label: "Detection & Response", color: "hsl(32, 90%, 55%)", glow: "hsl(32, 90%, 55% / 0.4)" },
  intel:     { label: "Intelligence",   color: "hsl(48, 85%, 58%)",   glow: "hsl(48, 85%, 58% / 0.4)" },
};

/* ─── Layout: place kubes in radial pattern ─── */
function getPositions(count: number, cx: number, cy: number, radius: number, startAngle: number, sweep: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (sweep / (count - 1 || 1)) * i;
    const rad = (angle * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
  });
}

const CX = 500, CY = 420, R_INNER = 190, R_OUTER = 330;

function buildLayout() {
  const infra = MODULES.filter(m => m.pillar === "infra");
  const detect = MODULES.filter(m => m.pillar === "detection");
  const intel = MODULES.filter(m => m.pillar === "intel");

  const infraPos = getPositions(infra.length, CX, CY, R_INNER, 210, 120);
  const detectPos = getPositions(detect.length, CX, CY, R_OUTER, 175, 190);
  const intelPos = getPositions(intel.length, CX, CY, R_INNER, 30, 60);

  return [
    ...infra.map((m, i) => ({ ...m, ...infraPos[i] })),
    ...detect.map((m, i) => ({ ...m, ...detectPos[i] })),
    ...intel.map((m, i) => ({ ...m, ...intelPos[i] })),
  ];
}

const NODES = buildLayout();

/* ─── Kube (square) SVG helper ─── */
function KubeRect({ x, y, size, fill, stroke, strokeOpacity, strokeWidth, filter, style }: {
  x: number; y: number; size: number; fill: string; stroke: string;
  strokeOpacity: number; strokeWidth: number; filter?: string; style?: React.CSSProperties;
}) {
  return (
    <rect
      x={x - size / 2} y={y - size / 2} width={size} height={size}
      fill={fill} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth}
      filter={filter} style={style}
    />
  );
}

/* ─── Component ─── */
export function ServiceLayerConstellation() {
  const [active, setActive] = useState<string | null>(null);
  const activeModule = MODULES.find(m => m.id === active);

  const handleHover = useCallback((id: string | null) => setActive(id), []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden section-dark">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Service Layer</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
            18 Detection &amp; Response <span className="text-primary">Kubes</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto text-white/50 mb-4">
            Each kube delivers a specific detection and response capability. Hover to explore.
          </p>
          {/* Legend */}
          <div className="flex justify-center gap-6 flex-wrap">
            {(Object.entries(PILLAR_META) as [Pillar, typeof PILLAR_META["infra"]][]).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5" style={{ background: meta.color }} />
                <span className="text-[10px] uppercase tracking-widest text-white/40">{meta.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Constellation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto"
          style={{ maxWidth: 1000 }}
        >
          <svg viewBox="0 0 1000 840" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="kube-glow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="kube-glow-active">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="hub-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Ambient square orbits */}
            {[R_INNER, R_OUTER].map(r => (
              <rect key={r} x={CX - r} y={CY - r} width={r * 2} height={r * 2}
                fill="none" stroke="white" strokeOpacity={0.04} strokeWidth={1}
                strokeDasharray="6 10"
                transform={`rotate(45, ${CX}, ${CY})`}
              />
            ))}

            {/* Center hub glow */}
            <rect x={CX - 80} y={CY - 80} width={160} height={160} fill="url(#hub-grad)"
              transform={`rotate(45, ${CX}, ${CY})`} />

            {/* Pulse kube */}
            <rect x={CX - 60} y={CY - 60} width={120} height={120} fill="none"
              stroke="hsl(var(--primary))" strokeOpacity={0.08}
              transform={`rotate(45, ${CX}, ${CY})`}
            >
              <animate attributeName="width" values="100;160;100" dur="5s" repeatCount="indefinite" />
              <animate attributeName="height" values="100;160;100" dur="5s" repeatCount="indefinite" />
              <animate attributeName="x" values={`${CX-50};${CX-80};${CX-50}`} dur="5s" repeatCount="indefinite" />
              <animate attributeName="y" values={`${CY-50};${CY-80};${CY-50}`} dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="5s" repeatCount="indefinite" />
            </rect>

            {/* Connection lines */}
            {NODES.map(n => (
              <line
                key={`line-${n.id}`}
                x1={CX} y1={CY} x2={n.x} y2={n.y}
                stroke={active === n.id ? PILLAR_META[n.pillar].color : "white"}
                strokeOpacity={active === n.id ? 0.35 : 0.04}
                strokeWidth={active === n.id ? 1.5 : 0.5}
                style={{ transition: "all 0.3s ease" }}
              />
            ))}

            {/* Center hub text */}
            <rect x={CX - 38} y={CY - 38} width={76} height={76} fill="none"
              stroke="hsl(var(--primary))" strokeOpacity={0.35} strokeWidth={1.5} />
            <text x={CX} y={CY - 8} textAnchor="middle" fill="white" fillOpacity={0.6} fontSize={10} fontWeight={700} letterSpacing={3}>
              SERVICE
            </text>
            <text x={CX} y={CY + 10} textAnchor="middle" fill="white" fillOpacity={0.6} fontSize={10} fontWeight={700} letterSpacing={3}>
              LAYER
            </text>

            {/* Module kubes */}
            {NODES.map(n => {
              const isActive = active === n.id;
              const meta = PILLAR_META[n.pillar];
              const size = isActive ? 58 : 46;

              return (
                <g
                  key={n.id}
                  onMouseEnter={() => handleHover(n.id)}
                  onMouseLeave={() => handleHover(null)}
                  onClick={() => handleHover(isActive ? null : n.id)}
                  className="cursor-pointer"
                >
                  {/* Active outer glow kube */}
                  {isActive && (
                    <KubeRect x={n.x} y={n.y} size={72}
                      fill="transparent" stroke={meta.color} strokeOpacity={0.25} strokeWidth={1.5}
                      filter="url(#kube-glow-active)"
                    />
                  )}

                  {/* Main kube */}
                  <KubeRect
                    x={n.x} y={n.y} size={size}
                    fill={isActive ? meta.color : "rgba(255,255,255,0.03)"}
                    stroke={meta.color}
                    strokeOpacity={isActive ? 0.9 : 0.2}
                    strokeWidth={isActive ? 2 : 1}
                    filter={isActive ? "url(#kube-glow)" : undefined}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  {/* Label */}
                  <text
                    x={n.x} y={n.y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? "white" : meta.color}
                    fillOpacity={isActive ? 1 : 0.7}
                    fontSize={n.label.length > 4 ? 7 : 10}
                    fontWeight={800}
                    letterSpacing={1.5}
                    style={{ fontFamily: "'Roboto Mono', monospace", transition: "all 0.3s ease" }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Detail panel */}
          <AnimatePresence>
            {activeModule && (
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-6 border border-white/10 backdrop-blur-md"
                style={{ background: "rgba(29,29,27,0.92)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 border"
                    style={{ color: PILLAR_META[activeModule.pillar].color, borderColor: PILLAR_META[activeModule.pillar].glow }}
                  >
                    {activeModule.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/30">
                    {PILLAR_META[activeModule.pillar].label}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>
                  {activeModule.fullName}
                </h3>
                <p className="text-xs leading-relaxed text-white/50 mb-4">{activeModule.desc}</p>
                <Link
                  to={activeModule.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                >
                  Explore Kube <ArrowRight size={12} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link to="/service-layer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:underline">
            Explore All Kubes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
