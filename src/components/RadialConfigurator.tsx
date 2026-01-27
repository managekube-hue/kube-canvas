import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, FileText, Calendar, Box, Server, Phone, Cloud, Shield, Cpu, ChevronRight } from "lucide-react";

// Kube data with colors - PRODUCT replaces PARTNER
const kubes = [
  { id: "assessment", name: "Assessment", color: "#10B981", description: "Deployment Maturity Assessment Engine", capabilities: ["Infrastructure Inventory: Servers, storage, network, cloud resources", "Security Assessment: Posture review, vulnerability identification", "Compliance Mapping: Gap analysis against multiple frameworks", "Remediation Roadmap: Prioritized action plan with costs"] },
  { id: "compliance", name: "Compliance", color: "#8B5CF6", description: "Continuous Compliance & GRC Automation", capabilities: ["Gap Remediation Planning: Detailed plan for closing gaps", "Evidence Automation: Continuous monitoring for compliance drift", "Policy Development: Creation of required policy library", "Audit Management: Liaison with auditors for attestation"] },
  { id: "mssp", name: "MSSP", color: "#EF4444", description: "Managed Security Services Platform", capabilities: ["24/7 SOC Monitoring: Threat detection, triage, containment", "Managed EDR/XDR: Endpoint behavioral analysis and response", "Vulnerability Management: Continuous scanning and remediation", "Security Architecture: Zero Trust, network segmentation"] },
  { id: "msp", name: "MSP", color: "#3B82F6", description: "Infrastructure Operations Command Center", capabilities: ["Service Desk: 24/7 or business-hours helpdesk (Tier 1-3)", "Hybrid Infrastructure: Servers, network, storage management", "Managed Workplace: UCaaS, SaaS Ops (M365), UEM/MDM", "BCDR: Disaster Recovery as a Service, backup monitoring"] },
  { id: "advisory", name: "Advisory", color: "#F59E0B", description: "Strategic Technology Leadership", capabilities: ["Virtual CISO: Security governance, risk management", "Virtual CIO: IT strategic planning, technology roadmapping", "Cloud FinOps: Cost optimization, right-sizing", "M&A Due Diligence: IT assessment and integration planning"] },
  { id: "innovation", name: "Innovation", color: "#EC4899", description: "AI & Automation Excellence Center", capabilities: ["Hyperautomation: AI-driven RPA, autonomous agents", "Modern Software Delivery: DevSecOps, CI/CD pipelines", "Data Intelligence: Data modernization, business intelligence", "Custom Development: Application development and APIs"] },
  { id: "industry", name: "Industry", color: "#14B8A6", description: "Vertical-Specific Platform Solutions", capabilities: ["Pre-integrated industry BLOCKs for 9 verticals", "Dell infrastructure + IBM intelligence software", "Validated reference architectures", "Industry-specific compliance mappings"] },
  { id: "product", name: "Product", color: "#6366F1", description: "Technology Procurement & Project Implementation", capabilities: ["Hardware & Infrastructure: Servers, storage, endpoints", "Managed Workplace: UCaaS, CCaaS, M365, UEM", "Cloud & Data: IaaS/PaaS, backup, data platforms", "Security Implementation: SIEM, EDR, ZTNA, email security"] },
];

