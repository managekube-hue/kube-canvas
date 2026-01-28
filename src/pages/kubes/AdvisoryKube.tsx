import { KubePageTemplate } from "@/components/KubePageTemplate";

const AdvisoryKube = () => {
  return (
    <KubePageTemplate
      name="Advisory Kube"
      tagline="vCIO & vCISO"
      phase="OPTIMIZE"
      description="Virtual executive roles and expert consulting. Align technology investments with business objectives."
      narrative="The Strategic Advisory & Physical Layer Kube combines high-level technology governance with foundational infrastructure services to create a complete IT lifecycle management program. It aligns business strategy and risk tolerance with technology investments through virtual executive leadership (vCIO/vCISO) and professional services including cloud architecture and physical layer design. Strategic guidance without the full-time executive overhead."
      blocks={[
        {
          id: "vcio",
          name: "Virtual CIO (vCIO) Services",
          description: "IT strategic planning, technology roadmapping, budget alignment, and vendor management.",
          details: "IT Roadmap and Planning delivers development of long-term technology strategies, budget planning, and capital expenditure analysis aligned with business goals. Vendor and Ecosystem Management provides governance over technology partners and coordination of third-party solutions. Change Enablement offers guidance on digital transformation initiatives and organizational change management.",
          useCases: [
            "IT strategy development",
            "Technology roadmapping",
            "Vendor negotiations and management",
            "Digital transformation leadership",
          ],
          products: ["ServiceNow", "Freshservice", "Monday.com", "Jira"],
        },
        {
          id: "vciso",
          name: "Virtual CISO (vCISO) Services",
          description: "Security governance, risk management, compliance strategy, and board-level reporting.",
          details: "Security Program Governance includes ownership of the security roadmap, risk posture assessment, and policy development. Regulatory Alignment provides advising on compliance requirements such as HIPAA, CMMC, and SOC 2 along with defining controls. Steering Committee Leadership delivers reporting to leadership on risk exposure, security program metrics, and crisis management planning.",
          useCases: [
            "Organizations without internal security leadership",
            "Board and investor security reporting",
            "Security program maturation",
            "Incident response planning",
          ],
          products: ["Archer", "OneTrust", "LogicGate", "ServiceNow GRC"],
        },
        {
          id: "physical-layer",
          name: "Physical Layer & Lifecycle Management",
          description: "Foundational services for physical IT assets, cabling, and infrastructure deployment.",
          details: "Hardware Procurement and Lifecycle Management addresses hardware acquisition for data center buildouts, office relocations, complete network overhauls, and major technology refresh initiatives. Structured Cabling and Physical Infrastructure provides installation, testing, and troubleshooting for data centers, offices, and remote sites. Data Center Buildout delivers planning and implementation including power, cooling, and environmental controls.",
          useCases: [
            "Data center refresh",
            "Office buildout and relocation",
            "Structured cabling projects",
            "Technology lifecycle planning",
          ],
          products: ["PowerEdge", "VxRail", "PowerStore", "PowerScale"],
        },
        {
          id: "finops",
          name: "Cloud Financial Management (FinOps)",
          description: "Governance and strategy for cloud spending including optimization and forecasting.",
          details: "FinOps delivers governance for cloud spending across the enterprise, including cost optimization, right-sizing recommendations, multi-year forecasting, budget allocation, and cross-platform financial analysis aligned with capital planning. This strategic approach ensures technology investments support financial goals and meet regulatory requirements for transparency.",
          useCases: [
            "Cloud cost reduction initiatives",
            "Multi-cloud spend optimization",
            "Reserved instance planning",
            "Budget forecasting and allocation",
          ],
          products: ["CloudHealth", "Spot by NetApp", "Azure Cost Management", "AWS Cost Explorer"],
        },
        {
          id: "asset-compliance",
          name: "Asset & Compliance Management",
          description: "Holistic governance of IT and OT assets with continuous risk and compliance monitoring.",
          details: "IT Asset Management (ITAM) includes full inventory of hardware and software assets across environments. License Management optimizes software licensing to ensure compliance and cost efficiency. Enterprise Asset Management uses platforms such as Maximo to optimize operational asset performance. Risk Register and Controls provides creation and management of a comprehensive risk register.",
          useCases: [
            "Asset inventory and tracking",
            "License optimization",
            "Risk register development",
            "Compliance monitoring",
          ],
          products: ["Maximo", "ServiceNow ITAM", "Flexera", "Snow Software"],
        },
      ]}
      deliverables={[
        "Quarterly Business Reviews",
        "Technology Roadmap",
        "Security Risk Register",
        "Budget Planning & Optimization",
        "Board-Ready Presentations",
        "Vendor Assessment Reports",
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
