import { Link } from "react-router-dom";
import { DocsLayout } from "@/components/DocsLayout";
import { kdocsTree, getExtColor } from "@/data/kdocs-tree";
import { motion } from "framer-motion";
import { ChevronRight, Folder, FolderOpen, FileText, Sparkles, ExternalLink } from "lucide-react";
import { useState } from "react";

const EXT_BADGE: Record<string, string> = {
  rs: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  go: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
  py: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  tsx: "bg-blue-400/10 text-blue-400 border-blue-400/30",
  yaml: "bg-purple-400/10 text-purple-400 border-purple-400/30",
  yml: "bg-purple-400/10 text-purple-400 border-purple-400/30",
  sql: "bg-green-400/10 text-green-400 border-green-400/30",
  json: "bg-amber-400/10 text-amber-400 border-amber-400/30",
  md: "bg-slate-400/10 text-slate-400 border-slate-400/30",
  sh: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
  toml: "bg-red-400/10 text-red-400 border-red-400/30",
  proto: "bg-pink-400/10 text-pink-400 border-pink-400/30",
  hcl: "bg-violet-400/10 text-violet-400 border-violet-400/30",
};

const TreeSection = ({ section, defaultOpen = false }: { section: typeof kdocsTree[0]; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (id: string) =>
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));

  // Count files
  let fileCount = 0;
  section.children.forEach(g => {
    fileCount += g.files?.length ?? 0;
    g.subGroups?.forEach(sg => { fileCount += sg.files.length; });
  });

  return (
    <div className="border border-border mb-3 font-mono">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors text-left"
        style={{ borderLeft: `3px solid ${section.color}` }}
      >
        {open
          ? <FolderOpen size={14} style={{ color: section.color }} className="flex-shrink-0" />
          : <Folder size={14} style={{ color: section.color }} className="flex-shrink-0" />
        }
        <span className="text-xs font-bold tracking-wider flex-1" style={{ color: section.color }}>
          📁 {section.code}_{section.label.toUpperCase().replace(/ /g, "_")}/
        </span>
        <span className="text-[10px] text-muted-foreground/50 mr-2">{fileCount} files</span>
        {open
          ? <ChevronRight size={12} className="text-muted-foreground/50 rotate-90 transition-transform" />
          : <ChevronRight size={12} className="text-muted-foreground/50 transition-transform" />
        }
      </button>

      {open && (
        <div className="border-t border-border bg-secondary/10 px-5 py-4 space-y-1">
          {section.children.map(group => {
            const gOpen = openGroups[group.id] !== false;
            const totalFiles = (group.files?.length ?? 0) + (group.subGroups?.reduce((acc, sg) => acc + sg.files.length, 0) ?? 0);
            return (
              <div key={group.id}>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex items-center gap-2 py-0.5 text-left hover:opacity-80 w-full"
                >
                  <span className="text-muted-foreground/40 text-[10px]">├──</span>
                  {gOpen
                    ? <FolderOpen size={11} className="text-muted-foreground" />
                    : <Folder size={11} className="text-muted-foreground" />
                  }
                  <span className="text-[11px] text-foreground/80">📁 {group.code}_{group.label.replace(/ /g, "_")}/</span>
                  {group.isNew && <Sparkles size={9} className="text-brand-orange" />}
                  <span className="text-[9px] text-muted-foreground/40 ml-auto">{totalFiles}</span>
                </button>

                {gOpen && (
                  <div className="ml-6 space-y-0.5">
                    {group.files?.map((file, fi) => {
                      const isLast = fi === (group.files!.length - 1) && !group.subGroups?.length;
                      return (
                        <div key={file.id} className="flex items-center gap-2">
                          <span className="text-muted-foreground/30 text-[10px]">{isLast ? "└──" : "├──"}</span>
                          <FileText size={9} className={getExtColor(file.ext)} />
                          <span className="text-[10px] text-muted-foreground/70">{file.code}_{file.label.replace(/ /g, "_")}.{file.ext}</span>
                          {file.isNew && <Sparkles size={7} className="text-brand-orange" />}
                          {file.ext && EXT_BADGE[file.ext] && (
                            <span className={`text-[8px] px-1 border font-bold ${EXT_BADGE[file.ext]}`}>{file.ext}</span>
                          )}
                        </div>
                      );
                    })}
                    {group.subGroups?.map((sub, si) => {
                      const subKey = `${group.id}--${sub.id}`;
                      const subOpen = openGroups[subKey] !== false;
                      const isLastSub = si === group.subGroups!.length - 1;
                      return (
                        <div key={sub.id}>
                          <button
                            onClick={() => toggleGroup(subKey)}
                            className="flex items-center gap-2 py-0.5 text-left hover:opacity-80 w-full"
                          >
                            <span className="text-muted-foreground/30 text-[10px]">{isLastSub ? "└──" : "├──"}</span>
                            {subOpen
                              ? <FolderOpen size={10} className="text-muted-foreground/60" />
                              : <Folder size={10} className="text-muted-foreground/60" />
                            }
                            <span className="text-[10px] text-muted-foreground/60">📁 {sub.code}/</span>
                            {sub.isNew && <Sparkles size={8} className="text-brand-orange" />}
                          </button>
                          {subOpen && (
                            <div className="ml-6 space-y-0.5">
                              {sub.files.map((file, fi) => (
                                <div key={file.id} className="flex items-center gap-2">
                                  <span className="text-muted-foreground/20 text-[10px]">{fi === sub.files.length - 1 ? "└──" : "├──"}</span>
                                  <FileText size={8} className={getExtColor(file.ext)} />
                                  <span className="text-[9px] text-muted-foreground/50">{file.code}_{file.label.replace(/ /g, "_")}.{file.ext}</span>
                                  {file.isNew && <Sparkles size={7} className="text-brand-orange" />}
                                  {file.ext && EXT_BADGE[file.ext] && (
                                    <span className={`text-[8px] px-1 border font-bold ${EXT_BADGE[file.ext]}`}>{file.ext}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function DocsOverview() {
  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mb-4">
            <Link to="/docs" className="hover:text-brand-orange transition-colors">K-DOCS</Link>
            <span>/</span>
            <span className="text-foreground">INDEX</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-2 font-mono">
            <span className="text-brand-orange">K-DOCS/</span>
          </h1>
          <p className="text-base text-muted-foreground mb-6 max-w-3xl leading-relaxed">
            Complete Kubric orchestration reference. 11 top-level sections covering infrastructure, detection assets, super agent, AI orchestration, security operations, NOC, business logic, GRC, DR module mapping, deployment topologies, and API reference.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Sections", value: "11" },
              { label: "DR Modules", value: "20" },
              { label: "Detection Assets", value: "120,000+" },
              { label: "Vendor Directories", value: "17" },
            ].map(stat => (
              <div key={stat.label} className="border border-border p-4 bg-secondary/20">
                <p className="text-2xl font-black text-brand-orange font-mono">{stat.value}</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* License strategy table */}
          <div className="bg-foreground text-white p-6 mb-8 font-mono">
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4">// LICENSE INTEGRATION STRATEGY</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-6 text-white/40 font-bold uppercase text-[10px] tracking-wider">License</th>
                    <th className="text-left py-2 pr-6 text-white/40 font-bold uppercase text-[10px] tracking-wider">Strategy</th>
                    <th className="text-left py-2 text-white/40 font-bold uppercase text-[10px] tracking-wider">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { license: "MIT / Apache 2.0 / BSD", strategy: "Direct embed into monorepo", examples: "Nuclei, Trivy, OPA, Aya-rs, FleetDM", color: "text-green-400" },
                    { license: "LGPL 3.0", strategy: "FFI / dynamic link only", examples: "nDPI (C→Rust), OpenSCAP binding", color: "text-blue-400" },
                    { license: "GPL 2.0 (rules/data)", strategy: "Vendor as data files", examples: "Sigma, Suricata ET, Wazuh XML", color: "text-yellow-400" },
                    { license: "GPL 3.0 / AGPL 3.0", strategy: "Subprocess / sidecar", examples: "RITA, Cortex, TheHive, TruffleHog", color: "text-orange-400" },
                    { license: "CC0 / Public Domain", strategy: "Embed freely", examples: "MISP, NIST OSCAL, CISA KEV", color: "text-green-400" },
                    { license: "CC BY 4.0", strategy: "Embed with attribution", examples: "MITRE ATT&CK, EPSS", color: "text-blue-400" },
                    { license: "Commercial ToS", strategy: "REST API calls only", examples: "Vapi, Stripe, OTX, Wiz", color: "text-red-400" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className={`py-2 pr-6 font-medium ${row.color}`}>{row.license}</td>
                      <td className="py-2 pr-6 text-white/70">{row.strategy}</td>
                      <td className="py-2 text-white/40 text-[10px]">{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* File Tree */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black tracking-widest uppercase text-muted-foreground font-mono">
              // FULL DIRECTORY TREE
            </h2>
            <span className="text-[10px] font-mono text-muted-foreground/50">
              ★ NEW = recently added
            </span>
          </div>

          <div className="font-mono text-[11px] bg-secondary/10 border border-border p-4 mb-6">
            <p className="text-muted-foreground/60">📁 K-DOCS/</p>
            <p className="text-muted-foreground/40 pl-4">│</p>
            {kdocsTree.map((s, i) => (
              <p key={s.id} className="pl-4 text-muted-foreground/50">
                {i === kdocsTree.length - 1 ? "└──" : "├──"} 📁 <span style={{ color: s.color }}>{s.code}_{s.label.toUpperCase().replace(/ /g, "_")}/</span>
              </p>
            ))}
          </div>

          {kdocsTree.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <TreeSection section={section} defaultOpen={i === 0} />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick reference links */}
        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground font-mono mb-4">
            // QUICK REFERENCE
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "K-MAP-11 DR Module Mapping", desc: "18 detection modules × library × NATS subject × KAI persona", href: "/docs/nats" },
              { label: "K-MAP-020 License Compliance", desc: "Full §20 matrix — 120,000+ assets with safe integration patterns", href: "/docs/license-matrix" },
              { label: "Monorepo Directory Structure", desc: "Prevents GPL/AGPL contamination via directory isolation", href: "/docs/monorepo" },
              { label: "Integration Summary", desc: "Build vs. Import vs. Vendor — the core Kubric doctrine", href: "/docs/summary" },
            ].map(ref => (
              <Link
                key={ref.href}
                to={ref.href}
                className="group flex items-start gap-3 p-4 border border-border hover:border-brand-orange transition-colors bg-white"
              >
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-foreground group-hover:text-brand-orange transition-colors mb-1 font-mono">{ref.label}</h3>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{ref.desc}</p>
                </div>
                <ExternalLink size={12} className="text-muted-foreground group-hover:text-brand-orange transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
