import { Plus, Building2, Users, Briefcase, Ticket, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function QuickCreate() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Quick Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate("/crm/organizations")}>
          <Building2 className="h-4 w-4 mr-2" /> Organization
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/crm/contacts")}>
          <Users className="h-4 w-4 mr-2" /> Contact
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/crm/deals")}>
          <Briefcase className="h-4 w-4 mr-2" /> Deal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/crm/tickets")}>
          <Ticket className="h-4 w-4 mr-2" /> Ticket
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/crm/contracts")}>
          <FileText className="h-4 w-4 mr-2" /> Contract
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/crm/invoices")}>
          <FileText className="h-4 w-4 mr-2" /> Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
