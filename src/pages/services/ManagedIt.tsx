import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedIt() {
  return <ServiceDetailPage
    category="Professional Services: BOM Add-On"
    name="Managed IT"
    tagline="Full-spectrum IT operations management, from endpoints to infrastructure, delivered as a service."
    description="Managed IT provides comprehensive day-to-day technology operations for organizations that want enterprise-grade IT without building an internal team. We handle patching, monitoring, vendor management, procurement, and strategic planning so you can focus on your business. Available as a standalone BOM add-on to any Service Tier."
    sections={[
      {
        title: "Infrastructure Management",
        items: [
          "Server and network monitoring with 24/7 alerting",
          "Patch management and vulnerability remediation cycles",
          "Backup verification and disaster recovery testing",
          "Cloud infrastructure management (Azure, AWS, GCP)",
          "Hypervisor management (VMware, Hyper-V, Proxmox)",
        ],
      },
      {
        title: "Endpoint Management",
        items: [
          "Desktop and laptop lifecycle management",
          "Mobile device management (MDM) and policy enforcement",
          "Software deployment, updates, and license tracking",
          "Endpoint detection and response (EDR) oversight",
          "OS imaging, provisioning, and refresh cycles",
        ],
      },
      {
        title: "IoT & OT Device Management",
        items: [
          "IoT device inventory, onboarding, and firmware management",
          "Network segmentation and microsegmentation for IoT/OT",
          "SCADA and ICS monitoring integration",
          "Environmental sensor management (temperature, humidity, power)",
          "IoT security policy enforcement and anomaly detection",
        ],
      },
      {
        title: "Print & Peripheral Management",
        items: [
          "Enterprise print fleet management and monitoring",
          "Toner and supply automated replenishment programs",
          "Print server administration and driver management",
          "Secure print release and audit trail configuration",
          "Peripheral lifecycle tracking (scanners, label printers, AV equipment)",
        ],
      },
      {
        title: "Microsoft 365 & Collaboration",
        items: [
          "Microsoft 365 tenant administration and security hardening",
          "Exchange Online, Teams, SharePoint, and OneDrive management",
          "Conditional access policies and MFA enforcement",
          "License optimization and usage analytics",
          "Migration services (on-prem Exchange, G Suite → M365)",
        ],
      },
      {
        title: "Data Center Operations",
        items: [
          "Colocation management and vendor coordination",
          "Rack-and-stack planning and cable management",
          "Power and cooling capacity planning",
          "Physical security access management",
          "Environmental monitoring and alerting (DCIM integration)",
        ],
      },
      {
        title: "Vendor & Procurement",
        items: [
          "Technology vendor management and liaison",
          "Hardware and software procurement at partner pricing",
          "License renewal tracking and optimization",
          "Warranty and RMA coordination across all OEMs",
          "Bill of Materials (BOM) assembly and sourcing through Pax8 and TD SYNNEX",
        ],
      },
      {
        title: "Strategic IT Planning",
        items: [
          "Virtual CIO (vCIO) advisory services",
          "Technology roadmap and annual budget planning",
          "Infrastructure refresh and cloud migration strategy",
          "Business continuity and disaster recovery strategy development",
          "Mergers and acquisitions IT integration planning",
        ],
      },
      {
        title: "Reporting & Governance",
        items: [
          "Monthly operational performance reports",
          "Asset inventory and configuration management (CMDB)",
          "IT policy development and enforcement",
          "Compliance alignment and audit support",
          "Quarterly business reviews with executive stakeholders",
        ],
      },
    ]}
    similar={[
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Help Desk", href: "/services/help-desk" },
      { label: "Right-Sizing", href: "/services/right-sizing" },
    ]}
  />;
}
