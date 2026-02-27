/** DO NOT TOUCH: v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const ENTERPRISE_NEW = [
  { name: "Software Supply Chain Detection & Response", href: "/service-layer/sdr" },
  { name: "Data Exfiltration Detection & Response", href: "/service-layer/ddr" },
  { name: "STRIKE Strategic Intelligence", href: "/service-layer/strike" },
  { name: "External Attack Surface Management", href: "/service-layer/easm" },
  { name: "Honeypot & Deception Network", href: "/service-layer/honeypot" },
  { name: "FinOps & Cloud Cost Governance", href: "/services/managed-cloud" },
  { name: "Dedicated Advisory / vCISO Access", href: "/contact" },
];

const COMPLIANCE_FRAMEWORKS = [
  "CMMC", "HIPAA", "SOC 2", "CJIS", "NIST 800-171", "NIST 800-53",
  "ISO 27001", "PCI-DSS", "FedRAMP", "NIST CSF", "CIS Controls", "FISMA",
];

export default function Xme() {
  return (
    <PageLayout>
      <PageBanner
        title="Enterprise"
        subtitle="Complete coverage: threat intelligence, deception, and supply chain defense"
        phase="Service Tiers"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">Enterprise — 500+ users / regulated industries</p>
          <h2 className="text-headline text-foreground mb-4">Complete coverage — threat intelligence, deception, and supply chain defense</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Full lifecycle: Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close. Enterprise buyers are not browsing — they have a specific security problem. This tier speaks to their threat surface with precision.
          </p>

          <div className="p-6 bg-secondary border border-border mb-8">
            <p className="text-sm font-bold text-foreground mb-2">Everything in Advanced included</p>
            <p className="text-sm text-muted-foreground">All Essentials and Advanced capabilities are included in the Enterprise tier.</p>
          </div>

          <p className="text-label text-brand-orange uppercase tracking-widest mb-6">Enterprise-Exclusive Capabilities</p>
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            {ENTERPRISE_NEW.map((cap, i) => (
              <motion.div key={cap.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={cap.href} className="flex items-start gap-3 p-5 border-2 border-brand-orange bg-brand-orange/5 hover:bg-brand-orange/10 transition-colors group">
                  <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground group-hover:text-brand-orange transition-colors">{cap.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-label text-muted-foreground uppercase tracking-widest mb-4">Regulatory & Compliance Coverage</p>
          <div className="flex flex-wrap gap-2 mb-12">
            {COMPLIANCE_FRAMEWORKS.map((fw) => (
              <Link key={fw} to={`/compliance/${fw.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs font-bold px-3 py-1.5 border border-border hover:border-brand-orange hover:text-brand-orange transition-colors">
                {fw}
              </Link>
            ))}
          </div>

          <p className="text-label text-muted-foreground uppercase tracking-widest mb-4">Full Methodology Lifecycle</p>
          <p className="text-foreground font-bold mb-12">Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close</p>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started?tier=enterprise" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Talk to Enterprise Team <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-layer" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              View All Capabilities
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
