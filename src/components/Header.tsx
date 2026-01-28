/** DO NOT TOUCH - Comprehensive header with full navigation structure */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/** DO NOT TOUCH - Complete navigation structure */
interface NavChild {
  label: string;
  href: string;
}

interface NavSubCategory {
  label: string;
  children: NavChild[];
}

interface NavItem {
  label: string;
  href?: string;
  children?: (NavChild | NavSubCategory)[];
}

const isSubCategory = (item: NavChild | NavSubCategory): item is NavSubCategory => {
  return 'children' in item;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Methodology",
    href: "/methodology",
  },
  {
    label: "Kubes",
    children: [
      {
        label: "Assessment Kube",
        children: [
          { label: "Infrastructure Inventory", href: "/kubes/assessment-kube#infrastructure" },
          { label: "Security Assessment", href: "/kubes/assessment-kube#security" },
          { label: "Compliance Mapping", href: "/kubes/assessment-kube#compliance" },
          { label: "Remediation Roadmap", href: "/kubes/assessment-kube#roadmap" },
        ],
      },
      {
        label: "Compliance Kube",
        children: [
          { label: "Gap Remediation Planning", href: "/kubes/compliance-kube#gap" },
          { label: "Evidence Automation", href: "/kubes/compliance-kube#evidence" },
          { label: "Policy Development", href: "/kubes/compliance-kube#policy" },
          { label: "Audit Management", href: "/kubes/compliance-kube#audit" },
        ],
      },
      {
        label: "MSSP Kube",
        children: [
          { label: "24/7 SOC Monitoring", href: "/kubes/mssp-kube#soc" },
          { label: "Managed EDR/XDR", href: "/kubes/mssp-kube#edr" },
          { label: "Vulnerability Management", href: "/kubes/mssp-kube#vuln" },
          { label: "Security Architecture", href: "/kubes/mssp-kube#architecture" },
        ],
      },
      {
        label: "MSP Kube",
        children: [
          { label: "Service Desk", href: "/kubes/msp-kube#servicedesk" },
          { label: "Hybrid Infrastructure", href: "/kubes/msp-kube#hybrid" },
          { label: "Managed Workplace", href: "/kubes/msp-kube#workplace" },
          { label: "BCDR", href: "/kubes/msp-kube#bcdr" },
        ],
      },
      {
        label: "Advisory Kube",
        children: [
          { label: "Virtual CISO", href: "/kubes/advisory-kube#vciso" },
          { label: "Virtual CIO", href: "/kubes/advisory-kube#vcio" },
          { label: "Cloud FinOps", href: "/kubes/advisory-kube#finops" },
          { label: "M&A Due Diligence", href: "/kubes/advisory-kube#ma" },
        ],
      },
      {
        label: "Innovation Kube",
        children: [
          { label: "Hyperautomation", href: "/kubes/innovation-kube#hyperautomation" },
          { label: "DevSecOps", href: "/kubes/innovation-kube#devsecops" },
          { label: "Data Intelligence", href: "/kubes/innovation-kube#data" },
          { label: "Custom Development", href: "/kubes/innovation-kube#custom" },
        ],
      },
      {
        label: "Industry Kube",
        children: [
          { label: "M2BLOCK (Manufacturing)", href: "/industries/manufacturing" },
          { label: "H2BLOCK (Healthcare)", href: "/industries/healthcare" },
          { label: "F2BLOCK (Financial Services)", href: "/industries/financial-services" },
          { label: "R2BLOCK (Retail)", href: "/industries/retail" },
          { label: "T2BLOCK (Transportation)", href: "/industries/transportation" },
          { label: "ME2BLOCK (Mining/Energy)", href: "/industries/mining-extraction" },
          { label: "EU2BLOCK (Energy/Utilities)", href: "/industries/energy-utilities" },
          { label: "PS2BLOCK (Public Sector)", href: "/industries/public-sector" },
          { label: "TC2BLOCK (Telecom)", href: "/industries/telecommunications" },
        ],
      },
      {
        label: "Product Kube",
        children: [
          { label: "Infrastructure & Hardware", href: "/kubes/product-kube#infrastructure" },
          { label: "Managed Workplace", href: "/kubes/product-kube#workplace" },
          { label: "Cloud & Data", href: "/kubes/product-kube#cloud" },
          { label: "Security Implementation", href: "/kubes/product-kube#security" },
          { label: "Automation & Development", href: "/kubes/product-kube#automation" },
        ],
      },
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
      { label: "Mining/Energy", href: "/industries/mining-extraction" },
      { label: "Energy/Utilities", href: "/industries/energy-utilities" },
      { label: "Public Sector", href: "/industries/public-sector" },
      { label: "Telecom", href: "/industries/telecommunications" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Resources",
    children: [
      { label: "Methodology Overview (PDF)", href: "/methodology" },
      { label: "Case Studies", href: "/about#cases" },
      { label: "Compliance Matrix", href: "/kubes/compliance-kube" },
      { label: "Assessment Calculator", href: "/assessment" },
    ],
  },
  {
    label: "Partners",
    children: [
      { label: "Dell Technologies", href: "/about#partners" },
      { label: "IBM", href: "/about#partners" },
      { label: "Technology Alliances", href: "/about#alliances" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Login",
    children: [
      { label: "Partner Portal", href: "/login/partner" },
      { label: "Client Portal", href: "/login/client" },
    ],
  },
];
/** END DO NOT TOUCH - Navigation structure */

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
    setExpandedSubItem(null);
  };

  const toggleSubExpanded = (label: string) => {
    setExpandedSubItem(expandedSubItem === label ? null : label);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
    setExpandedSubItem(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="container mx-auto h-20 lg:h-24 flex items-center justify-between px-6 lg:px-12">
        {/* Text Logo - Manage (black) Kube (orange) - LARGE */}
        <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
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
            className="fixed inset-0 top-20 lg:top-24 bg-white z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-6 lg:px-12 py-8">
              <nav className="space-y-0">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-border">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className="w-full flex items-center justify-between py-5 text-left group"
                        >
                          <span className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-brand-orange transition-colors">
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
                              <div className="pl-4 pb-6 space-y-1">
                                {item.children.map((child) => (
                                  isSubCategory(child) ? (
                                    <div key={child.label}>
                                      <button
                                        onClick={() => toggleSubExpanded(child.label)}
                                        className="w-full flex items-center justify-between py-3 text-left group"
                                      >
                                        <span className="text-lg font-semibold text-foreground group-hover:text-brand-orange transition-colors">
                                          {child.label}
                                        </span>
                                        {expandedSubItem === child.label ? (
                                          <ChevronDown size={18} className="text-muted-foreground" />
                                        ) : (
                                          <ChevronRight size={18} className="text-muted-foreground" />
                                        )}
                                      </button>
                                      <AnimatePresence>
                                        {expandedSubItem === child.label && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="pl-4 pb-3 space-y-1">
                                              {child.children.map((subChild) => (
                                                <Link
                                                  key={subChild.label}
                                                  to={subChild.href}
                                                  onClick={closeMenu}
                                                  className="block py-2 text-base text-muted-foreground hover:text-brand-orange transition-colors"
                                                >
                                                  {subChild.label}
                                                </Link>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ) : (
                                    <Link
                                      key={child.label}
                                      to={child.href}
                                      onClick={closeMenu}
                                      className="block py-3 text-lg text-muted-foreground hover:text-brand-orange transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href || "/"}
                        onClick={closeMenu}
                        className="block py-5 text-xl lg:text-2xl font-bold text-foreground hover:text-brand-orange transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  to="/assessment"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-orange/90 transition-colors"
                >
                  Start Free Assessment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
/** END DO NOT TOUCH */
