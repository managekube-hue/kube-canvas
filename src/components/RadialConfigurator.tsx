import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, FileText, Calendar, Layers } from "lucide-react";

// Kube data with colors and angles
const kubes = [
  { id: "assessment", name: "Assessment", color: "#10B981", angle: -90, description: "Deployment Maturity Assessment Engine", capabilities: ["Infrastructure Inventory: Servers, storage, network, cloud resources", "Security Assessment: Posture review, vulnerability identification", "Compliance Mapping: Gap analysis against multiple frameworks", "Remediation Roadmap: Prioritized action plan with costs"] },
  { id: "compliance", name: "Compliance", color: "#8B5CF6", angle: -45, description: "Continuous Compliance & GRC Automation", capabilities: ["Gap Remediation Planning: Detailed plan for closing gaps", "Evidence Automation: Continuous monitoring for compliance drift", "Policy Development: Creation of required policy library", "Audit Management: Liaison with auditors for attestation"] },
  { id: "mssp", name: "MSSP", color: "#EF4444", angle: 0, description: "Managed Security Services Platform", capabilities: ["24/7 SOC Monitoring: Threat detection, triage, containment", "Managed EDR/XDR: Endpoint behavioral analysis and response", "Vulnerability Management: Continuous scanning and remediation", "Security Architecture: Zero Trust, network segmentation"] },
  { id: "msp", name: "MSP", color: "#3B82F6", angle: 45, description: "Infrastructure Operations Command Center", capabilities: ["Service Desk: 24/7 or business-hours helpdesk (Tier 1-3)", "Hybrid Infrastructure: Servers, network, storage management", "Managed Workplace: UCaaS, SaaS Ops (M365), UEM/MDM", "BCDR: Disaster Recovery as a Service, backup monitoring"] },
  { id: "advisory", name: "Advisory", color: "#F59E0B", angle: 90, description: "Strategic Technology Leadership", capabilities: ["Virtual CISO: Security governance, risk management", "Virtual CIO: IT strategic planning, technology roadmapping", "Cloud FinOps: Cost optimization, right-sizing", "M&A Due Diligence: IT assessment and integration planning"] },
  { id: "innovation", name: "Innovation", color: "#EC4899", angle: 135, description: "AI & Automation Excellence Center", capabilities: ["Hyperautomation: AI-driven RPA, autonomous agents", "Modern Software Delivery: DevSecOps, CI/CD pipelines", "Data Intelligence: Data modernization, business intelligence", "Custom Development: Application development and APIs"] },
  { id: "industry", name: "Industry", color: "#14B8A6", angle: 180, description: "Vertical-Specific Platform Solutions", capabilities: ["Pre-integrated industry BLOCKs for 9 verticals", "Dell infrastructure + IBM intelligence software", "Validated reference architectures", "Industry-specific compliance mappings"] },
  { id: "partner", name: "Partner", color: "#6366F1", angle: 225, description: "Strategic Alliance Ecosystem", capabilities: ["Dell Technologies: Servers, storage, APEX consumption", "IBM Software: watsonx, Maximo, Cloud Pak portfolio", "Technology Alliances: Cisco, Microsoft, Veeam, CrowdStrike", "Partner Enablement: Certification support"] },
];

// Block data positioned around the wheel
const blocks = [
  { id: "m2", name: "M2", angle: -70, label: "Manufacturing", description: "Production Excellence - Predictive maintenance, quality control, secure OT/IT convergence" },
  { id: "h2", name: "H2", angle: -25, label: "Healthcare", description: "Clinical Excellence - HIPAA compliance, ransomware immunity, EHR performance" },
  { id: "f2", name: "F2", angle: 20, label: "Financial Services", description: "Mission-Critical Operations - Real-time fraud detection, T+0 regulatory reporting" },
  { id: "r2", name: "R2", angle: 65, label: "Retail", description: "Omnichannel Commerce - Unified fulfillment, store operations, AI personalization" },
  { id: "t2", name: "T2", angle: 110, label: "Transportation", description: "Fleet Intelligence - Real-time visibility, predictive maintenance, logistics optimization" },
  { id: "me2", name: "ME2", angle: 155, label: "Mining", description: "Remote Operations Resilience - OT security, environmental compliance" },
  { id: "eu2", name: "EU2", angle: 200, label: "Energy", description: "Grid Resilience - Renewable integration, NERC-CIP compliance" },
  { id: "ps2", name: "PS2", angle: 245, label: "Public Sector", description: "Citizen Services - FedRAMP compliance, smart city infrastructure" },
  { id: "tc2", name: "TC2", angle: 290, label: "Telecom", description: "Network Transformation - 5G core, edge monetization, network automation" },
];

