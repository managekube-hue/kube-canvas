import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const ALL_15_KUBES = [
  { code: "CIO KUBE", tier: "XRO", name: "Core Infrastructure Orchestration" },
  { code: "NPM KUBE", tier: "XRO", name: "Network Performance Monitoring" },
  { code: "ITDR KUBE", tier: "XRO", name: "Identity Threat Detection & Response" },
  { code: "NDR KUBE", tier: "XRO", name: "Network Threat Detection & Response" },
  { code: "VDR KUBE", tier: "XRO", name: "Vulnerability Detection & Response" },
  { code: "CFDR KUBE", tier: "XRO", name: "Configuration Drift Detection & Response" },
  { code: "GRC KUBE", tier: "XRO", name: "Governance, Risk & Compliance" },
  { code: "MDM KUBE", tier: "XMM", name: "Mobile Device Management" },
  { code: "APM KUBE", tier: "XMM", name: "Application Performance Management" },
  { code: "CDR KUBE", tier: "XMM", name: "Cloud Detection & Response" },
  { code: "ADR KUBE", tier: "XMM", name: "Application Detection & Response" },
  { code: "BDR KUBE", tier: "XMM", name: "Backup & Disaster Recovery" },
  { code: "SDR KUBE", tier: "XME", name: "Software Supply Chain Detection & Response" },
  { code: "DDR KUBE", tier: "XME", name: "Data Detection & Response (DLP)" },
  { code: "TI KUBE", tier: "XME", name: "Threat Intelligence" },
];

const ENTERPRISE_CAPABILITIES = [
  "Supply chain cyber risk (SCDR) — included",
  "STRIKE strategic intelligence — included",
  "Attack surface intelligence — included",
  "Intelligence feeds (STIX/TAXII) — included",
  "MIR incident response — included",
  "Honeypots — included",
  "Software supply chain protection",
  "Data loss prevention (DLP)",
  ">90% MITRE ATT&CK coverage",
  "Dedicated KubricAI orchestration",
  "White-label multi-tenant support",
  "Custom SLA and support tiers",
];

const TIER_COLORS: Record<string, string> = {
  XRO: "border-border bg-secondary",
  XMM: "border-brand-orange/30 bg-white",
  XME: "border-brand-orange bg-brand-orange/5",
};

export default function Xme() {
  return (
    <PageLayout>
      <PageBanner
        title="XME — Enterprise Platform"
        subtitle="Complete enterprise security and operations. All 15 Kubes providing comprehensive coverage across infrastructure, applications, cloud, supply chain, data, and threat intelligence."
        phase="XME"
      />

      {/* All 15 Kubes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-label text-brand-orange uppercase tracking-widest mb-2">All 15 Kubes Included</p>
            <h2 className="text-headline text-foreground mb-3">Complete platform coverage</h2>
            <p className="text-muted-foreground mb-12">XME includes every Kube from XRO and XMM, plus three enterprise-exclusive modules.</p>

            <div className="grid md:grid-cols-3 gap-3 mb-16">
              {ALL_15_KUBES.map((k, i) => (
                <motion.div
                  key={k.code}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-start gap-3 p-4 border-2 ${TIER_COLORS[k.tier]}`}
                >
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-foreground">{k.code}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{k.name}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${k.tier === "XME" ? "text-brand-orange" : "text-muted-foreground/50"}`}>{k.tier}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enterprise Capabilities */}
            <p className="text-label text-muted-foreground uppercase tracking-widest mb-6">Enterprise Capabilities</p>
            <div className="grid md:grid-cols-2 gap-3">
              {ENTERPRISE_CAPABILITIES.map((cap) => (
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
            Enterprise Custom engagements available for complex, multi-year transformations. All models include zero lock-in, 30-day termination clauses, and full documentation handoff.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              View Pricing Models <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 font-semibold hover:bg-white/20 transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
