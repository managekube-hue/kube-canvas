/** Find By Problem — /find-by-problem — word-for-word from Solutions.docx pages 3-4 */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const problems = [
  {
    title: "Alert Fatigue and Missed Detections",
    desc: "Security tools are deployed and generating alerts. The team is overwhelmed. Real threats are buried in noise. Detection occurs, but the signal does not reach the analyst in time to matter.",
    solution: "Managed SOC with KubricAI noise reduction and 24/7 coverage that eliminates the fatigue-driven gap.",
    href: "/services/managed-soc",
  },
  {
    title: "Compliance Pressure and Audit Anxiety",
    desc: "Audits arrive on schedule. Evidence collection begins in reaction. Controls have drifted since the last assessment. Findings appear. Remediation is compressed. The cycle repeats at the next audit.",
    solution: "Managed Compliance with continuous monitoring, real-time gap detection, and automated evidence collection. Always audit-ready.",
    href: "/services/managed-compliance",
  },
  {
    title: "Tool Sprawl and Integration Debt",
    desc: "Tools have accumulated over time. They do not share data. Analysts move between consoles rather than investigating threats. Integration projects start and stall. The platform promised never materializes.",
    solution: "Kubric platform with a unified data graph and 20 integrated capabilities — one schema, one graph, one methodology.",
    href: "/how-it-works/platform-overview",
  },
  {
    title: "Cloud Costs Drifting Without Control",
    desc: "Resources are provisioned and forgotten. Instances run idle. Reserved instances expire without renewal. By the time spend is reviewed, the waste has been absorbed. Finance is asking questions the team cannot answer.",
    solution: "Managed Cloud & FinOps with continuous cost monitoring, anomaly detection, and right-sizing recommendations with projected savings.",
    href: "/services/managed-cloud",
  },
  {
    title: "Network Performance Issues Reaching Users First",
    desc: "Users report degradation before the monitoring system flags it. Latency accumulates on critical paths. Packet loss appears on segments that were not being watched. The team is permanently reactive.",
    solution: "Managed NOC with proactive monitoring, behavioral baselining per segment, and detection before users are affected.",
    href: "/services/managed-noc",
  },
  {
    title: "Incident Response That Stops at Alerting",
    desc: "Alerts fire and tickets open, but incidents do not close cleanly. Remediation is ad hoc. Documentation is missing. The same incident types recur because root cause is never formally addressed.",
    solution: "Full eight-stage methodology coverage from Hunt through Close — with documented evidence, root cause analysis, and prevention recommendations filed at close.",
    href: "/methodology",
  },
  {
    title: "Visibility Gaps Across the Environment",
    desc: "Shadow IT. Forgotten legacy systems. Cloud resources outside change control. Assets that were never inventoried. You cannot defend what you cannot see, and you cannot see everything.",
    solution: "Core Infrastructure Orchestration with continuous asset discovery, dependency mapping, and configuration baseline monitoring.",
    href: "/service-layer/cio",
  },
  {
    title: "An MSSP That Forwards Alerts Instead of Responding",
    desc: "The current managed security provider delivers alerts to the internal team. That is not managed security. That is alert forwarding with a service-level agreement and a margin.",
    solution: "True managed services with 24/7 operations, full incident response, and documented closure — not alert forwarding dressed as a service.",
    href: "/services/managed-soc",
  },
];

export default function FindByProblem() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden min-h-[48vh] flex items-center" style={{ background: "#1D1D1B" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.97) 40%, rgba(29,29,27,0.65) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 55%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#993619" }}>Solutions</span>
            <div className="h-[2px] w-16 my-6" style={{ background: "#993619" }} />
            <h1
              className="font-black text-white mb-3 leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif" }}
            >
              Find By Problem
            </h1>
            <p className="text-xl font-semibold mb-6" style={{ color: "#993619" }}>
              Start with the Challenge. We Will Show You the Path.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Narrative ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>You Know What Hurts. We Know How to Fix It.</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <p className="text-[16px] leading-relaxed max-w-4xl" style={{ color: "#393837" }}>
            Most organizations do not begin their evaluation with "I need a managed security provider." They begin with a problem. Too many alerts. Compliance pressure. Tool sprawl. Cloud costs accelerating. Users reporting performance degradation before the monitoring system does. Audit findings that resurface every cycle. Find By Problem lets you start where it hurts. The following maps common organizational challenges to the solutions that address them.
          </p>
        </div>
      </section>

      {/* ── Common Problems We Solve ── */}
      <section className="py-20" style={{ background: "#EEE9E3" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Common Problems We Solve</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-8"
                style={{ background: "#FEFBF6" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle size={16} style={{ color: "#993619", flexShrink: 0, marginTop: 3 }} />
                  <h3
                    className="font-black leading-tight"
                    style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed mb-4 ml-8" style={{ color: "#393837" }}>{p.desc}</p>
                <div className="ml-8 p-4" style={{ background: "#EEE9E3", borderLeft: "3px solid #993619" }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#993619" }}>Solution</p>
                  <p className="text-[14px] leading-relaxed" style={{ color: "#393837" }}>{p.solution}</p>
                </div>
                <div className="ml-8 mt-4">
                  <Link
                    to={p.href}
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider transition-all hover:gap-3"
                    style={{ color: "#993619", letterSpacing: "0.1em" }}
                  >
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Get Started</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <h2
            className="font-black text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif" }}
          >
            Start with the problem. We will show you the path.
          </h2>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
              style={{ background: "#993619", letterSpacing: "0.1em" }}
            >
              Contact Sales <ArrowRight size={14} />
            </Link>
            <Link
              to="/service-tiers"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
              style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
            >
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
