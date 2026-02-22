import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function MdmKube() {
  return <KubeDetailPage
    code="MDM KUBE"
    name="Policy-Driven Device Governance"
    tagline="Complete mobile device management for iOS and Android with DEP/Zero-Touch enrollment and enterprise policies."
    category="Infrastructure & Operations"
    description="MDM KUBE provides enterprise-grade mobile device management with policy enforcement, application distribution, and security controls for iOS and Android devices."
    fullDescription="Support BYOD, COPE, and corporate-owned deployments with Apple DEP, Android Zero-Touch enrollment, and compliance monitoring. Container and app-level security ensures corporate data stays protected even on personally-owned devices."
    capabilities={[
      { title: "Device Enrollment", items: ["iOS and Android device enrollment", "Apple DEP and Android Zero-Touch", "BYOD and COPE support", "Corporate-owned deployment"] },
      { title: "Policy Management", items: ["Application distribution and updates", "Configuration profile deployment", "Compliance policy enforcement", "Remote wipe and lock capabilities"] },
      { title: "Security Controls", items: ["Location tracking and geofencing", "Container and app-level security", "Encryption enforcement", "Jailbreak/root detection"] },
    ]}
    similar={[
      { label: "CIO", href: "/service-layer/cio" },
      { label: "ITDR", href: "/service-layer/itdr" },
      { label: "Physical Security Integration", href: "/services/physical-security" },
    ]}
  />;
}
