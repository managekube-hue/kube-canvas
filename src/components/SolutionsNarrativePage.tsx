/** Shared template for Solutions narrative pages: matches ComplianceDetailPage design */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

interface NarrativeSection {
  title: string;
  body?: string;
  items?: string[];
}

interface CTALink {
  label: string;
  href: string;
}

interface SolutionsNarrativePageProps {
  category: string;
  title: string;
  tagline?: string;
  description: string;
  sections?: NarrativeSection[];
  tableData?: { col1: string; col2: string; col3: string }[];
  ctaPrimary?: CTALink;
  ctaSecondary?: CTALink;
  ctaTertiary?: CTALink;
  relatedLinks?: CTALink[];
}

export const SolutionsNarrativePage = ({
  category, title, tagline, description,
  sections = [], tableData, ctaPrimary, ctaSecondary, ctaTertiary,
  relatedLinks = []
}: SolutionsNarrativePageProps) => {
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
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#993619" }}>{category}</span>
            <div className="h-[2px] w-16 my-6" style={{ background: "#993619" }} />
            <h1
              className="font-black text-white mb-3 leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif" }}
            >
              {title}
            </h1>
            {tagline && (
              <p className="text-xl font-semibold mb-6" style={{ color: "#993619" }}>{tagline}</p>
            )}
            <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: "rgba(205,202,197,0.7)" }}>{description}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Body Sections ── */}
      {sections.map((sec, idx) => (
        <section key={sec.title} className="py-20" style={{ background: idx % 2 === 0 ? "#FEFBF6" : "#EEE9E3" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>{sec.title}</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
            {sec.body && (
              <p className="text-[16px] leading-relaxed max-w-4xl mb-8" style={{ color: "#393837" }}>{sec.body}</p>
            )}
            {sec.items && sec.items.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
                {sec.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="p-6 flex items-start gap-3"
                    style={{ background: idx % 2 === 0 ? "#FEFBF6" : "#EEE9E3" }}
                  >
                    <CheckCircle size={14} style={{ color: "#993619", flexShrink: 0, marginTop: 2 }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: "#393837" }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ── Table Data (for by-market-size pages) ── */}
      {tableData && tableData.length > 0 && (
        <section className="py-20" style={{ background: "#EEE9E3" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
              {tableData.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="grid md:grid-cols-3 gap-6 p-8"
                  style={{ background: "#FEFBF6" }}
                >
                  <p className="text-[16px] font-black" style={{ color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>{row.col1}</p>
                  <p className="text-[14px] font-semibold" style={{ color: "#393837" }}>{row.col2}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#5A5A5B" }}>{row.col3}</p>
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
                Ready to find your solution?
              </h2>
              <div className="flex flex-wrap gap-4 mt-8">
                {ctaPrimary && (
                  <Link
                    to={ctaPrimary.href}
                    className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                    style={{ background: "#993619", letterSpacing: "0.1em" }}
                  >
                    {ctaPrimary.label} <ArrowRight size={14} />
                  </Link>
                )}
                {ctaSecondary && (
                  <Link
                    to={ctaSecondary.href}
                    className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
                    style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
                {ctaTertiary && (
                  <Link
                    to={ctaTertiary.href}
                    className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
                    style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
                  >
                    {ctaTertiary.label}
                  </Link>
                )}
              </div>
            </div>
            <div>
              {relatedLinks.length > 0 && (
                <>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(205,202,197,0.3)" }}>Related Pages</p>
                  <div className="space-y-[1px]" style={{ background: "rgba(205,202,197,0.07)" }}>
                    {relatedLinks.map(s => (
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
