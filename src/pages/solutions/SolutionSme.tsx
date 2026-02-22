import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionSme() {
  return <ServiceDetailPage
    category="By Market Size"
    name="SME — Small/Medium Enterprise"
    tagline="Flexible platform for growing mid-market companies balancing customisation, control, and managed services."
    description="Mid-market organisations have outgrown turnkey SMB solutions but don't yet require — or can't justify — full enterprise deployments. ManageKube SME Solutions provide the flexibility to customise module configurations, choose co-managed or fully managed delivery, and scale coverage as your organisation grows — without re-platforming or renegotiating contracts."
    sections={[
      { title: "Customisable Module Configuration", items: ["12-module XMX Advanced tier with the ability to add enterprise modules à la carte", "Choose between fully managed, co-managed, or hybrid delivery for each module", "Custom detection rules and alert thresholds tuned to your environment", "Integration with existing SIEM, ticketing, and identity platforms", "Quarterly configuration reviews to optimise detection accuracy and reduce noise"] },
      { title: "Co-Managed Delivery Model", items: ["Your team manages day-to-day operations with ManageKube as expert backup", "Shared responsibility matrix defining clear ownership for every function", "Escalation paths from your internal team to our SOC and NOC engineers", "Knowledge transfer and training for your team on every deployed module", "Access to the same tools and dashboards our managed services engineers use"] },
      { title: "Advanced Compliance Programme", items: ["Multi-framework compliance support across NIST, ISO, SOC 2, PCI-DSS, and HIPAA", "Cross-framework control mapping eliminating duplicate evidence collection", "Dedicated compliance analyst for audit preparation and remediation tracking", "Automated evidence collection with continuous compliance monitoring", "Board-ready compliance reports with risk scoring and trend analysis"] },
      { title: "Dedicated Account Management", items: ["Named account manager as your single point of contact", "Quarterly Business Reviews (QBRs) with security posture analysis", "Technology roadmap planning aligned with your business objectives", "Budget forecasting for technology refresh and capability expansion", "Executive briefings on threat landscape relevant to your industry"] },
      { title: "Growth-Ready Architecture", items: ["Seamless upgrade path from XMX to XME Enterprise tier", "Module additions activated in days, not weeks", "Multi-site support with centralised management and per-site policies", "API access for custom integrations and automated workflows", "No re-platforming required as your organisation scales"] },
    ]}
    similar={[
      { label: "SMB Solutions", href: "/solutions/smb" },
      { label: "Enterprise Solutions", href: "/solutions/enterprise" },
      { label: "XMX Advanced Tier", href: "/service-tiers/xmx-advanced" },
    ]}
  />;
}