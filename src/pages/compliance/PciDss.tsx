import { ComplianceDetailPage } from "@/components/ComplianceDetailPage";
export default function PciDss() {
  return <ComplianceDetailPage framework="PCI-DSS" fullName="Payment Card Industry Data Security Standard" audience="Merchants, Payment Processors & Retail Organizations" description="PCI-DSS solutions protect cardholder data environments through continuous monitoring, network segmentation verification, and automated control assessment across all 12 PCI-DSS requirements." features={["Cardholder data environment (CDE) monitoring","Network segmentation verification","All 12 PCI-DSS requirements coverage","Automated vulnerability scanning","Log management and review","File integrity monitoring","Access control enforcement","Encryption and key management","QSA audit support"]} />;
}
