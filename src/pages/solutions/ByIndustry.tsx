/** By Industry — /solutions/by-industry — word-for-word from Solutions.docx page 12 */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const industries = [
  { name: "Financial Services", href: "/industries/financial-services" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Manufacturing", href: "/industries/manufacturing" },
  { name: "Retail", href: "/industries/retail" },
  { name: "Government & Public Sector", href: "/industries/public-sector" },
  { name: "Energy & Utilities", href: "/industries/energy-utilities" },
  { name: "Telecommunications", href: "/industries/telecommunications" },
  { name: "Transportation", href: "/industries/transportation" },
  { name: "Mining & Extraction", href: "/industries/mining-extraction" },
];

export default function ByIndustry() {
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
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#993619" }}>Solutions</span>
            <div className="h-[2px] w-16 my-6" style={{ background: "#993619" }} />
            <h1 className="font-black text-white mb-3 leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif" }}>
              By Industry
            </h1>
            <p className="text-xl font-semibold mb-6" style={{ color: "#993619" }}>Solutions Built for Your Sector.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Narrative ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Threats Differ by Industry. Regulations Differ. Solutions Should Too.</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <p className="text-[16px] leading-relaxed max-w-4xl" style={{ color: "#393837" }}>
            A financial services firm faces different adversaries than a manufacturer. A healthcare organization answers to different regulators than a government contractor. A retailer handles different data categories and regulatory obligations than a law firm or technology company. Generic security solutions are not calibrated for these distinctions.
          </p>
          <p className="text-[16px] leading-relaxed max-w-4xl mt-6" style={{ color: "#393837" }}>
            Industry-specific solutions address what makes your sector operationally and regulatorily unique: the threats you face, the data you are obligated to protect, and the frameworks you are required to satisfy.
          </p>
        </div>
      </section>

      {/* ── Industry Solutions ── */}
      <section className="py-20" style={{ background: "#EEE9E3" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Industry Solutions</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <p className="text-[14px] leading-relaxed max-w-4xl mb-10" style={{ color: "#5A5A5B" }}>
            Each industry page documents the compliance frameworks relevant to that sector, the threat actors known to target it, and the specific Kubric capabilities and ManageKube services that address its highest-priority risks.
          </p>
          <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={ind.href}
                  className="group flex items-center justify-between p-6 transition-all"
                  style={{ background: "#FEFBF6" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FFFCF7"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FEFBF6"}
                >
                  <span className="text-[15px] font-bold group-hover:text-[#993619] transition-colors" style={{ color: "#1D1D1B" }}>{ind.name}</span>
                  <ArrowRight size={14} style={{ color: "#993619" }} className="group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Get Started</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <div className="flex flex-wrap gap-4">
            <Link to="/industries" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90" style={{ background: "#993619", letterSpacing: "0.1em" }}>
              Browse All Industries <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all" style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
