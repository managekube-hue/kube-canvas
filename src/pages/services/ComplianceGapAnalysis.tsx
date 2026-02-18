import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ComplianceGapAnalysis() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Compliance Gap Analysis"
    tagline="Framework-specific gap assessments identifying control deficiencies and remediation requirements."
    description="Compliance Gap Analysis evaluates your current security posture against regulatory frameworks like CMMC, HIPAA, SOC 2, PCI-DSS, NIST 800-171, and ISO 27001, delivering prioritized remediation plans with effort and cost estimates."
    sections={[
      { title: "Gap Analysis Process", items: ["Framework selection and scoping", "Control evaluation and testing", "Evidence review and documentation", "Gap identification and prioritization"] },
      { title: "Deliverables", items: ["Remediation plan development", "Cost and timeline estimation", "Compliance roadmap creation", "Executive summary and presentation"] },
    ]}
  />;
}
