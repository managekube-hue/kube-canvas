/**
 * ManageKube Smart Pricing Simulator — Full Assessment Engine
 * Implements the Unified Question Set v2.0 with:
 * - P0 Universal capture + routing
 * - 6 deep-dive flows (SR, IA, CM, GE, CO, compliance)
 * - Real-time scoring with EMS, CF maturity, urgency, risk
 * - Branching showIf logic
 * - Auto-save to Supabase
 * - Escalation detection (ongoing incident → immediate sales alert)
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { PageLayout } from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle, AlertTriangle,
  Shield, Server, Cloud, TrendingUp, DollarSign, Building2,
  Phone, FileText,
} from "lucide-react";
import {
  P0_QUESTIONS, SR_QUESTIONS, IA_QUESTIONS, CM_QUESTIONS, GE_QUESTIONS, CO_QUESTIONS,
  CAPTURE_FIELDS, FLOW_LABELS, PRIORITY_TO_FLOW, type AssessmentQuestion,
} from "@/data/assessment-questions";
import { calculateScores, shouldEscalate, type ScoringResult } from "@/lib/assessment-scoring";

const ORANGE = "#993619";

const FLOW_ICONS: Record<string, any> = {
  P0: Building2, SR: Shield, IA: Server, CM: Cloud, GE: TrendingUp, CO: DollarSign,
};

type Phase = "capture" | "p0" | "deep_dive" | "results" | "escalation";

export default function AssessmentEngine() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("capture");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flags, setFlags] = useState<Record<string, any>>({});
  const [capture, setCapture] = useState<Record<string, string>>({
    first_name: "", last_name: "", email: "", company: "", phone: "",
  });
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentFlow, setCurrentFlow] = useState<string>("P0");
  const [scores, setScores] = useState<ScoringResult | null>(null);
  const [saving, setSaving] = useState(false);

  // Get visible questions for current flow
  const getVisibleQuestions = useCallback(
    (flow: string): AssessmentQuestion[] => {
      const flowMap: Record<string, AssessmentQuestion[]> = {
        P0: P0_QUESTIONS, SR: SR_QUESTIONS, IA: IA_QUESTIONS,
        CM: CM_QUESTIONS, GE: GE_QUESTIONS, CO: CO_QUESTIONS,
      };
      const qs = flowMap[flow] || [];
      return qs.filter((q) => {
        if (!q.showIf) return true;
        return q.showIf(answers, flags);
      });
    },
    [answers, flags]
  );

  const visibleQuestions = useMemo(() => getVisibleQuestions(currentFlow), [currentFlow, getVisibleQuestions]);
  const currentQuestion = visibleQuestions[currentQIndex];
  const totalVisibleP0 = useMemo(() => getVisibleQuestions("P0").length, [getVisibleQuestions]);
  const totalVisibleDeep = useMemo(() => {
    const flow = PRIORITY_TO_FLOW[answers["P0-Q4_PRIMARY_PRIORITY"]] || "SR";
    return getVisibleQuestions(flow).length;
  }, [answers, getVisibleQuestions]);

  // Create session on capture submit
  const handleCaptureSubmit = async () => {
    if (!capture.first_name || !capture.last_name || !capture.email || !capture.company) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("assessment_sessions")
        .insert({
          first_name: capture.first_name.trim(),
          last_name: capture.last_name.trim(),
          email: capture.email.trim(),
          company: capture.company.trim(),
          phone: capture.phone.trim() || null,
          status: "in_progress",
          current_flow: "P0",
          current_question: "P0-Q0C_INDUSTRY",
        })
        .select("id")
        .single();
      if (error) throw error;
      setSessionId(data.id);
      localStorage.setItem("mk_assessment_session", data.id);
      setPhase("p0");
      setCurrentFlow("P0");
      setCurrentQIndex(0);
    } catch (err) {
      console.error("Session creation error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Answer a question
  const handleAnswer = (code: string, value: any) => {
    const newAnswers = { ...answers, [code]: value };
    setAnswers(newAnswers);

    // Apply flags from the selected option(s)
    const question = visibleQuestions.find((q) => q.code === code);
    if (question?.options) {
      const newFlags = { ...flags };
      if (question.type === "multi" && Array.isArray(value)) {
        for (const v of value) {
          const opt = question.options.find((o) => o.value === v);
          if (opt?.flags) Object.assign(newFlags, opt.flags);
        }
      } else {
        const opt = question.options.find((o) => o.value === value);
        if (opt?.flags) Object.assign(newFlags, opt.flags);
      }
      setFlags(newFlags);
    }
  };

  // Toggle multi-select
  const toggleMulti = (code: string, value: string) => {
    const current = (answers[code] as string[]) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    handleAnswer(code, next);
  };

  // Auto-save to Supabase
  useEffect(() => {
    if (!sessionId) return;
    const timeout = setTimeout(async () => {
      try {
        const scoring = calculateScores(answers, flags);
        await supabase.from("assessment_sessions").update({
          answers,
          flags,
          current_flow: currentFlow,
          current_question: currentQuestion?.code || null,
          industry: answers["P0-Q0C_INDUSTRY"] || null,
          endpoint_count: parseInt(answers["P0-Q0E_ENDPOINTS"]) || null,
          remote_workforce_pct: answers["P0-Q0F_WORKFORCE_REMOTE"] || null,
          email_platform: answers["P0-Q0G_EMAIL_PLATFORM"] || null,
          role: answers["P0-Q1_ROLE"] || null,
          org_stage: answers["P0-Q2_ORG_STAGE"] || null,
          it_situation: answers["P0-Q3_IT_SITUATION"] || null,
          primary_priority: answers["P0-Q4_PRIMARY_PRIORITY"] || null,
          compliance_frameworks: answers["P0-Q4A_FRAMEWORKS"] || null,
          compliance_deadline: answers["P0-Q4A_DEADLINE"] || null,
          incident_type: answers["P0-Q4B_INCIDENT_TYPE"] || null,
          incident_age: answers["P0-Q4B_INCIDENT_AGE"] || null,
          timeline: answers["P0-Q5_TIMELINE"] || null,
          msp_issues: answers["P0-Q3B_MSP_ISSUES"] || null,
          ems_score: scoring.ems_score,
          complexity_score: scoring.complexity_score,
          urgency_score: scoring.urgency_score,
          risk_score: scoring.risk_score,
          cf_infrastructure_maturity: scoring.cf_infrastructure_maturity,
          cf_security_ps_maturity: scoring.cf_security_ps_maturity,
          cf_iam_maturity: scoring.cf_iam_maturity,
          cf_secops_maturity: scoring.cf_secops_maturity,
          cf_cloud_maturity: scoring.cf_cloud_maturity,
          cf_data_protection_maturity: scoring.cf_data_protection_maturity,
          cf_business_gov_maturity: scoring.cf_business_gov_maturity,
          cf_dr_bc_maturity: scoring.cf_dr_bc_maturity,
          cf_automation_maturity: scoring.cf_automation_maturity,
          cf_cost_maturity: scoring.cf_cost_maturity,
          recommended_tier: scoring.recommended_tier,
          profile_type: scoring.profile_type,
          upsell_ready: scoring.upsell_ready,
          key_gap_flags: scoring.key_gap_flags,
        }).eq("id", sessionId);
      } catch (_e) {
        // Silent fail on auto-save
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [answers, flags, sessionId, currentFlow, currentQuestion]);

  // Navigate forward
  const handleNext = () => {
    // Check for escalation
    if (shouldEscalate(answers, flags)) {
      setPhase("escalation");
      finalizeSession("escalated");
      return;
    }

    if (currentQIndex < visibleQuestions.length - 1) {
      setCurrentQIndex((i) => i + 1);
    } else if (phase === "p0") {
      // Transition to deep-dive flow
      const priority = answers["P0-Q4_PRIMARY_PRIORITY"];
      const deepFlow = priority ? (PRIORITY_TO_FLOW[priority] || "SR") : "SR";
      setCurrentFlow(deepFlow);
      setPhase("deep_dive");
      setCurrentQIndex(0);
    } else {
      // Assessment complete
      const finalScores = calculateScores(answers, flags);
      setScores(finalScores);
      setPhase("results");
      finalizeSession("completed");
    }
  };

  const handleBack = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((i) => i - 1);
    } else if (phase === "deep_dive") {
      setCurrentFlow("P0");
      setPhase("p0");
      const p0Visible = getVisibleQuestions("P0");
      setCurrentQIndex(p0Visible.length - 1);
    }
  };

  const finalizeSession = async (status: string) => {
    if (!sessionId) return;
    const finalScores = calculateScores(answers, flags);
    setScores(finalScores);
    try {
      await supabase.from("assessment_sessions").update({
        status,
        completed_at: new Date().toISOString(),
        ems_score: finalScores.ems_score,
        recommended_tier: finalScores.recommended_tier,
        profile_type: finalScores.profile_type,
        key_gap_flags: finalScores.key_gap_flags,
      }).eq("id", sessionId);
    } catch (_e) { /* silent */ }
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    const val = answers[currentQuestion.code];
    if (currentQuestion.type === "multi") return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== null && val !== "";
  };

  // Progress calculation
  const totalQuestions = totalVisibleP0 + totalVisibleDeep;
  const answeredInP0 = phase === "p0" ? currentQIndex : totalVisibleP0;
  const answeredInDeep = phase === "deep_dive" ? currentQIndex : 0;
  const progressPct = Math.round(((answeredInP0 + answeredInDeep) / Math.max(totalQuestions, 1)) * 100);

  // Live scores
  const liveScores = useMemo(() => calculateScores(answers, flags), [answers, flags]);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-28 pb-10 lg:pt-40 lg:pb-14" style={{ background: "#0C0C0C" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-[2px] w-12 mb-6" style={{ background: ORANGE }} />
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>
              Smart Pricing Simulator
            </h1>
            <p className="text-sm text-white/40 max-w-xl">
              Answer questions about your environment. We calculate your risk score, maturity levels, and recommended service tier — with real scoring weights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      {phase !== "capture" && phase !== "results" && phase !== "escalation" && (
        <section style={{ background: "#141414", borderBottom: "1px solid rgba(205,202,197,0.07)" }}>
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = FLOW_ICONS[currentFlow] || Shield;
                  return <Icon size={14} style={{ color: ORANGE }} />;
                })()}
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>
                  {FLOW_LABELS[currentFlow]} — Q{currentQIndex + 1} of {visibleQuestions.length}
                </span>
              </div>
              <span className="text-xs text-white/30">{progressPct}% complete</span>
            </div>
            <div className="w-full h-1 rounded-full" style={{ background: "rgba(205,202,197,0.06)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ background: ORANGE, width: `${progressPct}%` }} />
            </div>
            {/* Live Score Ticker */}
            <div className="flex items-center gap-6 mt-3">
              <div className="text-xs text-white/25">EMS: <span className="text-white/60 font-bold">{liveScores.ems_score}</span></div>
              <div className="text-xs text-white/25">Risk: <span className={`font-bold ${liveScores.risk_score > 50 ? "text-red-400" : liveScores.risk_score > 25 ? "text-yellow-400" : "text-green-400"}`}>{liveScores.risk_score}</span></div>
              <div className="text-xs text-white/25">Tier: <span className="font-bold" style={{ color: ORANGE }}>{liveScores.recommended_tier}</span></div>
              {liveScores.urgency_score > 10 && (
                <div className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle size={10} /> Urgency: {liveScores.urgency_score}</div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section style={{ background: "#0C0C0C", minHeight: "60vh" }} className="py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <AnimatePresence mode="wait">
            {/* ── CAPTURE ── */}
            {phase === "capture" && (
              <motion.div key="capture" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Step 1 — Contact Information</p>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>Let's start with your details</h2>
                <p className="text-sm text-white/40 mb-8">Your information is used to create your assessment session and deliver results.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {CAPTURE_FIELDS.map((f) => (
                    <div key={f.key} className={f.key === "phone" ? "md:col-span-2" : ""}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/30 mb-2">
                        {f.label} {f.required && <span style={{ color: ORANGE }}>*</span>}
                      </label>
                      <input
                        type={f.type}
                        value={capture[f.key] || ""}
                        onChange={(e) => setCapture((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-white focus:outline-none"
                        style={{ background: "rgba(205,202,197,0.04)", border: "1px solid rgba(205,202,197,0.1)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(205,202,197,0.1)")}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    onClick={handleCaptureSubmit}
                    disabled={!capture.first_name || !capture.last_name || !capture.email || !capture.company || saving}
                    className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all disabled:opacity-30"
                    style={{ background: ORANGE }}
                  >
                    {saving ? "Creating Session..." : "Begin Assessment"} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── QUESTION ── */}
            {(phase === "p0" || phase === "deep_dive") && currentQuestion && (
              <motion.div key={currentQuestion.code} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: ORANGE }}>
                  {currentQuestion.code}
                </p>
                <h2 className="text-xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>
                  {currentQuestion.label}
                </h2>
                {currentQuestion.description && (
                  <p className="text-xs text-white/35 mb-6">{currentQuestion.description}</p>
                )}

                {/* Single Select */}
                {currentQuestion.type === "single" && currentQuestion.options && (
                  <div className="space-y-2">
                    {currentQuestion.options.map((opt) => {
                      const selected = answers[currentQuestion.code] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(currentQuestion.code, opt.value)}
                          className="w-full text-left px-5 py-4 text-sm font-medium transition-all flex items-center gap-3"
                          style={{
                            background: selected ? "rgba(153,54,25,0.12)" : "rgba(205,202,197,0.03)",
                            border: selected ? `1px solid ${ORANGE}` : "1px solid rgba(205,202,197,0.08)",
                            color: selected ? "#fff" : "rgba(205,202,197,0.5)",
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                            style={{
                              background: selected ? ORANGE : "transparent",
                              border: selected ? "none" : "1px solid rgba(205,202,197,0.2)",
                            }}
                          >
                            {selected && <CheckCircle size={10} className="text-white" />}
                          </div>
                          <span className="flex-1">{opt.label}</span>
                          {/* Show score impact */}
                          {opt.score && (
                            <span className="text-[10px] text-white/20">
                              {Object.entries(opt.score).map(([k, v]) => `${k.replace("cf_", "").replace("_", " ")}:${v > 0 ? "+" : ""}${v}`).join(" | ")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Multi Select */}
                {currentQuestion.type === "multi" && currentQuestion.options && (
                  <div className="space-y-2">
                    <p className="text-xs text-white/25 mb-3">Select all that apply</p>
                    {currentQuestion.options.map((opt) => {
                      const selected = ((answers[currentQuestion.code] as string[]) || []).includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          onClick={() => toggleMulti(currentQuestion.code, opt.value)}
                          className="w-full text-left px-5 py-4 text-sm font-medium transition-all flex items-center gap-3"
                          style={{
                            background: selected ? "rgba(153,54,25,0.12)" : "rgba(205,202,197,0.03)",
                            border: selected ? `1px solid ${ORANGE}` : "1px solid rgba(205,202,197,0.08)",
                            color: selected ? "#fff" : "rgba(205,202,197,0.5)",
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center"
                            style={{
                              background: selected ? ORANGE : "transparent",
                              border: selected ? "none" : "1px solid rgba(205,202,197,0.2)",
                            }}
                          >
                            {selected && <CheckCircle size={10} className="text-white" />}
                          </div>
                          <span className="flex-1">{opt.label}</span>
                          {opt.score && (
                            <span className="text-[10px] text-white/20">
                              {Object.entries(opt.score).map(([k, v]) => `${k.replace("cf_", "").replace("_", " ")}:${v > 0 ? "+" : ""}${v}`).join(" | ")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── ESCALATION ── */}
            {phase === "escalation" && (
              <motion.div key="escalation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(220,38,38,0.15)" }}>
                  <AlertTriangle size={32} className="text-red-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
                  Immediate Escalation Required
                </h2>
                <p className="text-white/50 max-w-md mx-auto mb-6">
                  Based on your responses, your situation requires immediate attention from our incident response team. A senior analyst will contact you within the hour.
                </p>
                <div className="p-6 text-left max-w-md mx-auto" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">What Happens Next</p>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-start gap-2"><CheckCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" /> Same-day IR escalation to senior analyst</li>
                    <li className="flex items-start gap-2"><CheckCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" /> Immediate containment guidance over phone</li>
                    <li className="flex items-start gap-2"><CheckCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" /> Full incident response retainer discussion</li>
                  </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <a href="tel:+1234567890" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white" style={{ background: "#dc2626" }}>
                    <Phone size={14} /> Call Now
                  </a>
                  <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white" style={{ background: ORANGE }}>
                    <FileText size={14} /> Contact Form
                  </a>
                </div>
              </motion.div>
            )}

            {/* ── RESULTS ── */}
            {phase === "results" && scores && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Assessment Complete</p>
                <h2 className="text-3xl font-black text-white mb-6" style={{ fontFamily: "'Special Elite', serif" }}>
                  Your Results
                </h2>

                {/* Top-line scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {[
                    { label: "EMS Score", value: scores.ems_score, max: 1000 },
                    { label: "Risk Score", value: scores.risk_score, max: 100 },
                    { label: "Complexity", value: scores.complexity_score, max: 50 },
                    { label: "Urgency", value: scores.urgency_score, max: 50 },
                  ].map((s) => (
                    <div key={s.label} className="p-4 text-center" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.08)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1">{s.label}</p>
                      <p className="text-2xl font-black text-white">{s.value}</p>
                      <div className="w-full h-1 mt-2 rounded-full" style={{ background: "rgba(205,202,197,0.06)" }}>
                        <div className="h-full rounded-full" style={{ background: ORANGE, width: `${Math.min((s.value / s.max) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommended Tier */}
                <div className="p-6 mb-6" style={{ background: "rgba(153,54,25,0.08)", border: `1px solid ${ORANGE}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: ORANGE }}>Recommended Service Tier</p>
                  <p className="text-3xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
                    {scores.recommended_tier === "XRO" && "XRO Essentials"}
                    {scores.recommended_tier === "XMX" && "XMX Advanced"}
                    {scores.recommended_tier === "XME" && "XME Enterprise"}
                  </p>
                  <p className="text-xs text-white/40 mt-1">Profile: {scores.profile_type} | Industry multiplier: ×{scores.industry_multiplier}</p>
                  {scores.upsell_ready && (
                    <p className="text-xs mt-2" style={{ color: ORANGE }}>⬆ Your scores suggest the next tier may be more appropriate.</p>
                  )}
                </div>

                {/* CF Maturity Scores */}
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-3">Maturity Scores (0–10)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Infrastructure", val: scores.cf_infrastructure_maturity },
                      { label: "Security / PS", val: scores.cf_security_ps_maturity },
                      { label: "IAM", val: scores.cf_iam_maturity },
                      { label: "SecOps", val: scores.cf_secops_maturity },
                      { label: "Cloud", val: scores.cf_cloud_maturity },
                      { label: "Data Protection", val: scores.cf_data_protection_maturity },
                      { label: "Business Governance", val: scores.cf_business_gov_maturity },
                      { label: "DR / BC", val: scores.cf_dr_bc_maturity },
                      { label: "Automation", val: scores.cf_automation_maturity },
                      { label: "Cost", val: scores.cf_cost_maturity },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 px-3 py-2" style={{ background: "rgba(205,202,197,0.03)" }}>
                        <span className="text-xs text-white/40 flex-1">{item.label}</span>
                        <span className="text-sm font-bold text-white">{item.val}</span>
                        <div className="w-16 h-1 rounded-full" style={{ background: "rgba(205,202,197,0.06)" }}>
                          <div className="h-full rounded-full" style={{ background: ORANGE, width: `${(item.val / 10) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gap Flags */}
                {scores.key_gap_flags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">Critical Gaps Identified</p>
                    <div className="flex flex-wrap gap-2">
                      {scores.key_gap_flags.map((flag) => (
                        <span key={flag} className="px-3 py-1 text-xs font-bold uppercase" style={{ background: "rgba(220,38,38,0.1)", color: "#ef4444", border: "1px solid rgba(220,38,38,0.2)" }}>
                          {flag.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mt-8 pt-8" style={{ borderTop: "1px solid rgba(205,202,197,0.06)" }}>
                  <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white" style={{ background: ORANGE }}>
                    Contact Sales <ArrowRight size={14} />
                  </a>
                  <a href={`/service-tiers/${scores.recommended_tier.toLowerCase()}-${scores.recommended_tier === "XRO" ? "essentials" : scores.recommended_tier === "XMX" ? "advanced" : "enterprise"}`}
                    className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all"
                    style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)" }}
                  >
                    View {scores.recommended_tier} Tier
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {(phase === "p0" || phase === "deep_dive") && (
            <div className="flex items-center justify-between mt-10 pt-6" style={{ borderTop: "1px solid rgba(205,202,197,0.06)" }}>
              <button
                onClick={handleBack}
                disabled={phase === "p0" && currentQIndex === 0}
                className="flex items-center gap-2 text-sm font-semibold transition-colors disabled:opacity-20"
                style={{ color: "rgba(205,202,197,0.4)" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all disabled:opacity-30"
                style={{ background: canProceed() ? ORANGE : "rgba(153,54,25,0.3)" }}
              >
                {currentQIndex === visibleQuestions.length - 1 && phase === "deep_dive"
                  ? "Complete Assessment"
                  : currentQIndex === visibleQuestions.length - 1 && phase === "p0"
                    ? `Continue to ${FLOW_LABELS[PRIORITY_TO_FLOW[answers["P0-Q4_PRIMARY_PRIORITY"]] || "SR"] || "Deep Dive"}`
                    : "Continue"
                }
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
