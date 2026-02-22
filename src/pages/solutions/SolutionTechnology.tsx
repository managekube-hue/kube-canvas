import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionTechnology() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Technology (MSPs/MSSPs)"
    tagline="Multi-tenant platforms, white-label security, and channel partner enablement for technology service providers."
    description="Technology service providers need platforms that scale across hundreds of client environments without multiplying operational overhead. ManageKube Technology Solutions provide multi-tenant architecture, white-label branding, and the operational tooling MSPs and MSSPs need to deliver enterprise-grade managed services profitably and at scale."
    sections={[
      { title: "Multi-Tenant Platform Architecture", items: ["Tenant isolation with dedicated data segregation and access controls", "Centralised management console with per-tenant configuration and policies", "Role-based access control across technician, manager, and client portal tiers", "Automated tenant provisioning and deprovisioning workflows", "Cross-tenant threat correlation for pattern detection across your client base"] },
      { title: "White-Label & Branding", items: ["Full white-label branding for client-facing portals and reports", "Custom domain support for client access and API endpoints", "Branded email notifications and alert templates", "Co-branded compliance reports and executive summaries", "Partner marketing collateral and sales enablement resources"] },
      { title: "Service Delivery & Operations", items: ["NOC-as-a-Service and SOC-as-a-Service delivery frameworks", "Tiered service packaging with module-based upsell paths", "SLA management, tracking, and automated breach notification", "PSA integration with ConnectWise, Autotask, and HaloPSA", "Automated billing and usage reporting per tenant"] },
      { title: "Channel Partner Enablement", items: ["Partner onboarding programme with technical certification path", "Deal registration and opportunity management through partner portal", "Technical pre-sales support and solution architecture assistance", "Joint go-to-market programmes with Dell, IBM, Pax8, and TD SYNNEX", "Margin protection and competitive pricing for channel partners"] },
      { title: "Scalability & Growth", items: ["Platform scales from 10 to 10,000+ endpoints per tenant without architecture changes", "Automated infrastructure scaling for seasonal and growth-driven demand", "Client acquisition tooling including security assessments and gap analysis", "Portfolio expansion through module addition without re-platforming", "Revenue analytics and client health scoring for retention management"] },
    ]}
    similar={[
      { label: "Managed SOC", href: "/services/managed-soc" },
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "GRC Module", href: "/service-layer/grc" },
    ]}
  />;
}