import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionPublicSector() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Public Sector"
    tagline="CJIS, FedRAMP, and government compliance for state & local government agencies."
    description="Public Sector solutions deliver CJIS, FedRAMP, and NIST 800-53 compliance for state and local government agencies. Includes advanced authentication, CJI data protection, audit logging, and incident response capabilities specific to government compliance requirements."
    sections={[
      { title: "Government Compliance", items: ["CJIS Security Policy compliance", "FedRAMP moderate and high baselines", "NIST 800-53 control implementation", "NIST 800-171 for CUI protection"] },
      { title: "Security Operations", items: ["Advanced authentication (FBI standards)", "CJI data encryption and protection", "Audit and accountability logging", "State CSO coordination support"] },
    ]}
    similar={[
      { label: "CJIS", href: "/compliance/cjis" },
      { label: "NIST 800-171", href: "/compliance/nist-800-171" },
      { label: "GRC KUBE", href: "/kubes/grc-kube" },
    ]}
  />;
}
