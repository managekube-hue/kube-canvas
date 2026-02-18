import { useParams, Link, useNavigate } from "react-router-dom";
import { DocsLayout } from "@/components/DocsLayout";
import { docModules, categoryLabels, categoryColors } from "@/data/docs-modules";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="ml-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
    </button>
  );
};

export default function DocModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const mod = docModules.find(m => m.id === moduleId);
  const modIndex = docModules.findIndex(m => m.id === moduleId);
  const prevMod = modIndex > 0 ? docModules[modIndex - 1] : null;
  const nextMod = modIndex < docModules.length - 1 ? docModules[modIndex + 1] : null;

  if (!mod) {
    return (
      <DocsLayout>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Module not found</h1>
          <Link to="/docs" className="text-brand-orange hover:underline">← Back to docs</Link>
        </div>
      </DocsLayout>
    );
  }

  const licenseColor = (license: string) => {
    if (license.includes("MIT") || license.includes("Apache") || license.includes("BSD") || license.includes("CC0") || license.includes("Public domain")) return "text-green-600";
    if (license.includes("LGPL") || license.includes("MPL")) return "text-blue-600";
    if (license.includes("GPL 2.0") && license.includes("data")) return "text-yellow-600";
    if (license.includes("GPL 3.0") || license.includes("AGPL")) return "text-orange-600";
    return "text-muted-foreground";
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link to="/docs" className="hover:text-brand-orange transition-colors">Docs</Link>
          <span>/</span>
          <span style={{ color: categoryColors[mod.category] }}>{categoryLabels[mod.category]}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{mod.code}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1" style={{ backgroundColor: `${categoryColors[mod.category]}20`, color: categoryColors[mod.category] }}>
                {categoryLabels[mod.category]}
              </span>
              <span className="text-xs text-muted-foreground">Module {mod.number} of 18</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-2">
              <span className="text-brand-orange">{mod.code}</span> — {mod.name}
            </h1>
            <p className="text-lg text-muted-foreground italic mb-6">{mod.tagline}</p>
            <p className="text-base text-foreground leading-relaxed">{mod.description}</p>
          </div>

          {/* Library table */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">Library Integration Map</h2>
            <p className="text-xs text-muted-foreground mb-4">{mod.libraries.length} libraries mapped to Kubric modules</p>
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Capability</th>
                    <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">OSS Library</th>
                    <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Import Path</th>
                    <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">License</th>
                    <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Kubric Module</th>
                  </tr>
                </thead>
                <tbody>
                  {mod.libraries.map((lib, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-secondary/30"}`}>
                      <td className="px-4 py-3 font-medium text-foreground text-xs">{lib.capability}</td>
                      <td className="px-4 py-3 font-semibold text-xs text-foreground">{lib.library}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <code className="text-[10px] bg-secondary px-2 py-1 font-mono text-foreground break-all">{lib.importPath}</code>
                          <CopyButton text={lib.importPath} />
                        </div>
                      </td>
                      <td className={`px-4 py-3 text-xs font-medium ${licenseColor(lib.license)}`}>{lib.license}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{lib.kubricModule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monorepo import commands */}
          <div className="mb-10 bg-foreground text-white p-6">
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-3">📦 Monorepo Import Commands</p>
            <div className="flex items-start gap-2">
              <code className="text-xs font-mono text-green-400 leading-relaxed flex-1">{mod.monorepoNote}</code>
              <CopyButton text={mod.monorepoNote} />
            </div>
          </div>

          {/* License legend */}
          <div className="mb-10 p-6 border border-border bg-secondary/30">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">License Integration Guide</p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" /><span className="text-green-600 font-medium">MIT / Apache / BSD / CC0</span><span className="text-muted-foreground">— Direct embed</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" /><span className="text-blue-600 font-medium">LGPL / MPL</span><span className="text-muted-foreground">— FFI or dynamic link</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" /><span className="text-yellow-600 font-medium">GPL 2.0 (data only)</span><span className="text-muted-foreground">— Vendor as data files</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" /><span className="text-orange-600 font-medium">GPL 3.0 / AGPL</span><span className="text-muted-foreground">— Subprocess / sidecar</span></div>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          {prevMod ? (
            <Link to={`/docs/${prevMod.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-[10px] uppercase tracking-wider">Previous</p>
                <p className="font-semibold text-foreground">{prevMod.code} — {prevMod.name.split(" — ")[0]}</p>
              </div>
            </Link>
          ) : <div />}
          {nextMod ? (
            <Link to={`/docs/${nextMod.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right">
              <div>
                <p className="text-[10px] uppercase tracking-wider">Next</p>
                <p className="font-semibold text-foreground">{nextMod.code} — {nextMod.name.split(" — ")[0]}</p>
              </div>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </DocsLayout>
  );
}
