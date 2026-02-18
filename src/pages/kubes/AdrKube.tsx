import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function AdrKube() {
  return <KubeDetailPage
    code="ADR KUBE"
    name="Application-Level Threat Containment"
    tagline="Web application firewall and API security for OWASP Top 10 protection."
    category="Security Detection & Response"
    description="ADR KUBE provides runtime application self-protection (RASP) and web application firewall (WAF) capabilities. Defend against OWASP Top 10 attacks, API abuse, SQL injection, cross-site scripting, and application-layer threats."
    fullDescription="Applications are prime targets. ADR KUBE wraps every web application and API with intelligent protection that detects and blocks attacks in real time. Virtual patching provides immediate protection for vulnerabilities that can't be patched immediately, integrated with APM KUBE for full performance context."
    capabilities={[
      { title: "Application Defense", items: ["Web Application Firewall (WAF)", "Rules engine", "Gateway API protection", "OWASP Top 10 coverage"] },
      { title: "Attack Prevention", items: ["SQL injection prevention", "Cross-site scripting (XSS) protection", "API rate limiting and authentication", "Bot detection and mitigation"] },
      { title: "Advanced Protection", items: ["Virtual patching capabilities", "RASP (Runtime Application Self-Protection)", "API schema validation", "Zero-day protection"] },
    ]}
    similar={[
      { label: "ITDR KUBE", href: "/kubes/itdr-kube" },
      { label: "APM KUBE", href: "/kubes/apm-kube" },
      { label: "DDR KUBE", href: "/kubes/ddr-kube" },
    ]}
  />;
}
