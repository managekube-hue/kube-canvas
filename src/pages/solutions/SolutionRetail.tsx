import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionRetail() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Retail"
    tagline="PCI-DSS, supply chain risk, and customer data protection for retail operations."
    description="Retail solutions protect customer payment data, manage supply chain cyber risk, and ensure PCI-DSS compliance across in-store, e-commerce, and omnichannel operations."
    sections={[
      { title: "Retail Security", items: ["PCI-DSS compliance automation", "Point-of-sale security monitoring", "E-commerce application protection", "Customer data privacy controls"] },
      { title: "Supply Chain & Operations", items: ["Supply chain cyber risk management", "Third-party vendor assessments", "Loss prevention integration", "Omnichannel security monitoring"] },
    ]}
    similar={[
      { label: "PCI-DSS", href: "/compliance/pci-dss" },
      { label: "MDM KUBE", href: "/kubes/mdm-kube" },
      { label: "Physical Security Integration", href: "/services/physical-security" },
    ]}
  />;
}
