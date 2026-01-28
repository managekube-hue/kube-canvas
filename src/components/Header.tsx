import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "METHODOLOGY",
    children: [
      { label: "Assess → Remediate → Manage → Optimize", href: "#methodology" },
    ],
  },
  {
    label: "KUBES",
    children: [
      { label: "Assessment Kube", href: "#assessment" },
      { label: "Compliance Kube", href: "#compliance" },
      { label: "MSSP Kube", href: "#mssp" },
      { label: "MSP Kube", href: "#msp" },
      { label: "Advisory Kube", href: "#advisory" },
      { label: "Innovation Kube", href: "#innovation" },
      { label: "Industry Kube", href: "#industry" },
      { label: "Product Kube", href: "#product" },
    ],
  },
  {
    label: "INDUSTRY",
    children: [
      { label: "Manufacturing (M2BLOCK)", href: "#m2block" },
      { label: "Healthcare (H2BLOCK)", href: "#h2block" },
      { label: "Financial Services (F2BLOCK)", href: "#f2block" },
      { label: "Retail (R2BLOCK)", href: "#r2block" },
      { label: "Transportation (T2BLOCK)", href: "#t2block" },
      { label: "Mining & Extraction (ME2BLOCK)", href: "#me2block" },
      { label: "Energy & Utilities (EU2BLOCK)", href: "#eu2block" },
      { label: "Public Sector (PS2BLOCK)", href: "#ps2block" },
      { label: "Telecom (TC2BLOCK)", href: "#tc2block" },
    ],
  },
  {
    label: "COMPLIANCE",
    children: [
      { label: "NIST 800-53", href: "#nist" },
      { label: "SOC 2", href: "#soc2" },
      { label: "HIPAA", href: "#hipaa" },
      { label: "CMMC", href: "#cmmc" },
      { label: "ISO 27001", href: "#iso27001" },
      { label: "PCI DSS", href: "#pcidss" },
    ],
  },
  {
    label: "PRICING",
    children: [
      { label: "Small Business Templates", href: "#smb-pricing" },
      { label: "Precision Pay™", href: "#precision-pay" },
      { label: "Flex Core™", href: "#flex-core" },
      { label: "Outcome-Based", href: "#outcome-based" },
      { label: "Project Credits™", href: "#project-credits" },
      { label: "Fractional™", href: "#fractional" },
      { label: "Hybrid Commit™", href: "#hybrid-commit" },
    ],
  },
  { label: "SHOP", href: "#shop" },
  {
    label: "ABOUT",
    children: [
      { label: "Our Story", href: "#story" },
      { label: "Partners (Dell, IBM)", href: "#partners" },
      { label: "Careers", href: "#careers" },
    ],
  },
  { label: "CONTACT", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto h-20 flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex flex-col">
          <span className="font-display text-xl lg:text-2xl text-foreground tracking-wide">
            MANAGEKUBE
          </span>
        </a>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-foreground hover:bg-muted rounded transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full-screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 bg-background z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-border">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className="w-full flex items-center justify-between py-4 text-left"
                        >
                          <span className="font-mono text-sm uppercase tracking-widest text-foreground">
                            {item.label}
                          </span>
                          {expandedItem === item.label ? (
                            <ChevronDown size={20} className="text-muted-foreground" />
                          ) : (
                            <ChevronRight size={20} className="text-muted-foreground" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-4 space-y-2">
                                {item.children.map((child) => (
                                  <a
                                    key={child.label}
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-4 font-mono text-sm uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA in menu */}
              <div className="mt-8 pt-8 border-t border-border">
                <a
                  href="#assessment"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary inline-block text-center w-full sm:w-auto"
                >
                  START FREE ASSESSMENT
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
