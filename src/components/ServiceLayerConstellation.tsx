import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Pillar = "infra" | "detection" | "intel";

interface KubeModule {
  id: string;
  label: string;
  fullName: string;
  pillar: Pillar;
  desc: string;
  href: string;
}

const MODULES: KubeModule[] = [
  // Layer 1 (outermost)
  { id: "CIO", label: "CIO", fullName: "Chief Infrastructure Orchestrator", pillar: "infra", desc: "Unified infrastructure visibility and control across hybrid environments.", href: "/service-layer/cio" },
  { id: "NPM", label: "NPM", fullName: "Network Performance Management", pillar: "infra", desc: "Deep packet inspection, flow analysis, and network health scoring.", href: "/service-layer/npm" },
  { id: "MDM", label: "MDM", fullName: "Mobile Device Management", pillar: "infra", desc: "Endpoint enrollment, policy enforcement, and remote wipe capabilities.", href: "/service-layer/mdm" },
  { id: "APM", label: "APM", fullName: "Application Performance Management", pillar: "infra", desc: "Real-time application tracing, latency analysis, and dependency mapping.", href: "/service-layer/apm" },
  // Layer 2
  { id: "CFDR", label: "CFDR", fullName: "Cloud Firewall Detection & Response", pillar: "infra", desc: "Cloud-native firewall policy management and anomaly detection.", href: "/service-layer/cfdr" },
  { id: "BDR", label: "BDR", fullName: "Backup & Disaster Recovery", pillar: "infra", desc: "Immutable backups, RTO validation, and automated failover testing.", href: "/service-layer/bdr" },
  { id: "ITDR", label: "ITDR", fullName: "Identity Threat Detection & Response", pillar: "detection", desc: "Credential abuse detection, privilege escalation alerts, and identity hygiene.", href: "/service-layer/itdr" },
  { id: "NDR", label: "NDR", fullName: "Network Detection & Response", pillar: "detection", desc: "East-west traffic analysis, lateral movement detection, and network forensics.", href: "/service-layer/ndr" },
  // Layer 3
  { id: "CDR", label: "CDR", fullName: "Cloud Detection & Response", pillar: "detection", desc: "Cloud workload protection, misconfiguration detection, and runtime defense.", href: "/service-layer/cdr" },
  { id: "SDR", label: "SDR", fullName: "SaaS Detection & Response", pillar: "detection", desc: "SaaS application monitoring, shadow IT discovery, and data exfiltration alerts.", href: "/service-layer/sdr" },
  { id: "ADR", label: "ADR", fullName: "Application Detection & Response", pillar: "detection", desc: "Runtime application security, code-level threat detection, and API protection.", href: "/service-layer/adr" },
  { id: "DDR", label: "DDR", fullName: "Data Detection & Response", pillar: "detection", desc: "Data classification, movement tracking, and exfiltration prevention.", href: "/service-layer/ddr" },
  // Layer 4
  { id: "STRIKE", label: "STRIKE", fullName: "Offensive Security Testing", pillar: "detection", desc: "Red team operations, penetration testing, and adversary simulation.", href: "/service-layer/strike" },
  { id: "EASM", label: "EASM", fullName: "External Attack Surface Management", pillar: "detection", desc: "Continuous asset discovery, exposure scoring, and shadow infrastructure detection.", href: "/service-layer/easm" },
  { id: "HONEYPOT", label: "HONEYPOT", fullName: "Deception Technology", pillar: "detection", desc: "Decoy infrastructure, attacker luring, and early breach indicators.", href: "/service-layer/honeypot" },
  { id: "TI", label: "TI", fullName: "Threat Intelligence", pillar: "intel", desc: "CVE enrichment, EPSS scoring, dark-web monitoring, and IOC feeds.", href: "/service-layer/ti" },
  // Layer 5 (innermost)
  { id: "VDR", label: "VDR", fullName: "Vulnerability Detection & Response", pillar: "intel", desc: "Continuous scanning, risk-based prioritisation, and patch orchestration.", href: "/service-layer/vdr" },
  { id: "GRC", label: "GRC", fullName: "Governance, Risk & Compliance", pillar: "intel", desc: "Policy engine, control mapping, audit evidence collection, and risk scoring.", href: "/service-layer/grc" },
  { id: "MSP", label: "MSP", fullName: "Managed Service Provider", pillar: "intel", desc: "Multi-tenant service delivery, SLA monitoring, and operational dashboards.", href: "/service-layer/msp" },
  { id: "MSSP", label: "MSSP", fullName: "Managed Security Service Provider", pillar: "intel", desc: "Security-as-a-service delivery, SOC operations, and client reporting.", href: "/service-layer/mssp" },
];

