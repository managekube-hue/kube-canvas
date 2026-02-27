/** v2.0 spec copy: Kubric UIDR (How_It_works.docx pp.8-9) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const detectionGroups = [
  { title: "Infrastructure Detection", items: ["Asset discovery and inventory", "Configuration baseline monitoring", "Network performance anomaly detection", "Endpoint compliance monitoring", "Application behavior analysis"] },
  { title: "Security Detection", items: ["Identity and authentication monitoring", "Network traffic analysis (east-west and north-south)", "Cloud posture and workload monitoring", "Data movement and exfiltration detection", "Application runtime attack containment", "Software supply chain integrity monitoring"] },
  { title: "Intelligence Detection", items: ["Vulnerability scanning with EPSS prioritization", "External attack surface mapping", "Threat intelligence correlation", "Deception network monitoring"] },
  { title: "Operations Detection", items: ["Configuration drift detection", "Backup integrity monitoring"] },
];

const lifecycle = [
  { step: "Step 1: Hunt", desc: "Continuous, proactive scanning for anomalies — not exclusively known-bad patterns. The platform hunts even when no alert has fired." },
  { step: "Step 2: Identify", desc: "When a signal is detected, it is validated against context from every other capability. Is this IP associated with known threat infrastructure? Has this user exhibited this behavior previously? Is this configuration drift or an authorized change?" },
  { step: "Step 3: Alert", desc: "Validated findings become alerts. Alerts carry context from across the full platform — not only the domain where the signal originated. Severity is assigned based on true environmental context, not raw CVSS scores." },
  { step: "Step 4: Triage", desc: "Analysts review every alert. False positives are eliminated with documented rationale. True positives are escalated with full context attached." },
  { step: "Step 5: Diagnose", desc: "Root cause analysis commences automatically. The platform reconstructs the attack chain using data from every affected capability." },
  { step: "Step 6: Remediate", desc: "Response actions are executed and documented: account suspension, network isolation, credential rotation, configuration restoration. Every action is recorded with analyst attribution." },
  { step: "Step 7: Document", desc: "Evidence is packaged automatically for compliance, cyber insurance, and legal purposes. The audit trail writes itself." },
  { step: "Step 8: Close", desc: "The incident is verified closed. A post-incident review is conducted. Prevention recommendations are permanently filed within the platform." },
];

const delivers = [
  "23 detection capabilities running concurrently",
  "Cross-domain correlation at ingestion, not investigation",
  "Behavioral baselines that learn your specific environment",
  "Methodology-enforced incident lifecycle from hunt through close",
  "Automatic evidence collection for every closed incident",
];

export default function KubricUidr() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex items-center" style={{ background: "#1D1D1B", minHeight: "48vh", paddingTop: "9rem", paddingBottom: "5rem" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.97) 40%, rgba(29,29,27,0.65) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 55%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>How It Works — Kubric UIDR</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              Unified Intelligent Detection & Response
            </h1>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#993619", marginBottom: "12px" }}>Detection Used to Mean Signatures. Now It Means Correlation.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Intro ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "24px" }}>
            Traditional detection looks for known-bad patterns — signatures, indicators of compromise, hash matches. These remain necessary. They are no longer sufficient. Modern attacks use valid credentials. They traverse legitimate protocols. They blend with normal traffic until the precise moment they execute their objective.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            Kubric UIDR is the detection engine that powers every ManageKube service. It does not rely on signatures alone. It analyzes behavior. It correlates across domains. It establishes what normal looks like — for your environment, your users, your systems — and alerts when activity deviates.
          </p>
        </div>
      </section>

      {/* ── What UIDR Actually Does ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What UIDR Actually Does</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            UIDR ingests high-fidelity telemetry from every source in your environment and routes it through 20 purpose-built detection capabilities simultaneously. Each capability is optimized for its domain. Each writes findings to the same graph. Each triggers the same methodology.
          </p>
          <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {detectionGroups.map((group, i) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#FEFBF6", padding: "28px", borderTop: "2px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "16px" }}>{group.title}</h4>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {group.items.map(item => (
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

      {/* ── Eight-Stage Lifecycle ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>How Detection Works — The Eight-Stage Lifecycle</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            This is not a checklist. It is the operational workflow the platform strictly enforces. Every detection capability follows the same process without exception:
          </p>
          <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
            {lifecycle.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                style={{ background: "#FEFBF6", padding: "24px", borderLeft: "3px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "6px" }}>{s.step}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What UIDR Delivers ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What UIDR Delivers</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "48px" }}>
            {delivers.map(item => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "14px" }}>
                <CheckCircle size={13} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#393837" }}>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Get Started <ArrowRight size={14} />
            </Link>
            <Link to="/how-it-works/kubric-data-graph" className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid #1D1D1B", color: "#1D1D1B", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              View Kubric Data Graph
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}