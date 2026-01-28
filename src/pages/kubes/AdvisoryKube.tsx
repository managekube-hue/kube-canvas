import { KubePageTemplate } from "@/components/KubePageTemplate";

const AdvisoryKube = () => {
  return (
    <KubePageTemplate
      name="Advisory Kube"
      tagline="Strategic Advisory & Physical Layer"
      phase="OPTIMIZE"
      description="High-level technology governance with foundational infrastructure services. Virtual executive leadership (vCIO/vCISO) and professional services including cloud architecture and physical layer design."
      narrative="The Strategic Advisory & Physical Layer Kube combines high-level technology governance with foundational infrastructure services to create a complete IT lifecycle management program. It aligns business strategy and risk tolerance with technology investments through virtual executive leadership (vCIO/vCISO) and professional services including cloud architecture and physical layer design. This Kube is designed for clients undertaking transformational projects, infrastructure redesign, major expansions, or requiring executive-level strategic guidance rather than ongoing operational support."
      blocks={[
        {
          id: "vcio",
          name: "Virtual CIO (vCIO) Services",
          description: "IT strategic planning, technology roadmapping, budget alignment, and vendor management.",
          details: "IT Roadmap and Planning delivers development of long-term technology strategies, budget planning, and capital expenditure analysis aligned with business goals. Vendor and Ecosystem Management provides governance over technology partners, coordination of third-party solutions, and management of IT service providers to ensure cohesion across the technology ecosystem. Change Enablement offers guidance on digital transformation initiatives, new technology adoption, and organizational change management to support successful technology transitions.",
          useCases: [
            "IT roadmap and strategic planning",
            "Budget and CapEx analysis",
            "Vendor and ecosystem management",
            "Digital transformation guidance",
          ],
          products: ["ServiceNow", "Freshservice", "Monday.com", "Jira", "Smartsheet"],
        },
        {
          id: "vciso",
          name: "Virtual CISO (vCISO) Services",
          description: "Security program governance, risk posture assessment, and regulatory alignment.",
          details: "Security Program Governance includes ownership of the security roadmap, risk posture assessment, and policy development. Regulatory Alignment provides advising on compliance requirements such as HIPAA, CMMC, and SOC 2 along with defining controls to meet specific regulations. Steering Committee Leadership delivers reporting to leadership on risk exposure, security program metrics, and crisis management planning.",
          useCases: [
            "Security roadmap ownership",
            "Risk posture assessment",
            "Regulatory compliance advising",
            "Board and leadership reporting",
          ],
          products: ["Archer", "OneTrust", "LogicGate", "ServiceNow GRC"],
        },
        {
          id: "physical-layer",
          name: "Physical Layer & Lifecycle Management Block",
          description: "Foundational services for physical IT assets, structured cabling, and infrastructure deployment for new builds and major expansions.",
          details: "Hardware Procurement and Lifecycle Management for Transformational Projects addresses hardware acquisition and deployment for data center buildouts, office relocations, complete network overhauls, and major technology refresh initiatives that require architectural planning and design consultation. Hardware as a Service (HaaS) provides flexible consumption models such as APEX PCaaS for endpoints and infrastructure in large-scale deployments. Structured Cabling and Physical Infrastructure provides cabling services including physical layer installation, testing, and troubleshooting for data centers, offices, and remote sites. Network Design encompasses physical and logical network topology design for new builds, including Wi-Fi heat maps, switch deployment, and rack and stack services. Data Center Buildout delivers planning and implementation of physical data center infrastructure, including power, cooling, structured cabling, and environmental controls.",
          useCases: [
            "Data center buildouts",
            "Office relocations and expansions",
            "Hardware as a Service (HaaS)",
            "Structured cabling projects",
          ],
          products: ["PowerEdge", "VxRail", "PowerStore", "PowerScale", "APEX"],
        },
        {
          id: "asset-compliance",
          name: "Asset & Compliance Management Block",
          description: "Holistic governance of IT and operational technology assets with continuous risk and compliance monitoring.",
          details: "IT Asset Management (ITAM) includes Asset Inventory and Tracking to maintain a full inventory of hardware and software assets across on-premises, cloud, and remote locations. License Management optimizes software licensing including SaaS to ensure compliance and cost efficiency. Lifecycle Insights provides reporting on asset health, warranty status, and end-of-life planning. Enterprise Asset Management (EAM) and Compliance-as-a-Service (GRC) encompasses Asset Performance Management using platforms such as IBM Maximo to optimize operational asset performance. Risk Register and Controls provides creation and management of a comprehensive risk register. Cloud Financial Management (FinOps) delivers governance and strategy for cloud spending, including cost optimization, right-sizing recommendations, multi-year forecasting, budget allocation, and cross-platform financial analysis.",
          useCases: [
            "IT asset inventory and tracking",
            "License management and optimization",
            "Enterprise asset management (EAM)",
            "FinOps and cloud cost governance",
          ],
          products: ["IBM Maximo", "ServiceNow ITAM", "Flexera", "Snow Software", "CloudHealth", "Spot by NetApp"],
        },
      ]}
      deliverables={[
        "Technology Roadmap",
        "Quarterly Business Reviews",
        "Security Risk Register",
        "Budget Planning & CapEx Analysis",
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
