import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, FileText, Calendar } from "lucide-react";

const kubes = [
  { id: "assessment", name: "Assessment", color: "#10B981" },
  { id: "compliance", name: "Compliance", color: "#8B5CF6" },
  { id: "mssp", name: "MSSP", color: "#EF4444" },
  { id: "msp", name: "MSP", color: "#3B82F6" },
  { id: "advisory", name: "Advisory", color: "#F59E0B" },
  { id: "innovation", name: "Innovation", color: "#EC4899" },
  { id: "industry", name: "Industry", color: "#14B8A6" },
  { id: "partner", name: "Partner", color: "#6366F1" },
];

const blocks = [
  { id: "m2", name: "M2", label: "Manufacturing" },
  { id: "h2", name: "H2", label: "Healthcare" },
  { id: "f2", name: "F2", label: "Finance" },
  { id: "r2", name: "R2", label: "Retail" },
  { id: "t2", name: "T2", label: "Transport" },
  { id: "me2", name: "ME2", label: "Mining" },
  { id: "eu2", name: "EU2", label: "Energy" },
  { id: "ps2", name: "PS2", label: "Public Sector" },
  { id: "tc2", name: "TC2", label: "Telecom" },
];

const designations = [
  { id: "sme", name: "SME", price: "$5K-25K/mo" },
  { id: "smb", name: "SMB", price: "$25K-150K/mo" },
  { id: "ent", name: "ENT", price: "$150K+/mo" },
];

const complianceFrameworks = [
  { id: "nist", name: "NIST 800-53", controls: 124 },
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
}

