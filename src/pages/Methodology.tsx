/**
 * Methodology Page — 7-Step Lifecycle
 * Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document
 * with Fully Managed vs Co-Managed comparison
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  {
    number: "01",
    label: "HUNT",
    summary: "Proactive threat hunting across your entire attack surface.",
    description: "We don't wait for alerts — we go looking. Our analysts comb through telemetry, behavioral anomalies, and threat intelligence feeds to identify risks before they materialize into incidents. External attack surface management, vulnerability detection, honeypot and deception networks, and configuration drift detection all feed this phase.",
    modules: ["EASM", "VDR", "TI", "HONEYPOT", "STRIKE"],
  },
  {
    number: "02",
    label: "IDENTIFY",
    summary: "Map every asset, vulnerability, and exposure across the environment.",
    description: "Before you can protect it, you have to know it exists. This step maps every asset — endpoints, servers, cloud workloads, IoT devices, shadow IT, and SaaS applications — then correlates known vulnerabilities, misconfigurations, and compliance gaps against your specific industry frameworks. The output is a prioritized risk register, not a generic scan report.",
    modules: ["CIO", "NPM", "MDM", "APM", "VDR"],
  },
  {
    number: "03",
    label: "ALERT",
    summary: "Real-time detection across every layer of the stack.",
    description: "Detection happens across identity, network, cloud, application, endpoint, and data layers. Every alert is enriched with context from the Kubric Data Graph before it reaches an analyst — reducing noise and false positives by over 80%. Correlated alerts, not raw events. Context, not chaos.",
    modules: ["ITDR", "NDR", "CDR", "ADR", "SDR", "DDR"],
  },
  {
    number: "04",
    label: "TRIAGE",
    summary: "Prioritize, classify, and assign every alert with context.",
    description: "Not every alert is an incident. Triage separates signal from noise. Each detection is classified by severity, blast radius, affected assets, and business impact. Our SOC analysts — backed by KubricAI scoring — determine whether an alert is a true positive, a benign anomaly, or a false positive. Only confirmed threats proceed to diagnosis.",
    modules: ["GRC", "TI", "ITDR"],
  },
  {
    number: "05",
    label: "DIAGNOSE",
    summary: "Root cause analysis and full incident scoping.",
    description: "Once a threat is confirmed, we scope the full extent of compromise. Forensic analysis traces the attack chain — initial access, lateral movement, persistence mechanisms, data access, and exfiltration attempts. The diagnosis phase answers: what happened, how far did it go, what was affected, and what is the attacker's current position.",
    modules: ["NDR", "CDR", "DDR", "TI"],
  },
  {
    number: "06",
    label: "REMEDIATE",
    summary: "Automated containment and expert-led remediation.",
    description: "When a threat is confirmed, playbooks execute in seconds — isolating endpoints, revoking credentials, blocking lateral movement, and quarantining compromised accounts. Our SOC analysts handle escalation, communication, and forensic documentation. Every action is logged, timestamped, and mapped to compliance evidence requirements.",
    modules: ["CFDR", "BDR", "ITDR", "CDR", "ADR"],
  },
  {
    number: "07",
    label: "DOCUMENT",
    summary: "Close the loop. Harden. Report. Improve.",
    description: "Every incident produces a post-mortem, updated playbooks, and hardened configurations. Backup and disaster recovery ensures business continuity while compliance documentation is generated automatically. Quarterly business reviews assess the full lifecycle, update the strategic roadmap, and feed new intelligence back into the Hunt phase — completing the cycle.",
    modules: ["GRC", "BDR", "CFDR"],
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
        title="Seven Steps. One Continuous Cycle."
        subtitle="Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document. Every engagement follows this proven lifecycle, powered by 18 detection and response modules."
        phase="METHODOLOGY"
      />

      {/* 7-Step Lifecycle */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              The 7-Step Lifecycle
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "56px", maxWidth: "640px" }}>
              Security isn't a destination — it's a cycle. Every module in the Service Layer maps to one or more steps. The methodology scales from 7 modules (Essentials) to all 18 (Enterprise). Step 7 feeds directly back into Step 1.
            </p>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                style={{ borderTop: "1px solid #CDCAC5", padding: "48px 0" }}
              >
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-1">
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(57,56,55,0.35)", letterSpacing: "0.1em" }}>{step.number}</span>
                  </div>
                  <div className="lg:col-span-2">
                    <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "8px" }}>{step.label}</h2>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#993619", lineHeight: 1.5 }}>{step.summary}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837" }}>{step.description}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(57,56,55,0.45)", marginBottom: "12px" }}>Active Modules</p>
                    <div className="flex flex-wrap gap-2">
                      {step.modules.map((mod) => (
                        <Link
                          key={mod}
                          to={`/service-layer/${mod.toLowerCase()}`}
                          style={{ fontSize: "12px", fontWeight: 700, color: "#393837", background: "rgba(153,54,25,0.08)", padding: "6px 12px", letterSpacing: "0.08em", textDecoration: "none" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(153,54,25,0.18)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(153,54,25,0.08)"; }}
                        >
                          {mod}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Cycle indicator */}
            <div style={{ borderTop: "1px solid #CDCAC5", padding: "32px 0", textAlign: "center" }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#993619", letterSpacing: "0.12em" }}>
                DOCUMENT → HUNT — The cycle repeats continuously
              </p>
            </div>
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

      {/* A La Carte Services */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              À La Carte
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              Professional Services — Available Standalone
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "48px", maxWidth: "640px" }}>
              Not everything requires a full platform engagement. These services are available individually or as add-ons to any Service Tier.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Help Desk", desc: "Tier 1–3 end-user support with SLA-backed resolution times. Mac, PC, mobile, and peripheral support.", href: "/services/help-desk" },
                { name: "Managed IT", desc: "Full IT operations — endpoints, IoT, print, O365 administration, data center management, and strategic planning.", href: "/services/managed-it" },
                { name: "Smart Hands", desc: "On-site field technicians for rack-and-stack, cabling, hardware swaps, and multi-site rollouts.", href: "/services/smart-hands" },
                { name: "Security Assessments", desc: "Comprehensive security posture evaluation — gap analysis, risk scoring, and remediation roadmap.", href: "/services/security-assessments" },
                { name: "Penetration Testing", desc: "Simulated attacks against your infrastructure, applications, and social engineering defenses.", href: "/services/penetration-testing" },
                { name: "Network Buildouts", desc: "New office, data center, or branch — designed, procured, deployed, and documented.", href: "/services/network-buildouts" },
              ].map((svc) => (
                <Link
                  key={svc.name}
                  to={svc.href}
                  style={{ background: "#fff", border: "1px solid #CDCAC5", padding: "32px", textDecoration: "none", display: "block" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#993619"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#CDCAC5"; }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>{svc.name}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#393837", marginBottom: "16px" }}>{svc.desc}</p>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#993619", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Learn More →
                  </span>
                </Link>
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
              Every transformation starts with a free assessment. We'll map your current state and build your roadmap across all seven steps.
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