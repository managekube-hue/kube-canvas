import { KubePageTemplate } from "@/components/KubePageTemplate";

const ComplianceKube = () => {
  return (
    <KubePageTemplate
      name="Compliance Kube"
      tagline="Framework Gaps Closed"
      phase="ASSESS"
      description="Turn gaps into a compliance program. SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS. Continuous compliance, not annual scrambles."
      narrative="The Compliance Kube takes the gaps identified in Assessment and transforms them into a sustainable compliance program. We create actionable remediation plans with assigned owners, deadlines, and dependencies. Track progress in real-time dashboards, automate evidence collection, and maintain always audit-ready documentation. Move from reactive annual scrambles to proactive continuous compliance. Our approach ensures you're audit-ready at any moment, not just during certification windows."
      blocks={[
        {
          id: "gap-remediation",
          name: "Gap Remediation Planning",
          description: "Detailed plan for closing technical and policy gaps identified in assessment.",
          details: "We create actionable remediation plans with assigned owners, deadlines, and dependencies. Each gap is categorized by effort, cost, and risk reduction impact. Track progress in real-time dashboards with automated notifications and escalation paths. Prioritization based on regulatory urgency, security risk, and business impact.",
          useCases: [
            "Pre-certification preparation",
            "Audit finding remediation",
            "Compliance program maturation",
            "Control implementation tracking",
          ],
          products: ["Vanta", "Drata", "Hyperproof", "AuditBoard", "ServiceNow GRC"],
        },
        {
          id: "evidence-automation",
          name: "Evidence Automation",
          description: "Continuous monitoring for compliance drift with automated evidence collection.",
          details: "Automated collection of evidence from your systems—always audit-ready with current documentation and screenshots. Continuous monitoring detects configuration drift and control failures in real-time. Evidence repository maintains complete audit trails with version control. Integration with cloud platforms, identity providers, and security tools for automated evidence gathering.",
          useCases: [
            "SOC 2 Type II preparation",
            "Continuous compliance monitoring",
            "Reducing audit prep time by 80%",
            "Multi-framework evidence management",
          ],
          products: ["Vanta", "Drata", "Anecdotes", "Secureframe", "Tugboat Logic"],
        },
        {
          id: "policy-development",
          name: "Policy Development",
          description: "Creation of required policy library tailored to your organization and frameworks.",
          details: "Custom policy development aligned with your operations. From information security policies to acceptable use, incident response to data retention—all tailored to your industry, size, and regulatory requirements. Annual review cycles and version control included. Policies mapped to multiple frameworks to maximize efficiency across SOC 2, ISO 27001, HIPAA, and more.",
          useCases: [
            "New compliance program launch",
            "Policy refresh initiatives",
            "Multi-framework policy alignment",
            "Regulatory requirement changes",
          ],
          products: ["Custom templates", "Framework-aligned policies", "Annual review process", "Policy management platform"],
        },
        {
          id: "audit-management",
          name: "Audit Management",
          description: "Liaison with auditors for attestation, managing the entire audit lifecycle.",
          details: "We coordinate with auditors, manage evidence requests, and guide you through the entire audit process from planning to attestation. Pre-audit readiness reviews ensure no surprises. Auditor liaison handles day-to-day communication. Remediation support for any findings with root cause analysis and corrective action plans. Multi-framework audit coordination for organizations with overlapping requirements.",
          useCases: [
            "First-time SOC 2 certification",
            "Annual recertification audits",
            "Multi-framework audits",
            "Remediation of audit findings",
          ],
          products: ["Schellman", "A-LIGN", "Coalfire", "Deloitte", "KPMG"],
        },
        {
          id: "grc-platform",
          name: "GRC Platform Implementation",
          description: "Governance, Risk, and Compliance platform deployment and configuration.",
          details: "Implementation of enterprise GRC platforms for centralized risk management, policy governance, and compliance tracking. Risk register creation and management with technical controls mapping. Integration with security tools for automated risk assessment. Executive dashboards for board-level reporting on compliance posture and risk trends.",
          useCases: [
            "Enterprise GRC consolidation",
            "Risk register implementation",
            "Board-level compliance reporting",
            "Vendor risk management",
          ],
          products: ["IBM OpenPages", "ServiceNow GRC", "Archer", "OneTrust", "LogicGate"],
        },
        {
          id: "security-awareness",
          name: "Security Awareness Training",
          description: "Employee training programs for compliance requirements and security best practices.",
          details: "Comprehensive security awareness training programs meeting compliance requirements for HIPAA, PCI DSS, SOC 2, and other frameworks. Phishing simulations with progressive difficulty. Role-based training for privileged users and developers. Tracking and reporting for audit evidence. Annual training calendars with automated reminders and completion tracking.",
          useCases: [
            "HIPAA workforce training",
            "PCI DSS awareness requirements",
            "Phishing simulation programs",
            "New employee onboarding",
          ],
          products: ["KnowBe4", "Proofpoint", "Cofense", "SANS Security Awareness", "Curricula"],
        },
      ]}
      deliverables={[
        "Compliance Program Charter",
        "Policy & Procedure Library",
        "Automated Evidence Collection",
        "Audit-Ready Documentation",
        "Continuous Compliance Dashboard",
        "Auditor Coordination & Support",
        "Risk Register & Controls Matrix",
        "Security Awareness Program",
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