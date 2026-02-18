import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function KubricUidr() {
  return <ServiceDetailPage
    category="Platform Component"
    name="Kubric UIDR Platform"
    tagline="The core RMM, PSA, and Microsoft 365 management platform."
    description="Explore the foundation of ManageKube's unified platform. Kubric UIDR combines remote monitoring and management, professional services automation, and Microsoft 365 management into a single pane of glass for complete operational control."
    sections={[
      { title: "Core Features", items: ["Unlimited endpoint monitoring and management", "Smart ticketing and workflow automation", "Automated billing and invoicing", "Multi-tenant Microsoft 365 administration"] },
      { title: "Advanced Capabilities", items: ["Patch management and deployment", "Remote access and scripting", "Identity management and security baselines", "Multi-tenant architecture"] },
    ]}
  />;
}
