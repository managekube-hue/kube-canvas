import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function HelpDesk() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Help Desk"
    tagline="White-glove user support with tiered escalation and SLA-backed resolution times."
    description="ManageKube Help Desk delivers Tier 1–3 end-user support for your workforce. From password resets and application troubleshooting to complex escalations, our certified technicians resolve issues fast — so your internal team can focus on strategic initiatives instead of break-fix tickets."
    sections={[
      { title: "End-User Support", items: ["Tier 1–3 issue resolution and escalation", "Password resets and account provisioning", "Application troubleshooting and guidance", "Hardware and peripheral support coordination"] },
      { title: "Service Management", items: ["Dedicated ticketing portal with SLA tracking", "Knowledge base creation and maintenance", "Monthly ticket analytics and trend reporting", "Onboarding and offboarding support workflows"] },
      { title: "Communication Channels", items: ["Phone, email, and chat support options", "24/7 or business-hours coverage models", "VIP priority queues for executive staff", "Multilingual support availability"] },
      { title: "Integration & Automation", items: ["ITSM platform integration (ServiceNow, ConnectWise)", "Automated ticket routing and categorization", "Self-service portal with guided troubleshooting", "Proactive issue detection through endpoint monitoring"] },
      { title: "Quality Assurance", items: ["Call recording and quality scoring", "Customer satisfaction (CSAT) surveys", "Continuous training and certification programs", "Quarterly business review meetings"] },
    ]}
    similar={[
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Managed IT", href: "/services/managed-it" },
      { label: "Smart Hands", href: "/services/smart-hands" },
    ]}
  />;
}
