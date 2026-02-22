/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.28-29) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function NpmKube() {
  return <ServiceLayerPage
    category="Infrastructure & Operations"
    name="Network Performance Monitoring"
    headline="By the Time Your Users Report It, the Problem Has Already Been Active for Hours."
    narrative={[
      "Network degradation rarely announces itself with a clean failure. It accumulates. Latency creeps up on a critical path. Packet loss appears intermittently on a segment that was not being watched. A routing change creates a bottleneck that manifests only under peak load conditions. By the time your users report the problem, your team is already behind investigating without the continuous data that should have been collecting from the start.",
      "The visibility problem is compounded in hybrid and multi-site environments. Traffic patterns across cloud connectivity, SD-WAN links, and distributed branch locations are too complex to monitor manually. When performance degradation overlaps with a security event as it frequently does two separate investigations run in separate tools, managed by separate teams, producing conclusions that are actually about the same incident.",
      "Network Performance Monitoring delivers the continuous, cross-environment visibility your NOC requires to detect, diagnose, and resolve performance issues before they become user-reported outages and to recognize when a performance anomaly is the surface indication of a security event.",
    ]}
    capabilitiesHeading="What the Capability Actually Does"
    capabilities={[
      "Real-time traffic analysis across on-premises, cloud, SD-WAN, and hybrid network paths not sampled, not periodic, continuous",
      "Latency and packet loss monitoring with threshold-based alerting and trend visualization you see the trajectory before it becomes an outage",
      "Bandwidth utilization tracking with capacity planning visibility not only what is happening now but what is trending toward a constraint",
      "Routing anomaly detection identifying path changes, BGP deviations, and traffic redirection events that signal either misconfiguration or adversarial activity",
      "Application-layer traffic classification understanding precisely which applications are consuming which network resources, eliminating guesswork about utilization drivers",
      "Baseline learning that distinguishes genuine anomalies from normal traffic variance patterns without manual threshold configuration thresholds calibrate continuously against observed behavior",
    ]}
    whatYouReceive={[
      "Network events are detected in real time and correlated against continuous baseline performance data. Your NOC has the context required to determine within minutes whether a latency spike is a hardware failure, a capacity constraint, or the precursor to a security event. The investigation starts from a position of information rather than assumption.",
      "Mean time to detect and mean time to resolve for network incidents decrease materially when continuous monitoring replaces reactive investigation. Issues that previously required hours of manual diagnosis are identified, attributed, and escalated in minutes before users submit tickets and before business operations are measurably affected.",
      "The integration between Network Performance Monitoring and Network Threat Detection and Response means a routing anomaly that proves to be adversarial traffic redirection surfaces as a single correlated incident with full context from both the performance and security disciplines not as two separate alerts in two separate tools requiring a meeting to connect.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous traffic scanning for performance anomalies and routing irregularities across all monitored paths." },
      { stage: "Identify", desc: "Baseline comparison and contextual enrichment with asset and network topology data." },
      { stage: "Alert", desc: "Threshold-triggered and anomaly-detected notifications with performance trend context." },
      { stage: "Triage", desc: "NOC analyst review and escalation to Network Threat Detection and Response when security correlation is identified." },
    ]}
    architectureNotes={[
      "Performance Monitoring Connected to Security Operations: Network performance and network security are not separate disciplines when they share the same traffic. ManageKube correlates performance data with security telemetry automatically one platform, one investigation workflow, one unified picture of what the network is doing and why.",
      "Baseline learning reduces false positive volume over time. Your NOC invests analytical effort in genuine anomalies rather than manually recalibrating thresholds that drift out of alignment as traffic patterns evolve.",
      "SD-WAN and multi-site visibility is built in as a standard capability not added through a separate integration requiring separate procurement, configuration, and maintenance. ManageKube covers distributed and hybrid environments with the same monitoring depth as centralized on-premises infrastructure.",
      "Routing anomaly detection identifies BGP hijacking and adversarial traffic redirection events that pure performance monitoring tools classify as degradation events rather than security incidents closing the gap where operational and security visibility diverge and incidents go uninvestigated.",
      "Capacity trend data feeds into right-sizing and infrastructure planning engagements converting monitoring telemetry into actionable infrastructure investment recommendations backed by actual utilization evidence.",
    ]}
    similar={[
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
      { label: "Network Threat Detection & Response", href: "/service-layer/ndr" },
      { label: "Application Performance Monitoring", href: "/service-layer/apm" },
    ]}
  />;
}
