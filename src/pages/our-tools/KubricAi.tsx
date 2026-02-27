/** v2.0 spec copy: KubricAI (How_It_works.docx pp.12-14) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const models = [
  { name: "Behavioral Baselines", desc: "LSTM (Long Short-Term Memory) neural networks trained on datasets such as HIKARI-2021 and your own environmental telemetry establish normal traffic, access, and behavioral patterns per entity." },
  { name: "Malware Classification", desc: "Advanced XGBoost models trained on corpora such as EMBER 2018 score executable files for malicious probability entirely without signature dependency." },
  { name: "Anomaly Detection", desc: "Random forest models identify network and identity anomalies that deviate from established behavioral baselines." },
  { name: "Priority Scoring", desc: "Ensemble models combining EPSS, asset criticality, threat intelligence, and attack path analysis score every finding for real-world priority." },
  { name: "Recommendation Models", desc: "Models trained on historical incident resolutions recommend containment and remediation actions based on attack type, entities involved, and environmental context." },
];

const delivers = [
  "70 to 90% noise reduction: your analysts receive fewer, higher-fidelity alerts",
  "Priority-scored findings: your team addresses what minimizes actual risk",
  "Actionable recommendations: containment and response initiate faster",
  "Continuous learning: the platform improves with every closed incident",
  "Analyst efficiency: more critical incidents resolved per analyst hour",
];

export default function KubricAi() {
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
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>How It Works: KubricAI</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              The Intelligence Layer That Reduces Noise and Prioritizes What Matters
            </h1>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#993619" }}>More Data Does Not Mean More Clarity. It Means More Noise.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Intro ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "24px" }}>
            The average enterprise generates more security telemetry than its team can physically review. Alerts fire. Logs accumulate. Findings compound. The true signal is buried. Your team spends its operational hours filtering rather than responding, and the adversary moves freely in the gap.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            KubricAI is the intelligence layer engineered to resolve this structural failure. It does not add more data. It extracts the actionable signal. Machine learning models analyze every finding, every relationship, and every baseline deviation, then mathematically determine what demands attention.
          </p>
        </div>
      </section>

      {/* ── What KubricAI Actually Does ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What KubricAI Actually Does</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            KubricAI operates continuously across four high-impact functions:
          </p>

          {/* 1. Noise Reduction */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>1. Noise Reduction</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
              Every detection capability generates findings. Most are benign. Some are malicious. KubricAI learns the operational difference between them.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "12px" }}>
              {["Behavioral baselines are constructed per entity (user, device, application, network segment) and refined continuously over time.",
                "Deviations are scored against hyper-local baselines. A senior finance executive authenticating at 6:00 AM is operationally normal. The identical login pattern from an IT support account is flagged.",
                "False positive patterns are learned and encoded. When an alert type consistently resolves to a benign state, KubricAI automatically adjusts its sensitivity threshold."
              ].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                  <CheckCircle size={12} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                  <span style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1D1D1B" }}>Result: Your analysts see fewer alerts. The alerts they receive are actionable.</p>
          </div>

          {/* 2. Priority Scoring */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>2. Priority Scoring</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
              Not all true positives carry equivalent risk. A vulnerability on an internet-facing critical asset requires a categorically different response than the same vulnerability on an isolated test system. KubricAI computes that distinction.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {["Asset criticality is modeled directly in the graph: internet-facing, business-critical, or containing regulated data.",
                "Vulnerability exploitability is scored using EPSS (Exploit Prediction Scoring System) — evaluating real-world probability of exploitation, not CVSS severity alone."
              ].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                  <CheckCircle size={12} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                  <span style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Recommendation Generation */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>3. Recommendation Generation</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
              Every alert arrives with a recommended action. Analysts do not start from zero.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
              For known incident types, KubricAI recommends remediation steps derived from past closed incidents. For novel incidents, KubricAI analyzes the attack chain and recommends containment actions — account suspension, network isolation, credential rotation — specific to the entities involved. For vulnerabilities, KubricAI recommends patch priority, compensating controls, or risk acceptance based on environmental context.
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1D1D1B" }}>Result: Response time decreases. Consistency increases. Institutional knowledge becomes platform knowledge.</p>
          </div>

          {/* 4. Continuous Learning */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>4. Continuous Learning</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
              KubricAI learns from every analyst decision, every closed incident, and every false positive dismissal.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
              When an analyst marks an alert as a false positive, KubricAI mathematically updates its model for that alert type. When an incident closes, KubricAI analyzes the complete attack chain and dynamically updates its detection logic. When remediation actions are executed, KubricAI records which actions proved effective for which incident types.
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1D1D1B" }}>Result: The platform becomes more precise over time. Your environment becomes progressively harder to breach.</p>
          </div>
        </div>
      </section>

      {/* ── The Models Behind KubricAI ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>The Models Behind KubricAI</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            KubricAI is not a wrapper for a general-purpose language model. It runs purpose-built, domain-specific machine learning models continuously:
          </p>
          <div className="space-y-[1px]" style={{ background: "#CDCAC5", marginBottom: "32px" }}>
            {models.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: "#FEFBF6", padding: "24px", borderLeft: "3px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "6px" }}>{m.name}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            All models run continuously. All models learn from your environment. All models are tuned by analysts who understand your business.
          </p>
        </div>
      </section>

      {/* ── What KubricAI Delivers ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What KubricAI Delivers</p>
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
            <Link to="/service-layer" className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid #1D1D1B", color: "#1D1D1B", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Explore the Service Layer
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}