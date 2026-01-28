import { KubePageTemplate } from "@/components/KubePageTemplate";

const ComplianceKube = () => {
  return (
    <KubePageTemplate
      name="Compliance Kube"
      tagline="Framework gaps closed"
      phase="ASSESS"
      description="We take the gaps identified in Assessment and turn them into a compliance program. SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS. Continuous compliance, not annual scrambles."
      blocks={[
        { name: "Gap Remediation Planning", description: "Detailed plan for closing technical and policy gaps identified in assessment." },
        { name: "Evidence Automation", description: "Continuous monitoring for compliance drift with automated evidence collection." },
        { name: "Policy Development", description: "Creation of required policy library tailored to your organization and frameworks." },
        { name: "Audit Management", description: "Liaison with auditors for attestation, managing the entire audit lifecycle." },
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