const PILLAR_COLORS: Record<Pillar, string> = {
  infra: "#22d3ee",
  detection: "#f97316",
  intel: "#eab308",
};

const LAYER_SIZES = [100, 78, 56, 36, 18]; // percentage of container

interface CornerLabelProps {
  module: KubeModule;
  corner: "tl" | "tr" | "bl" | "br";
  isActive: boolean;
  onHover: (id: string | null) => void;
}

function CornerLabel({ module, corner, isActive, onHover }: CornerLabelProps) {
  const color = PILLAR_COLORS[module.pillar];
  const pos: Record<string, string> = {
    tl: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    tr: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    bl: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    br: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  return (
    <div
      className={`absolute z-20 ${pos[corner]}`}
      onMouseEnter={() => onHover(module.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        to={module.href}
        className="group relative flex items-center justify-center"
      >
        {/* Node dot */}
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            background: isActive ? color : `${color}66`,
            boxShadow: isActive ? `0 0 12px ${color}, 0 0 24px ${color}44` : "none",
          }}
        />
        {/* Label */}
        <span
          className="absolute whitespace-nowrap text-[9px] font-mono font-bold tracking-[0.15em] uppercase transition-all duration-300"
          style={{
            color: isActive ? color : `${color}99`,
            ...(corner === "tl" ? { bottom: "100%", right: "100%", marginBottom: 4, marginRight: 4 } :
              corner === "tr" ? { bottom: "100%", left: "100%", marginBottom: 4, marginLeft: 4 } :
              corner === "bl" ? { top: "100%", right: "100%", marginTop: 4, marginRight: 4 } :
              { top: "100%", left: "100%", marginTop: 4, marginLeft: 4 }),
          }}
        >
          {module.label}
        </span>

        {/* Hover tooltip card */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-50 w-64 p-4 rounded-lg border border-white/10"
            style={{
              background: "rgba(10, 15, 28, 0.95)",
              backdropFilter: "blur(20px)",
              ...(corner === "tl" || corner === "bl"
                ? { right: "calc(100% + 16px)" }
                : { left: "calc(100% + 16px)" }),
              ...(corner === "tl" || corner === "tr"
                ? { top: 0 }
                : { bottom: 0 }),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[9px] font-mono font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded"
                style={{ background: `${color}22`, color }}
              >
                {module.label}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2">{module.fullName}</h4>
            <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color }}>
              {module.pillar === "infra" ? "Infrastructure" : module.pillar === "detection" ? "Detection & Response" : "Intelligence"}
            </p>
            <p className="text-xs text-white/50 leading-relaxed mt-2">{module.desc}</p>
            <div className="flex gap-2 mt-3">
              <span
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded text-white"
                style={{ background: color }}
              >
                Explore Kube <ArrowRight size={10} />
              </span>
              <Link
                to="/service-layer"
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border"
                style={{ borderColor: `${color}60`, color }}
                onClick={(e) => e.stopPropagation()}
              >
                All Kubes
              </Link>
            </div>
          </motion.div>
        )}
      </Link>
    </div>
  );
}

