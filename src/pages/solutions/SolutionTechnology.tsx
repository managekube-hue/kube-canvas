import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionTechnology() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Technology (MSPs/MSSPs)"
    tagline="Multi-tenant platforms and white-label security solutions for technology service providers."
    description="Technology solutions provide MSPs and MSSPs with multi-tenant security and operations platforms, white-label capabilities, and the tools to deliver enterprise-grade managed services to their own clients."
    sections={[
      { title: "MSP/MSSP Capabilities", items: ["Multi-tenant platform architecture", "White-label branding options", "Client portal and reporting", "Automated billing and PSA integration"] },
      { title: "Service Delivery", items: ["NOC/SOC as-a-service foundations", "Tiered service packaging tools", "SLA management and tracking", "Partner support and enablement"] },
    ]}
  />;
}
