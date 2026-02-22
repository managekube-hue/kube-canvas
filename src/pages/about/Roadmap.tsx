/**
 * Roadmap Page: ManageKube
 * Where We Are Going. What We Are Building.
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const quarters = [
  {
    label: "Q2 2025",
    sections: [
      {
        heading: "Capability Expansion",
        items: ["Data Exfiltration Detection and Response (DEDR): General availability", "Enhanced OT detection for manufacturing and energy clients", "Expanded cloud coverage for Azure and GCP"],
      },
      {
        heading: "Platform Enhancements",
        items: ["Graph performance improvements: 40% faster queries", "API v2 with expanded automation capabilities", "Custom dashboard builder for client-specific views"],
      },
      {
        heading: "Integrations",
        items: ["ServiceNow integration for ticketing and CMDB sync", "Slack and Teams alerting with two-way interaction", "Expanded SIEM data forwarding options"],
      },
    ],
  },
  {
    label: "Q3 2025",
    sections: [
      {
        heading: "Capability Expansion",
        items: ["Managed Data Detection and Response: Data posture management", "AI Red Teaming: Automated adversary simulation", "Supply Chain Risk Management: Vendor risk scoring"],
      },
      {
        heading: "Platform Enhancements",
        items: ["KubricAI enhancements: Improved prioritisation models", "Compliance Hub: Unified view across all frameworks", "Client portal redesign with enhanced reporting"],
      },
      {
        heading: "Integrations",
        items: ["Jira integration for development workflows", "PagerDuty and Opsgenie for on-call integration", "Expanded OT/ICS protocol support"],
      },
    ],
  },
  {
    label: "Q4 2025",
    sections: [
      {
        heading: "Capability Expansion",
        items: ["Managed Exposure Management: Continuous external attack surface", "Digital Risk Protection: Brand and executive monitoring", "Identity Threat Detection and Response: Enhanced service account monitoring"],
      },
      {
        heading: "Platform Enhancements",
        items: ["Graph visualisation enhancements", "Automated playbook engine", "Enhanced reporting and analytics"],
      },
      {
        heading: "Integrations",
        items: ["Expanded cloud provider coverage", "Additional SIEM and ticketing integrations", "Custom connector builder for partners"],
      },
    ],
  },
  {
    label: "2026 and Beyond",
    sections: [
      {
        heading: "Vision",
        items: [
          "Global expansion: New regions, new data centres",
          "Industry-specific solutions: Deeper capabilities for each sector",
          "AI-driven autonomous response for approved scenarios",
          "Managed XDR expansion across additional vectors",
        ],
      },
    ],
  },
];

export default function Roadmap() {
  return (
    <PageLayout>
      <PageBanner
        title="Roadmap"
        subtitle="Where We Are Going. What We Are Building."
        phase="ABOUT"
      />

      {/* Intro */}
      <section style={{ background: "#FEFBF6" }} className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">TRANSPARENCY</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
              The Kubric Platform Is Always Evolving.
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl">
              We publish our roadmap because transparency matters: to our clients, our partners, and our team. You should know where we are going and what we are building.
            </p>
          </div>
        </div>
      </section>

      {/* Quarters */}
      {quarters.map((q, qi) => (
        <section key={q.label} className={qi % 2 === 0 ? "bg-secondary py-20" : "py-20"} style={qi % 2 !== 0 ? { background: "#FEFBF6" } : undefined}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <p className="text-label text-brand-orange mb-4">{q.label.toUpperCase()}</p>
              <div className="h-[2px] w-10 bg-brand-orange mb-10" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {q.sections.map((s) => (
                  <motion.div
                    key={s.heading}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-background border border-border p-8"
                  >
                    <h3 className="text-sm font-bold text-foreground mb-4">{s.heading}</h3>
                    <ul className="space-y-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Philosophy */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-white mb-5" style={{ fontFamily: "'Special Elite', serif" }}>
            Roadmap Philosophy
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-xl mx-auto">
            We build what clients need. Not what is trendy. Not what investors want. What actually makes organisations more secure and more efficient. Roadmap items are subject to change based on client feedback, market conditions, and what we learn along the way.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
