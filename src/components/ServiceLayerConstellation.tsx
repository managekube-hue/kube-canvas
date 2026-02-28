import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface KubeModule {
  id: string;
  label: string;
  fullName: string;
  pillar: "infra" | "detection" | "intel";
  desc: string;
  href: string;
}

const MODULES: KubeModule[] = [
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

// 5 layers × 4 sides. 18 modules + 2 empty on innermost layer
// Each array: [top, right, bottom, left]
const LAYERS: (number | null)[][] = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [16, 17, null, null], // innermost: only top & right have modules
];

const LAYER_SIZES = [100, 80, 60, 42, 26];

const PILLAR_LABELS: Record<string, string> = {
  infra: "Infrastructure",
  detection: "Detection & Response",
  intel: "Intelligence",
};

const PILLAR_COLORS: Record<string, string> = {
  infra: "bg-foreground",
  detection: "bg-brand-orange",
  intel: "bg-muted-foreground",
};

/* ── Corner seam line ── */
function CornerMark({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const len = 10;
  const w = 2;
  const marks: Record<string, React.ReactNode> = {
    tl: (
      <div className="absolute top-0 left-0 z-20">
        <div className="absolute top-0 left-0 bg-brand-orange" style={{ width: len, height: w }} />
        <div className="absolute top-0 left-0 bg-brand-orange" style={{ width: w, height: len }} />
      </div>
    ),
    tr: (
      <div className="absolute top-0 right-0 z-20">
        <div className="absolute top-0 right-0 bg-brand-orange" style={{ width: len, height: w }} />
        <div className="absolute top-0 right-0 bg-brand-orange" style={{ width: w, height: len }} />
      </div>
    ),
    bl: (
      <div className="absolute bottom-0 left-0 z-20">
        <div className="absolute bottom-0 left-0 bg-brand-orange" style={{ width: len, height: w }} />
        <div className="absolute bottom-0 left-0 bg-brand-orange" style={{ width: w, height: len }} />
      </div>
    ),
    br: (
      <div className="absolute bottom-0 right-0 z-20">
        <div className="absolute bottom-0 right-0 bg-brand-orange" style={{ width: len, height: w }} />
        <div className="absolute bottom-0 right-0 bg-brand-orange" style={{ width: w, height: len }} />
      </div>
    ),
  };
  return <>{marks[corner]}</>;
}

/* ── Side button with TEXT label centered on the side ── */
function SideLabel({
  side,
  module,
  isActive,
  onHover,
  onLeave,
}: {
  side: "top" | "right" | "bottom" | "left";
  module: KubeModule | null;
  isActive: boolean;
  onHover: (mod: KubeModule, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  if (!module) return null;

  // Each side is a wide clickable strip along the edge
  const hitboxStyles: Record<string, React.CSSProperties> = {
    top:    { position: "absolute", top: -14, left: 12, right: 12, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
    bottom: { position: "absolute", bottom: -14, left: 12, right: 12, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
    left:   { position: "absolute", left: -14, top: 12, bottom: 12, width: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
    right:  { position: "absolute", right: -14, top: 12, bottom: 12, width: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  };

  // Writing mode for vertical sides
  const isVertical = side === "left" || side === "right";

  return (
    <Link
      to={module.href}
      className="absolute z-30"
      style={hitboxStyles[side]}
      onMouseEnter={(e) => onHover(module, e)}
      onMouseLeave={onLeave}
    >
      {/* The text label — always visible */}
      <span
        className={`font-mono font-black tracking-[0.15em] uppercase transition-all duration-200 select-none ${
          isActive
            ? "text-brand-orange text-[11px]"
            : "text-muted-foreground/70 text-[9px] hover:text-muted-foreground"
        }`}
        style={isVertical ? { writingMode: "vertical-lr", textOrientation: "mixed" } : undefined}
      >
        {module.label}
      </span>
    </Link>
  );
}

export function ServiceLayerConstellation() {
  const [activeModule, setActiveModule] = useState<KubeModule | null>(null);
  const [tooltipAnchor, setTooltipAnchor] = useState<{ x: number; y: number } | null>(null);

  const handleHover = (mod: KubeModule, e: React.MouseEvent) => {
    const container = (e.currentTarget as HTMLElement).closest(".constellation-root");
    if (container) {
      const rect = container.getBoundingClientRect();
      setTooltipAnchor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setActiveModule(mod);
  };

  const handleLeave = () => {
    setActiveModule(null);
    setTooltipAnchor(null);
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 font-mono text-brand-orange">
            Service Layer
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 font-display">
            18 Detection &amp; Response <span className="text-brand-orange">Kubes</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto text-muted-foreground">
            Each kube delivers a specific capability. Hover to explore.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-12">
          {(["infra", "detection", "intel"] as const).map((p) => (
            <div key={p} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${PILLAR_COLORS[p]}`} />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                {PILLAR_LABELS[p]}
              </span>
            </div>
          ))}
        </div>

        {/* Nested cubes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto constellation-root"
          style={{ width: "100%", maxWidth: 560, aspectRatio: "1 / 1" }}
        >
          {LAYERS.map((sideIndices, li) => {
            const size = LAYER_SIZES[li];
            const offset = (100 - size) / 2;
            const sides: ("top" | "right" | "bottom" | "left")[] = ["top", "right", "bottom", "left"];

            return (
              <div
                key={li}
                className="absolute border border-border"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  top: `${offset}%`,
                  left: `${offset}%`,
                }}
              >
                {/* Corner seam lines */}
                <CornerMark corner="tl" />
                <CornerMark corner="tr" />
                <CornerMark corner="bl" />
                <CornerMark corner="br" />

                {/* Side labels — text on each side */}
                {sides.map((side, si) => {
                  const modIdx = sideIndices[si];
                  const mod = modIdx !== null && modIdx !== undefined ? MODULES[modIdx] : null;
                  return (
                    <SideLabel
                      key={side}
                      side={side}
                      module={mod}
                      isActive={activeModule?.id === mod?.id}
                      onHover={handleHover}
                      onLeave={handleLeave}
                    />
                  );
                })}
              </div>
            );
          })}

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <div className="text-[10px] font-mono font-black tracking-[0.3em] uppercase text-foreground">
                ManageKube
              </div>
              <div className="text-[8px] text-muted-foreground tracking-widest uppercase mt-1">
                Core Engine
              </div>
            </div>
          </div>

          {/* Floating tooltip */}
          <AnimatePresence>
            {activeModule && tooltipAnchor && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute z-50 w-64 p-4 rounded-lg border border-border bg-card shadow-xl pointer-events-none"
                style={{
                  left: Math.min(Math.max(tooltipAnchor.x + 16, 0), 300),
                  top: Math.min(Math.max(tooltipAnchor.y - 20, 0), 400),
                }}
              >
                <span className="text-[9px] font-mono font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange">
                  {activeModule.label}
                </span>
                <h4 className="text-sm font-bold text-foreground mt-2">{activeModule.fullName}</h4>
                <p className="text-[10px] uppercase tracking-widest mt-1 text-muted-foreground">
                  {PILLAR_LABELS[activeModule.pillar]}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{activeModule.desc}</p>
                <div className="flex gap-2 mt-3">
                  <Link
                    to={activeModule.href}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-brand-orange text-white pointer-events-auto"
                  >
                    Explore Kube <ArrowRight size={10} />
                  </Link>
                  <Link
                    to="/service-layer"
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-border text-muted-foreground pointer-events-auto"
                  >
                    All Kubes
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/service-layer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-orange hover:underline transition-colors"
          >
            Explore All Kubes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
