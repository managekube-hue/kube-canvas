import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function CustomProduct() {
  return <ServiceDetailPage
    category="Custom Configuration"
    name="Custom Configuration"
    tagline="Get what you need, whenever you need it."
    description="Not every organization fits a standard tier. Our custom configuration option lets you select exactly the modules and services you need, building a platform precisely matched to your requirements and budget."
    sections={[
      { title: "Customization Options", items: ["Select individual Service Layer modules", "Mix Managed Services with platform access", "Add-on capabilities à la carte", "Custom integration development"] },
      { title: "Add-On Capabilities", items: ["Supply Chain Detection & Response (SDR)", "External Attack Surface Management (EASM)", "Cyber Risk Quantification", "STRIKE Offensive Security", "Honeypot Deception Technology", "Additional Service Layer Modules", "Purple Team Exercises", "Custom Integrations"] },
    ]}
  />;
}
