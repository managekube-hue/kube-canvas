import { UidrLayout } from "@/components/UidrLayout";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function UidrContact() {
  return (
    <UidrLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Hero */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <p className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">CONTACT</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">Get in touch.</h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xl">
            Questions about the platform, partnership inquiries, or just want to say hello — we'd love to hear from you.
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

          {/* Right — Form */}
          <div>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Subject</label>
                <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white/60 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
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
                <textarea
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
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
