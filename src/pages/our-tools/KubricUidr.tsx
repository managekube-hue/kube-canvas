/** DO NOT TOUCH — v2.0 spec copy (How_It_works.docx pp.8-9) */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const detectionGroups = [
  {
    title: "Infrastructure Detection",
    items: [
      "Asset discovery and inventory",
      "Configuration baseline monitoring",
      "Network performance anomaly detection",
      "Endpoint compliance monitoring",
      "Application behavior analysis",
    ],
  },
  {
    title: "Security Detection",
    items: [
      "Identity and authentication monitoring",
      "Network traffic analysis (east-west and north-south)",
      "Cloud posture and workload monitoring",
      "Data movement and exfiltration detection",
      "Application runtime attack containment",
      "Software supply chain integrity monitoring",
    ],
  },
  {
    title: "Intelligence Detection",
    items: [
      "Vulnerability scanning with EPSS prioritization",
      "External attack surface mapping",
      "Threat intelligence correlation",
      "Deception network monitoring",
    ],
  },
  {
    title: "Operations Detection",
    items: [
      "Configuration drift detection",
      "Backup integrity monitoring",
    ],
  },
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
  "20 detection capabilities running concurrently",
  "Cross-domain correlation at ingestion, not investigation",
  "Behavioral baselines that learn your specific environment",
  "Methodology-enforced incident lifecycle from hunt through close",
  "Automatic evidence collection for every closed incident",
];

export default function KubricUidr() {
  return (
    <PageLayout>
      <PageBanner
        title="Unified Intelligent Detection & Response"
        subtitle="Detection Used to Mean Signatures. Now It Means Correlation."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p className="text-muted-foreground leading-relaxed mb-8">
            Traditional detection looks for known-bad patterns — signatures, indicators of compromise, hash matches. These remain necessary. They are no longer sufficient. Modern attacks use valid credentials. They traverse legitimate protocols. They blend with normal traffic until the precise moment they execute their objective.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-16">
            Kubric UIDR is the detection engine that powers every ManageKube service. It does not rely on signatures alone. It analyzes behavior. It correlates across domains. It establishes what normal looks like — for your environment, your users, your systems — and alerts when activity deviates.
          </p>

          <h2 className="text-2xl font-black text-foreground mb-6">What UIDR Actually Does</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            UIDR ingests high-fidelity telemetry from every source in your environment and routes it through 20 purpose-built detection capabilities simultaneously. Each capability is optimized for its domain. Each writes findings to the same graph. Each triggers the same methodology.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {detectionGroups.map((group, i) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-brand-orange font-bold mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Eight-Stage Lifecycle */}
          <h2 className="text-2xl font-black text-foreground mb-4">How Detection Works — The Eight-Stage Lifecycle</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            This is not a checklist. It is the operational workflow the platform strictly enforces. Every detection capability follows the same process without exception:
          </p>

          <div className="space-y-4 mb-16">
            {lifecycle.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-2">{s.step}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* What UIDR Delivers */}
          <h2 className="text-2xl font-black text-foreground mb-6">What UIDR Delivers</h2>
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
            <Link to="/how-it-works/kubric-data-graph" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View Kubric Data Graph
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
