/** DO NOT TOUCH — v2.0 spec copy (How_It_works.docx pp.12-14) */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const models = [
  { name: "Behavioral Baselines", desc: "LSTM (Long Short-Term Memory) neural networks trained on datasets such as HIKARI-2021 and your own environmental telemetry establish normal traffic, access, and behavioral patterns per entity." },
  { name: "Malware Classification", desc: "Advanced XGBoost models trained on corpora such as EMBER 2018 score executable files for malicious probability entirely without signature dependency." },
  { name: "Anomaly Detection", desc: "Random forest models identify network and identity anomalies that deviate from established behavioral baselines." },
  { name: "Priority Scoring", desc: "Ensemble models combining EPSS, asset criticality, threat intelligence, and attack path analysis score every finding for real-world priority." },
  { name: "Recommendation Models", desc: "Models trained on historical incident resolutions recommend containment and remediation actions based on attack type, entities involved, and environmental context." },
];

const delivers = [
  "70–90% noise reduction — your analysts receive fewer, higher-fidelity alerts",
  "Priority-scored findings — your team addresses what minimizes actual risk",
  "Actionable recommendations — containment and response initiate faster",
  "Continuous learning — the platform improves with every closed incident",
  "Analyst efficiency — more critical incidents resolved per analyst hour",
];

export default function KubricAi() {
  return (
    <PageLayout>
      <PageBanner
        title="The Intelligence Layer That Reduces Noise and Prioritizes What Matters"
        subtitle="More Data Does Not Mean More Clarity. It Means More Noise."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p className="text-muted-foreground leading-relaxed mb-8">
            The average enterprise generates more security telemetry than its team can physically review. Alerts fire. Logs accumulate. Findings compound. The true signal is buried. Your team spends its operational hours filtering rather than responding — and the adversary moves freely in the gap.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-16">
            KubricAI is the intelligence layer engineered to resolve this structural failure. It does not add more data. It extracts the actionable signal. Machine learning models analyze every finding, every relationship, and every baseline deviation — then mathematically determine what demands attention.
          </p>

          <h2 className="text-2xl font-black text-foreground mb-6">What KubricAI Actually Does</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            KubricAI operates continuously across four high-impact functions:
          </p>

          {/* 1. Noise Reduction */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-4">1. Noise Reduction</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every detection capability generates findings. Most are benign. Some are malicious. KubricAI learns the operational difference between them.
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                Behavioral baselines are constructed per entity — user, device, application, network segment — and refined continuously over time.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                Deviations are scored against hyper-local baselines. A senior finance executive authenticating at 6:00 AM is operationally normal. The identical login pattern from an IT support account is flagged.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                False positive patterns are learned and encoded. When an alert type consistently resolves to a benign state, KubricAI automatically adjusts its sensitivity threshold.
              </li>
            </ul>
            <p className="text-sm font-semibold text-foreground">Result: Your analysts see fewer alerts. The alerts they receive are actionable.</p>
          </div>

          {/* 2. Priority Scoring */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-4">2. Priority Scoring</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Not all true positives carry equivalent risk. A vulnerability on an internet-facing critical asset requires a categorically different response than the same vulnerability on an isolated test system. KubricAI computes that distinction.
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                Asset criticality is modeled directly in the graph: internet-facing, business-critical, or containing regulated data.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                Vulnerability exploitability is scored using EPSS (Exploit Prediction Scoring System) — evaluating real-world probability of exploitation, not CVSS severity alone.
              </li>
            </ul>
          </div>

          {/* 3. Recommendation Generation */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-4">3. Recommendation Generation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every alert arrives with a recommended action. Analysts do not start from zero.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For known incident types, KubricAI recommends remediation steps derived from past closed incidents. For novel incidents, KubricAI analyzes the attack chain and recommends containment actions — account suspension, network isolation, credential rotation — specific to the entities involved. For vulnerabilities, KubricAI recommends patch priority, compensating controls, or risk acceptance based on environmental context.
            </p>
            <p className="text-sm font-semibold text-foreground">Result: Response time decreases. Consistency increases. Institutional knowledge becomes platform knowledge.</p>
          </div>

          {/* 4. Continuous Learning */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-foreground mb-4">4. Continuous Learning</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              KubricAI learns from every analyst decision, every closed incident, and every false positive dismissal.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When an analyst marks an alert as a false positive, KubricAI mathematically updates its model for that alert type. When an incident closes, KubricAI analyzes the complete attack chain and dynamically updates its detection logic. When remediation actions are executed, KubricAI records which actions proved effective for which incident types.
            </p>
            <p className="text-sm font-semibold text-foreground">Result: The platform becomes more precise over time. Your environment becomes progressively harder to breach.</p>
          </div>

          {/* The Models Behind KubricAI */}
          <h2 className="text-2xl font-black text-foreground mb-6">The Models Behind KubricAI</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            KubricAI is not a wrapper for a general-purpose language model. It runs purpose-built, domain-specific machine learning models continuously:
          </p>
          <div className="space-y-4 mb-8">
            {models.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-2">{m.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-16">
            All models run continuously. All models learn from your environment. All models are tuned by analysts who understand your business.
          </p>

          {/* What KubricAI Delivers */}
          <h2 className="text-2xl font-black text-foreground mb-6">What KubricAI Delivers</h2>
          <ul className="space-y-3 mb-16">
            {delivers.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-layer" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              Explore the Service Layer
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
