import { Link } from "react-router-dom";
import { DocsLayout } from "@/components/DocsLayout";
import { docModules, categoryLabels, categoryColors } from "@/data/docs-modules";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Shield, Network, Cloud, Database, Settings, Brain, Lock } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  endpoint: Shield,
  network: Network,
  cloud: Cloud,
  data: Database,
  identity: Lock,
  governance: Settings,
  operations: Settings,
  intelligence: Brain,
};

const categoryOrder2 = ["endpoint", "network", "cloud", "identity", "data", "governance", "operations", "intelligence"];

export default function DocsOverview() {
  const grouped = categoryOrder2.map(cat => ({
    cat,
    modules: docModules.filter(m => m.category === cat),
  })).filter(g => g.modules.length > 0);

  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-brand-orange" />
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Kubric UIDR v3.0</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
            Monorepo Library Extraction<br />& Integration Architecture
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
            Complete one-to-one mapping of OSS libraries to Kubric DR modules. 18 Detection & Response modules + KAI AI layer + PSA integration. All libraries licensed for monorepo integration.
          </p>

          {/* Core principle card */}
          <div className="bg-foreground text-white p-8 mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-3">🎯 Core Principle</p>
            <p className="text-lg font-semibold text-white mb-2">Import the library, not the product.</p>
            <p className="text-white/70 leading-relaxed">
              Where AGPL prevents embedding, call as a subprocess. Where GPL covers rules/data, vendor the data files. Build Kubric on top — not from scratch. Time to first detection: Days, not years.
            </p>
          </div>

          {/* Strategy table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="text-left py-3 pr-4 font-bold text-foreground">Strategy</th>
                  <th className="text-left py-3 pr-4 font-bold text-foreground">License Type</th>
                  <th className="text-left py-3 pr-4 font-bold text-foreground">Approach</th>
                  <th className="text-left py-3 font-bold text-foreground">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { strategy: "Direct Import", license: "MIT / Apache 2.0 / BSD", approach: "Add to go.mod or requirements.txt", examples: "Nuclei Engine, Trivy, OPA, Aya-rs, OpenTelemetry" },
                  { strategy: "Vendor Data Files", license: "GPL 2.0 (rules/data)", approach: "Vendor YAML/JSON/rules into /vendor, load at runtime", examples: "Sigma rules, Suricata ET, YARA, MISP Taxonomies, Falco rules" },
                  { strategy: "Subprocess / Sidecar", license: "AGPL 3.0", approach: "Execute as child process, communicate via stdin/stdout or REST", examples: "Cortex, TheHive schema exec, SpiderFoot, Wazuh modules" },
                  { strategy: "REST API Pull", license: "Public API / ToS", approach: "Scheduled HTTP GET, cache in ClickHouse", examples: "NVD, EPSS, CISA KEV, AbuseIPDB, AlienVault OTX" },
                  { strategy: "FFI Binding", license: "LGPL 3.0", approach: "Static/dynamic link via Rust bindgen or cgo", examples: "nDPI (C → Rust FFI), libpcap, OpenSCAP binding" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="py-3 pr-4 font-semibold text-brand-orange">{row.strategy}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.license}</td>
                    <td className="py-3 pr-4 text-foreground">{row.approach}</td>
                    <td className="py-3 text-muted-foreground text-xs">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Module grid by category */}
        {grouped.map(({ cat, modules }, gi) => {
          const Icon = categoryIcons[cat] || Shield;
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.05 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={16} style={{ color: categoryColors[cat] }} />
                <h2 className="text-xs font-bold tracking-widest uppercase" style={{ color: categoryColors[cat] }}>
                  {categoryLabels[cat]}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {modules.map(mod => (
                  <Link
                    key={mod.id}
                    to={`/docs/${mod.id}`}
                    className="group block p-5 border border-border hover:border-brand-orange transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black text-brand-orange">{mod.code}</span>
                          <span className="text-muted-foreground/40 text-xs">·</span>
                          <span className="text-xs text-muted-foreground">{mod.libraries.length} libraries</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-brand-orange transition-colors mb-1">
                          {mod.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{mod.tagline}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Reference pages */}
        <div className="mt-12 pt-12 border-t border-border">
          <h2 className="text-lg font-bold text-foreground mb-6">Reference Pages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "NATS Message Bus — Subject Hierarchy", desc: "All KAI-to-module subject taxonomy and JetStream consumer groups.", href: "/docs/nats" },
              { label: "License Compliance Matrix", desc: "All licenses across 120,000+ intelligence assets and safe integration patterns.", href: "/docs/license-matrix" },
              { label: "Monorepo Directory Structure", desc: "Recommended directory layout preventing GPL/AGPL contamination.", href: "/docs/monorepo" },
              { label: "What You Build vs. What You Import", desc: "Kubric-proprietary code vs. OSS imports vs. vendored data files.", href: "/docs/summary" },
            ].map(ref => (
              <Link key={ref.href} to={ref.href} className="group block p-5 border border-border hover:border-brand-orange transition-colors">
                <h3 className="text-sm font-bold text-foreground group-hover:text-brand-orange transition-colors mb-1">{ref.label}</h3>
                <p className="text-xs text-muted-foreground">{ref.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
