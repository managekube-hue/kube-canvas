import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const kubes = [
  // Infrastructure & Operations
  { id: "cio", name: "CIO KUBE", tagline: "Infrastructure Orchestration", description: "Core infrastructure lifecycle management, asset discovery, and operational oversight across your entire environment.", href: "/kubes/cio-kube", pillar: "INFRASTRUCTURE" },
  { id: "npm", name: "NPM KUBE", tagline: "Network Performance Monitoring", description: "Real-time network visibility with AI-powered capacity forecasting and traffic analysis.", href: "/kubes/npm-kube", pillar: "INFRASTRUCTURE" },
  { id: "mdm", name: "MDM KUBE", tagline: "Mobile Device Management", description: "Policy-driven mobile device governance for iOS and Android at enterprise scale.", href: "/kubes/mdm-kube", pillar: "INFRASTRUCTURE" },
  { id: "apm", name: "APM KUBE", tagline: "Application Performance Monitoring", description: "Full-stack application observability with distributed tracing and anomaly detection.", href: "/kubes/apm-kube", pillar: "INFRASTRUCTURE" },
  { id: "cfdr", name: "CFDR KUBE", tagline: "Configuration Drift Detection", description: "Continuous configuration compliance monitoring with automated drift remediation.", href: "/kubes/cfdr-kube", pillar: "INFRASTRUCTURE" },
  { id: "bdr", name: "BDR KUBE", tagline: "Backup & Disaster Recovery", description: "Backup verification and disaster recovery orchestration for guaranteed RTO/RPO compliance.", href: "/kubes/bdr-kube", pillar: "INFRASTRUCTURE" },
  // Security Detection & Response
  { id: "itdr", name: "ITDR KUBE", tagline: "Identity Threat Detection", description: "Identity threats stopped before escalation via Active Directory and Entra ID monitoring.", href: "/kubes/itdr-kube", pillar: "DETECTION & RESPONSE" },
  { id: "ndr", name: "NDR KUBE", tagline: "Network Detection & Response", description: "Network threats detected at the source with deep packet inspection and behavioural analytics.", href: "/kubes/ndr-kube", pillar: "DETECTION & RESPONSE" },
  { id: "cdr", name: "CDR KUBE", tagline: "Cloud Detection & Response", description: "Multi-cloud security monitoring for AWS, Azure, and GCP with unified cloud posture management.", href: "/kubes/cdr-kube", pillar: "DETECTION & RESPONSE" },
  { id: "sdr", name: "SDR KUBE", tagline: "Supply Chain Detection & Response", description: "SBOM analysis and software supply chain risk management across the development lifecycle.", href: "/kubes/sdr-kube", pillar: "DETECTION & RESPONSE" },
  { id: "adr", name: "ADR KUBE", tagline: "Application Detection & Response", description: "Application-level threat containment with WAF, RASP, and runtime protection.", href: "/kubes/adr-kube", pillar: "DETECTION & RESPONSE" },
  { id: "ddr", name: "DDR KUBE", tagline: "Data Detection & Response", description: "Data misuse and exfiltration prevention with DLP controls and insider threat detection.", href: "/kubes/ddr-kube", pillar: "DETECTION & RESPONSE" },
  // Intelligence & Governance
  { id: "ti", name: "TI KUBE", tagline: "Threat Intelligence", description: "Operationalised threat intelligence via MISP, EPSS scoring, and adversary tracking.", href: "/kubes/ti-kube", pillar: "INTELLIGENCE" },
  { id: "vdr", name: "VDR KUBE", tagline: "Vulnerability Detection & Response", description: "Vulnerabilities prioritised by real exploitability risk, not just CVSS scores.", href: "/kubes/vdr-kube", pillar: "INTELLIGENCE" },
  { id: "grc", name: "GRC KUBE", tagline: "Governance, Risk & Compliance", description: "Compliance automation across 100+ frameworks with continuous control monitoring and evidence collection.", href: "/kubes/grc-kube", pillar: "INTELLIGENCE" },
];

const pillars = ["INFRASTRUCTURE", "DETECTION & RESPONSE", "INTELLIGENCE"];

const KubesOverview = () => {
  return (
    <PageLayout>
      <PageBanner
        title="15 Detection & Response Modules"
        subtitle="Targeted capability coverage across infrastructure, security detection, and intelligence. Each Kube maps directly to a set of OSS libraries, NATS subjects, and KAI orchestration personas."
        phase="CAPABILITIES"
      />

      {pillars.map(pillar => (
        <section key={pillar} className="py-16 lg:py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-8 font-mono">// {pillar}</p>
            <div className="max-w-6xl mx-auto">
              {kubes.filter(k => k.pillar === pillar).map((kube, index) => (
                <motion.div
                  key={kube.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={kube.href}
                    className="block border-t border-border py-10 lg:py-12 group hover:bg-secondary/30 transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-4">
                        <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-1 group-hover:translate-x-2 transition-transform font-mono">
                          {kube.name}
                        </h2>
                        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{kube.tagline}</span>
                      </div>
                      <div className="lg:col-span-6">
                        <p className="text-base text-muted-foreground leading-relaxed">{kube.description}</p>
                      </div>
                      <div className="lg:col-span-2 flex items-center justify-end">
                        <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Onboard with the Kubric platform and start detecting threats across your infrastructure in days, not months.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Onboard Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default KubesOverview;
