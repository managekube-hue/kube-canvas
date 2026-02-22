import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedCloud() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed Cloud & FinOps"
    tagline="Cloud cost optimization, performance management, and multi-cloud governance."
    description="Managed Cloud & FinOps optimizes cloud spend, improves performance, and ensures governance across AWS, Azure, and GCP. Expert FinOps practitioners identify waste, right-size resources, and maximize the value of every cloud dollar — turning cloud chaos into predictable, optimized operations."
    sections={[
      {
        title: "Cloud Operations",
        items: [
          "Multi-cloud visibility and governance across AWS, Azure, and GCP",
          "Resource provisioning, scaling, and lifecycle management",
          "Cloud security posture management (CSPM) and hardening",
          "Identity and access management (IAM) policy oversight",
          "Incident response and troubleshooting for cloud workloads",
        ],
      },
      {
        title: "FinOps & Cost Optimization",
        items: [
          "Cost anomaly detection and automated alerting",
          "Reserved instance and savings plan optimization",
          "Right-sizing recommendations based on utilization data",
          "Waste elimination — orphaned resources, idle instances, unused storage",
          "Commitment management and discount program optimization",
        ],
      },
      {
        title: "Migration & Architecture",
        items: [
          "Cloud migration planning and execution (lift-and-shift, re-architect)",
          "Hybrid and multi-cloud architecture design",
          "Containerization and Kubernetes orchestration",
          "Landing zone setup and network architecture",
          "Disaster recovery and business continuity in the cloud",
        ],
      },
      {
        title: "Reporting & Financial Governance",
        items: [
          "Monthly FinOps reports with spend breakdown by team/project/service",
          "Chargeback and showback models for internal cost allocation",
          "Cloud spend forecasting and budget variance analysis",
          "Quarterly business reviews with optimization roadmaps",
          "Executive dashboards for real-time spend visibility",
        ],
      },
    ]}
    similar={[
      { label: "Right-Sizing Engagements", href: "/services/right-sizing" },
      { label: "Cloud Detection & Response", href: "/service-layer/cdr" },
      { label: "Managed NOC", href: "/services/managed-noc" },
    ]}
  />;
}
