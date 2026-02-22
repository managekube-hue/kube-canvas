import { useState } from "react";
import { UidrLayout } from "@/components/UidrLayout";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function UidrContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.from("cms_contacts").insert({
        first_name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim() || null,
        source: "uidr-contact",
        source_detail: form.subject || "general",
      });

      supabase.functions.invoke("send-alert", {
        body: {
          type: "new_contact",
          data: {
            first_name: form.name.trim(),
            email: form.email.trim(),
            source: "uidr-contact",
            message: form.message.trim() || null,
            inquiry_type: form.subject || "platform-inquiry",
          },
        },
      }).then(({ error }) => { if (error) console.error("Alert error:", error); });

      setSubmitted(true);
    } catch (err) {
      console.error("UIDR contact error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <Send size={28} className="text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-white/50 text-sm">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Name</label>
          <input type="text" required placeholder="Your name" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Email</label>
          <input type="email" required placeholder="you@example.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Subject</label>
        <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white/60 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
          <option value="">Select a topic...</option>
          <option>Platform inquiry</option>
          <option>Enterprise licensing</option>
          <option>Partnership</option>
          <option>Contributor application</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Message</label>
        <textarea rows={6} placeholder="How can we help?" value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" />
      </div>
      <button type="submit" disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50">
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default function UidrContact() {
  return (
    <UidrLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Hero */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <p className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">CONTACT</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">Get in touch.</h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xl">
            Questions about the platform, partnership inquiries, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h2 className="text-base font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-0.5">EMAIL</p>
                  <p className="text-sm text-white">hello@kubric.io</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-0.5">SLACK</p>
                  <p className="text-sm text-white">slack.kubric.io</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-0.5">LOCATION</p>
                  <p className="text-sm text-white">Distributed (Remote-first)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <p className="text-sm font-semibold text-white mb-2">Enterprise inquiries</p>
              <p className="text-xs text-white/50 leading-relaxed">
                For deployment consultations, licensing discussions, or managed detection partnerships, reach out to{" "}
                <a href="mailto:enterprise@kubric.io" className="text-blue-400 hover:text-blue-300">enterprise@kubric.io</a>.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <UidrContactForm />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-bold text-white mb-3">Platform</p>
            {["SOC", "NOC", "GRC", "PSA", "KAI"].map(l => <p key={l} className="text-xs text-white/40 mb-1">{l}</p>)}
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-3">Resources</p>
            {["Documentation", "Contributors", "Open source", "GitHub", "Status"].map(l => <p key={l} className="text-xs text-white/40 mb-1">{l}</p>)}
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-3">Connect</p>
            {["Slack", "Twitter", "LinkedIn", "Contact", "Security"].map(l => <p key={l} className="text-xs text-white/40 mb-1">{l}</p>)}
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-3">Legal</p>
            {["License", "Attribution", "Privacy", "Terms", "Cookies"].map(l => <p key={l} className="text-xs text-white/40 mb-1">{l}</p>)}
          </div>
        </div>
        <p className="text-xs text-white/20 mt-6">© 2026 Kubric. All rights reserved.</p>
      </div>
    </UidrLayout>
  );
}
