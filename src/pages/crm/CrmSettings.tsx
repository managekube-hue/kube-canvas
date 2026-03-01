import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser, CrmRole } from "@/hooks/useCrmUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Users, Shield, Clock, Plus, Trash2, Settings2 } from "lucide-react";
import { toast } from "sonner";

interface CrmUserRow {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: CrmRole;
  is_active: boolean;
}

interface SlaConfig {
  id: string;
  name: string;
  priority: string;
  response_minutes: number;
  resolve_minutes: number;
  business_hours_only: boolean;
}

interface BusinessHours {
  id: string;
  name: string;
  timezone: string;
  is_default: boolean;
  monday_start: string | null;
  monday_end: string | null;
  friday_start: string | null;
  friday_end: string | null;
}

const ROLES: CrmRole[] = ["super_admin", "admin", "account_manager", "technician", "dispatcher", "billing", "portal_user"];

export default function CrmSettings() {
  const { crmUser, isAdmin } = useCrmUser();
  const [users, setUsers] = useState<CrmUserRow[]>([]);
  const [slaConfigs, setSlaConfigs] = useState<SlaConfig[]>([]);
  const [bizHours, setBizHours] = useState<BusinessHours[]>([]);
  const [loading, setLoading] = useState(true);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [userForm, setUserForm] = useState({ email: "", first_name: "", last_name: "", role: "technician" as CrmRole });
  const [addSlaOpen, setAddSlaOpen] = useState(false);
  const [slaForm, setSlaForm] = useState({ name: "", priority: "medium", response_minutes: "60", resolve_minutes: "480" });

  const fetchAll = async () => {
    const [uRes, sRes, bRes] = await Promise.all([
      supabase.from("crm_users").select("*").order("created_at"),
      supabase.from("crm_sla_configs").select("*").order("priority"),
      supabase.from("crm_business_hours").select("*"),
    ]);
    if (uRes.data) setUsers(uRes.data as CrmUserRow[]);
    if (sRes.data) setSlaConfigs(sRes.data as SlaConfig[]);
    if (bRes.data) setBizHours(bRes.data as BusinessHours[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAddUser = async () => {
    if (!userForm.email.trim()) return;
    // We create a CRM user record; the actual auth user must already exist
    const { error } = await supabase.from("crm_users").insert({
      user_id: crypto.randomUUID(), // placeholder — will be linked on first login
      email: userForm.email,
      first_name: userForm.first_name || null,
      last_name: userForm.last_name || null,
      role: userForm.role,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("User added — they'll be linked on first login");
    setUserForm({ email: "", first_name: "", last_name: "", role: "technician" });
    setAddUserOpen(false);
    fetchAll();
  };

  const updateUserRole = async (userId: string, newRole: CrmRole) => {
    const { error } = await supabase.from("crm_users").update({ role: newRole }).eq("id", userId);
    if (error) toast.error("Update failed");
    else { toast.success("Role updated"); fetchAll(); }
  };

  const toggleUserActive = async (userId: string, isActive: boolean) => {
    const { error } = await supabase.from("crm_users").update({ is_active: !isActive }).eq("id", userId);
    if (error) toast.error("Update failed");
    else { toast.success(isActive ? "User deactivated" : "User activated"); fetchAll(); }
  };

  const handleAddSla = async () => {
    if (!slaForm.name.trim()) return;
    const { error } = await supabase.from("crm_sla_configs").insert({
      name: slaForm.name,
      priority: slaForm.priority,
      response_minutes: Number(slaForm.response_minutes),
      resolve_minutes: Number(slaForm.resolve_minutes),
    });
    if (error) { toast.error(error.message); return; }
    toast.success("SLA config added");
    setSlaForm({ name: "", priority: "medium", response_minutes: "60", resolve_minutes: "480" });
    setAddSlaOpen(false);
    fetchAll();
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="team" className="w-full">
        <TabsList>
          <TabsTrigger value="team"><Users className="h-3.5 w-3.5 mr-1" /> Team</TabsTrigger>
          <TabsTrigger value="sla"><Shield className="h-3.5 w-3.5 mr-1" /> SLA</TabsTrigger>
          <TabsTrigger value="hours"><Clock className="h-3.5 w-3.5 mr-1" /> Business Hours</TabsTrigger>
        </TabsList>

        {/* Team Management */}
        <TabsContent value="team" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{users.length} team members</p>
            <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add CRM User</DialogTitle></DialogHeader>
                <div className="space-y-3 pt-2">
                  <div><Label>Email *</Label><Input value={userForm.email} onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>First Name</Label><Input value={userForm.first_name} onChange={e => setUserForm(f => ({ ...f, first_name: e.target.value }))} /></div>
                    <div><Label>Last Name</Label><Input value={userForm.last_name} onChange={e => setUserForm(f => ({ ...f, last_name: e.target.value }))} /></div>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select value={userForm.role} onValueChange={v => setUserForm(f => ({ ...f, role: v as CrmRole }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ROLES.map(r => <SelectItem key={r} value={r}>{r.replace("_", " ")}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddUser} className="w-full">Add User</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2">
            {users.map(u => (
              <Card key={u.id} className="border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{(u.first_name || u.email)[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {u.first_name} {u.last_name} {u.id === crmUser?.id && <span className="text-muted-foreground">(you)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={u.role} onValueChange={v => updateUserRole(u.id, v as CrmRole)} disabled={u.id === crmUser?.id}>
                      <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ROLES.map(r => <SelectItem key={r} value={r}>{r.replace("_", " ")}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Badge variant={u.is_active ? "default" : "secondary"} className="text-xs cursor-pointer" onClick={() => u.id !== crmUser?.id && toggleUserActive(u.id, u.is_active)}>
                      {u.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SLA Configuration */}
        <TabsContent value="sla" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">SLA response/resolve targets by priority</p>
            <Dialog open={addSlaOpen} onOpenChange={setAddSlaOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add SLA</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New SLA Config</DialogTitle></DialogHeader>
                <div className="space-y-3 pt-2">
                  <div><Label>Name *</Label><Input value={slaForm.name} onChange={e => setSlaForm(f => ({ ...f, name: e.target.value }))} /></div>
                  <div>
                    <Label>Priority</Label>
                    <Select value={slaForm.priority} onValueChange={v => setSlaForm(f => ({ ...f, priority: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Response (min)</Label><Input type="number" value={slaForm.response_minutes} onChange={e => setSlaForm(f => ({ ...f, response_minutes: e.target.value }))} /></div>
                    <div><Label>Resolve (min)</Label><Input type="number" value={slaForm.resolve_minutes} onChange={e => setSlaForm(f => ({ ...f, resolve_minutes: e.target.value }))} /></div>
                  </div>
                  <Button onClick={handleAddSla} className="w-full">Create SLA</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {slaConfigs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No SLA configs yet. Add one to define response targets.</p>
          ) : (
            <div className="grid gap-2">
              {slaConfigs.map(s => (
                <Card key={s.id} className="border-border">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{s.priority} priority</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Response: <span className="font-medium text-foreground">{s.response_minutes}m</span></p>
                        <p className="text-xs text-muted-foreground">Resolve: <span className="font-medium text-foreground">{s.resolve_minutes}m</span></p>
                      </div>
                      <Badge variant="outline" className="text-xs">{s.business_hours_only ? "Biz Hours" : "24/7"}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Business Hours */}
        <TabsContent value="hours" className="mt-4 space-y-4">
          {bizHours.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No business hours configured.</p>
                <p className="text-xs text-muted-foreground mt-1">Default: Mon–Fri 8:00 AM – 5:00 PM ET</p>
              </CardContent>
            </Card>
          ) : bizHours.map(bh => (
            <Card key={bh.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{bh.name}</p>
                    <p className="text-xs text-muted-foreground">{bh.timezone}</p>
                  </div>
                  {bh.is_default && <Badge variant="default" className="text-xs">Default</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                  Mon–Fri: {bh.monday_start || "08:00"} – {bh.monday_end || "17:00"}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