export const KubeWheel = () => {
  const [selection, setSelection] = useState<Selection>({
    kube: null,
    block: null,
    designation: null,
    compliance: [],
  });

  const getLayerCount = () => {
    let count = 0;
    if (selection.kube) count++;
    if (selection.block) count++;
    if (selection.designation) count++;
    if (selection.compliance.length > 0) count++;
    return count;
  };

  const getTotalControls = () => {
    return selection.compliance.reduce((acc, id) => {
      const framework = complianceFrameworks.find((f) => f.id === id);
      return acc + (framework?.controls || 0);
    }, 0);
  };

  const getEstimatedARR = () => {
    const basePrice = selection.designation === "ent" ? 150000 : selection.designation === "smb" ? 50000 : 15000;
    const complianceMultiplier = 1 + selection.compliance.length * 0.15;
    const blockMultiplier = selection.block ? 1.2 : 1;
    return Math.round(basePrice * complianceMultiplier * blockMultiplier * 12);
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
    const layers = getLayerCount();
    if (layers === 0) return "START ANYWHERE →";
    if (layers < 3) return "EXPLORE NEXT LAYER →";
    if (layers < 4) return "ADD COMPLIANCE →";
    return "GENERATE FULL PROPOSAL →";
  };

  const selectedKube = kubes.find((k) => k.id === selection.kube);
  const selectedBlock = blocks.find((b) => b.id === selection.block);
  const selectedDesignation = designations.find((d) => d.id === selection.designation);

  return (
    <section className="py-24 lg:py-32 bg-background" id="kubes">
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
          5-LAYER FUNCTIONAL WHEEL: KUBE → BLOCK → DESIGNATION → INDUSTRY → COMPLIANCE
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Layer 1: Kubes */}
            <div className="card-glass rounded-xl p-6">
              <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-success text-xs flex items-center justify-center text-white">1</span>
                SELECT KUBE
              </h3>
              <div className="flex flex-wrap gap-2">
                {kubes.map((kube) => (
                  <button
                    key={kube.id}
                    onClick={() => setSelection((prev) => ({ ...prev, kube: kube.id }))}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                      selection.kube === kube.id
                        ? "text-white ring-2"
                        : "bg-secondary text-muted-foreground hover:text-white"
                    }`}
                    style={{
                      backgroundColor: selection.kube === kube.id ? kube.color + "33" : undefined,
                      borderColor: selection.kube === kube.id ? kube.color : undefined,
                      boxShadow: selection.kube === kube.id ? `0 0 20px ${kube.color}40` : undefined,
                    }}
                  >
                    {kube.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer 2: Blocks */}
            <div className="card-glass rounded-xl p-6">
              <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-blue text-xs flex items-center justify-center text-white">2</span>
                SELECT BLOCK
              </h3>
              <div className="flex flex-wrap gap-2">
                {blocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => setSelection((prev) => ({ ...prev, block: block.id }))}
                    className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 ${
                      selection.block === block.id
                        ? "bg-brand-blue/20 text-white ring-1 ring-brand-blue glow-blue"
                        : "bg-secondary text-muted-foreground hover:text-white"
                    }`}
                  >
                    {block.name}BLOCK
                  </button>
                ))}
              </div>
            </div>

            {/* Layer 3: Designation */}
            <div className="card-glass rounded-xl p-6">
              <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-muted-foreground text-xs flex items-center justify-center text-white">3</span>
                SELECT SCALE
              </h3>
              <div className="flex flex-wrap gap-3">
                {designations.map((des) => (
                  <button
                    key={des.id}
                    onClick={() => setSelection((prev) => ({ ...prev, designation: des.id }))}
                    className={`px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 flex flex-col items-center ${
                      selection.designation === des.id
                        ? "bg-primary/20 text-white ring-1 ring-primary glow-orange"
                        : "bg-secondary text-muted-foreground hover:text-white"
                    }`}
                  >
                    <span className="font-display text-lg">{des.name}</span>
                    <span className="text-xs opacity-70">{des.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layer 4: Compliance */}
            <div className="card-glass rounded-xl p-6">
              <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-purple text-xs flex items-center justify-center text-white">4</span>
                SELECT COMPLIANCE
              </h3>
              <div className="flex flex-wrap gap-2">
                {complianceFrameworks.map((framework) => (
                  <button
                    key={framework.id}
                    onClick={() => toggleCompliance(framework.id)}
                    className={`px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 flex items-center gap-2 ${
                      selection.compliance.includes(framework.id)
                        ? "bg-brand-purple/20 text-white ring-1 ring-brand-purple"
                        : "bg-secondary text-muted-foreground hover:text-white"
                    }`}
                  >
                    {selection.compliance.includes(framework.id) && <Check className="w-3 h-3" />}
                    {framework.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass rounded-xl p-6 lg:p-8 h-fit sticky top-24"
          >
            <AnimatePresence mode="wait">
              {getLayerCount() === 0 ? (
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
                  <div className="font-mono text-muted-foreground">
                    Select options from the left to configure your stack
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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

                  {/* Selected Items */}
                  <div className="flex flex-wrap gap-2">
                    {selectedKube && (
                      <span
                        className="px-3 py-1 rounded-full font-mono text-xs text-white"
                        style={{ backgroundColor: selectedKube.color + "40" }}
                      >
                        {selectedKube.name} ●
                      </span>
                    )}
                    {selectedBlock && (
                      <span className="px-3 py-1 rounded-full font-mono text-xs text-white bg-brand-blue/40">
                        {selectedBlock.name} ●
                      </span>
                    )}
                    {selectedDesignation && (
                      <span className="px-3 py-1 rounded-full font-mono text-xs text-white bg-muted">
                        {selectedDesignation.name} ●
                      </span>
                    )}
                    {selection.compliance.map((id) => {
                      const f = complianceFrameworks.find((f) => f.id === id);
                      return (
                        <span
                          key={id}
                          className="px-3 py-1 rounded-full font-mono text-xs text-white bg-brand-purple/40"
                        >
                          {f?.name} ●
                        </span>
                      );
                    })}
                  </div>

                  {/* Metrics */}
                  {selection.compliance.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="font-display text-3xl text-white">{getTotalControls()}</div>
                        <div className="font-mono text-xs text-muted-foreground">Total Controls</div>
                      </div>
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="font-display text-3xl text-primary">
                          ${(getEstimatedARR() / 1000).toFixed(0)}K
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">Est. ARR</div>
                      </div>
                    </div>
                  )}

                  {/* BOM Preview */}
                  {selectedBlock && selectedDesignation && (
                    <div className="border-t border-border pt-4">
                      <div className="font-mono text-xs text-muted-foreground mb-3">INFRASTRUCTURE PREVIEW</div>
                      <div className="space-y-2 font-mono text-sm text-white/80">
                        <div>• PowerEdge XE9680 (490-BFGP)</div>
                        <div>• VxRail E1200 → Factory HCI</div>
                        <div>• PowerScale F910 → Storage</div>
                      </div>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="space-y-3 pt-4">
                    <Button className="w-full bg-primary hover:bg-primary/90 font-mono text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      GENERATE ASSESSMENT SCOPE
                    </Button>
                    <Button variant="outline" className="w-full font-mono text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      SCHEDULE IMPLEMENTATION
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                className="w-full font-mono text-sm text-muted-foreground hover:text-white group"
              >
                {getCTAText()}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
