import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function HelpDesk() {
  return <ServiceDetailPage
    category="Professional Services: BOM Add-On"
    name="Help Desk"
    tagline="White-glove user support with tiered escalation and SLA-backed resolution times."
    description="ManageKube Help Desk delivers Tier 1–3 end-user support for your workforce. From password resets and application troubleshooting to complex escalations, our certified technicians resolve issues fast — so your internal team can focus on strategic initiatives instead of break-fix tickets. Available as a standalone BOM add-on to any Service Tier."
    sections={[
      {
        title: "End-User Support",
        items: [
          "Tier 1–3 issue resolution and escalation",
          "Password resets, account unlocks, and provisioning",
          "Application troubleshooting and guided walkthroughs",
          "Hardware and peripheral support coordination",
          "Remote desktop and screen-share assistance",
        ],
      },
      {
        title: "Service Management",
        items: [
          "Dedicated ticketing portal with SLA tracking",
          "Knowledge base creation and ongoing maintenance",
          "Monthly ticket analytics and trend reporting",
          "Onboarding and offboarding support workflows",
          "Escalation matrix with defined response and resolution SLAs",
        ],
      },
      {
        title: "Communication Channels",
        items: [
          "Phone, email, and live chat support options",
          "24/7 or business-hours coverage models",
          "VIP priority queues for executive and C-suite staff",
          "Multilingual support availability",
          "After-hours emergency escalation hotline",
        ],
      },
      {
        title: "Mac & Apple Ecosystem Support",
        items: [
          "macOS endpoint configuration and troubleshooting",
          "Apple Business Manager and MDM enrollment",
          "iCloud, Apple ID, and Managed Apple ID administration",
          "Mac-specific application support (Final Cut, Logic, Xcode)",
          "FileVault encryption management and recovery key escrow",
          "Cross-platform interoperability (Mac ↔ Windows / Active Directory)",
        ],
      },
      {
        title: "Warranty & Asset Lifecycle Services",
        items: [
          "OEM warranty claim initiation and tracking (Dell, HP, Lenovo, Apple)",
          "Advance hardware replacement coordination",
          "Asset tagging, inventory tracking, and CMDB updates",
          "End-of-life and end-of-support notifications",
          "Lease return preparation and data sanitization",
          "Refurbishment and redeployment coordination",
        ],
      },
      {
        title: "Integration & Automation",
        items: [
          "ITSM platform integration (ServiceNow, ConnectWise, Autotask)",
          "Automated ticket routing and categorization via AI triage",
          "Self-service portal with guided troubleshooting workflows",
          "Proactive issue detection through endpoint monitoring agents",
          "Runbook automation for common resolution paths",
        ],
      },
      {
        title: "Quality Assurance",
        items: [
          "Call recording and quality scoring by supervisors",
          "Customer satisfaction (CSAT) surveys after every interaction",
          "Continuous training and vendor certification programs",
          "Quarterly business review meetings with ticket trend analysis",
          "First-call resolution rate tracking and optimization",
        ],
      },
    ]}
    similar={[
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Managed IT", href: "/services/managed-it" },
      { label: "Smart Hands", href: "/services/smart-hands" },
    ]}
  />;
}
