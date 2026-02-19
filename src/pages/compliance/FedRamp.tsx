import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function FedRamp() {
  return (
    <ComplianceDetailPage
      framework="FedRAMP"
      fullName="Federal Risk and Authorization Management Program"
      audience="Cloud Service Providers Serving Federal Agencies"
      tagline="FedRAMP authorization management — JAB and Agency ATO paths for cloud service providers."
      description="ManageKube delivers managed FedRAMP compliance for cloud service providers (CSPs) pursuing authorization to sell to federal agencies. We manage the full FedRAMP authorization lifecycle — from readiness assessment through Agency ATO or JAB provisional authorization — and maintain the ongoing continuous monitoring program required for FedRAMP authorization maintenance."
      features={[
        "FedRAMP Tailored, Low, Moderate, and High baseline support",
        "Agency ATO and JAB Provisional Authorization (P-ATO) path support",
        "FedRAMP Readiness Assessment Report (RAR) development",
        "System Security Plan (SSP) development with FedRAMP-specific control implementations",
        "3PAO assessment coordination and support",
        "Security Assessment Report (SAR) review and remediation management",
        "Plan of Action and Milestones (POA&M) management",
        "FedRAMP Package Secure Repository (FedRAMP PKI) management",
        "Continuous monitoring program — monthly, quarterly, and annual deliverables",
        "Vulnerability scanning and reporting — FedRAMP-compliant outputs",
        "Penetration testing coordination and documentation",
        "Incident response — US-CERT reporting compliance",
        "Change management and significant change request (SCR) documentation",
        "Agency sponsor coordination and authorization package submission support",
        "Annual assessment coordination and authorization maintenance",
      ]}
      managedServices={[
        {
          title: "FedRAMP Authorization Program",
          items: [
            "FedRAMP path selection — Tailored, Agency ATO, or JAB P-ATO",
            "Readiness Assessment Report (RAR) development and submission",
            "SSP and authorization package development",
            "3PAO selection guidance and kickoff coordination",
            "Authorization boundary definition and documentation",
          ],
        },
        {
          title: "Continuous Monitoring Program",
          items: [
            "Monthly vulnerability scanning and ConMon reporting",
            "Annual security assessment coordination",
            "POA&M management and monthly status reporting to AO",
            "Significant change notification management",
            "FedRAMP authorization maintenance and renewal",
          ],
        },
      ]}
      similar={[
        { label: "NIST 800-53", href: "/compliance/nist-800-53" },
        { label: "FISMA", href: "/compliance/fisma" },
        { label: "CMMC", href: "/compliance/cmmc" },
      ]}
    />
  );
}
