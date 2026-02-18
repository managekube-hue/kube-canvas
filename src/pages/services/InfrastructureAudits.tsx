import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function InfrastructureAudits() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="IT Infrastructure Audits"
    tagline="Architecture, performance, security, and operational efficiency review."
    description="IT Infrastructure Audits assess network architecture, server configurations, storage systems, virtualization platforms, and cloud infrastructure for security, performance, and operational efficiency. Identify technical debt, single points of failure, and optimization opportunities."
    sections={[
      { title: "Audit Scope", items: ["Network architecture review", "Server and storage assessment", "Virtualization and container analysis", "Cloud infrastructure evaluation", "Backup and disaster recovery validation"] },
      { title: "Outcomes", items: ["Security and compliance review", "Performance and capacity analysis", "Cost optimization opportunities", "Technology roadmap recommendations", "Executive findings presentation"] },
    ]}
  />;
}
