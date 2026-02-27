/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.22-23) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function SdrKube() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Software Supply Chain Detection & Response"
    headline="The Most Trusted Code in Your Environment May Present the Greatest Risk."
    narrative={[
      "SolarWinds. Log4Shell. XZ Utils. The most consequential attacks of the past five years exploited software that target organizations trusted completely because it arrived from approved vendors, was installed through authorized processes, and cleared every applicable security control. The attack surface was not in the organization's own code. It was in their dependencies.",
      "Modern software environments are built on layers of third-party libraries, open-source components, containerized workloads, and SaaS integrations. Independent research published in 2025 found that supply chain attacks now account for approximately 30% of all data breaches—a figure that has accelerated substantially from prior years. Most organizations have no systematic visibility into what they are running, where it originated, or whether any component has been compromised.",
      "Software Supply Chain Detection & Response provides continuous visibility into your software dependency tree, real-time monitoring for compromised components, and the detection and response capability to contain a supply chain attack before it achieves its objective.",
    ]}
    capabilities={[
      "Continuous SBOM generation and maintenance across all applications and workloads—your software inventory is always current.",
      "Dependency vulnerability correlation mapping known CVEs to components in your environment in real time.",
      "Integrity monitoring for software packages, build artifacts, and deployment pipeline configurations.",
      "CI/CD pipeline security monitoring identifying unauthorized changes to build processes, the most common supply chain attack vector.",
      "Container image provenance verification ensuring deployed containers match signed, approved images.",
      "Post-deployment behavioral monitoring detecting supply chain compromise via runtime behavioral anomalies.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous SBOM scanning, dependency vulnerability correlation, and pipeline integrity monitoring." },
      { stage: "Identify", desc: "Compromise signal validation and affected component scope assessment." },
      { stage: "Alert", desc: "Priority notification with component identity, vulnerability detail, and deployment scope." },
      { stage: "Triage", desc: "Analyst review of compromise confirmation and blast radius." },
      { stage: "Diagnose", desc: "Full compromise chain reconstruction including build pipeline impact analysis." },
      { stage: "Remediate", desc: "Workload isolation, component removal, pipeline remediation, and clean redeployment." },
      { stage: "Document", desc: "SBOM evidence, compromise timeline, and regulatory breach notification support." },
    ]}
    similar={[
      { label: "Cloud Detection & Response", href: "/service-layer/cdr" },
      { label: "Application Threat Containment", href: "/service-layer/adr" },
      { label: "Vulnerability Detection & Prioritization", href: "/service-layer/vdr" },
    ]}
  />;
}
