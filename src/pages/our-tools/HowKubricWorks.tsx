import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function HowKubricWorks() {
  return <ServiceDetailPage
    category="Platform Overview"
    name="How Kubric Works"
    tagline="The unified orchestration engine for NOC, SOC, and business operations."
    description="Learn how Kubric UIDR unifies NOC, SOC, and business operations into a single orchestrated platform. RMM, PSA, SIEM, and XDR capabilities work together to eliminate silos and provide visibility across your entire technology stack."
    sections={[
      { title: "Architecture", items: ["Unified data ingestion layer", "Real-time correlation engine", "Automated response orchestration", "Single pane of glass dashboard"] },
      { title: "Coverage", items: ["Network operations (NOC)", "Security operations (SOC)", "Business operations integration", "Compliance management"] },
    ]}
  />;
}
