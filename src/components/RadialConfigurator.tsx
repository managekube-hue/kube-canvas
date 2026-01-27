import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, FileText, Calendar, Box, ChevronRight } from "lucide-react";

// Kube data with colors and nested blocks
const kubes = [
  { 
    id: "assessment", 
    name: "Assessment", 
    color: "#10B981", 
    description: "Deployment Maturity Assessment Engine",
    blocks: [
      { id: "infra-inventory", name: "Infrastructure Inventory", description: "Servers, storage, network, cloud resources" },
      { id: "security-assess", name: "Security Assessment", description: "Posture review, vulnerability identification" },
      { id: "compliance-map", name: "Compliance Mapping", description: "Gap analysis against multiple frameworks" },
      { id: "remediation-road", name: "Remediation Roadmap", description: "Prioritized action plan with costs" },
    ]
  },
  { 
    id: "compliance", 
    name: "Compliance", 
    color: "#8B5CF6", 
    description: "Continuous Compliance & GRC Automation",
    blocks: [
      { id: "gap-remediation", name: "Gap Remediation Planning", description: "Detailed plan for closing technical and policy gaps" },
      { id: "evidence-auto", name: "Evidence Automation", description: "Continuous monitoring for compliance drift" },
      { id: "policy-dev", name: "Policy Development", description: "Creation of required policy library" },
      { id: "audit-mgmt", name: "Audit Management", description: "Liaison with auditors for attestation" },
    ]
  },
  { 
    id: "mssp", 
    name: "MSSP", 
    color: "#EF4444", 
    description: "Managed Security Services Platform",
    blocks: [
      { id: "soc-monitoring", name: "24/7 SOC Monitoring", description: "Threat detection, triage, containment" },
      { id: "managed-edr", name: "Managed EDR/XDR", description: "Endpoint behavioral analysis and response" },
      { id: "vuln-mgmt", name: "Vulnerability Management", description: "Continuous scanning and remediation tracking" },
      { id: "security-arch", name: "Security Architecture", description: "Zero Trust, network segmentation, perimeter security" },
    ]
  },
  { 
    id: "msp", 
    name: "MSP", 
    color: "#3B82F6", 
    description: "Infrastructure Operations Command Center",
    blocks: [
      { id: "service-desk", name: "Service Desk (L1-L3)", description: "24/7 or business-hours helpdesk, incident management" },
      { id: "hybrid-infra", name: "Hybrid Infrastructure", description: "Servers, network, storage management" },
      { id: "managed-workplace", name: "Managed Workplace", description: "UCaaS, SaaS Ops (M365), UEM/MDM" },
      { id: "bcdr", name: "BCDR (DRaaS)", description: "Disaster Recovery as a Service, backup monitoring" },
    ]
  },
  { 
    id: "advisory", 
    name: "Advisory", 
    color: "#F59E0B", 
    description: "Strategic Technology Leadership",
    blocks: [
      { id: "vciso", name: "Virtual CISO (vCISO)", description: "Security governance, risk management, compliance strategy" },
      { id: "vcio", name: "Virtual CIO (vCIO)", description: "IT strategic planning, technology roadmapping" },
      { id: "finops", name: "Cloud FinOps", description: "Cost optimization, right-sizing, consumption governance" },
      { id: "ma-diligence", name: "M&A Due Diligence", description: "IT assessment and integration planning" },
    ]
  },
  { 
    id: "innovation", 
    name: "Innovation", 
    color: "#EC4899", 
    description: "AI & Automation Excellence Center",
    blocks: [
      { id: "hyperauto", name: "Hyperautomation", description: "AI-driven RPA, autonomous agents, process optimization" },
      { id: "devsecops", name: "DevSecOps (CI/CD)", description: "Modern software delivery, CI/CD pipelines" },
      { id: "data-intel", name: "Data Intelligence", description: "Data modernization, watsonx.data, business intelligence" },
      { id: "custom-dev", name: "Custom Development", description: "Application development and API integrations" },
    ]
  },
  { 
    id: "industry", 
    name: "Industry", 
    color: "#14B8A6", 
    description: "Vertical-Specific Platform Solutions",
    blocks: [
      { id: "m2block", name: "M2BLOCK", description: "Manufacturing - Predictive maintenance, quality control, OT/IT" },
      { id: "h2block", name: "H2BLOCK", description: "Healthcare - HIPAA compliance, ransomware immunity, EHR" },
      { id: "f2block", name: "F2BLOCK", description: "Financial Services - Fraud detection, T+0 reporting, SOC2/PCI" },
      { id: "r2block", name: "R2BLOCK", description: "Retail - Omnichannel fulfillment, AI personalization" },
      { id: "t2block", name: "T2BLOCK", description: "Transportation - Fleet visibility, logistics optimization" },
      { id: "me2block", name: "ME2BLOCK", description: "Mining/Energy - Remote ops, OT security, environmental" },
      { id: "eu2block", name: "EU2BLOCK", description: "Energy/Utilities - Grid resilience, NERC-CIP compliance" },
      { id: "ps2block", name: "PS2BLOCK", description: "Public Sector - FedRAMP, smart city infrastructure" },
      { id: "tc2block", name: "TC2BLOCK", description: "Telecom - 5G core, edge monetization, network automation" },
    ]
  },
  { 
    id: "product", 
    name: "Product", 
    color: "#6366F1", 
    description: "Technology Product Ecosystem",
    blocks: [
      { id: "infra-hardware", name: "Infrastructure & Hardware", description: "PowerEdge, VxRail, Meraki, PowerSwitch, Endpoints" },
      { id: "managed-workplace-prod", name: "Managed Workplace", description: "UCaaS (Teams/RingCentral), CCaaS (Genesys), SaaS Ops" },
      { id: "cloud-data", name: "Cloud & Data", description: "IaaS/PaaS (Azure/AWS/GCP), Backup/DR, watsonx.data" },
      { id: "security-impl", name: "Security Implementation", description: "SIEM (QRadar), EDR (CrowdStrike), ZTNA (Prisma/Zscaler)" },
      { id: "auto-dev", name: "Automation & Development", description: "RPA (UiPath), DevSecOps (OpenShift), Custom Apps" },
    ]
  },
];

