import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionEnterprise() {
  return <ServiceDetailPage
    category="By Market Size"
    name="Enterprise"
    tagline="Enterprise-grade customization, dedicated support, and advanced features for large organizations."
    description="Enterprise solutions deliver unlimited customization, dedicated support teams, advanced automation, and enterprise SLAs for large organizations. Custom development, multi-region deployment, advanced integrations, dedicated TAMs, and executive reporting for global operations and complex compliance requirements."
    sections={[
      { title: "Enterprise Capabilities", items: ["Unlimited customization and development", "Multi-region and geo-redundant deployment", "Dedicated Technical Account Manager (TAM)", "Custom SLAs and support tiers"] },
      { title: "Advanced Features", items: ["Advanced automation and AI features", "Executive dashboards and reporting", "White-glove onboarding and training", "Strategic security advisory services", "Merger and acquisition (M&A) support"] },
    ]}
  />;
}
