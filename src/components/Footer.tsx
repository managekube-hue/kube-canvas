import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const kubes = [
  { label: "CIO KUBE", href: "/kubes/cio-kube" },
  { label: "NPM KUBE", href: "/kubes/npm-kube" },
  { label: "ITDR KUBE", href: "/kubes/itdr-kube" },
  { label: "NDR KUBE", href: "/kubes/ndr-kube" },
  { label: "CDR KUBE", href: "/kubes/cdr-kube" },
  { label: "GRC KUBE", href: "/kubes/grc-kube" },
  { label: "VDR KUBE", href: "/kubes/vdr-kube" },
  { label: "View All 15 Kubes →", href: "/kubes" },
];

const products = [
  { label: "XRO — Small Business", href: "/products/xro" },
  { label: "XMM — SME Platform", href: "/products/xmm" },
  { label: "XME — Enterprise", href: "/products/xme" },
];

const services = [
  { label: "Managed NOC", href: "/services/managed-noc" },
  { label: "Managed SOC", href: "/services/managed-soc" },
  { label: "Security Assessments", href: "/services/security-assessments" },
  { label: "Penetration Testing", href: "/services/penetration-testing" },
  { label: "All Services →", href: "/services" },
];

const compliance = [
  { label: "CMMC", href: "/compliance/cmmc" },
  { label: "HIPAA", href: "/compliance/hipaa" },
  { label: "SOC 2", href: "/compliance/soc2" },
  { label: "NIST 800-171", href: "/compliance/nist-800-171" },
  { label: "PCI-DSS", href: "/compliance/pci-dss" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Our Tools", href: "/our-tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="section-dark py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <img src={logo} alt="ManageKube IT Services" className="h-12 w-auto mb-6 brightness-0 invert" />
            <p className="text-body-lg text-white/60 max-w-sm">
              Unified detection, response, and operations. 15 Kubes. One intelligent platform.
            </p>
          </div>

          {/* Kubes */}
          <div>
            <h4 className="text-label text-white mb-5">Kubes</h4>
            <ul className="space-y-2.5">
              {kubes.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-label text-white mb-5">Products</h4>
            <ul className="space-y-2.5">
              {products.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-label text-white mt-6 mb-5">Compliance</h4>
            <ul className="space-y-2.5">
              {compliance.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label text-white mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-label text-white mb-5">Company</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© 2025 ManageKube. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-white/40 hover:text-white transition-colors">Terms</Link>
            <Link to="/login/client" className="text-sm text-white/40 hover:text-white transition-colors">Client Portal</Link>
            <Link to="/login/partner" className="text-sm text-white/40 hover:text-white transition-colors">Partner Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
