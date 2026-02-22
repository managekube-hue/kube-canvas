import { Link } from "react-router-dom";

/** Footer — 5-column professional layout */

const ORANGE = "#993619";
const DIM = "rgba(255,255,255,0.38)";
const HOVER = "#993619";

interface NavItem { label: string; href: string }
interface ColDef { title: string; items: NavItem[] }

const columns: ColDef[] = [
  {
    title: "Our Tools",
    items: [
      { label: "Overview: How Kubric Works", href: "/our-tools/how-kubric-works" },
      { label: "Kubric UIDR", href: "/our-tools/kubric-uidr" },
      { label: "Kubric Data Graph", href: "/our-tools/kubric-data-graph" },
      { label: "KubricAI", href: "/our-tools/kubric-ai" },
      { label: "Service Delivery Methodology", href: "/methodology" },
    ],
  },
  {
    title: "Service Layer",
    items: [
      { label: "All Modules", href: "/service-layer" },
      { label: "CIO", href: "/service-layer/cio" },
      { label: "NPM", href: "/service-layer/npm" },
      { label: "ITDR", href: "/service-layer/itdr" },
      { label: "NDR", href: "/service-layer/ndr" },
      { label: "STRIKE", href: "/service-layer/strike" },
      { label: "EASM", href: "/service-layer/easm" },
    ],
  },
  {
    title: "Service Tiers",
    items: [
      { label: "XRO — Essentials", href: "/service-tiers/xro-essentials" },
      { label: "XMX — Advanced", href: "/service-tiers/xmx-advanced" },
      { label: "XME — Enterprise", href: "/service-tiers/xme-enterprise" },
      { label: "Custom Configuration", href: "/service-tiers/custom" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Managed SOC", href: "/services/managed-soc" },
      { label: "Managed Compliance & GRC", href: "/services/managed-compliance" },
      { label: "Managed Cloud & FinOps", href: "/services/managed-cloud" },
      { label: "Security Assessments", href: "/services/security-assessments" },
      { label: "Penetration Testing", href: "/services/penetration-testing" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Manufacturing", href: "/solutions/manufacturing" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Public Sector", href: "/solutions/public-sector" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Retail", href: "/solutions/retail" },
      { label: "Technology", href: "/solutions/technology" },
    ],
  },
];

const Col = ({ title, items, last }: ColDef & { last?: boolean }) => (
  <div style={{ borderRight: last ? "none" : "1px solid rgba(255,255,255,0.06)", paddingRight: "0" }}>
    <p style={{ color: "#ffffff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "20px" }}>
      {title}
    </p>
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li key={item.label} style={{ marginBottom: "11px" }}>
          <Link
            to={item.href}
            style={{ color: DIM, fontSize: "13px", lineHeight: "1.45", textDecoration: "none", display: "block" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = HOVER}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = DIM}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


export const Footer = () => (
  <footer style={{ background: "#0E0E0E" }}>

    {/* ── Path strip ── */}
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "36px 0" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "18px" }}>
          Service Model
        </p>
        <div className="flex flex-wrap gap-8">
          {[
            { label: "Fully Managed", sub: "We run it. You own the outcomes.", href: "/fully-managed", color: ORANGE },
            { label: "Co-Managed", sub: "Your team runs it. Our engineers back you up.", href: "/co-managed", color: "hsl(210,70%,55%)" },
            { label: "Self-Managed", sub: "You run it. Full platform control.", href: "/self-managed", color: "hsl(145,60%,45%)" },
          ].map((m, i, arr) => (
            <div key={m.label} className="flex items-center gap-8">
              <Link to={m.href} className="flex items-start gap-3 group">
                <div style={{ width: "3px", minHeight: "2rem", background: m.color, marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = m.color}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  >{m.label}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>{m.sub}</p>
                </div>
              </Link>
              {i < arr.length - 1 && <div style={{ width: "1px", height: "2rem", background: "rgba(255,255,255,0.07)" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Wordmark ── */}
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "36px 0" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "#ffffff" }}>
            Manage<span style={{ color: ORANGE }}>Kube</span>
          </span>
        </Link>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", maxWidth: "320px", lineHeight: "1.65" }}>
          Enterprise managed MSP & MSSP services. Unified infrastructure, detection, and response.
        </p>
      </div>
    </div>

    {/* ── Nav grid ── */}
    <div style={{ padding: "56px 0 52px" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style={{ gap: "0 40px" }}>
          {columns.map((col, i) => <Col key={col.title} {...col} last={i === columns.length - 1} />)}
        </div>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "22px 0" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.20)" }}>© 2026 ManageKube. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Contact", href: "/contact" },
          ].map(l => (
            <Link key={l.label} to={l.href}
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.22)"}
            >{l.label}</Link>
          ))}
        </div>
      </div>
    </div>

  </footer>
);
