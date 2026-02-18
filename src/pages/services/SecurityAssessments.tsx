import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SecurityAssessments() {
  return <ServiceDetailPage
    category="Advisory Services"
    name="Security Assessments"
    tagline="Security posture evaluation with risk prioritization and remediation roadmaps."
    description="Security Assessments provide a holistic evaluation of your security posture across infrastructure, applications, policies, and processes. Assessments identify vulnerabilities, configuration weaknesses, compliance gaps, and policy deficiencies."
    sections={[
      { title: "Assessment Components", items: ["Infrastructure vulnerability assessment", "Configuration review and hardening", "Access control evaluation", "Data protection analysis", "Policy and procedure review", "Security awareness evaluation"] },
      { title: "Deliverables", items: ["Risk-prioritized findings report", "Remediation roadmap", "Executive summary and presentation", "Risk scoring and prioritization"] },
    ]}
  />;
}
