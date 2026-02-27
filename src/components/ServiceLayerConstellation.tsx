import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ServiceLayerScene } from "./ServiceLayer3D/Scene";
import { PILLAR_COLORS, PILLAR_LABELS, Pillar } from "./ServiceLayer3D/types";

export function ServiceLayerConstellation() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden section-dark" style={{ background: "#0A0F1C" }}>
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: "#22d3ee" }}>
            Service Layer
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Special Elite', serif" }}
          >
            20 Detection &amp; Response <span style={{ color: "#22d3ee" }}>Kubes</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto text-white/40">
            Each kube delivers a specific capability. Hover to explore.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-4">
          {(Object.entries(PILLAR_LABELS) as [Pillar, string][]).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5" style={{ background: PILLAR_COLORS[key] }} />
              <span className="text-[10px] uppercase tracking-widest text-white/35">{label}</span>
            </div>
          ))}
        </div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ServiceLayerScene />
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-6">
          <Link
            to="/service-layer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:underline"
            style={{ color: "#22d3ee" }}
          >
            Explore All Kubes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