// Designation data
const designations = [
  { id: "sme", name: "SME", description: "Small Enterprise", details: "1-50 users, single site, $5K-25K/mo", color: "#9CA3AF" },
  { id: "smb", name: "SMB", description: "Mid-Market", details: "50-500 users, multiple sites, $25K-150K/mo", color: "#3B82F6" },
  { id: "ent", name: "ENT", description: "Enterprise", details: "500+ users, global operations, $150K+/mo", color: "#D97706" },
];

// Compliance frameworks
const complianceFrameworks = [
  { id: "nist800", name: "NIST 800-53", controls: 124 },
  { id: "iso27001", name: "ISO 27001", controls: 93 },
  { id: "soc2", name: "SOC 2", controls: 87 },
  { id: "pci", name: "PCI DSS", controls: 78 },
  { id: "cmmc", name: "CMMC", controls: 110 },
  { id: "hipaa", name: "HIPAA", controls: 45 },
  { id: "fedramp", name: "FedRAMP", controls: 325 },
  { id: "nistcsf", name: "NIST CSF", controls: 98 },
  { id: "cis", name: "CIS v8", controls: 153 },
  { id: "fips", name: "FIPS 140-2/3", controls: 42 },
];

interface Selection {
  kube: string | null;
  block: string | null;
  designation: string | null;
  compliance: string[];
}

