import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, Shield, Zap, FileText, Clock,
  Phone, Mail, Building2, Users, Target, BarChart3
} from "lucide-react";

const ORANGE = "#993619";

/* ─── Journey Steps ─────────────────────────────────────────────── */
const JOURNEY_STEPS = [
  { icon: Target, label: "Tell Us About You", desc: "96 weighted questions across security, infrastructure, cloud, compliance, and cost." },
  { icon: BarChart3, label: "We Score & Price", desc: "Our engine calculates your Environment Maturity Score and recommends a tier." },
  { icon: FileText, label: "Get Your Roadmap", desc: "Receive a custom proposal with gap analysis, pricing, and remediation priorities." },
  { icon: Zap, label: "Onboard & Deploy", desc: "Your dedicated team deploys your platform — typically within 48 hours to 30 days." },
];

/* ─── Quick Contact Form ────────────────────────────────────────── */
function QuickContactForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", phone: "", message: "",
    industry: "", orgSize: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim() || null,
        industry: form.industry || null,
        org_size: form.orgSize || null,
        message: form.message.trim() || null,
        source: "get-started",
        challenges: [],
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(153,54,25,0.15)" }}>
          <CheckCircle size={28} style={{ color: ORANGE }} />
        </div>
        <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>You're in.</h3>
        <p className="text-white/50 max-w-md mx-auto">Our team will reach out within 24 hours. In the meantime, consider completing the full onboarding assessment for instant scoring and pricing.</p>
        <Link to="/assessment/start" className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white" style={{ background: ORANGE }}>
          Start Full Assessment <ArrowRight size={14} />
        </Link>
      </motion.div>
    );
  }

  const inputStyle = { background: "rgba(205,202,197,0.04)", border: "1px solid rgba(205,202,197,0.1)" };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { key: "firstName", label: "First Name *", type: "text", required: true },
          { key: "lastName", label: "Last Name *", type: "text", required: true },
          { key: "email", label: "Work Email *", type: "email", required: true },
          { key: "company", label: "Company *", type: "text", required: true },
          { key: "phone", label: "Phone (optional)", type: "tel", required: false },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/30 mb-2">{f.label}</label>
            <input type={f.type} required={f.required} value={(form as any)[f.key]}
              onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
              className="w-full px-4 py-3 text-sm text-white focus:outline-none" style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = ORANGE}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(205,202,197,0.1)"}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/30 mb-2">Industry</label>
          <select value={form.industry} onChange={e => setForm(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-4 py-3 text-sm text-white focus:outline-none" style={inputStyle}>
            <option value="">Select industry</option>
            {["Manufacturing","Healthcare","Financial Services","Retail","Transportation","Mining & Extraction","Energy & Utilities","Public Sector","Telecommunications","Technology / MSP / MSSP","Other"].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-white/30 mb-2">Anything else? (optional)</label>
        <textarea value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          rows={3} className="w-full px-4 py-3 text-sm text-white focus:outline-none resize-none" style={inputStyle}
          onFocus={e => e.currentTarget.style.borderColor = ORANGE}
          onBlur={e => e.currentTarget.style.borderColor = "rgba(205,202,197,0.1)"}
        />
      </div>
      <button type="submit" disabled={submitting}
        className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all disabled:opacity-30"
        style={{ background: submitting ? "rgba(153,54,25,0.3)" : ORANGE }}>
        {submitting ? "Submitting..." : "Send"} <ArrowRight size={14} />
      </button>
    </form>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function GetStarted() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-20" style={{ background: "#0C0C0C" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-[2px] w-12 mb-8" style={{ background: ORANGE }} />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
              Your Security Journey Starts Here
            </h1>
            <p className="text-lg text-white/50 max-w-2xl">
              Whether you need a quick conversation or a comprehensive assessment with instant scoring and pricing — we meet you where you are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Steps */}
      <section style={{ background: "#141414", borderBottom: "1px solid rgba(205,202,197,0.07)" }} className="py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>How It Works</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_STEPS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-5" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(153,54,25,0.2)", color: ORANGE }}>
                    {i + 1}
                  </div>
                  <s.icon size={16} style={{ color: ORANGE }} />
                </div>
                <p className="text-sm font-bold text-white mb-1">{s.label}</p>
                <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Paths */}
      <section style={{ background: "#0C0C0C" }} className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Path 1: Full Onboarding Assessment */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 flex flex-col" style={{ background: "rgba(153,54,25,0.08)", border: `2px solid ${ORANGE}` }}>
              <div className="flex items-center gap-3 mb-4">
                <Shield size={20} style={{ color: ORANGE }} />
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>Recommended</span>
              </div>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>
                Full Onboarding Assessment
              </h3>
              <p className="text-sm text-white/45 mb-4 flex-1">
                Complete our 96-question weighted assessment. Get your Environment Maturity Score, recommended tier (XRO / XMX / XME), custom pricing, gap flags, and a remediation roadmap — all instantly.
              </p>
              <ul className="space-y-2 mb-6">
                {["Instant EMS score & tier recommendation", "Custom monthly pricing calculation", "Gap analysis with prioritised remediation", "Compliance framework mapping", "No sales call required"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                    <CheckCircle size={12} style={{ color: ORANGE, marginTop: 2, flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/assessment/start"
                className="flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE }}>
                Start Assessment <ArrowRight size={14} />
              </Link>
              <p className="text-[10px] text-white/25 mt-3 text-center">~25 minutes · Results delivered immediately</p>
            </motion.div>

            {/* Path 2: Quick Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-8 flex flex-col" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} className="text-white/40" />
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-white/30">Quick Start</span>
              </div>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>
                Quick Contact
              </h3>
              <p className="text-sm text-white/45 mb-4 flex-1">
                Not ready for the full assessment? Tell us about your organisation and a solutions architect will reach out within 24 hours to discuss your needs and guide you to the right path.
              </p>
              <ul className="space-y-2 mb-6">
                {["24-hour response guarantee", "Guided next-step recommendation", "No commitment required"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                    <CheckCircle size={12} className="text-white/30" style={{ marginTop: 2, flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <a href="#quick-contact"
                className="flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                Contact Us Below <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Path 3: Talk to Sales */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-8 flex flex-col" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={20} className="text-white/40" />
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-white/30">Enterprise</span>
              </div>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>
                Talk to Sales
              </h3>
              <p className="text-sm text-white/45 mb-4 flex-1">
                For enterprise engagements, multi-year contracts, or custom SOW requirements — speak directly with a solutions architect who can scope your deployment.
              </p>
              <ul className="space-y-2 mb-6">
                {["Dedicated solutions architect", "Custom SOW and pricing", "Multi-year engagement options"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                    <CheckCircle size={12} className="text-white/30" style={{ marginTop: 2, flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a href="tel:+12402572029"
                  className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Phone size={14} /> (240) 257-2029
                </a>
                <a href="mailto:sales@managekube.com"
                  className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Mail size={14} /> sales@managekube.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Tier comparison callout */}
          <div className="mt-12 p-6 text-center" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.08)" }}>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/30 mb-2">Not sure which tier?</p>
            <p className="text-sm text-white/50 mb-4">The full assessment automatically recommends your tier. Or compare them now:</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {[
                { label: "XRO Essentials", href: "/service-tiers/xro-essentials" },
                { label: "XMX Advanced", href: "/service-tiers/xmx-advanced" },
                { label: "XME Enterprise", href: "/service-tiers/xme-enterprise" },
                { label: "View Pricing", href: "/pricing" },
              ].map(t => (
                <Link key={t.label} to={t.href} className="text-xs font-semibold px-4 py-2 transition-colors hover:bg-white/10"
                  style={{ color: ORANGE, border: `1px solid rgba(153,54,25,0.3)` }}>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form */}
      <section id="quick-contact" style={{ background: "#141414" }} className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <div className="h-[2px] w-12 mb-6" style={{ background: ORANGE }} />
          <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>Quick Contact</h2>
          <p className="text-sm text-white/40 mb-8">Tell us about your organisation and we'll reach out within 24 hours with next steps.</p>
          <QuickContactForm />
        </div>
      </section>

      {/* Business Hours */}
      <section style={{ background: "#0C0C0C", borderTop: "1px solid rgba(205,202,197,0.07)" }} className="py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Phone, label: "(240) 257-2029", sub: "Mon-Fri 8AM-6PM EST" },
              { icon: Mail, label: "sales@managekube.com", sub: "24-hour response" },
              { icon: Clock, label: "Alexandria, VA", sub: "US-based operations" },
            ].map(c => (
              <div key={c.label} className="p-5" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.08)" }}>
                <c.icon size={18} className="mx-auto mb-3" style={{ color: ORANGE }} />
                <p className="text-sm font-bold text-white">{c.label}</p>
                <p className="text-xs text-white/35 mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
