/** DO NOT TOUCH — v2.0 spec copy (How_It_works.docx pp.5-7) */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const capabilities = {
  "Infrastructure & Operations": [
    "Core Infrastructure Orchestration",
    "Network Performance Monitoring",
    "Mobile Device Management",
    "Application Performance Monitoring",
  ],
  "Security Detection & Response": [
    "Identity Threat Detection & Response (ITDR)",
    "Network Threat Detection & Response (NDR)",
    "Cloud Detection & Response (CDR)",
    "Data Exfiltration Detection & Response (DEDR)",
    "Application Threat Containment",
    "Software Supply Chain Detection & Response",
  ],
  "Intelligence & Risk": [
    "Vulnerability Detection & Prioritization",
    "External Attack Surface Management (EASM)",
    "STRIKE Strategic Intelligence",
    "Honeypot & Deception Network",
  ],
  "Operations & Continuity": [
    "Configuration Drift Detection & Correction",
    "Backup & Disaster Recovery",
  ],
};

const deliveryModels = [
  { name: "Fully Managed", desc: "We operate the platform. Your team receives outcomes." },
  { name: "Co-Managed", desc: "We operate the platform. Your team participates in response." },
  { name: "Self-Managed", desc: "You operate the platform. We provide the architecture." },
];

export default function HowKubricWorks() {
  return (
    <PageLayout>
      <PageBanner
        title="One Platform. Twenty Capabilities. Zero Tool Sprawl."
        subtitle="The Kubric platform explained: what it is, what it does, and why it is different."
        phase="How It Works"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          {/* The Problem with "Platforms" */}
          <h2 className="text-2xl font-black text-foreground mb-6">The Problem with "Platforms"</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            "Platform" has become a functionally meaningless word in enterprise security. Every vendor applies it to whatever collection of acquired products they have assembled under a single contract vehicle. But if the data does not unify, if detection does not correlate, and if the interface does not connect — it is not a platform. It is a marketing term.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-16">
            A genuine platform has one data layer. One detection engine. One investigation workflow. One architecture. That is what Kubric is.
          </p>

          {/* What Kubric Actually Is */}
          <h2 className="text-2xl font-black text-foreground mb-6">What Kubric Actually Is</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Kubric is the proprietary detection and response engine that powers every ManageKube service. It is not a SIEM. It is not an open-source distribution rebranded under a managed services wrapper. It is an integrated platform engineered specifically for cross-discipline threat correlation — operated by analysts who understand your environment, delivered as a service your organization consumes.
          </p>

          <h3 className="text-xl font-bold text-foreground mb-6">The platform is composed of four engineered layers:</h3>
          <div className="space-y-4 mb-16">
            {[
              { title: "The Ingestion Layer", desc: "Collects telemetry from every source in your environment — endpoints, network flows, cloud APIs, identity providers, applications, and data stores. Every raw signal is normalized into a strict, common schema at the moment of ingest." },
              { title: "The Detection Layer", desc: "Runs 20 purpose-built capabilities across four operational disciplines. Each capability is tuned for its domain. Each writes findings to the same underlying graph database." },
              { title: "The Graph Layer", desc: "Correlates every signal against every other signal in real time. Entities — users, devices, IP addresses, files, applications — are connected automatically. Relationships are mapped continuously." },
              { title: "The Intelligence Layer", desc: "Applies machine learning, behavioral baselines, and threat intelligence to every finding. Noise is filtered. Priority is assigned. Recommended actions are generated." },
            ].map((layer) => (
              <div key={layer.title} className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-2">{layer.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-16">
            All four layers operate continuously. All four feed the same methodology. All four are managed by the same team.
          </p>

          {/* The 20 Capabilities */}
          <h2 className="text-2xl font-black text-foreground mb-8">The 20 Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {Object.entries(capabilities).map(([category, items]) => (
              <div key={category} className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-brand-orange font-bold mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* What Unifies Them */}
          <h2 className="text-2xl font-black text-foreground mb-6">What Unifies Them</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Three architectural decisions elevate Kubric from a product collection to a genuine platform:
          </p>
          <div className="space-y-6 mb-16">
            <div className="p-6 border border-border">
              <h4 className="font-bold text-foreground mb-2">1. The Data Graph</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Every signal from every capability writes to the same entity-relationship graph. When an identity anomaly and a network beacon occur simultaneously across the same user and device, they are connected automatically — not joined in a post-hoc query.</p>
            </div>
            <div className="p-6 border border-border">
              <h4 className="font-bold text-foreground mb-2">2. The Methodology</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Every detection follows the same eight-stage lifecycle: Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close. No gaps. No shortcuts. No incident closes without a documented resolution.</p>
            </div>
            <div className="p-6 border border-border">
              <h4 className="font-bold text-foreground mb-2">3. The AI Layer</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">KubricAI learns from every detection, every analyst decision, and every closed incident. Over time, noise decreases, priority accuracy increases, and recommendations become more precise.</p>
            </div>
          </div>

          {/* How It Delivers */}
          <h2 className="text-2xl font-black text-foreground mb-6">How It Delivers</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Kubric is delivered as a managed service. Your organization does not maintain it, tune it, or staff it. The platform operates continuously. The analysts operate it continuously. Your team receives outcomes continuously. Three delivery models accommodate your operational structure:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {deliveryModels.map((m) => (
              <div key={m.name} className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-2">{m.name}</h4>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
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
