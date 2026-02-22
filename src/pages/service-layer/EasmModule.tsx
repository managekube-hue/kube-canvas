import { KubeDetailPage } from "@/components/KubeDetailPage";

export default function EasmModule() {
  return (
    <KubeDetailPage
      code="EASM"
      name="External Attack Surface Management"
      tagline="Continuous discovery and monitoring of internet-facing assets, shadow IT, and exposed services."
      category="Security Detection & Response"
      description="EASM continuously maps your external attack surface — discovering forgotten subdomains, exposed APIs, misconfigured cloud storage, and shadow IT assets that traditional scanners miss. Know what attackers see before they exploit it."
      fullDescription="Your attack surface extends far beyond the assets you know about. EASM performs continuous, non-intrusive reconnaissance across IPv4/IPv6, DNS, certificate transparency logs, and cloud provider APIs to build a living inventory of your internet-facing exposure. Every discovered asset is risk-scored, mapped to business context, and monitored for changes — so you can remediate before adversaries discover what you've missed."
      capabilities={[
        {
          title: "Asset Discovery",
          items: [
            "Subdomain and DNS enumeration",
            "Certificate transparency monitoring",
            "Cloud storage exposure detection",
            "Shadow IT and rogue asset identification",
          ],
        },
        {
          title: "Risk Scoring",
          items: [
            "Real-time exploitability scoring",
            "Business-context asset classification",
            "Change detection and drift alerts",
            "Integration with VDR for unified risk view",
          ],
        },
        {
          title: "Continuous Monitoring",
          items: [
            "24/7 automated surface scanning",
            "New exposure alerting within minutes",
            "Port and service change tracking",
            "SSL/TLS certificate expiry monitoring",
          ],
        },
      ]}
      similar={[
        { label: "VDR — Vulnerability Detection", href: "/service-layer/vdr" },
        { label: "NDR — Network Detection", href: "/service-layer/ndr" },
        { label: "CDR — Cloud Detection", href: "/service-layer/cdr" },
      ]}
    />
  );
}
