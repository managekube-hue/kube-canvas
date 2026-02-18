import { DocsLayout } from "@/components/DocsLayout";
import { motion } from "framer-motion";

const dirs = [
  { path: "kubric/", contents: "Monorepo root", keyFiles: "go.work, Cargo.toml (workspace), pyproject.toml, package.json" },
  { path: "kubric/cmd/coresec/", contents: "CoreSec eBPF agent (Rust)", keyFiles: "main.rs → aya::Bpf, yara_x::Compiler, falco rules loader" },
  { path: "kubric/cmd/netguard/", contents: "NetGuard agent (Rust + C FFI)", keyFiles: "main.rs → libndpi.a bindgen, suricata rules loader, RITA Go service" },
  { path: "kubric/cmd/perftrace/", contents: "PerfTrace agent (Go)", keyFiles: "main.go → prometheus/client_golang, pyroscope-go, otel trace" },
  { path: "kubric/cmd/vdr/", contents: "VDR scanner (Go)", keyFiles: "main.go → nuclei/v3/pkg/core, trivy/pkg/scanner, grype" },
  { path: "kubric/cmd/kai/", contents: "KAI AI orchestrator (Python)", keyFiles: "main.py → crewai, langchain, pyfair, xgboost, scikit-learn" },
  { path: "kubric/cmd/ksvc/", contents: "K-SVC PSA service (Go)", keyFiles: "main.go → temporal, pgx, stripe-go, gofpdf, chi router" },
  { path: "kubric/cmd/kic/", contents: "KIC compliance engine (Go)", keyFiles: "main.go → opa/rego, kyverno/engine, openscap binding, trivy" },
  { path: "kubric/pkg/nats/", contents: "NATS client wrapper (Go)", keyFiles: "nats.go → nats-io/nats.go, JetStream consumer factory" },
  { path: "kubric/pkg/ocsf/", contents: "OCSF schema (Go structs)", keyFiles: "ocsf.go → generated from OCSF JSON schema" },
  { path: "kubric/pkg/db/", contents: "Database clients (Go)", keyFiles: "clickhouse.go (ClickHouse), pg.go (pgx), neo4j.go, redis.go" },
  { path: "kubric/vendor/sigma/", contents: "Sigma detection rules (YAML)", keyFiles: "rules/**/*.yml — 3,000+ rules (Apache 2.0 data files)" },
  { path: "kubric/vendor/suricata/", contents: "Suricata ET rules (.rules)", keyFiles: "emerging-*.rules — 5,000+ rules (GPL 2.0 data files)" },
  { path: "kubric/vendor/yara-rules/", contents: "YARA malware signatures", keyFiles: "*.yar — 5,000+ sigs (data files, mixed licenses)" },
  { path: "kubric/vendor/misp/", contents: "MISP taxonomies, galaxies, objects", keyFiles: "taxonomies/**/*.json, galaxies/**/*.json (CC0)" },
  { path: "kubric/vendor/mitre/", contents: "MITRE ATT&CK + CWE + CAPEC STIX", keyFiles: "enterprise-attack.json, cwe_stix2.json, capec_stix2.json (CC BY)" },
  { path: "kubric/vendor/oscal/", contents: "NIST OSCAL + PCI + ISO + SOC2", keyFiles: "nist/SP800-53/rev5/*.json, pci/*.json, iso/*.json (Public Domain)" },
  { path: "kubric/vendor/nuclei-templates/", contents: "Nuclei scan templates (YAML)", keyFiles: "cves/**/*.yaml, cloud/**/*.yaml, http/**/*.yaml (MIT)" },
  { path: "kubric/vendor/velociraptor/", contents: "Velociraptor forensic artifacts (YAML)", keyFiles: "artifacts/definitions/**/*.yaml (AGPL 3.0 data files)" },
  { path: "kubric/vendor/cortex/", contents: "Cortex analyzers + responders", keyFiles: "analyzers/**/*.py, responders/**/*.py — exec as subprocess (Python)" },
  { path: "kubric/vendor/falco/", contents: "Falco detection rules (YAML)", keyFiles: "rules/falco_rules.yaml, k8s_falco_rules.yaml (Apache 2.0)" },
  { path: "kubric/vendor/bloodhound/", contents: "BloodHound Cypher queries", keyFiles: "cypher/windows/*.cypher, azure/**/*.cypher (Apache 2.0)" },
  { path: "kubric/vendor/openscap/", contents: "CIS + STIG XCCDF/OVAL content", keyFiles: "scap/content/cis_*.xml, stig/*.xml (CC data)" },
  { path: "kubric/frontend/", contents: "Customer portal (TypeScript)", keyFiles: "Next.js + Tremor.so + Shadcn/UI" },
];

export default function DocsMonorepo() {
  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <a href="/docs" className="hover:text-brand-orange transition-colors">Docs</a>
            <span>/</span>
            <span className="text-foreground">Monorepo Structure</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-4">Recommended Monorepo Directory Structure</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            The following structure organizes all extracted libraries, data files, and generated binaries in the Kubric monorepo. This prevents GPL/AGPL contamination while maximizing intelligence reuse.
          </p>

          <div className="bg-foreground text-white p-6 mb-8 font-mono text-xs">
            <p className="text-green-400 mb-1"># Kubric Monorepo — Top-Level</p>
            <p className="text-white/80">kubric/</p>
            <p className="text-white/60">├── cmd/          <span className="text-white/40"># Service binaries</span></p>
            <p className="text-white/60">├── pkg/          <span className="text-white/40"># Shared Go packages</span></p>
            <p className="text-white/60">├── vendor/       <span className="text-white/40"># GPL/CC0 data files (NOT compiled code)</span></p>
            <p className="text-white/60">├── frontend/     <span className="text-white/40"># TypeScript customer portal</span></p>
            <p className="text-white/60">├── go.work       <span className="text-white/40"># Go workspace</span></p>
            <p className="text-white/60">├── Cargo.toml    <span className="text-white/40"># Rust workspace</span></p>
            <p className="text-white/60">└── pyproject.toml <span className="text-white/40"># Python workspace</span></p>
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Directory Path</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Contents</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Key Libraries / Files</th>
                </tr>
              </thead>
              <tbody>
                {dirs.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-secondary/30"}`}>
                    <td className="px-4 py-3">
                      <code className="text-[10px] font-mono text-brand-orange bg-orange-50 px-2 py-1 whitespace-nowrap">{row.path}</code>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-foreground">{row.contents}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.keyFiles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  );
}
