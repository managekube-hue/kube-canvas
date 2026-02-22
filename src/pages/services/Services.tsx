/** v2.0 spec copy — Services hub page (Services.docx) */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const whatWeDeliver = [
  "Managed Services: 24/7 operations across your entire environment — NOC, SOC, help desk, IT, compliance, and cloud — monitored and managed continuously.",
  "Advisory Services: Expert guidance when you need it — assessments, testing, audits, and planning from practitioners who know your environment.",
  "Deployment & Integration: Project services that bridge the gap between legacy and modern — physical security, network buildouts, automation, and legacy integration.",
];

const serviceGroups = [
  {
    category: "Managed Services",
    desc: "24/7 operational coverage across infrastructure, security, IT, compliance, and cloud.",
    items: [
      { name: "Managed NOC", desc: "24/7 network operations center with proactive monitoring and response.", href: "/services/managed-noc" },
      { name: "Managed SOC", desc: "24/7 security operations with threat hunting, detection, and incident response across 20 capabilities.", href: "/services/managed-soc" },
      { name: "Help Desk Services", desc: "End-user support with escalation to engineering when issues exceed scope.", href: "/services/help-desk" },
      { name: "Managed IT Services", desc: "IT operations and administration across endpoints, identity, and productivity tools.", href: "/services/managed-it" },
      { name: "Smart Hands Services", desc: "Remote and on-site technical support for deployments, troubleshooting, and maintenance.", href: "/services/smart-hands" },
      { name: "Managed Compliance", desc: "Continuous compliance monitoring across 100+ frameworks with automated evidence collection.", href: "/services/managed-compliance" },
      { name: "Managed Cloud & FinOps", desc: "Cloud cost optimization and performance management across AWS, Azure, and GCP.", href: "/services/managed-cloud" },
    ],
  },
  {
    category: "Advisory Services",
    desc: "Assessments, testing, audits, and planning from security and infrastructure practitioners.",
    items: [
      { name: "Security Assessments", desc: "Holistic security posture evaluation with risk prioritization and remediation roadmaps.", href: "/services/security-assessments" },
      { name: "Penetration Testing", desc: "Manual penetration testing across network, application, and cloud — finding what automated scanners miss.", href: "/services/penetration-testing" },
      { name: "Compliance Gap Analysis", desc: "Framework-specific gap assessments with remediation roadmaps and evidence requirements.", href: "/services/compliance-gap-analysis" },
      { name: "IT Infrastructure Audits", desc: "Architecture, performance, security, and efficiency review with actionable recommendations.", href: "/services/infrastructure-audits" },
      { name: "Right-Sizing Engagements", desc: "Eliminate waste and improve performance per dollar spent across infrastructure and cloud.", href: "/services/right-sizing" },
    ],
  },
  {
    category: "Deployment & Integration",
    desc: "Project services that design, deploy, and integrate technology across your environment.",
    items: [
      { name: "Physical Security Integration", desc: "Video surveillance, access control, and environmental sensors integrated with your security operations.", href: "/services/physical-security" },
      { name: "Network Infrastructure Buildouts", desc: "Enterprise network design, deployment, and migration across switching, routing, wireless, and SD-WAN.", href: "/services/network-buildouts" },
      { name: "Custom Automation Development", desc: "Bespoke automation, scripting, and workflow development for your specific operational requirements.", href: "/services/custom-automation" },
      { name: "Legacy System Integrations", desc: "Bridge aging infrastructure with modern security and monitoring platforms.", href: "/services/legacy-integrations" },
    ],
  },
];

export default function Services() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex items-center" style={{ background: "#1D1D1B", minHeight: "48vh", paddingTop: "9rem", paddingBottom: "5rem" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.97) 40%, rgba(29,29,27,0.65) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 55%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>Services</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}
            >One Partner. Every Layer of Your Stack.</h1>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(205,202,197,0.70)", maxWidth: "640px" }}>
              Expert services to design, deploy, and operate your security and IT infrastructure.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* ── The Problem / What We Deliver ── */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>The Problem with Multiple Vendors</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "40px" }}>
            Most organizations manage their infrastructure, security, compliance, and cloud through separate vendors. A NOC provider here. A SOC provider there. A compliance firm for audits. A cloud consultant for optimization. An integration partner for projects. This fragmentation creates gaps. The NOC observes a performance issue. The SOC identifies a security event. Neither has the other's context. Compliance findings sit in a report while infrastructure drifts. Cloud optimization recommendations arrive after the budget is spent. ManageKube delivers every layer through one partner, one architecture, and one team.
          </p>

          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>What We Deliver</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {whatWeDeliver.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "14px" }}>
                <CheckCircle size={13} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#393837" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Service Groups ── */}
      {serviceGroups.map((group, gi) => (
        <section key={group.category} style={{ background: gi % 2 === 0 ? "#EEE9E3" : "#FEFBF6", padding: "80px 0" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "8px" }}>{group.category}</p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "16px" }} />
            <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#393837", marginBottom: "32px" }}>{group.desc}</p>
            <div className="grid md:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
              {group.items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={item.href}
                    className="group block transition-all"
                    style={{ background: "#FEFBF6", padding: "28px" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FFFCF7"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FEFBF6"}
                  >
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "8px", borderTop: "2px solid #993619", paddingTop: "12px" }} className="group-hover:text-[#993619] transition-colors">{item.name}</h3>
                    <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#393837", marginBottom: "12px" }}>{item.desc}</p>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#993619" }}>
                      Learn More <ArrowRight size={11} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ background: "#393837", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>Get Started</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
          <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
            Ready to consolidate your vendors?
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(205,202,197,0.50)", marginBottom: "36px", maxWidth: "500px" }}>
            Our team will assess your environment, scope the engagement, and deliver a clear roadmap.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
            >
              Get Started <ArrowRight size={14} />
            </Link>
            <Link
              to="/service-tiers"
              className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
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