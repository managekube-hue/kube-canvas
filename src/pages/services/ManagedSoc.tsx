import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function ManagedSoc() {
  return <ServiceDetailPage
    category="Managed Services"
    name="Managed SOC"
    tagline="24/7 security operations center with threat hunting, incident response, and compliance reporting."
    description="24/7 security operations center powered by Kubric XDR and staffed by expert analysts. Threat hunting, incident response, and compliance reporting delivered as a fully managed service."
    sections={[
      { title: "SOC Capabilities", items: ["24/7/365 security monitoring", "Real-time threat detection and triage", "Incident response and containment", "Threat hunting and proactive defense", "Malware analysis", "Compliance reporting (SOC 2, HIPAA, PCI-DSS)"] },
      { title: "Reporting & Intelligence", items: ["Quarterly threat intelligence briefings", "Annual penetration testing", "Executive security reporting", "Monthly threat landscape reports", "Incident post-mortems and lessons learned"] },
    ]}
    similar={[
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Managed Compliance & GRC", href: "/services/managed-compliance" },
      { label: "GRC KUBE", href: "/kubes/grc-kube" },
    ]}
  />;
}
