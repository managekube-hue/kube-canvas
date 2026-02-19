/** Shared template for all Service detail pages — compliance dark theme */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

interface ServiceDetailPageProps {
  category: string;
  name: string;
  tagline: string;
  description: string;
  sections: { title: string; items: string[] }[];
  similar?: { label: string; href: string }[];
}

export const ServiceDetailPage = ({ category, name, tagline, description, sections, similar = [] }: ServiceDetailPageProps) => (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative overflow-hidden flex items-center" style={{ background: "#1D1D1B", minHeight: "48vh", paddingTop: "9rem", paddingBottom: "5rem" }}>
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }}>
          <source src={childPageVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.97) 40%, rgba(29,29,27,0.65) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 55%)" }} />
      </div>
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>{category}</span>
          <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
          <h1
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}
          >{name}</h1>
          {tagline && (
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#993619", marginBottom: "12px" }}>{tagline}</p>
          )}
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(205,202,197,0.70)", maxWidth: "640px" }}>{description}</p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
    </section>

    {/* ── Coverage sections ── */}
    <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{ background: "#FEFBF6", padding: "36px" }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px", borderTop: "2px solid #993619", paddingTop: "16px" }}>
                {sec.title}
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {sec.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <CheckCircle size={13} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section style={{ background: "#393837", padding: "80px 0" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>Get Started</p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Ready to get started with {name}?
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(205,202,197,0.50)", marginBottom: "36px" }}>
              Our team will assess your environment, scope the engagement, and deliver a clear roadmap.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
              >
                Request Assessment <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-semibold transition-all"
                style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
          {similar.length > 0 && (
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(205,202,197,0.30)", marginBottom: "18px" }}>Related Services</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(205,202,197,0.07)" }}>
                {similar.map(s => (
                  <Link
                    key={s.label}
                    to={s.href}
                    className="group flex items-center justify-between transition-all"
                    style={{ background: "#464648", padding: "18px 22px" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1D1D1B"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#464648"}
                  >
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff" }} className="group-hover:text-[#993619] transition-colors">{s.label}</span>
                    <ArrowRight size={14} style={{ color: "#993619" }} className="group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  </PageLayout>
);
