import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";

interface WorkflowStep {
  id: string;
  type: "trigger" | "condition" | "action";
  config: any;
}

export default function WorkflowBuilder() {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: "1", type: "trigger", config: { event: "ticket_created" } },
  ]);

  function addStep(type: "condition" | "action") {
    setSteps([...steps, { id: Date.now().toString(), type, config: {} }]);
  }

  function removeStep(id: string) {
    setSteps(steps.filter(s => s.id !== id));
  }

  function updateStep(id: string, config: any) {
    setSteps(steps.map(s => s.id === id ? { ...s, config } : s));
  }

  function handleSave() {
    if (!name) {
      toast.error("Workflow name required");
      return;
    }
    toast.success("Workflow saved");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Workflow Automation</h2>
        <p className="text-sm text-muted-foreground">Build automated workflows for your CRM</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Workflow Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Workflow Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Auto-assign high priority tickets" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <Card key={step.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">{i + 1}</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground capitalize">{step.type}</p>
                    {step.type !== "trigger" && (
                      <Button size="sm" variant="ghost" onClick={() => removeStep(step.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-red-600" />
                      </Button>
                    )}
                  </div>

                  {step.type === "trigger" && (
                    <Select value={step.config.event} onValueChange={v => updateStep(step.id, { event: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ticket_created">Ticket Created</SelectItem>
                        <SelectItem value="deal_won">Deal Won</SelectItem>
                        <SelectItem value="contract_expiring">Contract Expiring</SelectItem>
                        <SelectItem value="invoice_overdue">Invoice Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  {step.type === "condition" && (
                    <div className="grid grid-cols-3 gap-2">
                      <Select value={step.config.field} onValueChange={v => updateStep(step.id, { ...step.config, field: v })}>
                        <SelectTrigger><SelectValue placeholder="Field" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="priority">Priority</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="value">Value</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={step.config.operator} onValueChange={v => updateStep(step.id, { ...step.config, operator: v })}>
                        <SelectTrigger><SelectValue placeholder="Is" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input value={step.config.value || ""} onChange={e => updateStep(step.id, { ...step.config, value: e.target.value })} placeholder="Value" />
                    </div>
                  )}

                  {step.type === "action" && (
                    <Select value={step.config.action} onValueChange={v => updateStep(step.id, { action: v })}>
                      <SelectTrigger><SelectValue placeholder="Select action" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assign_user">Assign to User</SelectItem>
                        <SelectItem value="send_email">Send Email</SelectItem>
                        <SelectItem value="update_field">Update Field</SelectItem>
                        <SelectItem value="create_task">Create Task</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => addStep("condition")}>
          <Plus className="h-4 w-4 mr-1" /> Add Condition
        </Button>
        <Button variant="outline" onClick={() => addStep("action")}>
          <Plus className="h-4 w-4 mr-1" /> Add Action
        </Button>
      </div>

      <Button onClick={handleSave} className="w-full">
        <Zap className="h-4 w-4 mr-1" /> Save Workflow
      </Button>
    </div>
  );
}
