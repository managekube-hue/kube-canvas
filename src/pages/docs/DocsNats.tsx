import { DocsLayout } from "@/components/DocsLayout";
import { motion } from "framer-motion";

const subjects = [
  { subject: "kubric.edr.process.>", publisher: "CoreSec (Rust agent)", consumer: "KAI-TRIAGE (Python)", payload: "OCSF Process (4007)" },
  { subject: "kubric.edr.file.>", publisher: "CoreSec FIM (Rust)", consumer: "KAI-TRIAGE + KIC", payload: "OCSF File (4008)" },
  { subject: "kubric.ndr.flow.>", publisher: "NetGuard (Rust)", consumer: "KAI-FORESIGHT", payload: "OCSF Network (4001)" },
  { subject: "kubric.ndr.beacon.>", publisher: "NetGuard RITA (Go)", consumer: "KAI-TRIAGE", payload: "OCSF Network (4001)" },
  { subject: "kubric.itdr.auth.>", publisher: "CoreSec ITDR (Go)", consumer: "KAI-TRIAGE + KAI Identity", payload: "OCSF Auth (3002)" },
  { subject: "kubric.vdr.vuln.>", publisher: "VDR Scanner (Go)", consumer: "KAI-KEEPER", payload: "OCSF Vuln (2002)" },
  { subject: "kubric.grc.drift.>", publisher: "KIC (Go)", consumer: "KAI-KEEPER", payload: "OCSF Config (5003)" },
  { subject: "kubric.svc.ticket.>", publisher: "K-SVC (Go)", consumer: "KAI-CLERK", payload: "OCSF Incident (8002)" },
  { subject: "kubric.billing.usage.>", publisher: "All DR modules", consumer: "KAI-CLERK (Python)", payload: "OCSF + custom" },
  { subject: "kubric.health.score.>", publisher: "KAI-SENTINEL", consumer: "K-SVC Portal (TS)", payload: "JSON health score" },
  { subject: "kubric.ti.ioc.>", publisher: "SIDR TI (Go)", consumer: "NetGuard + CoreSec", payload: "STIX IoC" },
  { subject: "kubric.comm.alert.>", publisher: "KAI-TRIAGE", consumer: "KAI-COMM (JS)", payload: "Alert payload" },
];

const integrations = [
  { point: "KAI → CoreSec (EDR)", library: "NATS.io (Go)", importPath: 'import "github.com/nats-io/nats.go"', license: "Apache 2.0", comm: "Pub OCSF events on subject: kubric.edr.>" },
  { point: "KAI → NetGuard (NDR)", library: "NATS JetStream (Go)", importPath: "js, _ := nc.JetStream()", license: "Apache 2.0", comm: "Durable consumer on kubric.ndr.>" },
  { point: "KAI → KIC (GRC)", library: "NATS Request-Reply", importPath: 'nc.Request("kubric.grc.control", ...)', license: "Apache 2.0", comm: "Command/control for compliance triggers" },
  { point: "KAI → K-SVC (PSA)", library: "Temporal Go SDK", importPath: 'import "go.temporal.io/sdk/client"', license: "MIT", comm: "Durable workflow for billing/ticketing" },
  { point: "KAI → VDR", library: "NATS + Temporal", importPath: "Workflow: scan → score → remediate", license: "Apache 2.0/MIT", comm: "Orchestrated scan-to-patch pipeline" },
  { point: "KAI → SIDR TI", library: "NATS KV Store (Go)", importPath: 'js.KeyValue("threat-intel")', license: "Apache 2.0", comm: "Shared KV for IOC lookups" },
  { point: "KAI → ClickHouse", library: "ClickHouse Go Driver", importPath: 'import "github.com/ClickHouse/clickhouse-go/v2"', license: "Apache 2.0", comm: "Telemetry lakehouse writes" },
  { point: "KAI → PostgreSQL", library: "pgx (Go)", importPath: 'import "github.com/jackc/pgx/v5"', license: "MIT", comm: "PSA billing, contracts, ledger" },
  { point: "KAI → Neo4j", library: "Neo4j Go Driver", importPath: 'import "github.com/neo4j/neo4j-go-driver/v5/neo4j"', license: "Apache 2.0", comm: "Identity graph (BloodHound schema)" },
  { point: "KAI → LLM (Local)", library: "Ollama REST API", importPath: "POST http://localhost:11434/api/generate", license: "MIT", comm: "LLM inference for triage/analysis" },
  { point: "KAI → CrewAI", library: "CrewAI Python", importPath: "from crewai import Agent, Task, Crew", license: "MIT", comm: "Multi-agent orchestration" },
  { point: "KAI → Voice (COMM)", library: "Vapi REST API", importPath: "POST https://api.vapi.ai/call", license: "Commercial ToS", comm: "Voice alerts via KAI-COMM" },
  { point: "KAI → Stripe", library: "Stripe Go SDK", importPath: 'import "github.com/stripe/stripe-go/v76"', license: "MIT", comm: "Payment processing for KAI-CLERK" },
  { point: "PSA → Zammad", library: "Zammad REST API", importPath: "GET/POST https://zammad/api/v1/tickets", license: "AGPL 3.0, API", comm: "ITSM ticketing bridge" },
  { point: "Service → Gateway", library: "go-chi Router (Go)", importPath: 'import "github.com/go-chi/chi/v5"', license: "MIT", comm: "Kubric API gateway routing" },
];

export default function DocsNats() {
  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <a href="/docs" className="hover:text-brand-orange transition-colors">Docs</a>
            <span>/</span>
            <span className="text-foreground">NATS Message Bus</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-4">NATS Message Bus: Subject Hierarchy</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            All KAI-to-module and module-to-module communication uses the following NATS subject taxonomy. JetStream provides persistence and consumer groups for guaranteed delivery.
          </p>

          <div className="bg-foreground text-white p-6 mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2">🔌 Integration Architecture</p>
            <p className="text-white/80 leading-relaxed">
              KAI speaks to all DR modules via NATS subjects (kubric.&lt;module&gt;.&lt;event&gt;). Durable billing/PSA flows use Temporal workflows. LLM inference stays local via Ollama REST. All data writes flow through the ClickHouse Go driver for the telemetry lakehouse.
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-4">KAI Layer Integration Points</h2>
          <div className="overflow-x-auto border border-border mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Integration Point</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Library / SDK</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Import / Endpoint</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">License</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Communication</th>
                </tr>
              </thead>
              <tbody>
                {integrations.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-secondary/30"}`}>
                    <td className="px-4 py-3 font-semibold text-brand-orange text-xs">{row.point}</td>
                    <td className="px-4 py-3 text-xs font-medium text-foreground">{row.library}</td>
                    <td className="px-4 py-3"><code className="text-[10px] bg-secondary px-2 py-1 font-mono">{row.importPath}</code></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.license}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-4">NATS Subject Hierarchy</h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">NATS Subject</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Publisher</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Consumer</th>
                  <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Payload</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-secondary/30"}`}>
                    <td className="px-4 py-3"><code className="text-[10px] font-mono text-brand-orange bg-orange-50 px-2 py-1">{row.subject}</code></td>
                    <td className="px-4 py-3 text-xs text-foreground">{row.publisher}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.consumer}</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{row.payload}</td>
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