export const RadialConfigurator = () => {
  const [selection, setSelection] = useState<Selection>({
    kube: null,
    block: null,
    designation: null,
    compliance: [],
  });

  const selectedKube = kubes.find((k) => k.id === selection.kube);
  const selectedBlock = selectedKube?.blocks.find((b) => b.id === selection.block);
  const selectedDesignation = designations.find((d) => d.id === selection.designation);

  const getTotalControls = () => {
    return selection.compliance.reduce((acc, id) => {
      const framework = complianceFrameworks.find((f) => f.id === id);
      return acc + (framework?.controls || 0);
    }, 0);
  };

  const getEstimatedCost = () => {
    const baseAssessment = 7500;
    const controlCost = getTotalControls() * 100;
    const designationMultiplier = selection.designation === "ent" ? 3 : selection.designation === "smb" ? 1.5 : 1;
    return { 
      assessment: (baseAssessment + selection.compliance.length * 1500) * designationMultiplier, 
      monthly: Math.round((controlCost / 12) + 5000) * designationMultiplier 
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

  const handleKubeClick = (kubeId: string) => {
    setSelection((prev) => ({
      kube: kubeId,
      block: null,
      designation: prev.designation, // Keep designation
      compliance: prev.compliance, // Keep compliance
    }));
  };

  const getCTAText = () => {
    if (!selection.kube) return "SELECT A KUBE TO BEGIN";
    if (selection.compliance.length > 0 && selection.block && selection.designation) {
      return "GENERATE ASSESSMENT SCOPE (PDF)";
    }
    return `START ${selectedKube?.name.toUpperCase()} ASSESSMENT`;
  };

  // Calculate positions for rings
  const centerX = 200;
  const centerY = 200;
  
  // Ring radii
  const kubeRingRadius = 155;
  const blockRingRadius = 100;
  const designationRingRadius = 50;

  // Check if we should show inner rings
  const showBlocks = selection.kube !== null;
  const showDesignation = selection.kube !== null;
  const showCompliance = selection.kube !== null && selection.block !== null && selection.designation !== null;

  return (
    <section className="py-24 lg:py-32 bg-background" id="configurator">
      <div className="container mx-auto px-4">
        {/* Header with methodology flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            THE MANAGEKUBE METHODOLOGY
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4 font-display text-lg sm:text-xl text-muted-foreground mb-6">
            <span className="text-brand-success">ASSESS</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="text-brand-blue">REMEDIATE</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="text-primary">MANAGE</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="text-brand-purple">OPTIMIZE</span>
          </div>
          <p className="font-mono text-sm text-muted-foreground max-w-2xl mx-auto">
            Click a Kube → Select a Block → Choose Scale → Add Compliance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Radial Wheel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(32, 91%, 44%)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Outer ring background */}
                <circle cx={centerX} cy={centerY} r={kubeRingRadius} fill="none" stroke="hsl(0, 0%, 15%)" strokeWidth="1" />

                {/* Ring 1: Kube Ring (Outermost - always visible) */}
                {kubes.map((kube, index) => {
                  const angle = ((index * 360) / kubes.length - 90) * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * kubeRingRadius;
                  const y = centerY + Math.sin(angle) * kubeRingRadius;
                  const isActive = selection.kube === kube.id;
                  
                  return (
                    <g key={kube.id} className="cursor-pointer" onClick={() => handleKubeClick(kube.id)}>
                      {/* Connection line to center when active */}
                      {isActive && (
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          x2={x}
                          y2={y}
                          stroke={kube.color}
                          strokeWidth="2"
                          strokeDasharray="5 5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{ filter: `drop-shadow(0 0 10px ${kube.color})` }}
                        />
                      )}
                      
                      {/* 3D Cube representation */}
                      <motion.g
                        whileHover={{ scale: 1.15 }}
                        animate={{ 
                          scale: isActive ? 1.1 : 1,
                        }}
                      >
                        {/* Cube back face */}
                        <rect
                          x={x - 18}
                          y={y - 18}
                          width="30"
                          height="30"
                          rx="4"
                          fill={isActive ? kube.color : "hsl(0, 0%, 15%)"}
                          opacity={0.4}
                          transform="translate(5, 5)"
                        />
                        {/* Cube front face */}
                        <rect
                          x={x - 18}
                          y={y - 18}
                          width="30"
                          height="30"
                          rx="4"
                          fill={isActive ? kube.color : "hsl(0, 0%, 10%)"}
                          stroke={isActive ? kube.color : "hsl(0, 0%, 25%)"}
                          strokeWidth="2"
                          style={{ filter: isActive ? `drop-shadow(0 0 15px ${kube.color})` : "none" }}
                        />
                        {/* Box icon */}
                        <Box
                          x={x - 9}
                          y={y - 9}
                          width={18}
                          height={18}
                          color={isActive ? "white" : "hsl(220, 9%, 50%)"}
                          className="pointer-events-none"
                        />
                      </motion.g>
                      
                      {/* Kube label */}
                      <text
                        x={x}
                        y={y + 30}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "white" : "hsl(220, 9%, 50%)"}
                        fontSize="9"
                        fontFamily="Roboto Mono"
                        className="pointer-events-none uppercase font-medium"
                      >
                        {kube.name}
                      </text>
                    </g>
                  );
                })}

                {/* Ring 2: Block Ring (Kube-specific - appears after Kube selection) */}
                <AnimatePresence>
                  {showBlocks && selectedKube && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <circle cx={centerX} cy={centerY} r={blockRingRadius} fill="none" stroke="hsl(0, 0%, 20%)" strokeWidth="1" strokeDasharray="3 3" />
                      {selectedKube.blocks.map((block, index) => {
                        const angle = ((index * 360) / selectedKube.blocks.length - 90) * (Math.PI / 180);
                        const x = centerX + Math.cos(angle) * blockRingRadius;
                        const y = centerY + Math.sin(angle) * blockRingRadius;
                        const isActive = selection.block === block.id;
                        
                        // Draw line from block to active kube when block is selected
                        const kubeIndex = kubes.findIndex(k => k.id === selection.kube);
                        const kubeAngle = ((kubeIndex * 360) / kubes.length - 90) * (Math.PI / 180);
                        const kubeX = centerX + Math.cos(kubeAngle) * kubeRingRadius;
                        const kubeY = centerY + Math.sin(kubeAngle) * kubeRingRadius;
                        
                        return (
                          <g key={block.id}>
                            {isActive && (
                              <motion.line
                                x1={x}
                                y1={y}
                                x2={kubeX}
                                y2={kubeY}
                                stroke="#D97706"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ filter: "drop-shadow(0 0 6px #D97706)" }}
                              />
                            )}
                            <g className="cursor-pointer" onClick={() => setSelection(prev => ({ ...prev, block: block.id }))}>
                              <motion.rect
                                x={x - 14}
                                y={y - 10}
                                width="28"
                                height="20"
                                rx="4"
                                fill={isActive ? "#D97706" : "hsl(0, 0%, 12%)"}
                                stroke={isActive ? "#F59E0B" : "hsl(0, 0%, 30%)"}
                                strokeWidth="1.5"
                                whileHover={{ scale: 1.15 }}
                                style={{ filter: isActive ? "drop-shadow(0 0 10px #D97706)" : "none" }}
                              />
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={isActive ? "white" : "hsl(220, 9%, 60%)"}
                                fontSize="6"
                                fontFamily="Roboto Mono"
                                className="pointer-events-none"
                              >
                                {block.name.length > 10 ? block.name.substring(0, 10) + "..." : block.name}
                              </text>
                            </g>
                          </g>
                        );
                      })}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Ring 3: Designation Ring (SME/SMB/ENT - appears after Kube selection) */}
                <AnimatePresence>
                  {showDesignation && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <circle cx={centerX} cy={centerY} r={designationRingRadius} fill="none" stroke="hsl(0, 0%, 18%)" strokeWidth="1" />
                      {designations.map((des, index) => {
                        const angle = ((index * 360) / designations.length - 90) * (Math.PI / 180);
                        const x = centerX + Math.cos(angle) * designationRingRadius;
                        const y = centerY + Math.sin(angle) * designationRingRadius;
                        const isActive = selection.designation === des.id;
                        
                        return (
                          <g key={des.id} className="cursor-pointer" onClick={() => setSelection(prev => ({ ...prev, designation: des.id }))}>
                            <motion.circle
                              cx={x}
                              cy={y}
                              r={isActive ? 18 : 14}
                              fill={isActive ? des.color : "hsl(0, 0%, 10%)"}
                              stroke={isActive ? des.color : "hsl(0, 0%, 25%)"}
                              strokeWidth="2"
                              whileHover={{ scale: 1.15 }}
                              style={{ filter: isActive ? `drop-shadow(0 0 12px ${des.color})` : "none" }}
                            />
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={isActive ? "white" : "hsl(220, 9%, 60%)"}
                              fontSize="9"
                              fontFamily="Roboto Mono"
                              className="pointer-events-none font-bold"
                            >
                              {des.name}
                            </text>
                          </g>
                        );
                      })}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Center Core */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="28"
                  fill="hsl(0, 0%, 3%)"
                  stroke="url(#coreGradient)"
                  strokeWidth="2"
                  animate={{ 
                    filter: selection.kube ? "drop-shadow(0 0 20px hsl(32, 91%, 44%))" : "none"
                  }}
                />
                <text
                  x={centerX}
                  y={centerY - 6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="6"
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
                  fontSize="6"
                  fontFamily="Special Elite"
                  className="uppercase"
                >
                  RESILIENCE
                </text>
                <text
                  x={centerX}
                  y={centerY + 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(220, 9%, 50%)"
                  fontSize="3.5"
                  fontFamily="Roboto Mono"
                >
                  Industry • Risk • Outcomes
                </text>
              </svg>
            </div>

            {/* Compliance Panel (Below wheel - appears after full selection) */}
            <AnimatePresence>
              {showCompliance && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-lg mt-6 card-glass rounded-xl p-4"
                >
                  <h4 className="font-display text-sm text-white mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-purple text-xs flex items-center justify-center text-white">4</span>
                    COMPLIANCE FRAMEWORKS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {complianceFrameworks.map((framework) => {
                      const isActive = selection.compliance.includes(framework.id);
                      return (
                        <button
                          key={framework.id}
                          onClick={() => toggleCompliance(framework.id)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 flex items-center gap-1.5 ${
                            isActive
                              ? "bg-brand-purple/20 text-white ring-1 ring-brand-purple"
                              : "bg-secondary text-muted-foreground hover:text-white hover:bg-secondary/80"
                          }`}
                        >
                          {isActive && <Check className="w-3 h-3" />}
                          {framework.name}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selection State Indicator */}
            <div className="w-full max-w-lg mt-4">
              <div className="flex items-center justify-center gap-1 text-xs font-mono">
                <span className={`px-2 py-1 rounded ${selection.kube ? "bg-brand-success/20 text-brand-success" : "bg-secondary text-muted-foreground"}`}>
                  Kube {selection.kube ? "✓" : "○"}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={`px-2 py-1 rounded ${selection.block ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  Block {selection.block ? "✓" : "○"}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={`px-2 py-1 rounded ${selection.designation ? "bg-brand-blue/20 text-brand-blue" : "bg-secondary text-muted-foreground"}`}>
                  Scale {selection.designation ? "✓" : "○"}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={`px-2 py-1 rounded ${selection.compliance.length > 0 ? "bg-brand-purple/20 text-brand-purple" : "bg-secondary text-muted-foreground"}`}>
                  Compliance {selection.compliance.length > 0 ? "✓" : "○"}
                </span>
              </div>
            </div>
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
                key={`${selection.kube}-${selection.block}-${selection.designation}-${selection.compliance.join(",")}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
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
                    <p className="font-mono text-sm text-primary mb-4">{selectedKube.description}</p>
                    
                    {/* Nested Blocks List */}
                    <div className="space-y-2">
                      <div className="font-mono text-xs text-muted-foreground mb-2">AVAILABLE BLOCKS</div>
                      {selectedKube.blocks.map((block) => {
                        const isActive = selection.block === block.id;
                        return (
                          <div
                            key={block.id}
                            onClick={() => setSelection(prev => ({ ...prev, block: block.id }))}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isActive 
                                ? "bg-primary/20 ring-1 ring-primary" 
                                : "bg-secondary/50 hover:bg-secondary/80"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isActive ? "bg-primary" : "bg-muted-foreground"}`} />
                              <span className={`font-mono text-sm ${isActive ? "text-white" : "text-white/70"}`}>
                                {block.name}
                              </span>
                            </div>
                            {isActive && (
                              <p className="font-mono text-xs text-muted-foreground mt-1 ml-4">
                                {block.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Section 2: Scale / Designation */}
                {selectedDesignation && (
                  <div className="pt-4 border-t border-border">
                    <div className="font-mono text-xs text-muted-foreground mb-2">SCALE / DESIGNATION</div>
                    <div className="flex items-center gap-3">
                      <span 
                        className="px-4 py-2 rounded-full font-mono text-sm text-white font-bold"
                        style={{ backgroundColor: selectedDesignation.color }}
                      >
                        {selectedDesignation.name}
                      </span>
                      <span className="font-mono text-xs text-white/70">{selectedDesignation.details}</span>
                    </div>
                  </div>
                )}

                {/* Section 3: Compliance Stack */}
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
                  <div className="text-center py-12">
                    <Box className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <div className="font-display text-xl text-white mb-2">SELECT A KUBE</div>
                    <p className="font-mono text-sm text-muted-foreground">
                      Click any cube on the outer ring to begin configuring your stack
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
