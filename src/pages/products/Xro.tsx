import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const KUBES = [
  { code: "CIO KUBE", name: "Core Infrastructure Orchestration & asset lifecycle management" },
  { code: "NPM KUBE", name: "Network Performance Monitoring with AI-powered capacity forecasting" },
  { code: "ITDR KUBE", name: "Identity Threat Detection & Response via Active Directory monitoring" },
  { code: "NDR KUBE", name: "Network Threat Detection & Response with deep packet inspection" },
  { code: "VDR KUBE", name: "Vulnerability Detection & Response prioritized by real risk, not CVSS" },
  { code: "CFDR KUBE", name: "Configuration Drift Detection & automated remediation" },
  { code: "GRC KUBE", name: "Governance, Risk & Compliance automation across 100+ frameworks" },
];

const CAPABILITIES = [
  "Unified detection and response across all infrastructure",
  "Real-time threat correlation via Kubric Data Graph",
  "Infrastructure lifecycle management",
  "Network performance monitoring and capacity forecasting",
  "Single-framework compliance support (NIST, CIS, SOC 2)",
  "Third-party risk management (basic tier)",
  ">90% MITRE ATT&CK coverage",
  "KubricAI automated triage and remediation",
];

export default function Xro() {
  return (
    <PageLayout>
      <PageBanner
        title="XRO — Small Business Platform"
        subtitle="Complete security and operations for small businesses. 7 essential Kubes delivering unified detection, response, infrastructure management, and compliance monitoring."
        phase="XRO"
      />

      {/* Kube Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">Included Kubes — 7 Core</p>
            <h2 className="text-headline text-foreground mb-12">Everything a small business needs</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-16">
              {KUBES.map((k, i) => (
                <motion.div
                  key={k.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 p-6 border border-border bg-secondary"
                >
                  <Check size={18} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-foreground mb-1">{k.code}</p>
                    <p className="text-sm text-muted-foreground">{k.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Capabilities */}
            <p className="text-label text-muted-foreground uppercase tracking-widest mb-6">Core Capabilities</p>
            <div className="grid md:grid-cols-2 gap-3">
              {CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-brand-orange font-bold mt-0.5">▸</span>
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-label text-brand-orange uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-headline text-white mb-4">Six ways to pay. Zero lock-in.</h2>
          <p className="text-body-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Choose from Precision Pay™, Flex Core™, Fractional™, APEX™, Project-Based, or Enterprise Custom — all designed around your business reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              View Pricing Models <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/assessment" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 font-semibold hover:bg-white/20 transition-colors">
              Take Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
