import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function CioKube() {
  return <KubeDetailPage
    code="CIO KUBE"
    name="Core Infrastructure Orchestration"
    tagline="Unified orchestration for configuration drift, backup & disaster recovery, and infrastructure lifecycle."
    category="Infrastructure & Operations"
    description="The CIO KUBE serves as the central orchestration layer for infrastructure operations. It manages asset lifecycle, automates provisioning and deprovisioning, enforces configuration standards, and coordinates backup and recovery operations across your entire technology estate."
    fullDescription="CIO KUBE is the foundation of the ManageKube platform. It manages the full infrastructure lifecycle from automated provisioning through decommission, enforcing configuration baselines and coordinating with CFDR and BDR Kubes. Multi-cloud infrastructure support ensures complete coverage regardless of where workloads run."
    capabilities={[
      { title: "Infrastructure Lifecycle", items: ["Automated infrastructure provisioning", "Asset lifecycle management", "Multi-cloud infrastructure support", "Network and endpoint coordination"] },
      { title: "Configuration Management", items: ["Configuration management and drift detection", "Patch and update orchestration", "Baseline enforcement", "Change tracking and audit trails"] },
      { title: "Integration Points", items: ["Integration with CFDR and BDR Kubes", "API gateway connectivity", "ITSM ticketing integration", "RMM platform coordination"] },
    ]}
    similar={[
      { label: "NPM", href: "/service-layer/npm" },
      { label: "CFDR", href: "/service-layer/cfdr" },
      { label: "BDR", href: "/service-layer/bdr" },
    ]}
  />;
}
