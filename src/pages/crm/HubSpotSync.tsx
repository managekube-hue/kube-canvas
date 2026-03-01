import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SyncStatus {
  id: string;
  email: string;
  hubspot_synced: boolean;
  hubspot_synced_at: string | null;
  hubspot_contact_id: string | null;
  error_message: string | null;
  created_at: string;
}

export default function HubSpotSync() {
  const [syncs, setSyncs] = useState<SyncStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchSyncStatus();
  }, []);

  async function fetchSyncStatus() {
    const { data } = await supabase
      .from("lead_exports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setSyncs(data as SyncStatus[]);
    setLoading(false);
  }

  async function handleRetrySync(id: string) {
    setSyncing(true);
    const { error } = await supabase.functions.invoke("hubspot-retry-sync", {
      body: { lead_export_id: id },
    });
    if (error) toast.error("Retry failed");
    else toast.success("Sync queued");
    setSyncing(false);
    fetchSyncStatus();
  }

  async function handleBulkSync() {
    setSyncing(true);
    const failedIds = syncs.filter(s => !s.hubspot_synced && s.error_message).map(s => s.id);
    
    for (const id of failedIds) {
      await supabase.functions.invoke("hubspot-retry-sync", { body: { lead_export_id: id } });
    }
    
    toast.success(`Queued ${failedIds.length} retries`);
    setSyncing(false);
    fetchSyncStatus();
  }

  const stats = {
    total: syncs.length,
    synced: syncs.filter(s => s.hubspot_synced).length,
    failed: syncs.filter(s => !s.hubspot_synced && s.error_message).length,
    pending: syncs.filter(s => !s.hubspot_synced && !s.error_message).length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">HubSpot Sync</h2>
          <p className="text-sm text-muted-foreground">Monitor and manage HubSpot contact synchronization</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={fetchSyncStatus} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button size="sm" onClick={handleBulkSync} disabled={syncing || stats.failed === 0}>
            Retry Failed ({stats.failed})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Contacts</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">{stats.synced}</p>
            <p className="text-xs text-muted-foreground">Synced</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
            <p className="text-xs text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        {syncs.map(sync => (
          <Card key={sync.id} className="border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {sync.hubspot_synced ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : sync.error_message ? (
                  <XCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-600" />
                )}
                <div>
                  <p className="font-medium text-foreground text-sm">{sync.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {sync.hubspot_synced
                      ? `Synced ${new Date(sync.hubspot_synced_at!).toLocaleString()}`
                      : sync.error_message
                      ? sync.error_message
                      : "Pending sync"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {sync.hubspot_contact_id && (
                  <Badge variant="outline" className="text-xs">ID: {sync.hubspot_contact_id.slice(0, 8)}</Badge>
                )}
                {!sync.hubspot_synced && (
                  <Button size="sm" variant="outline" onClick={() => handleRetrySync(sync.id)} disabled={syncing}>
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> Retry
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
