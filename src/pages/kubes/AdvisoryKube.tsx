import { KubePageTemplate } from "@/components/KubePageTemplate";

const AdvisoryKube = () => {
  return (
    <KubePageTemplate
      name="Advisory Kube"
      tagline="vCIO & vCISO"
      phase="OPTIMIZE"
      description="Virtual executive roles and expert consulting. Align technology investments with business objectives. Strategic guidance without the full-time executive overhead."
      blocks={[
        { name: "Virtual CISO (vCISO)", description: "Security governance, risk management, compliance strategy, and board-level reporting." },
        { name: "Virtual CIO (vCIO)", description: "IT strategic planning, technology roadmapping, budget alignment, and vendor management." },
        { name: "Cloud FinOps", description: "Cost optimization, right-sizing, consumption governance, and cloud spend analysis." },
        { name: "M&A Due Diligence", description: "IT assessment and integration planning for mergers, acquisitions, and divestitures." },
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
