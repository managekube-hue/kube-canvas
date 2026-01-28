import { PageLayout } from "@/components/PageLayout";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Server, Cloud, Users, Lock, Zap, Building2, Cog } from "lucide-react";

const problems = [
  {
    icon: Shield,
    title: "Security Incidents & Breaches",
    description: "Experiencing ransomware, phishing, or other security threats? Need 24/7 threat detection and response.",
    solution: "MSSP Kube",
    href: "/kubes/mssp-kube",
    tags: ["EDR/XDR", "SOC", "Incident Response"],
  },
  {
    icon: Lock,
    title: "Compliance Gaps",
    description: "Failing audits or preparing for SOC 2, HIPAA, CMMC, PCI DSS, or other certifications.",
    solution: "Compliance Kube",
    href: "/kubes/compliance-kube",
    tags: ["Gap Analysis", "Evidence Automation", "Audit Support"],
  },
  {
    icon: Server,
    title: "Infrastructure Problems",
    description: "Aging hardware, performance issues, capacity constraints, or need for data center refresh.",
    solution: "MSP Kube + Product Kube",
    href: "/kubes/msp-kube",
    tags: ["Hardware", "Hybrid Cloud", "Migration"],
  },
  {
    icon: Cloud,
    title: "Cloud Challenges",
    description: "Multi-cloud complexity, cost overruns, migration failures, or security concerns in cloud environments.",
    solution: "MSP Kube",
    href: "/kubes/msp-kube",
    tags: ["IaaS/PaaS", "FinOps", "Cloud Security"],
  },
  {
    icon: Users,
    title: "IT Staff Shortage",
    description: "Can't hire or retain IT talent. Need to augment or fully outsource IT operations.",
    solution: "MSP Kube",
    href: "/kubes/msp-kube",
    tags: ["Co-Managed IT", "Service Desk", "NOC"],
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Need AI, automation, or modern development practices but don't know where to start.",
    solution: "Innovation Kube",
    href: "/kubes/innovation-kube",
    tags: ["RPA", "AI/ML", "DevSecOps"],
  },
  {
    icon: Building2,
    title: "Industry-Specific Needs",
    description: "Healthcare, manufacturing, finance, or other regulated industry with unique requirements.",
    solution: "Industry Kube",
    href: "/kubes/industry-kube",
    tags: ["Vertical Solutions", "Compliance", "Best Practices"],
  },
  {
    icon: Cog,
    title: "Strategic Direction",
    description: "Need executive guidance on technology roadmap, budget planning, or vendor management.",
    solution: "Advisory Kube",
    href: "/kubes/advisory-kube",
    tags: ["vCIO", "vCISO", "Roadmapping"],
  },
];

const FindByProblem = () => {
  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(24 95% 40%) 50%, hsl(var(--muted)) 100%)",
          }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-label text-white/70 mb-6"
            >
              FIND BY PROBLEM
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              What challenge are you{" "}
              <span className="text-brand-orange">facing?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-white/80 max-w-2xl"
            >
              Select your biggest IT challenge and we'll recommend the right solution path.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={problem.href}
                  className="group block border border-border p-8 hover:border-foreground transition-all h-full"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors">
                      <problem.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {problem.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {problem.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-secondary px-2 py-1 text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span>Recommended: {problem.solution}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure CTA */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Not sure which problem to prioritize?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Our free assessment analyzes your entire environment and prioritizes 
            recommendations based on risk and business impact.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Take Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <PathfinderCTA />
    </PageLayout>
  );
};

export default FindByProblem;
