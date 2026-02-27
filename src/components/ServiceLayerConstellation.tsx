import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ─── Module data ─── */
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

const PILLAR_COLORS: Record<Pillar, string> = {
  infra: "hsl(var(--primary))",
  detection: "hsl(32, 90%, 55%)",
  intel: "hsl(48, 85%, 58%)",
};

const PILLAR_LABELS: Record<Pillar, string> = {
  infra: "Infrastructure",
  detection: "Detection & Response",
  intel: "Intelligence",
};

/* ─── Single Kube Cell ─── */
function KubeCell({ mod, isActive, onHover, onLeave, onClick }: {
  mod: Module; isActive: boolean;
  onHover: () => void; onLeave: () => void; onClick: () => void;
}) {
  const color = PILLAR_COLORS[mod.pillar];

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative cursor-pointer flex flex-col items-center justify-center aspect-square transition-all duration-300"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${color}22, ${color}08)`
          : "transparent",
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l transition-all duration-300"
        style={{ borderColor: isActive ? color : "rgba(255,255,255,0.08)" }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r transition-all duration-300"
        style={{ borderColor: isActive ? color : "rgba(255,255,255,0.08)" }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-all duration-300"
        style={{ borderColor: isActive ? color : "rgba(255,255,255,0.08)" }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-all duration-300"
        style={{ borderColor: isActive ? color : "rgba(255,255,255,0.08)" }} />

      {/* Pillar indicator dot */}
      <div className="w-1.5 h-1.5 mb-2 transition-all duration-300"
        style={{ background: color, opacity: isActive ? 1 : 0.4 }} />

      {/* Label */}
      <span
        className="text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300"
        style={{
          fontFamily: "'Roboto Mono', monospace",
          color: isActive ? "white" : "rgba(255,255,255,0.45)",
        }}
      >
        {mod.label}
      </span>

      {/* Full name on hover */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-2 text-[7px] tracking-wider uppercase text-center px-1 leading-tight"
            style={{ color, fontFamily: "'Roboto Mono', monospace" }}
          >
            {mod.fullName}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active glow */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: `inset 0 0 30px ${color}15, 0 0 20px ${color}08` }} />
      )}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function ServiceLayerConstellation() {
  const [active, setActive] = useState<string | null>(null);
  const activeModule = MODULES.find(m => m.id === active);

  const handleHover = useCallback((id: string | null) => setActive(id), []);

  // 18 modules laid out in a 6×3 grid
  const rows = [
    MODULES.slice(0, 6),   // Infrastructure
    MODULES.slice(6, 12),  // Detection row 1
    MODULES.slice(12, 18), // Detection row 2 + Intel
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden section-dark">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Service Layer</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
            18 Detection &amp; Response <span className="text-primary">Kubes</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto text-white/40">
            Each kube delivers a specific capability. Hover to explore.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-10">
          {(Object.entries(PILLAR_LABELS) as [Pillar, string][]).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5" style={{ background: PILLAR_COLORS[key] }} />
              <span className="text-[10px] uppercase tracking-widest text-white/35">{label}</span>
            </div>
          ))}
        </div>

        {/* THE KUBE: One large container with internal grid divisions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto border border-white/[0.06] bg-white/[0.02]"
          style={{ maxWidth: 900 }}
        >
          {/* Outer frame accent corners */}
          <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-primary" />
          <div className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-primary" />
          <div className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-primary" />
          <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-primary" />

          {/* Grid rows */}
          {rows.map((row, ri) => (
            <div key={ri} className={`grid grid-cols-6 ${ri < rows.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              {row.map((mod, ci) => (
                <div key={mod.id}
                  className={ci < row.length - 1 ? "border-r border-white/[0.06]" : ""}
                >
                  <KubeCell
                    mod={mod}
                    isActive={active === mod.id}
                    onHover={() => handleHover(mod.id)}
                    onLeave={() => handleHover(null)}
                    onClick={() => handleHover(active === mod.id ? null : mod.id)}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Ambient scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence>
          {activeModule && (
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-6 max-w-2xl p-6 border border-white/[0.08] backdrop-blur-sm flex items-start gap-6"
              style={{ background: "rgba(29,29,27,0.85)" }}
            >
              {/* Kube icon */}
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center border"
                style={{ borderColor: PILLAR_COLORS[activeModule.pillar] + "40", background: PILLAR_COLORS[activeModule.pillar] + "0A" }}
              >
                <span className="text-xs font-black tracking-widest"
                  style={{ color: PILLAR_COLORS[activeModule.pillar], fontFamily: "'Roboto Mono', monospace" }}>
                  {activeModule.label}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="text-base font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
                    {activeModule.fullName}
                  </h3>
                </div>
                <p className="text-[10px] uppercase tracking-widest mb-2"
                  style={{ color: PILLAR_COLORS[activeModule.pillar] }}>
                  {PILLAR_LABELS[activeModule.pillar]}
                </p>
                <p className="text-xs leading-relaxed text-white/45 mb-3">{activeModule.desc}</p>
                <Link
                  to={activeModule.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                >
                  Explore Kube <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/service-layer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:underline">
            Explore All Kubes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
