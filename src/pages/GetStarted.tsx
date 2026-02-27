import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Shield, Zap, FileText, ShoppingCart,
  Target, BarChart3, CheckCircle, Phone, Mail,
  MapPin, Clock, Send, Users, Building2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ═══════════════════════════════════════
   SPLIT HERO — Two clear paths
   ═══════════════════════════════════════ */

function SplitHero() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "#FEFBF6" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-4 text-center">Choose Your Path</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 text-center">Two ways to get started</h2>
        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-14">
          Need a full security &amp; IT assessment with a custom managed-services proposal? Or just need specific services and products? Pick what fits.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ─── Left: Package Assessment ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative flex flex-col p-10 bg-white border-2 border-brand-orange"
          >
            <div className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-orange text-white">
              Full Discovery
            </div>
            <Shield size={28} className="text-brand-orange mb-5" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Package Assessment</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              96 weighted questions across security, infrastructure, cloud, compliance, and cost.
              Get your Environment Maturity Score, recommended tier, custom pricing with milestone scale-down, gap flags, and a remediation roadmap, all instantly.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                "Instant EMS score + tier recommendation",
                "Custom monthly pricing with milestone discounts",
                "Gap analysis with prioritised remediation",
                "Compliance framework mapping",
                "Module & professional services recommendations",
                "No sales call required",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle size={12} className="text-brand-orange mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <Link
              to="/assessment/start"
              className="flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider text-white bg-brand-orange transition-opacity hover:opacity-90"
            >
              Start Assessment <ArrowRight size={14} />
            </Link>
            <p className="text-[10px] text-muted-foreground mt-3 text-center">~25 minutes · Results delivered immediately</p>
          </motion.div>

          {/* ─── Right: BOM Generator ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative flex flex-col p-10 bg-white border border-border"
          >
            <div className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-foreground text-background">
              À La Carte
            </div>
            <ShoppingCart size={28} className="text-muted-foreground mb-5" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Service &amp; Product Catalogue</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Already know what you need? Browse our full catalogue of managed services, professional engagements, migrations, hardware, and licensing.
              Build your Bill of Materials and submit for a quote. No assessment required.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                "M365 migrations, SharePoint, email setup",
                "Hardware procurement & lifecycle management",
                "Pen testing, compliance audits, vCISO",
                "Network buildouts, cloud architecture",
                "One-click add-to-BOM cart",
                "Submit for same-day quote",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle size={12} className="text-muted-foreground mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <Link
              to="/bom"
              className="flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider text-foreground border border-border transition-colors hover:bg-muted"
            >
              Browse Catalogue <ArrowRight size={14} />
            </Link>
            <p className="text-[10px] text-muted-foreground mt-3 text-center">No assessment needed · Build &amp; submit in minutes</p>
          </motion.div>
        </div>

        {/* Tier comparison callout */}
        <div className="mt-12 p-6 text-center bg-white border border-border">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-2">Not sure which tier?</p>
          <p className="text-sm text-muted-foreground mb-4">The full assessment automatically recommends your tier. Or compare them now:</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: "XRO Essentials", href: "/service-tiers/xro-essentials" },
              { label: "XMX Advanced", href: "/service-tiers/xmx-advanced" },
              { label: "XME Enterprise", href: "/service-tiers/xme-enterprise" },
              { label: "View Pricing", href: "/pricing" },
            ].map(t => (
              <Link key={t.label} to={t.href} className="text-xs font-semibold px-4 py-2 text-brand-orange border border-brand-orange/30 transition-colors hover:bg-brand-orange/5">
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════ */

const JOURNEY_STEPS = [
  { icon: Target, label: "Tell Us About You", desc: "96 weighted questions across security, infrastructure, cloud, compliance, and cost." },
  { icon: BarChart3, label: "We Score and Price", desc: "Our engine calculates your Environment Maturity Score and recommends a tier." },
  { icon: FileText, label: "Get Your Roadmap", desc: "Receive a custom proposal with gap analysis, pricing, and remediation priorities." },
  { icon: Zap, label: "Onboard and Deploy", desc: "Your dedicated team deploys your platform, typically within 48 hours to 30 days." },
];

function HowItWorks() {
  return (
    <section className="py-20 lg:py-24 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-4">How It Works</p>
        <h2 className="text-3xl font-bold text-foreground mb-12">Four steps to full coverage</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNEY_STEPS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 bg-background border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-brand-orange/15 text-brand-orange">
                  {i + 1}
                </div>
                <s.icon size={18} className="text-brand-orange" />
              </div>
              <p className="text-sm font-bold text-foreground mb-1">{s.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════ */

function ContactForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", phone: "", message: "",
    industry: "", inquiryType: "",
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
        message: form.message.trim() || null,
        source: "get-started",
        challenges: [],
      });
      if (error) throw error;

      supabase.from("cms_contacts").insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim() || null,
        industry: form.industry || null,
        message: form.message.trim() || null,
        source: "get-started",
        source_detail: form.inquiryType || "quick-contact",
      }).then(({ error: cmsErr }) => {
        if (cmsErr) console.error("CMS contact save error:", cmsErr);
      });

      supabase.functions.invoke("send-alert", {
        body: {
          type: "new_contact",
          data: {
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim(),
            email: form.email.trim(),
            company: form.company.trim(),
            phone: form.phone.trim() || null,
            source: "get-started",
            message: form.message.trim() || null,
            inquiry_type: form.inquiryType || "quick-contact",
          },
        },
      }).then(({ error: alertErr }) => {
        if (alertErr) console.error("Alert send error:", alertErr);
      });

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
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-brand-orange/15">
          <Send size={28} className="text-brand-orange" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">Your message has been received. A member of our team will contact you within 24 hours.</p>
        <Link to="/assessment/start" className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-brand-orange">
          Start Full Assessment <ArrowRight size={14} />
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
          <input type="text" required value={form.firstName} onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
          <input type="text" required value={form.lastName} onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Work Email *</label>
          <input type="email" required value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
          <input type="text" required value={form.company} onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
          <input type="tel" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Interest *</label>
          <select required value={form.inquiryType} onChange={e => setForm(prev => ({ ...prev, inquiryType: e.target.value }))}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors">
            <option value="">Select an option</option>
            {["Sales", "Support", "Partners", "Careers", "Other"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Message</label>
        <textarea rows={4} value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors resize-none" />
      </div>
      <button type="submit" disabled={submitting}
        className={`flex items-center justify-center gap-2 w-full py-4 font-semibold transition-all ${submitting ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-brand-orange text-white hover:opacity-90"}`}>
        {submitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════ */

function ContactSection() {
  return (
    <section id="contact-form" className="py-20 lg:py-24" style={{ background: "#EEE9E3" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-4">Contact Information</p>
            <div className="space-y-5 mt-6">
              {[
                { icon: Mail, title: "General Inquiries", value: "info@managekube.com", href: "mailto:info@managekube.com" },
                { icon: Mail, title: "Sales", value: "sales@managekube.com", href: "mailto:sales@managekube.com" },
                { icon: Mail, title: "Support", value: "support@managekube.com", href: "mailto:support@managekube.com" },
                { icon: Mail, title: "Partners", value: "partners@managekube.com", href: "mailto:partners@managekube.com" },
                { icon: Phone, title: "Phone", value: "(240) 257-2029", href: "tel:+12402572029" },
                { icon: MapPin, title: "Headquarters", value: "526 King Street, Alexandria, VA 22314", href: null },
                { icon: Clock, title: "Support Hours", value: "24/7 for existing clients", href: null },
              ].map(m => (
                <div key={m.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-white flex items-center justify-center flex-shrink-0">
                    <m.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{m.title}</p>
                    {m.href ? (
                      <a href={m.href} className="text-sm font-semibold text-foreground hover:text-brand-orange transition-colors">{m.value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">{m.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-8 lg:p-12 border border-border">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">Send Us a Message</p>
              <h2 className="text-2xl font-bold text-foreground mb-8">How can we help?</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */

export default function GetStarted() {
  return (
    <PageLayout>
      <PageBanner
        title="Get Started"
        subtitle="Your security journey starts here. Full assessment or à la carte — choose what fits."
      />
      <SplitHero />
      <HowItWorks />
      <ContactSection />
    </PageLayout>
  );
}
