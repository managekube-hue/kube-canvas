import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const modules = [
  // Infrastructure & Operations
  { id: "cio", name: "CIO", tagline: "Infrastructure Orchestration", description: "Core infrastructure lifecycle management, asset discovery, and operational oversight across your entire environment.", href: "/service-layer/cio", pillar: "INFRASTRUCTURE" },
  { id: "npm", name: "NPM", tagline: "Network Performance Monitoring", description: "Real-time network visibility with AI-powered capacity forecasting and traffic analysis.", href: "/service-layer/npm", pillar: "INFRASTRUCTURE" },
  { id: "mdm", name: "MDM", tagline: "Mobile Device Management", description: "Policy-driven mobile device governance for iOS and Android at enterprise scale.", href: "/service-layer/mdm", pillar: "INFRASTRUCTURE" },
  { id: "apm", name: "APM", tagline: "Application Performance Monitoring", description: "Full-stack application observability with distributed tracing and anomaly detection.", href: "/service-layer/apm", pillar: "INFRASTRUCTURE" },
  { id: "cfdr", name: "CFDR", tagline: "Configuration Drift Detection", description: "Continuous configuration compliance monitoring with automated drift remediation.", href: "/service-layer/cfdr", pillar: "INFRASTRUCTURE" },
  { id: "bdr", name: "BDR", tagline: "Backup & Disaster Recovery", description: "Backup verification and disaster recovery orchestration for guaranteed RTO/RPO compliance.", href: "/service-layer/bdr", pillar: "INFRASTRUCTURE" },
  // Security Detection & Response
  { id: "itdr", name: "ITDR", tagline: "Identity Threat Detection", description: "Identity threats stopped before escalation via Active Directory and Entra ID monitoring.", href: "/service-layer/itdr", pillar: "DETECTION & RESPONSE" },
  { id: "ndr", name: "NDR", tagline: "Network Detection & Response", description: "Network threats detected at the source with deep packet inspection and behavioural analytics.", href: "/service-layer/ndr", pillar: "DETECTION & RESPONSE" },
  { id: "cdr", name: "CDR", tagline: "Cloud Detection & Response", description: "Multi-cloud security monitoring for AWS, Azure, and GCP with unified cloud posture management.", href: "/service-layer/cdr", pillar: "DETECTION & RESPONSE" },
  { id: "sdr", name: "SDR", tagline: "Supply Chain Detection & Response", description: "SBOM analysis and software supply chain risk management across the development lifecycle.", href: "/service-layer/sdr", pillar: "DETECTION & RESPONSE" },
  { id: "adr", name: "ADR", tagline: "Application Detection & Response", description: "Application-level threat containment with WAF, RASP, and runtime protection.", href: "/service-layer/adr", pillar: "DETECTION & RESPONSE" },
  { id: "ddr", name: "DDR", tagline: "Data Detection & Response", description: "Data misuse and exfiltration prevention with DLP controls and insider threat detection.", href: "/service-layer/ddr", pillar: "DETECTION & RESPONSE" },
  { id: "easm", name: "EASM", tagline: "External Attack Surface Management", description: "Continuous discovery and monitoring of internet-facing assets, shadow IT, and exposed services.", href: "/service-layer/easm", pillar: "DETECTION & RESPONSE" },
  { id: "honeypot", name: "HONEYPOT", tagline: "Deception-Based Detection", description: "Deploy decoy assets to detect lateral movement and insider threats with zero false positives.", href: "/service-layer/honeypot", pillar: "DETECTION & RESPONSE" },
  // Intelligence & Governance
  { id: "ti", name: "TI", tagline: "Threat Intelligence", description: "Operationalised threat intelligence via MISP, EPSS scoring, and adversary tracking.", href: "/service-layer/ti", pillar: "INTELLIGENCE" },
  { id: "vdr", name: "VDR", tagline: "Vulnerability Detection & Response", description: "Vulnerabilities prioritised by real exploitability risk, not just CVSS scores.", href: "/service-layer/vdr", pillar: "INTELLIGENCE" },
  { id: "grc", name: "GRC", tagline: "Governance, Risk & Compliance", description: "Compliance automation across 100+ frameworks with continuous control monitoring and evidence collection.", href: "/service-layer/grc", pillar: "INTELLIGENCE" },
  { id: "strike", name: "STRIKE", tagline: "Strategic Intelligence & Kill-chain Enrichment", description: "Advanced adversary tracking, campaign attribution, and kill-chain mapping for proactive defence.", href: "/service-layer/strike", pillar: "INTELLIGENCE" },
  { id: "msp", name: "MSP", tagline: "Managed Service Provider", description: "Multi-tenant service delivery, SLA monitoring, and operational dashboards for managed IT.", href: "/service-layer/msp", pillar: "INTELLIGENCE" },
  { id: "mssp", name: "MSSP", tagline: "Managed Security Service Provider", description: "Security-as-a-service delivery, SOC operations, and client reporting for managed security.", href: "/service-layer/mssp", pillar: "INTELLIGENCE" },
];

const pillars = ["INFRASTRUCTURE", "DETECTION & RESPONSE", "INTELLIGENCE"];

const ServiceLayerOverview = () => {
  return (
    <PageLayout>
      <PageBanner
        title="The Service Layer"
        subtitle="18 specialised detection, response, and operations modules delivering targeted coverage across infrastructure, security, and compliance. Each module maps directly to a set of OSS libraries, NATS subjects, and KAI orchestration personas."
        phase="CAPABILITIES"
      />

      {pillars.map(pillar => (
        <section key={pillar} className="py-16 lg:py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-8 font-mono">// {pillar}</p>
            <div className="max-w-6xl mx-auto">
              {modules.filter(k => k.pillar === pillar).map((mod, index) => (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={mod.href}
                    className="block border-t border-border py-10 lg:py-12 group hover:bg-secondary/30 transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-4">
                        <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-1 group-hover:translate-x-2 transition-transform font-mono">
                          {mod.name}
                        </h2>
                        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{mod.tagline}</span>
                      </div>
                      <div className="lg:col-span-6">
                        <p className="text-base text-muted-foreground leading-relaxed">{mod.description}</p>
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
            Onboard with ManageKube and start detecting threats across your infrastructure in days, not months.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceLayerOverview;
