/**
 * Assessment Results Panel
 * Displays EMS scores, recommended modules, milestone pricing slider,
 * and à la carte professional services menu.
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Star, Zap, ExternalLink,
  ChevronDown, ChevronUp, Shield, Server, Cloud,
  FileCheck, Bug, Network, Monitor, Fingerprint, Eye,
  Calculator, Lightbulb, Radar, Activity, Gauge,
  Smartphone, Scale, ClipboardCheck, DatabaseBackup,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { ScoringResult } from "@/lib/assessment-scoring";
import {
  getRecommendedModules, getProfessionalServices, getMilestoneDiscounts, calculateMilestonePrice,
  type RecommendedModule,
} from "@/lib/module-recommendations";

const ORANGE = "#993619";

const ICON_MAP: Record<string, any> = {
  ClipboardCheck, Shield, Eye, Monitor, Fingerprint, Network, Bug, FileCheck,
  Scale, Server, DatabaseBackup, Cloud, Lightbulb, Calculator, Radar,
  Activity, Gauge, Smartphone, Star,
};

const CATEGORY_LABELS: Record<string, string> = {
  migration: "Migration & Deployment",
  security: "Security Services",
  infrastructure: "Infrastructure",
  compliance: "Compliance & Governance",
  optimization: "Optimisation & Advisory",
};

interface ResultsPanelProps {
  scores: ScoringResult;
  answers: Record<string, any>;
  flags: Record<string, any>;
}

export function ResultsPanel({ scores, answers, flags }: ResultsPanelProps) {
  const [milestoneSlider, setMilestoneSlider] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const modules = useMemo(() => getRecommendedModules(scores, answers, flags), [scores, answers, flags]);
  const services = useMemo(() => getProfessionalServices(scores, answers, flags), [scores, answers, flags]);
  const milestones = useMemo(() => getMilestoneDiscounts(scores), [scores]);
  const milestonePrice = useMemo(
    () => calculateMilestonePrice(scores.monthly_price, milestones, milestoneSlider),
    [scores.monthly_price, milestones, milestoneSlider]
  );
  const totalDiscount = useMemo(() => {
    let d = 0;
    for (let i = 0; i < milestoneSlider; i++) d += milestones[i].discountPct;
    return d;
  }, [milestones, milestoneSlider]);

  const criticalModules = modules.filter((m) => m.priority === "critical");
  const recommendedModules = modules.filter((m) => m.priority === "recommended");
  const optionalModules = modules.filter((m) => m.priority === "optional");

  const recommendedServices = services.filter((s) => s.recommended);
  const otherServices = services.filter((s) => !s.recommended);
  const displayedServices = showAllServices ? services : recommendedServices;

  // Group services by category
  const servicesByCategory = displayedServices.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Assessment Complete</p>
      <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>
        Your Results
      </h2>
      <p className="text-sm text-white/40 mb-8">
        {modules.length} modules recommended · {recommendedServices.length} professional services identified · {scores.key_gap_flags.length} critical gaps
      </p>

      {/* ── TOP-LINE SCORES ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "EMS Score", value: scores.ems_score, max: 1000 },
          { label: "Risk Score", value: scores.risk_score, max: 100 },
          { label: "Complexity", value: scores.complexity_score, max: 500 },
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

      {/* ── RECOMMENDED TIER ── */}
      <div className="p-6 mb-6" style={{ background: "rgba(153,54,25,0.08)", border: `1px solid ${ORANGE}` }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: ORANGE }}>Recommended Service Tier</p>
        <p className="text-3xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          {scores.recommended_tier === "XRO" && "XRO Essentials"}
          {scores.recommended_tier === "XMX" && "XMX Advanced"}
          {scores.recommended_tier === "XME" && "XME Enterprise"}
        </p>
        <p className="text-xs text-white/40 mt-1">
          Profile: {scores.profile_type} · Industry multiplier: ×{scores.industry_multiplier} · {scores.endpoint_count} endpoints
        </p>
        {scores.upsell_ready && (
          <p className="text-xs mt-2" style={{ color: ORANGE }}>⬆ Your scores suggest the next tier may be more appropriate.</p>
        )}
      </div>

      {/* ── MILESTONE PRICING SLIDER ── */}
      <div className="p-6 mb-6" style={{ background: "rgba(205,202,197,0.03)", border: "1px solid rgba(205,202,197,0.08)" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-6">Monthly Pricing: Milestone Scale-Down</p>

        {/* Base breakdown */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">Base rate ({scores.recommended_tier})</span>
            <span className="text-sm font-bold text-white">${scores.base_rate.toLocaleString()}/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">{scores.endpoint_count} endpoints × ${scores.per_endpoint_rate}/ea</span>
            <span className="text-sm font-bold text-white">${(scores.endpoint_count * scores.per_endpoint_rate).toLocaleString()}/mo</span>
          </div>
          <div className="h-px" style={{ background: "rgba(205,202,197,0.1)" }} />
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">Starting price</span>
            <span className="text-sm text-white/50">${scores.monthly_price.toLocaleString()}/mo</span>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Milestone achievements</span>
            <span className="text-xs font-bold" style={{ color: totalDiscount > 0 ? ORANGE : "rgba(205,202,197,0.3)" }}>
              {totalDiscount > 0 ? `-${totalDiscount}% discount` : "No milestones yet"}
            </span>
          </div>
          <Slider
            value={[milestoneSlider]}
            onValueChange={(v) => setMilestoneSlider(v[0])}
            min={0}
            max={milestones.length}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-white/20">Start</span>
            {milestones.map((m, i) => (
              <span
                key={m.name}
                className="text-[10px] font-medium"
                style={{ color: i < milestoneSlider ? ORANGE : "rgba(205,202,197,0.2)" }}
              >
                {m.name.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Active milestone details */}
        {milestoneSlider > 0 && (
          <div className="space-y-2 mb-4">
            {milestones.slice(0, milestoneSlider).map((m) => (
              <div key={m.name} className="flex items-start gap-2 px-3 py-2" style={{ background: "rgba(153,54,25,0.06)" }}>
                <CheckCircle size={12} style={{ color: ORANGE }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">{m.name} <span className="font-normal text-white/40">(-{m.discountPct}%)</span></p>
                  <p className="text-[10px] text-white/30">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Final price */}
        <div className="h-px mb-4" style={{ background: "rgba(205,202,197,0.1)" }} />
        <div className="flex justify-between items-end">
          <div>
            <span className="text-sm font-bold text-white">After milestones</span>
            {totalDiscount > 0 && (
              <span className="text-xs ml-2 px-2 py-0.5 font-bold" style={{ background: "rgba(153,54,25,0.15)", color: ORANGE }}>
                SAVE ${(scores.monthly_price - milestonePrice).toLocaleString()}/mo
              </span>
            )}
          </div>
          <div className="text-right">
            {totalDiscount > 0 && (
              <span className="text-sm text-white/30 line-through mr-2">${scores.monthly_price.toLocaleString()}</span>
            )}
            <span className="text-3xl font-black text-white">
              ${milestonePrice.toLocaleString()}<span className="text-sm font-normal text-white/40">/mo</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── RECOMMENDED MODULES ── */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: ORANGE }}>
          <Zap size={10} className="inline mr-1" />
          Recommended Modules ({modules.length})
        </p>
        <p className="text-[10px] text-white/25 mb-4">Based on your gap flags, maturity scores, and environment profile</p>

        {criticalModules.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-2">Critical: Address Immediately</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {criticalModules.map((m) => (
                <ModuleCard key={m.name} module={m} />
              ))}
            </div>
          </div>
        )}

        {recommendedModules.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 mb-2">Recommended</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recommendedModules.map((m) => (
                <ModuleCard key={m.name} module={m} />
              ))}
            </div>
          </div>
        )}

        {optionalModules.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2">Optional: Consider at Scale</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {optionalModules.map((m) => (
                <ModuleCard key={m.name} module={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── CF MATURITY SCORES ── */}
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
            { label: "Business Gov", val: scores.cf_business_gov_maturity },
            { label: "DR / BC", val: scores.cf_dr_bc_maturity },
            { label: "Automation", val: scores.cf_automation_maturity },
            { label: "Cost", val: scores.cf_cost_maturity },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-2" style={{ background: "rgba(205,202,197,0.03)" }}>
              <span className="text-xs text-white/40 flex-1">{item.label}</span>
              <span className="text-sm font-bold text-white">{item.val}</span>
              <div className="w-16 h-1 rounded-full" style={{ background: "rgba(205,202,197,0.06)" }}>
                <div className="h-full rounded-full" style={{ background: item.val < 3 ? "#ef4444" : item.val < 6 ? "#eab308" : ORANGE, width: `${(item.val / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GAP FLAGS ── */}
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

      {/* ── À LA CARTE PROFESSIONAL SERVICES ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>
            <Star size={10} className="inline mr-1" />
            Professional Services: À La Carte
          </p>
          <span className="text-[10px] text-white/25">{recommendedServices.length} recommended · {otherServices.length} additional</span>
        </div>
        <p className="text-[10px] text-white/25 mb-4">
          One-time engagements, migrations, and project work — priced separately from your managed service tier
        </p>

        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <div key={category} className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2">
              {CATEGORY_LABELS[category] || category}
            </p>
            <div className="space-y-2">
              {categoryServices.map((service) => (
                <button
                  key={service.name}
                  onClick={() => setExpandedService(expandedService === service.name ? null : service.name)}
                  className="w-full text-left transition-all"
                  style={{
                    background: service.recommended ? "rgba(153,54,25,0.05)" : "rgba(205,202,197,0.02)",
                    border: service.recommended ? `1px solid rgba(153,54,25,0.2)` : "1px solid rgba(205,202,197,0.06)",
                  }}
                >
                  <div className="px-4 py-3 flex items-center gap-3">
                    {service.recommended && <Zap size={10} style={{ color: ORANGE }} className="flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{service.name}</p>
                    </div>
                    <span className="text-xs font-mono text-white/40 flex-shrink-0">{service.priceRange}</span>
                    {expandedService === service.name ? <ChevronUp size={12} className="text-white/30" /> : <ChevronDown size={12} className="text-white/30" />}
                  </div>
                  {expandedService === service.name && (
                    <div className="px-4 pb-3 border-t" style={{ borderColor: "rgba(205,202,197,0.06)" }}>
                      <p className="text-xs text-white/40 mt-2">{service.description}</p>
                      {service.reason && (
                        <p className="text-[10px] mt-2 font-medium" style={{ color: ORANGE }}>→ {service.reason}</p>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {!showAllServices && otherServices.length > 0 && (
          <button
            onClick={() => setShowAllServices(true)}
            className="w-full text-center py-3 text-xs font-bold uppercase tracking-wider transition-colors"
            style={{ color: ORANGE, border: `1px dashed rgba(153,54,25,0.3)` }}
          >
            Show {otherServices.length} More Services
          </button>
        )}
        {showAllServices && (
          <button
            onClick={() => setShowAllServices(false)}
            className="w-full text-center py-2 text-xs text-white/25 hover:text-white/40 transition-colors"
          >
            Show less
          </button>
        )}
      </div>

      {/* ── CTAs ── */}
      <div className="flex flex-wrap gap-4 pt-8" style={{ borderTop: "1px solid rgba(205,202,197,0.06)" }}>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white" style={{ background: ORANGE }}>
          Contact Sales <ArrowRight size={14} />
        </a>
        <a href={`/service-tiers/${scores.recommended_tier.toLowerCase()}-${scores.recommended_tier === "XRO" ? "essentials" : scores.recommended_tier === "XMX" ? "advanced" : "enterprise"}`}
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all"
          style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)" }}
        >
          View {scores.recommended_tier} Tier <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

function ModuleCard({ module }: { module: RecommendedModule }) {
  const Icon = ICON_MAP[module.icon] || Shield;
  const priorityColor = module.priority === "critical" ? "#ef4444" : module.priority === "recommended" ? "#eab308" : "rgba(205,202,197,0.3)";
  return (
    <a
      href={module.href}
      className="flex items-start gap-3 px-4 py-3 transition-all hover:translate-x-1"
      style={{
        background: module.priority === "critical" ? "rgba(220,38,38,0.04)" : "rgba(205,202,197,0.03)",
        border: `1px solid ${module.priority === "critical" ? "rgba(220,38,38,0.15)" : "rgba(205,202,197,0.06)"}`,
      }}
    >
      <Icon size={14} style={{ color: priorityColor }} className="mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">{module.name}</p>
        <p className="text-[10px] text-white/35 line-clamp-2">{module.reason}</p>
      </div>
    </a>
  );
}
