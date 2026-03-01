import { Button } from "@/components/ui/button";
import { Trash2, Download, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onExport: () => void;
  onBulkUpdate?: () => void;
  disabled?: boolean;
}

export function BulkActions({ selectedCount, onDelete, onExport, onBulkUpdate, disabled }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md border border-primary/20">
      <span className="text-sm font-medium text-foreground">{selectedCount} selected</span>
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={onExport}>
          <Download className="h-3.5 w-3.5 mr-1" /> Export
        </Button>
        {onBulkUpdate && (
          <Button size="sm" variant="outline" onClick={onBulkUpdate}>
            <Edit className="h-3.5 w-3.5 mr-1" /> Update
          </Button>
        )}
        <Button size="sm" variant="destructive" onClick={onDelete} disabled={disabled}>
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
