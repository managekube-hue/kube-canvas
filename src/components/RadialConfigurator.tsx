import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, FileText, Calendar, Layers } from "lucide-react";

// Kube data - 8 cubes positioned on OUTER ring
const kubes = [
  { id: "assessment", name: "Assessment", color: "#10B981", angle: 180, description: "Deployment Maturity Assessment Engine", capabilities: ["Multi-tenant discovery across 10 infrastructure layers", "Control mapping to 12+ compliance frameworks", "Automated gap analysis and remediation roadmap", "Executive risk scoring and board reporting"] },
  { id: "compliance", name: "Compliance", color: "#8B5CF6", angle: 135, description: "Continuous Compliance & GRC Automation", capabilities: ["Gap remediation planning with prioritized actions", "Evidence automation for continuous monitoring", "Policy development and library creation", "Audit management and attestation liaison"] },
  { id: "mssp", name: "MSSP", color: "#EF4444", angle: 90, description: "Managed Security Services Platform", capabilities: ["24/7 SOC monitoring and threat detection", "Managed EDR/XDR with behavioral analysis", "Vulnerability management and remediation", "Zero Trust architecture implementation"] },
  { id: "msp", name: "MSP", color: "#3B82F6", angle: 45, description: "Infrastructure Operations Command Center", capabilities: ["24/7 Service Desk (Tier 1-3)", "Hybrid infrastructure management", "Managed Workplace: UCaaS, M365, UEM", "BCDRaaS and backup monitoring"] },
  { id: "advisory", name: "Advisory", color: "#F59E0B", angle: 0, description: "Strategic Architecture & Governance Layer", capabilities: ["vCIO/vCISO + FinOps + risk register", "Portfolio alignment → $ROI optimization", "Cloud FinOps cost optimization", "M&A due diligence and integration"] },
  { id: "innovation", name: "Innovation", color: "#EC4899", angle: -45, description: "AI & Automation Excellence Center", capabilities: ["Hyperautomation with AI-driven RPA", "Modern DevSecOps and CI/CD pipelines", "Data modernization and BI", "Custom application development"] },
  { id: "industry", name: "Industry", color: "#14B8A6", angle: -90, description: "Vertical-Specific Platform Solutions", capabilities: ["Pre-integrated BLOCKs for 9 verticals", "Dell infrastructure + IBM intelligence", "Validated reference architectures", "Industry-specific compliance mappings"] },
  { id: "partner", name: "Partner", color: "#6366F1", angle: -135, description: "Strategic Alliance Ecosystem", capabilities: ["Dell Technologies: Servers, storage, APEX", "IBM Software: watsonx, Maximo, Cloud Pak", "Technology Alliances: Cisco, Microsoft, Veeam", "Partner enablement and certification"] },
];

// Compliance frameworks - positioned on INNER ring radiating from center
const complianceFrameworks = [
  { id: "nist", name: "NIST", angle: 90, controls: 124 },
  { id: "soc2", name: "SOC 2", angle: 60, controls: 87 },
  { id: "hipaa", name: "HIPAA", angle: 135, controls: 45 },
  { id: "ferpa", name: "FERPA", angle: 180, controls: 38 },
  { id: "iso27001", name: "ISO 27001", angle: -135, controls: 93 },
  { id: "pci", name: "PCI-DSS", angle: -90, controls: 78 },
  { id: "gdpr", name: "GDPR", angle: -45, controls: 72 },
  { id: "cmmc", name: "CMMC", angle: 0, controls: 110 },
  { id: "fedramp", name: "FedRAMP", angle: 30, controls: 325 },
];

