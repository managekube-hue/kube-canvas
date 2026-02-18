import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { docModules, categoryLabels, categoryColors } from "@/data/docs-modules";
import { ChevronDown, ChevronRight, BookOpen, Menu, X } from "lucide-react";

const categoryOrder = ["endpoint", "network", "cloud", "identity", "data", "governance", "operations", "intelligence"];

const topLinks = [
  { label: "Overview", href: "/docs" },
  { label: "NATS Message Bus", href: "/docs/nats" },
  { label: "License Compliance", href: "/docs/license-matrix" },
  { label: "Monorepo Structure", href: "/docs/monorepo" },
  { label: "Integration Summary", href: "/docs/summary" },
];

export const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    endpoint: true, network: true, cloud: true, identity: true,
    data: true, governance: true, operations: true, intelligence: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <Link to="/docs" className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-brand-orange" />
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Kubric UIDR Docs</span>
        </Link>
        <nav className="space-y-0.5">
          {topLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-none transition-colors ${
                isActive(link.href)
                  ? "bg-brand-orange/10 text-brand-orange border-l-2 border-brand-orange"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 mb-3">DR Modules</p>
        <nav className="space-y-1">
          {categoryOrder.map(cat => {
            const modules = docModules.filter(m => m.category === cat);
            if (!modules.length) return null;
            const isOpen = openCategories[cat];
            return (
              <div key={cat}>
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between py-2 text-left group"
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: categoryColors[cat] }}>
                    {categoryLabels[cat]}
                  </span>
                  {isOpen
                    ? <ChevronDown size={12} className="text-muted-foreground/60" />
                    : <ChevronRight size={12} className="text-muted-foreground/60" />
                  }
                </button>
                {isOpen && (
                  <div className="ml-2 space-y-0.5 border-l border-border pl-3 mb-2">
                    {modules.map(mod => (
                      <Link
                        key={mod.id}
                        to={`/docs/${mod.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 px-2 py-1.5 text-xs font-medium transition-colors ${
                          isActive(`/docs/${mod.id}`)
                            ? "text-brand-orange"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-[10px] font-bold opacity-60 w-8 flex-shrink-0">{mod.code}</span>
                        <span className="truncate">{mod.name.split(" — ")[0]}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div style={{ height: "72px" }} />

      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 border-r border-border bg-background sticky top-[72px] h-[calc(100vh-72px)] overflow-hidden">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 bg-foreground text-white p-3 shadow-lg"
          aria-label="Open docs navigation"
        >
          <Menu size={20} />
        </button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="bg-background w-72 h-full border-r border-border overflow-hidden flex flex-col relative">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
              <SidebarContent />
            </div>
            <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <PathfinderCTA />
      <Footer />
    </div>
  );
};
