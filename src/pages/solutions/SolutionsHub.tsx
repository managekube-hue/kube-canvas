/** Solutions Hub: /solutions, word-for-word from Solutions.docx pages 1-2 */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const findYourSolution = [
  {
    title: "By Problem",
    desc: "Start with the challenge you are trying to solve. Alert fatigue. Compliance pressure. Tool sprawl. Cloud cost overruns. We show you the path.",
    href: "/find-by-problem",
  },
  {
    title: "By Size",
    desc: "Organizations scale differently. SMB, SME, Enterprise: each has distinct requirements. Solutions are structured accordingly.",
    href: "/solutions/by-market-size",
  },
  {
    title: "By Industry",
    desc: "Regulations differ. Threats differ. Compliance frameworks differ. Industry-specific solutions address what makes your sector operationally unique.",
    href: "/solutions/by-industry",
  },
  {
    title: "By Service Type",
    desc: "Some organizations want full outsourcing. Some want partnership. Some want the platform to run themselves. All three delivery models are available.",
    href: "/solutions/by-service-type",
  },
];

const inThisSection = [
  { label: "Find By Problem", desc: "Browse solutions by the challenge you are facing.", href: "/find-by-problem" },
  { label: "Find By Size", desc: "Solutions structured for SMB, SME, and Enterprise organizations.", href: "/solutions/by-market-size" },
  { label: "By Industry", desc: "Industry-specific solutions addressed under /industries/*.", href: "/solutions/by-industry" },
  { label: "By Market Size", desc: "SMB, SME, and Enterprise solution deep dives.", href: "/solutions/by-market-size" },
  { label: "By Service Type", desc: "Fully Managed, Co-Managed, and Self-Managed delivery models.", href: "/solutions/by-service-type" },
];

export default function SolutionsHub() {
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
            <h1
              className="font-black text-white mb-3 leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif" }}
            >
              One Partner. Every Challenge. Any Size. Any Industry.
            </h1>
            <p className="text-xl font-semibold mb-6" style={{ color: "#993619" }}>
              Your Organization Is Unique. Your Partner Should Meet You Where You Are.
            </p>
            <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: "rgba(205,202,197,0.7)" }}>
              Expert services to design, deploy, and operate your security and IT infrastructure.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── Narrative ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[16px] leading-relaxed max-w-4xl" style={{ color: "#393837" }}>
            Security and IT challenges do not present identically across organizations. A fast-growing startup has different priorities than a regulated enterprise. A manufacturer faces a different threat profile than a financial services firm. An organization building its security program from the ground up requires different support than one with a mature team looking to extend coverage and fill gaps.
          </p>
          <p className="text-[16px] leading-relaxed max-w-4xl mt-6" style={{ color: "#393837" }}>
            ManageKube solutions are structured to meet you where you are — by problem, by size, by industry, and by service model.
          </p>
        </div>
      </section>

      {/* ── Find Your Solution ── */}
      <section className="py-20" style={{ background: "#EEE9E3" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Find Your Solution</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {findYourSolution.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={item.href}
                  className="group block p-8 transition-all"
                  style={{ background: "#FEFBF6" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FFFCF7"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FEFBF6"}
                >
                  <h3
                    className="font-black mb-3 group-hover:text-[#993619] transition-colors"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#393837" }}>{item.desc}</p>
                  <span className="text-[12px] font-bold flex items-center gap-2 uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: "#993619", letterSpacing: "0.1em" }}>
                    Explore <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In This Section ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>In This Section</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <div className="space-y-[1px]" style={{ background: "#CDCAC5" }}>
            {inThisSection.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="group flex items-center justify-between p-6 transition-all"
                style={{ background: "#FEFBF6" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEE9E3"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FEFBF6"}
              >
                <div>
                  <p className="text-[15px] font-bold group-hover:text-[#993619] transition-colors" style={{ color: "#1D1D1B" }}>{item.label}</p>
                  <p className="text-[13px]" style={{ color: "#5A5A5B" }}>{item.desc}</p>
                </div>
                <ArrowRight size={14} style={{ color: "#993619" }} className="group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#993619" }}>Get Started</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: "#993619" }} />
          <h2
            className="font-black text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif" }}
          >
            Ready to find your solution?
          </h2>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
              style={{ background: "#993619", letterSpacing: "0.1em" }}
            >
              Contact Sales <ArrowRight size={14} />
            </Link>
            <Link
              to="/service-tiers"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
              style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
            >
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