// Block data - industry blocks
const blocks = [
  { id: "m2", name: "M2", label: "Manufacturing", description: "Production Excellence - Predictive maintenance, OT/IT convergence" },
  { id: "h2", name: "H2", label: "Healthcare", description: "Clinical Excellence - HIPAA compliance, ransomware immunity" },
  { id: "f2", name: "F2", label: "Financial Services", description: "Mission-Critical Operations - Real-time fraud detection" },
  { id: "r2", name: "R2", label: "Retail", description: "Omnichannel Commerce - Unified fulfillment, AI personalization" },
  { id: "t2", name: "T2", label: "Transportation", description: "Fleet Intelligence - Real-time visibility, logistics optimization" },
  { id: "me2", name: "ME2", label: "Mining", description: "Remote Operations Resilience - OT security, environmental compliance" },
  { id: "eu2", name: "EU2", label: "Energy", description: "Grid Resilience - Renewable integration, NERC-CIP compliance" },
  { id: "ps2", name: "PS2", label: "Public Sector", description: "Citizen Services - FedRAMP compliance, smart city infrastructure" },
  { id: "tc2", name: "TC2", label: "Telecom", description: "Network Transformation - 5G core, edge monetization" },
];

// Designations
const designations = [
  { id: "sme", name: "SME", price: "$5K-25K/mo", details: "1-50 users, single site" },
  { id: "smb", name: "SMB", price: "$25K-150K/mo", details: "50-500 users, multiple sites" },
  { id: "ent", name: "ENT", price: "$150K+/mo", details: "500+ users, global operations" },
];

interface Selection {
  kube: string | null;
  block: string | null;
  designation: string | null;
  compliance: string[];
}

