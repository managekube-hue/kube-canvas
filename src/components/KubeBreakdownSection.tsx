import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    label: "INFRASTRUCTURE",
    kubes: [
      { id: "cio", name: "CIO KUBE", tagline: "Infrastructure Orchestration", description: "Core infrastructure lifecycle management, asset discovery, and operational oversight across your entire environment.", href: "/kubes/cio-kube" },
      { id: "npm", name: "NPM KUBE", tagline: "Network Performance Monitoring", description: "Real-time network visibility with AI-powered capacity forecasting and traffic analysis.", href: "/kubes/npm-kube" },
      { id: "mdm", name: "MDM KUBE", tagline: "Mobile Device Management", description: "Policy-driven mobile device governance for iOS and Android at enterprise scale.", href: "/kubes/mdm-kube" },
      { id: "apm", name: "APM KUBE", tagline: "Application Performance Monitoring", description: "Full-stack application observability with distributed tracing and anomaly detection.", href: "/kubes/apm-kube" },
      { id: "cfdr", name: "CFDR KUBE", tagline: "Configuration Drift Detection", description: "Continuous configuration compliance monitoring with automated drift remediation.", href: "/kubes/cfdr-kube" },
      { id: "bdr", name: "BDR KUBE", tagline: "Backup & Disaster Recovery", description: "Backup verification and disaster recovery orchestration for guaranteed RTO/RPO compliance.", href: "/kubes/bdr-kube" },
    ]
  },
  {
    label: "DETECTION & RESPONSE",
    kubes: [
      { id: "itdr", name: "ITDR KUBE", tagline: "Identity Threat Detection", description: "Identity threats stopped before escalation via Active Directory and Entra ID monitoring.", href: "/kubes/itdr-kube" },
      { id: "ndr", name: "NDR KUBE", tagline: "Network Detection & Response", description: "Network threats detected at the source with deep packet inspection and behavioural analytics.", href: "/kubes/ndr-kube" },
      { id: "cdr", name: "CDR KUBE", tagline: "Cloud Detection & Response", description: "Multi-cloud security monitoring for AWS, Azure, and GCP with unified cloud posture management.", href: "/kubes/cdr-kube" },
      { id: "sdr", name: "SDR KUBE", tagline: "Supply Chain Detection & Response", description: "SBOM analysis and software supply chain risk management across the development lifecycle.", href: "/kubes/sdr-kube" },
      { id: "adr", name: "ADR KUBE", tagline: "Application Detection & Response", description: "Application-level threat containment with WAF, RASP, and runtime protection.", href: "/kubes/adr-kube" },
      { id: "ddr", name: "DDR KUBE", tagline: "Data Detection & Response", description: "Data misuse and exfiltration prevention with DLP controls and insider threat detection.", href: "/kubes/ddr-kube" },
    ]
  },
  {
    label: "INTELLIGENCE",
    kubes: [
      { id: "ti", name: "TI KUBE", tagline: "Threat Intelligence", description: "Operationalised threat intelligence via MISP, EPSS scoring, and adversary tracking.", href: "/kubes/ti-kube" },
      { id: "vdr", name: "VDR KUBE", tagline: "Vulnerability Detection & Response", description: "Vulnerabilities prioritised by real exploitability risk, not just CVSS scores.", href: "/kubes/vdr-kube" },
      { id: "grc", name: "GRC KUBE", tagline: "Governance, Risk & Compliance", description: "Compliance automation across 100+ frameworks with continuous control monitoring and evidence collection.", href: "/kubes/grc-kube" },
    ]
  },
];

export const KubeBreakdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 section-white" id="kubes">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <div className="accent-line mb-8" />
          <h2 className="text-headline text-foreground mb-6">
            Fifteen <span className="text-brand-orange">Kubes</span>.
            <br />Three Pillars.
          </h2>
          <p className="text-body-xl text-muted-foreground">
            Each Kube is a targeted capability module mapping directly to OSS libraries, NATS subjects, and KAI orchestration personas.
          </p>
        </motion.div>

        {/* Pillars */}
        {pillars.map((pillar, pi) => (
          <div key={pillar.label} className="mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: pi * 0.1 }}
              className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-4 font-mono"
            >
              // {pillar.label}
            </motion.p>
            <div className="space-y-0">
              {pillar.kubes.map((kube, index) => (
                <motion.div
                  key={kube.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + pi * 0.1 + index * 0.05 }}
                >
                  <Link
                    to={kube.href}
                    className="block border-t border-border py-6 lg:py-8 group"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                      <div className="lg:col-span-3">
                        <h3 className="text-title text-foreground group-hover:text-brand-orange transition-colors font-mono">
                          {kube.name}
                        </h3>
                      </div>
                      <div className="lg:col-span-2">
                        <span className="text-label text-brand-orange">{kube.tagline}</span>
                      </div>
                      <div className="lg:col-span-6">
                        <p className="text-body-lg text-muted-foreground">{kube.description}</p>
                      </div>
                      <div className="lg:col-span-1 flex justify-end">
                        <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-2 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="border-t border-border pt-12 mt-8"
        >
          <Link
            to="/kubes"
            className="inline-flex items-center gap-3 text-subtitle text-foreground hover:text-brand-orange transition-colors group"
          >
            Explore all 15 Kubes
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
