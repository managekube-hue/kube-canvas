import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionHealthcare() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Healthcare"
    tagline="HIPAA compliance, PHI protection, and medical device security."
    description="Healthcare solutions ensure HIPAA compliance while protecting electronic protected health information (ePHI), securing medical devices, and maintaining operational continuity. Includes automated HIPAA compliance monitoring, breach detection, BAA management, and medical device network segmentation."
    sections={[
      { title: "Healthcare Security", items: ["HIPAA compliance automation", "ePHI protection and monitoring", "Medical device security", "Network segmentation (clinical/corporate)"] },
      { title: "Compliance & Operations", items: ["Breach detection and notification", "BAA (Business Associate Agreement) tracking", "Patient privacy monitoring", "EHR security and integration"] },
    ]}
  />;
}
