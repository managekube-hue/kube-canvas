/**
 * Open Source Licensing — ManageKube, Inc.
 * Kubric Project Licensing and Attribution
 * Word-for-word from provided documentation
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OpenSourceLicensing = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Kubric Project Licensing and Attribution"
        subtitle="Understanding the relationship between ManageKube and the Kubric open source project."
        phase="OPEN SOURCE LICENSING"
      />

      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: "13px", color: "#5A5A5B", marginBottom: "48px" }}>
                Last Updated: February 22, 2026
              </p>

              <Section title="ManageKube and Kubric: The Relationship">
                <p>ManageKube, Inc. is the commercial entity that provides managed security and IT services. Kubric is an open source project maintained by ManageKube as a wholly owned subsidiary. This structure allows us to:</p>
                <ul>
                  <li><strong>Develop in the open</strong> — Core platform capabilities are developed transparently</li>
                  <li><strong>Benefit from community input</strong> — Contributions improve the platform for everyone</li>
                  <li><strong>Provide commercial services</strong> — ManageKube offers managed services built on Kubric</li>
                  <li><strong>Maintain clear licensing</strong> — Open source code remains open; commercial services are separate</li>
                </ul>
                <p><strong>The distinction is important:</strong></p>
                <ul>
                  <li><strong>Kubric</strong> — The open source project. Code is available under permissive licenses.</li>
                  <li><strong>ManageKube</strong> — The commercial entity. Provides managed services, support, and enterprise features built on Kubric.</li>
                </ul>
              </Section>

              <Section title="Kubric Project Licensing">
                <p>The Kubric open source project uses multiple licenses depending on the component. This approach allows us to maximize community contribution while maintaining the ability to offer commercial services.</p>
                <div style={{ overflowX: "auto", marginBottom: "16px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #CDCAC5" }}>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Component</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>License</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Core platform</td><td style={{ padding: "8px" }}>Apache 2.0</td><td style={{ padding: "8px" }}>Main detection engine, APIs, graph layer</td></tr>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Agent software</td><td style={{ padding: "8px" }}>MIT</td><td style={{ padding: "8px" }}>Lightweight endpoint and network agents</td></tr>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Detection rules</td><td style={{ padding: "8px" }}>Various</td><td style={{ padding: "8px" }}>Sigma (Apache 2.0), YARA (BSD-3), Suricata (GPL 2.0 data-only)</td></tr>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Third-party dependencies</td><td style={{ padding: "8px" }}>See NOTICE</td><td style={{ padding: "8px" }}>Full attribution in NOTICE file</td></tr>
                      <tr><td style={{ padding: "8px" }}>Documentation</td><td style={{ padding: "8px" }}>CC BY 4.0</td><td style={{ padding: "8px" }}>Documentation and guides</td></tr>
                    </tbody>
                  </table>
                </div>
                <SubHead>License summaries:</SubHead>
                <ul>
                  <li><strong>Apache 2.0</strong> — Permissive license. You may use, modify, and distribute the code. Must retain copyright notices and state changes. Patent grant included.</li>
                  <li><strong>MIT</strong> — Highly permissive. You may do anything with the code as long as you include the original copyright notice.</li>
                  <li><strong>BSD-3</strong> — Permissive. You may use, modify, and distribute. Cannot use project/organization names to endorse derivatives without permission.</li>
                  <li><strong>GPL 2.0 (data-only)</strong> — Detection rules are vendored as data files, not linked code. This maintains license compliance without contaminating the core platform.</li>
                  <li><strong>CC BY 4.0</strong> — Documentation may be shared and adapted with attribution.</li>
                </ul>
              </Section>

              <Section title="Third-Party Attributions">
                <p>Kubric builds on the shoulders of giants. We are grateful to the open source community and provide full attribution in our NOTICE file.</p>
                <SubHead>Key dependencies include:</SubHead>
                <div style={{ overflowX: "auto", marginBottom: "16px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #CDCAC5" }}>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Project</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>License</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Nuclei", "MIT", "Vulnerability scanning engine"],
                        ["Trivy", "Apache 2.0", "Container and filesystem scanning"],
                        ["OPA", "Apache 2.0", "Policy as code"],
                        ["BloodHound", "Apache 2.0", "Identity attack path analysis"],
                        ["nDPI", "LGPL 3.0", "Deep packet inspection (via FFI)"],
                        ["RITA", "GPL 3.0", "Network traffic analysis (as subprocess)"],
                        ["Aya-rs", "MIT/Apache 2.0", "eBPF programs in Rust"],
                        ["YARA-X", "BSD-3", "Malware pattern matching"],
                        ["OpenTelemetry", "Apache 2.0", "Observability framework"],
                        ["Prometheus", "Apache 2.0", "Metrics and monitoring"],
                        ["Temporal", "MIT", "Workflow orchestration"],
                        ["NATS", "Apache 2.0", "Messaging bus"],
                      ].map(([project, license, purpose], i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #CDCAC5" }}>
                          <td style={{ padding: "8px" }}>{project}</td>
                          <td style={{ padding: "8px" }}>{license}</td>
                          <td style={{ padding: "8px" }}>{purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>Complete attribution with copyright notices is available in the <Link to="/notice" className="text-brand-orange underline">Kubric NOTICE file</Link>.</p>
              </Section>

              <Section title="License Compliance Strategy">
                <p>Kubric employs a careful license compliance strategy to ensure:</p>
                <SubHead>1. Permissive libraries are embedded directly</SubHead>
                <p>MIT, Apache 2.0, BSD-licensed libraries are imported directly into the codebase. Examples: Nuclei, Trivy, OPA, BloodHound.</p>
                <SubHead>2. LGPL libraries are dynamically linked</SubHead>
                <p>LGPL-licensed libraries (like nDPI) are dynamically linked or called via FFI. This preserves license compliance without forcing the entire platform to adopt LGPL.</p>
                <SubHead>3. GPL data is vendored, not linked</SubHead>
                <p>GPL-licensed detection rules (Sigma, Suricata, YARA rules) are stored as data files in /vendor. They are loaded at runtime, not linked into the code. This allows us to use the intelligence without license contamination.</p>
                <SubHead>4. AGPL tools run as subprocesses</SubHead>
                <p>AGPL-licensed tools (Cortex, TheHive, TruffleHog) are executed as separate processes. They communicate via stdin/stdout or REST APIs. This maintains the AGPL boundary.</p>
                <SubHead>5. Commercial APIs are called via REST</SubHead>
                <p>APIs with commercial terms (Vapi, Stripe, etc.) are called via HTTP. No source code is copied or linked.</p>
                <p>This strategy is documented in our architecture and maintained through continuous license scanning.</p>
              </Section>

              <Section title="Contributing to Kubric">
                <p>We welcome contributions to the Kubric open source project. By contributing, you agree to:</p>
                <ul>
                  <li>License your contributions under the same license as the component you're modifying</li>
                  <li>Represent that you have the right to make the contribution</li>
                  <li>Follow our contribution guidelines in CONTRIBUTING.md</li>
                </ul>
                <SubHead>Contribution process:</SubHead>
                <ol className="list-decimal pl-6 mb-4 [&>li]:mb-2">
                  <li>Review CONTRIBUTING.md</li>
                  <li>Sign the Developer Certificate of Origin (DCO)</li>
                  <li>Submit a pull request</li>
                  <li>Participate in code review</li>
                </ol>
              </Section>

              <Section title="Trademark Policy">
                <p>Open source licenses cover copyright, not trademarks. This policy governs use of ManageKube and Kubric trademarks.</p>
                <p><strong>"Kubric" and "ManageKube" are trademarks of ManageKube, Inc.</strong></p>
                <SubHead>You may:</SubHead>
                <ul>
                  <li>Use the project name "Kubric" to refer to the unmodified project as released by ManageKube</li>
                  <li>State that your software is "compatible with Kubric" or "built on Kubric"</li>
                  <li>Use logos in accordance with our brand guidelines for non-commercial purposes</li>
                </ul>
                <SubHead>You may NOT:</SubHead>
                <ul>
                  <li>Use "Kubric" or "ManageKube" as part of your product or service name without written permission</li>
                  <li>Use our logos in a way that suggests endorsement or affiliation without written permission</li>
                  <li>Fork the project and release it under a name that could cause confusion with the original</li>
                </ul>
                <p>For trademark usage permission, contact <strong>trademarks@managekube.com</strong>.</p>
              </Section>

              <Section title="Export Control Notice">
                <p>The Kubric project includes cryptographic software. As a US-based company, exporting cryptographic software is subject to US export regulations.</p>
                <p>The Kubric project is publicly available under open source licenses. Publicly available open source cryptographic software is not subject to formal export licensing requirements under EAR Section 742.15(b) when made publicly available.</p>
                <p>However, users and contributors outside the US should be aware of their own country's import and export regulations.</p>
              </Section>

              <Section title="Security Vulnerability Reporting">
                <p>If you discover a security vulnerability in Kubric:</p>
                <ol className="list-decimal pl-6 mb-4 [&>li]:mb-2">
                  <li><strong>Do not</strong> disclose it publicly in issues or pull requests</li>
                  <li>Email <strong>security@managekube.com</strong> with details</li>
                  <li>Include steps to reproduce and potential impact</li>
                  <li>Allow time for assessment and remediation before public disclosure</li>
                </ol>
                <p>We aim to acknowledge receipt within 24 hours and provide a fix timeline within 5 business days.</p>
              </Section>

              <Section title="Questions?">
                <p>For licensing questions, attribution, or permission requests:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p>Email: <strong>legal@managekube.com</strong></p>
                  <p>Open Source: <strong>opensource@managekube.com</strong></p>
                  <p>Trademark: <strong>trademarks@managekube.com</strong></p>
                  <p>Security: <strong>security@managekube.com</strong></p>
                </div>
              </Section>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: "48px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1D1D1B", marginBottom: "16px" }}>{title}</h2>
    <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#393837" }} className="[&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-2">
      {children}
    </div>
  </div>
);

const SubHead = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "16px", fontWeight: 600, color: "#1D1D1B", marginBottom: "8px", marginTop: "16px" }}>{children}</p>
);

export default OpenSourceLicensing;
