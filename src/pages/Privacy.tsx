/**
 * Privacy Policy — ManageKube LLC
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Privacy Policy"
        subtitle="How ManageKube LLC collects, uses, stores, and protects your personal information."
        phase="LEGAL"
      />

      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p style={{ fontSize: "13px", color: "#5A5A5B", marginBottom: "48px" }}>
                Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: February 22, 2026
              </p>

              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#393837", marginBottom: "32px" }}>
                ManageKube LLC ("ManageKube," "we," "us," or "our") is committed to protecting the privacy of our clients, prospective clients, website visitors, and business partners. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website at managekube.com, use our services, or otherwise interact with us.
              </p>

              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#393837", marginBottom: "48px" }}>
                By accessing or using our website or services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
              </p>

              <Section title="1. Information We Collect">
                <p>We collect information in the following categories:</p>
                <SubHead>1.1 Information You Provide Directly</SubHead>
                <ul>
                  <li>Contact information: first name, last name, email address, phone number, company name, and job title.</li>
                  <li>Assessment and onboarding data: responses to our IT maturity assessment, infrastructure details, endpoint counts, compliance frameworks, and organizational information.</li>
                  <li>Communications: messages, inquiries, and feedback you submit through our contact forms, email, or phone.</li>
                  <li>Account credentials: login information for the ManageKube Client Portal or Partner Portal.</li>
                </ul>
                <SubHead>1.2 Information Collected Automatically</SubHead>
                <ul>
                  <li>Device and browser information: IP address, browser type, operating system, device identifiers, and screen resolution.</li>
                  <li>Usage data: pages visited, time spent on pages, click patterns, referring URLs, and navigation paths.</li>
                  <li>Cookies and tracking technologies: we use cookies, web beacons, and similar technologies to enhance your experience. See Section 6 below for details.</li>
                </ul>
                <SubHead>1.3 Information from Third Parties</SubHead>
                <ul>
                  <li>CRM and marketing platforms: we may receive information from HubSpot, Resend, or other platforms used to manage client relationships.</li>
                  <li>Technology partners: Dell Technologies, IBM, Pax8, and TD SYNNEX may share information related to joint engagements.</li>
                </ul>
              </Section>

              <Section title="2. How We Use Your Information">
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                  <li>To provide, operate, and maintain our managed IT, security, and compliance services.</li>
                  <li>To process and respond to your inquiries, assessment submissions, and service requests.</li>
                  <li>To send you technical notices, security alerts, support messages, and administrative communications.</li>
                  <li>To personalize your experience and deliver content relevant to your industry, organization size, and IT maturity.</li>
                  <li>To generate recommended service tiers (XRO, XMX, XME) and engagement models based on your assessment results.</li>
                  <li>To improve our website, services, and internal operations through analytics and usage patterns.</li>
                  <li>To comply with legal obligations, enforce our terms of service, and protect against fraud or unauthorized access.</li>
                  <li>To communicate marketing information, service updates, and promotional offers (with your consent where required by law).</li>
                </ul>
              </Section>

              <Section title="3. Information Sharing and Disclosure">
                <p>ManageKube does not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:</p>
                <ul>
                  <li><strong>Service providers:</strong> We share information with trusted third-party vendors who assist us in operating our website, conducting business operations, or delivering services to you. These vendors are contractually obligated to maintain the confidentiality and security of your information.</li>
                  <li><strong>Technology partners:</strong> When you engage with services that involve our technology partners (Dell Technologies, IBM, Pax8, TD SYNNEX), we may share relevant information to facilitate service delivery.</li>
                  <li><strong>Legal requirements:</strong> We may disclose your information when required by law, subpoena, court order, or governmental regulation, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                  <li><strong>Business transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction.</li>
                </ul>
              </Section>

              <Section title="4. Data Security">
                <p>ManageKube implements industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul>
                  <li>Encryption of data in transit using TLS 1.2 or higher.</li>
                  <li>Encryption of data at rest using AES-256 encryption.</li>
                  <li>Access controls and role-based permissions for all internal systems.</li>
                  <li>Regular security assessments, vulnerability scanning, and penetration testing.</li>
                  <li>Employee security awareness training and background checks.</li>
                  <li>Incident response procedures aligned with our 7-step methodology: Hunt, Identify, Alert, Triage, Diagnose, Remediate, Document.</li>
                </ul>
                <p>While we strive to protect your information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.</p>
              </Section>

              <Section title="5. Data Retention">
                <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Assessment data is retained for the duration of the client relationship plus seven (7) years. Marketing contact information is retained until you opt out or request deletion.</p>
              </Section>

              <Section title="6. Cookies and Tracking Technologies">
                <p>Our website uses cookies and similar tracking technologies to:</p>
                <ul>
                  <li>Remember your preferences and settings for future visits.</li>
                  <li>Analyze website traffic and usage patterns to improve site performance.</li>
                  <li>Deliver relevant content and measure the effectiveness of our communications.</li>
                  <li>Support essential website functionality such as session management and security.</li>
                </ul>
                <p>You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain features on our website.</p>
              </Section>

              <Section title="7. Your Rights and Choices">
                <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete personal information.</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements.</li>
                  <li><strong>Opt-out:</strong> Opt out of receiving marketing communications at any time by clicking the "unsubscribe" link in any email or contacting us directly.</li>
                  <li><strong>Data portability:</strong> Request a copy of your data in a structured, commonly used, and machine-readable format.</li>
                  <li><strong>Restriction:</strong> Request restriction of processing of your personal information in certain circumstances.</li>
                </ul>
                <p>To exercise any of these rights, contact us at <strong>privacy@managekube.com</strong> or call <strong>(901) 907-7447</strong>. We will respond to your request within thirty (30) days.</p>
              </Section>

              <Section title="8. Third-Party Links">
                <p>Our website may contain links to third-party websites, services, or applications that are not operated by ManageKube. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
              </Section>

              <Section title="9. Children's Privacy">
                <p>Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.</p>
              </Section>

              <Section title="10. California Privacy Rights (CCPA)">
                <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. ManageKube does not sell personal information.</p>
              </Section>

              <Section title="11. Changes to This Privacy Policy">
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated Privacy Policy on this page with a revised "Last Updated" date. Your continued use of our website or services after the posting of changes constitutes your acceptance of such changes.</p>
              </Section>

              <Section title="12. Contact Us">
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>ManageKube LLC</p>
                  <p>Email: <strong>privacy@managekube.com</strong></p>
                  <p>Phone: <strong>(901) 907-7447</strong></p>
                  <p>Address: <strong>Memphis, TN 38103</strong></p>
                  <p>Website: <strong>managekube.com</strong></p>
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
