import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedNoc() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed NOC"
    tagline="24/7 network operations center with proactive monitoring, alerting, and incident response."
    description="Managed NOC provides around-the-clock monitoring of network infrastructure, servers, applications, and endpoints. Expert technicians respond to alerts, troubleshoot issues, and perform routine maintenance — delivering continuous uptime while your team sleeps."
    sections={[
      {
        title: "NOC Monitoring",
        items: [
          "24/7/365 infrastructure monitoring across all environments",
          "Proactive alert response, triage, and escalation",
          "Network performance baselining and anomaly detection",
          "Automated remediation for common infrastructure events",
        ],
      },
      {
        title: "Incident Management",
        items: [
          "Incident escalation with defined SLA response times",
          "Root cause analysis and post-incident reporting",
          "Change management and maintenance window coordination",
          "Vendor coordination for ISP, carrier, and hardware issues",
        ],
      },
      {
        title: "Routine Maintenance",
        items: [
          "Scheduled patching and firmware updates",
          "Certificate renewal tracking and deployment",
          "Backup job monitoring and failure remediation",
          "Capacity planning and threshold management",
        ],
      },
      {
        title: "Reporting & Dashboards",
        items: [
          "Monthly performance reports with SLA compliance",
          "Quarterly capacity planning and trend analysis",
          "Real-time executive dashboards",
          "Uptime and availability reporting per device/site",
        ],
      },
    ]}
    similar={[
      { label: "Managed SOC", href: "/services/managed-soc" },
      { label: "Network Performance Monitoring", href: "/service-layer/npm" },
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
    ]}
  />;
}
