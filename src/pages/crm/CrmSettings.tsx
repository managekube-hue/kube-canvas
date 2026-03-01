import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Clock, Shield } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CrmUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  is_active: boolean;
}

interface SLAConfig {
  id: string;
  name: string;
  priority: string;
  response_minutes: number;
  resolve_minutes: number;
}

export default function CrmSettings() {
  const { isAdmin } = useCrmUser();
  const [users, setUsers] = useState<CrmUser[]>([]);
  const [slaConfigs, setSlaConfigs] = useState<SLAConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ email: "", first_name: "", last_name: "", role: "technician" });

  useEffect(() => {
    if (!isAdmin) return;
    fetchData();
  }, [isAdmin]);

  async function fetchData() {
    const [usersRes, slaRes] = await Promise.all([
      supabase.from("crm_users").select("*").order("created_at", { ascending: false }),
      supabase.from("crm_sla_configs").select("*").order("name, priority"),
    ]);
    if (usersRes.data) setUsers(usersRes.data as CrmUser[]);
    if (slaRes.data) setSlaConfigs(slaRes.data as SLAConfig[]);
    setLoading(false);
  }

  async function handleCreateUser() {
    if (!form.email) return;
    const { error } = await supabase.from("crm_users").insert({
      email: form.email,
      first_name: form.first_name || null,
      last_name: form.last_name || null,
      role: form.role,
    });
    if (error) toast.error("Failed to create user");
    else {
      toast.success("User created");
      setForm({ email: "", first_name: "", last_name: "", role: "technician" });
      setDialogOpen(false);
      fetchData();
    }
  }

  async function toggleUserStatus(userId: string, isActive: boolean) {
    const { error } = await supabase.from("crm_users").update({ is_active: !isActive }).eq("id", userId);
    if (error) toast.error("Update failed");
    else { toast.success(isActive ? "User deactivated" : "User activated"); fetchData(); }
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Admin access required</p>
      </div>
    );
  }

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">CRM Settings</h2>
        <p className="text-sm text-muted-foreground">Manage users, SLA configurations, and system settings</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users"><Users className="h-4 w-4 mr-1" /> Users</TabsTrigger>
          <TabsTrigger value="sla"><Clock className="h-4 w-4 mr-1" /> SLA Configs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{users.length} users</p>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New CRM User</DialogTitle></DialogHeader>
                <div className="space-y-3 pt-2">
                  <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>First Name</Label><Input value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} /></div>
                    <div><Label>Last Name</Label><Input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} /></div>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select value={form.role} onValueChange={v => setForm(f => ({ ...f, role: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="account_manager">Account Manager</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="dispatcher">Dispatcher</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateUser} className="w-full">Create User</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-2">
            {users.map(u => (
              <Card key={u.id} className="border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{u.first_name} {u.last_name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={u.is_active ? "default" : "secondary"} className="capitalize">
                      {u.role.replace("_", " ")}
                    </Badge>
                    <Button size="sm" variant={u.is_active ? "outline" : "default"} onClick={() => toggleUserStatus(u.id, u.is_active)}>
                      {u.is_active ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sla" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">{slaConfigs.length} SLA configurations</p>
          <div className="grid gap-2">
            {slaConfigs.map(sla => (
              <Card key={sla.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{sla.name}</p>
                    <Badge className="capitalize">{sla.priority}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium text-foreground">{sla.response_minutes} minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Resolution Time</p>
                      <p className="font-medium text-foreground">{sla.resolve_minutes} minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
