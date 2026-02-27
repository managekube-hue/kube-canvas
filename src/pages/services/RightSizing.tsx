import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function RightSizing() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Right-Sizing Engagements"
    tagline="Infrastructure and cloud resource optimization to eliminate waste and improve performance per dollar."
    description="Right-Sizing Engagements analyze infrastructure and cloud resource utilization to identify overprovisioned resources and optimization opportunities. Our engineers baseline performance, characterize workloads, and deliver data-driven recommendations, often reducing infrastructure spend by 30 to 50% without compromising capabilities."
    sections={[
      {
        title: "Discovery & Baselining",
        items: [
          "Resource utilization data collection across compute, storage, and network",
          "Performance baseline establishment with peak and average metrics",
          "Workload characterization and demand pattern analysis",
          "Application dependency mapping for impact assessment",
          "License audit and software entitlement review",
        ],
      },
      {
        title: "Cloud Optimization",
        items: [
          "Reserved instance and savings plan optimization analysis",
          "Idle resource identification and cleanup recommendations",
          "Auto-scaling policy tuning and implementation",
          "Storage tier optimization (hot, warm, cold, archive)",
          "Multi-cloud cost comparison and workload placement strategy",
        ],
      },
      {
        title: "Infrastructure Optimization",
        items: [
          "Server consolidation and virtualization density improvements",
          "Network bandwidth and throughput optimization",
          "Storage deduplication and compression opportunity analysis",
          "Power and cooling efficiency improvements (PUE optimization)",
          "Hardware lifecycle assessment and refresh prioritization",
        ],
      },
      {
        title: "Reporting & Implementation",
        items: [
          "Detailed savings report with projected cost reduction by category",
          "Implementation roadmap with risk-rated phasing",
          "Quick-win recommendations for immediate savings",
          "Ongoing monitoring recommendations to prevent re-sprawl",
          "Quarterly optimization review cadence (optional retainer)",
        ],
      },
    ]}
    similar={[
      { label: "Managed Cloud & FinOps", href: "/services/managed-cloud" },
      { label: "IT Infrastructure Audits", href: "/services/infrastructure-audits" },
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
    ]}
  />;
}
