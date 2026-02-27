import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCrmUser } from "@/hooks/useCrmUser";
import {
  Building2, Users, BarChart3, Ticket, FileText, Package,
  Calendar, Settings, LogOut, ChevronLeft, ChevronRight,
  LayoutDashboard, Briefcase, Clock, Shield, Menu, Upload, Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/crm" },
  { label: "Lead Pipeline", icon: BarChart3, path: "/crm/leads" },
  { label: "CSV Upload", icon: Upload, path: "/crm/bulk-upload" },
  { label: "Careers", icon: Megaphone, path: "/crm/careers" },
  { label: "Organizations", icon: Building2, path: "/crm/organizations" },
  { label: "Contacts", icon: Users, path: "/crm/contacts" },
  { label: "Deals", icon: Briefcase, path: "/crm/deals" },
  { label: "Tickets", icon: Ticket, path: "/crm/tickets" },
  { label: "Time Tracking", icon: Clock, path: "/crm/time" },
  { label: "Contracts", icon: FileText, path: "/crm/contracts" },
  { label: "Invoices", icon: BarChart3, path: "/crm/invoices" },
  { label: "Assets", icon: Package, path: "/crm/assets" },
  { label: "Deployments", icon: Calendar, path: "/crm/deployments" },
  { label: "Audit Log", icon: Shield, path: "/crm/audit", adminOnly: true },
  { label: "Settings", icon: Settings, path: "/crm/settings", adminOnly: true },
];

export function CrmLayout() {
  const { crmUser, loading, error, isAdmin } = useCrmUser();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error === "no_access" || !crmUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md p-8">
          <Shield className="h-12 w-12 mx-auto text-destructive" />
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have CRM access. Contact your administrator to be added as a CRM user.
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Site</Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  const visibleNav = navItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-border">
          {!collapsed && (
            <Link to="/crm" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MK</span>
              </div>
              <span className="font-semibold text-foreground text-sm">ManageKube CRM</span>
            </Link>
          )}
          {collapsed && (
            <div className="h-8 w-8 mx-auto rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MK</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {visibleNav.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/crm" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-2 space-y-1">
          <div className={cn("flex items-center gap-2 px-3 py-2", collapsed && "justify-center")}>
            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary">
                {crmUser.first_name?.[0] || crmUser.email[0].toUpperCase()}
              </span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {crmUser.first_name} {crmUser.last_name}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">{crmUser.role.replace("_", " ")}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full py-1.5 text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border flex items-center px-4 lg:px-6 bg-card">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            {visibleNav.find(n => 
              location.pathname === n.path || 
              (n.path !== "/crm" && location.pathname.startsWith(n.path))
            )?.label || "CRM"}
          </h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
