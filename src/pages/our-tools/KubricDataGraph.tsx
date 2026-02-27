/** v2.0 spec copy: Kubric Data Graph (How_It_works.docx pp.10-11) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const entityTypes = [
  { type: "Identity Entities", desc: "Users (human and service accounts), groups, roles, authentication events, privilege assignments, and session histories." },
  { type: "Infrastructure Entities", desc: "Devices, endpoints, network interfaces, internal and external IP addresses, virtual machines, containers, and cloud resources (instances, buckets, serverless functions)." },
  { type: "Application Entities", desc: "Running processes, installed software, dependencies, libraries, API endpoints, and database connections." },
  { type: "Data Entities", desc: "Files, objects, storage locations, access permissions, data classifications, and movement history." },
  { type: "Threat Entities", desc: "Indicators of compromise (IOCs), threat actor profiles, MITRE ATT&CK patterns, campaign intelligence, and deception network artifacts." },
];

const enables = [
  { title: "Attack Chain Reconstruction", desc: "Every incident arrives with its full context pre-assembled. Analysts do not hunt for related events. The graph delivers them." },
  { title: "Blast Radius Assessment", desc: "When a compromise is confirmed, the graph instantly surfaces every entity the adversary could have touched — not only the initial foothold, but the full scope of potential exposure." },
  { title: "Hunting at Graph Speed", desc: "Threat hunters traverse the graph rather than writing complex joins. \"Show me all devices this user accessed in the 72 hours before their credentials were compromised.\" The graph answers immediately." },
  { title: "Immutable Compliance Evidence", desc: "Every relationship is timestamped and immutable. When an auditor requires proof that a compromised device was isolated, the graph produces the isolation event, the device state before and after, and the analyst who executed the action — all connected." },
  { title: "Proactive Baseline Learning", desc: "The graph models normal relationships over time. When new relationships emerge — a user accessing a system they have never previously touched, a device communicating with an external IP it has never contacted — the graph flags them as anomalies before they escalate to alerts." },
];

export default function KubricDataGraph() {
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
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>How It Works: Kubric Data Graph</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              The Correlation Layer That Makes Detection Actually Work
            </h1>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#993619" }}>Correlation Is Not a Query. It Is an Architecture.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Intro ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "24px" }}>
            Most security platforms claim correlation. What they mean is this: you can write a manual query that joins data from two sources after both have been stored. This is not correlation. This is investigative homework. Your analyst becomes the correlation engine, and at the speed modern attacks execute, that gap is fatal.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
            Kubric Data Graph is architecturally different. Correlation occurs at the exact millisecond of ingestion. Every signal, from every capability, every source, every domain, is written to a high-performance graph database that models entities and their relationships in real time. Users. Devices. IP addresses. Files. Applications. Cloud resources. Data stores. Every entity is a node. Every interaction is an edge. Every relationship is mapped continuously.
          </p>
        </div>
      </section>

      {/* ── What the Graph Actually Contains ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What the Graph Actually Contains</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
            The Kubric Data Graph maintains a living, real-time topological model of your entire environment:
          </p>
          <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
            {entityTypes.map((e, i) => (
              <motion.div key={e.type} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: "#FEFBF6", padding: "24px", borderLeft: "3px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "6px" }}>{e.type}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{e.desc}</p>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginTop: "32px" }}>
            Every entity is connected to every entity it touches. Every relationship is timestamped. Every interaction is queryable.
          </p>
        </div>
      </section>

      {/* ── How Correlation Works in Practice ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>How Correlation Works in Practice</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "24px" }}>
            When a detection capability generates a finding, it does not fire an alert in isolation. It writes the finding to the graph. The graph immediately connects it to every related entity. The following scenario illustrates the architecture in operation:
          </p>
          <div style={{ borderLeft: "3px solid #993619", padding: "24px", background: "#EEE9E3", marginBottom: "24px" }}>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#393837" }}>
              ITDR detects an authentication anomaly from a user account at 2:00 AM from an unrecognized location. The graph instantly connects this finding to the user entity. The user entity is instantly connected to every device that user has accessed. Those devices are connected to every network flow they have generated. NDR has been writing network flow data to the graph continuously. If any of those flows exhibit beaconing patterns to external IPs, the graph connects them. The user, the devices, the flows, and the beaconing patterns now constitute a single, fully documented attack chain. This occurs in milliseconds. No queries. No manual joins. No analyst stitching together timelines from three separate consoles.
            </p>
          </div>
        </div>
      </section>

      {/* ── What the Graph Enables ── */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What the Graph Enables</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "32px" }} />
          <div className="space-y-[1px]" style={{ background: "#CDCAC5", marginBottom: "48px" }}>
            {enables.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: "#FEFBF6", padding: "28px", borderLeft: "3px solid #993619" }}>
                <h4 style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>{e.title}</h4>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{e.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Get Started <ArrowRight size={14} />
            </Link>
            <Link to="/how-it-works/kubricai" className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid #1D1D1B", color: "#1D1D1B", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              View KubricAI
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}