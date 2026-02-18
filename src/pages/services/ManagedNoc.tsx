import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedNoc() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed NOC"
    tagline="24/7 network operations center with proactive monitoring, alerting, and incident response."
    description="Managed NOC provides around-the-clock monitoring of network infrastructure, servers, applications, and endpoints. Expert technicians respond to alerts, troubleshoot issues, and perform routine maintenance while you sleep."
    sections={[
      { title: "NOC Services", items: ["24/7/365 infrastructure monitoring", "Proactive alert response and triage", "Incident escalation and resolution", "Routine maintenance and patching"] },
      { title: "Reporting", items: ["Monthly performance reports", "Quarterly capacity planning", "SLA tracking and reporting", "Executive dashboards"] },
    ]}
  />;
}
