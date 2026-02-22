import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedIt() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed IT"
    tagline="Full-spectrum IT operations management — from endpoints to infrastructure — delivered as a service."
    description="Managed IT provides comprehensive day-to-day technology operations for organizations that want enterprise-grade IT without building an internal team. We handle patching, monitoring, vendor management, procurement, and strategic planning so you can focus on your business."
    sections={[
      { title: "Infrastructure Management", items: ["Server and network monitoring and maintenance", "Patch management and vulnerability remediation", "Backup verification and disaster recovery testing", "Cloud infrastructure management (Azure, AWS, GCP)"] },
      { title: "Endpoint Management", items: ["Desktop and laptop lifecycle management", "Mobile device management (MDM) and policy enforcement", "Software deployment and license tracking", "Endpoint detection and response (EDR) oversight"] },
      { title: "Vendor & Procurement", items: ["Technology vendor management and liaison", "Hardware and software procurement", "License renewal tracking and optimization", "Warranty and RMA coordination"] },
      { title: "Strategic IT Planning", items: ["Virtual CIO (vCIO) advisory services", "Technology roadmap and budget planning", "Infrastructure refresh and migration planning", "Business continuity and DR strategy development"] },
      { title: "Reporting & Governance", items: ["Monthly operational performance reports", "Asset inventory and configuration management", "Policy development and enforcement", "Compliance alignment and audit support"] },
    ]}
    similar={[
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Help Desk", href: "/services/help-desk" },
      { label: "Right-Sizing", href: "/services/right-sizing" },
    ]}
  />;
}
