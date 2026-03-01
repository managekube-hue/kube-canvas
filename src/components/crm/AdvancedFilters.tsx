import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface AdvancedFiltersProps {
  filters: {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
  };
  onFiltersChange: (filters: any) => void;
  statusOptions?: FilterOption[];
  priorityOptions?: FilterOption[];
  userOptions?: FilterOption[];
}

export function AdvancedFilters({ filters, onFiltersChange, statusOptions, priorityOptions, userOptions }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false);
  const activeCount = Object.values(filters).filter(v => v).length;

  const clearFilters = () => {
    onFiltersChange({});
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-1" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Advanced Filters</h4>
            {activeCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-3 w-3 mr-1" /> Clear
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">From Date</Label>
              <Input
                type="date"
                value={filters.dateFrom || ""}
                onChange={e => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">To Date</Label>
              <Input
                type="date"
                value={filters.dateTo || ""}
                onChange={e => onFiltersChange({ ...filters, dateTo: e.target.value })}
                className="h-8"
              />
            </div>
          </div>

          {statusOptions && (
            <div>
              <Label className="text-xs">Status</Label>
              <Select value={filters.status || "all"} onValueChange={v => onFiltersChange({ ...filters, status: v === "all" ? "" : v })}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {priorityOptions && (
            <div>
              <Label className="text-xs">Priority</Label>
              <Select value={filters.priority || "all"} onValueChange={v => onFiltersChange({ ...filters, priority: v === "all" ? "" : v })}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorityOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {userOptions && (
            <div>
              <Label className="text-xs">Assigned To</Label>
              <Select value={filters.assignedTo || "all"} onValueChange={v => onFiltersChange({ ...filters, assignedTo: v === "all" ? "" : v })}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {userOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
