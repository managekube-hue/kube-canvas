import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, FileText, Calendar, Box, ChevronRight } from "lucide-react";

// ============================================================================
// KUBE DATA - Exactly per ManageKube documentation
// 8 Kubes: Assessment, Compliance, MSSP, MSP, Advisory, Innovation, Industry, Product
// ============================================================================

// Brand colors using CSS variables for consistency
const BRAND_ACCENT = "hsl(14 100% 60%)"; // Orange accent
const BRAND_BLACK = "hsl(0 0% 4%)";
const BRAND_GRAY = "hsl(0 0% 42%)";

const kubes = [
  {
    id: "assessment",
    name: "Assessment",
    description: "Deployment Maturity Assessment Engine",
    tagline: "The first step in every engagement. We map your current state, document infrastructure, identify security gaps, and build the transformation roadmap.",
    blocks: [
      { id: "infra-inventory", name: "Infrastructure Inventory", description: "Servers, storage, network, cloud resources" },
      { id: "security-assessment", name: "Security Assessment", description: "Posture review, vulnerability identification" },
      { id: "compliance-mapping", name: "Compliance Mapping", description: "Gap analysis against multiple frameworks" },
      { id: "remediation-roadmap", name: "Remediation Roadmap", description: "Prioritized action plan with costs" },
    ]
  },
  {
    id: "compliance",
    name: "Compliance",
    description: "Continuous Compliance & GRC Automation",
    tagline: "We take the gaps identified in Assessment and turn them into a compliance program. SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS.",
    blocks: [
      { id: "gap-remediation", name: "Gap Remediation Planning", description: "Detailed plan for closing technical and policy gaps" },
      { id: "evidence-automation", name: "Evidence Automation", description: "Continuous monitoring for compliance drift" },
      { id: "policy-development", name: "Policy Development", description: "Creation of required policy library" },
      { id: "audit-management", name: "Audit Management", description: "Liaison with auditors for attestation" },
    ]
  },
  {
    id: "mssp",
    name: "MSSP",
    description: "Cyber Defense Managed Services",
    tagline: "Continuous threat detection, response, and cyber risk management. 24/7 SOC operations, MDR, security architecture, and GRC services.",
    blocks: [
      { id: "soc-monitoring", name: "24/7 SOC Monitoring", description: "Threat detection, triage, containment" },
      { id: "managed-edr", name: "Managed EDR/XDR", description: "Endpoint behavioral analysis and response" },
      { id: "vuln-management", name: "Vulnerability Management", description: "Continuous scanning and remediation tracking" },
      { id: "security-arch", name: "Security Architecture (Zero Trust)", description: "Network segmentation, perimeter security" },
    ]
  },
  {
    id: "msp",
    name: "MSP",
    description: "I&O Managed Services",
    tagline: "Fully managed or co-managed infrastructure stack. End-user productivity, hybrid infrastructure, and business continuity from a dedicated NOC.",
    blocks: [
      { id: "service-desk", name: "Service Desk (L1-L3)", description: "24×7 or business-hours helpdesk, incident management" },
      { id: "hybrid-infra", name: "Hybrid Infrastructure", description: "Servers, network, storage, IaaS/PaaS management" },
      { id: "managed-workplace", name: "Managed Workplace (UCaaS/M365/UEM)", description: "UCaaS, CCaaS, SaaS Ops, Unified Endpoint Management" },
      { id: "bcdr", name: "BCDR (DRaaS)", description: "Disaster Recovery as a Service, backup monitoring" },
    ]
  },
  {
    id: "advisory",
    name: "Advisory",
    description: "Strategic Advisory & Physical Layer",
    tagline: "Virtual executive roles (vCIO/vCISO) and expert consulting. Align technology investments with business objectives.",
    blocks: [
      { id: "vciso", name: "Virtual CISO (vCISO)", description: "Security governance, risk management, compliance strategy" },
      { id: "vcio", name: "Virtual CIO (vCIO)", description: "IT strategic planning, technology roadmapping, budget alignment" },
      { id: "finops", name: "Cloud FinOps", description: "Cost optimization, right-sizing, consumption governance" },
      { id: "ma-diligence", name: "M&A Due Diligence", description: "IT assessment and integration planning" },
    ]
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "Innovation & Intelligence Services",
    tagline: "AI-driven automation and modern software delivery. Agentic AI, hyperautomation, and DevSecOps using watsonx, UiPath, and leading platforms.",
    blocks: [
      { id: "hyperautomation", name: "Hyperautomation (RPA/AI Agents)", description: "Software robots and AI agents for process automation" },
      { id: "devsecops", name: "DevSecOps (CI/CD)", description: "CI/CD pipelines, automated testing, security scanning" },
      { id: "data-intelligence", name: "Data Intelligence (watsonx.data)", description: "Data modernization, BI, advanced analytics, ML models" },
      { id: "custom-dev", name: "Custom Development (APIs)", description: "Application development and systems integration" },
    ]
  },
  {
    id: "industry",
    name: "Industry",
    description: "Industry BLOCK Platforms",
    tagline: "Nine pre-integrated platforms combining Dell infrastructure and IBM intelligence software specifically architected for your vertical.",
    blocks: [
      { id: "m2block", name: "M2BLOCK (Manufacturing)", description: "Production Excellence - Predictive maintenance, quality control, OT/IT convergence" },
      { id: "h2block", name: "H2BLOCK (Healthcare)", description: "Clinical Excellence - HIPAA compliance, ransomware immunity, EHR performance" },
      { id: "f2block", name: "F2BLOCK (Financial Services)", description: "Mission-Critical Operations - Fraud detection, T+0 reporting, SOC2/PCI" },
      { id: "r2block", name: "R2BLOCK (Retail)", description: "Omnichannel Commerce - Unified fulfillment, store operations, AI personalization" },
      { id: "t2block", name: "T2BLOCK (Transportation)", description: "Fleet Intelligence - Real-time visibility, logistics optimization" },
      { id: "me2block", name: "ME2BLOCK (Mining/Energy)", description: "Remote Operations Resilience - OT security, environmental compliance" },
      { id: "eu2block", name: "EU2BLOCK (Energy/Utilities)", description: "Grid Resilience - Renewable integration, NERC-CIP compliance" },
      { id: "ps2block", name: "PS2BLOCK (Public Sector)", description: "Citizen Services - FedRAMP compliance, smart city infrastructure" },
      { id: "tc2block", name: "TC2BLOCK (Telecom)", description: "Network Transformation - 5G core, edge monetization, network automation" },
    ]
  },
  {
    id: "product",
    name: "Product",
    description: "Technology Product Ecosystem",
    tagline: "Strategic partnerships with Dell and IBM delivering validated reference architectures and certified expertise.",
    blocks: [
      { id: "infra-hardware", name: "Infrastructure & Hardware", description: "Servers/Storage (PowerEdge/VxRail), Network/Edge (Meraki/PowerSwitch), Endpoints" },
      { id: "managed-workplace-prod", name: "Managed Workplace", description: "UCaaS (Teams/RingCentral/Webex), CCaaS (Genesys/NICE), SaaS Ops (M365/Intune)" },
      { id: "cloud-data", name: "Cloud & Data", description: "IaaS/PaaS (Azure/AWS/GCP), Backup/DR (PowerProtect/Veeam), watsonx.data" },
      { id: "security-impl", name: "Security Implementation", description: "SIEM (QRadar/Sentinel), EDR (CrowdStrike/SentinelOne), ZTNA (Prisma/Zscaler)" },
      { id: "automation-dev", name: "Automation & Development", description: "RPA (UiPath/watsonx Orchestrate), DevSecOps (OpenShift/GitLab), Custom Apps" },
    ]
  },
];

