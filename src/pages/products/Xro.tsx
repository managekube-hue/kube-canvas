import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function Xro() {
  return <ServiceDetailPage
    category="Small Business Platform"
    name="XRO — Small Business Platform"
    tagline="Complete security and operations for small businesses with 7 essential Kubes."
    description="XRO is the complete security and operations platform for small businesses. Built on 7 essential Kubes delivering unified detection, response, infrastructure management, and compliance monitoring."
    sections={[
      { title: "Included Kubes (7 Core)", items: ["CIO KUBE — Core Infrastructure Orchestration", "NPM KUBE — Network Performance Monitoring", "ITDR KUBE — Identity Threat Detection & Response", "NDR KUBE — Network Threat Detection & Response", "VDR KUBE — Vulnerability Detection & Response", "CFDR KUBE — Configuration Drift Detection & Response", "GRC KUBE — Governance, Risk & Compliance"] },
      { title: "Core Capabilities", items: ["Unified detection and response across infrastructure", "Real-time threat correlation", "Infrastructure lifecycle management", "Network performance monitoring", "Single framework compliance support", "Third-party risk management (basic)"] },
    ]}
  />;
}
