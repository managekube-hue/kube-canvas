/**
 * Privacy Policy: ManageKube, Inc.
 * Word-for-word from provided documentation
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Your Privacy. Your Data. Your Rights."
        subtitle="How ManageKube, Inc. collects, uses, stores, and protects your personal information."
        phase="PRIVACY POLICY"
      />

      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: "13px", color: "#5A5A5B", marginBottom: "48px" }}>
                Last Updated: February 22, 2026
              </p>

              <Section title="Introduction">
                <p>ManageKube, Inc. ("ManageKube," "we," "us," or "our") respects your privacy and is committed to protecting it through this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit managekube.com, use our services, or interact with our open source projects, and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
                <p>This policy applies to:</p>
                <ul>
                  <li>Visitors to our website</li>
                  <li>Users of our managed services</li>
                  <li>Contributors to our open source projects</li>
                  <li>Prospective clients completing our assessment</li>
                  <li>Current clients under service agreements</li>
                </ul>
              </Section>

              <Section title="Information We Collect">
                <p>We collect several types of information from and about users of our website and services, including:</p>
                <SubHead>Personal Information</SubHead>
                <ul>
                  <li>Name, email address, phone number, company name, job title</li>
                  <li>Billing and payment information (processed securely via third-party processors)</li>
                  <li>Account credentials for service access</li>
                </ul>
                <SubHead>Assessment Data</SubHead>
                <ul>
                  <li>Responses to assessment questions</li>
                  <li>Environment Maturity Score (EMS) and derived recommendations</li>
                  <li>Gap flags and remediation roadmap items</li>
                </ul>
                <SubHead>Usage Data</SubHead>
                <ul>
                  <li>Information about your visit, including traffic data, location data, logs, and other communication data</li>
                  <li>Pages viewed, time spent, links clicked</li>
                  <li>Referring website addresses</li>
                </ul>
                <SubHead>Technical Data</SubHead>
                <ul>
                  <li>IP address, browser type, operating system, device type</li>
                  <li>Cookie identifiers and similar technologies</li>
                </ul>
                <SubHead>Open Source Contribution Data</SubHead>
                <ul>
                  <li>GitHub/GitLab usernames</li>
                  <li>Contribution history</li>
                  <li>Communication in issues, pull requests, and discussions</li>
                </ul>
              </Section>

              <Section title="How We Collect Information">
                <p>We collect information:</p>
                <ul>
                  <li><strong>Directly from you</strong> when you provide it (contact forms, assessment forms, account registration, support tickets, open source contributions)</li>
                  <li><strong>Automatically</strong> as you navigate through the site (usage details, IP addresses, cookies)</li>
                  <li><strong>From third parties</strong> (analytics providers, payment processors, GitHub/GitLab APIs)</li>
                </ul>
              </Section>

              <Section title="How We Use Your Information">
                <p>We use information that we collect about you or that you provide to us:</p>
                <SubHead>To Provide Services</SubHead>
                <ul>
                  <li>Deliver managed security and IT services</li>
                  <li>Generate assessment results and recommendations</li>
                  <li>Process payments and manage accounts</li>
                  <li>Provide customer support</li>
                </ul>
                <SubHead>To Improve Our Services</SubHead>
                <ul>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Train and improve our scoring algorithms</li>
                  <li>Identify and fix technical issues</li>
                </ul>
                <SubHead>To Communicate</SubHead>
                <ul>
                  <li>Respond to inquiries and support requests</li>
                  <li>Send service updates and important notices</li>
                  <li>Deliver assessment results and proposals</li>
                  <li>Send marketing communications (with opt-out option)</li>
                </ul>
                <SubHead>For Legal and Security Purposes</SubHead>
                <ul>
                  <li>Protect against fraud and unauthorized access</li>
                  <li>Comply with legal obligations</li>
                  <li>Enforce our terms and policies</li>
                  <li>Respond to legal requests</li>
                </ul>
                <SubHead>For Open Source Project Management</SubHead>
                <ul>
                  <li>Track contributions and maintain project history</li>
                  <li>Communicate with contributors</li>
                  <li>Enforce contribution guidelines and licenses</li>
                </ul>
              </Section>

              <Section title="Disclosure of Your Information">
                <p>We may disclose aggregated information about our users without restriction. We may disclose personal information:</p>
                <SubHead>To Our Subsidiaries and Affiliates</SubHead>
                <ul>
                  <li>Kubric open source project (wholly owned subsidiary)</li>
                  <li>Other entities under common control</li>
                </ul>
                <SubHead>To Service Providers</SubHead>
                <ul>
                  <li>Cloud infrastructure providers (AWS, Azure, GCP)</li>
                  <li>Payment processors (Stripe)</li>
                  <li>Analytics providers</li>
                  <li>Customer support platforms</li>
                  <li>Email delivery services</li>
                </ul>
                <SubHead>For Legal Purposes</SubHead>
                <ul>
                  <li>To comply with any court order, law, or legal process</li>
                  <li>To respond to government or regulatory requests</li>
                  <li>To enforce our rights under contracts</li>
                </ul>
                <SubHead>With Your Consent</SubHead>
                <ul>
                  <li>For any other purpose disclosed by us when you provide the information</li>
                  <li>With your explicit consent</li>
                </ul>
                <p><strong>We do not sell your personal information to third parties.</strong></p>
              </Section>

              <Section title="Data Security">
                <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure:</p>
                <ul>
                  <li>Encryption in transit (TLS 1.3)</li>
                  <li>Encryption at rest for sensitive data</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>SOC 2 Type II compliant controls</li>
                  <li>Vendor security reviews</li>
                </ul>
                <p>All information you provide to us is stored on secure servers behind firewalls. Payment transactions are encrypted and processed by PCI DSS-compliant third-party processors.</p>
                <p>The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our website or services, you are responsible for keeping this password confidential.</p>
              </Section>

              <Section title="Data Retention">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul>
                  <li>Provide services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                </ul>
                <p>Assessment data is retained to provide historical context and track improvement over time. You may request deletion of your data as described below.</p>
              </Section>

              <Section title="Your Data Subject Rights">
                <p>ManageKube is committed to ensuring you can exercise your rights over your personal data. Depending on your jurisdiction (including under the GDPR, CCPA/CPRA, and other applicable privacy laws), you have the following rights:</p>
                <SubHead>Right of Access</SubHead>
                <ul><li>You have the right to request confirmation of whether we process your personal data and to obtain a copy of the specific personal information we hold about you, provided in a commonly used, machine-readable format (data portability).</li></ul>
                <SubHead>Right to Rectification</SubHead>
                <ul><li>You have the right to request that we correct any inaccurate personal data or complete any incomplete personal data we hold about you without undue delay.</li></ul>
                <SubHead>Right to Erasure ("Right to Be Forgotten")</SubHead>
                <ul><li>You have the right to request the deletion of your personal data where it is no longer necessary for the purposes for which it was collected, where you withdraw consent, or where there is no overriding legitimate interest for continued processing. Certain legal obligations may require us to retain some data.</li></ul>
                <SubHead>Right to Restriction of Processing</SubHead>
                <ul><li>You have the right to request that we restrict the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data or object to processing.</li></ul>
                <SubHead>Right to Object</SubHead>
                <ul><li>You have the right to object to the processing of your personal data where processing is based on our legitimate interests. We will cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.</li></ul>
                <SubHead>Right to Data Portability</SubHead>
                <ul><li>You have the right to receive your personal data in a structured, commonly used, and machine-readable format (e.g., JSON or CSV) and to transmit that data to another controller without hindrance.</li></ul>
                <SubHead>Right to Withdraw Consent</SubHead>
                <ul><li>Where processing is based on your consent, you have the right to withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing conducted prior to withdrawal.</li></ul>
                <SubHead>Right to Opt-Out of Marketing</SubHead>
                <ul>
                  <li>Unsubscribe from marketing communications via the link provided in every email</li>
                  <li>Contact us directly to opt out of all marketing communications</li>
                </ul>
                <SubHead>Right to Lodge a Complaint</SubHead>
                <ul><li>If you believe your data protection rights have been violated, you have the right to lodge a complaint with a supervisory authority in your country of residence, place of work, or the location of the alleged infringement.</li></ul>
                <SubHead>Cookie Choices</SubHead>
                <ul><li>Adjust browser settings to refuse cookies</li><li>Use our cookie consent manager</li></ul>
                <SubHead>Do Not Track</SubHead>
                <ul><li>Our systems do not currently respond to Do Not Track signals</li></ul>

                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "24px", marginTop: "24px", borderRadius: "4px" }}>
                  <p style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>How to Exercise Your Rights</p>
                  <p>To submit a data subject request, contact our Data Protection Officer:</p>
                  <ul>
                    <li>Email: <strong>dpo@managekube.com</strong></li>
                    <li>Phone: <strong>240-257-2029 ext. 310</strong></li>
                  </ul>
                  <p>We will respond to all verifiable requests within <strong>30 days</strong> (or within the timeframe required by applicable law). We may request additional information to verify your identity before processing your request. We will not discriminate against you for exercising any of your data subject rights.</p>
                </div>
              </Section>

              <Section title="Cookies and Tracking Technologies">
                <p>We use cookies and similar technologies to:</p>
                <ul>
                  <li>Authenticate users and maintain sessions</li>
                  <li>Remember preferences and settings</li>
                  <li>Analyze usage and improve our website</li>
                  <li>Deliver relevant content</li>
                </ul>
                <SubHead>Types of cookies we use:</SubHead>
                <div style={{ overflowX: "auto", marginBottom: "16px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #CDCAC5" }}>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Type</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Purpose</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Essential</td><td style={{ padding: "8px" }}>Authentication, security, session management</td><td style={{ padding: "8px" }}>Session / persistent</td></tr>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Functional</td><td style={{ padding: "8px" }}>Remember preferences, language choices</td><td style={{ padding: "8px" }}>Persistent</td></tr>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}><td style={{ padding: "8px" }}>Analytics</td><td style={{ padding: "8px" }}>Track usage, improve experience</td><td style={{ padding: "8px" }}>Persistent</td></tr>
                      <tr><td style={{ padding: "8px" }}>Marketing</td><td style={{ padding: "8px" }}>Deliver relevant ads (opt-in only)</td><td style={{ padding: "8px" }}>Persistent</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>You can control cookies through your browser settings. Disabling essential cookies may affect website functionality.</p>
              </Section>

              <Section title="International Data Transfers">
                <p>We are based in the United States. Information we collect may be transferred to, stored, and processed in the United States and other countries where we or our service providers operate. By using our services, you consent to the transfer of your information to countries that may have different data protection laws than your jurisdiction.</p>
                <p>For transfers from the European Economic Area (EEA), we rely on:</p>
                <ul>
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Your explicit consent where appropriate</li>
                </ul>
              </Section>

              <Section title="Children's Privacy">
                <p>Our services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us.</p>
              </Section>

              <Section title="California Privacy Rights">
                <p>If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with specific rights regarding your personal information:</p>
                <ul>
                  <li>Right to know what personal information we collect, use, disclose, and sell</li>
                  <li>Right to request deletion of your personal information</li>
                  <li>Right to opt out of the sale of your personal information</li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>
                <p>We do not sell your personal information. To exercise your rights, contact <strong>privacy@managekube.com</strong>.</p>
              </Section>

              <Section title="Changes to Our Privacy Policy">
                <p>We will post any changes to our Privacy Policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website or via email. The date the Privacy Policy was last revised is identified at the top of the page.</p>
              </Section>

              <Section title="Contact Information">
                <p>To ask questions or comment about this Privacy Policy and our privacy practices:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>ManageKube, Inc.</p>
                  <p>Email: <strong>privacy@managekube.com</strong></p>
                  <p>Phone: <strong>240-257-2029</strong></p>
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

export default Privacy;