// Designation data
const designations = [
  { id: "sme", name: "SME", description: "Small Enterprise", details: "1-50 users, single site, $5K-25K/mo" },
  { id: "smb", name: "SMB", description: "Mid-Market", details: "50-500 users, multiple sites, $25K-150K/mo" },
  { id: "ent", name: "ENT", description: "Enterprise", details: "500+ users, global operations, $150K+/mo" },
];

// Industry data positioned on outermost edge
const industries = [
  { id: "manufacturing", name: "MANUFACTURING", angle: -90 },
  { id: "healthcare", name: "HEALTHCARE", angle: -45 },
  { id: "financial", name: "FINANCE", angle: 0 },
  { id: "retail", name: "RETAIL", angle: 45 },
  { id: "transportation", name: "TRANSPORTATION", angle: 90 },
  { id: "mining", name: "MINING", angle: 135 },
  { id: "energy", name: "ENERGY", angle: 180 },
  { id: "public", name: "PUBLIC SECTOR", angle: 225 },
  { id: "telecom", name: "TELECOM", angle: 270 },
];

// Compliance frameworks with positions radiating from center
const complianceFrameworks = [
  { id: "nist800", name: "NIST", angle: -60, controls: 124 },
  { id: "soc2", name: "SOC 2", angle: -30, controls: 87 },
  { id: "cmmc", name: "CMMC", angle: 10, controls: 110 },
  { id: "nist", name: "NIST", angle: 50, controls: 98 },
  { id: "gdpr", name: "GDPR", angle: 80, controls: 72 },
  { id: "pci", name: "PCI-DSS", angle: 120, controls: 78 },
  { id: "iso27001", name: "ISO 27001", angle: 160, controls: 93 },
  { id: "ferpa", name: "FERPA", angle: 200, controls: 45 },
  { id: "hipaa", name: "HIPAA", angle: 240, controls: 45 },
  { id: "fedramp", name: "FedRAMP", angle: 280, controls: 325 },
];

interface Selection {
  kube: string | null;
  block: string | null;
  designation: string | null;
  industry: string | null;
  compliance: string[];
}

