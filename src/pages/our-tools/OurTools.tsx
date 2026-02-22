/** DO NOT TOUCH — v2.0 spec copy (How_It_works.docx) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const stats = [
  { metric: "Global Average Breach Cost (2025)", finding: "USD $4.44 million per incident — a 9% reduction year-over-year, yet masking record-high costs in the United States ($10.22M) and healthcare ($7.42M), where regulatory exposure and litigation drive losses well above the global mean.", source: "IBM Cost of a Data Breach Report, 2025" },
  { metric: "Median Attacker Dwell Time", finding: "11 days — the time adversaries operate undetected inside an enterprise environment before detection. While a long-term low, eleven days of unchecked lateral movement represents catastrophic potential blast radius in any unmonitored environment.", source: "Mandiant M-Trends 2025" },
  { metric: "AI-Driven Security Adoption Gap", finding: "97% of organizations that experienced an AI-based breach had no AI-driven security controls in place. Organizations deploying AI and automation extensively saved an average of $2.22 million in breach costs versus those without.", source: "IBM Cost of a Data Breach Report, 2025" },
  { metric: "Ransomware Recovery Cost", finding: "Average ransomware recovery cost reached $1.5 million in 2025, with average ransom payments approaching $1.0 million. Ransomware incidents have increased 13% over the past five years.", source: "Sophos State of Ransomware, 2025" },
  { metric: "Global Cybercrime Cost Trajectory", finding: "Cybercrime is projected to cost the global economy $10.5 trillion annually by 2025 — a 250% increase from $3 trillion in 2015 — representing the greatest transfer of economic wealth in history.", source: "CompTIA / Cybersecurity Ventures, 2025" },
];

const inThisSection = [
  { name: "Platform Overview", desc: "The Kubric platform explained: what it is, what it does, and why it is different.", href: "/how-it-works/platform-overview" },
  { name: "Kubric UIDR", desc: "Unified Intelligent Detection & Response: the 20-capability detection engine that powers everything.", href: "/how-it-works/kubric-uidr" },
  { name: "Kubric Data Graph", desc: "The correlation layer: how signals from different domains become a single attack chain.", href: "/how-it-works/kubric-data-graph" },
  { name: "KubricAI", desc: "The intelligence layer: how we reduce noise, prioritize what matters, and recommend actions.", href: "/how-it-works/kubricai" },
];

export default function OurTools() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-black min-h-[42vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-6">The Architecture That Makes Managed Security Actually Work</h1>
            <p className="text-body-xl text-white/80 max-w-3xl font-semibold mb-4">
              Most Security Platforms Are Built by Acquisition. This One Was Built Different.
            </p>
            <p className="text-white/70 max-w-3xl leading-relaxed">
              Look under the hood of most managed security providers and you will find a collection of tools bolted together. A SIEM here. An EDR there. A ticketing system somewhere else. They are integrated via API calls and hope. The data lives in separate places. Alerts fire in separate consoles. Your analyst spends the first hour of every investigation determining which three alerts constitute the same incident.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Built Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p className="text-muted-foreground leading-relaxed mb-8">
            ManageKube was architected differently. Before a single detection capability was deployed, we built a graph capable of correlating any signal from any source—identity, network, cloud, endpoint, application, data—in real time. Detection followed. Response followed. Then came the analysts who operate it around the clock.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            The result is not a stack of tools with a help desk attached. It is an integrated detection and response architecture managed by practitioners who know your environment.
          </p>

          <h2 className="text-headline text-foreground mb-8">What You Actually Receive</h2>
          <ul className="space-y-4 mb-16">
            {[
              "One platform. Not five tools duct-taped together.",
              "One data graph. Correlation happens at ingestion, not investigation.",
              "One methodology. Every detection follows the same eight-stage lifecycle.",
              "One team. The same analysts who tune your detection respond to your incidents.",
              "One partner. Not a different vendor for every problem.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <span className="text-brand-orange font-bold mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground leading-relaxed mb-16">
            The remainder of this section explains precisely how the engine operates: the platform, the graph, the AI, and the underlying architecture that makes all of it possible.
          </p>
        </div>
      </section>

      {/* 2025 Enterprise Security Landscape */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">2025 Enterprise Security Landscape</p>
          <h2 className="text-headline text-foreground mb-4">The Case for Architecture</h2>
          <p className="text-sm text-muted-foreground mb-2">Independently verified statistics from IBM, Mandiant, CompTIA, and Sophos</p>
          <h3 className="text-xl font-bold text-foreground mb-4">Why the Status Quo Is No Longer Defensible</h3>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The following figures are drawn from independently published 2025 research. They are presented not as marketing claims but as empirical context for the architecture decisions described throughout this document. Each statistic is cited to its source.
          </p>

          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/20">
                  <th className="text-left p-4 font-bold text-foreground">Metric</th>
                  <th className="text-left p-4 font-bold text-foreground">Finding</th>
                  <th className="text-left p-4 font-bold text-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.metric} className="border-b border-border">
                    <td className="p-4 font-semibold text-foreground whitespace-nowrap align-top">{s.metric}</td>
                    <td className="p-4 text-muted-foreground leading-relaxed">{s.finding}</td>
                    <td className="p-4 text-muted-foreground italic whitespace-nowrap align-top">{s.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            The architecture described in the pages that follow was designed explicitly to address each of these structural failure modes: unified correlation to eliminate dwell time, AI-driven noise reduction to close the detection gap, and analyst-operated response to ensure findings translate to outcomes.
          </p>
        </div>
      </section>

      {/* In This Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <h2 className="text-headline text-foreground mb-10">In This Section</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {inThisSection.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={tool.href} className="group block p-8 border border-border hover:border-brand-orange transition-colors">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tool.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Learn More <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-tiers" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
