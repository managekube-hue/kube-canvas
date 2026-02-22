/** Service Tiers — Productized Service Delivery — v2.1 spec */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const tiers = [
  {
    code: "XRO",
    name: "Essentials",
    market: "SMB — 10 to 100 users",
    tagline: "Your foundation for managed IT and security visibility",
    price: "Scored by Assessment",
    methodology: "Hunt → Identify → Alert → Triage",
    href: "/service-tiers/xro-essentials",
    cta: "Start with Essentials",
    ctaHref: "/get-started?tier=essentials",
    featured: false,
  },
  {
    code: "XMX",
    name: "Advanced",
    market: "SME — 100 to 500 users",
    tagline: "Full-spectrum security operations with real-time detection and response",
    price: "Scored by Assessment",
    methodology: "Hunt → Identify → Alert → Triage → Diagnose → Remediate",
    href: "/service-tiers/xmx-advanced",
    cta: "Get Advanced",
    ctaHref: "/get-started?tier=advanced",
    featured: true,
  },
  {
    code: "XME",
    name: "Enterprise",
    market: "Enterprise — 500+ users / regulated industries",
    tagline: "Complete coverage with threat intelligence, deception, and supply chain defense",
    price: "Scored by Assessment",
    methodology: "Full lifecycle: Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close",
    href: "/service-tiers/xme-enterprise",
    cta: "Talk to Enterprise Team",
    ctaHref: "/get-started?tier=enterprise",
    featured: true,
  },
];

type CapRow = { capability: string; essentials: boolean; advanced: boolean; enterprise: boolean };

const capabilities: CapRow[] = [
  { capability: "Managed NOC (24/7)", essentials: true, advanced: true, enterprise: true },
  { capability: "Help Desk & Desktop Support", essentials: true, advanced: true, enterprise: true },
  { capability: "Mobile Device Management", essentials: true, advanced: true, enterprise: true },
  { capability: "Microsoft 365 Management", essentials: true, advanced: true, enterprise: true },
  { capability: "Network Performance Monitoring", essentials: true, advanced: true, enterprise: true },
  { capability: "Identity Threat Detection & Response", essentials: true, advanced: true, enterprise: true },
  { capability: "Vulnerability Detection & Prioritization", essentials: true, advanced: true, enterprise: true },
  { capability: "Configuration Drift Detection", essentials: true, advanced: true, enterprise: true },
  { capability: "Customer Portal + Ticketing", essentials: true, advanced: true, enterprise: true },
  { capability: "Managed SOC (24/7)", essentials: false, advanced: true, enterprise: true },
  { capability: "Cloud Detection & Response", essentials: false, advanced: true, enterprise: true },
  { capability: "Application Performance Monitoring", essentials: false, advanced: true, enterprise: true },
  { capability: "Application Threat Containment", essentials: false, advanced: true, enterprise: true },
  { capability: "Backup & Disaster Recovery", essentials: false, advanced: true, enterprise: true },
  { capability: "Compliance Management", essentials: false, advanced: true, enterprise: true },
  { capability: "Real-Time Visibility Dashboard", essentials: false, advanced: true, enterprise: true },
  { capability: "Software Supply Chain Detection", essentials: false, advanced: false, enterprise: true },
  { capability: "Data Exfiltration Detection & Response", essentials: false, advanced: false, enterprise: true },
  { capability: "Threat Intelligence (STRIKE)", essentials: false, advanced: false, enterprise: true },
  { capability: "External Attack Surface Management", essentials: false, advanced: false, enterprise: true },
  { capability: "Honeypot Deception Network", essentials: false, advanced: false, enterprise: true },
  { capability: "FinOps & Cloud Cost Governance", essentials: false, advanced: false, enterprise: true },
  { capability: "Dedicated Advisory / vCISO Access", essentials: false, advanced: false, enterprise: true },
];

const deliveryModels = [
  { model: "Fully Managed", route: "/solutions/by-service-type/fully-managed", voice: "Outcome → Capabilities → Education → Features → Differentiation → Methodology Mechanics" },
  { model: "Co-Managed", route: "/solutions/by-service-type/co-managed", voice: "Outcome → Technical Capabilities → Differentiation → Features" },
  { model: "Self-Managed", route: "/how-it-works/kubric-uidr", voice: "Technical depth, open source ethos, community-forward." },
];

