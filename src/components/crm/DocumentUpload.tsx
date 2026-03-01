import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Download } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadProps {
  entityType: "contract" | "invoice";
  entityId: string;
  existingUrl?: string | null;
  onUploadComplete: (url: string) => void;
}

export function DocumentUpload({ entityType, entityId, existingUrl, onUploadComplete }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(existingUrl);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }

    setUploading(true);
    const fileName = `${entityType}/${entityId}/${Date.now()}-${file.name}`;

    const { error: uploadError, data } = await supabase.storage
      .from("crm-documents")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("crm-documents")
      .getPublicUrl(fileName);

    setFileUrl(publicUrl);
    onUploadComplete(publicUrl);
    toast.success("File uploaded");
    setUploading(false);
  }

  async function handleDelete() {
    if (!fileUrl || !confirm("Delete this file?")) return;
    
    const path = fileUrl.split("/crm-documents/")[1];
    const { error } = await supabase.storage.from("crm-documents").remove([path]);
    
    if (error) toast.error("Delete failed");
    else {
      setFileUrl(null);
      onUploadComplete("");
      toast.success("File deleted");
    }
  }

  return (
    <div className="space-y-2">
      {fileUrl ? (
        <div className="flex items-center gap-2 p-3 border border-border rounded-md bg-muted/30">
          <File className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground flex-1 truncate">{fileUrl.split("/").pop()}</span>
          <Button size="sm" variant="ghost" onClick={() => window.open(fileUrl, "_blank")}>
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDelete}>
            <X className="h-3.5 w-3.5 text-red-600" />
          </Button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-md hover:border-primary/50 cursor-pointer transition-colors">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {uploading ? "Uploading..." : "Click to upload PDF (max 10MB)"}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
