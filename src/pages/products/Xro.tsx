/** DO NOT TOUCH: v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const CAPABILITIES = [
  { name: "Managed NOC (24/7)", href: "/services/managed-noc" },
  { name: "Help Desk & Desktop Support", href: "/services/help-desk" },
  { name: "Mobile Device Management", href: "/service-layer/mdm" },
  { name: "Microsoft 365 Management", href: "/service-layer/cio" },
  { name: "Network Performance Monitoring", href: "/service-layer/npm" },
  { name: "Identity Threat Detection & Response", href: "/service-layer/itdr" },
  { name: "Vulnerability Detection & Prioritization", href: "/service-layer/vdr" },
  { name: "Configuration Drift Detection & Correction", href: "/service-layer/cfdr" },
  { name: "Customer Portal + Ticketing", href: "/support" },
];

const NOT_INCLUDED = [
  "Managed SOC (24/7)",
  "Cloud Detection & Response",
  "Application Performance Monitoring",
  "Application Threat Containment",
  "Backup & Disaster Recovery",
  "Compliance Management",
  "Real-Time Visibility Dashboard",
];

export default function Xro() {
  return (
    <PageLayout>
      <PageBanner
        title="Essentials"
        subtitle="Your foundation for managed IT and security visibility"
        phase="Service Tiers"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-label text-brand-orange mb-2 uppercase tracking-widest">SMB: 10 to 100 users</p>
          <h2 className="text-headline text-foreground mb-4">Your foundation for managed IT and security visibility</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Essentials is the foundation tier covering the Hunt, Identify, Alert, and Triage methodology steps. The entry point: it communicates what's included, why it's enough, and why it's the right starting point without underselling the depth.
          </p>

          <p className="text-label text-brand-orange uppercase tracking-widest mb-6">Included Capabilities</p>
          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {CAPABILITIES.map((cap, i) => (
              <motion.div key={cap.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={cap.href} className="flex items-start gap-3 p-5 border border-border hover:border-brand-orange transition-colors group">
                  <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground group-hover:text-brand-orange transition-colors">{cap.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-label text-muted-foreground uppercase tracking-widest mb-4">Methodology Coverage</p>
          <p className="text-foreground font-bold mb-12">Hunt → Identify → Alert → Triage</p>

          <div className="p-8 bg-secondary border border-border mb-12">
            <p className="text-sm font-bold text-foreground mb-3">Available in Advanced & Enterprise</p>
            <div className="grid md:grid-cols-2 gap-2">
              {NOT_INCLUDED.map((item) => (
                <p key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-muted-foreground/40">—</span> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started?tier=essentials" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
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
