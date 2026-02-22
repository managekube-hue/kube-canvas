/** DO NOT TOUCH — v2.0 spec copy (How_It_works.docx pp.10-11) */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
      <PageBanner
        title="The Correlation Layer That Makes Detection Actually Work"
        subtitle="Correlation Is Not a Query. It Is an Architecture."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p className="text-muted-foreground leading-relaxed mb-8">
            Most security platforms claim correlation. What they mean is this: you can write a manual query that joins data from two sources after both have been stored. This is not correlation. This is investigative homework. Your analyst becomes the correlation engine — and at the speed modern attacks execute, that gap is fatal.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-16">
            Kubric Data Graph is architecturally different. Correlation occurs at the exact millisecond of ingestion. Every signal — from every capability, every source, every domain — is written to a high-performance graph database that models entities and their relationships in real time. Users. Devices. IP addresses. Files. Applications. Cloud resources. Data stores. Every entity is a node. Every interaction is an edge. Every relationship is mapped continuously.
          </p>

          {/* What the Graph Actually Contains */}
          <h2 className="text-2xl font-black text-foreground mb-6">What the Graph Actually Contains</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            The Kubric Data Graph maintains a living, real-time topological model of your entire environment:
          </p>

          <div className="space-y-4 mb-16">
            {entityTypes.map((e, i) => (
              <motion.div key={e.type} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-2">{e.type}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-16">
            Every entity is connected to every entity it touches. Every relationship is timestamped. Every interaction is queryable.
          </p>

          {/* How Correlation Works in Practice */}
          <h2 className="text-2xl font-black text-foreground mb-6">How Correlation Works in Practice</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When a detection capability generates a finding, it does not fire an alert in isolation. It writes the finding to the graph. The graph immediately connects it to every related entity. The following scenario illustrates the architecture in operation:
          </p>
          <div className="p-6 border-l-4 border-brand-orange bg-muted/30 mb-8">
            <p className="text-muted-foreground leading-relaxed">
              ITDR detects an authentication anomaly from a user account at 2:00 AM from an unrecognized location. The graph instantly connects this finding to the user entity. The user entity is instantly connected to every device that user has accessed. Those devices are connected to every network flow they have generated. NDR has been writing network flow data to the graph continuously. If any of those flows exhibit beaconing patterns to external IPs, the graph connects them. The user, the devices, the flows, and the beaconing patterns now constitute a single, fully documented attack chain. This occurs in milliseconds. No queries. No manual joins. No analyst stitching together timelines from three separate consoles.
            </p>
          </div>

          {/* What the Graph Enables */}
          <h2 className="text-2xl font-black text-foreground mb-8">What the Graph Enables</h2>
          <div className="space-y-6 mb-16">
            {enables.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-2">{e.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/how-it-works/kubricai" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View KubricAI
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
