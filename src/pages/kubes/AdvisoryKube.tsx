import { KubePageTemplate } from "@/components/KubePageTemplate";

const AdvisoryKube = () => {
  return (
    <KubePageTemplate
      name="Advisory Kube"
      tagline="vCIO & vCISO"
      phase="OPTIMIZE"
      description="Virtual executive roles and expert consulting. Align technology investments with business objectives. Strategic guidance without the full-time executive overhead."
      blocks={[
        {
          id: "vciso",
          name: "Virtual CISO (vCISO)",
          description: "Security governance, risk management, compliance strategy, and board-level reporting.",
          details: "Fractional CISO services tailored to your needs. From security strategy to board presentations, we provide executive-level security leadership.",
          useCases: [
            "Organizations without internal security leadership",
            "Board and investor security reporting",
            "Security program maturation",
          ],
        },
        {
          id: "vcio",
          name: "Virtual CIO (vCIO)",
          description: "IT strategic planning, technology roadmapping, budget alignment, and vendor management.",
          details: "Strategic IT leadership for organizations that need executive guidance without the full-time cost. Technology strategy aligned with business objectives.",
          useCases: [
            "IT strategy development",
            "Technology roadmapping",
            "Vendor negotiations and management",
          ],
        },
        {
          id: "cloud-finops",
          name: "Cloud FinOps",
          description: "Cost optimization, right-sizing, consumption governance, and cloud spend analysis.",
          details: "Optimize your cloud spend with continuous monitoring, right-sizing recommendations, and governance policies that prevent waste.",
          useCases: [
            "Cloud cost reduction initiatives",
            "Multi-cloud spend optimization",
            "Reserved instance planning",
          ],
        },
        {
          id: "ma-due-diligence",
          name: "M&A Due Diligence",
          description: "IT assessment and integration planning for mergers, acquisitions, and divestitures.",
          details: "Comprehensive IT due diligence for M&A transactions. We assess technology stacks, identify risks, and plan integration strategies.",
          useCases: [
            "Acquisition target assessment",
            "Post-merger integration",
            "Technology carve-outs",
          ],
        },
      ]}
      deliverables={[
        "Quarterly Business Reviews",
        "Technology Roadmap",
        "Security Risk Register",
        "Budget Planning & Optimization",
        "Board-Ready Presentations",
      ]}
      relatedKubes={[
        { name: "Innovation Kube", href: "/kubes/innovation-kube" },
        { name: "Compliance Kube", href: "/kubes/compliance-kube" },
        { name: "MSSP Kube", href: "/kubes/mssp-kube" },
      ]}
    />
  );
};

export default AdvisoryKube;
