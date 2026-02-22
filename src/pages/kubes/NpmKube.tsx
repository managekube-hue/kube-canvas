import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function NpmKube() {
  return <KubeDetailPage
    code="NPM"
    name="Network Performance Without Blind Spots"
    tagline="Real-time network monitoring with SNMP polling, flow analysis, and AI-powered capacity forecasting."
    category="Infrastructure & Operations"
    description="NPM KUBE delivers network performance monitoring and management. Track bandwidth utilization, identify bottlenecks, detect anomalies, and forecast capacity needs with AI-powered analytics."
    fullDescription="SNMP polling, NetFlow/sFlow analysis, and synthetic monitoring provide complete visibility across all network devices and segments. AI-powered capacity forecasting ensures you're never caught off guard by growth, while automated alerting and remediation reduce mean time to resolution."
    capabilities={[
      { title: "Network Intelligence", items: ["SNMP-based device monitoring", "NetFlow/sFlow traffic analysis", "WAN and LAN performance tracking", "Bandwidth utilization and forecasting", "Network topology mapping"] },
      { title: "Quality & Alerting", items: ["Quality of Service (QoS) monitoring", "Automated alerting and remediation", "Anomaly detection", "Threshold-based notifications"] },
      { title: "Capacity Planning", items: ["AI-powered capacity forecasting", "Historical trend analysis", "Growth planning recommendations", "Multi-site visibility"] },
    ]}
    similar={[
      { label: "CIO", href: "/service-layer/cio" },
      { label: "NDR", href: "/service-layer/ndr" },
      { label: "APM", href: "/service-layer/apm" },
    ]}
  />;
}