// Product Kube Service Categories
const productCategories = [
  { 
    id: "infrastructure", 
    name: "Infrastructure & Hardware", 
    icon: Server,
    description: "Design, procurement, and deployment of physical infrastructure",
    services: [
      { id: "servers", name: "Servers & Storage", skus: ["PowerEdge R760", "VxRail E1200", "PowerStore 3200"] },
      { id: "network", name: "Network & Edge", skus: ["Cisco Meraki", "Dell PowerSwitch", "SD-WAN"] },
      { id: "endpoints", name: "Endpoint Devices", skus: ["Dell Latitude 7450", "Precision 5690", "OptiPlex 7020"] },
    ]
  },
  { 
    id: "workplace", 
    name: "Managed Workplace", 
    icon: Phone,
    description: "End-user productivity and collaboration solutions",
    services: [
      { id: "ucaas", name: "UCaaS", skus: ["Teams Phone", "RingCentral MVP", "Cisco Webex"] },
      { id: "ccaas", name: "Contact Center", skus: ["Teams CC", "Genesys Cloud", "NICE CXone"] },
      { id: "saas", name: "SaaS Ops (M365)", skus: ["M365 E3", "M365 E5", "Business Premium"] },
    ]
  },
  { 
    id: "cloud", 
    name: "Cloud & Data", 
    icon: Cloud,
    description: "Cloud infrastructure and data platform services",
    services: [
      { id: "iaas", name: "Cloud Infrastructure", skus: ["Azure", "AWS", "GCP"] },
      { id: "backup", name: "Backup & DR", skus: ["PowerProtect", "Veeam", "Acronis"] },
      { id: "data", name: "Data Modernization", skus: ["watsonx.data", "Snowflake", "Databricks"] },
    ]
  },
  { 
    id: "security", 
    name: "Security Implementation", 
    icon: Shield,
    description: "Security solutions from Assessment remediation roadmap",
    services: [
      { id: "siem", name: "SIEM", skus: ["IBM QRadar", "Microsoft Sentinel", "Splunk"] },
      { id: "edr", name: "EDR/XDR", skus: ["SentinelOne", "CrowdStrike", "Sophos MDR"] },
      { id: "ztna", name: "Zero Trust", skus: ["Palo Alto Prisma", "Zscaler", "Fortinet"] },
    ]
  },
  { 
    id: "automation", 
    name: "Automation & Development", 
    icon: Cpu,
    description: "Automation and application modernization projects",
    services: [
      { id: "rpa", name: "RPA & Hyperautomation", skus: ["UiPath", "watsonx Orchestrate", "Power Automate"] },
      { id: "devsecops", name: "DevSecOps", skus: ["Red Hat OpenShift", "GitLab", "Azure DevOps"] },
      { id: "appdev", name: "App Development", skus: ["Custom Development", "API Integration", "Mobile Apps"] },
    ]
  },
];

// Block data
const blocks = [
  { id: "m2", name: "M2", label: "Manufacturing" },
  { id: "h2", name: "H2", label: "Healthcare" },
  { id: "f2", name: "F2", label: "Financial" },
  { id: "r2", name: "R2", label: "Retail" },
  { id: "t2", name: "T2", label: "Transport" },
  { id: "me2", name: "ME2", label: "Mining" },
  { id: "eu2", name: "EU2", label: "Energy" },
  { id: "ps2", name: "PS2", label: "Public Sector" },
  { id: "tc2", name: "TC2", label: "Telecom" },
];

// Designation data
const designations = [
  { id: "sme", name: "SME", price: "$5K-25K/mo" },
  { id: "smb", name: "SMB", price: "$25K-150K/mo" },
  { id: "ent", name: "ENT", price: "$150K+/mo" },
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
];

interface Selection {
  kube: string | null;
  block: string | null;
  designation: string | null;
  compliance: string[];
  productCategory: string | null;
  productServices: string[];
}

