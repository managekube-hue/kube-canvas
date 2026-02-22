import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionEnterprise() {
  return <ServiceDetailPage
    category="By Market Size"
    name="Enterprise"
    tagline="Enterprise-grade customisation, dedicated support, and advanced features for large organisations."
    description="Enterprise organisations require unlimited customisation, dedicated support teams, multi-region deployment, and the ability to integrate ManageKube into complex technology ecosystems spanning thousands of endpoints, multiple cloud providers, and global compliance obligations. ManageKube Enterprise Solutions deliver the full XME platform with premium capabilities, dedicated engineering resources, and custom SLAs designed for organisations where security is a board-level priority."
    sections={[
      { title: "Full Platform Deployment", items: ["All 18 modules deployed across infrastructure, security, intelligence, and governance", "STRIKE offensive security intelligence and adversary tracking", "EASM continuous external attack surface monitoring", "Honeypot deception technology for attacker profiling and early warning", "Supply chain detection and response (SDR) for software composition analysis"] },
      { title: "Dedicated Support & Engineering", items: ["Dedicated Technical Account Manager (TAM) embedded with your team", "Named SOC analysts familiar with your environment and escalation procedures", "Custom runbook development aligned with your incident response plan", "Priority incident response with guaranteed escalation timelines", "After-hours engineering support for change windows and maintenance"] },
      { title: "Multi-Region & Global Operations", items: ["Multi-region deployment with geo-redundant data processing", "Follow-the-sun SOC coverage across time zones", "Data residency controls meeting regional regulatory requirements", "Global asset inventory with per-region compliance reporting", "Unified dashboards with drill-down from global overview to individual site"] },
      { title: "Advanced Automation & Intelligence", items: ["KubricAI orchestration with custom ML models trained on your environment", "SOAR playbook development for automated incident response workflows", "Threat intelligence feeds curated for your industry and threat profile", "Predictive analytics for infrastructure capacity and security posture forecasting", "Custom API integrations with ServiceNow, Splunk, and enterprise platforms"] },
      { title: "Executive Governance & Reporting", items: ["Board-ready security posture reports with business risk quantification", "Merger and acquisition (M&A) cyber due diligence support", "Regulatory change tracking with impact analysis for your compliance portfolio", "Annual strategic security review with roadmap recommendations", "Cyber insurance support including policy review and evidence packaging"] },
    ]}
    similar={[
      { label: "XME Enterprise Tier", href: "/service-tiers/xme-enterprise" },
      { label: "Managed SOC", href: "/services/managed-soc" },
      { label: "Security Assessments", href: "/services/security-assessments" },
    ]}
  />;
}