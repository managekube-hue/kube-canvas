/**
 * DO NOT TOUCH - Page Layout with Header, Footer, and Breadcrumb Navigation
 */

import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

export const PageLayout = ({ children, showBreadcrumb = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showBreadcrumb && <PageBreadcrumb />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};
