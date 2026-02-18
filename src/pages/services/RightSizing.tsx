import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function RightSizing() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Right-Sizing Engagements"
    tagline="Infrastructure and cloud resource optimization to eliminate waste and improve performance per dollar."
    description="Right-Sizing Engagements analyze infrastructure and cloud resource utilization to identify overprovisioned resources and optimization opportunities — often reducing infrastructure spend by 30-50% without compromising capabilities."
    sections={[
      { title: "Right-Sizing Process", items: ["Resource utilization analysis", "Performance baseline establishment", "Workload characterization", "Rightsizing recommendations (compute, storage, network)"] },
      { title: "Optimization", items: ["Reserved instance and savings plan optimization", "Application architecture review", "Migration and implementation planning", "Cost-benefit analysis and ROI projection"] },
    ]}
  />;
}
