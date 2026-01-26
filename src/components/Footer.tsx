import { Button } from "@/components/ui/button";

const capabilities = [
  "Assessment Kube",
  "Compliance Kube",
  "MSSP Kube",
  "MSP Kube",
  "Advisory Kube",
  "Innovation Kube",
  "Industry Kube",
  "Partner Kube",
];

const resources = ["Case Studies", "Documentation", "Blog", "Compliance Library", "Partner Portal"];

export const Footer = () => {
  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="font-display text-xl text-white mb-2">MANAGEKUBE</div>
            <p className="font-mono text-xs text-muted-foreground">
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
                    className="font-mono text-sm text-muted-foreground hover:text-white transition-colors"
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
                    className="font-mono text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Action */}
          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-wider mb-4">CONTACT</h4>
            <div className="font-mono text-sm text-muted-foreground space-y-1 mb-6">
              <p>123 Main Street</p>
              <p>Memphis, TN 38103</p>
              <p className="mt-3">(901) 555-1212</p>
              <p>contact@managekube.com</p>
            </div>

            <h4 className="font-mono text-sm text-white uppercase tracking-wider mb-3">ACTION</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs border-white/20 text-white hover:bg-white/10"
              >
                ONBOARDING
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs border-white/20 text-white hover:bg-white/10"
              >
                CAREERS
              </Button>
              <Button size="sm" className="font-mono text-xs bg-primary hover:bg-primary/90">
                BUY NOW
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © 2025 ManageKube. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-white">
              Security
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-white">
              Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
