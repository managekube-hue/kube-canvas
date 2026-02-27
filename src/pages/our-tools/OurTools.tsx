/** v2.0 spec copy: How It Works landing page (How_It_works.docx) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const stats = [
  { metric: "Global Average Breach Cost (2025)", finding: "USD $4.44 million per incident — a 9% reduction year-over-year, yet masking record-high costs in the United States ($10.22M) and healthcare ($7.42M), where regulatory exposure and litigation drive losses well above the global mean.", source: "IBM Cost of a Data Breach Report, 2025" },
  { metric: "Median Attacker Dwell Time", finding: "11 days — the time adversaries operate undetected inside an enterprise environment before detection. While a long-term low, eleven days of unchecked lateral movement represents catastrophic potential blast radius in any unmonitored environment.", source: "Mandiant M-Trends 2025" },
  { metric: "AI-Driven Security Adoption Gap", finding: "97% of organizations that experienced an AI-based breach had no AI-driven security controls in place. Organizations deploying AI and automation extensively saved an average of $2.22 million in breach costs versus those without.", source: "IBM Cost of a Data Breach Report, 2025" },
  { metric: "Ransomware Recovery Cost", finding: "Average ransomware recovery cost reached $1.5 million in 2025, with average ransom payments approaching $1.0 million. Ransomware incidents have increased 13% over the past five years.", source: "Sophos State of Ransomware, 2025" },
  { metric: "Global Cybercrime Cost Trajectory", finding: "Cybercrime is projected to cost the global economy $10.5 trillion annually by 2025 — a 250% increase from $3 trillion in 2015 — representing the greatest transfer of economic wealth in history.", source: "CompTIA / Cybersecurity Ventures, 2025" },
];

const whatYouReceive = [
  "One service provider. Not five tools duct-taped together.",
  "One data graph. Correlation happens at ingestion, not investigation.",
  "One methodology. Every detection follows the same eight-stage lifecycle.",
  "One team. The same analysts who tune your detection respond to your incidents.",
  "One partner. Not a different vendor for every problem.",
];

const inThisSection = [
  { name: "Service Overview", desc: "How ManageKube delivers: what we do, how we do it, and why it is different.", href: "/how-it-works/platform-overview" },
  { name: "Kubric UIDR", desc: "Unified Intelligent Detection & Response: the 23-capability detection engine that powers everything.", href: "/how-it-works/kubric-uidr" },
  { name: "Kubric Data Graph", desc: "The correlation layer: how signals from different domains become a single attack chain.", href: "/how-it-works/kubric-data-graph" },
  { name: "KubricAI", desc: "The intelligence layer: how we reduce noise, prioritize what matters, and recommend actions.", href: "/how-it-works/kubricai" },
];

export default function OurTools() {
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
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>How It Works</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}
            >The Architecture That Makes Managed Security Actually Work</h1>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#993619", marginBottom: "12px" }}>Most Security Providers Are Built by Acquisition. This One Was Built Different.</p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(205,202,197,0.70)", maxWidth: "640px" }}>
              Look under the hood of most managed security providers and you will find a collection of tools bolted together. A SIEM here. An EDR there. A ticketing system somewhere else. They are integrated via API calls and hope. The data lives in separate places. Alerts fire in separate consoles. Your analyst spends the first hour of every investigation determining which three alerts constitute the same incident.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Built Different ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "24px" }}>
            ManageKube was architected differently. Before a single detection capability was deployed, we built a graph capable of correlating any signal from any source—identity, network, cloud, endpoint, application, data—in real time. Detection followed. Response followed. Then came the analysts who operate it around the clock.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "40px" }}>
            The result is not a stack of tools with a help desk attached. It is an integrated detection and response architecture managed by practitioners who know your environment.
          </p>

          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What You Actually Receive</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "40px" }}>
            {whatYouReceive.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "14px" }}>
                <CheckCircle size={13} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#393837" }}>{item}</span>
              </li>
            ))}
          </ul>

          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            The remainder of this section explains precisely how the engine operates: the platform, the graph, the AI, and the underlying architecture that makes all of it possible.
          </p>
        </div>
      </section>

      {/* ── 2025 Enterprise Security Landscape ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "8px" }}>2025 Enterprise Security Landscape</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "16px" }} />
          <h2 className="font-black leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B", marginBottom: "8px" }}>
            The Case for Architecture
          </h2>
          <p style={{ fontSize: "12px", color: "#5A5A5B", marginBottom: "8px" }}>Independently verified statistics from IBM, Mandiant, CompTIA, and Sophos</p>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>Why the Status Quo Is No Longer Defensible</h3>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            The following figures are drawn from independently published 2025 research. They are presented not as marketing claims but as empirical context for the architecture decisions described throughout this document. Each statistic is cited to its source.
          </p>

          <div className="overflow-x-auto" style={{ marginBottom: "32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #CDCAC5" }}>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: "#1D1D1B" }}>Metric</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: "#1D1D1B" }}>Finding</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: "#1D1D1B" }}>Source</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.metric} style={{ borderBottom: "1px solid #CDCAC5" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1D1D1B", whiteSpace: "nowrap", verticalAlign: "top" }}>{s.metric}</td>
                    <td style={{ padding: "12px 16px", color: "#393837", lineHeight: 1.6 }}>{s.finding}</td>
                    <td style={{ padding: "12px 16px", color: "#5A5A5B", fontStyle: "italic", whiteSpace: "nowrap", verticalAlign: "top" }}>{s.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837" }}>
            The architecture described in the pages that follow was designed explicitly to address each of these structural failure modes: unified correlation to eliminate dwell time, AI-driven noise reduction to close the detection gap, and analyst-operated response to ensure findings translate to outcomes.
          </p>
        </div>
      </section>

      {/* ── In This Section ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>In This Section</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "32px" }} />
          <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5", marginBottom: "48px" }}>
            {inThisSection.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link
                  to={tool.href}
                  className="group block transition-all"
                  style={{ background: "#FEFBF6", padding: "32px" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEE9E3"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FEFBF6"}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "12px", borderTop: "2px solid #993619", paddingTop: "16px" }} className="group-hover:text-[#993619] transition-colors">{tool.name}</h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837", marginBottom: "16px" }}>{tool.desc}</p>
                  <span className="inline-flex items-center gap-1" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#993619" }}>
                    Learn More <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
            >
              Get Started <ArrowRight size={14} />
            </Link>
            <Link
              to="/service-tiers"
              className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid #1D1D1B", color: "#1D1D1B", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
            >
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}