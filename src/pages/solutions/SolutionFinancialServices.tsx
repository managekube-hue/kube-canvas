import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionFinancialServices() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Financial Services"
    tagline="PCI-DSS, SOX compliance, real-time fraud detection, and financial data protection."
    description="Financial institutions face relentless regulatory scrutiny, sophisticated fraud schemes, and the highest per-record breach costs of any industry. ManageKube Financial Services Solutions deliver continuous PCI-DSS and SOX compliance, real-time transaction monitoring, and data protection controls that satisfy regulators while enabling the speed your business demands."
    sections={[
      { title: "PCI-DSS Compliance Automation", items: ["All 12 PCI-DSS v4.0 requirement families continuously monitored", "Cardholder Data Environment (CDE) segmentation verification and testing", "Approved Scanning Vendor (ASV) scan coordination and remediation tracking", "Tokenization and encryption enforcement for payment card data at rest and in transit", "Quarterly and annual Self-Assessment Questionnaire (SAQ) preparation and evidence packaging"] },
      { title: "SOX Financial Controls Monitoring", items: ["IT General Controls (ITGC) monitoring for financial reporting systems", "Change management controls with segregation of duties enforcement", "Access review automation for financial applications and databases", "Audit trail integrity monitoring for SOX-relevant systems", "Integration with internal audit workflows and external auditor evidence requests"] },
      { title: "Fraud Detection & Transaction Monitoring", items: ["Real-time transaction pattern analysis using behavioural baselines", "Account takeover detection through credential stuffing and brute force monitoring", "Wire transfer fraud prevention with anomaly-based alerting", "Integration with IBM Safer Payments for AI-driven fraud scoring", "Suspicious Activity Report (SAR) documentation and filing support"] },
      { title: "Financial Data Protection", items: ["Data Loss Prevention (DLP) for account numbers, SSNs, and financial records", "Email and file transfer scanning for sensitive financial data", "Database activity monitoring across core banking and trading platforms", "Insider threat detection for employees with access to financial systems", "Encryption enforcement meeting GLBA Safeguards Rule requirements"] },
      { title: "Regulatory Reporting & Governance", items: ["GLBA Safeguards Rule compliance monitoring and evidence collection", "SEC cybersecurity disclosure readiness for incident reporting requirements", "FINRA supervisory control and inspection preparation", "FFIEC Cybersecurity Assessment Tool (CAT) alignment", "Board-ready risk reports translating technical findings into business impact"] },
    ]}
    similar={[
      { label: "PCI-DSS Compliance", href: "/compliance/pci-dss" },
      { label: "SOC 2 Compliance", href: "/compliance/soc2" },
      { label: "DDR Module", href: "/service-layer/ddr" },
    ]}
  />;
}