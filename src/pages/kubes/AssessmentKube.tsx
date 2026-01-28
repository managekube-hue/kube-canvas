import { KubePageTemplate } from "@/components/KubePageTemplate";

const AssessmentKube = () => {
  return (
    <KubePageTemplate
      name="Assessment Kube"
      tagline="FREE Entry Point"
      phase="ASSESS"
      description="The first step in every engagement. We map your current state, document infrastructure, identify security gaps, and build the transformation roadmap. This assessment is FREE and results in a detailed engagement plan."
      blocks={[
        {
          id: "infrastructure-inventory",
          name: "Infrastructure Inventory",
          description: "Complete documentation of servers, storage, network, cloud resources, and end-user devices.",
          details: "We deploy discovery tools to inventory your entire environment. Every server, switch, endpoint, and cloud resource documented and categorized.",
          useCases: [
            "M&A due diligence",
            "Cloud migration planning",
            "IT asset management",
          ],
        },
        {
          id: "security-assessment",
          name: "Security Assessment",
          description: "Comprehensive posture review including vulnerability identification, configuration analysis, and risk scoring.",
          details: "Vulnerability scanning, configuration reviews, and risk analysis. We identify gaps and prioritize remediation based on business impact.",
          useCases: [
            "Annual security reviews",
            "Post-incident assessments",
            "Board-level security reporting",
          ],
        },
        {
          id: "compliance-mapping",
          name: "Compliance Mapping",
          description: "Gap analysis against SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS, and other frameworks relevant to your industry.",
          details: "We map your current controls against required frameworks and identify gaps. Detailed remediation plans with effort estimates.",
          useCases: [
            "Pre-audit preparation",
            "New compliance requirements",
            "Multi-framework alignment",
          ],
        },
        {
          id: "remediation-roadmap",
          name: "Remediation Roadmap",
          description: "Prioritized action plan with cost estimates, timelines, and resource requirements.",
          details: "A complete transformation roadmap with phased approach, resource requirements, and ROI projections for each initiative.",
          useCases: [
            "Budget planning",
            "Executive presentations",
            "Vendor selection",
          ],
        },
      ]}
      deliverables={[
        "Infrastructure Discovery Report",
        "Security Posture Assessment",
        "Compliance Gap Analysis",
        "90-Day Transformation Roadmap",
        "Budget Estimate & ROI Projection",
      ]}
      relatedKubes={[
        { name: "Compliance Kube", href: "/kubes/compliance-kube" },
        { name: "MSSP Kube", href: "/kubes/mssp-kube" },
        { name: "Product Kube", href: "/kubes/product-kube" },
      ]}
    />
  );
};

export default AssessmentKube;
