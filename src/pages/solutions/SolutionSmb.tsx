import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionSmb() {
  return <ServiceDetailPage
    category="By Market Size"
    name="SMB — Small Business"
    tagline="Turnkey security and operations for small businesses with limited IT staff and budget."
    description="SMB solutions deliver enterprise-grade security and operations in a turnkey package designed for small businesses. Pre-configured Kube bundles, managed services, predictable per-user pricing, and minimal administrative overhead. Get protected in days, not months."
    sections={[
      { title: "SMB Package", items: ["Pre-configured security and operations", "Managed SOC and NOC services", "Simplified dashboard and alerting", "Per-user or per-device pricing"] },
      { title: "Deployment & Support", items: ["Rapid deployment (days)", "Phone and email support", "Compliance starter templates", "Growth-friendly scalability"] },
    ]}
    similar={[
      { label: "SME Solutions", href: "/solutions/sme" },
      { label: "Managed Services", href: "/services" },
      { label: "XRO Platform", href: "/products/xro" },
    ]}
  />;
}
