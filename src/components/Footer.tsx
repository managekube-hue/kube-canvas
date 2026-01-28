import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const kubes = [
  { label: "Assessment", href: "/kubes/assessment-kube" },
  { label: "Compliance", href: "/kubes/compliance-kube" },
  { label: "MSSP", href: "/kubes/mssp-kube" },
  { label: "MSP", href: "/kubes/msp-kube" },
  { label: "Advisory", href: "/kubes/advisory-kube" },
  { label: "Innovation", href: "/kubes/innovation-kube" },
  { label: "Industry", href: "/kubes/industry-kube" },
  { label: "Product", href: "/kubes/product-kube" },
];

const industries = [
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Financial Services", href: "/industries/financial-services" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Transportation", href: "/industries/transportation" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="section-dark py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <img 
              src={logo} 
              alt="ManageKube IT Services" 
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-body-lg text-white/60 max-w-sm">
              Making complex IT understandable. Enterprise infrastructure. Intelligent software. One accountable team.
            </p>
          </div>

          {/* Kubes */}
          <div>
            <h4 className="text-label text-white mb-6">Kubes</h4>
            <ul className="space-y-3">
              {kubes.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-body text-white/60 hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-label text-white mb-6">Industries</h4>
            <ul className="space-y-3">
              {industries.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-body text-white/60 hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/kubes/industry-kube"
                  className="text-body text-brand-orange hover:text-white transition-colors"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-label text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-body text-white/60 hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2025 ManageKube. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-white/40 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