// Designation data - ALL use brand orange for active, gray for inactive
const designations = [
  { id: "sme", name: "SME", description: "Small Enterprise", details: "10-100 users, single site, $5K-15K/mo" },
  { id: "smb", name: "SMB", description: "Mid-Market Standard", details: "100-1000 users, 2-5 sites, $25K-75K/mo" },
  { id: "ent", name: "ENT", description: "Enterprise Global", details: "1000+ users, 10+ sites, $150K-500K+/mo" },
];

// Compliance frameworks
const complianceFrameworks = [
  { id: "nist800", name: "NIST 800-53", controls: 124 },
  { id: "iso27001", name: "ISO 27001:2022", controls: 93 },
  { id: "soc2", name: "SOC 2", controls: 87 },
  { id: "pci", name: "PCI DSS v4.0", controls: 78 },
  { id: "cmmc", name: "CMMC Level 2/3", controls: 110 },
  { id: "hipaa", name: "HIPAA", controls: 45 },
  { id: "fedramp", name: "FedRAMP", controls: 325 },
  { id: "nistcsf", name: "NIST CSF 2.0", controls: 98 },
  { id: "cis", name: "CIS Controls v8.1", controls: 153 },
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
      designation: prev.designation,
      compliance: prev.compliance,
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

  // Ring radii - outer to inner
  const kubeRingRadius = 160;      // Ring 1: Far outer - Kubes (always visible)
  const blockRingRadius = 105;     // Ring 2: Kube-specific blocks (appears after Kube click)
  const designationRingRadius = 55; // Ring 3: SME/SMB/ENT (appears after Kube click)

  // Show inner rings after Kube selection
  const showBlocks = selection.kube !== null;
  const showDesignation = selection.kube !== null;
  // Show compliance after Kube + Block + Designation selected
  const showCompliance = selection.kube !== null && selection.block !== null && selection.designation !== null;

  return (
    <section className="py-24 lg:py-32 section-off-white" id="configurator">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with methodology flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            INTERACTIVE CONFIGURATOR
          </h2>
          <p className="text-body-lg text-muted-foreground mb-6">
            Build your custom engagement
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-4 font-display text-lg sm:text-xl mb-6">
            <span className="text-foreground">ASSESS</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">REMEDIATE</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">MANAGE</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">OPTIMIZE</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Radial Wheel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-xl aspect-square">
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
                    <stop offset="0%" stopColor="hsl(32, 91%, 44%)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Outer ring background */}
                <circle cx={centerX} cy={centerY} r={kubeRingRadius} fill="none" stroke="hsl(0, 0%, 15%)" strokeWidth="1" />

                {/* ================================================================ */}
                {/* RING 1: KUBE RING (Far Outer - Always Visible) */}
                {/* 8 large 3D cube icons with color-coded states */}
                {/* ================================================================ */}
                {kubes.map((kube, index) => {
                  const angle = ((index * 360) / kubes.length - 90) * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * kubeRingRadius;
                  const y = centerY + Math.sin(angle) * kubeRingRadius;
                  const isActive = selection.kube === kube.id;

                  return (
                    <g key={kube.id} className="cursor-pointer" onClick={() => handleKubeClick(kube.id)}>
                      {/* Connection line from Kube to center when active */}
                      {isActive && (
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          x2={x}
                          y2={y}
                          stroke={BRAND_ACCENT}
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{ filter: `drop-shadow(0 0 10px ${BRAND_ACCENT})` }}
                        />
                      )}

                      {/* 3D Cube representation */}
                      <motion.g
                        whileHover={{ scale: 1.15 }}
                        animate={{ scale: isActive ? 1.1 : 1 }}
                      >
                        {/* Cube back face (3D effect) */}
                        <rect
                          x={x - 18}
                          y={y - 18}
                          width="32"
                          height="32"
                          rx="4"
                          fill={isActive ? BRAND_ACCENT : "hsl(0, 0%, 90%)"}
                          opacity={0.4}
                          transform="translate(4, 4)"
                        />
                        {/* Cube front face */}
                        <rect
                          x={x - 18}
                          y={y - 18}
                          width="32"
                          height="32"
                          rx="4"
                          fill={isActive ? BRAND_ACCENT : "hsl(0, 0%, 100%)"}
                          stroke={isActive ? BRAND_ACCENT : "hsl(0, 0%, 80%)"}
                          strokeWidth="2"
                          style={{ filter: isActive ? `drop-shadow(0 0 15px ${BRAND_ACCENT})` : "none" }}
                        />
                        {/* Box icon inside cube */}
                        <Box
                          x={x - 10}
                          y={y - 10}
                          width={20}
                          height={20}
                          color={isActive ? "white" : "hsl(0, 0%, 42%)"}
                          className="pointer-events-none"
                        />
                      </motion.g>

                      {/* Kube label */}
                      <text
                        x={x}
                        y={y + 32}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? BRAND_BLACK : "hsl(0, 0%, 42%)"}
                        fontSize="9"
                        fontFamily="Roboto Mono"
                        className="pointer-events-none uppercase font-medium"
                      >
                        {kube.name}
                      </text>
                    </g>
                  );
                })}

                {/* ================================================================ */}
                {/* RING 2: BLOCK RING (Kube-specific - appears after Kube click) */}
                {/* Shows blocks associated with the selected Kube */}
                {/* ================================================================ */}
                <AnimatePresence>
                  {showBlocks && selectedKube && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.4 }}
                    >
                      <circle cx={centerX} cy={centerY} r={blockRingRadius} fill="none" stroke="hsl(0, 0%, 80%)" strokeWidth="1" strokeDasharray="4 4" />
                      {selectedKube.blocks.map((block, index) => {
                        const angle = ((index * 360) / selectedKube.blocks.length - 90) * (Math.PI / 180);
                        const x = centerX + Math.cos(angle) * blockRingRadius;
                        const y = centerY + Math.sin(angle) * blockRingRadius;
                        const isActive = selection.block === block.id;

                        // Draw connection line from Block to Kube when selected
                        const kubeIndex = kubes.findIndex(k => k.id === selection.kube);
                        const kubeAngle = ((kubeIndex * 360) / kubes.length - 90) * (Math.PI / 180);
                        const kubeX = centerX + Math.cos(kubeAngle) * kubeRingRadius;
                        const kubeY = centerY + Math.sin(kubeAngle) * kubeRingRadius;

                        return (
                          <g key={block.id}>
                            {/* Connection line from Block to Kube */}
                            {isActive && (
                              <motion.line
                                x1={x}
                                y1={y}
                                x2={kubeX}
                                y2={kubeY}
                                stroke={BRAND_ACCENT}
                                strokeWidth="1.5"
                                strokeDasharray="4 3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ filter: `drop-shadow(0 0 8px ${BRAND_ACCENT})` }}
                              />
                            )}
                            <g className="cursor-pointer" onClick={() => setSelection(prev => ({ ...prev, block: block.id }))}>
                              <motion.rect
                                x={x - 16}
                                y={y - 12}
                                width="32"
                                height="24"
                                rx="4"
                                fill={isActive ? BRAND_ACCENT : "hsl(0, 0%, 96%)"}
                                stroke={isActive ? BRAND_ACCENT : "hsl(0, 0%, 80%)"}
                                strokeWidth="1.5"
                                whileHover={{ scale: 1.15 }}
                                style={{ filter: isActive ? `drop-shadow(0 0 12px ${BRAND_ACCENT})` : "none" }}
                              />
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={isActive ? "white" : "hsl(0, 0%, 42%)"}
                                fontSize="6"
                                fontFamily="Roboto Mono"
                                className="pointer-events-none"
                              >
                                {block.name.length > 12 ? block.name.substring(0, 12) + "..." : block.name}
                              </text>
                            </g>
                          </g>
                        );
                      })}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* ================================================================ */}
                {/* RING 3: DESIGNATION RING (SME/SMB/ENT - appears after Kube click) */}
                {/* ================================================================ */}
                <AnimatePresence>
                  {showDesignation && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <circle cx={centerX} cy={centerY} r={designationRingRadius} fill="none" stroke="hsl(0, 0%, 80%)" strokeWidth="1" />
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
                              r={isActive ? 20 : 16}
                              fill={isActive ? BRAND_ACCENT : "hsl(0, 0%, 100%)"}
                              stroke={isActive ? BRAND_ACCENT : "hsl(0, 0%, 80%)"}
                              strokeWidth="2"
                              whileHover={{ scale: 1.15 }}
                              style={{ filter: isActive ? `drop-shadow(0 0 14px ${BRAND_ACCENT})` : "none" }}
                            />
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={isActive ? "white" : "hsl(0, 0%, 42%)"}
                              fontSize="10"
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

                {/* ================================================================ */}
                {/* CENTER CORE: "DIGITAL RESILIENCE" */}
                {/* ================================================================ */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="30"
                  fill={BRAND_BLACK}
                  stroke="url(#coreGradient)"
                  strokeWidth="2"
                  animate={{
                    filter: selection.kube ? `drop-shadow(0 0 20px ${BRAND_ACCENT})` : "none"
                  }}
                />
                <text
                  x={centerX}
                  y={centerY - 6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="7"
                  fontFamily="Special Elite"
                  className="uppercase"
                >
                  DIGITAL
                </text>
                <text
                  x={centerX}
                  y={centerY + 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="7"
                  fontFamily="Special Elite"
                  className="uppercase"
                >
                  RESILIENCE
                </text>
                <text
                  x={centerX}
                  y={centerY + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(0, 0%, 70%)"
                  fontSize="3.5"
                  fontFamily="Roboto Mono"
                >
                  Industry • Risk • Outcomes
                </text>
              </svg>
            </div>

            {/* ================================================================ */}
            {/* COMPLIANCE PANEL (Below wheel - appears after Kube + Block + Designation) */}
            {/* ================================================================ */}
            <AnimatePresence>
              {showCompliance && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-xl mt-6 card-enterprise p-4"
                >
                  <h4 className="font-display text-sm text-foreground mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-foreground text-xs flex items-center justify-center text-background">4</span>
                    COMPLIANCE FRAMEWORKS (Multi-Select)
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
                              ? "bg-foreground text-background"
                              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
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
            <div className="w-full max-w-xl mt-4">
              <div className="flex items-center justify-center gap-1 text-xs font-mono">
                <span className={`px-2 py-1 rounded ${selection.kube ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                  1. Kube {selection.kube ? "✓" : "○"}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={`px-2 py-1 rounded ${selection.block ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                  2. Block {selection.block ? "✓" : "○"}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={`px-2 py-1 rounded ${selection.designation ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                  3. Scale {selection.designation ? "✓" : "○"}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className={`px-2 py-1 rounded ${selection.compliance.length > 0 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                  4. Compliance {selection.compliance.length > 0 ? "✓" : "○"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ================================================================ */}
          {/* RIGHT PANEL: Info Panel */}
          {/* Always shows: Active Kube → Active Block → Scale → BOM */}
          {/* ================================================================ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-enterprise h-fit lg:sticky lg:top-24"
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
                {/* Section 1: Active Kube */}
                {selectedKube && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded bg-foreground" />
                      <h3 className="font-display text-xl text-foreground uppercase">
                        {selectedKube.name} Kube
                      </h3>
                    </div>
                    <p className="font-mono text-sm text-muted-foreground mb-2">{selectedKube.description}</p>
                    <p className="font-mono text-xs text-muted-foreground">{selectedKube.tagline}</p>

                    {/* Nested Blocks List */}
                    <div className="mt-4 space-y-2">
                      <div className="font-mono text-xs text-muted-foreground mb-2 uppercase">Blocks in this Kube</div>
                      {selectedKube.blocks.map((block) => {
                        const isActive = selection.block === block.id;
                        return (
                          <div
                            key={block.id}
                            onClick={() => setSelection(prev => ({ ...prev, block: block.id }))}
                            className={`p-3 cursor-pointer transition-all duration-200 border ${
                              isActive
                                ? "bg-foreground text-background border-foreground"
                                : "bg-muted border-border hover:border-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isActive ? "bg-background" : "bg-muted-foreground"}`} />
                              <span className={`font-mono text-sm ${isActive ? "text-background" : "text-foreground"}`}>
                                {block.name}
                              </span>
                            </div>
                            {isActive && (
                              <p className="font-mono text-xs text-background/70 mt-1 ml-4">
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
                    <div className="font-mono text-xs text-muted-foreground mb-2 uppercase">Scale / Designation</div>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 font-mono text-sm text-background font-bold bg-foreground">
                        {selectedDesignation.name}
                      </span>
                      <div>
                        <div className="font-mono text-sm text-foreground">{selectedDesignation.description}</div>
                        <div className="font-mono text-xs text-muted-foreground">{selectedDesignation.details}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3: Compliance Stack */}
                {selection.compliance.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="font-mono text-xs text-muted-foreground mb-2 uppercase">Compliance Stack</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selection.compliance.map((id) => {
                        const f = complianceFrameworks.find((f) => f.id === id);
                        return (
                          <span
                            key={id}
                            className="px-2 py-1 font-mono text-xs text-background bg-foreground"
                          >
                            {f?.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted p-3">
                        <div className="font-display text-2xl text-foreground">{getTotalControls()}</div>
                        <div className="font-mono text-xs text-muted-foreground">Total Controls</div>
                      </div>
                      <div className="bg-muted p-3">
                        <div className="font-display text-2xl text-foreground">
                          ${(getEstimatedCost().assessment / 1000).toFixed(1)}K
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">Est. Assessment</div>
                      </div>
                    </div>
                    <div className="mt-3 font-mono text-xs text-muted-foreground">
                      Est. Remediation: ${(getEstimatedCost().monthly / 1000).toFixed(0)}K/mo
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!selectedKube && (
                  <div className="text-center py-12">
                    <Box className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <div className="font-display text-xl text-foreground mb-2">SELECT A KUBE</div>
                    <p className="font-mono text-sm text-muted-foreground">
                      Click any cube on the outer ring to begin building your stack
                    </p>
                  </div>
                )}

                {/* CTAs */}
                {selectedKube && (
                  <div className="space-y-3 pt-6">
                    <Button className="w-full btn-primary font-mono text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {getCTAText()}
                    </Button>
                    <Button variant="outline" className="w-full btn-secondary font-mono text-sm">
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
