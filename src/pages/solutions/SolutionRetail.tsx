import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionRetail() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Retail"
    tagline="PCI-DSS compliance, supply chain risk management, and customer data protection across omnichannel operations."
    description="Retail organisations operate across thousands of endpoints: point-of-sale terminals, mobile devices, e-commerce platforms, and warehouse systems, each one a potential entry point for attackers targeting payment card data and customer information. ManageKube Retail Solutions deliver PCI-DSS compliance automation, supply chain cyber risk management, and unified security monitoring across every channel your business operates."
    sections={[
      { title: "PCI-DSS for Retail Environments", items: ["Point-of-sale (POS) system security monitoring and hardening", "Payment terminal encryption and tokenization verification", "Network segmentation between payment processing and corporate systems", "Wireless security for in-store devices and customer-facing networks", "PCI-DSS v4.0 compliance automation with quarterly ASV scan coordination"] },
      { title: "E-Commerce & Application Security", items: ["Web application firewall (WAF) protection for online storefronts", "Bot detection and mitigation for inventory hoarding and credential stuffing", "API security for mobile commerce and third-party marketplace integrations", "Shopping cart and checkout flow integrity monitoring", "Integration with ADR module for runtime application protection"] },
      { title: "Supply Chain Cyber Risk Management", items: ["Third-party vendor security assessment and continuous monitoring", "Software supply chain integrity verification for POS and inventory systems", "Supplier access controls with least-privilege enforcement", "Supply chain breach impact analysis and containment procedures", "Integration with SDR module for software composition analysis"] },
      { title: "Customer Data Protection", items: ["Customer PII protection across loyalty programmes, CRM, and marketing platforms", "CCPA and GDPR compliance monitoring for customer data handling", "Data minimisation enforcement and retention policy automation", "Breach notification workflow automation meeting state-by-state requirements", "Privacy impact assessments for new data collection and processing activities"] },
      { title: "Multi-Site Security Operations", items: ["Centralised security monitoring across hundreds or thousands of store locations", "Edge device management for POS terminals, kiosks, and digital signage", "Loss prevention system integration with cybersecurity alerting", "Store-level incident response procedures with regional escalation paths", "Seasonal scaling for peak periods including holiday and promotional events"] },
    ]}
    similar={[
      { label: "PCI-DSS Compliance", href: "/compliance/pci-dss" },
      { label: "MDM Module", href: "/service-layer/mdm" },
      { label: "Physical Security Integration", href: "/services/physical-security" },
    ]}
  />;
}