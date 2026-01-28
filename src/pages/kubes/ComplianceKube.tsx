/**
 * DO NOT TOUCH - Compliance Kube Page
 * Content from official ManageKube documentation
 * 
 * COMPLIANCE BY DESIGN capabilities:
 * - Smart Question Consolidation: 85-120 questions covering 1,200+ controls
 * - Automated Evidence Collection: Dell CloudIQ, IBM QRadar integration
 * - Remediation Roadmaps: 90-day implementation plans
 * - Continuous Monitoring: Drift detection and automated alerts
 * 
 * Supported Frameworks: NIST, ISO27001, SOC2, PCI, CMMC, HIPAA, FedRAMP, NIST CSF, CIS Controls v8.1, FIPS 140-2/3
 * 
 * Functionality and UI design are COMPLETED - do not modify
 */

import { KubePageTemplate } from "@/components/KubePageTemplate";

const ComplianceKube = () => {
  return (
    <KubePageTemplate
      name="Compliance Kube"
      tagline="ACHIEVE CONTINUOUS COMPLIANCE"
      phase="ASSESS"
      description="The Assessment Kube identifies technical gaps. We then implement controls that deliver continuous compliance across all major industry frameworks."
      narrative="The Compliance Kube transforms identified gaps into a sustainable compliance program. We employ Smart Question Consolidation—85-120 questions covering 1,200+ controls through multi-framework mapping. Automated Evidence Collection integrates directly with Dell CloudIQ, IBM QRadar, and infrastructure platforms. Remediation Roadmaps deliver 90-day implementation plans with resource allocation and timeline visibility. Continuous Monitoring provides ongoing compliance posture tracking with drift detection and automated alerts. Move from reactive annual scrambles to proactive continuous compliance."
      blocks={[
        {
          id: "smart-consolidation",
          name: "Smart Question Consolidation",
          description: "85-120 questions covering 1,200+ controls through multi-framework mapping.",
          details: "Our intelligent assessment engine consolidates overlapping control requirements across frameworks. Instead of answering thousands of redundant questions, you answer 85-120 targeted questions that map to 1,200+ individual controls across NIST, ISO, SOC 2, PCI DSS, CMMC, HIPAA, and more. This reduces assessment time by 80% while ensuring complete coverage.",
          useCases: [
            "Multi-framework compliance programs",
            "Initial compliance baseline",
            "Annual compliance reviews",
            "M&A due diligence",
          ],
          products: ["ManageKube Assessment Engine", "Vanta", "Drata", "Hyperproof"],
        },
        {
          id: "evidence-automation",
          name: "Automated Evidence Collection",
          description: "Direct integration with Dell CloudIQ, IBM QRadar, and infrastructure platforms.",
          details: "Continuous, automated collection of compliance evidence from your infrastructure. Direct integrations with Dell CloudIQ for hardware telemetry, IBM QRadar for security events, cloud platforms for configuration snapshots, and identity providers for access reviews. Evidence is timestamped, version-controlled, and audit-ready 24/7.",
          useCases: [
            "SOC 2 Type II preparation",
            "Continuous compliance monitoring",
            "Reducing audit prep time",
            "Real-time compliance dashboards",
          ],
          products: ["Dell CloudIQ", "IBM QRadar", "Vanta", "Drata", "ServiceNow"],
        },
        {
          id: "remediation-roadmaps",
          name: "Remediation Roadmaps",
          description: "90-day implementation plans with resource allocation and timeline visibility.",
          details: "Transform compliance gaps into actionable project plans. Each finding is prioritized by risk, regulatory urgency, and implementation effort. 90-day roadmaps include specific tasks, resource requirements, dependencies, and milestones. Progress tracking with automated notifications ensures nothing falls through the cracks.",
          useCases: [
            "Pre-certification preparation",
            "Audit finding remediation",
            "Compliance program maturation",
            "Board reporting",
          ],
          products: ["ManageKube Roadmap Builder", "ServiceNow", "Jira", "Monday.com"],
        },
        {
          id: "continuous-monitoring",
          name: "Continuous Monitoring",
          description: "Ongoing compliance posture tracking with drift detection and automated alerts.",
          details: "Real-time monitoring of your compliance posture across all frameworks. Drift detection identifies when configurations, policies, or controls fall out of compliance. Automated alerts notify the right people immediately. Trend analysis helps predict and prevent compliance issues before they occur.",
          useCases: [
            "Continuous compliance programs",
            "Configuration drift prevention",
            "Proactive risk management",
            "Executive compliance reporting",
          ],
          products: ["ManageKube Compliance Monitor", "Vanta", "Drata", "IBM QRadar"],
        },
        {
          id: "policy-development",
          name: "Policy Development",
          description: "Creation of required policy library tailored to your organization and frameworks.",
          details: "Custom policy development aligned with your operations and regulatory requirements. From information security policies to acceptable use, incident response to data retention—all tailored to your industry, size, and compliance needs. Policies mapped to multiple frameworks to maximize efficiency.",
          useCases: [
            "New compliance program launch",
            "Policy refresh initiatives",
            "Multi-framework policy alignment",
            "Regulatory requirement changes",
          ],
          products: ["Custom templates", "Framework-aligned policies", "Annual review process"],
        },
        {
          id: "audit-management",
          name: "Audit Management",
          description: "Liaison with auditors for attestation, managing the entire audit lifecycle.",
          details: "We coordinate with auditors, manage evidence requests, and guide you through the entire audit process from planning to attestation. Pre-audit readiness reviews ensure no surprises. Auditor liaison handles day-to-day communication. Remediation support for any findings.",
          useCases: [
            "First-time SOC 2 certification",
            "Annual recertification audits",
            "Multi-framework audits",
            "Remediation of audit findings",
          ],
          products: ["Schellman", "A-LIGN", "Coalfire", "Deloitte", "KPMG"],
        },
      ]}
      deliverables={[
        "Compliance Program Charter",
        "Multi-Framework Control Mapping",
        "Automated Evidence Repository",
        "90-Day Remediation Roadmap",
        "Policy & Procedure Library",
        "Continuous Compliance Dashboard",
        "Audit-Ready Documentation",
        "Executive Compliance Reports",
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
