import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "METHODOLOGY", href: "#methodology" },
  { label: "KUBES", href: "#kubes" },
  { label: "INDUSTRY", href: "#industry" },
  { label: "COMPLIANCE", href: "#compliance" },
  { label: "SERVICES", href: "#services" },
  { label: "DOCKUBE", href: "#dockube" },
  { label: "CAREERS", href: "#careers" },
  { label: "SHOP", href: "#shop" },
  { label: "PRICING", href: "#pricing" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
  { label: "PARTNERS", href: "#partners" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
        <div className="flex flex-col">
          <span className="font-display text-xl lg:text-2xl text-white tracking-wide">
            MANAGEKUBE
          </span>
          <span className="font-mono text-[10px] lg:text-xs text-white/70 tracking-wider hidden sm:block">
            MAKING COMPLEX IT UNDERSTANDABLE
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {navLinks.slice(0, 8).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[10px] 2xl:text-xs"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider px-6"
          >
            GET ASSESSMENT
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <nav className="container mx-auto py-6 px-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm uppercase tracking-wider mt-4"
              >
                GET ASSESSMENT
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
