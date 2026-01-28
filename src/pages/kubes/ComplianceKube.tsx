import { KubePageTemplate } from "@/components/KubePageTemplate";

const ComplianceKube = () => {
  return (
    <KubePageTemplate
      name="Compliance Kube"
      tagline="Framework Gaps Closed"
      phase="ASSESS"
      description="We take the gaps identified in Assessment and turn them into a compliance program. SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS. Continuous compliance, not annual scrambles."
      blocks={[
        {
          id: "gap-remediation",
          name: "Gap Remediation Planning",
          description: "Detailed plan for closing technical and policy gaps identified in assessment.",
          details: "We create actionable remediation plans with assigned owners, deadlines, and dependencies. Track progress in real-time dashboards.",
          useCases: [
            "Pre-certification preparation",
            "Audit finding remediation",
            "Compliance program maturation",
          ],
        },
        {
          id: "evidence-automation",
          name: "Evidence Automation",
          description: "Continuous monitoring for compliance drift with automated evidence collection.",
          details: "Automated collection of evidence from your systems. Always audit-ready with current documentation and screenshots.",
          useCases: [
            "SOC 2 Type II preparation",
            "Continuous compliance monitoring",
            "Reducing audit prep time",
          ],
        },
        {
          id: "policy-development",
          name: "Policy Development",
          description: "Creation of required policy library tailored to your organization and frameworks.",
          details: "Custom policy development aligned with your operations. From information security policies to acceptable use, tailored to your industry.",
          useCases: [
            "New compliance program launch",
            "Policy refresh initiatives",
            "Multi-framework alignment",
          ],
        },
        {
          id: "audit-management",
          name: "Audit Management",
          description: "Liaison with auditors for attestation, managing the entire audit lifecycle.",
          details: "We coordinate with auditors, manage evidence requests, and guide you through the entire audit process from planning to attestation.",
          useCases: [
            "First-time certifications",
            "Annual recertification",
            "Multi-framework audits",
          ],
        },
      ]}
      deliverables={[
        "Compliance Program Charter",
        "Policy & Procedure Library",
        "Automated Evidence Collection",
        "Audit-Ready Documentation",
        "Continuous Compliance Dashboard",
      ]}
      relatedKubes={[
        { name: "Assessment Kube", href: "/kubes/assessment-kube" },
        { name: "MSSP Kube", href: "/kubes/mssp-kube" },
        { name: "Advisory Kube", href: "/kubes/advisory-kube" },
      ]}
    />
  );
};

export default ComplianceKube;
