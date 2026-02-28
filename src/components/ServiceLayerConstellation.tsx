import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  { id: "MSP", label: "MSP", fullName: "Managed Service Provider", pillar: "intel", desc: "Multi-tenant service delivery, SLA monitoring, and operational dashboards.", href: "/service-layer/msp" },
  { id: "MSSP", label: "MSSP", fullName: "Managed Security Service Provider", pillar: "intel", desc: "Security-as-a-service delivery, SOC operations, and client reporting.", href: "/service-layer/mssp" },
];

const LAYER_SIZES = [100, 80, 60, 40, 22];

// Small separating line at each corner seam
function CornerSeam({ position, layerIndex }: { position: "tl" | "tr" | "bl" | "br"; layerIndex: number }) {
  const len = 12;
  const posStyles: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1 },
    tr: { top: -1, right: -1 },
    bl: { bottom: -1, left: -1 },
    br: { bottom: -1, right: -1 },
  };

  // Two small lines forming an L at each corner
  const lines: Record<string, React.ReactNode> = {
    tl: (
      <>
        <div className="absolute top-0 left-0 bg-brand-orange" style={{ width: len, height: 2 }} />
        <div className="absolute top-0 left-0 bg-brand-orange" style={{ width: 2, height: len }} />
      </>
    ),
    tr: (
      <>
        <div className="absolute top-0 right-0 bg-brand-orange" style={{ width: len, height: 2 }} />
        <div className="absolute top-0 right-0 bg-brand-orange" style={{ width: 2, height: len }} />
      </>
    ),
    bl: (
      <>
        <div className="absolute bottom-0 left-0 bg-brand-orange" style={{ width: len, height: 2 }} />
        <div className="absolute bottom-0 left-0 bg-brand-orange" style={{ width: 2, height: len }} />
      </>
    ),
    br: (
      <>
        <div className="absolute bottom-0 right-0 bg-brand-orange" style={{ width: len, height: 2 }} />
        <div className="absolute bottom-0 right-0 bg-brand-orange" style={{ width: 2, height: len }} />
      </>
    ),
  };

  return (
    <div className="absolute z-20" style={posStyles[position]}>
      {lines[position]}
    </div>
  );
}

// Clickable side that acts as a button
function SideButton({
  side,
  module,
  onHover,
  onLeave,
  isActive,
}: {
  side: "top" | "right" | "bottom" | "left";
  module: KubeModule;
  onHover: (mod: KubeModule, e: React.MouseEvent) => void;
  onLeave: () => void;
  isActive: boolean;
}) {
  const sideClass: Record<string, string> = {
    top: "top-0 left-[14px] right-[14px] h-[2px]",
    bottom: "bottom-0 left-[14px] right-[14px] h-[2px]",
    left: "left-0 top-[14px] bottom-[14px] w-[2px]",
    right: "right-0 top-[14px] bottom-[14px] w-[2px]",
  };

  // Label position
  const labelClass: Record<string, string> = {
    top: "left-1/2 -translate-x-1/2 -top-6",
    bottom: "left-1/2 -translate-x-1/2 -bottom-6",
    left: "top-1/2 -translate-y-1/2 -left-10",
    right: "top-1/2 -translate-y-1/2 -right-10",
  };

  return (
    <Link
      to={module.href}
      className={`absolute z-30 cursor-pointer transition-all duration-200 group ${sideClass[side]}`}
      onMouseEnter={(e) => onHover(module, e)}
      onMouseLeave={onLeave}
    >
      {/* Hover highlight - thickens the side */}
      <div
        className={`absolute inset-0 transition-all duration-200 ${
          isActive ? "bg-brand-orange shadow-[0_0_8px_hsl(var(--brand-orange)/0.5)]" : "bg-transparent"
        }`}
        style={
          side === "top" || side === "bottom"
            ? { height: isActive ? 3 : 2 }
            : { width: isActive ? 3 : 2 }
        }
      />
      {/* Label on hover */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute ${labelClass[side]} whitespace-nowrap text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-brand-orange text-white pointer-events-none`}
        >
          {module.label}
        </motion.span>
      )}
    </Link>
  );
}

export function ServiceLayerConstellation() {
  const [activeModule, setActiveModule] = useState<KubeModule | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // 5 layers × 4 modules each = 20 modules
  // Each layer has: top side, right side, bottom side, left side
  const layers = [
    MODULES.slice(0, 4),
    MODULES.slice(4, 8),
    MODULES.slice(8, 12),
    MODULES.slice(12, 16),
    MODULES.slice(16, 20),
  ];

  const handleHover = (mod: KubeModule, e: React.MouseEvent) => {
    const container = (e.currentTarget as HTMLElement).closest(".constellation-container");
    if (container) {
      const rect = container.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setActiveModule(mod);
  };

  const handleLeave = () => {
    setActiveModule(null);
    setTooltipPos(null);
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
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
            18 Detection &amp; Response <span className="text-brand-orange">Kubes</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto text-muted-foreground">
            Each kube delivers a specific capability. Hover a side to explore.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { label: "Infrastructure", cls: "bg-foreground" },
            { label: "Detection & Response", cls: "bg-brand-orange" },
            { label: "Intelligence", cls: "bg-muted-foreground" },
          ].map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${p.cls}`} />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Nested boxes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto constellation-container"
          style={{ width: "100%", maxWidth: 600, aspectRatio: "1 / 1" }}
        >
          {layers.map((layerModules, li) => {
            const size = LAYER_SIZES[li];
            const offset = (100 - size) / 2;

            return (
              <div
                key={li}
                className="absolute border border-border/40"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  top: `${offset}%`,
                  left: `${offset}%`,
                }}
              >
                {/* Corner seam separating lines at all 4 corners */}
                <CornerSeam position="tl" layerIndex={li} />
                <CornerSeam position="tr" layerIndex={li} />
                <CornerSeam position="bl" layerIndex={li} />
                <CornerSeam position="br" layerIndex={li} />

                {/* 4 clickable sides — each is a module */}
                {(["top", "right", "bottom", "left"] as const).map((side, si) => (
                  <SideButton
                    key={side}
                    side={side}
                    module={layerModules[si]}
                    onHover={handleHover}
                    onLeave={handleLeave}
                    isActive={activeModule?.id === layerModules[si].id}
                  />
                ))}
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
            {activeModule && tooltipPos && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute z-50 w-64 p-4 rounded-lg border border-border bg-card shadow-xl pointer-events-none"
                style={{
                  left: Math.min(Math.max(tooltipPos.x + 16, 0), 600 - 270),
                  top: Math.min(Math.max(tooltipPos.y - 20, 0), 600 - 200),
                }}
              >
                <span className="text-[9px] font-mono font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange">
                  {activeModule.label}
                </span>
                <h4 className="text-sm font-bold text-foreground mt-2">{activeModule.fullName}</h4>
                <p className="text-[10px] uppercase tracking-widest mt-1 text-muted-foreground">
                  {activeModule.pillar === "infra" ? "Infrastructure" : activeModule.pillar === "detection" ? "Detection & Response" : "Intelligence"}
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
