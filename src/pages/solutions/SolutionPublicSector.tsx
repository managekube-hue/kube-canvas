import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionPublicSector() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Public Sector"
    tagline="CJIS, FedRAMP, and government compliance for state, local, and federal agencies."
    description="Government agencies operate under some of the most stringent compliance requirements in any sector, from CJIS Security Policy for law enforcement to FedRAMP for cloud services and NIST 800-53 for federal information systems. ManageKube Public Sector Solutions deliver continuous compliance monitoring, CJI data protection, and audit-ready evidence across every framework your agency must satisfy."
    sections={[
      { title: "CJIS Security Policy Compliance", items: ["All 13 CJIS Security Policy areas continuously monitored and enforced", "Advanced authentication meeting FBI biometric and multi-factor requirements", "Criminal Justice Information (CJI) encryption at rest and in transit", "Personnel security screening and training documentation management", "State CSO coordination support for audit preparation and evidence submission"] },
      { title: "FedRAMP Authorization Support", items: ["FedRAMP Moderate and High baseline control implementation", "System Security Plan (SSP) development and maintenance", "Continuous monitoring program aligned with FedRAMP ConMon requirements", "Plan of Action and Milestones (POA&M) tracking and remediation", "3PAO assessment coordination and evidence package preparation"] },
      { title: "NIST 800-53 Control Implementation", items: ["Full NIST 800-53 Rev 5 control catalog implementation across 20 families", "Continuous Assessment and Authorization (CA) program management", "Automated control testing with evidence generation for 325+ controls", "Risk Management Framework (RMF) alignment for ATO package preparation", "Cross-mapping with CJIS, FedRAMP, and FISMA requirements to eliminate duplication"] },
      { title: "Government Security Operations", items: ["24/7 SOC operations meeting government incident response timelines", "US-CERT incident reporting workflow automation", "Classified and Controlled Unclassified Information (CUI) handling procedures", "Insider threat detection aligned with NITTF and CISA requirements", "Supply chain risk management per NIST 800-161 and Executive Order 14028"] },
      { title: "Audit Readiness & Evidence Management", items: ["Continuous evidence collection across all applicable frameworks simultaneously", "Inspector General (IG) audit preparation and liaison support", "FISMA reporting automation for quarterly and annual submissions", "Multi-framework evidence reuse reducing audit preparation by 60%", "Historical evidence archival meeting federal records retention requirements"] },
    ]}
    similar={[
      { label: "CJIS Compliance", href: "/compliance/cjis" },
      { label: "NIST 800-171", href: "/compliance/nist-800-171" },
      { label: "GRC Module", href: "/service-layer/grc" },
    ]}
  />;
}