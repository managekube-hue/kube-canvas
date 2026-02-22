import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SmartHands() {
  return <ServiceDetailPage
    category="Professional Services — BOM Add-On"
    name="Smart Hands"
    tagline="On-site technical resources for hardware installation, cabling, and physical infrastructure tasks."
    description="Smart Hands delivers certified field technicians for on-site work that remote teams can't handle. From rack-and-stack deployments and cable management to hardware swaps and site surveys, our technicians serve as your physical presence in data centers and branch offices nationwide."
    sections={[
      { title: "Data Center Services", items: ["Rack-and-stack hardware installation", "Cable management and labeling", "Power and cooling verification", "Physical inventory audits and documentation"] },
      { title: "Field Deployments", items: ["Branch office IT setup and configuration", "Network equipment installation and cutover", "Access point surveys and wireless deployment", "Peripheral and endpoint provisioning"] },
      { title: "Break-Fix & Maintenance", items: ["Hardware swap and replacement on-site", "Component-level troubleshooting", "Firmware and BIOS updates requiring physical access", "UPS battery replacement and testing"] },
      { title: "Site Surveys & Assessment", items: ["Pre-deployment site readiness evaluation", "Network closet and MDF/IDF assessments", "Physical security infrastructure review", "Environmental monitoring setup"] },
      { title: "Project Support", items: ["Migration and refresh project labor", "After-hours and weekend deployment windows", "Multi-site coordinated rollouts", "Photo documentation and as-built delivery"] },
    ]}
    similar={[
      { label: "Network Buildouts", href: "/services/network-buildouts" },
      { label: "Physical Security Integration", href: "/services/physical-security" },
      { label: "Managed IT", href: "/services/managed-it" },
    ]}
  />;
}
