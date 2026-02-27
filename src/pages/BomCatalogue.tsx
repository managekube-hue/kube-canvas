/**
 * BOM Catalogue — standalone à la carte page
 * Browse managed services, professional engagements, hardware/licensing,
 * add to BOM cart, and submit for quote.
 */

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useBOMCart } from "@/context/BOMCartContext";
import { supabase } from "@/integrations/supabase/client";
import {
  ShoppingCart, Plus, Check, ArrowRight, Send,
  Shield, Server, Cloud, Monitor, Network, Mail,
  Database, Smartphone, Cpu, FileText, Wrench, Zap,
  HardDrive, Lock, Eye, Bug, Scale, Users,
} from "lucide-react";

/* ═══════════════════════════════════════
   CATALOGUE DATA
   ═══════════════════════════════════════ */

interface CatalogueItem {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  type: "service" | "product" | "license";
  category: string;
  vendor: string;
  icon: any;
  parentBlock: string;
}

const CATALOGUE: CatalogueItem[] = [
  // ── Managed Services (Kubes) ──
  { id: "svc-soc", name: "Managed SOC (24/7)", description: "Full security operations centre with SIEM, EDR, and threat hunting", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Shield, parentBlock: "Security" },
  { id: "svc-noc", name: "Managed NOC", description: "Network operations monitoring, alerting, and incident response", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Network, parentBlock: "Infrastructure" },
  { id: "svc-helpdesk", name: "Help Desk (Tier 1–3)", description: "End-user support desk with SLA-backed response times", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Users, parentBlock: "Operations" },
  { id: "svc-bdr", name: "Backup & Disaster Recovery", description: "Automated backups, DR testing, and business continuity", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Database, parentBlock: "Infrastructure" },
  { id: "svc-cloud", name: "Managed Cloud Operations", description: "Azure/AWS/GCP management, FinOps, and optimisation", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Cloud, parentBlock: "Cloud" },
  { id: "svc-compliance", name: "Managed Compliance", description: "Continuous compliance monitoring and audit preparation", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Scale, parentBlock: "Governance" },
  { id: "svc-it", name: "Managed IT Operations", description: "Full IT operations management and proactive maintenance", priceRange: "Scored by Assessment", type: "service", category: "Managed Services", vendor: "ManageKube", icon: Server, parentBlock: "Operations" },

  // ── Professional Services / Engagements ──
  { id: "pro-m365-migration", name: "Microsoft 365 Migration", description: "Full tenant setup, mailbox migration, Teams deployment, and user training", priceRange: "$5,000 – $25,000", type: "service", category: "Migrations & Deployments", vendor: "ManageKube", icon: Mail, parentBlock: "Migration" },
  { id: "pro-m365-mgmt", name: "M365 Management & Optimisation", description: "Licence right-sizing, Intune, conditional access, security hardening", priceRange: "$2,500 – $8,000", type: "service", category: "Migrations & Deployments", vendor: "ManageKube", icon: Mail, parentBlock: "Optimisation" },
  { id: "pro-sharepoint", name: "SharePoint Design & Migration", description: "Intranet design, document migration, governance, and training", priceRange: "$3,000 – $15,000", type: "service", category: "Migrations & Deployments", vendor: "ManageKube", icon: FileText, parentBlock: "Migration" },
  { id: "pro-email-migration", name: "Email Platform Migration", description: "Cross-platform email migration (G Suite, on-prem Exchange, etc.)", priceRange: "$3,000 – $20,000", type: "service", category: "Migrations & Deployments", vendor: "ManageKube", icon: Mail, parentBlock: "Migration" },
  { id: "pro-cloud-migration", name: "Cloud Migration & Architecture", description: "Azure/AWS/GCP workload migration, architecture design, and cutover", priceRange: "$15,000 – $75,000", type: "service", category: "Migrations & Deployments", vendor: "ManageKube", icon: Cloud, parentBlock: "Migration" },
  { id: "pro-network", name: "Network Design & Buildout", description: "VLAN segmentation, firewall, WiFi 6, SD-WAN implementation", priceRange: "$8,000 – $50,000", type: "service", category: "Infrastructure Projects", vendor: "ManageKube", icon: Network, parentBlock: "Infrastructure" },
  { id: "pro-dc-relocation", name: "Data Centre Relocation", description: "Physical migration, rack-and-stack, cabling, project management", priceRange: "$20,000 – $100,000", type: "service", category: "Infrastructure Projects", vendor: "ManageKube", icon: Server, parentBlock: "Infrastructure" },
  { id: "pro-pentest", name: "Penetration Testing", description: "Internal/external pen test, web app testing, social engineering", priceRange: "$5,000 – $25,000", type: "service", category: "Security Engagements", vendor: "ManageKube", icon: Bug, parentBlock: "Security" },
  { id: "pro-compliance-gap", name: "Compliance Gap Analysis", description: "Framework-specific gap analysis, control mapping, policy development", priceRange: "$10,000 – $40,000", type: "service", category: "Security Engagements", vendor: "ManageKube", icon: Scale, parentBlock: "Governance" },
  { id: "pro-vciso", name: "vCISO / Fractional Security Leadership", description: "Part-time CISO for strategy, board reporting, programme oversight", priceRange: "$3,000 – $8,000/mo", type: "service", category: "Security Engagements", vendor: "ManageKube", icon: Shield, parentBlock: "Security" },
  { id: "pro-dr-plan", name: "Disaster Recovery Planning", description: "DR plan development, failover testing, tabletop exercises", priceRange: "$8,000 – $30,000", type: "service", category: "Infrastructure Projects", vendor: "ManageKube", icon: Database, parentBlock: "Infrastructure" },
  { id: "pro-infra-audit", name: "Infrastructure Audit", description: "Complete environment assessment with lifecycle planning", priceRange: "$5,000 – $15,000", type: "service", category: "Infrastructure Projects", vendor: "ManageKube", icon: Eye, parentBlock: "Infrastructure" },
  { id: "pro-vendor-rational", name: "Vendor Rationalisation", description: "Vendor audit, consolidation roadmap, renewal negotiation", priceRange: "$5,000 – $15,000", type: "service", category: "Advisory & Consulting", vendor: "ManageKube", icon: Wrench, parentBlock: "Optimisation" },
  { id: "pro-automation", name: "Custom Automation Development", description: "Power Automate, scripting, API integration for workflows", priceRange: "$5,000 – $25,000", type: "service", category: "Advisory & Consulting", vendor: "ManageKube", icon: Zap, parentBlock: "Optimisation" },
  { id: "pro-security-training", name: "Security Awareness Training", description: "Phishing simulations, monthly training modules, compliance reporting", priceRange: "$2,000 – $8,000/yr", type: "service", category: "Security Engagements", vendor: "ManageKube", icon: Lock, parentBlock: "Security" },
  { id: "pro-physical-sec", name: "Physical Security Assessment", description: "Access control, CCTV, badge systems, physical security policy", priceRange: "$3,000 – $12,000", type: "service", category: "Security Engagements", vendor: "ManageKube", icon: Lock, parentBlock: "Security" },

  // ── Hardware & Licensing ──
  { id: "hw-firewall", name: "Next-Gen Firewall", description: "Enterprise firewall with UTM, IPS/IDS, and VPN — Fortinet, Palo Alto, or SonicWall", priceRange: "$2,000 – $25,000", type: "product", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Shield, parentBlock: "Infrastructure" },
  { id: "hw-switches", name: "Managed Switches", description: "Layer 2/3 switches with PoE+ for campus or data centre deployments", priceRange: "$500 – $8,000", type: "product", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Network, parentBlock: "Infrastructure" },
  { id: "hw-wifi", name: "WiFi 6/6E Access Points", description: "Enterprise wireless with centralised management and security", priceRange: "$300 – $1,500/AP", type: "product", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Network, parentBlock: "Infrastructure" },
  { id: "hw-server", name: "Server Hardware", description: "Rack, tower, or blade servers — Dell, HP, Lenovo", priceRange: "$3,000 – $30,000", type: "product", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: HardDrive, parentBlock: "Infrastructure" },
  { id: "hw-endpoints", name: "Workstations & Laptops", description: "Business-class endpoints with warranty and lifecycle management", priceRange: "$800 – $3,000/unit", type: "product", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Monitor, parentBlock: "Operations" },
  { id: "lic-m365", name: "Microsoft 365 Licensing", description: "Business Basic, Standard, Premium, or E3/E5 seats", priceRange: "$6 – $57/user/mo", type: "license", category: "Hardware & Licensing", vendor: "Microsoft", icon: Mail, parentBlock: "Licensing" },
  { id: "lic-edr", name: "EDR / XDR Licensing", description: "Endpoint detection and response — CrowdStrike, SentinelOne, or Defender", priceRange: "$5 – $15/endpoint/mo", type: "license", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Shield, parentBlock: "Licensing" },
  { id: "lic-backup", name: "Backup Licensing", description: "Cloud or hybrid backup — Veeam, Datto, or Acronis", priceRange: "$3 – $10/endpoint/mo", type: "license", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Database, parentBlock: "Licensing" },
  { id: "hw-mdm", name: "Mobile Device Management", description: "MDM/MAM platform for iOS, Android, and Windows — Intune or Jamf", priceRange: "$3 – $12/device/mo", type: "license", category: "Hardware & Licensing", vendor: "Multi-vendor", icon: Smartphone, parentBlock: "Licensing" },
];

