import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Edit2 } from "lucide-react";

interface InlineEditProps {
  value: string | number | null;
  onSave: (value: string) => Promise<void>;
  type?: "text" | "email" | "number" | "textarea";
  placeholder?: string;
}

export function InlineEdit({ value, onSave, type = "text", placeholder }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(editValue);
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value?.toString() || "");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div
        className="group flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
        onClick={() => setEditing(true)}
      >
        <span className="text-sm text-foreground">{value || placeholder || "—"}</span>
        <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {type === "textarea" ? (
        <Textarea
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          className="h-20"
          autoFocus
        />
      ) : (
        <Input
          type={type}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          className="h-8"
          autoFocus
          onKeyDown={e => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
      )}
      <button
        onClick={handleSave}
        disabled={saving}
        className="p-1 hover:bg-green-500/10 rounded text-green-600"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={handleCancel}
        disabled={saving}
        className="p-1 hover:bg-red-500/10 rounded text-red-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
