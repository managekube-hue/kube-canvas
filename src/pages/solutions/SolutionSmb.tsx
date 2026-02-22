import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionSmb() {
  return <ServiceDetailPage
    category="By Market Size"
    name="SMB — Small Business"
    tagline="Turnkey security and operations for small businesses with limited IT staff and budget."
    description="Small businesses face the same threats as enterprises but lack dedicated security teams, compliance expertise, and the budget for multi-vendor technology stacks. ManageKube SMB Solutions deliver enterprise-grade protection in a turnkey package — pre-configured, managed end-to-end, and priced for businesses with 25 to 100 endpoints. Get protected in days, not months."
    sections={[
      { title: "Pre-Configured Security Stack", items: ["7-module XRO Essentials tier deployed and configured in your environment", "Identity threat detection protecting Active Directory and Microsoft 365 accounts", "Network monitoring with anomaly detection and automated alerting", "Vulnerability scanning with risk-prioritised remediation roadmaps", "Configuration drift detection ensuring systems remain in a known-good state"] },
      { title: "Fully Managed Operations", items: ["24/7 Managed SOC with threat hunting and incident response", "Managed NOC with proactive monitoring and ticket resolution", "Help Desk services for end-user support (Tier 1–3)", "Patch management and software update coordination", "Monthly reporting with executive-ready security posture summaries"] },
      { title: "Compliance Made Simple", items: ["Single-framework compliance support included (NIST CSF, CIS Controls, or SOC 2)", "Automated evidence collection reducing audit preparation by 80%", "Policy templates pre-built for small business operations", "Annual compliance review with gap analysis and remediation guidance", "Upgrade path to multi-framework support as your business grows"] },
      { title: "Predictable Pricing", items: ["Per-user or per-device pricing with no hidden fees", "All modules, monitoring, and managed services included in a single monthly cost", "No CapEx — fully operational expenditure model", "30-day termination clause with complete documentation handoff", "Transparent pricing published on our pricing page — no surprise quotes"] },
      { title: "Rapid Deployment", items: ["Onboarding completed in 5–10 business days from contract signature", "Agent-based deployment with zero downtime for your team", "Dedicated onboarding engineer for initial configuration and baseline tuning", "Employee security awareness training included in onboarding", "Go-live checklist with verification testing before handoff to managed operations"] },
    ]}
    similar={[
      { label: "SME Solutions", href: "/solutions/sme" },
      { label: "Managed Services", href: "/services" },
      { label: "XRO Essentials Tier", href: "/service-tiers/xro-essentials" },
    ]}
  />;
}