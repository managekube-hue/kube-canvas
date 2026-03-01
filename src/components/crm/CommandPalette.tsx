import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Building2, Users, Briefcase, Ticket, FileText, DollarSign, Package, Calendar, Settings, Activity } from "lucide-react";

interface Command {
  id: string;
  label: string;
  icon: any;
  action: () => void;
  keywords: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands: Command[] = [
    { id: "new-org", label: "New Organization", icon: Building2, action: () => navigate("/crm/organizations"), keywords: ["create", "add", "organization", "company"] },
    { id: "new-contact", label: "New Contact", icon: Users, action: () => navigate("/crm/contacts"), keywords: ["create", "add", "contact", "person"] },
    { id: "new-deal", label: "New Deal", icon: Briefcase, action: () => navigate("/crm/deals"), keywords: ["create", "add", "deal", "opportunity"] },
    { id: "new-ticket", label: "New Ticket", icon: Ticket, action: () => navigate("/crm/tickets"), keywords: ["create", "add", "ticket", "support"] },
    { id: "new-contract", label: "New Contract", icon: FileText, action: () => navigate("/crm/contracts"), keywords: ["create", "add", "contract"] },
    { id: "new-invoice", label: "New Invoice", icon: DollarSign, action: () => navigate("/crm/invoices"), keywords: ["create", "add", "invoice", "bill"] },
    { id: "orgs", label: "View Organizations", icon: Building2, action: () => navigate("/crm/organizations"), keywords: ["view", "list", "organizations"] },
    { id: "contacts", label: "View Contacts", icon: Users, action: () => navigate("/crm/contacts"), keywords: ["view", "list", "contacts"] },
    { id: "deals", label: "View Deals", icon: Briefcase, action: () => navigate("/crm/deals"), keywords: ["view", "list", "deals", "pipeline"] },
    { id: "tickets", label: "View Tickets", icon: Ticket, action: () => navigate("/crm/tickets"), keywords: ["view", "list", "tickets"] },
    { id: "assets", label: "View Assets", icon: Package, action: () => navigate("/crm/assets"), keywords: ["view", "list", "assets", "inventory"] },
    { id: "deployments", label: "View Deployments", icon: Calendar, action: () => navigate("/crm/deployments"), keywords: ["view", "list", "deployments"] },
    { id: "settings", label: "Settings", icon: Settings, action: () => navigate("/crm/settings"), keywords: ["settings", "config", "admin"] },
    { id: "audit", label: "Audit Log", icon: Activity, action: () => navigate("/crm/audit"), keywords: ["audit", "log", "history"] },
  ];

  const filtered = commands.filter(cmd => {
    const q = search.toLowerCase();
    return cmd.label.toLowerCase().includes(q) || cmd.keywords.some(k => k.includes(q));
  });

  const handleSelect = (cmd: Command) => {
    cmd.action();
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-lg">
        <Input
          placeholder="Type a command or search... (Ctrl+K)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border-0 border-b rounded-none focus-visible:ring-0"
          autoFocus
        />
        <div className="max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No results</p>
          ) : (
            filtered.map(cmd => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
              >
                <cmd.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{cmd.label}</span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
