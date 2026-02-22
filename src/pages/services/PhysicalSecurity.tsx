import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function PhysicalSecurity() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Physical Security Integration"
    tagline="Design, installation, and integration of physical security systems with IT infrastructure and SOC monitoring."
    description="Physical Security Integration designs and deploys video surveillance, access control, intrusion detection, and environmental monitoring systems — fully integrated with your IT infrastructure and SOC for unified physical and cyber security operations. We bridge the gap between facilities and IT."
    sections={[
      {
        title: "Video Surveillance",
        items: [
          "IP camera system design, placement, and installation",
          "Network Video Recorder (NVR) configuration and storage sizing",
          "Video analytics integration (motion detection, facial recognition, license plate)",
          "Remote viewing and mobile access configuration",
          "Retention policy configuration and compliance alignment",
        ],
      },
      {
        title: "Access Control",
        items: [
          "Badge and credential management system deployment",
          "Biometric access control integration (fingerprint, facial, iris)",
          "Electronic lock and door controller installation",
          "Visitor management system setup and kiosk deployment",
          "Integration with Active Directory and HR provisioning workflows",
        ],
      },
      {
        title: "Intrusion & Environmental Monitoring",
        items: [
          "Intrusion detection and alarm panel installation",
          "Glass break, motion, and perimeter sensors",
          "Environmental monitoring (temperature, humidity, water leak, power)",
          "Fire suppression system integration and monitoring",
          "Central monitoring station integration and escalation procedures",
        ],
      },
      {
        title: "SOC Integration & Unified Response",
        items: [
          "Physical event correlation with cyber security incidents",
          "Real-time alerting and video verification workflows",
          "Unified dashboard for physical and cyber security teams",
          "After-hours monitoring and guard dispatch coordination",
          "Compliance documentation for physical security controls (HIPAA, PCI-DSS, CJIS)",
        ],
      },
    ]}
    similar={[
      { label: "Network Infrastructure Buildouts", href: "/services/network-buildouts" },
      { label: "Mobile Device Management", href: "/service-layer/mdm" },
      { label: "Managed SOC", href: "/services/managed-soc" },
    ]}
  />;
}
