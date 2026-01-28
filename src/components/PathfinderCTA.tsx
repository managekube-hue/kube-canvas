import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, ClipboardCheck, Building2, Users, Phone } from "lucide-react";

const pathways = [
  {
    icon: Target,
    title: "Find by Problem",
    description: "What challenge are you facing?",
    href: "/find-by-problem",
  },
  {
    icon: ClipboardCheck,
    title: "Find by Assessment",
    description: "Get AI-powered recommendations",
    href: "/assessment",
  },
  {
    icon: Building2,
    title: "Find by Industry",
    description: "Pre-built vertical solutions",
    href: "/kubes/industry-kube",
  },
  {
    icon: Users,
    title: "Find by Business Size",
    description: "SMB, Mid-Market, or Enterprise",
    href: "/pricing",
  },
  {
    icon: Phone,
    title: "Contact",
    description: "Talk to an expert",
    href: "/contact",
  },
];

export const PathfinderCTA = () => {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(24 95% 40%) 50%, hsl(var(--muted)) 100%)",
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-label text-white/60 mb-4">NOT SURE WHERE TO START?</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Choose your path
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={pathway.href}
                className="group block bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-all h-full"
              >
                <pathway.icon className="w-8 h-8 text-brand-orange mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                  {pathway.title}
                </h3>
                <p className="text-sm text-white/70">
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
