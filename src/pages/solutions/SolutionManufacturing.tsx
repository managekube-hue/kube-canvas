import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionManufacturing() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Manufacturing"
    tagline="OT/IT convergence, supply chain security, and intellectual property protection."
    description="Manufacturing solutions address the unique challenges of operational technology (OT) security, supply chain cyber risk, and intellectual property protection. Includes OT/IT network segmentation, ICS monitoring, and compliance frameworks for ITAR, EAR, and manufacturing-specific standards."
    sections={[
      { title: "Manufacturing Capabilities", items: ["OT/IT network segmentation", "ICS and SCADA monitoring", "Supply chain cyber risk management", "Intellectual property protection", "ITAR and EAR compliance", "Industrial network security"] },
      { title: "Operational Technology", items: ["Predictive maintenance integration", "Manufacturing execution system (MES) security", "Historian and SCADA integration", "Plant-floor network visibility"] },
    ]}
    similar={[
      { label: "NPM KUBE", href: "/kubes/npm-kube" },
      { label: "CIO KUBE", href: "/kubes/cio-kube" },
      { label: "IT Infrastructure Audits", href: "/services/infrastructure-audits" },
    ]}
  />;
}
