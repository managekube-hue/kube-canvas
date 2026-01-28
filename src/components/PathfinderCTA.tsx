import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Search, ClipboardCheck, Building2, Users, MessageSquare } from "lucide-react";

const pathways = [
  {
    icon: Search,
    title: "Find by Problem",
    description: "What challenge are you facing?",
    href: "/contact",
  },
  {
    icon: ClipboardCheck,
    title: "Find by Assessment",
    description: "Get a free transformation roadmap",
    href: "/#assessment",
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
    href: "/pricing",
  },
  {
    icon: MessageSquare,
    title: "Contact Us",
    description: "Talk to a solutions architect",
    href: "/contact",
  },
];

export const PathfinderCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32"
      style={{
        background: "linear-gradient(135deg, hsl(0 0% 0%) 0%, hsl(24 95% 53%) 50%, hsl(0 0% 40%) 100%)",
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-headline text-white mb-4">
            Find Your Path
          </h2>
          <p className="text-body-xl text-white/70 max-w-2xl mx-auto">
            Every organization's transformation journey starts somewhere. Choose your entry point.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={pathway.href}
                className="group block h-full p-6 lg:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all duration-300"
              >
                <pathway.icon className="w-8 h-8 text-white group-hover:text-brand-orange mb-4 transition-colors" />
                <h3 className="text-lg font-semibold text-white group-hover:text-foreground mb-2 transition-colors">
                  {pathway.title}
                </h3>
                <p className="text-sm text-white/60 group-hover:text-muted-foreground transition-colors">
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
