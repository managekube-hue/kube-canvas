import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionHealthcare() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Healthcare"
    tagline="HIPAA compliance, PHI protection, and medical device security for clinical and administrative environments."
    description="Healthcare organisations face a unique convergence of regulatory pressure, life-safety requirements, and an expanding attack surface driven by connected medical devices and cloud-based EHR platforms. ManageKube Healthcare Solutions deliver continuous HIPAA compliance, ransomware resilience for clinical systems, and network segmentation that isolates medical devices without disrupting patient care workflows."
    sections={[
      { title: "HIPAA Compliance Automation", items: ["Continuous monitoring across all 75 HIPAA Security Rule safeguards", "Automated evidence collection for Security Risk Assessments (SRAs)", "Business Associate Agreement (BAA) tracking and renewal management", "Breach notification workflow automation with OCR reporting timelines", "Privacy Rule alignment for access logging and minimum necessary enforcement"] },
      { title: "Electronic Protected Health Information (ePHI) Security", items: ["Data classification and discovery across EHR, PACS, and ancillary clinical systems", "Encryption enforcement for ePHI at rest and in transit", "Access control monitoring with role-based least-privilege enforcement", "Audit trail generation for all ePHI access across clinical and administrative users", "Integration with DDR module for data loss prevention and exfiltration detection"] },
      { title: "Medical Device Security", items: ["Network segmentation isolating medical devices from corporate and guest networks", "Passive device discovery and classification without disrupting clinical workflows", "Vulnerability assessment for connected devices including infusion pumps, imaging systems, and patient monitors", "Manufacturer Disclosure Statement for Medical Device Security (MDS²) tracking", "Patch and firmware management coordination with biomedical engineering teams"] },
      { title: "Ransomware Resilience for Clinical Systems", items: ["Immutable backup strategy for EHR databases, PACS archives, and clinical applications", "Recovery time objectives (RTO) aligned with patient safety requirements", "Isolated recovery environment for rapid restoration without reinfection", "Ransomware detection through behavioral analysis and file integrity monitoring", "Tabletop exercises and incident response planning specific to clinical scenarios"] },
      { title: "Clinical Network Architecture", items: ["Purdue Model segmentation adapted for healthcare environments", "Separate VLANs for clinical devices, administrative workstations, and guest access", "Wireless security for mobile clinician workflows and bedside devices", "Telehealth platform security for remote patient monitoring and virtual visits", "Integration with existing Cisco, Aruba, and Juniper network infrastructure"] },
    ]}
    similar={[
      { label: "HIPAA Compliance", href: "/compliance/hipaa" },
      { label: "Managed Compliance & GRC", href: "/services/managed-compliance" },
      { label: "DDR Module", href: "/service-layer/ddr" },
    ]}
  />;
}