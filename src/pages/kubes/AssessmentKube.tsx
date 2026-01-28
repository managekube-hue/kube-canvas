import { KubePageTemplate } from "@/components/KubePageTemplate";

const AssessmentKube = () => {
  return (
    <KubePageTemplate
      name="Assessment Kube"
      tagline="FREE entry point"
      phase="ASSESS"
      description="The first step in every engagement. We map your current state, document infrastructure, identify security gaps, and build the transformation roadmap. This assessment is FREE and results in a detailed engagement plan."
      blocks={[
        { name: "Infrastructure Inventory", description: "Complete documentation of servers, storage, network, cloud resources, and end-user devices." },
        { name: "Security Assessment", description: "Comprehensive posture review including vulnerability identification, configuration analysis, and risk scoring." },
        { name: "Compliance Mapping", description: "Gap analysis against SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS, and other frameworks relevant to your industry." },
        { name: "Remediation Roadmap", description: "Prioritized action plan with cost estimates, timelines, and resource requirements." },
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
