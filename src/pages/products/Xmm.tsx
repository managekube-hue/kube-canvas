/** DO NOT TOUCH: v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const ESSENTIALS_CAPS = [
  "Managed NOC (24/7)",
  "Help Desk & Desktop Support",
  "Mobile Device Management",
  "Microsoft 365 Management",
  "Network Performance Monitoring",
  "Identity Threat Detection & Response",
  "Vulnerability Detection & Prioritization",
  "Configuration Drift Detection & Correction",
  "Customer Portal + Ticketing",
];

const ADVANCED_CAPS = [
  { name: "Managed SOC (24/7)", href: "/services/managed-soc" },
  { name: "Cloud Detection & Response", href: "/service-layer/cdr" },
  { name: "Application Performance Monitoring", href: "/service-layer/apm" },
  { name: "Application Threat Containment", href: "/service-layer/adr" },
  { name: "Backup & Disaster Recovery", href: "/service-layer/bdr" },
  { name: "Compliance Management", href: "/services/managed-compliance" },
  { name: "Real-Time Visibility Dashboard", href: "/service-layer" },
];

export default function Xmm() {
  return (
    <PageLayout>
      <PageBanner
        title="Advanced"
        subtitle="Full-spectrum security operations with real-time detection and response"
        phase="Service Tiers"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="inline-block bg-brand-orange text-white text-xs font-bold px-4 py-1 uppercase tracking-wider mb-6">Most Popular</div>
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">SME: 100 to 500 users</p>
          <h2 className="text-headline text-foreground mb-4">Full-spectrum security operations with real-time detection and response</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            The Advanced tier is the most popular. It justifies the step up from Essentials and communicates the security depth that SMEs actually need. Methodology: Hunt, Identify, Alert, Triage, Diagnose, Remediate.
          </p>

          <div className="mb-12">
            <p className="text-label text-muted-foreground uppercase tracking-widest mb-4">Everything in Essentials</p>
            <div className="grid md:grid-cols-3 gap-2">
              {ESSENTIALS_CAPS.map((cap) => (
                <div key={cap} className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-secondary border border-border">
                  <Check size={12} className="text-brand-orange flex-shrink-0" /> {cap}
                </div>
              ))}
            </div>
          </div>

          <p className="text-label text-brand-orange uppercase tracking-widest mb-6">Plus Advanced Capabilities</p>
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            {ADVANCED_CAPS.map((cap, i) => (
              <motion.div key={cap.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={cap.href} className="flex items-start gap-3 p-5 border-2 border-brand-orange/30 hover:border-brand-orange transition-colors group">
                  <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground group-hover:text-brand-orange transition-colors">{cap.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-label text-muted-foreground uppercase tracking-widest mb-4">Methodology Coverage</p>
          <p className="text-foreground font-bold mb-12">Hunt → Identify → Alert → Triage → Diagnose → Remediate</p>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started?tier=advanced" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Get Advanced <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/service-tiers" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 font-semibold hover:bg-foreground hover:text-white transition-colors">
              Compare Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
