import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const KUBES_XRO = [
  "CIO KUBE — Core Infrastructure Orchestration",
  "NPM KUBE — Network Performance Monitoring",
  "ITDR KUBE — Identity Threat Detection & Response",
  "NDR KUBE — Network Threat Detection & Response",
  "VDR KUBE — Vulnerability Detection & Response",
  "CFDR KUBE — Configuration Drift Detection & Response",
  "GRC KUBE — Governance, Risk & Compliance",
];

const KUBES_XMM = [
  { code: "MDM KUBE", name: "Mobile Device Management — policy-driven governance for iOS and Android" },
  { code: "APM KUBE", name: "Application Performance Management — full-stack observability with distributed tracing" },
  { code: "CDR KUBE", name: "Cloud Detection & Response — multi-cloud security for AWS, Azure, GCP" },
  { code: "ADR KUBE", name: "Application Detection & Response — WAF, RASP, and API threat containment" },
  { code: "BDR KUBE", name: "Backup & Disaster Recovery — verification and orchestration" },
];

const CAPABILITIES = [
  "All 7 XRO Kubes included",
  "Extended detection across 12 attack surfaces",
  "Mobile and application monitoring",
  "Cloud security posture management (CSPM)",
  "Web application firewall (WAF)",
  "Disaster recovery orchestration",
  "External attack surface management (included)",
  "Cyber risk quantification (included)",
  "Third-party cyber risk management (comprehensive)",
  ">90% MITRE ATT&CK coverage",
];

export default function Xmm() {
  return (
    <PageLayout>
      <PageBanner
        title="XMM — SME Platform"
        subtitle="Advanced security and operations for growing mid-market organizations. 12 Kubes delivering comprehensive detection, response, mobile, cloud, and disaster recovery."
        phase="XMM"
      />

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">

            {/* XRO inherited */}
            <div className="mb-12">
              <p className="text-label text-brand-orange uppercase tracking-widest mb-2">Included from XRO — 7 Kubes</p>
              <h2 className="text-headline text-foreground mb-8">Built on XRO's foundation</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {KUBES_XRO.map((k) => (
                  <div key={k} className="flex items-start gap-3 p-4 border border-border bg-secondary text-sm text-muted-foreground">
                    <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {k}
                  </div>
                ))}
              </div>
            </div>

            {/* XMM additions */}
            <div className="mb-16">
              <p className="text-label text-brand-orange uppercase tracking-widest mb-2">Added in XMM — 5 Kubes</p>
              <h3 className="text-2xl font-black text-foreground mb-8">Extended coverage</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {KUBES_XMM.map((k, i) => (
                  <motion.div
                    key={k.code}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-6 border-2 border-brand-orange/30 bg-white"
                  >
                    <Check size={18} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-foreground mb-1">{k.code}</p>
                      <p className="text-sm text-muted-foreground">{k.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* All Capabilities */}
            <p className="text-label text-muted-foreground uppercase tracking-widest mb-6">All Capabilities</p>
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
