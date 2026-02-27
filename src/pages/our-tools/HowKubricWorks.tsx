/** v2.0 spec copy: Platform Overview (How_It_works.docx pp.5-7) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const layers = [
  { title: "The Ingestion Layer", desc: "Collects telemetry from every source in your environment — endpoints, network flows, cloud APIs, identity providers, applications, and data stores. Every raw signal is normalized into a strict, common schema at the moment of ingest." },
  { title: "The Detection Layer", desc: "Runs 20 purpose-built capabilities across four operational disciplines. Each capability is tuned for its domain. Each writes findings to the same underlying graph database." },
  { title: "The Graph Layer", desc: "Correlates every signal against every other signal in real time. Entities — users, devices, IP addresses, files, applications — are connected automatically. Relationships are mapped continuously." },
  { title: "The Intelligence Layer", desc: "Applies machine learning, behavioral baselines, and threat intelligence to every finding. Noise is filtered. Priority is assigned. Recommended actions are generated." },
];

const capabilities: Record<string, string[]> = {
  "Infrastructure & Operations": ["Core Infrastructure Orchestration", "Network Performance Monitoring", "Mobile Device Management", "Application Performance Monitoring"],
  "Security Detection & Response": ["Identity Threat Detection & Response (ITDR)", "Network Threat Detection & Response (NDR)", "Cloud Detection & Response (CDR)", "Data Exfiltration Detection & Response (DEDR)", "Application Threat Containment", "Software Supply Chain Detection & Response"],
  "Intelligence & Risk": ["Vulnerability Detection & Prioritization", "External Attack Surface Management (EASM)", "STRIKE Strategic Intelligence", "Honeypot & Deception Network"],
  "Operations & Continuity": ["Configuration Drift Detection & Correction", "Backup & Disaster Recovery"],
};

const unifiers = [
  { title: "1. The Data Graph", desc: "Every signal from every capability writes to the same entity-relationship graph. When an identity anomaly and a network beacon occur simultaneously across the same user and device, they are connected automatically — not joined in a post-hoc query." },
  { title: "2. The Methodology", desc: "Every detection follows the same eight-stage lifecycle: Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close. No gaps. No shortcuts. No incident closes without a documented resolution." },
  { title: "3. The AI Layer", desc: "KubricAI learns from every detection, every analyst decision, and every closed incident. Over time, noise decreases, priority accuracy increases, and recommendations become more precise." },
];

const deliveryModels = [
  { name: "Fully Managed", desc: "We operate everything. Your team receives outcomes." },
  { name: "Co-Managed", desc: "We operate the engine. Your team participates in response." },
  { name: "Self-Managed", desc: "You operate the toolset. We provide the architecture." },
];

export default function HowKubricWorks() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex items-center min-h-screen" style={{ background: "#0C0C0C" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.80) 25%, rgba(12,12,12,0.45) 60%, rgba(12,12,12,0.25) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,0.90) 0%, transparent 40%, rgba(12,12,12,0.35) 100%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10 py-32 lg:py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>How It Works — Service Overview</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              One Service Provider. Twenty Capabilities. Zero Tool Sprawl.
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(205,202,197,0.70)", maxWidth: "640px" }}>
              How ManageKube delivers: what we do, how we do it, and why it is different.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── The Problem with Vendors ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>The Problem with Vendors</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "24px" }}>
            Most providers assemble a collection of acquired products under a single contract vehicle. But if the data does not unify, if detection does not correlate, and if the interface does not connect — it is not a service provider. It is a reseller with a dashboard.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            A genuine service provider has one data layer. One detection engine. One investigation workflow. One architecture. That is what ManageKube delivers.
          </p>
        </div>
      </section>

      {/* ── What Kubric Actually Is ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What Kubric Actually Is</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            Kubric is the proprietary detection and response engine that powers every ManageKube service. It is not a SIEM. It is not an open-source distribution rebranded under a managed services wrapper. It is an integrated engine engineered specifically for cross-discipline threat correlation — operated by analysts who understand your environment, delivered as a service your organization consumes.
          </p>

          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1D1D1B", marginBottom: "24px" }}>The engine is composed of four engineered layers:</h3>
          <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5", marginBottom: "32px" }}>
            {layers.map((layer, i) => (
              <motion.div key={layer.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#FEFBF6", padding: "28px", borderTop: "2px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "8px" }}>{layer.title}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{layer.desc}</p>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            All four layers operate continuously. All four feed the same methodology. All four are managed by the same team.
          </p>
        </div>
      </section>

      {/* ── The 23 Capabilities ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>The 23 Capabilities</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "32px" }} />
          <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {Object.entries(capabilities).map(([cat, items], i) => (
              <motion.div key={cat} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#FEFBF6", padding: "28px", borderTop: "2px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "16px" }}>{cat}</h4>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                      <CheckCircle size={12} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ fontSize: "13px", lineHeight: 1.5, color: "#393837" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Unifies Them ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What Unifies Them</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            Three architectural decisions elevate Kubric from a product collection to a genuine service provider:
          </p>
          <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
            {unifiers.map((u, i) => (
              <motion.div key={u.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#FEFBF6", padding: "28px", borderLeft: "3px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>{u.title}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Delivers ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>How It Delivers</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            Kubric is delivered as a managed service. Your organization does not maintain it, tune it, or staff it. Our engineers operate it continuously. Your team receives outcomes continuously. Three delivery models accommodate your operational structure:
          </p>
          <div className="grid md:grid-cols-3 gap-[1px]" style={{ background: "#CDCAC5", marginBottom: "48px" }}>
            {deliveryModels.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#FEFBF6", padding: "28px", borderTop: "2px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "8px" }}>{m.name}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Get Started <ArrowRight size={14} />
            </Link>
            <Link to="/service-tiers" className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid #1D1D1B", color: "#1D1D1B", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}