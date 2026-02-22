/**
 * NOTICE — Third-Party Attributions and Copyright Notices
 * Word-for-word from provided documentation
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const attributions = {
  core: [
    { name: "Nuclei", url: "https://github.com/projectdiscovery/nuclei", license: "MIT", copyright: "ProjectDiscovery, Inc.", purpose: "Vulnerability scanning engine" },
    { name: "Trivy", url: "https://github.com/aquasecurity/trivy", license: "Apache 2.0", copyright: "Aqua Security Software Ltd.", purpose: "Container and filesystem scanning" },
    { name: "Open Policy Agent (OPA)", url: "https://github.com/open-policy-agent/opa", license: "Apache 2.0", copyright: "The OPA Authors", purpose: "Policy as code" },
    { name: "BloodHound", url: "https://github.com/BloodHoundAD/BloodHound", license: "Apache 2.0", copyright: "SpecterOps", purpose: "Identity attack path analysis" },
    { name: "nDPI", url: "https://github.com/ntop/nDPI", license: "LGPL 3.0", copyright: "ntop.org", purpose: "Deep packet inspection" },
    { name: "RITA", url: "https://github.com/activecm/rita", license: "GPL 3.0", copyright: "Active Countermeasures", purpose: "Network traffic analysis" },
    { name: "Aya-rs", url: "https://github.com/aya-rs/aya", license: "MIT / Apache 2.0", copyright: "The Aya Contributors", purpose: "eBPF programs in Rust" },
    { name: "YARA-X", url: "https://github.com/yara-xiy", license: "BSD-3", copyright: "The YARA-X Authors", purpose: "Malware pattern matching" },
    { name: "OpenTelemetry", url: "https://github.com/open-telemetry", license: "Apache 2.0", copyright: "The OpenTelemetry Authors", purpose: "Observability framework" },
    { name: "Prometheus", url: "https://github.com/prometheus/prometheus", license: "Apache 2.0", copyright: "The Prometheus Authors", purpose: "Metrics and monitoring" },
    { name: "Temporal", url: "https://github.com/temporalio/temporal", license: "MIT", copyright: "Temporal Technologies Inc.", purpose: "Workflow orchestration" },
    { name: "NATS", url: "https://github.com/nats-io/nats-server", license: "Apache 2.0", copyright: "The NATS Authors", purpose: "Messaging bus" },
  ],
  detection: [
    { name: "Sigma Rules", url: "https://github.com/SigmaHQ/sigma", license: "Apache 2.0 (detection rules)", copyright: "SigmaHQ and Contributors", purpose: "Generic signature format" },
    { name: "Suricata Emerging Threats Rules", url: "https://rules.emergingthreats.net", license: "GPL 2.0 (data files only)", copyright: "Emerging Threats / Proofpoint", purpose: "Network intrusion detection" },
    { name: "YARA Rules", url: "https://github.com/YARA-Rules/rules", license: "Various (BSD, GPL, custom)", copyright: "Respective rule authors", purpose: "Malware pattern matching" },
    { name: "MISP Taxonomies and Galaxies", url: "https://github.com/MISP/misp-taxonomies", license: "CC0", copyright: "MISP Project", purpose: "Threat intelligence classification" },
    { name: "MITRE ATT&CK", url: "https://attack.mitre.org", license: "CC BY 4.0", copyright: "The MITRE Corporation", purpose: "Adversary tactics and techniques" },
    { name: "NIST OSCAL", url: "https://github.com/usnistgov/OSCAL", license: "Public Domain", copyright: "NIST (US Government work)", purpose: "Compliance documentation" },
  ],
  agent: [
    { name: "Tokio", url: "https://github.com/tokio-rs/tokio", license: "MIT", copyright: "The Tokio Contributors", purpose: "Async runtime in Rust agents" },
    { name: "libpcap", url: "https://www.tcpdump.org", license: "BSD-3", copyright: "The TCPDUMP Project", purpose: "Packet capture" },
    { name: "blake3", url: "https://github.com/BLAKE3-team/BLAKE3", license: "Apache 2.0 / CC0", copyright: "The BLAKE3 Team", purpose: "Cryptographic hashing" },
    { name: "zstd", url: "https://github.com/facebook/zstd", license: "BSD-3 / GPL 2.0 dual", copyright: "Meta Platforms, Inc.", purpose: "Compression" },
  ],
  goBackend: [
    { name: "go-chi", url: "https://github.com/go-chi/chi", license: "MIT", copyright: "The chi Authors", purpose: "API routing" },
    { name: "pgx", url: "https://github.com/jackc/pgx", license: "MIT", copyright: "jackc", purpose: "PostgreSQL driver" },
    { name: "clickhouse-go", url: "https://github.com/ClickHouse/clickhouse-go", license: "Apache 2.0", copyright: "ClickHouse, Inc.", purpose: "ClickHouse driver" },
    { name: "neo4j-go-driver", url: "https://github.com/neo4j/neo4j-go-driver", license: "Apache 2.0", copyright: "Neo4j, Inc.", purpose: "Graph database driver" },
  ],
  pythonAi: [
    { name: "crewai", url: "https://github.com/joaomdmoura/crewai", license: "MIT", copyright: "João Moura", purpose: "AI agent orchestration" },
    { name: "langchain", url: "https://github.com/langchain-ai/langchain", license: "MIT", copyright: "LangChain, Inc.", purpose: "LLM framework" },
    { name: "llama.cpp", url: "https://github.com/ggerganov/llama.cpp", license: "MIT", copyright: "Georgi Gerganov", purpose: "Local LLM inference" },
    { name: "vLLM", url: "https://github.com/vllm-project/vllm", license: "Apache 2.0", copyright: "The vLLM Team", purpose: "High-throughput LLM serving" },
    { name: "PyMISP", url: "https://github.com/MISP/PyMISP", license: "BSD-2", copyright: "MISP Project", purpose: "MISP API client" },
  ],
};

const AttrSection = ({ title, items }: { title: string; items: typeof attributions.core }) => (
  <div style={{ marginBottom: "48px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1D1D1B", marginBottom: "24px" }}>{title}</h2>
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.name} style={{ borderBottom: "1px solid #CDCAC5", paddingBottom: "16px" }}>
          <p style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "4px" }}>{item.name}</p>
          <p style={{ fontSize: "13px", color: "#5A5A5B" }}>
            Project: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-brand-orange underline">{item.url}</a>
          </p>
          <p style={{ fontSize: "13px", color: "#5A5A5B" }}>License: {item.license}</p>
          <p style={{ fontSize: "13px", color: "#5A5A5B" }}>Copyright: {item.copyright}</p>
          <p style={{ fontSize: "13px", color: "#5A5A5B" }}>Used for: {item.purpose}</p>
        </div>
      ))}
    </div>
  </div>
);

const Notice = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Third-Party Attributions and Copyright Notices"
        subtitle="Attribution and copyright notices for third-party software included in or used by the Kubric open source project and ManageKube services."
        phase="NOTICE"
      />

      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: "13px", color: "#5A5A5B", marginBottom: "48px" }}>
                Last Updated: February 22, 2026
              </p>

              <div style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>Overview</h2>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#393837" }}>
                  This file contains attribution and copyright notices for third-party software included in or used by the Kubric open source project and ManageKube services. We are grateful to the open source community for their contributions.
                </p>
              </div>

              <AttrSection title="Core Dependencies" items={attributions.core} />
              <AttrSection title="Detection Rules and Intelligence" items={attributions.detection} />
              <AttrSection title="Agent Dependencies" items={attributions.agent} />
              <AttrSection title="Go Backend Dependencies" items={attributions.goBackend} />
              <AttrSection title="Python AI Dependencies" items={attributions.pythonAi} />

              <div style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>Full Attribution</h2>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#393837" }}>
                  For complete attribution, including copyright notices for all dependencies, please refer to the individual project repositories or the license files included in our distribution.
                </p>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#393837", marginTop: "16px" }}>
                  This NOTICE file is provided to comply with the attribution requirements of the Apache 2.0, MIT, BSD, and other open source licenses.
                </p>
              </div>

              <div style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>Questions</h2>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p>Email: <strong>legal@managekube.com</strong></p>
                  <p>Open Source: <strong>opensource@managekube.com</strong></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Notice;
