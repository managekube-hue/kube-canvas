/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.32-33) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function ApmKube() {
  return <ServiceLayerPage
    category="Infrastructure & Operations"
    name="Application Performance Monitoring"
    headline="Your Applications Are Communicating That Something Is Wrong. Are You Listening?"
    narrative={[
      "Application failures and security incidents share behavioral signatures. Unusual response times. Unexpected query patterns. Resource utilization that does not correlate with load. Error rates that spike before anything is formally reported. These signals exist in your application layer right now. Without continuous behavioral monitoring, they surface as user complaints rather than as the early warnings they represent.",
      "The security dimension is harder to observe. Application-layer attacks SQL injection, business logic abuse, API exploitation, session hijacking do not announce themselves in network traffic the way a port scan does. They appear as legitimate application behavior, differentiated only by pattern, timing, and context that passive log review and perimeter controls miss entirely.",
      "Application Performance Monitoring instruments your applications at the behavioral level transforming performance signals into operational intelligence and security detection simultaneously. Two disciplines served by one continuous monitoring layer rather than two separate tools generating two separate alert queues with no shared context.",
    ]}
    capabilitiesHeading="What the Capability Actually Does"
    capabilities={[
      "Transaction tracing across distributed application architectures microservices, APIs, and monolithic applications providing the complete request path, not isolated fragments",
      "Anomaly detection based on behavioral baselines identifying deviations from established application operation patterns without manual threshold configuration",
      "Error rate monitoring with root cause correlation across application, infrastructure, and network layers not just what failed, but the chain of conditions that produced the failure",
      "Database query analysis detecting unusual query patterns that indicate injection attempts, unauthorized data access, or data exfiltration staging",
      "API call monitoring for volume anomalies, pattern deviations, and authentication irregularities API abuse surfaces as a signal, not merely as rate limit exhaustion",
      "Real user monitoring for frontend performance visibility you see what your users experience, not only what your infrastructure metrics report",
    ]}
    whatYouReceive={[
      "Performance degradation is detected before it affects users. Security-relevant behavioral anomalies are detected before they complete their objective. Your application layer becomes an active detection surface rather than a visibility gap that security tools look past on their way to the network and endpoint layers.",
      "When an unusual query pattern indicates a SQL injection attempt, APM surfaces it as a security signal with application context not as an error log entry awaiting review during the next operational cycle. The integration with Application Threat Containment means the response path is defined before the incident escalates.",
      "Development and operations teams gain visibility into performance bottlenecks across the full application stack enabling optimization that reduces both operational cost and attack surface simultaneously. Poorly performing application components frequently correlate with exploitable conditions: misconfigured error handling, excessive database permissions, and inadequate input validation that affect both reliability and security posture.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous behavioral baseline scanning for anomalous transaction patterns across all monitored applications." },
      { stage: "Identify", desc: "Signal validation against behavioral baselines and infrastructure context correlation." },
      { stage: "Alert", desc: "Priority notification of performance anomalies and security-relevant behavioral deviations." },
      { stage: "Triage", desc: "Analyst review and security versus operational classification." },
      { stage: "Diagnose", desc: "Root cause analysis spanning the application, infrastructure, and network layers simultaneously." },
    ]}
    architectureNotes={[
      "Application Monitoring as a Security Capability: APM is positioned as a security detection discipline within the Service Layer behavioral anomalies feed into the security detection workflow in addition to the performance dashboard, ensuring application-layer attack signals reach the incident response process.",
      "Integration with Application Threat Containment means application-layer detection and response are coordinated from a single operational workflow not separated across teams with no shared context and no coordinated response process.",
      "Database query analysis detects injection attempts that perimeter and network-layer tools cannot observe the malicious payload is encapsulated in what appears to be legitimate application traffic from every vantage point outside the application.",
      "Distributed tracing across microservice architectures closes the attribution gap in ITDR and NDR investigations establishing which application user triggered which infrastructure event, substantially reducing investigation timelines.",
    ]}
    similar={[
      { label: "Application Threat Containment", href: "/service-layer/adr" },
      { label: "Network Performance Monitoring", href: "/service-layer/npm" },
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
    ]}
  />;
}
