import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionFinancialServices() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Financial Services"
    tagline="PCI-DSS, SOX compliance, and financial fraud prevention."
    description="Financial Services solutions address the demanding compliance and security requirements of banks, credit unions, insurance companies, and investment firms. Includes PCI-DSS, SOX, GLBA, and SEC cybersecurity compliance with real-time fraud detection."
    sections={[
      { title: "Financial Compliance", items: ["PCI-DSS cardholder data protection", "SOX financial controls monitoring", "GLBA Safeguards Rule compliance", "SEC cybersecurity disclosure readiness"] },
      { title: "Security Operations", items: ["Real-time fraud detection", "Transaction monitoring", "Third-party vendor risk management", "Customer data protection"] },
    ]}
    similar={[
      { label: "PCI-DSS", href: "/compliance/pci-dss" },
      { label: "SOC 2", href: "/compliance/soc2" },
      { label: "DDR KUBE", href: "/kubes/ddr-kube" },
    ]}
  />;
}
