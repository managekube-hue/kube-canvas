/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.36-37) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function AdrKube() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Application Threat Containment"
    headline="Stop the Attack Inside the Application. Before It Reaches Anything Else."
    narrative={[
      "Web application firewalls and API gateways are perimeter controls. They filter what they can see and what they recognize. Zero-day vulnerabilities, business logic abuse, and authenticated attacks operating through valid sessions bypass WAF rules entirely by design, because those attacks present as legitimate traffic from outside the application. By the time perimeter logs surface something anomalous, the adversary may already be operating inside.",
      "Modern application architectures compound the exposure. Microservices, serverless functions, third-party API dependencies, and containerized workloads create attack surfaces that perimeter tools were not built to observe at the runtime level. The blast radius of an application-layer breach extends across every connected service, every downstream API, and every database the compromised application can reach.",
      "Application Threat Containment instruments your applications at the runtime level detecting and containing attacks from inside the application, at the moment of exploitation, before the adversary pivots to the next layer of your architecture.",
    ]}
    capabilitiesHeading="What the Capability Actually Does"
    capabilities={[
      "Runtime Application Self-Protection in-process attack detection and blocking at the application execution layer, embedded inside the application itself where it cannot be bypassed by routing around the perimeter",
      "SQL injection, XSS, and command injection detection and containment in real time malicious payloads blocked at execution, not filtered at the perimeter where they may be encapsulated in legitimate-looking requests",
      "Business logic abuse detection identifying attacks that exploit valid application functionality in unintended ways, detectable only through behavioral analysis against established usage baselines",
      "API abuse detection identifying excessive request volumes, authentication anomalies, and data harvesting patterns indicating automated abuse, credential stuffing, or systematic extraction",
      "Session hijacking detection and forced re-authentication when a session is taken over, it does not remain viable",
      "Container and serverless workload runtime monitoring for behavioral anomalies serverless architecture does not mean unobservable runtime behavior",
    ]}
    whatYouReceive={[
      "Exploitation attempts are blocked at the point of attack inside the application, at the moment the malicious payload executes. The adversary does not reach the database. The injected command does not execute. The hijacked session does not persist. Containment occurs before the attacker achieves their application-layer objective.",
      "Business logic attacks those that present as legitimate user behavior until the behavioral pattern becomes statistically distinguishable are detected through analysis that recognizes abuse from genuine engagement. Legitimate users continue without interruption while the adversary is blocked.",
      "Even when an application-layer vulnerability is reached, runtime containment limits what the adversary can accomplish preventing lateral movement to connected services, downstream databases, and cloud resources that would otherwise be accessible through the compromised application context.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous runtime behavioral scanning for injection patterns, session anomalies, and API abuse." },
      { stage: "Identify", desc: "Attack validation and exploitation confirmation at the runtime execution level." },
      { stage: "Alert", desc: "Immediate notification with attack type, affected endpoint, and payload context." },
      { stage: "Triage", desc: "Analyst review of containment action effectiveness and blast radius assessment." },
      { stage: "Diagnose", desc: "Full attack chain reconstruction across application and infrastructure layers." },
      { stage: "Remediate", desc: "Payload blocking, session invalidation, rate limiting enforcement, and vulnerability remediation guidance." },
    ]}
    architectureNotes={[
      "Application Defense at the Layer Where Attacks Execute: RASP operates inside the application runtime it cannot be bypassed by routing around the perimeter because there is no perimeter to route around. The defense executes in the same process as the code it protects, observing every operation the application performs.",
      "Business logic detection addresses attacks for which no signature exists because they use valid application functionality. Only behavioral analysis calibrated against normal usage baselines can distinguish a legitimate user from an adversary systematically abusing the same functional path.",
      "Container and serverless runtime coverage addresses the modern application architecture that perimeter and endpoint tools were not designed to observe. A serverless function that processes file uploads is an application. Its runtime behavior is monitorable and its anomalies are detectable.",
      "Integration with APM means a performance anomaly and an application-layer attack occurring simultaneously are correlated automatically surfaced as a single incident with both performance and security context available to the analyst from the moment the alert fires.",
    ]}
    similar={[
      { label: "Application Performance Monitoring", href: "/service-layer/apm" },
      { label: "Identity Threat Detection & Response", href: "/service-layer/itdr" },
      { label: "Software Supply Chain Detection & Response", href: "/service-layer/sdr" },
    ]}
  />;
}
