import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ClipboardList, Shield, LayoutGrid, Server, BookOpen, ArrowRight } from "lucide-react";
import footerCtaVideo from "@/assets/footer-cta-video.mp4";

/** DO NOT TOUCH - PathfinderCTA pathways configuration */
const pathways = [
  {
    icon: ClipboardList,
    title: "Free Assessment",
    description: "Map your security posture in minutes",
    href: "/assessment",
  },
  {
    icon: LayoutGrid,
    title: "Explore Kubes",
    description: "15 detection & response modules",
    href: "/kubes",
  },
  {
    icon: Server,
    title: "Our Products",
    description: "XRO, XMM & XME platform tiers",
    href: "/products",
  },
  {
    icon: Shield,
    title: "Managed Services",
    description: "NOC, SOC, Compliance & Cloud",
    href: "/services",
  },
  {
    icon: Search,
    title: "Find by Problem",
    description: "Start from the challenge you face",
    href: "/find-by-problem",
  },
  {
    icon: BookOpen,
    title: "Read the Docs",
    description: "K-DOCS technical documentation",
    href: "/uidr/docs",
  },
];
/** END DO NOT TOUCH */

export const PathfinderCTA = () => {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={footerCtaVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-3">Where would you like to go?</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Find Your Path
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto">
            Every transformation starts somewhere. Choose your entry point into the Kubric platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <Link
                to={pathway.href}
                className="group flex flex-col items-start p-5 bg-white/5 border border-white/10 hover:bg-brand-orange hover:border-brand-orange transition-all h-full"
              >
                <pathway.icon className="w-6 h-6 text-brand-orange group-hover:text-white mb-4 transition-colors" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-white mb-1 leading-tight">
                  {pathway.title}
                </h3>
                <p className="text-xs text-white/55 group-hover:text-white/80 transition-colors leading-relaxed flex-1">
                  {pathway.description}
                </p>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white mt-3 transition-colors group-hover:translate-x-1 duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
