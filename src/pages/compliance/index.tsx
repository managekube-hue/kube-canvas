import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

/** Compliance Landing Page — ManageKube */

const FRAMEWORKS = [
  {
    id: "cmmc",
    label: "CMMC",
    fullName: "Cybersecurity Maturity Model Certification",
    audience: "Defense Contractors & DoD Supply Chain",
    href: "/compliance/cmmc",
  },
  {
    id: "hipaa",
    label: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    audience: "Healthcare Providers, Payers & Business Associates",
    href: "/compliance/hipaa",
  },
  {
    id: "soc2",
    label: "SOC 2",
    fullName: "Service Organization Control 2",
    audience: "SaaS Providers & Service Organizations",
    href: "/compliance/soc2",
  },
  {
    id: "pci-dss",
    label: "PCI-DSS",
    fullName: "Payment Card Industry Data Security Standard",
    audience: "Merchants, Payment Processors & Retail Organizations",
    href: "/compliance/pci-dss",
  },
  {
    id: "iso-27001",
    label: "ISO 27001",
    fullName: "International Information Security Management System",
    audience: "Global Organizations Seeking ISMS Certification",
    href: "/compliance/iso-27001",
  },
  {
    id: "nist-800-171",
    label: "NIST 800-171",
    fullName: "Protecting Controlled Unclassified Information",
    audience: "Federal Contractors & Defense Industrial Base",
    href: "/compliance/nist-800-171",
  },
  {
    id: "nist-800-53",
    label: "NIST 800-53",
    fullName: "Security Controls for Federal Information Systems",
    audience: "Federal Agencies & Critical Infrastructure",
    href: "/compliance/nist-800-53",
  },
  {
    id: "cjis",
    label: "CJIS",
    fullName: "Criminal Justice Information Services Security Policy",
    audience: "Law Enforcement & Government Agencies",
    href: "/compliance/cjis",
  },
  {
    id: "fedramp",
    label: "FedRAMP",
    fullName: "Federal Risk and Authorization Management Program",
    audience: "Cloud Service Providers & Federal Agencies",
    href: "/compliance/fedramp",
  },
  {
    id: "nist-csf",
    label: "NIST CSF",
    fullName: "NIST Cybersecurity Framework",
    audience: "All Organizations Seeking Risk-Based Security",
    href: "/compliance/nist-csf",
  },
  {
    id: "cis",
    label: "CIS Controls v8.1",
    fullName: "Center for Internet Security Critical Security Controls",
    audience: "All Organizations Seeking Prioritized Security Controls",
    href: "/compliance/cis-controls",
  },
  {
    id: "fisma",
    label: "FISMA",
    fullName: "Federal Information Security Modernization Act",
    audience: "Federal Agencies & Government Contractors",
    href: "/compliance/fisma",
  },
];

const CAPABILITIES = [
  {
    title: "Smart Question Consolidation",
    desc: "85–120 questions covering 1,200+ controls through multi-framework mapping. One assessment. Every framework.",
  },
  {
    title: "Automated Evidence Collection",
    desc: "Direct integration with infrastructure platforms eliminates manual evidence gathering.",
  },
  {
    title: "Remediation Roadmaps",
    desc: "90-day implementation plans with resource allocation and prioritized control remediation.",
  },
  {
    title: "Continuous Monitoring",
    desc: "Ongoing compliance posture tracking with drift detection and automated alerts.",
  },
  {
    title: "Audit-Ready Reporting",
    desc: "Pre-formatted audit deliverables, evidence bundles, and executive reporting delivered on your schedule.",
  },
  {
    title: "Multi-Framework Mapping",
    desc: "A single control verification satisfies requirements across CMMC, HIPAA, SOC 2, NIST, and ISO simultaneously.",
  },
];

