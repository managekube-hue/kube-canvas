import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Star, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface FilterPreset {
  id: string;
  name: string;
  filters: any;
}

interface SavedFiltersProps {
  currentFilters: any;
  onLoadPreset: (filters: any) => void;
  storageKey: string;
}

export function SavedFilters({ currentFilters, onLoadPreset, storageKey }: SavedFiltersProps) {
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setPresets(JSON.parse(saved));
  }, [storageKey]);

  function savePresets(newPresets: FilterPreset[]) {
    localStorage.setItem(storageKey, JSON.stringify(newPresets));
    setPresets(newPresets);
  }

  function handleSave() {
    if (!presetName.trim()) return;
    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName,
      filters: currentFilters,
    };
    savePresets([...presets, newPreset]);
    toast.success("Filter preset saved");
    setPresetName("");
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    savePresets(presets.filter(p => p.id !== id));
    toast.success("Preset deleted");
  }

  function handleLoad(preset: FilterPreset) {
    onLoadPreset(preset.filters);
    toast.success(`Loaded "${preset.name}"`);
  }

  const hasActiveFilters = Object.values(currentFilters).some(v => v);

  return (
    <div className="flex items-center gap-2">
      {presets.map(preset => (
        <div key={preset.id} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
          <button
            onClick={() => handleLoad(preset)}
            className="text-xs text-foreground hover:text-primary transition-colors"
          >
            <Star className="h-3 w-3 inline mr-1" />
            {preset.name}
          </button>
          <button
            onClick={() => handleDelete(preset.id)}
            className="text-xs text-muted-foreground hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      ))}
      
      {hasActiveFilters && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Save className="h-3.5 w-3.5 mr-1" /> Save Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Save Filter Preset</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <Input
                placeholder="Preset name (e.g., High Priority Open)"
                value={presetName}
                onChange={e => setPresetName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSave()}
              />
              <Button onClick={handleSave} className="w-full">Save Preset</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
