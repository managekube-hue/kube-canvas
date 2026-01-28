import { KubePageTemplate } from "@/components/KubePageTemplate";

const ComplianceKube = () => {
  return (
    <KubePageTemplate
      name="Compliance Kube"
      tagline="Framework Gaps Closed"
      phase="ASSESS"
      description="Turn gaps into a compliance program. SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS. Continuous compliance, not annual scrambles."
      narrative="The Compliance Kube takes the gaps identified in Assessment and transforms them into a sustainable compliance program. We create actionable remediation plans with assigned owners, deadlines, and dependencies. Track progress in real-time dashboards, automate evidence collection, and maintain always audit-ready documentation. Move from reactive annual scrambles to proactive continuous compliance."
      blocks={[
        {
          id: "gap-remediation",
          name: "Gap Remediation Planning",
          description: "Detailed plan for closing technical and policy gaps identified in assessment.",
          details: "We create actionable remediation plans with assigned owners, deadlines, and dependencies. Each gap is categorized by effort, cost, and risk reduction impact. Track progress in real-time dashboards with automated notifications and escalation paths.",
          useCases: [
            "Pre-certification preparation",
            "Audit finding remediation",
            "Compliance program maturation",
            "Control implementation",
          ],
          products: ["Vanta", "Drata", "Hyperproof", "AuditBoard"],
        },
        {
          id: "evidence-automation",
          name: "Evidence Automation",
          description: "Continuous monitoring for compliance drift with automated evidence collection.",
          details: "Automated collection of evidence from your systems—always audit-ready with current documentation and screenshots. Continuous monitoring detects configuration drift and control failures in real-time. Evidence repository maintains complete audit trails with version control.",
          useCases: [
            "SOC 2 Type II preparation",
            "Continuous compliance monitoring",
            "Reducing audit prep time",
            "Evidence management",
          ],
          products: ["Vanta", "Drata", "Anecdotes", "Secureframe"],
        },
        {
          id: "policy-development",
          name: "Policy Development",
          description: "Creation of required policy library tailored to your organization and frameworks.",
          details: "Custom policy development aligned with your operations. From information security policies to acceptable use, incident response to data retention—all tailored to your industry, size, and regulatory requirements. Annual review cycles and version control included.",
          useCases: [
            "New compliance program launch",
            "Policy refresh initiatives",
            "Multi-framework alignment",
            "Regulatory requirements",
          ],
          products: ["Custom templates", "Framework-aligned policies", "Annual review process"],
        },
        {
          id: "audit-management",
          name: "Audit Management",
          description: "Liaison with auditors for attestation, managing the entire audit lifecycle.",
          details: "We coordinate with auditors, manage evidence requests, and guide you through the entire audit process from planning to attestation. Pre-audit readiness reviews, auditor liaison, and remediation support for any findings. Multi-framework audit coordination.",
          useCases: [
            "First-time certifications",
            "Annual recertification",
            "Multi-framework audits",
            "Auditor coordination",
          ],
          products: ["Schellman", "A-LIGN", "Coalfire", "Deloitte"],
        },
      ]}
      deliverables={[
        "Compliance Program Charter",
        "Policy & Procedure Library",
        "Automated Evidence Collection",
        "Audit-Ready Documentation",
        "Continuous Compliance Dashboard",
        "Auditor Coordination & Support",
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