// Isometric 3D Cube Component - matches your visual exactly
const IsometricCube = ({ 
  x, 
  y, 
  size, 
  color, 
  isActive, 
  label,
  onClick 
}: { 
  x: number; 
  y: number; 
  size: number; 
  color: string; 
  isActive: boolean;
  label: string;
  onClick: () => void;
}) => {
  const h = size * 0.6; // cube height
  
  // Colors for 3D effect
  const topColor = isActive ? color : "#9CA3AF";
  const leftColor = isActive ? color : "#6B7280";
  const rightColor = isActive ? color : "#4B5563";
  
  return (
    <g className="cursor-pointer" onClick={onClick}>
      <motion.g
        animate={{ 
          scale: isActive ? 1.2 : 1,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Active glow effect */}
        {isActive && (
          <>
            <motion.ellipse
              cx={x}
              cy={y + h + 8}
              rx={size * 0.7}
              ry={size * 0.2}
              fill={color}
              opacity={0.4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
            />
            <defs>
              <filter id={`glow-${label}`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feFlood floodColor={color} floodOpacity="0.6"/>
                <feComposite in2="blur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </>
        )}
        
        {/* Top face (diamond) */}
        <motion.path
          d={`M ${x} ${y - h/2} 
              L ${x + size/2} ${y} 
              L ${x} ${y + h/2} 
              L ${x - size/2} ${y} Z`}
          fill={topColor}
          opacity={isActive ? 1 : 0.7}
          filter={isActive ? `url(#glow-${label})` : undefined}
        />
        
        {/* Left face */}
        <motion.path
          d={`M ${x - size/2} ${y} 
              L ${x} ${y + h/2} 
              L ${x} ${y + h/2 + h} 
              L ${x - size/2} ${y + h} Z`}
          fill={leftColor}
          opacity={isActive ? 0.85 : 0.5}
        />
        
        {/* Right face */}
        <motion.path
          d={`M ${x + size/2} ${y} 
              L ${x} ${y + h/2} 
              L ${x} ${y + h/2 + h} 
              L ${x + size/2} ${y + h} Z`}
          fill={rightColor}
          opacity={isActive ? 0.7 : 0.4}
        />

        {/* Icon placeholder on top face */}
        <motion.rect
          x={x - 6}
          y={y - 4}
          width={12}
          height={8}
          fill={isActive ? "white" : "#D1D5DB"}
          opacity={0.8}
          rx={1}
        />
      </motion.g>
      
      {/* Label below cube */}
      <text
        x={x}
        y={y + size + 16}
        textAnchor="middle"
        fill={isActive ? "white" : "#9CA3AF"}
        fontSize="11"
        fontFamily="Roboto Mono"
        className="uppercase pointer-events-none font-medium"
      >
        {label}
      </text>
    </g>
  );
};

export const RadialConfigurator = () => {
  const [selection, setSelection] = useState<Selection>({
    kube: null,
    block: null,
    designation: null,
    compliance: [],
  });
  
  const [revealLayers, setRevealLayers] = useState(false);

  const selectedKube = kubes.find((k) => k.id === selection.kube);
  const selectedBlock = blocks.find((b) => b.id === selection.block);
  const selectedDesignation = designations.find((d) => d.id === selection.designation);

  const handleKubeClick = (kubeId: string) => {
    setSelection((prev) => ({ ...prev, kube: kubeId }));
    setRevealLayers(true);
  };

  const getTotalControls = () => {
    return selection.compliance.reduce((acc, id) => {
      const framework = complianceFrameworks.find((f) => f.id === id);
      return acc + (framework?.controls || 0);
    }, 0);
  };

  const getEstimatedCost = () => {
    const baseAssessment = 7500;
    const controlCost = getTotalControls() * 100;
    return { 
      assessment: baseAssessment + selection.compliance.length * 1500, 
      monthly: Math.round(controlCost / 12) + 5000 
    };
  };

  const toggleCompliance = (id: string) => {
    setSelection((prev) => ({
      ...prev,
      compliance: prev.compliance.includes(id)
        ? prev.compliance.filter((c) => c !== id)
        : [...prev.compliance, id],
    }));
  };

  const getCTAText = () => {
    if (!selection.kube) return "SELECT A KUBE TO BEGIN";
    if (selection.compliance.length > 0 && selection.block && selection.designation) {
      return "GENERATE ASSESSMENT SCOPE (PDF)";
    }
    return `START ${selectedKube?.name.toUpperCase()} ASSESSMENT`;
  };

  // SVG dimensions and center
  const centerX = 300;
  const centerY = 300;
  
  // Ring radii - CUBES ON OUTER, BLOCKS/COMPLIANCE ON INNER
  const outerKubeRadius = 220;     // Kubes on OUTER ring
  const blockRadius = 160;         // Industry BLOCK markers (M2, H2, etc.)
  const complianceRadius = 115;    // Compliance labels on INNER ring

  // Positions for blocks around the wheel
  const blockPositions = [
    { id: "m2", name: "M2", angle: -90 },
    { id: "h2", name: "H2", angle: -45 },
    { id: "f2", name: "F2", angle: 0 },
    { id: "r2", name: "R2", angle: 45 },
    { id: "t2", name: "T2", angle: 90 },
    { id: "me2", name: "ME2", angle: 135 },
    { id: "eu2", name: "EU2", angle: 180 },
    { id: "ps2", name: "PS2", angle: 225 },
    { id: "tc2", name: "TC2", angle: 270 },
  ];

  // Designation badge positions
  const designationPositions = [
    { id: "sme", name: "SME", x: centerX, y: centerY - 250 },
    { id: "smb", name: "SMB", x: centerX + 220, y: centerY + 80 },
    { id: "ent", name: "ENT", x: centerX - 220, y: centerY + 80 },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background" id="configurator">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-4"
        >
          BUILD YOUR KUBE STACK
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-muted-foreground text-center mb-12"
        >
          SELECT A KUBE → REVEAL INTERCONNECTED SERVICES → BUILD YOUR STACK
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
          {/* Left: Radial Wheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-[700px] aspect-square">
              <svg viewBox="0 0 600 600" className="w-full h-full">
                {/* Outer ring - dashed circle */}
                <circle 
                  cx={centerX} 
                  cy={centerY} 
                  r={270} 
                  fill="none" 
                  stroke="hsl(var(--border))" 
                  strokeWidth="1" 
                  strokeDasharray="4 8" 
                  opacity={0.5}
                />

                {/* Kube orbit ring - where cubes sit */}
                <circle 
                  cx={centerX} 
                  cy={centerY} 
                  r={outerKubeRadius} 
                  fill="none" 
                  stroke="hsl(var(--border))" 
                  strokeWidth="1" 
                  strokeDasharray="2 6"
                  opacity={0.4}
                />

                {/* 8 KUBE CUBES - OUTER RING */}
                {kubes.map((kube) => {
                  const angleRad = kube.angle * (Math.PI / 180);
                  const x = centerX + Math.cos(angleRad) * outerKubeRadius;
                  const y = centerY + Math.sin(angleRad) * outerKubeRadius;
                  const isActive = selection.kube === kube.id;
                  
                  return (
                    <g key={kube.id}>
                      {/* Connection line to center when active */}
                      {isActive && (
                        <motion.line
                          x1={x}
                          y1={y}
                          x2={centerX}
                          y2={centerY}
                          stroke={kube.color}
                          strokeWidth="2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.8 }}
                          transition={{ duration: 0.5 }}
                          style={{ filter: `drop-shadow(0 0 8px ${kube.color})` }}
                        />
                      )}
                      <IsometricCube
                        x={x}
                        y={y}
                        size={44}
                        color={kube.color}
                        isActive={isActive}
                        label={kube.name}
                        onClick={() => handleKubeClick(kube.id)}
                      />
                    </g>
                  );
                })}

                {/* REVEALED LAYERS - Industry BLOCKs, Compliance, Designations */}
                <AnimatePresence>
                  {revealLayers && (
                    <>
                      {/* BLOCK ring */}
                      <motion.circle 
                        cx={centerX} 
                        cy={centerY} 
                        r={blockRadius} 
                        fill="none" 
                        stroke="hsl(var(--border))" 
                        strokeWidth="1" 
                        strokeDasharray="3 6"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />

                      {/* Industry BLOCK diamond markers (M2, H2, F2, etc.) */}
                      {blockPositions.map((block, idx) => {
                        const angleRad = block.angle * (Math.PI / 180);
                        const x = centerX + Math.cos(angleRad) * blockRadius;
                        const y = centerY + Math.sin(angleRad) * blockRadius;
                        const isActive = selection.block === block.id;
                        const blockData = blocks.find(b => b.id === block.id);
                        
                        return (
                          <motion.g
                            key={block.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.15 + idx * 0.04 }}
                            className="cursor-pointer"
                            onClick={() => setSelection((prev) => ({ ...prev, block: block.id }))}
                          >
                            {/* Diamond shape */}
                            <motion.path
                              d={`M ${x} ${y - 8} L ${x + 8} ${y} L ${x} ${y + 8} L ${x - 8} ${y} Z`}
                              fill={isActive ? "hsl(var(--brand-blue))" : "transparent"}
                              stroke={isActive ? "hsl(var(--brand-blue))" : "hsl(var(--muted-foreground))"}
                              strokeWidth="1.5"
                              opacity={isActive ? 1 : 0.6}
                            />
                            {/* Block label */}
                            <text
                              x={x}
                              y={y - 14}
                              textAnchor="middle"
                              fill={isActive ? "hsl(var(--brand-blue))" : "hsl(var(--muted-foreground))"}
                              fontSize="8"
                              fontFamily="Roboto Mono"
                              className="uppercase pointer-events-none"
                              opacity={isActive ? 1 : 0.7}
                            >
                              {block.name}
                            </text>
                          </motion.g>
                        );
                      })}

                      {/* Inner compliance ring */}
                      <motion.circle 
                        cx={centerX} 
                        cy={centerY} 
                        r={complianceRadius} 
                        fill="none" 
                        stroke="hsl(var(--border))" 
                        strokeWidth="1" 
                        strokeDasharray="2 4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      
                      {/* Compliance framework labels */}
                      {complianceFrameworks.map((framework, idx) => {
                        const angleRad = framework.angle * (Math.PI / 180);
                        const x = centerX + Math.cos(angleRad) * complianceRadius;
                        const y = centerY + Math.sin(angleRad) * complianceRadius;
                        const isActive = selection.compliance.includes(framework.id);
                        
                        return (
                          <motion.g
                            key={framework.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                            className="cursor-pointer"
                            onClick={() => toggleCompliance(framework.id)}
                          >
                            {/* Small dot marker */}
                            <circle
                              cx={x}
                              cy={y}
                              r={4}
                              fill={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                              opacity={isActive ? 1 : 0.5}
                            />
                            {/* Framework label */}
                            <text
                              x={x}
                              y={y - 10}
                              textAnchor="middle"
                              fill={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                              fontSize="9"
                              fontFamily="Roboto Mono"
                              className="uppercase pointer-events-none"
                              opacity={isActive ? 1 : 0.6}
                            >
                              {framework.name}
                            </text>
                          </motion.g>
                        );
                      })}

                      {/* SME / SMB / ENT Designation badges */}
                      {designationPositions.map((des, idx) => {
                        const isActive = selection.designation === des.id;
                        return (
                          <motion.g
                            key={des.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                            className="cursor-pointer"
                            onClick={() => setSelection((prev) => ({ ...prev, designation: des.id }))}
                          >
                            <rect
                              x={des.x - 22}
                              y={des.y - 10}
                              width={44}
                              height={20}
                              rx={4}
                              fill={isActive ? "white" : "transparent"}
                              stroke={isActive ? "white" : "hsl(var(--border))"}
                              strokeWidth="1"
                            />
                            <text
                              x={des.x}
                              y={des.y + 4}
                              textAnchor="middle"
                              fill={isActive ? "black" : "hsl(var(--muted-foreground))"}
                              fontSize="11"
                              fontFamily="Roboto Mono"
                              fontWeight={isActive ? "bold" : "normal"}
                              className="pointer-events-none"
                            >
                              {des.name}
                            </text>
                          </motion.g>
                        );
                      })}
                    </>
                  )}
                </AnimatePresence>

                {/* CENTER CORE - DIGITAL RESILIENCE */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r={65}
                  fill="hsl(var(--background))"
                  stroke={selection.kube ? selectedKube?.color : "hsl(var(--border))"}
                  strokeWidth="2"
                  animate={{
                    boxShadow: selection.kube ? `0 0 30px ${selectedKube?.color}` : "none"
                  }}
                />
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r={60}
                  fill="black"
                />
                <text
                  x={centerX}
                  y={centerY - 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="Special Elite"
                  className="uppercase"
                >
                  DIGITAL
                </text>
                <text
                  x={centerX}
                  y={centerY + 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="Special Elite"
                  className="uppercase"
                >
                  RESILIENCE
                </text>
                <text
                  x={centerX}
                  y={centerY + 26}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="7"
                  fontFamily="Roboto Mono"
                >
                  Connecting Industry,
                </text>
                <text
                  x={centerX}
                  y={centerY + 36}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="7"
                  fontFamily="Roboto Mono"
                >
                  Risk, &amp; Outcomes
                </text>
              </svg>
            </div>

            {/* Layer 5: Compliance Panel (below wheel) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-2xl card-glass rounded-xl p-6 mt-8"
            >
              <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-muted-foreground" />
                LAYER 5: COMPLIANCE (MULTI-SELECT)
              </h3>
              <div className="flex flex-wrap gap-2">
                {complianceFrameworks.map((framework) => (
                  <button
                    key={framework.id}
                    onClick={() => toggleCompliance(framework.id)}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 border ${
                      selection.compliance.includes(framework.id)
                        ? "bg-primary/20 text-white border-primary"
                        : "bg-secondary border-border text-muted-foreground hover:text-white hover:border-muted-foreground"
                    }`}
                  >
                    {framework.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Info Panel - STATE DRIVEN */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass rounded-xl p-6 lg:p-8 h-fit lg:sticky lg:top-24"
          >
            <AnimatePresence mode="wait">
              {!selection.kube ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="font-display text-2xl text-white mb-4">
                    BUILD YOUR KUBE STACK
                  </div>
                  <div className="font-mono text-muted-foreground mb-6">
                    Click any Kube to start building your stack
                  </div>
                  <Button variant="ghost" className="font-mono text-sm">
                    START ANYWHERE →
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* 1. ACTIVE KUBE (always shown) */}
                  <div>
                    <div 
                      className="inline-block px-3 py-1 rounded-full font-mono text-xs mb-3"
                      style={{ backgroundColor: `${selectedKube?.color}33`, color: selectedKube?.color }}
                    >
                      {selectedKube?.name.toUpperCase()} KUBE
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl text-white mb-2">
                      {selectedKube?.description}
                    </h3>
                    <ul className="space-y-1 font-mono text-sm text-muted-foreground">
                      {selectedKube?.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. DESIGNATION Selection */}
                  <div className="border-t border-border pt-4">
                    <div className="font-mono text-xs text-muted-foreground mb-3">SELECT SCALE</div>
                    <div className="flex gap-2">
                      {designations.map((des) => (
                        <button
                          key={des.id}
                          onClick={() => setSelection((prev) => ({ ...prev, designation: des.id }))}
                          className={`flex-1 px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 border ${
                            selection.designation === des.id
                              ? "bg-primary/20 text-white border-primary"
                              : "bg-secondary border-border text-muted-foreground hover:text-white"
                          }`}
                        >
                          <div className="font-display text-base">{des.name}</div>
                          <div className="text-xs opacity-70">{des.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. INDUSTRY BLOCK Selection */}
                  <div className="border-t border-border pt-4">
                    <div className="font-mono text-xs text-muted-foreground mb-3">SELECT INDUSTRY BLOCK</div>
                    <div className="flex flex-wrap gap-2">
                      {blocks.map((block) => (
                        <button
                          key={block.id}
                          onClick={() => setSelection((prev) => ({ ...prev, block: block.id }))}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 border ${
                            selection.block === block.id
                              ? "bg-brand-blue/20 text-white border-brand-blue"
                              : "bg-secondary border-border text-muted-foreground hover:text-white"
                          }`}
                        >
                          {block.name}BLOCK
                        </button>
                      ))}
                    </div>
                    {selectedBlock && (
                      <div className="mt-3 font-mono text-xs text-muted-foreground">
                        {selectedBlock.label}: {selectedBlock.description}
                      </div>
                    )}
                  </div>

                  {/* 4. COMPLIANCE STACK */}
                  {selection.compliance.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <div className="font-mono text-xs text-muted-foreground mb-2">COMPLIANCE STACK</div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selection.compliance.map((id) => {
                          const f = complianceFrameworks.find((fw) => fw.id === id);
                          return (
                            <span
                              key={id}
                              className="px-2 py-1 rounded font-mono text-xs bg-brand-purple/20 text-white"
                            >
                              {f?.name} ({f?.controls})
                            </span>
                          );
                        })}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-secondary rounded-lg p-3">
                          <div className="font-display text-2xl text-white">{getTotalControls()}</div>
                          <div className="font-mono text-xs text-muted-foreground">Total Controls</div>
                        </div>
                        <div className="bg-secondary rounded-lg p-3">
                          <div className="font-display text-2xl text-primary">
                            ${(getEstimatedCost().monthly / 1000).toFixed(0)}K
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">Est. Monthly</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. CTAs */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <Button className="w-full bg-primary hover:bg-primary/90 font-mono text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {getCTAText()}
                    </Button>
                    <Button variant="outline" className="w-full font-mono text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      SCHEDULE CONSULTATION
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* PICK YOUR STACK - 8 Kube boxes below wheel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="font-display text-2xl text-white text-center mb-8">
            OR PICK YOUR STACK
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {kubes.map((kube) => {
              const isActive = selection.kube === kube.id;
              return (
                <motion.button
                  key={kube.id}
                  onClick={() => handleKubeClick(kube.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                    isActive
                      ? "border-2"
                      : "border-border bg-secondary/50 hover:border-muted-foreground"
                  }`}
                  style={{
                    borderColor: isActive ? kube.color : undefined,
                    backgroundColor: isActive ? `${kube.color}15` : undefined,
                    boxShadow: isActive ? `0 0 20px ${kube.color}30` : undefined,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${kube.color}30` }}
                  >
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: kube.color }}
                    />
                  </div>
                  <div className="font-display text-sm text-white mb-1">{kube.name}</div>
                  <div className="font-mono text-xs text-muted-foreground line-clamp-2">
                    {kube.description}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
