import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, FileText, Calendar, Box } from "lucide-react";

// Kube data with colors
const kubes = [
  { id: "assessment", name: "Assessment", color: "#10B981", description: "Deployment Maturity Assessment Engine", capabilities: ["Infrastructure Inventory: Servers, storage, network, cloud resources", "Security Assessment: Posture review, vulnerability identification", "Compliance Mapping: Gap analysis against multiple frameworks", "Remediation Roadmap: Prioritized action plan with costs"] },
  { id: "compliance", name: "Compliance", color: "#8B5CF6", description: "Continuous Compliance & GRC Automation", capabilities: ["Gap Remediation Planning: Detailed plan for closing gaps", "Evidence Automation: Continuous monitoring for compliance drift", "Policy Development: Creation of required policy library", "Audit Management: Liaison with auditors for attestation"] },
  { id: "mssp", name: "MSSP", color: "#EF4444", description: "Managed Security Services Platform", capabilities: ["24/7 SOC Monitoring: Threat detection, triage, containment", "Managed EDR/XDR: Endpoint behavioral analysis and response", "Vulnerability Management: Continuous scanning and remediation", "Security Architecture: Zero Trust, network segmentation"] },
  { id: "msp", name: "MSP", color: "#3B82F6", description: "Infrastructure Operations Command Center", capabilities: ["Service Desk: 24/7 or business-hours helpdesk (Tier 1-3)", "Hybrid Infrastructure: Servers, network, storage management", "Managed Workplace: UCaaS, SaaS Ops (M365), UEM/MDM", "BCDR: Disaster Recovery as a Service, backup monitoring"] },
  { id: "advisory", name: "Advisory", color: "#F59E0B", description: "Strategic Technology Leadership", capabilities: ["Virtual CISO: Security governance, risk management", "Virtual CIO: IT strategic planning, technology roadmapping", "Cloud FinOps: Cost optimization, right-sizing", "M&A Due Diligence: IT assessment and integration planning"] },
  { id: "innovation", name: "Innovation", color: "#EC4899", description: "AI & Automation Excellence Center", capabilities: ["Hyperautomation: AI-driven RPA, autonomous agents", "Modern Software Delivery: DevSecOps, CI/CD pipelines", "Data Intelligence: Data modernization, business intelligence", "Custom Development: Application development and APIs"] },
  { id: "industry", name: "Industry", color: "#14B8A6", description: "Vertical-Specific Platform Solutions", capabilities: ["Pre-integrated industry BLOCKs for 9 verticals", "Dell infrastructure + IBM intelligence software", "Validated reference architectures", "Industry-specific compliance mappings"] },
  { id: "partner", name: "Partner", color: "#6366F1", description: "Strategic Alliance Ecosystem", capabilities: ["Dell Technologies: Servers, storage, APEX consumption", "IBM Software: watsonx, Maximo, Cloud Pak portfolio", "Technology Alliances: Cisco, Microsoft, Veeam, CrowdStrike", "Partner Enablement: Certification support"] },
];

// Block data
const blocks = [
  { id: "m2", name: "M2", label: "Manufacturing", description: "Production Excellence - Predictive maintenance, quality control, secure OT/IT convergence" },
  { id: "h2", name: "H2", label: "Healthcare", description: "Clinical Excellence - HIPAA compliance, ransomware immunity, EHR performance" },
  { id: "f2", name: "F2", label: "Financial Services", description: "Mission-Critical Operations - Real-time fraud detection, T+0 regulatory reporting" },
  { id: "r2", name: "R2", label: "Retail", description: "Omnichannel Commerce - Unified fulfillment, store operations, AI personalization" },
  { id: "t2", name: "T2", label: "Transportation", description: "Fleet Intelligence - Real-time visibility, predictive maintenance, logistics optimization" },
  { id: "me2", name: "ME2", label: "Mining", description: "Remote Operations Resilience - OT security, environmental compliance" },
  { id: "eu2", name: "EU2", label: "Energy", description: "Grid Resilience - Renewable integration, NERC-CIP compliance" },
  { id: "ps2", name: "PS2", label: "Public Sector", description: "Citizen Services - FedRAMP compliance, smart city infrastructure" },
  { id: "tc2", name: "TC2", label: "Telecom", description: "Network Transformation - 5G core, edge monetization, network automation" },
];

