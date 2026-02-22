/** DO NOT TOUCH — v2.0 spec copy (Service_Layer.docx pp.30-31) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function MdmKube() {
  return <ServiceLayerPage
    category="Infrastructure & Operations"
    name="Mobile Device Management"
    headline="Every Endpoint Is a Policy Decision. The Question Is Whether You Are the One Making It."
    narrative={[
      "The corporate perimeter dissolved years ago. Your users are accessing email, files, applications, and internal systems from personal phones, company laptops, tablets, and remote workstations many of them running configurations your organization never approved and cannot observe. When those devices are compromised, the adversary inherits the same access your employee holds. The device becomes a credential.",
      "The compliance dimension compounds the operational one. HIPAA, CMMC, SOC 2, and a broad range of regulatory frameworks carry explicit requirements governing endpoint security, remote access controls, and device configuration standards. Without continuous visibility into every device accessing corporate resources, your organization cannot accurately attest to those controls and accurate attestation is what auditors and regulators are evaluating.",
      "Mobile Device Management delivers the policy enforcement, visibility, and control to govern every device in your environment corporate-issued and BYOD continuously, not periodically.",
    ]}
    capabilitiesHeading="What the Capability Actually Does"
    capabilities={[
      "Unified endpoint management across iOS, Android, Windows, and macOS corporate-issued and BYOD devices managed through a single administrative pane",
      "Automated enrollment with configuration policy deployment at first access no manual provisioning backlog, no enrollment gaps as new devices come online",
      "Continuous compliance monitoring detecting policy violations, unapproved applications, and configuration drift in real time, not at the next periodic review cycle",
      "Remote wipe and selective wipe for lost, stolen, or compromised devices corporate data removed and personal data preserved before the adversary can use the access the device provides",
      "Conditional access enforcement non-compliant devices cannot access corporate resources until the compliance condition is resolved, preventing breach before it occurs rather than responding after",
      "Application management governing which applications are installed, updated, and permitted on managed devices, eliminating shadow IT at the endpoint layer where it creates the most risk",
    ]}
    whatYouReceive={[
      "Every device accessing your corporate environment is enrolled, configured, and continuously monitored against your approved policy baseline. Policy violations surface immediately not at the next quarterly compliance review. A device reported lost or identified as compromised is remotely wiped before the adversary can use the access it provides.",
      "Compliance attestation becomes accurate and defensible. When an auditor requests evidence that endpoint security controls are enforced, the MDM platform produces it automatically. Enrollment records, configuration compliance history, policy enforcement logs, and conditional access activity without manual evidence compilation by your compliance team.",
      "Conditional access is the enforcement mechanism that makes the other controls meaningful. A non-compliant device cannot reach corporate resources until the compliance condition is corrected. That enforcement happens before the breach event, not after the incident response engagement.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous scanning for unenrolled devices, policy violations, and unauthorized access attempts from managed endpoints." },
      { stage: "Identify", desc: "Device identity validation and compliance status enrichment against approved baseline policies." },
      { stage: "Alert", desc: "Immediate notification of non-compliance events, enrollment anomalies, and policy violations." },
      { stage: "Triage", desc: "Determination of whether a violation represents a configuration error or a security incident requiring escalation." },
    ]}
    architectureNotes={[
      "MDM That Is Part of Your Security Architecture: MDM enforcement is integrated with Identity Threat Detection and Response. A compromised device credential is correlated with the device compliance history not investigated in isolation in a separate endpoint management tool while an identity investigation runs independently in another platform.",
      "BYOD is governed without requiring full corporate control of personal devices. Selective management applies corporate policies to corporate data and corporate applications without touching personal content a distinction that matters for employee adoption and for legal defensibility in the event of a device wipe action.",
      "Automated enrollment at first access eliminates the manual provisioning gap that consistently creates MDM coverage failures in growing organizations. New employees, new contractors, and new devices are enrolled and policy-governed from the first moment they access corporate resources.",
      "Evidence collected by the MDM layer satisfies endpoint security requirements for HIPAA, CMMC, NIST 800-171, and CIS Controls without separate attestation programs running parallel to operational processes.",
    ]}
    similar={[
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
      { label: "Identity Threat Detection & Response", href: "/service-layer/itdr" },
    ]}
  />;
}
