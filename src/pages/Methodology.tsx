/**
 * Methodology Page — Hunt → Detect → Respond → Recover lifecycle
 * with Fully Managed vs Co-Managed comparison
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Search, Shield, Zap, RefreshCw } from "lucide-react";

const phases = [
  {
    number: "01",
    label: "HUNT",
    icon: Search,
    description: "Proactive threat hunting across your entire attack surface. We don't wait for alerts — we go looking. Our analysts comb through telemetry, behavioral anomalies, and threat intelligence feeds to identify risks before they materialize into incidents.",
    capabilities: ["External Attack Surface Management (EASM)", "Vulnerability Detection & Prioritization", "Threat Intelligence Correlation", "Configuration Drift Detection", "Honeypot & Deception Networks"],
    methodology: "Hunt → Identify → Alert",
  },
  {
    number: "02",
    label: "DETECT",
    description: "Real-time detection across every layer of your stack — identity, network, cloud, application, endpoint, and data. Correlated alerts, not noise. Every detection is enriched with context from the Kubric Data Graph before it reaches an analyst.",
    icon: Shield,
    capabilities: ["Identity Threat Detection & Response (ITDR)", "Network Detection & Response (NDR)", "Cloud Detection & Response (CDR)", "Application Detection & Response (ADR)", "Software Supply Chain Detection (SDR)", "Data Exfiltration Detection (DDR)"],
    methodology: "Alert → Triage → Diagnose",
  },
  {
    number: "03",
    label: "RESPOND",
    icon: Zap,
    description: "Automated containment and expert-led remediation. When a threat is confirmed, playbooks execute in seconds — isolating endpoints, revoking credentials, blocking lateral movement. Our SOC analysts handle escalation, communication, and forensic documentation.",
    capabilities: ["Automated Playbook Execution", "Endpoint Isolation & Containment", "Credential Revocation", "Lateral Movement Blocking", "Incident Communication & Reporting", "Forensic Evidence Preservation"],
    methodology: "Diagnose → Remediate → Document",
  },
  {
    number: "04",
    label: "RECOVER",
    icon: RefreshCw,
    description: "Restore operations, harden defenses, and close the loop. Every incident produces a post-mortem, updated playbooks, and hardened configurations. Backup and disaster recovery ensures business continuity while compliance documentation is generated automatically.",
    capabilities: ["Backup & Disaster Recovery (BDR)", "Post-Incident Hardening", "Compliance Evidence Generation", "Playbook Updates & Tuning", "Quarterly Business Reviews", "Strategic Roadmap Updates"],
    methodology: "Document → Close → Hunt (cycle repeats)",
  },
];

const managementComparison = [
  {
    category: "Operations",
    fully: "We run your NOC, SOC, help desk, and compliance — 24/7/365. Your team focuses on business outcomes.",
    co: "Your team handles day-to-day operations. We provide the platform, playbooks, and escalation support when needed.",
  },
  {
    category: "Staffing",
    fully: "Dedicated analysts, engineers, and a virtual CIO/CISO assigned to your account.",
    co: "Your existing IT/security staff operates the tools. Our engineers are available for escalation and complex issues.",
  },
  {
    category: "Tooling",
    fully: "Full Kubric platform deployed, configured, and managed by our team. You get dashboards and reports.",
    co: "Full Kubric platform access. Your team configures and operates. We provide training and documentation.",
  },
  {
    category: "Response",
    fully: "Our SOC responds to incidents directly — containment, remediation, and communication handled end-to-end.",
    co: "Alerts routed to your team first. Our SOC is available for escalation, joint investigation, and overflow.",
  },
  {
    category: "Compliance",
    fully: "We maintain your compliance posture continuously — evidence collection, audit prep, and remediation.",
    co: "Platform automates evidence collection. Your team manages the compliance program with our advisory support.",
  },
  {
    category: "Ideal For",
    fully: "Organizations without a dedicated security team, or those wanting to offload operations entirely.",
    co: "Organizations with an existing IT/security team that needs better tools, visibility, and backup.",
  },
];

const Methodology = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Hunt. Detect. Respond. Recover."
        subtitle="A continuous lifecycle — not a one-time project. Every engagement follows this proven cycle, powered by 18 detection and response modules."
        phase="METHODOLOGY"
      />

      {/* Lifecycle Phases */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              The Lifecycle
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "56px", maxWidth: "640px" }}>
              Security isn't a destination — it's a cycle. Every module in the Service Layer maps to one or more phases of this lifecycle. The methodology scales from 7 modules (Essentials) to all 18 (Enterprise).
            </p>

            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ borderTop: "1px solid #CDCAC5", padding: "48px 0" }}
                >
                  <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-1 flex items-start gap-3">
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(57,56,55,0.35)", letterSpacing: "0.1em" }}>{phase.number}</span>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div style={{ width: "40px", height: "40px", background: "#993619", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>{phase.label}</h2>
                      </div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "#993619", letterSpacing: "0.12em" }}>{phase.methodology}</p>
                    </div>
                    <div className="lg:col-span-4">
                      <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837" }}>{phase.description}</p>
                    </div>
                    <div className="lg:col-span-4">
                      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(57,56,55,0.45)", marginBottom: "12px" }}>Capabilities</p>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {phase.capabilities.map((cap) => (
                          <li key={cap} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "#393837" }}>
                            <Check size={12} style={{ color: "#993619", flexShrink: 0 }} />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Managed vs Co-Managed Comparison */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              Engagement Models
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              Fully Managed vs. Co-Managed
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "48px", maxWidth: "640px" }}>
              The methodology is the same. The difference is who operates it. Choose based on your team's capacity and your organization's risk tolerance.
            </p>

            {/* Comparison Table */}
            <div style={{ background: "#FEFBF6", border: "1px solid #CDCAC5" }}>
              {/* Header */}
              <div className="grid grid-cols-3" style={{ borderBottom: "2px solid #993619" }}>
                <div style={{ padding: "20px 24px", fontWeight: 700, fontSize: "13px", color: "#393837", letterSpacing: "0.1em", textTransform: "uppercase" }}></div>
                <div style={{ padding: "20px 24px", fontWeight: 700, fontSize: "13px", color: "#993619", letterSpacing: "0.1em", textTransform: "uppercase", borderLeft: "1px solid #CDCAC5" }}>Fully Managed</div>
                <div style={{ padding: "20px 24px", fontWeight: 700, fontSize: "13px", color: "#993619", letterSpacing: "0.1em", textTransform: "uppercase", borderLeft: "1px solid #CDCAC5" }}>Co-Managed</div>
              </div>
              {managementComparison.map((row, i) => (
                <div key={row.category} className="grid grid-cols-3" style={{ borderBottom: i < managementComparison.length - 1 ? "1px solid #CDCAC5" : "none" }}>
                  <div style={{ padding: "20px 24px", fontWeight: 700, fontSize: "13px", color: "#1D1D1B" }}>{row.category}</div>
                  <div style={{ padding: "20px 24px", fontSize: "14px", lineHeight: 1.6, color: "#393837", borderLeft: "1px solid #CDCAC5" }}>{row.fully}</div>
                  <div style={{ padding: "20px 24px", fontSize: "14px", lineHeight: 1.6, color: "#393837", borderLeft: "1px solid #CDCAC5" }}>{row.co}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#393837", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              Next Steps
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Ready to start the cycle?
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(205,202,197,0.50)", marginBottom: "36px", maxWidth: "500px" }}>
              Every transformation starts with a free assessment. We'll map your current state and build your roadmap.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
              >
                Get Started <ArrowRight size={14} />
              </Link>
              <Link
                to="/service-layer"
                className="inline-flex items-center gap-2 font-semibold transition-all"
                style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
              >
                Explore the Service Layer
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 font-semibold transition-all"
                style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default Methodology;
