import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Building2, Shield, Users, Zap } from "lucide-react";

const STEPS = [
  { id: "org", label: "Your Organization", icon: Building2 },
  { id: "needs", label: "Your Needs", icon: Shield },
  { id: "scope", label: "Scope & Size", icon: Users },
  { id: "contact", label: "Get Started", icon: Zap },
];

const INDUSTRIES = [
  "Manufacturing", "Healthcare", "Financial Services", "Retail",
  "Transportation", "Mining & Extraction", "Energy & Utilities",
  "Public Sector", "Telecommunications", "Technology / MSP / MSSP", "Other",
];

const CHALLENGES = [
  "We don't have a dedicated security team",
  "We failed or fear failing a compliance audit",
  "We've experienced a breach or security incident",
  "Our IT infrastructure is aging and unreliable",
  "We need 24/7 monitoring but can't staff it",
  "We're growing fast and need to scale securely",
  "We need to consolidate multiple vendor tools",
  "We want to reduce IT operational costs",
];

const ORG_SIZES = [
  { label: "1–50 employees", tier: "XRO Essentials" },
  { label: "51–250 employees", tier: "XMX Advanced" },
  { label: "251–500 employees", tier: "XMX Advanced" },
  { label: "500–1,000 employees", tier: "XME Enterprise" },
  { label: "1,000+ employees", tier: "XME Enterprise" },
];