// Designation data
const designations = [
  { id: "sme", name: "SME", description: "Small Enterprise", details: "1-50 users, single site, $5K-25K/mo" },
  { id: "smb", name: "SMB", description: "Mid-Market", details: "50-500 users, multiple sites, $25K-150K/mo" },
  { id: "ent", name: "ENT", description: "Enterprise", details: "500+ users, global operations, $150K+/mo" },
];

// Industry data
const industries = [
  { id: "manufacturing", name: "Manufacturing" },
  { id: "healthcare", name: "Healthcare" },
  { id: "financial", name: "Financial Services" },
  { id: "retail", name: "Retail" },
  { id: "transportation", name: "Transportation" },
  { id: "mining", name: "Mining & Extraction" },
  { id: "energy", name: "Energy & Utilities" },
  { id: "public", name: "Public Sector" },
  { id: "telecom", name: "Telecommunications" },
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
  industry: string | null;
  compliance: string[];
}

export const RadialConfigurator = () => {
  const [selection, setSelection] = useState<Selection>({
    kube: "assessment", // Default to Assessment Kube active
    block: null,
    designation: null,
    industry: null,
    compliance: [],
  });

  const selectedKube = kubes.find((k) => k.id === selection.kube);
  const selectedBlock = blocks.find((b) => b.id === selection.block);
  const selectedDesignation = designations.find((d) => d.id === selection.designation);
  const selectedIndustry = industries.find((i) => i.id === selection.industry);

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

  // Calculate positions for rings
  const centerX = 200;
  const centerY = 200;
  
  // Ring radii
  const kubeRingRadius = 140;
  const blockRingRadius = 95;
  const designationRingRadius = 60;
  const industryRingRadius = 175;

  return (
    <section className="py-24 lg:py-32 bg-background" id="configurator">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-4"
        >
          RADIAL SERVICE CONFIGURATOR
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-muted-foreground text-center mb-12"
        >
          5-DIMENSIONAL WHEEL: KUBE → BLOCK → DESIGNATION → INDUSTRY → COMPLIANCE
        </motion.p>

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
                  <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(32, 91%, 44%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Ring 4: Industry Ring (Outermost) */}
                <circle cx={centerX} cy={centerY} r={industryRingRadius} fill="none" stroke="hsl(0, 0%, 15%)" strokeWidth="1" strokeDasharray="4 4" />
                {industries.map((industry, index) => {
                  const angle = ((index * 360) / industries.length - 90) * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * industryRingRadius;
                  const y = centerY + Math.sin(angle) * industryRingRadius;
                  const isActive = selection.industry === industry.id;
                  
                  return (
                    <g key={industry.id} className="cursor-pointer" onClick={() => setSelection((prev) => ({ ...prev, industry: industry.id }))}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={isActive ? 14 : 10}
                        fill={isActive ? "hsl(32, 91%, 44%)" : "hsl(0, 0%, 12%)"}
                        stroke={isActive ? "hsl(32, 91%, 54%)" : "hsl(0, 0%, 25%)"}
                        strokeWidth="1"
                        whileHover={{ scale: 1.2 }}
                        animate={{ filter: isActive ? "url(#glow)" : "none" }}
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "white" : "hsl(220, 9%, 63%)"}
                        fontSize="5"
                        fontFamily="Roboto Mono"
                        className="pointer-events-none uppercase"
                      >
                        {industry.name.substring(0, 3)}
                      </text>
                    </g>
                  );
                })}

                {/* Ring 1: Kube Ring (Primary) */}
                <circle cx={centerX} cy={centerY} r={kubeRingRadius} fill="none" stroke="hsl(0, 0%, 20%)" strokeWidth="1" />
                {kubes.map((kube, index) => {
                  const angle = ((index * 360) / kubes.length - 90) * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * kubeRingRadius;
                  const y = centerY + Math.sin(angle) * kubeRingRadius;
                  const isActive = selection.kube === kube.id;
                  
                  return (
                    <g key={kube.id} className="cursor-pointer" onClick={() => setSelection((prev) => ({ ...prev, kube: kube.id }))}>
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
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{ filter: `drop-shadow(0 0 8px ${kube.color})` }}
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
                          x={x - 16}
                          y={y - 16}
                          width="26"
                          height="26"
                          rx="3"
                          fill={isActive ? kube.color : "hsl(0, 0%, 15%)"}
                          opacity={0.4}
                          transform={`translate(6, 6)`}
                        />
                        {/* Cube front face */}
                        <rect
                          x={x - 16}
                          y={y - 16}
                          width="26"
                          height="26"
                          rx="3"
                          fill={isActive ? kube.color : "hsl(0, 0%, 12%)"}
                          stroke={isActive ? kube.color : "hsl(0, 0%, 30%)"}
                          strokeWidth="2"
                          style={{ filter: isActive ? `drop-shadow(0 0 12px ${kube.color})` : "none" }}
                        />
                        {/* Cube icon */}
                        <Box
                          x={x - 8}
                          y={y - 8}
                          width={16}
                          height={16}
                          color={isActive ? "white" : "hsl(220, 9%, 63%)"}
                          className="pointer-events-none"
                        />
                      </motion.g>
                      
                      {/* Kube label */}
                      <text
                        x={x}
                        y={y + 28}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "white" : "hsl(220, 9%, 63%)"}
                        fontSize="8"
                        fontFamily="Roboto Mono"
                        className="pointer-events-none uppercase"
                      >
                        {kube.name}
                      </text>
                    </g>
                  );
                })}

                {/* Ring 2: Block Ring */}
                <circle cx={centerX} cy={centerY} r={blockRingRadius} fill="none" stroke="hsl(0, 0%, 18%)" strokeWidth="1" strokeDasharray="2 2" />
                {blocks.map((block, index) => {
                  const angle = ((index * 360) / blocks.length - 90) * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * blockRingRadius;
                  const y = centerY + Math.sin(angle) * blockRingRadius;
                  const isActive = selection.block === block.id;
                  
                  return (
                    <g key={block.id} className="cursor-pointer" onClick={() => setSelection((prev) => ({ ...prev, block: block.id }))}>
                      <motion.rect
                        x={x - 12}
                        y={y - 8}
                        width="24"
                        height="16"
                        rx="3"
                        fill={isActive ? "hsl(217, 91%, 60%)" : "hsl(0, 0%, 12%)"}
                        stroke={isActive ? "hsl(217, 91%, 70%)" : "hsl(0, 0%, 25%)"}
                        strokeWidth="1"
                        whileHover={{ scale: 1.2 }}
                        animate={{ filter: isActive ? "url(#glow)" : "none" }}
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "white" : "hsl(220, 9%, 50%)"}
                        fontSize="7"
                        fontFamily="Roboto Mono"
                        className="pointer-events-none font-bold"
                      >
                        {block.name}
                      </text>
                    </g>
                  );
                })}

                {/* Ring 3: Designation Ring */}
                <circle cx={centerX} cy={centerY} r={designationRingRadius} fill="none" stroke="hsl(0, 0%, 16%)" strokeWidth="1" />
                {designations.map((des, index) => {
                  const angle = ((index * 360) / designations.length - 90) * (Math.PI / 180);
                  const x = centerX + Math.cos(angle) * designationRingRadius;
                  const y = centerY + Math.sin(angle) * designationRingRadius;
                  const isActive = selection.designation === des.id;
                  
                  return (
                    <g key={des.id} className="cursor-pointer" onClick={() => setSelection((prev) => ({ ...prev, designation: des.id }))}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={isActive ? 16 : 12}
                        fill={isActive ? "hsl(0, 0%, 25%)" : "hsl(0, 0%, 10%)"}
                        stroke={isActive ? "hsl(0, 0%, 50%)" : "hsl(0, 0%, 20%)"}
                        strokeWidth="1"
                        whileHover={{ scale: 1.15 }}
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "white" : "hsl(220, 9%, 50%)"}
                        fontSize="8"
                        fontFamily="Roboto Mono"
                        className="pointer-events-none font-bold"
                      >
                        {des.name}
                      </text>
                    </g>
                  );
                })}

                {/* Center Core */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="35"
                  fill="hsl(0, 0%, 3%)"
                  stroke="url(#coreGradient)"
                  strokeWidth="2"
                  animate={{ 
                    filter: selection.kube ? "drop-shadow(0 0 15px hsl(32, 91%, 44%))" : "none"
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
                  y={centerY + 4}
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
                  fill="hsl(220, 9%, 50%)"
                  fontSize="4"
                  fontFamily="Roboto Mono"
                >
                  Industry • Risk • Outcomes
                </text>
              </svg>
            </div>

            {/* Compliance Panel (Below wheel) */}
            <div className="w-full max-w-lg mt-6 card-glass rounded-xl p-4">
              <h4 className="font-display text-sm text-white mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-purple text-xs flex items-center justify-center text-white">5</span>
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
