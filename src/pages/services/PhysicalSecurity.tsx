import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function PhysicalSecurity() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Physical Security Integration"
    tagline="Design, installation, and integration of physical security systems with IT infrastructure and SOC monitoring."
    description="Physical Security Integration designs and deploys video surveillance, access control, intrusion detection, and environmental monitoring systems, integrated with IT infrastructure and SOC monitoring for unified physical and cyber security operations."
    sections={[
      { title: "Physical Security Services", items: ["Site surveys and design", "Video surveillance systems (cameras, NVRs, analytics)", "Access control systems (badges, biometrics, locks)", "Intrusion detection systems", "Environmental monitoring (temperature, humidity, water)"] },
      { title: "Integration", items: ["IT infrastructure integration", "SOC monitoring integration", "Mobile access and remote viewing", "Maintenance and support"] },
    ]}
    similar={[
      { label: "Network Infrastructure Buildouts", href: "/services/network-buildouts" },
      { label: "MDM KUBE", href: "/kubes/mdm-kube" },
      { label: "Managed SOC", href: "/services/managed-soc" },
    ]}
  />;
}
