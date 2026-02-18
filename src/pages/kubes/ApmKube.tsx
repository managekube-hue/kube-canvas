import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function ApmKube() {
  return <KubeDetailPage
    code="APM KUBE"
    name="Application Performance with Operational Context"
    tagline="Full-stack observability with distributed tracing, code-level profiling, and business transaction monitoring."
    category="Infrastructure & Operations"
    description="APM KUBE delivers deep application performance insights from infrastructure to code. Monitor application health, trace transactions across distributed systems, and identify performance bottlenecks before they impact users."
    fullDescription="APM KUBE provides end-to-end visibility from the browser to the database. Distributed tracing follows requests across microservices, while code-level profiling identifies exactly which functions consume resources. Business transaction correlation connects performance data to revenue impact."
    capabilities={[
      { title: "Application Insights", items: ["Distributed transaction tracing", "Code-level performance profiling", "Error and exception tracking", "Database query analysis"] },
      { title: "Monitoring", items: ["Service dependency mapping", "Real user monitoring (RUM)", "Synthetic transaction monitoring", "Business transaction correlation"] },
      { title: "Observability", items: ["Log aggregation and analysis", "Metric correlation", "Alert noise reduction", "SLO/SLA tracking"] },
    ]}
    similar={[
      { label: "NPM KUBE", href: "/kubes/npm-kube" },
      { label: "ADR KUBE", href: "/kubes/adr-kube" },
      { label: "CIO KUBE", href: "/kubes/cio-kube" },
    ]}
  />;
}
