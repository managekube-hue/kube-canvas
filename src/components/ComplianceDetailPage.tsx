/** Shared template for compliance framework pages */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

interface ComplianceDetailPageProps {
  framework: string;
  fullName: string;
  audience: string;
  tagline?: string;
  description: string;
  whereItBreaks?: string[];
  capabilitiesBody?: string;
  features: string[];
  outcome?: string;
  managedServices?: { title: string; items: string[] }[];
  similar?: { label: string; href: string }[];
}

export const ComplianceDetailPage = ({
  framework, fullName, audience, tagline, description,
  whereItBreaks = [], capabilitiesBody, features, outcome,
  managedServices = [], similar = []
}: ComplianceDetailPageProps) => {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden min-h-[48vh] flex items-center" style={{ background: "#1D1D1B" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.97) 40%, rgba(29,29,27,0.65) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 55%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#993619" }}>Compliance Framework</span>
            <div className="h-[2px] w-16 my-6" style={{ background: "#993619" }} />
            <h1
              className="font-black text-white mb-3 leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif" }}
            >
              {framework}
            </h1>
            {tagline && (
              <p className="text-xl font-semibold mb-3" style={{ color: "#993619" }}>{tagline}</p>
            )}
            <p className="text-[13px] font-bold italic mb-2" style={{ color: "rgba(205,202,197,0.5)" }}>{fullName}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(205,202,197,0.3)" }}>{audience}</p>
            <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: "rgba(205,202,197,0.7)" }}>{description}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Where Programs Break Down ── */}
      {whereItBreaks.length > 0 && (
        <section className="py-20" style={{ background: "#FEFBF6" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Where {framework} Programs Break Down</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
            <div className="grid md:grid-cols-3 gap-[1px]" style={{ background: "#CDCAC5" }}>
              {whereItBreaks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-8 flex items-start gap-4"
                  style={{ background: "#FEFBF6" }}
                >
                  <AlertTriangle size={14} style={{ color: "#993619", flexShrink: 0, marginTop: 3 }} />
                  <p className="text-[13px] leading-relaxed" style={{ color: "#393837" }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Capabilities ── */}
      {capabilitiesBody && (
        <section className="py-20" style={{ background: "#EEE9E3" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>{framework} Capabilities</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
            <p className="text-[16px] leading-relaxed max-w-4xl" style={{ color: "#393837" }}>{capabilitiesBody}</p>
          </div>
        </section>
      )}

      {/* ── Features & Coverage ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Features & Coverage</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <h2
            className="font-black mb-12 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}
          >
            What's covered in your {framework} managed service
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-6 flex items-start gap-3"
                style={{ background: "#FEFBF6" }}
              >
                <Shield size={14} style={{ color: "#993619", flexShrink: 0, marginTop: 2 }} />
                <span className="text-[13px] leading-relaxed" style={{ color: "#393837" }}>{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Outcome ── */}
      {outcome && (
        <section className="py-20" style={{ background: "#1D1D1B" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>The Outcome</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
            <div className="max-w-3xl space-y-4">
              {outcome.split("\n\n").map((para, i) => (
                <p key={i} className="text-[16px] leading-relaxed" style={{ color: i === 0 ? "rgba(205,202,197,0.75)" : i === outcome.split("\n\n").length - 1 ? "#993619" : "rgba(205,202,197,0.5)" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Managed Service Delivery ── */}
      {managedServices.length > 0 && (
        <section className="py-20" style={{ background: "#EEE9E3" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>How We Deliver It</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
            <h2
              className="font-black mb-12 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}
            >
              Managed {framework} service delivery
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {managedServices.map((sec, i) => (
                <motion.div
                  key={sec.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-8"
                  style={{ background: "#FEFBF6", borderTop: "2px solid #993619" }}
                >
                  <h3 className="text-[16px] font-black mb-6" style={{ color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>{sec.title}</h3>
                  <ul className="space-y-3">
                    {sec.items.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle size={13} style={{ color: "#993619", flexShrink: 0, marginTop: 2 }} />
                        <span className="text-[13px] leading-relaxed" style={{ color: "#393837" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Get Started</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2
                className="font-black text-white mb-5 leading-tight"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif" }}
              >
                Start with a {framework} gap analysis.
              </h2>
              <p className="text-[15px] leading-relaxed mb-10" style={{ color: "rgba(205,202,197,0.5)" }}>
                Our team evaluates your current posture against {framework} requirements, identifies control deficiencies, and delivers a prioritized remediation roadmap with effort and cost estimates.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services/compliance-gap-analysis"
                  className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                  style={{ background: "#993619", letterSpacing: "0.1em" }}
                >
                  Request a Gap Analysis <ArrowRight size={14} />
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
            <div>
              {similar.length > 0 && (
                <>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(205,202,197,0.3)" }}>Related Frameworks</p>
                  <div className="space-y-[1px]" style={{ background: "rgba(205,202,197,0.07)" }}>
                    {similar.map(s => (
                      <Link
                        key={s.label}
                        to={s.href}
                        className="group flex items-center justify-between p-5 transition-all"
                        style={{ background: "#464648" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1D1D1B"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#464648"}
                      >
                        <span className="text-[14px] font-semibold text-white group-hover:text-[#993619] transition-colors">{s.label}</span>
                        <ArrowRight size={14} style={{ color: "#993619" }} className="group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
