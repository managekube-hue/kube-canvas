import { DocsLayout } from "@/components/DocsLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const build = [
  "OCSF normalization pipeline",
  "NATS subject router / gateway",
  "Multi-tenant data isolation",
  "KAI agent orchestration logic",
  "Kubric billing metering engine",
  "KiSS health score algorithm",
  "Customer portal & API",
  "LTV / churn prediction models",
  "Dynamic pricing optimizer",
  "KAI-CLERK billing workflow",
  "QBR report generator",
  "Blake3 immutable ledger chain",
];

const importLibs = [
  { lib: "Nuclei engine (Go)", desc: "Vulnerability scanning" },
  { lib: "Trivy scanner (Go)", desc: "Vulns + SBOM" },
  { lib: "Aya-rs (Rust)", desc: "eBPF programs" },
  { lib: "RITA algorithms (Go)", desc: "Beaconing detection" },
  { lib: "OPA Rego engine (Go)", desc: "Policy enforcement" },
  { lib: "NATS.io JetStream (Go)", desc: "Event messaging" },
  { lib: "OpenTelemetry SDK (Go)", desc: "Observability" },
  { lib: "pgx (Go)", desc: "PostgreSQL client" },
  { lib: "Neo4j Go driver", desc: "Graph database" },
  { lib: "Temporal Go SDK", desc: "Durable workflows" },
  { lib: "go-chi router (Go)", desc: "API gateway" },
  { lib: "MicroMDM (Go)", desc: "iOS MDM" },
];

const vendor = [
  { data: "Sigma rules (25,000+ YAML)", license: "Apache 2.0" },
  { data: "Suricata ET rules (5,000+ .rules)", license: "GPL 2.0 data" },
  { data: "YARA signatures (5,000+ .yar)", license: "Mixed" },
  { data: "MISP taxonomies + galaxies", license: "CC0" },
  { data: "MITRE ATT&CK STIX", license: "CC BY 4.0" },
  { data: "NIST OSCAL controls", license: "Public domain" },
  { data: "Nuclei templates (MIT YAML)", license: "MIT" },
  { data: "Velociraptor artifacts", license: "AGPL 3.0 data" },
  { data: "CIS Benchmarks (XCCDF)", license: "CC data" },
  { data: "BloodHound Cypher queries", license: "Apache 2.0" },
  { data: "Falco rules (Apache YAML)", license: "Apache 2.0" },
  { data: "OpenSCAP XCCDF content", license: "CC data" },
];

export default function DocsSummary() {
  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <Link to="/docs" className="hover:text-brand-orange transition-colors">Docs</Link>
            <span>/</span>
            <span className="text-foreground">Integration Summary</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-4">What You Build vs. What You Import</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Summary of Kubric-proprietary code, OSS imports, and vendored data files across the full platform.
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Build */}
            <div className="border-2 border-brand-orange p-6">
              <div className="h-1 w-8 bg-brand-orange mb-4" />
              <h2 className="text-lg font-black text-foreground mb-4">You BUILD</h2>
              <p className="text-xs text-muted-foreground mb-4">Kubric-Proprietary</p>
              <ul className="space-y-2">
                {build.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-brand-orange mt-1 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Import */}
            <div className="border border-border p-6 bg-secondary/30">
              <div className="h-1 w-8 bg-blue-500 mb-4" />
              <h2 className="text-lg font-black text-foreground mb-4">You IMPORT</h2>
              <p className="text-xs text-muted-foreground mb-4">OSS Libraries (go.mod / pip / cargo)</p>
              <ul className="space-y-2">
                {importLibs.map(item => (
                  <li key={item.lib} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-1 flex-shrink-0">▸</span>
                    <div>
                      <span className="font-semibold text-foreground">{item.lib}</span>
                      <span className="text-muted-foreground text-xs"> · {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vendor */}
            <div className="border border-border p-6">
              <div className="h-1 w-8 bg-green-500 mb-4" />
              <h2 className="text-lg font-black text-foreground mb-4">You VENDOR</h2>
              <p className="text-xs text-muted-foreground mb-4">Data files in /vendor (not compiled code)</p>
              <ul className="space-y-2">
                {vendor.map(item => (
                  <li key={item.data} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-1 flex-shrink-0">▸</span>
                    <div>
                      <span className="font-semibold text-foreground text-xs">{item.data}</span>
                      <span className="text-muted-foreground text-xs block">{item.license}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom line */}
          <div className="bg-foreground text-white p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-3">🚀 Bottom Line</p>
            <p className="text-lg font-semibold text-white mb-3">
              You are NOT rebuilding Nuclei, Trivy, OPA, BloodHound, or OpenTelemetry.
            </p>
            <p className="text-white/70 leading-relaxed">
              You are importing their battle-tested engines as Go/Rust/Python packages, vendoring 120,000+ detection assets as data files, and building Kubric's unique multi-tenant orchestration, billing, AI triage, and customer experience layer on top.
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-brand-orange font-bold text-lg">Time to first detection: Days, not years.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  );
}
