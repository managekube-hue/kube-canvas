import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedCompliance() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed Compliance & GRC"
    tagline="Continuous compliance monitoring and evidence collection across 100+ frameworks."
    description="ManageKube Managed Compliance & GRC delivers continuous monitoring, evidence collection, and audit preparation across all your regulatory obligations. Expert GRC analysts handle the heavy lifting so your team can focus on the business."
    sections={[
      { title: "Continuous Monitoring", items: ["100+ framework coverage", "Automated control monitoring", "Real-time gap identification", "Evidence collection and archival"] },
      { title: "Audit Support", items: ["Audit-ready compliance reports", "Control documentation", "Remediation workflow management", "Auditor coordination support"] },
    ]}
  />;
}
