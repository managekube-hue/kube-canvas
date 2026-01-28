import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Methodology",
    href: "/methodology",
  },
  {
    label: "Kubes",
    children: [
      { label: "Assessment Kube", href: "/kubes/assessment-kube" },
      { label: "Compliance Kube", href: "/kubes/compliance-kube" },
      { label: "MSSP Kube", href: "/kubes/mssp-kube" },
      { label: "MSP Kube", href: "/kubes/msp-kube" },
      { label: "Advisory Kube", href: "/kubes/advisory-kube" },
      { label: "Innovation Kube", href: "/kubes/innovation-kube" },
      { label: "Industry Kube", href: "/kubes/industry-kube" },
      { label: "Product Kube", href: "/kubes/product-kube" },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Transportation", href: "/industries/transportation" },
      { label: "Mining & Extraction", href: "/industries/mining-extraction" },
      { label: "Energy & Utilities", href: "/industries/energy-utilities" },
      { label: "Public Sector", href: "/industries/public-sector" },
      { label: "Telecommunications", href: "/industries/telecommunications" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto h-16 lg:h-20 flex items-center justify-between px-6 lg:px-12">
        {/* Text Logo - Manage (black) Kube (orange) */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-2xl lg:text-3xl font-bold tracking-tight">
            <span className="text-foreground">Manage</span>
            <span className="text-brand-orange">Kube</span>
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 text-foreground hover:text-muted-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Full-screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 lg:top-28 bg-background z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-6 lg:px-12 py-12">
              <nav className="space-y-0">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-border">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className="w-full flex items-center justify-between py-6 text-left group"
                        >
                          <span className="text-title text-foreground group-hover:text-brand-orange transition-colors">
                            {item.label}
                          </span>
                          {expandedItem === item.label ? (
                            <ChevronDown size={24} className="text-muted-foreground" />
                          ) : (
                            <ChevronRight size={24} className="text-muted-foreground" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 text-body-lg text-muted-foreground hover:text-brand-orange transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href || "/"}
                        onClick={() => setIsOpen(false)}
                        className="block py-6 text-title text-foreground hover:text-brand-orange transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-12">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
