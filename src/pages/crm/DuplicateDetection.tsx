import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Merge } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Duplicate {
  id1: string;
  id2: string;
  contact1: any;
  contact2: any;
  similarity: number;
}

export default function DuplicateDetection() {
  const [duplicates, setDuplicates] = useState<Duplicate[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergeDialog, setMergeDialog] = useState<Duplicate | null>(null);

  async function detectDuplicates() {
    setLoading(true);
    const { data: contacts } = await supabase
      .from("crm_contacts")
      .select("*");

    if (!contacts) {
      setLoading(false);
      return;
    }

    const dups: Duplicate[] = [];
    
    for (let i = 0; i < contacts.length; i++) {
      for (let j = i + 1; j < contacts.length; j++) {
        const c1 = contacts[i];
        const c2 = contacts[j];
        
        let similarity = 0;
        
        // Email match
        if (c1.email && c2.email && c1.email.toLowerCase() === c2.email.toLowerCase()) {
          similarity += 50;
        }
        
        // Name similarity
        const name1 = `${c1.first_name} ${c1.last_name}`.toLowerCase();
        const name2 = `${c2.first_name} ${c2.last_name}`.toLowerCase();
        if (name1 === name2) similarity += 30;
        
        // Phone match
        if (c1.phone && c2.phone && c1.phone.replace(/\D/g, "") === c2.phone.replace(/\D/g, "")) {
          similarity += 20;
        }

        if (similarity >= 50) {
          dups.push({
            id1: c1.id,
            id2: c2.id,
            contact1: c1,
            contact2: c2,
            similarity,
          });
        }
      }
    }

    setDuplicates(dups);
    setLoading(false);
    toast.success(`Found ${dups.length} potential duplicates`);
  }

  async function mergeDuplicates(dup: Duplicate, keepId: string) {
    const discardId = keepId === dup.id1 ? dup.id2 : dup.id1;
    
    // Update all references to point to kept record
    await Promise.all([
      supabase.from("crm_activities").update({ contact_id: keepId }).eq("contact_id", discardId),
      supabase.from("crm_deals").update({ contact_id: keepId }).eq("contact_id", discardId),
      supabase.from("crm_tickets").update({ contact_id: keepId }).eq("contact_id", discardId),
    ]);

    // Delete duplicate
    const { error } = await supabase.from("crm_contacts").delete().eq("id", discardId);
    
    if (error) {
      toast.error("Merge failed");
      return;
    }

    toast.success("Contacts merged");
    setMergeDialog(null);
    setDuplicates(dups => dups.filter(d => d.id1 !== dup.id1 || d.id2 !== dup.id2));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Duplicate Detection</h2>
          <p className="text-sm text-muted-foreground">Find and merge duplicate contacts</p>
        </div>
        <Button onClick={detectDuplicates} disabled={loading}>
          <AlertTriangle className="h-4 w-4 mr-1" /> Scan for Duplicates
        </Button>
      </div>

      {duplicates.length === 0 ? (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              {loading ? "Scanning..." : "No duplicates found. Click scan to check."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {duplicates.map((dup, i) => (
            <Card key={i} className="border-border border-orange-500/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="destructive">{dup.similarity}% Match</Badge>
                  <Button size="sm" onClick={() => setMergeDialog(dup)}>
                    <Merge className="h-3.5 w-3.5 mr-1" /> Merge
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {dup.contact1.first_name} {dup.contact1.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{dup.contact1.email}</p>
                    <p className="text-xs text-muted-foreground">{dup.contact1.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {dup.contact2.first_name} {dup.contact2.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{dup.contact2.email}</p>
                    <p className="text-xs text-muted-foreground">{dup.contact2.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {mergeDialog && (
        <Dialog open={!!mergeDialog} onOpenChange={() => setMergeDialog(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Merge Contacts</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground">Which contact should we keep?</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => mergeDuplicates(mergeDialog, mergeDialog.id1)}>
                  Keep {mergeDialog.contact1.first_name}
                </Button>
                <Button variant="outline" onClick={() => mergeDuplicates(mergeDialog, mergeDialog.id2)}>
                  Keep {mergeDialog.contact2.first_name}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