// 3D Isometric Cube Component
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
  const halfSize = size / 2;
  
  // Isometric cube face calculations
  const topColor = isActive ? color : "#6B7280";
  const leftColor = isActive ? color : "#4B5563";
  const rightColor = isActive ? color : "#374151";
  
  return (
    <g className="cursor-pointer" onClick={onClick}>
      <motion.g
        animate={{ 
          scale: isActive ? 1.15 : 1,
          y: isActive ? -5 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Active glow */}
        {isActive && (
          <motion.ellipse
            cx={x}
            cy={y + size * 0.8}
            rx={size * 0.8}
            ry={size * 0.3}
            fill={color}
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            style={{ filter: `blur(8px)` }}
          />
        )}
        
        {/* Top face (diamond shape) */}
        <motion.path
          d={`M ${x} ${y - halfSize * 0.6} 
              L ${x + halfSize} ${y} 
              L ${x} ${y + halfSize * 0.6} 
              L ${x - halfSize} ${y} Z`}
          fill={topColor}
          opacity={isActive ? 1 : 0.6}
          stroke={isActive ? color : "#6B7280"}
          strokeWidth="1"
        />
        
        {/* Left face */}
        <motion.path
          d={`M ${x - halfSize} ${y} 
              L ${x} ${y + halfSize * 0.6} 
              L ${x} ${y + size * 0.8} 
              L ${x - halfSize} ${y + size * 0.5} Z`}
          fill={leftColor}
          opacity={isActive ? 0.9 : 0.5}
        />
        
        {/* Right face */}
        <motion.path
          d={`M ${x + halfSize} ${y} 
              L ${x} ${y + halfSize * 0.6} 
              L ${x} ${y + size * 0.8} 
              L ${x + halfSize} ${y + size * 0.5} Z`}
          fill={rightColor}
          opacity={isActive ? 0.8 : 0.4}
        />
        
        {/* Connection line to center when active */}
        {isActive && (
          <motion.line
            x1={x}
            y1={y + size * 0.4}
            x2={300}
            y2={300}
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        )}
      </motion.g>
      
      {/* Label below cube */}
      <text
        x={x}
        y={y + size + 12}
        textAnchor="middle"
        fill={isActive ? "white" : "#9CA3AF"}
        fontSize="10"
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
    industry: null,
    compliance: [],
  });
  
  const [revealLayers, setRevealLayers] = useState(false);

  const selectedKube = kubes.find((k) => k.id === selection.kube);
  const selectedBlock = blocks.find((b) => b.id === selection.block);
  const selectedDesignation = designations.find((d) => d.id === selection.designation);
  const selectedIndustry = industries.find((i) => i.id === selection.industry);

  const handleKubeClick = (kubeId: string) => {
    setSelection((prev) => ({ ...prev, kube: kubeId }));
    // Trigger slow reveal of inner layers
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
    return { assessment: baseAssessment + selection.compliance.length * 1500, monthly: Math.round(controlCost / 12) + 5000 };
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
    if (selection.compliance.length > 0 && selection.block && selection.designation && selection.industry) {
      return "GENERATE ASSESSMENT SCOPE (PDF)";
    }
    return `START ${selectedKube?.name.toUpperCase()} ASSESSMENT`;
  };

  // Center of the wheel
  const centerX = 300;
  const centerY = 300;
  
  // Ring radii - Kubes on OUTER ring
  const kubeRingRadius = 200;      // Outer ring for Kubes
  const blockRingRadius = 130;     // Middle ring for BLOCKs
  const complianceRingRadius = 90; // Inner ring for compliance labels
  const industryLabelRadius = 270; // Outermost for industry labels

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
          SELECT A KUBE TO REVEAL INTERCONNECTED SERVICES, INDUSTRIES & COMPLIANCE
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          {/* Left: Radial Wheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-2xl aspect-square">
              <svg viewBox="0 0 600 600" className="w-full h-full">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(32, 91%, 44%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Outer decorative ring - dashed */}
                <circle 
                  cx={centerX} 
                  cy={centerY} 
                  r={250} 
                  fill="none" 
                  stroke="hsl(0, 0%, 20%)" 
                  strokeWidth="1" 
                  strokeDasharray="4 8" 
                />

                {/* Industry Labels - Outermost text labels */}
                {industries.map((industry) => {
                  const angle = industry.angle * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * industryLabelRadius;
                  const y = centerY + Math.sin(angle) * industryLabelRadius;
                  const isActive = selection.industry === industry.id;
                  
                  return (
                    <motion.g
                      key={industry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: revealLayers ? 1 : 0.3 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="cursor-pointer"
                      onClick={() => setSelection((prev) => ({ ...prev, industry: industry.id }))}
                    >
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "hsl(32, 91%, 44%)" : "hsl(0, 0%, 50%)"}
                        fontSize="9"
                        fontFamily="Roboto Mono"
                        className="uppercase pointer-events-auto"
                        style={{ letterSpacing: "1px" }}
                      >
                        {industry.name}
                      </text>
                    </motion.g>
                  );
                })}

                {/* Kube Ring - OUTER RING with 8 3D Cubes */}
                <circle 
                  cx={centerX} 
                  cy={centerY} 
                  r={kubeRingRadius} 
                  fill="none" 
                  stroke="hsl(0, 0%, 25%)" 
                  strokeWidth="1" 
                  strokeDasharray="2 6"
                />
                
                {kubes.map((kube) => {
                  const angle = kube.angle * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * kubeRingRadius;
                  const y = centerY + Math.sin(angle) * kubeRingRadius;
                  const isActive = selection.kube === kube.id;
                  
                  return (
                    <IsometricCube
                      key={kube.id}
                      x={x}
                      y={y}
                      size={36}
                      color={kube.color}
                      isActive={isActive}
                      label={kube.name}
                      onClick={() => handleKubeClick(kube.id)}
                    />
                  );
                })}

                {/* Block Markers - MIDDLE RING (revealed on Kube click) */}
                <AnimatePresence>
                  {revealLayers && (
                    <>
                      <motion.circle 
                        cx={centerX} 
                        cy={centerY} 
                        r={blockRingRadius} 
                        fill="none" 
                        stroke="hsl(0, 0%, 20%)" 
                        strokeWidth="1" 
                        strokeDasharray="3 6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                      
                      {blocks.map((block, index) => {
                        const angle = block.angle * (Math.PI / 180);
                        const x = centerX + Math.cos(angle) * blockRingRadius;
                        const y = centerY + Math.sin(angle) * blockRingRadius;
                        const isActive = selection.block === block.id;
                        
                        return (
                          <motion.g 
                            key={block.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                            className="cursor-pointer"
                            onClick={() => setSelection((prev) => ({ ...prev, block: block.id }))}
                          >
                            {/* Diamond shape for BLOCK */}
                            <motion.path
                              d={`M ${x} ${y - 10} L ${x + 8} ${y} L ${x} ${y + 10} L ${x - 8} ${y} Z`}
                              fill={isActive ? "hsl(217, 91%, 60%)" : "transparent"}
                              stroke={isActive ? "hsl(217, 91%, 70%)" : "hsl(0, 0%, 40%)"}
                              strokeWidth="1.5"
                              whileHover={{ scale: 1.3 }}
                            />
                            <text
                              x={x}
                              y={y - 16}
                              textAnchor="middle"
                              fill={isActive ? "hsl(217, 91%, 70%)" : "hsl(0, 0%, 50%)"}
                              fontSize="8"
                              fontFamily="Roboto Mono"
                              className="pointer-events-none"
                            >
                              {block.name}
                            </text>
                          </motion.g>
                        );
                      })}
                    </>
                  )}
                </AnimatePresence>

                {/* Compliance Labels - INNER (revealed on Kube click) */}
                <AnimatePresence>
                  {revealLayers && (
                    <>
                      {complianceFrameworks.map((framework, index) => {
                        const angle = framework.angle * (Math.PI / 180);
                        const x = centerX + Math.cos(angle) * complianceRingRadius;
                        const y = centerY + Math.sin(angle) * complianceRingRadius;
                        const isActive = selection.compliance.includes(framework.id);
                        
                        return (
                          <motion.g 
                            key={framework.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.03 }}
                            className="cursor-pointer"
                            onClick={() => toggleCompliance(framework.id)}
                          >
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={isActive ? "hsl(262, 83%, 58%)" : "hsl(0, 0%, 35%)"}
                              fontSize="7"
                              fontFamily="Roboto Mono"
                              className="uppercase pointer-events-auto"
                              style={{ 
                                opacity: isActive ? 1 : 0.6,
                                fontWeight: isActive ? 600 : 400
                              }}
                            >
                              {framework.name}
                            </text>
                          </motion.g>
                        );
                      })}
                    </>
                  )}
                </AnimatePresence>

                {/* Designation Badges - floating (revealed on Kube click) */}
                <AnimatePresence>
                  {revealLayers && (
                    <>
                      {designations.map((des, index) => {
                        const positions = [
                          { x: 80, y: 180 },   // SME - top left
                          { x: 520, y: 380 },  // SMB - bottom right  
                          { x: 80, y: 420 },   // ENT - bottom left
                        ];
                        const pos = positions[index];
                        const isActive = selection.designation === des.id;
                        
                        return (
                          <motion.g
                            key={des.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            className="cursor-pointer"
                            onClick={() => setSelection((prev) => ({ ...prev, designation: des.id }))}
                          >
                            <motion.rect
                              x={pos.x - 22}
                              y={pos.y - 10}
                              width="44"
                              height="20"
                              rx="10"
                              fill={isActive ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 10%)"}
                              stroke={isActive ? "hsl(0, 0%, 50%)" : "hsl(0, 0%, 25%)"}
                              strokeWidth="1"
                              whileHover={{ scale: 1.1 }}
                            />
                            <text
                              x={pos.x}
                              y={pos.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={isActive ? "white" : "hsl(0, 0%, 60%)"}
                              fontSize="10"
                              fontFamily="Roboto Mono"
                              fontWeight="500"
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

                {/* Center Core */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="50"
                  fill="hsl(0, 0%, 3%)"
                  stroke="hsl(0, 0%, 25%)"
                  strokeWidth="2"
                  animate={{ 
                    boxShadow: selection.kube ? "0 0 30px hsl(32, 91%, 44%)" : "none"
                  }}
                />
                {selection.kube ? (
                  <>
                    <text
                      x={centerX}
                      y={centerY - 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Special Elite"
                      className="uppercase"
                    >
                      DIGITAL
                    </text>
                    <text
                      x={centerX}
                      y={centerY + 4}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Special Elite"
                      className="uppercase"
                    >
                      RESILIENCE
                    </text>
                    <text
                      x={centerX}
                      y={centerY + 20}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(0, 0%, 50%)"
                      fontSize="6"
                      fontFamily="Roboto Mono"
                    >
                      Industry • Risk • Outcomes
                    </text>
                  </>
                ) : (
                  <>
                    <text
                      x={centerX}
                      y={centerY - 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Special Elite"
                      className="uppercase"
                    >
                      5-LAYER
                    </text>
                    <text
                      x={centerX}
                      y={centerY + 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Special Elite"
                      className="uppercase"
                    >
                      WHEEL
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Compliance Panel (Below wheel) */}
            <motion.div 
              className="w-full max-w-2xl mt-8 card-glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="font-display text-lg text-white mb-4 flex items-center gap-3">
                <Layers className="w-5 h-5 text-brand-purple" />
                LAYER 5: COMPLIANCE (MULTI-SELECT)
              </h4>
              <div className="flex flex-wrap gap-3">
                {complianceFrameworks.map((framework) => {
                  const isActive = selection.compliance.includes(framework.id);
                  return (
                    <button
                      key={framework.id}
                      onClick={() => toggleCompliance(framework.id)}
                      className={`px-4 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 flex items-center gap-2 border ${
                        isActive
                          ? "bg-brand-purple/20 text-white border-brand-purple"
                          : "bg-card text-muted-foreground border-border hover:text-white hover:border-muted-foreground"
                      }`}
                    >
                      {isActive && <Check className="w-4 h-4" />}
                      {framework.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass rounded-xl p-6 lg:p-8 h-fit lg:sticky lg:top-24"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selection.kube}-${selection.block}-${selection.designation}-${selection.industry}-${selection.compliance.join(",")}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Section 1: Kube (Always shown when selected) */}
                {selectedKube && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: selectedKube.color }}
                      />
                      <h3 className="font-display text-xl text-white uppercase">
                        {selectedKube.name} Kube
                      </h3>
                    </div>
                    <p className="font-mono text-sm text-primary mb-3">{selectedKube.description}</p>
                    <ul className="space-y-1.5">
                      {selectedKube.capabilities.map((cap, i) => (
                        <li key={i} className="font-mono text-xs text-white/70 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 2: Block (Optional) */}
                {selectedBlock && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded bg-brand-blue" />
                      <h4 className="font-display text-lg text-white">
                        {selectedBlock.name}BLOCK – {selectedBlock.label}
                      </h4>
                    </div>
                    <p className="font-mono text-xs text-white/70">{selectedBlock.description}</p>
                    <div className="mt-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="font-mono text-xs text-muted-foreground mb-2">INFRASTRUCTURE STACK</div>
                      <div className="space-y-1 font-mono text-xs text-white/80">
                        <div>• Dell PowerEdge + VxRail HCI</div>
                        <div>• IBM Maximo Asset Management</div>
                        <div>• PowerProtect Cyber Recovery</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3: Scale / Designation */}
                {selectedDesignation && (
                  <div className="pt-4 border-t border-border">
                    <div className="font-mono text-xs text-muted-foreground mb-1">DESIGNATION</div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-muted font-mono text-sm text-white">
                        {selectedDesignation.name}
                      </span>
                      <span className="font-mono text-xs text-white/70">{selectedDesignation.details}</span>
                    </div>
                  </div>
                )}

                {/* Section 4: Industry */}
                {selectedIndustry && (
                  <div className="pt-4 border-t border-border">
                    <div className="font-mono text-xs text-muted-foreground mb-1">INDUSTRY</div>
                    <span className="font-mono text-sm text-primary">{selectedIndustry.name}</span>
                  </div>
                )}

                {/* Section 5: Compliance Stack */}
                {selection.compliance.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="font-mono text-xs text-muted-foreground mb-2">COMPLIANCE STACK</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selection.compliance.map((id) => {
                        const f = complianceFrameworks.find((f) => f.id === id);
                        return (
                          <span
                            key={id}
                            className="px-2 py-1 rounded-full font-mono text-xs text-white bg-brand-purple/30"
                          >
                            {f?.name}
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
                          ${(getEstimatedCost().assessment / 1000).toFixed(1)}K
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">Est. Assessment</div>
                      </div>
                    </div>
                    <div className="mt-3 font-mono text-xs text-white/50">
                      Est. Remediation: ${(getEstimatedCost().monthly / 1000).toFixed(0)}K/mo
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!selectedKube && (
                  <div className="text-center py-8">
                    <div className="font-display text-xl text-white mb-2">SELECT A KUBE</div>
                    <p className="font-mono text-sm text-muted-foreground">
                      Click any cube on the wheel to begin configuring your stack
                    </p>
                  </div>
                )}

                {/* CTAs */}
                {selectedKube && (
                  <div className="space-y-3 pt-6">
                    <Button className="w-full bg-primary hover:bg-primary/90 font-mono text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {getCTAText()}
                    </Button>
                    <Button variant="outline" className="w-full font-mono text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      SCHEDULE CONSULTATION
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