export default function Products() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.80) 25%, rgba(12,12,12,0.45) 60%, rgba(12,12,12,0.25) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,0.90) 0%, transparent 40%, rgba(12,12,12,0.35) 100%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10 py-32 lg:py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>Productized Service Delivery</span>
            <div style={{ height: "2px", width: "56px", background: "#993619", margin: "20px 0" }} />
            <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif", marginBottom: "12px" }}>
              Service Tiers
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(205,202,197,0.70)", maxWidth: "640px" }}>
              Each tier is defined by the capabilities active in the Service Layer, not by module codes. Tier comparison, capability mapping, and a clear path forward.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #FEFBF6, transparent)" }} />
      </section>

      {/* Tier Overview Cards */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>Tier Overview</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "32px" }} />
          <div className="grid lg:grid-cols-3 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {tiers.map((t, i) => (
              <motion.div key={t.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative" style={{ background: "#FEFBF6", padding: "32px", borderTop: t.featured ? "3px solid #993619" : "3px solid #CDCAC5" }}>
                {t.featured && t.code === "XMX" && (
                  <span className="absolute -top-3 left-8 text-white text-[10px] font-bold px-3 py-0.5 uppercase tracking-wider" style={{ background: "#993619" }}>Most Popular</span>
                )}
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#993619" }}>{t.market}</p>
                <h2 className="text-2xl font-black mb-1" style={{ color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>
                  {t.name} <span className="text-sm font-normal" style={{ color: "#993619" }}>({t.code})</span>
                </h2>
                <p className="text-xl font-black mt-2 mb-3" style={{ color: "#993619" }}>{t.price}</p>
                <p className="text-sm mb-4" style={{ color: "#393837" }}>{t.tagline}</p>
                <p className="text-xs mb-6" style={{ color: "#393837", opacity: 0.6 }}>{t.methodology}</p>
                <Link to={t.ctaHref} className={`block text-center py-3 text-sm font-bold uppercase tracking-wider transition-colors ${t.featured ? "text-white hover:opacity-90" : "border hover:text-white"}`}
                  style={t.featured ? { background: "#993619" } : { borderColor: "#1D1D1B", color: "#1D1D1B" }}
                  onMouseEnter={!t.featured ? (e => { (e.currentTarget as HTMLElement).style.background = "#1D1D1B"; (e.currentTarget as HTMLElement).style.color = "#fff"; }) : undefined}
                  onMouseLeave={!t.featured ? (e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#1D1D1B"; }) : undefined}
                >
                  {t.cta} <ArrowRight size={14} className="inline ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Capability Comparison Table */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>Full Capability Comparison</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "32px" }} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #993619" }}>
                  <th className="text-left py-4 px-4 font-bold" style={{ color: "#1D1D1B", minWidth: "260px" }}>Capability</th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: "#1D1D1B" }}>Essentials<br /><span className="text-xs font-normal" style={{ color: "#993619" }}>XRO</span></th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: "#1D1D1B" }}>Advanced<br /><span className="text-xs font-normal" style={{ color: "#993619" }}>XMX</span></th>
                  <th className="text-center py-4 px-4 font-bold" style={{ color: "#1D1D1B" }}>Enterprise<br /><span className="text-xs font-normal" style={{ color: "#993619" }}>XME</span></th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((row, i) => (
                  <tr key={row.capability} style={{ borderBottom: "1px solid #CDCAC5", background: i % 2 === 0 ? "#FEFBF6" : "transparent" }}>
                    <td className="py-3 px-4 font-medium" style={{ color: "#1D1D1B" }}>{row.capability}</td>
                    <td className="text-center py-3 px-4">{row.essentials ? <Check size={16} style={{ color: "#993619" }} className="inline" /> : <Minus size={16} style={{ color: "#CDCAC5" }} className="inline" />}</td>
                    <td className="text-center py-3 px-4">{row.advanced ? <Check size={16} style={{ color: "#993619" }} className="inline" /> : <Minus size={16} style={{ color: "#CDCAC5" }} className="inline" />}</td>
                    <td className="text-center py-3 px-4">{row.enterprise ? <Check size={16} style={{ color: "#993619" }} className="inline" /> : <Minus size={16} style={{ color: "#CDCAC5" }} className="inline" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Service Delivery Model Overlay */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>Service Delivery Model Overlay</p>
          <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "16px" }} />
          <p className="text-base mb-8" style={{ color: "#393837", lineHeight: 1.7 }}>
            Each Tier is available in three delivery models. The delivery model shapes the brand voice and page copy — not the capability set.
          </p>
          <div className="grid md:grid-cols-3 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {deliveryModels.map((dm, i) => (
              <motion.div key={dm.model} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: "#FEFBF6", padding: "28px", borderTop: "2px solid #993619" }}>
                <h4 className="font-bold mb-2" style={{ color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>{dm.model}</h4>
                <p className="text-xs mb-3" style={{ color: "#393837", opacity: 0.6 }}>{dm.voice}</p>
                <Link to={dm.route} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: "#993619" }}>
                  Learn more <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tier + CTA */}
      <section style={{ background: "#EEE9E3", padding: "80px 0", borderTop: "1px solid #CDCAC5" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#1D1D1B", fontFamily: "'Special Elite', serif" }}>Not sure where to start?</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#393837", lineHeight: 1.7 }}>
            Run a free assessment and we'll build your transformation roadmap — scoped to your size, budget, and compliance requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-started" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#993619", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Get Started <ArrowRight size={14} />
            </Link>
            <Link to="/service-tiers/custom" className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ border: "1px solid #1D1D1B", color: "#1D1D1B", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Custom Tier <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
