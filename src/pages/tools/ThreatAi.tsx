import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShieldAlert, AlertTriangle, Download, Loader2 } from "lucide-react";
import { ExportLeadModal } from "@/components/ExportLeadModal";

interface CveResult {
  id: string;
  description: string;
  cvss: number;
  epss: number;
  severity: string;
  published: string;
}

const ThreatAi = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CveResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    // Simulated results (replace with NVD/EPSS API call via edge function)
    setTimeout(() => {
      const mockResults: CveResult[] = [
        {
          id: query.toUpperCase().startsWith("CVE-") ? query.toUpperCase() : `CVE-2024-${Math.floor(Math.random() * 99999).toString().padStart(5, "0")}`,
          description: "Remote code execution vulnerability in a widely-used network service allowing unauthenticated attackers to execute arbitrary commands.",
          cvss: 9.8, epss: 0.87, severity: "CRITICAL", published: "2024-11-15",
        },
        {
          id: `CVE-2024-${Math.floor(Math.random() * 99999).toString().padStart(5, "0")}`,
          description: "Cross-site scripting vulnerability in web application framework affecting input validation on form fields.",
          cvss: 6.1, epss: 0.34, severity: "MEDIUM", published: "2024-10-22",
        },
        {
          id: `CVE-2024-${Math.floor(Math.random() * 99999).toString().padStart(5, "0")}`,
          description: "Privilege escalation via improper access control in identity management module.",
          cvss: 7.5, epss: 0.62, severity: "HIGH", published: "2024-09-03",
        },
      ];
      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const severityColor = (sev: string) => {
    switch (sev) {
      case "CRITICAL": return "text-red-600 bg-red-50 border-red-200";
      case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
      case "MEDIUM": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBanner
        title="ThreatAI: CVE & EPSS Lookup"
        subtitle="Search vulnerabilities by CVE ID, keyword, or product name. Get real risk scores, not just CVSS."
      />

      {/* Search Interface: Always visible, no gate */}
      <section className="section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex gap-3">
            <Input
              placeholder="Search by CVE ID, keyword, or product name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading} className="btn-primary gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Examples: CVE-2024-3094, Log4Shell, Apache HTTP Server, SolarWinds
          </p>
        </div>
      </section>

      {/* Results */}
      {searched && (
        <section className="section-off-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-foreground">
                {results.length} Result{results.length !== 1 ? "s" : ""} Found
              </h2>
              <Button
                variant="outline"
                className="gap-2 text-sm"
                onClick={() => setShowExportModal(true)}
                disabled={results.length === 0}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              {results.map((r) => (
                <div key={r.id} className="bg-card border border-border p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5 text-brand-orange flex-shrink-0" />
                      <h3 className="font-bold text-foreground">{r.id}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 border ${severityColor(r.severity)}`}>
                        {r.severity}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{r.published}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{r.description}</p>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <span className="text-muted-foreground">CVSS:</span>{" "}
                      <span className="font-bold text-foreground">{r.cvss}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">EPSS Probability:</span>{" "}
                      <span className="font-bold text-foreground">{(r.epss * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-brand-orange" />
                      <span className="text-muted-foreground">Risk:</span>{" "}
                      <span className="font-bold text-foreground">
                        {r.epss > 0.7 ? "Actively Exploited" : r.epss > 0.4 ? "Likely Exploitable" : "Low Likelihood"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 section-dark text-center">
              <h3 className="text-xl font-bold text-white mb-3">Want Continuous Vulnerability Monitoring?</h3>
              <p className="text-white/70 mb-6 max-w-lg mx-auto">
                Our VDR module provides 24/7 vulnerability detection and response with EPSS-prioritised remediation across your entire attack surface.
              </p>
              <a href="/service-layer/vdr" className="btn-primary inline-flex">
                Learn About VDR Module
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Export Lead Modal: only shown when user clicks Export CSV */}
      <ExportLeadModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        data={results}
      />

      <Footer />
    </div>
  );
};

export default ThreatAi;
