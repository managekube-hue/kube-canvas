import { Link, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { Footer } from "@/components/Footer";

const NAV_LINKS = [
  { label: "Home", href: "/uidr" },
  { label: "Platform", href: "/uidr/platform" },
  { label: "Documentation", href: "/uidr/docs" },
  { label: "Technical Docs", href: "/uidr/technical-docs" },
  { label: "Contributors", href: "/uidr/contributors" },
  { label: "Open Source", href: "/uidr/open-source" },
  { label: "Contact", href: "/uidr/contact" },
];

export const UidrLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <Link to="/documentation" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <Settings size={13} className="text-blue-500" />
          </div>
          <span className="font-bold text-sm tracking-wider text-white">KUBRIC</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.href || 
              (link.href !== "/uidr" && location.pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-1.5 text-sm rounded transition-colors ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          to="/uidr/docs"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Content */}
      <div className="pt-14">
        {children}
      </div>

      <PathfinderCTA />
      <Footer />
    </div>
  );
};
