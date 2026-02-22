/**
 * DO NOT TOUCH - Page Breadcrumb Navigation Component
 * Consistent breadcrumb navigation for all inner pages
 */

import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items?: BreadcrumbItem[];
}

// Route to readable name mapping
const routeLabels: Record<string, string> = {
  "": "Home",
  "methodology": "Methodology",
  "kubes": "Service Layer",
  "assessment-kube": "Assessment",
  "compliance-kube": "Compliance",
  "mssp-kube": "Managed SOC",
  "msp-kube": "Managed NOC",
  "advisory-kube": "Advisory",
  "innovation-kube": "Innovation",
  "industry-kube": "Industry Solutions",
  "product-kube": "Service Tiers",
  "industries": "Industries",
  "manufacturing": "Manufacturing",
  "healthcare": "Healthcare",
  "financial-services": "Financial Services",
  "retail": "Retail",
  "transportation": "Transportation",
  "mining-extraction": "Mining & Extraction",
  "energy-utilities": "Energy & Utilities",
  "public-sector": "Public Sector",
  "telecommunications": "Telecommunications",
  "pricing": "Pricing",
  "about": "About",
  "contact": "Contact",
  "careers": "Careers",
  "assessment": "Assessment",
  "find-by-problem": "Find by Problem",
  "find-by-size": "Find by Size",
  "solutions": "Solutions",
  "login": "Login",
  "partner": "Partner Portal",
  "client": "Client Portal",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
};

export const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [];
    
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      crumbs.push({
        label: routeLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        href: isLast ? undefined : currentPath,
      });
    });
    
    return crumbs;
  })();

  // Don't show breadcrumb on home page
  if (location.pathname === "/" || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-secondary border-b border-border"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <ol className="flex items-center gap-2 py-4 text-sm overflow-x-auto">
          {/* Home link */}
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>

          {/* Breadcrumb items */}
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-1 flex-shrink-0" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