export const RadialConfigurator = () => {
  const [selection, setSelection] = useState<Selection>({
    kube: null,
    block: null,
    designation: null,
    compliance: [],
    productCategory: null,
    productServices: [],
  });

  const selectedKube = kubes.find((k) => k.id === selection.kube);
  const selectedBlock = blocks.find((b) => b.id === selection.block);
  const selectedDesignation = designations.find((d) => d.id === selection.designation);
  const selectedProductCategory = productCategories.find((c) => c.id === selection.productCategory);

  const getTotalControls = () => {
    return selection.compliance.reduce((acc, id) => {
      const framework = complianceFrameworks.find((f) => f.id === id);
      return acc + (framework?.controls || 0);
    }, 0);
  };

  const getEstimatedARR = () => {
    const basePrice = selection.designation === "ent" ? 150000 : selection.designation === "smb" ? 50000 : 15000;
    const complianceMultiplier = 1 + selection.compliance.length * 0.15;
    const productMultiplier = 1 + selection.productServices.length * 0.1;
    return Math.round(basePrice * complianceMultiplier * productMultiplier * 12);
  };

  const toggleCompliance = (id: string) => {
    setSelection((prev) => ({
      ...prev,
      compliance: prev.compliance.includes(id)
        ? prev.compliance.filter((c) => c !== id)
        : [...prev.compliance, id],
    }));
  };

  const toggleProductService = (id: string) => {
    setSelection((prev) => ({
      ...prev,
      productServices: prev.productServices.includes(id)
        ? prev.productServices.filter((s) => s !== id)
        : [...prev.productServices, id],
    }));
  };

  const getCTAText = () => {
    if (!selection.kube) return "SELECT A KUBE TO BEGIN";
    if (selection.kube === "product" && selection.productServices.length > 0) {
      return "GENERATE PROJECT BOM (PDF)";
    }
    if (selection.compliance.length > 0 && selection.block && selection.designation) {
      return "GENERATE ASSESSMENT SCOPE (PDF)";
    }
    return `START ${selectedKube?.name.toUpperCase()} ASSESSMENT`;
  };

  const getPhase = () => {
    if (!selection.kube) return 0;
    if (!selection.designation) return 1;
    if (!selection.block) return 2;
    if (selection.compliance.length === 0) return 3;
    return 4;
  };

  return (
    <section className="py-24 lg:py-32 bg-background" id="configurator">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            BUILD YOUR KUBE STACK
          </h2>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Select a Kube to begin configuring your service stack. Each selection reveals additional options.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column: Selection Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Phase 1: Kube Selection */}
            <div className="card-glass rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-brand-success text-sm font-mono flex items-center justify-center text-white">1</span>
                <h3 className="font-display text-xl text-white">SELECT KUBE</h3>
                <span className="font-mono text-xs text-muted-foreground ml-auto">Primary Service</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {kubes.map((kube) => {
                  const isActive = selection.kube === kube.id;
                  return (
                    <motion.button
                      key={kube.id}
                      onClick={() => setSelection((prev) => ({ 
                        ...prev, 
                        kube: kube.id,
                        productCategory: null,
                        productServices: [],
                      }))}
                      className={`relative p-4 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                        isActive
                          ? "text-white ring-2"
                          : "bg-secondary/50 text-muted-foreground hover:text-white hover:bg-secondary"
                      }`}
                      style={{
                        backgroundColor: isActive ? `${kube.color}20` : undefined,
                        borderColor: isActive ? kube.color : undefined,
                        boxShadow: isActive ? `0 0 30px ${kube.color}30` : undefined,
                        // @ts-ignore - ring color handled by Tailwind
                        "--tw-ring-color": isActive ? kube.color : undefined,
                      } as React.CSSProperties}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isActive ? kube.color : "hsl(var(--muted))" }}
                      >
                        <Box className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-mono text-xs uppercase font-medium">{kube.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Phase 1.5: Product Kube Categories (Only when Product Kube selected) */}
            <AnimatePresence>
              {selection.kube === "product" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card-glass rounded-2xl p-6 lg:p-8 border-l-4 border-[#6366F1]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-[#6366F1] text-sm font-mono flex items-center justify-center text-white">+</span>
                    <h3 className="font-display text-xl text-white">PRODUCT CATEGORIES</h3>
                    <span className="font-mono text-xs text-muted-foreground ml-auto">Project Services</span>
                  </div>
                  
                  <div className="space-y-3">
                    {productCategories.map((category) => {
                      const Icon = category.icon;
                      const isExpanded = selection.productCategory === category.id;
                      
                      return (
                        <div key={category.id}>
                          <motion.button
                            onClick={() => setSelection((prev) => ({ 
                              ...prev, 
                              productCategory: isExpanded ? null : category.id 
                            }))}
                            className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                              isExpanded
                                ? "bg-[#6366F1]/20 ring-1 ring-[#6366F1]"
                                : "bg-secondary/50 hover:bg-secondary"
                            }`}
                            whileHover={{ x: 4 }}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isExpanded ? "bg-[#6366F1]" : "bg-muted"
                            }`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-mono text-sm text-white">{category.name}</div>
                              <div className="font-mono text-xs text-muted-foreground">{category.description}</div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`} />
                          </motion.button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 ml-14 space-y-2"
                              >
                                {category.services.map((service) => {
                                  const isSelected = selection.productServices.includes(service.id);
                                  return (
                                    <button
                                      key={service.id}
                                      onClick={() => toggleProductService(service.id)}
                                      className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all text-left ${
                                        isSelected
                                          ? "bg-[#6366F1]/30 text-white"
                                          : "bg-secondary/30 text-muted-foreground hover:text-white"
                                      }`}
                                    >
                                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                        isSelected ? "bg-[#6366F1] border-[#6366F1]" : "border-muted-foreground"
                                      }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-mono text-sm">{service.name}</div>
                                        <div className="font-mono text-xs text-muted-foreground">
                                          {service.skus.join(" • ")}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 2: Designation + Block (Shown after Kube selection) */}
            <AnimatePresence>
              {selection.kube && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  {/* Designation */}
                  <div className="card-glass rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-muted text-sm font-mono flex items-center justify-center text-white">2</span>
                      <h3 className="font-display text-lg text-white">SCALE</h3>
                    </div>
                    <div className="flex gap-2">
                      {designations.map((des) => (
                        <button
                          key={des.id}
                          onClick={() => setSelection((prev) => ({ ...prev, designation: des.id }))}
                          className={`flex-1 py-3 px-2 rounded-lg font-mono text-sm transition-all ${
                            selection.designation === des.id
                              ? "bg-primary/20 text-white ring-1 ring-primary"
                              : "bg-secondary text-muted-foreground hover:text-white"
                          }`}
                        >
                          <div className="font-display text-lg">{des.name}</div>
                          <div className="text-xs opacity-70">{des.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Block */}
                  <div className="card-glass rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-blue text-sm font-mono flex items-center justify-center text-white">3</span>
                      <h3 className="font-display text-lg text-white">INDUSTRY BLOCK</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {blocks.map((block) => (
                        <button
                          key={block.id}
                          onClick={() => setSelection((prev) => ({ ...prev, block: block.id }))}
                          className={`py-2 px-3 rounded-lg font-mono text-xs transition-all ${
                            selection.block === block.id
                              ? "bg-brand-blue/20 text-white ring-1 ring-brand-blue"
                              : "bg-secondary text-muted-foreground hover:text-white"
                          }`}
                        >
                          {block.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3: Compliance (Shown after Block selection) */}
            <AnimatePresence>
              {selection.block && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card-glass rounded-2xl p-6 lg:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-brand-purple text-sm font-mono flex items-center justify-center text-white">4</span>
                    <h3 className="font-display text-xl text-white">COMPLIANCE FRAMEWORKS</h3>
                    <span className="font-mono text-xs text-muted-foreground ml-auto">Multi-select</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {complianceFrameworks.map((framework) => {
                      const isActive = selection.compliance.includes(framework.id);
                      return (
                        <button
                          key={framework.id}
                          onClick={() => toggleCompliance(framework.id)}
                          className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 flex items-center gap-2 ${
                            isActive
                              ? "bg-brand-purple/20 text-white ring-1 ring-brand-purple"
                              : "bg-secondary text-muted-foreground hover:text-white"
                          }`}
                        >
                          {isActive && <Check className="w-4 h-4" />}
                          {framework.name}
                          <span className="text-xs opacity-60">({framework.controls})</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Live Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="card-glass rounded-2xl p-6 lg:p-8 lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                {!selection.kube ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
                      <Box className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="font-display text-xl text-white mb-2">BUILD YOUR STACK</div>
                    <p className="font-mono text-sm text-muted-foreground">
                      Select a Kube to begin configuration
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${selection.kube}-${selection.block}-${selection.designation}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Stack Title */}
                    <div>
                      <div className="font-mono text-xs text-muted-foreground mb-2">YOUR CONFIGURATION</div>
                      <h3 className="font-display text-xl lg:text-2xl text-white">
                        {selectedDesignation?.name || ""}{" "}
                        {selectedBlock?.label || ""}{" "}
                        {selectedKube?.name || ""} STACK
                      </h3>
                    </div>

                    {/* Active Selections */}
                    <div className="flex flex-wrap gap-2">
                      {selectedKube && (
                        <span
                          className="px-3 py-1 rounded-full font-mono text-xs text-white"
                          style={{ backgroundColor: `${selectedKube.color}50` }}
                        >
                          {selectedKube.name} ●
                        </span>
                      )}
                      {selectedBlock && (
                        <span className="px-3 py-1 rounded-full font-mono text-xs text-white bg-brand-blue/40">
                          {selectedBlock.name}BLOCK ●
                        </span>
                      )}
                      {selectedDesignation && (
                        <span className="px-3 py-1 rounded-full font-mono text-xs text-white bg-muted">
                          {selectedDesignation.name} ●
                        </span>
                      )}
                    </div>

                    {/* Kube Description */}
                    {selectedKube && (
                      <div className="border-t border-border pt-4">
                        <p className="font-mono text-sm text-primary mb-3">{selectedKube.description}</p>
                        <ul className="space-y-1.5">
                          {selectedKube.capabilities.slice(0, 3).map((cap, i) => (
                            <li key={i} className="font-mono text-xs text-white/70 flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              {cap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Product Services Selected */}
                    {selection.kube === "product" && selection.productServices.length > 0 && (
                      <div className="border-t border-border pt-4">
                        <div className="font-mono text-xs text-muted-foreground mb-2">SELECTED SERVICES</div>
                        <div className="space-y-2">
                          {selection.productServices.map((serviceId) => {
                            const category = productCategories.find(c => c.services.some(s => s.id === serviceId));
                            const service = category?.services.find(s => s.id === serviceId);
                            return service ? (
                              <div key={serviceId} className="flex items-center gap-2 text-white/80">
                                <Check className="w-3 h-3 text-[#6366F1]" />
                                <span className="font-mono text-xs">{service.name}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Compliance Summary */}
                    {selection.compliance.length > 0 && (
                      <div className="border-t border-border pt-4">
                        <div className="font-mono text-xs text-muted-foreground mb-2">COMPLIANCE STACK</div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {selection.compliance.map((id) => {
                            const f = complianceFrameworks.find((f) => f.id === id);
                            return (
                              <span key={id} className="px-2 py-0.5 rounded-full font-mono text-xs text-white bg-brand-purple/30">
                                {f?.name}
                              </span>
                            );
                          })}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-secondary rounded-lg p-3">
                            <div className="font-display text-2xl text-white">{getTotalControls()}</div>
                            <div className="font-mono text-xs text-muted-foreground">Controls</div>
                          </div>
                          <div className="bg-secondary rounded-lg p-3">
                            <div className="font-display text-2xl text-primary">
                              ${(getEstimatedARR() / 1000).toFixed(0)}K
                            </div>
                            <div className="font-mono text-xs text-muted-foreground">Est. ARR</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Progress Indicator */}
                    <div className="border-t border-border pt-4">
                      <div className="font-mono text-xs text-muted-foreground mb-2">CONFIGURATION PROGRESS</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((phase) => (
                          <div
                            key={phase}
                            className={`h-1 flex-1 rounded-full ${
                              getPhase() >= phase ? "bg-primary" : "bg-secondary"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3 pt-4">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
