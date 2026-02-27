/**
 * CRM BOM Quote Submissions viewer
 */
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
  ChevronDown, ChevronUp, Download, Search,
  CheckCircle, Clock, ShoppingCart, X,
} from "lucide-react";

interface BomSubmission {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  items: Array<{ id: string; name: string; type: string; vendor: string; parentBlock: string }>;
  item_count: number;
  status: string;
  created_at: string;
}

export default function CrmBomQuotes() {
  const [submissions, setSubmissions] = useState<BomSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("bom_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) console.error(error);
      setSubmissions((data as unknown as BomSubmission[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return submissions;
    const q = search.toLowerCase();
    return submissions.filter(s =>
      [s.first_name, s.last_name, s.email, s.company, s.status]
        .filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [submissions, search]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bom_submissions").update({ status }).eq("id", id);
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const exportCSV = (sub: BomSubmission) => {
    const rows = [["Item", "Type", "Vendor", "Category"]];
    (sub.items || []).forEach(item => {
      rows.push([item.name, item.type, item.vendor, item.parentBlock]);
    });
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bom-${sub.email || sub.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">BOM Quote Requests</h1>
          <p className="text-sm text-muted-foreground">{submissions.length} total submissions</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, company..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border focus:border-foreground focus:outline-none transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">No BOM submissions found</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(sub => {
            const isOpen = selectedId === sub.id;
            const name = [sub.first_name, sub.last_name].filter(Boolean).join(" ") || "Anonymous";
            return (
              <div key={sub.id} className="border border-border bg-background">
                <button onClick={() => setSelectedId(isOpen ? null : sub.id)} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors">
                  <ShoppingCart size={14} className="text-brand-orange flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{name}</p>
                    <p className="text-xs text-muted-foreground truncate">{sub.email} · {sub.company || "No company"}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground hidden md:block">{sub.item_count} items</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${sub.status === "new" ? "bg-brand-orange/10 text-brand-orange" : sub.status === "quoted" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                    {sub.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 hidden sm:block">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </span>
                  {isOpen ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>

                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border">
                    <div className="p-5 space-y-5">
                      {/* Contact info */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { label: "Email", val: sub.email },
                          { label: "Phone", val: sub.phone || "—" },
                          { label: "Company", val: sub.company || "—" },
                          { label: "Submitted", val: new Date(sub.created_at).toLocaleString() },
                        ].map(f => (
                          <div key={f.label} className="p-3 bg-muted/30">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{f.label}</p>
                            <p className="text-xs text-foreground break-all">{f.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Notes */}
                      {sub.message && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Notes</p>
                          <p className="text-sm text-foreground bg-muted/20 p-3 border border-border">{sub.message}</p>
                        </div>
                      )}

                      {/* Items */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                          Items ({sub.item_count})
                        </p>
                        <div className="space-y-1 border border-border p-3 max-h-64 overflow-y-auto">
                          {(sub.items || []).map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                              <div>
                                <span className="text-sm font-medium text-foreground">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground ml-2">{item.vendor} · {item.type}</span>
                              </div>
                              <span className="text-[10px] font-mono text-brand-orange">{item.parentBlock}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button onClick={() => exportCSV(sub)} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground border border-border hover:bg-muted transition-colors">
                          <Download size={12} /> Export CSV
                        </button>
                        {sub.status === "new" && (
                          <button onClick={() => updateStatus(sub.id, "quoted")} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-colors">
                            <CheckCircle size={12} /> Mark Quoted
                          </button>
                        )}
                        {sub.status === "quoted" && (
                          <button onClick={() => updateStatus(sub.id, "closed")} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground border border-border hover:bg-muted transition-colors">
                            <X size={12} /> Close
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
