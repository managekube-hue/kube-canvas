import { Construction } from "lucide-react";

export default function CrmPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Construction className="h-12 w-12 text-muted-foreground/40 mb-4" />
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">This module is coming in the next build phase.</p>
    </div>
  );
}
