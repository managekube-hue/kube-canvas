import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ClipboardList, Building2, Users, MessageSquare } from "lucide-react";

/** DO NOT TOUCH - PathfinderCTA pathways configuration */
const pathways = [
  {
    icon: Search,
    title: "Find by Problem",
    description: "What challenge are you facing?",
    href: "/find-by-problem",
  },
  {
    icon: ClipboardList,
    title: "Find by Assessment",
    description: "Get a free transformation roadmap",
    href: "/assessment",
  },
  {
    icon: Building2,
    title: "Find by Industry",
    description: "Solutions for your sector",
    href: "/kubes/industry-kube",
  },
  {
    icon: Users,
    title: "Find by Business Size",
    description: "SMB to Enterprise solutions",
    href: "/find-by-size",
  },
  {
    icon: MessageSquare,
    title: "Contact Us",
    description: "Talk to a solutions architect",
    href: "/contact",
  },
];
/** END DO NOT TOUCH */

export const PathfinderCTA = () => {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Dark Gradient Background - Black to Orange to Gray */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 30%, hsl(24 70% 35%) 60%, #4A4A4A 100%)",
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Find Your Path
          </h2>
          <p className="text-lg text-white/70">
            Every organization's transformation journey starts somewhere. Choose your entry point.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={index === 4 ? "col-span-2 lg:col-span-1" : ""}
            >
              <Link
                to={pathway.href}
                className="group block bg-gradient-to-br from-brand-orange/90 to-brand-orange/70 p-6 hover:from-brand-orange hover:to-brand-orange/80 transition-all h-full"
              >
                <pathway.icon className="w-8 h-8 text-white mb-4" strokeWidth={1.5} />
                <h3 className="text-base font-bold text-white mb-2">
                  {pathway.title}
                </h3>
                <p className="text-sm text-white/80">
                  {pathway.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