interface SideButtonProps {
  side: "top" | "right" | "bottom" | "left";
  layerIndex: number;
  color: string;
  onClick: () => void;
}

function SideButton({ side, layerIndex, color, onClick }: SideButtonProps) {
  const base = "absolute transition-all duration-300 cursor-pointer group/side";
  const hover = "hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]";
  const positions: Record<string, string> = {
    top: `${base} ${hover} top-0 left-[12px] right-[12px] h-[2px]`,
    bottom: `${base} ${hover} bottom-0 left-[12px] right-[12px] h-[2px]`,
    left: `${base} ${hover} left-0 top-[12px] bottom-[12px] w-[2px]`,
    right: `${base} ${hover} right-0 top-[12px] bottom-[12px] w-[2px]`,
  };

  return (
    <div
      className={positions[side]}
      style={{ background: `${color}33` }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = color;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 8px ${color}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = `${color}33`;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
      title={`Layer ${layerIndex + 1} — ${side}`}
    />
  );
}

export function ServiceLayerConstellation() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    MODULES.slice(0, 4),
    MODULES.slice(4, 8),
    MODULES.slice(8, 12),
    MODULES.slice(12, 16),
    MODULES.slice(16, 20),
  ];

  const layerColors = ["#22d3ee", "#38bdf8", "#f97316", "#fb923c", "#eab308"];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#0A0F1C" }}>
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 font-mono"
            style={{ color: "#22d3ee" }}
          >
            Service Layer
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Special Elite', serif" }}
          >
            20 Detection &amp; Response <span style={{ color: "#22d3ee" }}>Kubes</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto text-white/40">
            Each kube delivers a specific capability. Hover to explore.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { label: "Infrastructure", color: "#22d3ee" },
            { label: "Detection & Response", color: "#f97316" },
            { label: "Intelligence", color: "#eab308" },
          ].map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5" style={{ background: p.color }} />
              <span className="text-[10px] uppercase tracking-widest text-white/35 font-mono">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Nested boxes visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: 700, aspectRatio: "1 / 1" }}
        >
          {layers.map((layerModules, layerIndex) => {
            const size = LAYER_SIZES[layerIndex];
            const offset = (100 - size) / 2;
            const color = layerColors[layerIndex];
            const isLayerActive = activeLayer === layerIndex;
            const corners: ("tl" | "tr" | "bl" | "br")[] = ["tl", "tr", "bl", "br"];

            return (
              <div
                key={layerIndex}
                className="absolute transition-all duration-500"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  top: `${offset}%`,
                  left: `${offset}%`,
                  border: `1px solid ${isLayerActive ? color : `${color}30`}`,
                  boxShadow: isLayerActive ? `inset 0 0 30px ${color}11, 0 0 20px ${color}22` : "none",
                  transition: "all 0.4s ease",
                }}
              >
                {/* Clickable sides */}
                {(["top", "right", "bottom", "left"] as const).map((side) => (
                  <SideButton
                    key={side}
                    side={side}
                    layerIndex={layerIndex}
                    color={color}
                    onClick={() => setActiveLayer(activeLayer === layerIndex ? null : layerIndex)}
                  />
                ))}

                {/* Corner module labels */}
                {corners.map((corner, ci) => (
                  <CornerLabel
                    key={layerModules[ci].id}
                    module={layerModules[ci]}
                    corner={corner}
                    isActive={activeModule === layerModules[ci].id}
                    onHover={setActiveModule}
                  />
                ))}
              </div>
            );
          })}

          {/* Center MANAGEKUBE label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <div
                className="text-[10px] font-mono font-black tracking-[0.3em] uppercase"
                style={{ color: "#22d3ee" }}
              >
                ManageKube
              </div>
              <div className="text-[8px] text-white/20 tracking-widest uppercase mt-1">
                Core Engine
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/service-layer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:underline"
            style={{ color: "#22d3ee" }}
          >
            Explore All Kubes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
