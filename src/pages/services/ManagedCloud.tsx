import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedCloud() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed Cloud & FinOps"
    tagline="Cloud cost optimization, performance management, and multi-cloud governance."
    description="Managed Cloud & FinOps optimizes cloud spend, improves performance, and ensures governance across AWS, Azure, and GCP. Expert FinOps practitioners identify waste, right-size resources, and maximize the value of every cloud dollar."
    sections={[
      { title: "Cloud Management", items: ["Multi-cloud visibility and governance", "Cost optimization and waste elimination", "Reserved instance and savings plan optimization", "Cloud migration planning and execution"] },
      { title: "Reporting", items: ["Monthly FinOps reporting", "Chargeback and showback", "Cloud spend forecasting", "Performance and cost trend analysis"] },
    ]}
  />;
}
