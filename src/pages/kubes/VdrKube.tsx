/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.18-19) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function VdrKube() {
  return <ServiceLayerPage
    category="Intelligence & Risk"
    name="Vulnerability Detection & Prioritization"
    headline="Your Environment Has Thousands of Vulnerabilities. A Fraction Will Actually Be Exploited. Know Which Ones."
    narrative={[
      "Every vulnerability scan produces the same operational problem: thousands of findings, severity-rated by CVSS, with no actionable guidance on what threat actors are currently exploiting. A Critical CVSS score reflects potential impact if exploited not exploitation probability in your environment this week. These are materially different risk signals that demand materially different responses.",
      "Most vulnerability management programs are perpetually backlogged because they prioritize against CVSS severity rather than real-world exploitability. Medium-severity vulnerabilities with active exploit code sit behind hundreds of Critical findings with no known exploitation path. Teams work diligently on the wrong priority order.",
      "Vulnerability Detection & Prioritization integrates EPSS (Exploit Prediction Scoring System) probability scores with your specific environment context directing remediation effort toward vulnerabilities genuinely likely to be exploited in your environment, in your asset class, against your industry, this week.",
    ]}
    capabilities={[
      "Continuous vulnerability scanning across endpoints, servers, cloud workloads, and network infrastructure",
      "EPSS probability scoring ranking vulnerabilities by real-world exploitation likelihood, not potential impact alone",
      "Environment context enrichment weighting priority based on asset criticality, internet exposure, and compensating controls in place",
      "Exploit intelligence correlation mapping live exploit activity to vulnerabilities present in your environment within hours of new exploit kit disclosure",
      "Patch status tracking with remediation workflow integration and SLA tracking",
      "ThreatAI free CVE/EPSS lookup tool for on-demand vulnerability intelligence at /resources/threatai-epss-lookup",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous scanning across all assets for known vulnerabilities and newly disclosed CVEs." },
      { stage: "Identify", desc: "EPSS scoring, environment context enrichment, and exploit intelligence correlation." },
      { stage: "Alert", desc: "Prioritized notification of high-probability exploitation-risk vulnerabilities with remediation guidance." },
      { stage: "Triage", desc: "Analyst review of remediation priority and compensating control assessment." },
      { stage: "Diagnose", desc: "Root cause analysis for vulnerability introduction misconfiguration, absent patch process, or unmanaged asset." },
    ]}
    similar={[
      { label: "STRIKE Strategic Intelligence", href: "/service-layer/strike" },
      { label: "External Attack Surface Management", href: "/service-layer/easm" },
      { label: "Configuration Drift Detection & Correction", href: "/service-layer/cfdr" },
    ]}
  />;
}
