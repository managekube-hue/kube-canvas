const capabilities = [
  "Assessment Kube",
  "Compliance Kube",
  "MSSP Kube",
  "MSP Kube",
  "Advisory Kube",
  "Innovation Kube",
  "Industry Kube",
  "Product Kube",
];

const resources = ["Case Studies", "Documentation", "Blog", "Compliance Library", "Partner Portal"];

export const Footer = () => {
  return (
    <footer className="section-dark py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="font-display text-xl text-white mb-2">MANAGEKUBE</div>
            <p className="font-mono text-xs text-white/60">
              Making Complex IT Understandable
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-wider mb-4">
              CAPABILITIES
            </h4>
            <ul className="space-y-2">
              {capabilities.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-mono text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-wider mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-mono text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-wider mb-4">CONTACT</h4>
            <div className="font-mono text-sm text-white/60 space-y-1 mb-6">
              <p>123 Main Street</p>
              <p>Memphis, TN 38103</p>
              <p className="mt-3">(901) 555-1212</p>
              <p>sales@managekube.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/40">
            © 2025 ManageKube. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
              Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
