import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Download } from "lucide-react";

interface ExportLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  onSuccess?: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const ExportLeadModal = ({ isOpen, onClose, data, onSuccess }: ExportLeadModalProps) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    business_name: "",
    role: "",
    email: "",
    phone: "",
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!consent) {
      setError("You must consent to download");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Valid email required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/export-lead-to-csv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, export_data: data }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Export failed");
      }

      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="(.+)"/);
      const filename = match ? match[1] : `vulnerability_export_${new Date().toISOString().split("T")[0]}.csv`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      onSuccess?.();
      onClose();
      setForm({ first_name: "", last_name: "", business_name: "", role: "", email: "", phone: "" });
      setConsent(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download CSV Export</DialogTitle>
          <DialogDescription>
            Enter your information to download the vulnerability data as CSV.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="First Name *"
            value={form.first_name}
            onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
            required
          />
          <Input
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
          />
          <Input
            placeholder="Business Name *"
            value={form.business_name}
            onChange={(e) => setForm((p) => ({ ...p, business_name: e.target.value }))}
            required
          />
          <Input
            placeholder="Your Role (e.g. CISO, IT Director) *"
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            required
          />
          <Input
            type="email"
            placeholder="Business Email *"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <Input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
          <div className="flex items-center gap-2 mt-1">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
            />
            <label htmlFor="consent" className="text-xs text-muted-foreground cursor-pointer">
              I consent to share this information for CSV download.{" "}
              <a href="/privacy" className="underline">Privacy Policy</a>
            </label>
          </div>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</p>
          )}
          <div className="flex gap-3 mt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {loading ? "Processing..." : "Download CSV"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
