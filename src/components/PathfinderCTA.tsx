import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ClipboardList, Shield, LayoutGrid, Server, BookOpen, ArrowRight } from "lucide-react";
import footerCtaVideo from "@/assets/footer-cta-video.mp4";

/** DO NOT TOUCH - PathfinderCTA pathways configuration */
const pathways = [
  { icon: ClipboardList, title: "Onboard Today", description: "Full assessment — score, tier, and pricing", href: "/assessment/start" },
  { icon: LayoutGrid, title: "Service Layer", description: "18 detection & response modules", href: "/service-layer" },
  { icon: Server, title: "Service Tiers", description: "XRO, XMX & XME service tiers", href: "/service-tiers" },
  { icon: Shield, title: "Managed Services", description: "NOC, SOC, Compliance & Cloud", href: "/services" },
  { icon: Search, title: "Find by Problem", description: "Start from the challenge you face", href: "/find-by-problem" },
  { icon: BookOpen, title: "Read the Docs", description: "K-DOCS technical documentation", href: "/documentation" },
];
/** END DO NOT TOUCH */

export const PathfinderCTA = () => (
  <section className="relative overflow-hidden" style={{ minHeight: "680px", display: "flex", alignItems: "center" }}>
    <video
      autoPlay loop muted playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.45 }}
    >
      <source src={footerCtaVideo} type="video/mp4" />
    </video>
    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.97) 30%, rgba(12,12,12,0.72) 65%, rgba(12,12,12,0.30) 100%)" }} />
    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,1) 0%, transparent 45%, rgba(12,12,12,0.4) 100%)" }} />

    <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10 py-24">
      {/* Eyebrow + headline — hero style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
          Where would you like to go?
        </p>
        <div style={{ width: "56px", height: "2px", background: "#993619", marginBottom: "20px" }} />
        <h2
          className="font-black text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "'Special Elite', serif", lineHeight: 1.05, marginBottom: "8px" }}
        >
          Find Your Path
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.50)", marginTop: "10px", maxWidth: "480px", lineHeight: 1.7 }}>
          Every transformation starts somewhere. Choose your entry point.
        </p>
      </motion.div>

      {/* Pathway cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {pathways.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              to={p.href}
              className="group flex flex-col items-start bg-white/5 border border-white/10 hover:bg-brand-orange hover:border-brand-orange transition-all h-full"
              style={{ padding: "28px 24px", minHeight: "220px" }}
            >
              <p.icon className="text-brand-orange group-hover:text-white mb-6 transition-colors" style={{ width: "32px", height: "32px" }} strokeWidth={1.5} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1.3, marginBottom: "6px" }} className="text-white">{p.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.6 }} className="text-white/55 group-hover:text-white/80 transition-colors flex-1">{p.description}</p>
              <ArrowRight style={{ width: "18px", height: "18px", marginTop: "16px" }} className="text-white/20 group-hover:text-white transition-colors group-hover:translate-x-1 duration-200" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
