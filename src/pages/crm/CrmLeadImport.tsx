import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, ArrowRight, Download, Users } from "lucide-react";
import { toast } from "sonner";

interface CmsLead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  source: string;
  lifecycle_stage: string | null;
  mk_recommended_tier: string | null;
  mk_ems_score: number | null;
  mk_monthly_price: number | null;
  created_at: string;
  already_imported?: boolean;
}

export default function CrmLeadImport() {
  const [leads, setLeads] = useState<CmsLead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState<Set<string>>(new Set());

  const fetchLeads = async () => {
    // Get all cms_contacts (website leads)
    const { data: cmsData } = await supabase
      .from("cms_contacts")
      .select("id, first_name, last_name, email, phone, company, job_title, source, lifecycle_stage, mk_recommended_tier, mk_ems_score, mk_monthly_price, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    // Get existing crm_contacts emails to check dupes
    const { data: crmEmails } = await supabase
      .from("crm_contacts")
      .select("email");

    const existingEmails = new Set((crmEmails || []).map((c: any) => c.email?.toLowerCase()));

    if (cmsData) {
      setLeads(cmsData.map((l: any) => ({
        ...l,
        already_imported: existingEmails.has(l.email?.toLowerCase()),
      })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const importLead = async (lead: CmsLead) => {
    setImporting(prev => new Set(prev).add(lead.id));

    // Check if org exists by company name, create if not
    let orgId: string | null = null;
    if (lead.company) {
      const { data: existingOrg } = await supabase
        .from("crm_organizations")
        .select("id")
        .ilike("name", lead.company)
        .maybeSingle();

      if (existingOrg) {
        orgId = existingOrg.id;
      } else {
        const { data: newOrg } = await supabase
          .from("crm_organizations")
          .insert({ name: lead.company, type: "prospect", status: "active" })
          .select("id")
          .single();
        if (newOrg) orgId = newOrg.id;
      }
    }

    // Create CRM contact
    const { error } = await supabase.from("crm_contacts").insert({
      first_name: lead.first_name || lead.email.split("@")[0],
      last_name: lead.last_name || null,
      email: lead.email,
      phone: lead.phone || null,
      job_title: lead.job_title || null,
      organization_id: orgId,
      source: lead.source || "website",
      lifecycle_stage: lead.lifecycle_stage || "lead",
      lead_score: lead.mk_ems_score || 0,
    });

    if (error) {
      toast.error(`Import failed: ${error.message}`);
    } else {
      toast.success(`${lead.first_name || lead.email} imported as CRM contact`);
      // Re-fetch to update import status
      fetchLeads();
    }

    setImporting(prev => {
      const next = new Set(prev);
      next.delete(lead.id);
      return next;
    });
  };

  const importAll = async () => {
    const unimported = leads.filter(l => !l.already_imported);
    if (unimported.length === 0) { toast.info("All leads already imported"); return; }
    for (const lead of unimported) {
      await importLead(lead);
    }
    toast.success(`Bulk import complete`);
  };

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return l.email.toLowerCase().includes(q) ||
      l.first_name?.toLowerCase().includes(q) ||
      l.last_name?.toLowerCase().includes(q) ||
      l.company?.toLowerCase().includes(q);
  });

  const unimportedCount = leads.filter(l => !l.already_imported).length;

  return (
    <div className="space-y-4">
      <Card className="border-border bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Lead → Customer Pipeline</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Import website leads (contact forms, assessments) into CRM contacts. 
                Auto-creates organizations from company names.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">{unimportedCount} new leads</Badge>
              {unimportedCount > 0 && (
                <Button size="sm" onClick={importAll}>
                  <Download className="h-4 w-4 mr-1" /> Import All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading leads...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No website leads found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(lead => (
            <Card key={lead.id} className={`border-border ${lead.already_imported ? "opacity-60" : ""}`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">
                    {(lead.first_name || lead.email)[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {lead.first_name || "—"} {lead.last_name || ""} 
                    {lead.company && <span className="text-muted-foreground"> · {lead.company}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{lead.email} · {lead.source}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {lead.mk_recommended_tier && (
                    <Badge variant="outline" className="text-xs">{lead.mk_recommended_tier}</Badge>
                  )}
                  {lead.mk_ems_score != null && (
                    <span className="text-xs text-muted-foreground">EMS: {lead.mk_ems_score}</span>
                  )}
                  <Badge variant="outline" className="text-xs capitalize">{lead.lifecycle_stage || "lead"}</Badge>
                  {lead.already_imported ? (
                    <Badge variant="secondary" className="text-xs">Imported</Badge>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => importLead(lead)} disabled={importing.has(lead.id)}>
                      <UserPlus className="h-3.5 w-3.5 mr-1" />
                      {importing.has(lead.id) ? "..." : "Import"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