/* ═══════════════════════════════════════
   CATEGORY FILTER + CATALOGUE GRID
   ═══════════════════════════════════════ */

const ALL_CATEGORIES = [...new Set(CATALOGUE.map(c => c.category))];

function CatalogueGrid() {
  const { items, addItems } = useBOMCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const addedIds = new Set(items.map(i => i.id));

  const filtered = activeCategory ? CATALOGUE.filter(c => c.category === activeCategory) : CATALOGUE;

  // Group by category
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CatalogueItem[]>);

  return (
    <section className="py-20 lg:py-24" style={{ background: "#FEFBF6" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-4">Service &amp; Product Catalogue</p>
        <h2 className="text-3xl font-bold text-foreground mb-3">Build Your Bill of Materials</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          Add any combination of managed services, professional engagements, hardware, and licensing to your BOM.
          Submit when ready — we'll respond with a formal quote within one business day.
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${!activeCategory ? "bg-brand-orange text-white border-brand-orange" : "bg-white text-muted-foreground border-border hover:border-brand-orange/30"}`}
          >
            All ({CATALOGUE.length})
          </button>
          {ALL_CATEGORIES.map(cat => {
            const count = CATALOGUE.filter(c => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${activeCategory === cat ? "bg-brand-orange text-white border-brand-orange" : "bg-white text-muted-foreground border-border hover:border-brand-orange/30"}`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Grouped cards */}
        {Object.entries(grouped).map(([category, categoryItems]) => (
          <div key={category} className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 pb-2 border-b border-border">
              {category}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryItems.map((item, i) => {
                const added = addedIds.has(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className={`flex flex-col p-5 bg-white border transition-colors ${added ? "border-brand-orange/40" : "border-border"}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-brand-orange/10">
                        <item.icon size={14} className="text-brand-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground leading-snug">{item.name}</p>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase">{item.type} · {item.vendor}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-xs font-mono text-muted-foreground">{item.priceRange}</span>
                      <button
                        onClick={() => {
                          if (!added) addItems([{ id: item.id, name: item.name, type: item.type, vendor: item.vendor, parentBlock: item.parentBlock }]);
                        }}
                        disabled={added}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${added ? "bg-brand-orange/10 text-brand-orange cursor-default" : "bg-brand-orange text-white hover:opacity-90"}`}
                      >
                        {added ? <><Check size={10} /> Added</> : <><Plus size={10} /> Add</>}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   QUOTE REQUEST FORM (no assessment needed)
   ═══════════════════════════════════════ */

function QuoteRequestSection() {
  const { items, clearCart } = useBOMCart();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { alert("Add at least one item to your BOM before requesting a quote."); return; }
    setSubmitting(true);
    try {
      const bomSummary = items.map(i => `${i.name} (${i.type})`).join(", ");
      // Persist to dedicated bom_submissions table
      const { error } = await supabase.from("bom_submissions").insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim() || null,
        email: form.email.trim(),
        company: form.company.trim() || null,
        phone: form.phone.trim() || null,
        message: form.message.trim() || null,
        items: items.map(i => ({ id: i.id, name: i.name, type: i.type, vendor: i.vendor, parentBlock: i.parentBlock })),
        item_count: items.length,
      });
      if (error) throw error;

      supabase.from("cms_contacts").insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim() || null,
        source: "bom-catalogue",
        source_detail: `bom-${items.length}-items`,
        message: `BOM: ${bomSummary}`,
      }).then(({ error: e }) => e && console.error(e));

      supabase.functions.invoke("send-alert", {
        body: {
          type: "new_contact",
          data: {
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim(),
            email: form.email.trim(),
            company: form.company.trim(),
            source: "bom-catalogue",
            message: `BOM Quote (${items.length} items): ${bomSummary}`,
          },
        },
      }).then(({ error: e }) => e && console.error(e));

      setSubmitted(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 lg:py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 max-w-2xl text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-brand-orange/15">
            <Send size={28} className="text-brand-orange" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Quote Request Submitted</h3>
          <p className="text-muted-foreground mb-6">We'll send your formal quote within one business day.</p>
          <div className="flex justify-center gap-4">
            <Link to="/get-started" className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-brand-orange border border-brand-orange/30 hover:bg-brand-orange/5 transition-colors">
              Back to Get Started
            </Link>
            <Link to="/assessment/start" className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-brand-orange hover:opacity-90 transition-opacity">
              Or Start Assessment <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote-form" className="py-20 lg:py-24 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="bg-background p-8 lg:p-12 border border-border">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-2">Request a Quote</p>
          <h2 className="text-2xl font-bold text-foreground mb-2">Submit Your BOM</h2>
          <p className="text-sm text-muted-foreground mb-8">
            {items.length > 0
              ? `You have ${items.length} item${items.length > 1 ? "s" : ""} in your BOM. Fill in your details and we'll send a formal quote.`
              : "Add items from the catalogue above, then submit for a same-day quote."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                <input type="text" required value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                <input type="text" required value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Work Email *</label>
                <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                <input type="text" required value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
              <textarea rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Quantities, timelines, specific requirements..."
                className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors resize-none" />
            </div>
            <button type="submit" disabled={submitting || items.length === 0}
              className={`flex items-center justify-center gap-2 w-full py-4 font-semibold transition-all ${submitting || items.length === 0 ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-brand-orange text-white hover:opacity-90"}`}>
              {submitting
                ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                : <><Send className="w-5 h-5" /> Submit Quote Request ({items.length} items)</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */

export default function BomCatalogue() {
  return (
    <PageLayout>
      <PageBanner
        title="Service & Product Catalogue"
        subtitle="Browse, build your BOM, and request a quote — no assessment required."
      />
      <CatalogueGrid />
      <QuoteRequestSection />
    </PageLayout>
  );
}