export default function ComplianceLanding() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden min-h-[52vh] flex items-center" style={{ background: "#1D1D1B" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.25 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.96) 40%, rgba(29,29,27,0.7) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 50%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#993619" }}>Compliance Services</span>
            <div className="h-[2px] w-16 my-6" style={{ background: "#993619" }} />
            <h1
              className="font-black text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)", fontFamily: "'Special Elite', serif" }}
            >
              Achieve Continuous<br />
              <span style={{ color: "#993619" }}>Compliance.</span>
            </h1>
            <p className="text-xl leading-relaxed mb-4 max-w-2xl" style={{ color: "rgba(205,202,197,0.75)" }}>
              ManageKube delivers continuous compliance monitoring, automated evidence collection, and audit-ready reporting across all major regulatory frameworks — from a single managed service engagement.
            </p>
            <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: "rgba(205,202,197,0.45)" }}>
              We meet you where you are — whether you need a gap assessment, full compliance management, or a framework-specific audit program. Our GRC team handles the heavy lifting.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Compliance By Design ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Compliance By Design</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2
                className="font-black mb-5 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}
              >
                One managed service.<br />Every framework covered.
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: "#393837" }}>
                Our GRC KUBE maps your entire environment against 100+ compliance frameworks simultaneously. The Assessment KUBE identifies your technical gaps. We implement the controls and deliver continuous compliance posture management — you get audit-ready evidence and dashboards, we handle the operations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-5"
                  style={{ background: "#EEE9E3", borderLeft: "2px solid #993619" }}
                >
                  <h3 className="text-[13px] font-bold mb-2" style={{ color: "#1D1D1B" }}>{cap.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: "#5A5A5B" }}>{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Framework Grid ── */}
      <section className="py-20" style={{ background: "#EEE9E3" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Supported Frameworks</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <h2
            className="font-black mb-4 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}
          >
            12 Frameworks. One Managed Service.
          </h2>
          <p className="text-[15px] leading-relaxed mb-14 max-w-2xl" style={{ color: "#393837" }}>
            Select any framework below for detailed coverage information, capabilities, and how ManageKube delivers managed compliance for that specific regulatory requirement.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ border: "1px solid #CDCAC5" }}>
            {FRAMEWORKS.map((fw, i) => (
              <motion.div
                key={fw.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                style={{ borderRight: "1px solid #CDCAC5", borderBottom: "1px solid #CDCAC5", marginRight: "-1px", marginBottom: "-1px" }}
              >
                <Link
                  to={fw.href}
                  className="group block p-8 transition-all h-full"
                  style={{ background: "#FEFBF6" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FFFCF7"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FEFBF6"}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Shield size={16} style={{ color: "#993619", flexShrink: 0, marginTop: 2 }} />
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 transition-all group-hover:translate-x-1"
                      style={{ color: "#CDCAC5" }}
                    />
                  </div>
                  <p className="text-[13px] font-black mb-1 group-hover:text-[#993619] transition-colors" style={{ color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>
                    {fw.label}
                  </p>
                  <p className="text-[11px] mb-2 leading-snug" style={{ color: "#5A5A5B" }}>{fw.fullName}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#798498" }}>{fw.audience}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#1D1D1B" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Get Started</p>
              <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
              <h2
                className="font-black text-white mb-5 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "'Special Elite', serif" }}
              >
                Not sure where to start?<br />Start with a gap analysis.
              </h2>
              <p className="text-[15px] leading-relaxed mb-10" style={{ color: "rgba(205,202,197,0.55)" }}>
                Our Compliance Gap Analysis identifies where your environment stands against your required frameworks — and delivers a prioritized remediation roadmap with effort and cost estimates.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services/compliance-gap-analysis"
                  className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                  style={{ background: "#993619", letterSpacing: "0.1em" }}
                >
                  Start with a Gap Analysis <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
                  style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
                >
                  Talk to Our GRC Team
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Managed Compliance & GRC", href: "/services/managed-compliance", desc: "Continuous monitoring and evidence collection across 100+ frameworks." },
                { label: "Compliance Gap Analysis", href: "/services/compliance-gap-analysis", desc: "Framework-specific gap assessments with prioritized remediation plans." },
                { label: "GRC KUBE", href: "/kubes/grc-kube", desc: "The automation engine delivering continuous compliance posture monitoring." },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group flex items-center justify-between p-6 transition-all"
                  style={{ background: "#393837" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#464648"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#393837"}
                >
                  <div>
                    <p className="text-[14px] font-bold text-white mb-1 group-hover:text-[#993619] transition-colors">{item.label}</p>
                    <p className="text-[12px]" style={{ color: "rgba(205,202,197,0.45)" }}>{item.desc}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: "#993619", flexShrink: 0 }} className="group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
