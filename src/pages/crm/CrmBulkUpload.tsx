import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

interface ParsedRow {
  [key: string]: string;
}

interface ColumnMapping {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  job_title: string;
  company: string;
  lifecycle_stage: string;
  source: string;
}

const CRM_FIELDS = [
  { key: "first_name", label: "First Name", required: true },
  { key: "last_name", label: "Last Name", required: false },
  { key: "email", label: "Email", required: false },
  { key: "phone", label: "Phone", required: false },
  { key: "job_title", label: "Job Title", required: false },
  { key: "company", label: "Company (creates Org)", required: false },
  { key: "lifecycle_stage", label: "Lifecycle Stage", required: false },
  { key: "source", label: "Source", required: false },
];

function parseCSV(text: string): { headers: string[]; rows: ParsedRow[] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const rows: ParsedRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: ParsedRow = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || "";
    });
    rows.push(row);
  }

  return { headers, rows };
}

export default function CrmBulkUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"upload" | "map" | "preview" | "done">("upload");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<ParsedRow[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({
    first_name: "", last_name: "", email: "", phone: "",
    job_title: "", company: "", lifecycle_stage: "", source: "",
  });
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState({ success: 0, failed: 0, orgsCreated: 0 });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a .csv file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const { headers, rows } = parseCSV(text);
      if (headers.length === 0) {
        toast.error("CSV appears empty or malformed");
        return;
      }
      setCsvHeaders(headers);
      setCsvRows(rows);

      // Auto-map by matching header names
      const autoMap: any = { ...mapping };
      CRM_FIELDS.forEach(f => {
        const match = headers.find(h =>
          h.toLowerCase().replace(/[_\s-]/g, "") === f.key.replace(/_/g, "") ||
          h.toLowerCase().includes(f.key.replace(/_/g, " "))
        );
        if (match) autoMap[f.key] = match;
      });
      setMapping(autoMap);
      setStep("map");
      toast.success(`Parsed ${rows.length} rows from ${file.name}`);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!mapping.first_name) {
      toast.error("First Name mapping is required");
      return;
    }

    setImporting(true);
    let success = 0;
    let failed = 0;
    let orgsCreated = 0;

    // Batch org creation: collect unique companies
    const companyMap = new Map<string, string>(); // company name → org id
    if (mapping.company) {
      const companies = [...new Set(csvRows.map(r => r[mapping.company]).filter(Boolean))];
      for (const company of companies) {
        const { data: existing } = await supabase
          .from("crm_organizations")
          .select("id")
          .ilike("name", company)
          .maybeSingle();

        if (existing) {
          companyMap.set(company.toLowerCase(), existing.id);
        } else {
          const { data: newOrg } = await supabase
            .from("crm_organizations")
            .insert({ name: company, type: "prospect", status: "active" })
            .select("id")
            .single();
          if (newOrg) {
            companyMap.set(company.toLowerCase(), newOrg.id);
            orgsCreated++;
          }
        }
      }
    }

    // Insert contacts in batches of 50
    const batchSize = 50;
    for (let i = 0; i < csvRows.length; i += batchSize) {
      const batch = csvRows.slice(i, i + batchSize).map(row => {
        const company = mapping.company ? row[mapping.company] : "";
        return {
          first_name: row[mapping.first_name] || "Unknown",
          last_name: mapping.last_name ? row[mapping.last_name] || null : null,
          email: mapping.email ? row[mapping.email] || null : null,
          phone: mapping.phone ? row[mapping.phone] || null : null,
          job_title: mapping.job_title ? row[mapping.job_title] || null : null,
          organization_id: company ? companyMap.get(company.toLowerCase()) || null : null,
          lifecycle_stage: mapping.lifecycle_stage ? row[mapping.lifecycle_stage] || "lead" : "lead",
          source: mapping.source ? row[mapping.source] || "csv_import" : "csv_import",
        };
      });

      const { error } = await supabase.from("crm_contacts").insert(batch);
      if (error) {
        failed += batch.length;
      } else {
        success += batch.length;
      }
    }

    setResults({ success, failed, orgsCreated });
    setStep("done");
    setImporting(false);
    toast.success(`Import complete: ${success} contacts created`);
  };

  const downloadTemplate = () => {
    const csv = "first_name,last_name,email,phone,job_title,company,lifecycle_stage,source\nJohn,Doe,john@example.com,555-0100,CTO,Acme Corp,lead,referral\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "crm_contacts_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Header */}
      <Card className="border-border bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">CSV Bulk Upload</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload a CSV to import contacts in bulk. Auto-creates organizations from company names.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-1" /> Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <Card className="border-border border-dashed">
          <CardContent className="p-12 text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-4">Drag & drop a CSV file or click to browse</p>
            <input
              type="file"
              accept=".csv"
              ref={fileRef}
              onChange={handleFile}
              className="hidden"
            />
            <Button onClick={() => fileRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Select CSV File
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Map Columns */}
      {step === "map" && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Map CSV Columns → CRM Fields</CardTitle>
            <p className="text-sm text-muted-foreground">{csvRows.length} rows detected · {csvHeaders.length} columns</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {CRM_FIELDS.map(field => (
              <div key={field.key} className="grid grid-cols-2 gap-4 items-center">
                <Label className="text-sm">
                  {field.label} {field.required && <span className="text-destructive">*</span>}
                </Label>
                <Select
                  value={(mapping as any)[field.key] || "__none__"}
                  onValueChange={v => setMapping(m => ({ ...m, [field.key]: v === "__none__" ? "" : v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="— skip —" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— skip —</SelectItem>
                    {csvHeaders.map(h => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* Preview first 3 rows */}
            <div className="mt-4 border border-border rounded-md overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted">
                    {CRM_FIELDS.filter(f => (mapping as any)[f.key]).map(f => (
                      <th key={f.key} className="px-3 py-2 text-left font-medium text-foreground">{f.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvRows.slice(0, 3).map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      {CRM_FIELDS.filter(f => (mapping as any)[f.key]).map(f => (
                        <td key={f.key} className="px-3 py-2 text-muted-foreground">{row[(mapping as any)[f.key]] || "—"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => { setStep("upload"); setCsvRows([]); setCsvHeaders([]); }}>Back</Button>
              <Button onClick={handleImport} disabled={importing || !mapping.first_name}>
                {importing ? "Importing..." : `Import ${csvRows.length} Contacts`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Results */}
      {step === "done" && (
        <Card className="border-border">
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 mx-auto text-green-500" />
            <h3 className="text-lg font-semibold text-foreground">Import Complete</h3>
            <div className="flex justify-center gap-4">
              <Badge variant="default" className="text-sm">{results.success} contacts created</Badge>
              {results.orgsCreated > 0 && (
                <Badge variant="outline" className="text-sm">{results.orgsCreated} orgs created</Badge>
              )}
              {results.failed > 0 && (
                <Badge variant="destructive" className="text-sm">{results.failed} failed</Badge>
              )}
            </div>
            <Button variant="outline" onClick={() => { setStep("upload"); setCsvRows([]); setCsvHeaders([]); }}>
              Upload Another
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
