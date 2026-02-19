import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ClipboardList, Shield, LayoutGrid, Server, BookOpen, ArrowRight } from "lucide-react";

/** DO NOT TOUCH - PathfinderCTA pathways configuration */
const pathways = [
  { icon: ClipboardList, title: "Free Assessment", description: "Map your security posture in minutes", href: "/assessment" },
  { icon: LayoutGrid, title: "Explore Kubes", description: "15 detection & response modules", href: "/kubes" },
  { icon: Server, title: "Our Products", description: "XRO, XMM & XME platform tiers", href: "/products" },
  { icon: Shield, title: "Managed Services", description: "NOC, SOC, Compliance & Cloud", href: "/services" },
  { icon: Search, title: "Find by Problem", description: "Start from the challenge you face", href: "/find-by-problem" },
  { icon: BookOpen, title: "Read the Docs", description: "K-DOCS technical documentation", href: "/documentation" },
];
/** END DO NOT TOUCH */

export const PathfinderCTA = () => (
  <section className="relative overflow-hidden" style={{ minHeight: "480px", display: "flex", alignItems: "center", background: "#0E0E0E" }}>

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
              className="group flex flex-col items-start p-5 bg-white/5 border border-white/10 hover:bg-brand-orange hover:border-brand-orange transition-all h-full"
            >
              <p.icon className="w-6 h-6 text-brand-orange group-hover:text-white mb-4 transition-colors" strokeWidth={1.5} />
              <h3 className="text-sm font-bold text-white mb-1 leading-tight">{p.title}</h3>
              <p className="text-xs text-white/55 group-hover:text-white/80 transition-colors leading-relaxed flex-1">{p.description}</p>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white mt-3 transition-colors group-hover:translate-x-1 duration-200" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
