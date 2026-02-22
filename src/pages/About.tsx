/**
 * About Page — ManageKube LLC
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const leadership = [
  {
    name: "Leadership Team",
    role: "Founders & Executive Team",
    description: "ManageKube was founded by seasoned IT and cybersecurity professionals with decades of combined experience across enterprise infrastructure, managed security operations, compliance, and digital transformation. Our leadership team brings hands-on expertise from Fortune 500 environments, federal agencies, and high-growth startups.",
  },
];

const values = [
  {
    title: "Clear Ownership",
    description: "One team, one SLA, one point of accountability. No vendor finger-pointing. No ticket ping-pong. When something breaks, you call one number.",
  },
  {
    title: "Security First",
    description: "Every solution designed with security embedded, not bolted on afterward. Our 7-step methodology — Hunt through Document — ensures nothing is an afterthought.",
  },
  {
    title: "Client Partnership",
    description: "We succeed when you succeed. Long-term relationships over short-term transactions. Quarterly business reviews, strategic roadmaps, and transparent reporting.",
  },
  {
    title: "Continuous Improvement",
    description: "Technology evolves. So do we. Every incident feeds updated playbooks. Every review updates the roadmap. The cycle never stops.",
  },
];

const differentiators = [
  "Single vendor consolidation — 8 vendors become 1",
  "18 detection and response modules in one platform",
  "7-step methodology: Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document",
  "Kubric UIDR platform with real-time data graph",
  "KubricAI-powered threat orchestration",
  "Three service tiers: Essentials (XRO), Advanced (XMX), Enterprise (XME)",
  "Fully Managed, Co-Managed, and Self-Managed engagement models",
  "Dell Technologies, IBM, Pax8, TD SYNNEX technology partnerships",
];

const About = () => {
  return (
    <PageLayout>
      <PageBanner
        title="About ManageKube"
        subtitle="Enterprise managed MSP & MSSP services. Unified infrastructure, detection, and response — delivered by one accountable team."
        phase="COMPANY"
      />

      {/* Mission Section */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
                  Our Mission
                </p>
                <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
                  IT transformation shouldn't require a dozen vendors
                </h2>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "16px" }}>
                  Most organizations juggle multiple IT vendors — each with their own SLA, their own support portal, and their own blame when things go wrong. ManageKube consolidates your IT ecosystem into a single accountable partnership.
                </p>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837" }}>
                  From assessment through ongoing operations, we provide the infrastructure, security, compliance, and strategic guidance that modern enterprises need — all through one relationship. Our 7-step methodology ensures nothing falls through the cracks.
                </p>
              </div>
              <div style={{ background: "#EEE9E3", padding: "48px", border: "1px solid #CDCAC5" }}>
                <div style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, color: "#993619", fontFamily: "'Special Elite', serif", marginBottom: "16px" }}>
                  8→1
                </div>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>
                  Eight vendors become one team
                </p>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#393837" }}>
                  Consolidate infrastructure, security, compliance, and operations under a single point of accountability. One contract. One SLA. One team that owns the outcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              Leadership
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Who we are
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px", maxWidth: "720px" }}>
              ManageKube was founded by seasoned IT and cybersecurity professionals with decades of combined experience across enterprise infrastructure, managed security operations, compliance, and digital transformation. Our leadership team brings hands-on expertise from Fortune 500 environments, federal agencies, and high-growth startups.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { stat: "20+", label: "Years combined experience in IT & cybersecurity" },
                { stat: "50+", label: "Enterprise clients served across verticals" },
                { stat: "12", label: "Compliance frameworks supported" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#FEFBF6", border: "1px solid #CDCAC5", padding: "36px" }}>
                  <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#993619", fontFamily: "'Special Elite', serif", marginBottom: "8px" }}>
                    {item.stat}
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#393837" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              Our Values
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "48px" }}>
              What we stand for
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "36px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1D1D1B", marginBottom: "12px" }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#393837" }}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section style={{ background: "#EEE9E3", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
                  Why ManageKube
                </p>
                <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#1D1D1B", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
                  What sets us apart
                </h2>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {differentiators.map((d) => (
                    <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
                      <Check size={16} style={{ color: "#993619", flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#393837" }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
                  Technology Partners
                </p>
                <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#393837", marginBottom: "32px" }}>
                  We source and implement from core technology partners, delivering validated reference architectures and certified expertise.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Dell Technologies", "IBM", "Pax8", "TD SYNNEX"].map((partner) => (
                    <div
                      key={partner}
                      style={{ background: "#FEFBF6", border: "1px solid #CDCAC5", padding: "16px 24px", fontSize: "14px", fontWeight: 700, color: "#1D1D1B" }}
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ background: "#FEFBF6", padding: "80px 0", borderTop: "1px solid #CDCAC5" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              Contact
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <div className="grid sm:grid-cols-3 gap-6">
              <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "36px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5A5B", marginBottom: "12px" }}>Phone</p>
                <a href="tel:+19019077447" style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", textDecoration: "none" }}>(901) 907-7447</a>
              </div>
              <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "36px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5A5B", marginBottom: "12px" }}>Email</p>
                <a href="mailto:sales@managekube.com" style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B", textDecoration: "none" }}>sales@managekube.com</a>
              </div>
              <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "36px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5A5B", marginBottom: "12px" }}>Location</p>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#1D1D1B" }}>Memphis, TN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#393837", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p style={{ color: "#993619", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "16px" }}>
              Get Started
            </p>
            <div style={{ height: "2px", width: "40px", background: "#993619", marginBottom: "24px" }} />
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif", marginBottom: "20px" }}>
              Ready to simplify your IT?
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(205,202,197,0.50)", marginBottom: "36px", maxWidth: "500px" }}>
              Take our free assessment to discover how ManageKube can consolidate your vendor relationships and accelerate your transformation.
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
                to="/contact"
                className="inline-flex items-center gap-2 font-semibold transition-all"
                style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.15)"}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
