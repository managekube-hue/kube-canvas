/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.12-13) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function CioKube() {
  return <ServiceLayerPage
    category="Infrastructure & Operations"
    name="Core Infrastructure Orchestration"
    headline="You Cannot Defend What You Have Not Mapped."
    narrative={[
      "Infrastructure security begins with a complete, accurate, and continuously updated picture of everything present in your environment. Not the inventory from last quarter. Not the asset list from the most recent audit. What is connected right now how it is configured, and whether it matches your approved baseline.",
      "Most organizations operate with infrastructure visibility gaps they are unaware exist. Shadow IT. Forgotten legacy systems. Cloud resources provisioned outside the change management process. Network segments that drifted out of monitoring scope. These are not edge cases they are standard conditions in environments that have scaled over time without a unified orchestration layer. Every unknown asset is a potential unmonitored entry point.",
      "Core Infrastructure Orchestration eliminates those gaps. Every asset, every connection, every configuration state continuously discovered, continuously monitored, continuously reconciled against the baseline your organization approved.",
    ]}
    capabilities={[
      "Automated asset discovery across on-premises, cloud, and hybrid environments continuously updated, no manual inventories",
      "Configuration baseline definition and continuous enforcement against approved standards",
      "Change detection with immediate alerting when infrastructure deviates from approved state unauthorized changes surface in hours, not at the next audit",
      "Dependency mapping which systems depend on which, and how failure propagates enabling precise rather than blunt response",
      "Lifecycle management visibility: assets approaching end-of-life, unpatched systems, decommission candidates",
      "Inventory reporting for compliance frameworks with asset management documentation requirements, generated automatically",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Proactive discovery of undocumented assets and configuration anomalies." },
      { stage: "Identify", desc: "Signal validation and asset context enrichment." },
      { stage: "Alert", desc: "Prioritized notification of configuration drift and unauthorized changes." },
      { stage: "Triage", desc: "Analyst review and escalation determination." },
    ]}
    architectureNotes={[
      "Note: Every other Service Layer capability performs with greater precision when Core Infrastructure Orchestration is in place. Detection capabilities identify threats faster against accurate asset context. Response actions are more surgical when dependencies are mapped.",
    ]}
    similar={[
      { label: "Network Performance Monitoring", href: "/service-layer/npm" },
      { label: "Configuration Drift Detection & Correction", href: "/service-layer/cfdr" },
      { label: "Backup & Disaster Recovery", href: "/service-layer/bdr" },
    ]}
  />;
}
