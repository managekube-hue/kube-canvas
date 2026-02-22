import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionManufacturing() {
  return <ServiceDetailPage
    category="Industry Solution"
    name="Manufacturing"
    tagline="OT/IT convergence, supply chain security, and intellectual property protection for production environments."
    description="Manufacturing organisations operate at the intersection of operational technology and enterprise IT — where a misconfigured PLC can halt a production line and a compromised ERP can expose proprietary designs. ManageKube Manufacturing Solutions address both domains with integrated monitoring, segmentation, and compliance capabilities purpose-built for factory floor to front office convergence."
    sections={[
      { title: "OT/IT Network Segmentation", items: ["Purdue Model network architecture enforcement", "ICS and SCADA traffic isolation from corporate networks", "Micro-segmentation between production zones and business systems", "Real-time alerting on unauthorized cross-zone communication", "Integration with existing industrial firewalls and data diodes"] },
      { title: "Industrial Threat Detection", items: ["Protocol-aware monitoring for Modbus, OPC-UA, EtherNet/IP, and PROFINET", "Anomaly detection on PLC command sequences and HMI interactions", "Supply chain firmware integrity verification", "Integration with NDR and ITDR modules for unified threat correlation", "MITRE ATT&CK for ICS framework mapping"] },
      { title: "Intellectual Property Protection", items: ["Data loss prevention for CAD files, schematics, and trade secrets", "USB and removable media policy enforcement on engineering workstations", "Encrypted file transfer monitoring between R&D and manufacturing partners", "Access controls aligned with ITAR and EAR export regulations", "Insider threat detection across engineering and production networks"] },
      { title: "Compliance & Regulatory Alignment", items: ["CMMC Level 2 and Level 3 compliance for defence contractors", "NIST 800-171 CUI protection across manufacturing environments", "ISO 27001 and IEC 62443 industrial security standards", "Automated evidence collection for audit preparation", "Continuous compliance monitoring with drift detection and alerting"] },
      { title: "Predictive Maintenance Integration", items: ["Equipment telemetry correlation with security event data", "Anomaly detection that distinguishes mechanical failure from cyber attack", "Integration with IBM Maximo and Dell CloudIQ for asset health monitoring", "Downtime risk scoring based on combined operational and security signals", "Proactive alerting before equipment degradation impacts production"] },
    ]}
    similar={[
      { label: "NPM Module", href: "/service-layer/npm" },
      { label: "CIO Module", href: "/service-layer/cio" },
      { label: "IT Infrastructure Audits", href: "/services/infrastructure-audits" },
    ]}
  />;
}