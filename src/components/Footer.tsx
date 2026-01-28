import { Link } from "react-router-dom";

const capabilities = [
  { name: "Assessment Kube", href: "/kubes/assessment-kube" },
  { name: "Compliance Kube", href: "/kubes/compliance-kube" },
  { name: "MSSP Kube", href: "/kubes/mssp-kube" },
  { name: "MSP Kube", href: "/kubes/msp-kube" },
  { name: "Advisory Kube", href: "/kubes/advisory-kube" },
  { name: "Innovation Kube", href: "/kubes/innovation-kube" },
  { name: "Industry Kube", href: "/kubes/industry-kube" },
  { name: "Product Kube", href: "/kubes/product-kube" },
];

const resources = [
  { name: "Case Studies", href: "/resources/case-studies" },
  { name: "Documentation", href: "/resources/documentation" },
  { name: "Blog", href: "/resources/blog" },
  { name: "Compliance Library", href: "/resources/compliance-library" },
  { name: "Partner Portal", href: "/resources/partner-portal" },
];

const company = [
  { name: "About", href: "/about" },
  { name: "Partners", href: "/about/partners" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Company */}
          <div>
            <Link to="/" className="block mb-6">
              <span className="font-display text-2xl text-background">MANAGEKUBE</span>
            </Link>
            <p className="font-mono text-sm text-background/50">
              Making Complex IT Understandable
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-background/50 mb-6">
              Kubes
            </h4>
            <ul className="space-y-3">
              {capabilities.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="font-mono text-base text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-background/50 mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="font-mono text-base text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-background/50 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="font-mono text-base text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 font-mono text-sm text-background/50 space-y-1">
              <p>123 Main Street</p>
              <p>Memphis, TN 38103</p>
              <p className="mt-3">(901) 555-1212</p>
              <p>sales@managekube.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-background/40">
            © 2025 ManageKube. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="font-mono text-sm text-background/40 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="font-mono text-sm text-background/40 hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
