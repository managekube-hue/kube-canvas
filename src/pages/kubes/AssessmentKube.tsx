import { KubePageTemplate } from "@/components/KubePageTemplate";

const AssessmentKube = () => {
  return (
    <KubePageTemplate
      name="Assessment Kube"
      tagline="FREE Entry Point"
      phase="ASSESS"
      description="The first step in every engagement. Map your current state, identify gaps, and build your transformation roadmap."
      narrative="The Assessment Kube is the gateway to the ManageKube methodology. We deploy discovery tools to inventory your entire environment: every server, switch, endpoint, and cloud resource documented and categorized. Our multi-tenant discovery spans 10 infrastructure layers, mapping to control frameworks and generating your personalized remediation roadmap. This assessment is FREE and results in a detailed engagement plan within 24 hours."
      blocks={[
        {
          id: "infrastructure-inventory",
          name: "Infrastructure Inventory",
          description: "Complete documentation of servers, storage, network, cloud resources, and end-user devices.",
          details: "We deploy discovery tools to inventory your entire environment. Every server, switch, endpoint, and cloud resource documented and categorized across on-premises, cloud, and hybrid environments. This includes hardware specifications, software versions, configurations, and interdependencies.",
          useCases: [
            "M&A due diligence",
            "Cloud migration planning",
            "IT asset management",
            "Data center consolidation",
          ],
          products: ["Lansweeper", "Device42", "ServiceNow Discovery", "Azure Migrate"],
        },
        {
          id: "security-assessment",
          name: "Security Posture Assessment",
          description: "Comprehensive posture review including vulnerability identification and risk scoring.",
          details: "Vulnerability scanning, configuration reviews, and risk analysis across your entire attack surface. We identify gaps and prioritize remediation based on business impact, likelihood of exploitation, and compliance requirements. Includes internal and external scanning, configuration audits, and policy reviews.",
          useCases: [
            "Annual security reviews",
            "Post-incident assessments",
            "Board-level security reporting",
            "Cyber insurance requirements",
          ],
          products: ["Tenable", "Qualys", "CrowdStrike", "Rapid7"],
        },
        {
          id: "compliance-mapping",
          name: "Compliance Gap Analysis",
          description: "Gap analysis against SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS, and other frameworks.",
          details: "We map your current controls against required frameworks and identify gaps. Detailed remediation plans with effort estimates, cost projections, and timelines. Multi-framework alignment identifies overlapping controls to maximize efficiency.",
          useCases: [
            "Pre-audit preparation",
            "New compliance requirements",
            "Multi-framework alignment",
            "Regulatory readiness",
          ],
          products: ["Vanta", "Drata", "OneTrust", "Hyperproof"],
        },
        {
          id: "remediation-roadmap",
          name: "Transformation Roadmap",
          description: "Prioritized action plan with cost estimates, timelines, and resource requirements.",
          details: "A complete transformation roadmap with phased approach, resource requirements, and ROI projections for each initiative. Prioritization based on risk reduction, compliance urgency, and business impact. Includes quick wins, medium-term projects, and long-term strategic initiatives.",
          useCases: [
            "Budget planning",
            "Executive presentations",
            "Vendor selection",
            "Board reporting",
          ],
          products: ["Custom deliverable", "90-day roadmap", "Executive briefing"],
        },
      ]}
      deliverables={[
        "Infrastructure Discovery Report",
        "Security Posture Assessment",
        "Compliance Gap Analysis",
        "90-Day Transformation Roadmap",
        "Budget Estimate & ROI Projection",
        "Executive Summary Presentation",
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