const ORANGE = "#993619";

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    industry: "",
    orgSize: "",
    challenges: [] as string[],
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const toggleChallenge = (c: string) => {
    setForm(prev => ({
      ...prev,
      challenges: prev.challenges.includes(c)
        ? prev.challenges.filter(x => x !== c)
        : [...prev.challenges, c],
    }));
  };

  const canProceed = () => {
    if (step === 0) return !!form.industry;
    if (step === 1) return form.challenges.length > 0;
    if (step === 2) return !!form.orgSize;
    if (step === 3) return !!form.firstName && !!form.lastName && !!form.email && !!form.company;
    return false;
  };

  const handleSubmit = () => {
    // TODO: Wire to Supabase + Resend + HubSpot
    console.log("Onboarding submission:", form);
    setStep(4);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-28 pb-12 lg:pt-40 lg:pb-16" style={{ background: "#0C0C0C" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-[2px] w-12 mb-8" style={{ background: ORANGE }} />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
              Get Started
            </h1>
            <p className="text-lg text-white/50 max-w-xl">
              Tell us about your organization and we'll build your custom security and operations roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress */}
      <section style={{ background: "#141414", borderBottom: "1px solid rgba(205,202,197,0.07)" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="flex items-center gap-0 py-4 overflow-x-auto">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step || step === 4;
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex items-center gap-2 px-4 py-2 whitespace-nowrap">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: isDone ? ORANGE : isActive ? "rgba(153,54,25,0.2)" : "rgba(205,202,197,0.05)",
                        color: isDone || isActive ? "#fff" : "rgba(205,202,197,0.3)",
                        border: isActive ? `1px solid ${ORANGE}` : "1px solid transparent",
                      }}>
                      {isDone ? <CheckCircle size={14} /> : <Icon size={14} />}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: isActive ? "#fff" : "rgba(205,202,197,0.3)" }}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-8 h-[1px]" style={{ background: isDone ? ORANGE : "rgba(205,202,197,0.08)" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Steps */}
      <section style={{ background: "#0C0C0C", minHeight: "60vh" }} className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <AnimatePresence mode="wait">
            {/* Step 0: Industry */}
            {step === 0 && (
              <motion.div key="step-0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Step 1 of 4</p>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>What industry are you in?</h2>
                <p className="text-sm text-white/40 mb-8">This helps us tailor compliance frameworks and solutions to your vertical.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {INDUSTRIES.map(ind => (
                    <button key={ind} onClick={() => setForm(f => ({ ...f, industry: ind }))}
                      className="text-left px-4 py-3 text-sm font-medium transition-all"
                      style={{
                        background: form.industry === ind ? "rgba(153,54,25,0.15)" : "rgba(205,202,197,0.03)",
                        border: form.industry === ind ? `1px solid ${ORANGE}` : "1px solid rgba(205,202,197,0.08)",
                        color: form.industry === ind ? "#fff" : "rgba(205,202,197,0.5)",
                      }}>
                      {ind}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Challenges */}
            {step === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Step 2 of 4</p>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>What challenges are you facing?</h2>
                <p className="text-sm text-white/40 mb-8">Select all that apply.</p>
                <div className="space-y-2">
                  {CHALLENGES.map(c => (
                    <button key={c} onClick={() => toggleChallenge(c)}
                      className="w-full text-left px-5 py-4 text-sm font-medium transition-all flex items-center gap-3"
                      style={{
                        background: form.challenges.includes(c) ? "rgba(153,54,25,0.12)" : "rgba(205,202,197,0.03)",
                        border: form.challenges.includes(c) ? `1px solid ${ORANGE}` : "1px solid rgba(205,202,197,0.08)",
                        color: form.challenges.includes(c) ? "#fff" : "rgba(205,202,197,0.5)",
                      }}>
                      <div className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center"
                        style={{ background: form.challenges.includes(c) ? ORANGE : "transparent", border: form.challenges.includes(c) ? "none" : "1px solid rgba(205,202,197,0.2)" }}>
                        {form.challenges.includes(c) && <CheckCircle size={10} className="text-white" />}
                      </div>
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Org Size */}
            {step === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Step 3 of 4</p>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>How large is your organization?</h2>
                <p className="text-sm text-white/40 mb-8">This determines your recommended service tier.</p>
                <div className="space-y-2">
                  {ORG_SIZES.map(s => (
                    <button key={s.label} onClick={() => setForm(f => ({ ...f, orgSize: s.label }))}
                      className="w-full text-left px-5 py-4 transition-all flex items-center justify-between"
                      style={{
                        background: form.orgSize === s.label ? "rgba(153,54,25,0.12)" : "rgba(205,202,197,0.03)",
                        border: form.orgSize === s.label ? `1px solid ${ORANGE}` : "1px solid rgba(205,202,197,0.08)",
                        color: form.orgSize === s.label ? "#fff" : "rgba(205,202,197,0.5)",
                      }}>
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className="text-xs font-bold tracking-wider uppercase" style={{ color: ORANGE }}>{s.tier}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <motion.div key="step-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Step 4 of 4</p>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>Let's get you started</h2>
                <p className="text-sm text-white/40 mb-8">Our team will reach out within 24 hours with your custom roadmap.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: "firstName", label: "First Name", type: "text" },
                    { key: "lastName", label: "Last Name", type: "text" },
                    { key: "email", label: "Work Email", type: "email" },
                    { key: "company", label: "Company", type: "text" },
                    { key: "phone", label: "Phone (optional)", type: "tel" },
                  ].map(f => (
                    <div key={f.key} className={f.key === "phone" ? "md:col-span-2" : ""}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/30 mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        value={(form as any)[f.key]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-white focus:outline-none"
                        style={{
                          background: "rgba(205,202,197,0.04)",
                          border: "1px solid rgba(205,202,197,0.1)",
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = ORANGE}
                        onBlur={e => e.currentTarget.style.borderColor = "rgba(205,202,197,0.1)"}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/30 mb-2">Anything else? (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 text-sm text-white focus:outline-none resize-none"
                      style={{
                        background: "rgba(205,202,197,0.04)",
                        border: "1px solid rgba(205,202,197,0.1)",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = ORANGE}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(205,202,197,0.1)"}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success */}
            {step === 4 && (
              <motion.div key="step-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(153,54,25,0.15)" }}>
                  <CheckCircle size={32} style={{ color: ORANGE }} />
                </div>
                <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
                  You're in.
                </h2>
                <p className="text-white/50 max-w-md mx-auto mb-8">
                  Our team will review your responses and reach out within 24 hours with a custom security and operations roadmap tailored to your {form.industry.toLowerCase()} organization.
                </p>
                <p className="text-xs text-white/25">Confirmation sent to {form.email}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-12 pt-8" style={{ borderTop: "1px solid rgba(205,202,197,0.06)" }}>
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm font-semibold transition-colors disabled:opacity-20"
                style={{ color: "rgba(205,202,197,0.4)" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={() => step === 3 ? handleSubmit() : setStep(s => s + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all disabled:opacity-30"
                style={{ background: canProceed() ? ORANGE : "rgba(153,54,25,0.3)" }}
              >
                {step === 3 ? "Submit" : "Continue"} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
