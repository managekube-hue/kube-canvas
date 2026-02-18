import { DocsLayout } from "@/components/DocsLayout";
import { motion } from "framer-motion";

const licenses = [
  { license: "MIT", canEmbed: true, integration: "go.mod import or pip install", examples: "MicroMDM, go-chi, gitleaks config", keyLibraries: "MicroMDM, FleetDM, Gitleaks, chi, pgx, Ollama, Vapi SDK" },
  { license: "Apache 2.0", canEmbed: true, integration: "go.mod / Cargo.toml import", examples: "Nuclei engine, Trivy scanner, OPA, eBPF, OTel SDK", keyLibraries: "Nuclei, Trivy, OPA, RITA, BloodHound, OpenTelemetry, Aya-rs, CloudQuery, Falco" },
  { license: "BSD-2 / BSD-3", canEmbed: true, integration: "Cargo.toml / go.mod / vendor scripts", examples: "Restic backup lib, YARA-X compiler, Zeek scripts as data", keyLibraries: "Restic, YARA-X, Zeek scripts, libpcap" },
  { license: "LGPL 2.1/3.0", canEmbed: true, integration: "FFI (bindgen) or dynamic .so link only — no static embed", examples: "nDPI libndpi.a via Rust bindgen, OpenSCAP Python binding", keyLibraries: "OpenSCAP binding, nDPI (C lib)" },
  { license: "MPL 2.0", canEmbed: true, integration: "go.mod import; keep MPL files separate from proprietary code", examples: "Terraform CDK for IaC module", keyLibraries: "Terraform CDK, HashiCorp libs" },
  { license: "GPL 2.0 (rules/data)", canEmbed: true, integration: "Vendor YAML/rules/XML as data files in /vendor dir; load at runtime", examples: "All detection rules (25,000+), Wazuh rules, Suricata .rules files", keyLibraries: "Sigma rules, Suricata ET rules, Wazuh rules, OpenVAS NVTs" },
  { license: "GPL 3.0 (library)", canEmbed: false, integration: "Use as subprocess (exec.Command) or separate service via REST/NATS", examples: "RITA as separate service; Ansible Python subprocess", keyLibraries: "RITA v5, Ansible, SaltStack" },
  { license: "AGPL 3.0", canEmbed: false, integration: "Execute as child process (os.exec) NOT imported lib; communicate via stdin/REST", examples: "Cortex analyzers, TruffleHog detection (subprocess), TheHive schema", keyLibraries: "TruffleHog, TheHive, Cortex, Velociraptor, Cortex Responders" },
  { license: "CC0 / Public Domain", canEmbed: true, integration: "Copy directly to vendor/ or fetch via API", examples: "All MISP data, NIST 800-53 content", keyLibraries: "MISP Taxonomies, MISP Galaxies, NIST OSCAL, CISA KEV" },
  { license: "CC BY 4.0", canEmbed: true, integration: "Vendor the JSON; credit MITRE/FIRST in docs", examples: "enterprise-attack.json, epss_scores, semantic conventions", keyLibraries: "MITRE ATT&CK, EPSS Scores, OTel Semconv" },
  { license: "Commercial ToS", canEmbed: true, integration: "HTTP/REST API integration only; no source copy", examples: "KAI-COMM voice stack, payment processing, OTX threat feed", keyLibraries: "Vapi, Deepgram, ElevenLabs, Stripe, AlienVault OTX" },
];

export default function DocsLicenseMatrix() {
  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <a href="/docs" className="hover:text-brand-orange transition-colors">Docs</a>
            <span>/</span>
            <span className="text-foreground">License Compliance</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-4">License Compliance Matrix</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Summary of all licenses across the 120,000+ intelligence assets and their safe integration pattern into the Kubric commercial monorepo.
          </p>

          {/* Legend */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { color: "bg-green-500", label: "Can Embed Directly", desc: "Import via go.mod, pip, or Cargo.toml" },
              { color: "bg-yellow-500", label: "Vendor as Data Only", desc: "GPL rules/data files loaded at runtime" },
              { color: "bg-blue-500", label: "FFI / Dynamic Link", desc: "LGPL libraries linked dynamically" },
              { color: "bg-red-500", label: "Subprocess / Sidecar Only", desc: "AGPL/GPL 3.0 must not be imported" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 p-4 border border-border">
                <span className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">License</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Embed?</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Key Libraries</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Integration Method</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Kubric Examples</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-secondary/30"}`}>
                    <td className="px-4 py-3 font-bold text-xs text-foreground">{row.license}</td>
                    <td className="px-4 py-3">
                      {row.canEmbed
                        ? <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5">✅ Yes</span>
                        : <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5">⚠ Subprocess only</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.keyLibraries}</td>
                    <td className="px-4 py-3 text-xs text-foreground">{row.integration}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.examples}</td>
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
