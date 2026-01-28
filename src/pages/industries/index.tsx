import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";

interface IndustryPageProps {
  name: string;
  block: string;
  description: string;
  focus: string[];
  compliance: string[];
}

export const IndustryPageTemplate = ({ name, block, description, focus, compliance }: IndustryPageProps) => (
  <PageLayout>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">{block}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-8">{name}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-mono text-lg lg:text-xl text-muted-foreground max-w-3xl">{description}</motion.p>
        </div>
      </div>
    </section>
    <section className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">Focus Areas</p>
            {focus.map((f, i) => <p key={i} className="font-mono text-lg text-foreground border-l-2 border-foreground pl-6 mb-4">{f}</p>)}
          </div>
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">Compliance</p>
            {compliance.map((c, i) => <p key={i} className="font-mono text-lg text-muted-foreground mb-2">{c}</p>)}
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export const Manufacturing = () => <IndustryPageTemplate name="Manufacturing" block="M2BLOCK" description="Production Excellence. Predictive maintenance, quality control, OT/IT convergence." focus={["OT Security", "Predictive Maintenance", "Quality Control", "Supply Chain"]} compliance={["CMMC", "NIST 800-171", "ISO 27001"]} />;
export const Healthcare = () => <IndustryPageTemplate name="Healthcare" block="H2BLOCK" description="Clinical Excellence. HIPAA compliance, ransomware immunity, EHR performance." focus={["Patient Data Protection", "Ransomware Recovery", "EHR Optimization", "Telehealth Security"]} compliance={["HIPAA", "HITRUST", "SOC 2"]} />;
export const FinancialServices = () => <IndustryPageTemplate name="Financial Services" block="F2BLOCK" description="Mission-Critical Operations. Fraud detection, real-time reporting, regulatory compliance." focus={["Fraud Detection", "Real-time Reporting", "Trading Security", "Customer Data"]} compliance={["SOC 2", "PCI DSS", "GLBA", "SOX"]} />;
export const Retail = () => <IndustryPageTemplate name="Retail" block="R2BLOCK" description="Omnichannel Commerce. Unified fulfillment, store operations, AI personalization." focus={["POS Security", "Inventory Management", "Customer Analytics", "Supply Chain"]} compliance={["PCI DSS", "CCPA", "GDPR"]} />;
export const Transportation = () => <IndustryPageTemplate name="Transportation" block="T2BLOCK" description="Fleet Intelligence. Real-time visibility, logistics optimization, IoT security." focus={["Fleet Management", "Logistics Optimization", "IoT Security", "Driver Safety"]} compliance={["DOT", "FMCSA", "ISO 27001"]} />;
export const MiningExtraction = () => <IndustryPageTemplate name="Mining & Extraction" block="ME2BLOCK" description="Remote Operations Resilience. OT security, environmental compliance, edge computing." focus={["Remote Site Security", "OT/IT Convergence", "Environmental Monitoring", "Worker Safety"]} compliance={["MSHA", "EPA", "ISO 27001"]} />;
export const EnergyUtilities = () => <IndustryPageTemplate name="Energy & Utilities" block="EU2BLOCK" description="Grid Resilience. Renewable integration, NERC-CIP compliance, SCADA protection." focus={["Grid Security", "SCADA Protection", "Renewable Integration", "Outage Management"]} compliance={["NERC CIP", "FERC", "ISO 27001"]} />;
export const PublicSector = () => <IndustryPageTemplate name="Public Sector" block="PS2BLOCK" description="Citizen Services. FedRAMP compliance, smart city infrastructure, secure operations." focus={["Citizen Portal Security", "Smart City Infrastructure", "Emergency Services", "Data Privacy"]} compliance={["FedRAMP", "StateRAMP", "CJIS", "FISMA"]} />;
export const Telecommunications = () => <IndustryPageTemplate name="Telecommunications" block="TC2BLOCK" description="Network Transformation. 5G core security, edge monetization, network automation." focus={["5G Security", "Network Automation", "Edge Computing", "Service Assurance"]} compliance={["FCC", "CPNI", "ISO 27001"]} />;
