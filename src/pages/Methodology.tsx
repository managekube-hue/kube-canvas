/**
 * Methodology Page — 8-Step Closed Lifecycle
 * Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";

const steps = [
  {
    number: "01",
    label: "HUNT",
    summary: "Proactive threat hunting before automated detection fires.",
    description: "Continuous search for indicators adversaries leave behind — identifying attacker presence before tooling catches it.",
  },
  {
    number: "02",
    label: "IDENTIFY",
    summary: "Signal confirmation and environment-wide context enrichment.",
    description: "Detection validation combined with full-scope assessment across every affected system and domain.",
  },
  {
    number: "03",
    label: "ALERT",
    summary: "Prioritized notification with severity and recommended action.",
    description: "Your team receives direction, not noise. Every alert carries severity classification, contextual detail, and recommended immediate action.",
  },
  {
    number: "04",
    label: "TRIAGE",
    summary: "Analyst-led review and escalation determination.",
    description: "False positive elimination and escalation determination with documented rationale at every decision point.",
  },
  {
    number: "05",
    label: "DIAGNOSE",
    summary: "Root cause analysis and full lateral extent mapping.",
    description: "Patient-zero identification. Incidents are understood, not merely stopped. Full attack chain reconstruction.",
  },
  {
    number: "06",
    label: "REMEDIATE",
    summary: "Containment, correction, and verification.",
    description: "Every action documented in real time. No steps abbreviated. No assumptions substituted for confirmed resolution.",
  },
  {
    number: "07",
    label: "DOCUMENT",
    summary: "Evidence packaging for compliance and post-incident review.",
    description: "Audit packages for compliance, cyber insurance, legal proceedings, and post-incident review assemble automatically as the methodology executes.",
  },
  {
    number: "08",
    label: "CLOSE",
    summary: "Verified resolution and filed prevention recommendation.",
    description: "The incident is closed. The lesson is captured. The probability of recurrence decreases. Prevention recommendations are filed as standard.",
  },
];

const tierCoverage: { stage: string; essentials: boolean; advanced: boolean; enterprise: boolean }[] = [
  { stage: "Hunt", essentials: true, advanced: true, enterprise: true },
  { stage: "Identify", essentials: true, advanced: true, enterprise: true },
  { stage: "Alert", essentials: true, advanced: true, enterprise: true },
  { stage: "Triage", essentials: true, advanced: true, enterprise: true },
  { stage: "Diagnose", essentials: false, advanced: true, enterprise: true },
  { stage: "Remediate", essentials: false, advanced: true, enterprise: true },
  { stage: "Document", essentials: false, advanced: false, enterprise: true },
  { stage: "Close", essentials: false, advanced: false, enterprise: true },
];

const tierDescriptions = [
  { tier: "Essentials", stages: "Hunt → Identify → Alert → Triage", desc: "Detection and triage. Your team knows what occurred and whether it warrants escalation." },
  { tier: "Advanced", stages: "Hunt → Identify → Alert → Triage → Diagnose → Remediate", desc: "Full detection through remediation. Incidents are contained and environments cleaned." },
  { tier: "Enterprise", stages: "Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close", desc: "Complete lifecycle. Every incident is documented, audited, and institutionally learned from." },
];

const Methodology = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Eight Stages. No Gaps. No Shortcuts."
        subtitle="Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close. Every engagement follows this closed lifecycle."
        phase="METHODOLOGY"
      />

      <PageBreadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Service Layer", href: "/service-layer" },
        { label: "Our Methodology" },
      ]} />

      {/* Opening Narrative */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              WHY METHODOLOGY MATTERS
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Most Security Operations End at Alert. Yours Cannot.
            </h2>
            <div className="space-y-5" style={{ fontSize: "15px", lineHeight: 1.75, color: "#393837" }}>
              <p>
                An alert without a defined response is noise with a timestamp. Many managed security programs detect threats competently but lack a documented, repeatable process for what happens next. Triage is inconsistent. Remediation is ad hoc. Evidence is never collected. The same vulnerabilities reappear in the next audit.
              </p>
              <p style={{ fontWeight: 700, color: "#1D1D1B" }}>
                The gap between detection and verified closure is where risk lives.
              </p>
              <p>
                An attacker who is detected but not fully remediated retains their foothold. An incident that is remediated but not documented cannot be learned from. A posture that is assessed but not continuously monitored will drift.
              </p>
              <p>
                The ManageKube methodology closes every stage of that gap — from the moment a threat is hunted to the moment the incident is verified closed and the prevention recommendation is filed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Step Lifecycle */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              THE 8-STEP LIFECYCLE
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "48px" }}>
              Eight Stages. No Gaps. No Shortcuts.
            </h2>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                style={{ borderTop: "1px solid #CDCAC5", padding: "40px 0" }}
              >
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-1">
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(57,56,55,0.35)", letterSpacing: "0.1em" }}>{step.number}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "8px" }}>{step.label}</h3>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#993619", lineHeight: 1.5 }}>{step.summary}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#393837" }}>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Cycle indicator */}
            <div style={{ borderTop: "1px solid #CDCAC5", padding: "32px 0", textAlign: "center" }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#993619", letterSpacing: "0.12em" }}>
                CLOSE → HUNT — The cycle repeats continuously
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What a Closed Methodology Delivers */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              OUTCOMES
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              What a Closed Methodology Actually Delivers
            </h2>
            <div className="space-y-5" style={{ fontSize: "15px", lineHeight: 1.75, color: "#393837" }}>
              <p>
                Your team receives outcomes at every stage — not just an alert and a ticket number. Triage decisions are explained. Remediation steps are documented. Evidence is packaged automatically. The incident closes with a verified resolution, not an assumption.
              </p>
              <p>
                Compliance auditors receive evidence packages without your team scrambling. Post-incident reviews happen because the documentation already exists. Prevention recommendations are filed because root cause analysis happened as part of the methodology — not as an afterthought.
              </p>
              <p style={{ fontWeight: 700, color: "#1D1D1B" }}>
                The methodology is why ManageKube produces fewer repeat incidents over time. Every closed incident makes the next one less likely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Coverage Table */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              TIER COVERAGE
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              Tier Coverage. No Ambiguity.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#393837", marginBottom: "40px", maxWidth: "640px" }}>
              Upgrade paths are defined. Advancing tiers extends methodology depth without re-architecting the underlying service or redeploying platform components.
            </p>

            {/* Table */}
            <div style={{ background: "#FEFBF6", border: "1px solid #CDCAC5", overflow: "hidden" }}>
              <div className="grid grid-cols-4" style={{ borderBottom: "2px solid #993619" }}>
                <div style={{ padding: "16px 24px", fontWeight: 700, fontSize: "12px", color: "#393837", letterSpacing: "0.12em", textTransform: "uppercase" }}>Stage</div>
                <div style={{ padding: "16px 24px", fontWeight: 700, fontSize: "12px", color: "#993619", letterSpacing: "0.12em", textTransform: "uppercase", borderLeft: "1px solid #CDCAC5", textAlign: "center" }}>Essentials</div>
                <div style={{ padding: "16px 24px", fontWeight: 700, fontSize: "12px", color: "#993619", letterSpacing: "0.12em", textTransform: "uppercase", borderLeft: "1px solid #CDCAC5", textAlign: "center" }}>Advanced</div>
                <div style={{ padding: "16px 24px", fontWeight: 700, fontSize: "12px", color: "#993619", letterSpacing: "0.12em", textTransform: "uppercase", borderLeft: "1px solid #CDCAC5", textAlign: "center" }}>Enterprise</div>
              </div>
              {tierCoverage.map((row, i) => (
                <div key={row.stage} className="grid grid-cols-4" style={{ borderBottom: i < tierCoverage.length - 1 ? "1px solid #CDCAC5" : "none" }}>
                  <div style={{ padding: "14px 24px", fontWeight: 600, fontSize: "14px", color: "#1D1D1B" }}>{row.stage}</div>
                  <div style={{ padding: "14px 24px", borderLeft: "1px solid #CDCAC5", textAlign: "center" }}>
                    {row.essentials ? <Check size={16} style={{ color: "#993619", display: "inline" }} /> : <X size={16} style={{ color: "rgba(57,56,55,0.2)", display: "inline" }} />}
                  </div>
                  <div style={{ padding: "14px 24px", borderLeft: "1px solid #CDCAC5", textAlign: "center" }}>
                    {row.advanced ? <Check size={16} style={{ color: "#993619", display: "inline" }} /> : <X size={16} style={{ color: "rgba(57,56,55,0.2)", display: "inline" }} />}
                  </div>
                  <div style={{ padding: "14px 24px", borderLeft: "1px solid #CDCAC5", textAlign: "center" }}>
                    {row.enterprise ? <Check size={16} style={{ color: "#993619", display: "inline" }} /> : <X size={16} style={{ color: "rgba(57,56,55,0.2)", display: "inline" }} />}
                  </div>
                </div>
              ))}
            </div>

            {/* Tier Descriptions */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {tierDescriptions.map((t) => (
                <div key={t.tier} style={{ background: "#FEFBF6", border: "1px solid #CDCAC5", padding: "28px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#993619", marginBottom: "8px" }}>{t.tier}</p>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#1D1D1B", marginBottom: "10px" }}>{t.stages}</p>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#393837" }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Depth Matters */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              DEPTH OVER BREADTH
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Why Methodology Depth Matters More Than Feature Count
            </h2>
            <div className="space-y-5" style={{ fontSize: "15px", lineHeight: 1.75, color: "#393837" }}>
              <p>
                A security capability that detects without remediating leaves an adversary in your environment. A remediation without documentation leaves your compliance team exposed. ManageKube defines SLAs around incident closure — a materially different commitment than the alert response time SLAs that characterize most MSSP engagements.
              </p>
              <ul className="space-y-3" style={{ paddingLeft: "20px" }}>
                <li>The Hunt stage proactively searches for threats automated detection misses — reducing mean time to detect for sophisticated, low-signal attacks</li>
                <li>Post-incident prevention recommendations are filed as standard — not offered as a separate advisory engagement</li>
                <li>Evidence collected during the methodology lifecycle satisfies audit requirements for CMMC, HIPAA, SOC 2, FedRAMP, and additional frameworks without separate evidence-gathering programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#393837", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              SEE THIS IN ACTION
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Ready to close the loop?
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(205,202,197,0.50)", marginBottom: "36px", maxWidth: "500px" }}>
              Complete the assessment to map your current methodology coverage and get a custom score, tier recommendation, and pricing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/assessment/start"
                className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
              >
                Onboard Today <ArrowRight size={14} />
              </Link>
              <Link
                to="/service-tiers"
                className="inline-flex items-center gap-2 font-semibold transition-all"
                style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
              >
                View Service Tiers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Methodology;
