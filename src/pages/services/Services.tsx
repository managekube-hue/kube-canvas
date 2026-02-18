import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const serviceGroups = [
  {
    category: "Managed Services",
    items: [
      { name: "Managed NOC", desc: "24/7 network operations center with proactive monitoring, alerting, and incident response.", href: "/services/managed-noc" },
      { name: "Managed SOC", desc: "24/7 security operations center with threat hunting, incident response, and compliance reporting.", href: "/services/managed-soc" },
      { name: "Managed Compliance & GRC", desc: "Continuous compliance monitoring and evidence collection across 100+ frameworks.", href: "/services/managed-compliance" },
      { name: "Managed Cloud & FinOps", desc: "Cloud cost optimization, performance management, and FinOps reporting.", href: "/services/managed-cloud" },
    ],
  },
  {
    category: "Advisory Services",
    items: [
      { name: "Security Assessments", desc: "Holistic security posture evaluation with risk prioritization and remediation roadmaps.", href: "/services/security-assessments" },
      { name: "Penetration Testing", desc: "Manual penetration testing across network, web application, API, and cloud infrastructure.", href: "/services/penetration-testing" },
      { name: "Compliance Gap Analysis", desc: "Framework-specific gap assessments identifying control deficiencies and remediation requirements.", href: "/services/compliance-gap-analysis" },
      { name: "IT Infrastructure Audits", desc: "Architecture, performance, security, and operational efficiency review.", href: "/services/infrastructure-audits" },
      { name: "Right-Sizing Engagements", desc: "Eliminate infrastructure waste and improve performance per dollar spent.", href: "/services/right-sizing" },
    ],
  },
  {
    category: "Deployment & Integration",
    items: [
      { name: "Physical Security Integration", desc: "Design, installation, and integration of video surveillance, access control, and intrusion detection.", href: "/services/physical-security" },
      { name: "Network Infrastructure Buildouts", desc: "Enterprise network design, deployment, and migration for wired, wireless, and SD-WAN.", href: "/services/network-buildouts" },
      { name: "Custom Automation Development", desc: "Bespoke automation, scripting, and SOAR playbook development.", href: "/services/custom-automation" },
      { name: "Legacy System Integrations", desc: "Bridge aging infrastructure with modern security and operations platforms.", href: "/services/legacy-integrations" },
    ],
  },
];

export default function Services() {
  return (
    <PageLayout>
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-black min-h-[42vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-4">Expert Services</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              Design, deploy, and operate your security and IT infrastructure with expert managed services, advisory consulting, and professional implementation.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {serviceGroups.map((group, gi) => (
        <section key={group.category} className={gi % 2 === 0 ? "section-white py-16" : "section-off-white py-16"}>
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-title mb-10 border-l-4 border-brand-orange pl-4">{group.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {group.items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={item.href} className="group block p-6 border border-border hover:border-brand-orange transition-colors bg-white">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-orange inline-flex items-center gap-1">Learn More <ArrowRight size={11} /></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
