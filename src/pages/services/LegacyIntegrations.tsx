import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function LegacyIntegrations() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Legacy System Integrations"
    tagline="Bridging aging infrastructure with modern security and operations platforms."
    description="Legacy System Integrations bridge the gap between aging infrastructure and modern security and operations platforms. We reverse-engineer legacy protocols, develop custom adapters for unsupported systems, extract and migrate critical data, and create phased modernization plans so you can extend the life of existing investments while gaining modern visibility and control."
    sections={[
      {
        title: "Legacy Assessment & Discovery",
        items: [
          "Legacy system inventory and dependency mapping",
          "Protocol analysis and reverse engineering (proprietary, serial, mainframe)",
          "Data flow documentation for regulated and business-critical systems",
          "Integration feasibility assessment with risk analysis",
          "End-of-life and end-of-support status evaluation",
        ],
      },
      {
        title: "Adapter & Integration Development",
        items: [
          "Custom adapter development for unsupported protocols and APIs",
          "API gateway implementation for legacy-to-modern translation",
          "Middleware and enterprise service bus (ESB) deployment",
          "Database connector and ORM development for legacy databases",
          "Real-time data synchronization between legacy and modern systems",
        ],
      },
      {
        title: "Data Migration & Extraction",
        items: [
          "Data extraction from legacy databases and file systems",
          "Data cleansing, normalization, and transformation",
          "Migration validation with integrity checks and reconciliation",
          "Parallel-run testing to ensure operational continuity",
          "Historical data archival and compliance-aligned retention",
        ],
      },
      {
        title: "Modernization Planning",
        items: [
          "Phased modernization roadmap with risk-rated milestones",
          "Strangler fig pattern implementation for incremental migration",
          "Risk mitigation and rollback contingency planning",
          "Documentation and knowledge transfer for ongoing maintenance",
          "Operational handoff with monitoring and alerting setup",
        ],
      },
    ]}
    similar={[
      { label: "Custom Automation Development", href: "/services/custom-automation" },
      { label: "IT Infrastructure Audits", href: "/services/infrastructure-audits" },
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
    ]}
  />;
}
