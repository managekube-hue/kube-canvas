import { KubeDetailPage } from "@/components/KubeDetailPage";
export default function ItdrKube() {
  return <KubeDetailPage
    code="ITDR"
    name="Identity Threats Stopped Before Escalation"
    tagline="Active Directory and identity provider monitoring with attack path analysis and automated response."
    category="Security Detection & Response"
    description="ITDR KUBE protects against identity-based attacks by continuously monitoring Active Directory, Azure AD, and identity providers. Leveraging attack path analysis, it identifies potential privilege escalation routes and automatically responds to suspicious identity activity."
    fullDescription="Identity is the new perimeter. ITDR KUBE monitors every authentication event, privilege change, and lateral movement attempt across your identity infrastructure. Golden ticket attacks, pass-the-hash, and Kerberoasting are detected in real time with automated account lockout and remediation."
    capabilities={[
      { title: "Identity Protection", items: ["Active Directory monitoring", "Azure AD and Entra ID coverage", "Attack path mapping", "Privilege escalation detection"] },
      { title: "Threat Detection", items: ["Credential stuffing and spraying alerts", "Golden ticket and pass-the-hash detection", "Kerberos anomaly detection", "Lateral movement tracking"] },
      { title: "Automated Response", items: ["Automated account lockout", "Session termination", "Remediation workflows", "Incident correlation"] },
    ]}
    similar={[
      { label: "NDR", href: "/service-layer/ndr" },
      { label: "CDR", href: "/service-layer/cdr" },
      { label: "ADR", href: "/service-layer/adr" },
    ]}
  />;
}
