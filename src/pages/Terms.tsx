/**
 * Terms of Service — ManageKube LLC
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Terms of Service"
        subtitle="The terms and conditions that govern your use of ManageKube services and website."
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
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") and ManageKube LLC ("ManageKube," "we," "us," or "our"), a Tennessee limited liability company. By accessing or using the ManageKube website at managekube.com or any of our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our website or services.
              </p>

              <Section title="1. Acceptance of Terms">
                <p>By accessing our website, submitting an assessment, engaging our services, or creating a Client Portal or Partner Portal account, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are accepting these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.</p>
              </Section>

              <Section title="2. Description of Services">
                <p>ManageKube provides enterprise managed IT, cybersecurity, and compliance services, including but not limited to:</p>
                <ul>
                  <li>Managed Security Operations Center (SOC) services, including 24/7 monitoring, threat detection, and incident response.</li>
                  <li>Managed Network Operations Center (NOC) services, including network monitoring, performance management, and infrastructure support.</li>
                  <li>Managed IT services, including help desk, endpoint management, patch management, and IT administration.</li>
                  <li>Managed compliance and governance, risk, and compliance (GRC) services across frameworks including NIST 800-53, NIST 800-171, CMMC, HIPAA, SOC 2, PCI DSS, ISO 27001, FedRAMP, FISMA, CJIS, CIS Controls, and NIST CSF.</li>
                  <li>IT assessment, security assessment, and maturity scoring services.</li>
                  <li>Cloud infrastructure management and migration services.</li>
                  <li>Physical security consulting and implementation.</li>
                  <li>Professional services including penetration testing, network buildouts, legacy system integration, infrastructure audits, and custom automation.</li>
                </ul>
                <p>The specific scope, deliverables, service levels, and pricing for services engaged by you will be set forth in a separate Master Service Agreement (MSA), Statement of Work (SOW), or Service Order executed between you and ManageKube.</p>
              </Section>

              <Section title="3. Service Tiers and Engagement Models">
                <p>ManageKube offers three primary service tiers:</p>
                <ul>
                  <li><strong>XRO — Essentials:</strong> Foundational monitoring, alerting, and compliance reporting.</li>
                  <li><strong>XMX — Advanced:</strong> Full-spectrum managed detection and response with proactive threat hunting.</li>
                  <li><strong>XME — Enterprise:</strong> Complete enterprise coverage with dedicated resources, custom integrations, and executive advisory.</li>
                </ul>
                <p>Services may be delivered under the following engagement models:</p>
                <ul>
                  <li><strong>Fully Managed:</strong> ManageKube assumes full operational responsibility for the services in scope.</li>
                  <li><strong>Co-Managed:</strong> ManageKube augments your existing IT or security team with specialized capabilities.</li>
                  <li><strong>Self-Managed:</strong> You retain operational control with access to the ManageKube platform and tools.</li>
                </ul>
              </Section>

              <Section title="4. User Accounts and Responsibilities">
                <p>If you create an account on the ManageKube Client Portal or Partner Portal, you are responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of your account credentials.</li>
                  <li>All activities that occur under your account.</li>
                  <li>Notifying ManageKube immediately of any unauthorized use of your account or any other breach of security.</li>
                  <li>Ensuring that your use of our services complies with all applicable laws and regulations.</li>
                </ul>
                <p>ManageKube reserves the right to suspend or terminate your account if we reasonably believe that your account has been compromised or that you are in violation of these Terms.</p>
              </Section>

              <Section title="5. Intellectual Property">
                <p>All content, materials, software, documentation, methodologies, processes, and intellectual property displayed on or provided through the ManageKube website and services, including but not limited to the Kubric UIDR platform, KubricAI, the Kubric Data Graph, and our 7-step methodology (Hunt, Identify, Alert, Triage, Diagnose, Remediate, Document), are the exclusive property of ManageKube LLC or its licensors.</p>
                <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our intellectual property without our prior written consent.</p>
              </Section>

              <Section title="6. Open Source Components">
                <p>Certain components of the ManageKube platform may incorporate open-source software. Open-source components are subject to their respective licenses, which take precedence over these Terms with respect to those components. A list of open-source components and their applicable licenses is available upon request by contacting <strong>legal@managekube.com</strong>.</p>
              </Section>

              <Section title="7. Confidentiality">
                <p>Both parties acknowledge that in the course of the engagement, each party may receive confidential information from the other. Each party agrees to hold such confidential information in strict confidence and not to disclose it to any third party without the prior written consent of the disclosing party, except as required by law or as necessary to perform the services. This obligation of confidentiality shall survive the termination of these Terms for a period of five (5) years.</p>
              </Section>

              <Section title="8. Service Level Agreements">
                <p>Specific service level commitments, including uptime guarantees, response times, and resolution targets, will be defined in the applicable MSA or SOW. ManageKube's general service level objectives include:</p>
                <ul>
                  <li>24/7/365 monitoring and alerting for all managed environments.</li>
                  <li>Critical incident response initiation within 15 minutes.</li>
                  <li>Quarterly business reviews and strategic roadmap updates.</li>
                  <li>Monthly compliance reporting and security posture assessments.</li>
                </ul>
              </Section>

              <Section title="9. Payment Terms">
                <p>Fees for ManageKube services are set forth in the applicable SOW or Service Order. Unless otherwise agreed in writing:</p>
                <ul>
                  <li>Invoices are issued monthly in advance.</li>
                  <li>Payment is due within thirty (30) days of the invoice date.</li>
                  <li>Late payments are subject to interest at a rate of 1.5% per month or the maximum rate permitted by law, whichever is lower.</li>
                  <li>ManageKube reserves the right to suspend services if payment is more than sixty (60) days overdue.</li>
                </ul>
              </Section>

              <Section title="10. Limitation of Liability">
                <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MANAGEKUBE LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OUR SERVICES OR THESE TERMS, REGARDLESS OF THE THEORY OF LIABILITY.</p>
                <p>MANAGEKUBE'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO MANAGEKUBE DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
              </Section>

              <Section title="11. Indemnification">
                <p>You agree to indemnify, defend, and hold harmless ManageKube LLC, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of our services; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; or (d) your violation of any rights of a third party.</p>
              </Section>

              <Section title="12. Termination">
                <p>Either party may terminate the service engagement as provided in the applicable MSA or SOW. ManageKube may suspend or terminate your access to the website or services immediately, without prior notice, if:</p>
                <ul>
                  <li>You breach any provision of these Terms.</li>
                  <li>We are required to do so by law.</li>
                  <li>We reasonably believe that your continued use poses a security risk.</li>
                </ul>
                <p>Upon termination, all rights granted to you under these Terms will immediately cease. Provisions that by their nature should survive termination (including but not limited to intellectual property, confidentiality, limitation of liability, and indemnification) shall survive.</p>
              </Section>

              <Section title="13. Governing Law and Dispute Resolution">
                <p>These Terms shall be governed by and construed in accordance with the laws of the State of Tennessee, without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms shall be resolved exclusively in the state or federal courts located in Shelby County, Tennessee. Both parties consent to the personal jurisdiction and venue of such courts.</p>
              </Section>

              <Section title="14. Force Majeure">
                <p>Neither party shall be liable for any failure or delay in performance resulting from causes beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemics, war, terrorism, labor disputes, power failures, internet disruptions, or governmental actions.</p>
              </Section>

              <Section title="15. Severability">
                <p>If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms shall remain in full force and effect.</p>
              </Section>

              <Section title="16. Entire Agreement">
                <p>These Terms, together with our Privacy Policy and any applicable MSA, SOW, or Service Order, constitute the entire agreement between you and ManageKube with respect to the subject matter hereof and supersede all prior or contemporaneous communications, whether electronic, oral, or written.</p>
              </Section>

              <Section title="17. Changes to These Terms">
                <p>ManageKube reserves the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page with a revised "Last Updated" date. Your continued use of our website or services after the posting of changes constitutes your acceptance of such changes.</p>
              </Section>

              <Section title="18. Contact Information">
                <p>For questions about these Terms of Service, please contact us:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>ManageKube LLC</p>
                  <p>Email: <strong>legal@managekube.com</strong></p>
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

export default Terms;
