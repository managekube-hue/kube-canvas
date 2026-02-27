/**
 * Accessibility Statement: ManageKube, Inc.
 * Word-for-word from provided documentation
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Accessibility = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Commitment to Digital Accessibility"
        subtitle="ManageKube is committed to ensuring digital accessibility for people with disabilities."
        phase="ACCESSIBILITY"
      />

      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: "13px", color: "#5A5A5B", marginBottom: "48px" }}>
                Last Updated: February 22, 2026
              </p>

              <Section title="Our Commitment">
                <p>ManageKube is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.</p>
              </Section>

              <Section title="Conformance Status">
                <p>The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. We aim to conform to WCAG 2.1 Level AA standards.</p>
                <p>Our website and assessment tools are designed to be:</p>
                <ul>
                  <li><strong>Perceivable</strong> — Information and user interface components must be presentable to users in ways they can perceive</li>
                  <li><strong>Operable</strong> — User interface components and navigation must be operable</li>
                  <li><strong>Understandable</strong> — Information and the operation of user interface must be understandable</li>
                  <li><strong>Robust</strong> — Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies</li>
                </ul>
              </Section>

              <Section title="Accessibility Features">
                <p>Our website incorporates the following accessibility features:</p>
                <SubHead>Navigation</SubHead>
                <ul>
                  <li>Consistent navigation structure across all pages</li>
                  <li>Skip navigation links available</li>
                  <li>Descriptive page titles and headings</li>
                  <li>Keyboard-accessible navigation</li>
                </ul>
                <SubHead>Content</SubHead>
                <ul>
                  <li>Clear, simple language</li>
                  <li>Descriptive link text</li>
                  <li>Alternative text for images</li>
                  <li>Transcripts for video content (where available)</li>
                </ul>
                <SubHead>Visual Design</SubHead>
                <ul>
                  <li>Sufficient color contrast</li>
                  <li>Text resizable up to 200% without loss of content</li>
                  <li>Content readable when zoomed</li>
                  <li>No reliance on color alone to convey information</li>
                </ul>
                <SubHead>Forms and Assessment</SubHead>
                <ul>
                  <li>Clear form labels and instructions</li>
                  <li>Error identification and suggestions</li>
                  <li>Focus indicators for keyboard navigation</li>
                  <li>Sufficient time to complete assessment (no timed sessions)</li>
                </ul>
              </Section>

              <Section title="Known Limitations">
                <p>Despite our best efforts to ensure accessibility, there may be some limitations. Below is a description of known limitations:</p>
                <div style={{ overflowX: "auto", marginBottom: "16px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #CDCAC5" }}>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Limitation</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Description</th>
                        <th style={{ textAlign: "left", padding: "8px", fontWeight: 700 }}>Workaround</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}>
                        <td style={{ padding: "8px" }}>Third-party content</td>
                        <td style={{ padding: "8px" }}>Some embedded content from third parties may not be fully accessible</td>
                        <td style={{ padding: "8px" }}>Contact us for alternative formats</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #CDCAC5" }}>
                        <td style={{ padding: "8px" }}>Complex data tables</td>
                        <td style={{ padding: "8px" }}>Some data tables may be complex for screen readers</td>
                        <td style={{ padding: "8px" }}>Contact us for data in alternative format</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px" }}>Older PDF documents</td>
                        <td style={{ padding: "8px" }}>Some older PDFs may not be fully accessible</td>
                        <td style={{ padding: "8px" }}>Contact us for accessible versions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>If you encounter any accessibility barriers, please contact us.</p>
              </Section>

              <Section title="Feedback and Assistance">
                <p>We welcome your feedback on the accessibility of our website and services. If you encounter accessibility barriers or have suggestions for improvement:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px", marginBottom: "16px" }}>
                  <p>Email: <strong>accessibility@managekube.com</strong></p>
                  <p>Phone: <strong>240-257-2029</strong></p>
                  <p>Contact Form: <strong>/contact</strong></p>
                </div>
                <p>We aim to respond to accessibility feedback within 2 business days and to propose a resolution within 5 business days.</p>
              </Section>

              <Section title="Alternative Formats">
                <p>If you need any content in an alternative format, please contact us. We can provide:</p>
                <ul>
                  <li>Large print versions</li>
                  <li>Plain text versions</li>
                  <li>Accessible PDFs</li>
                  <li>Content via email for use with assistive technology</li>
                </ul>
              </Section>

              <Section title="Compatibility with Browsers and Assistive Technology">
                <p>Our website is designed to be compatible with:</p>
                <ul>
                  <li>Recent versions of major screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                  <li>Browser accessibility features</li>
                  <li>Operating system accessibility settings</li>
                </ul>
              </Section>

              <Section title="Ongoing Efforts">
                <p>We are committed to continuous accessibility improvement:</p>
                <ul>
                  <li>Regular accessibility audits</li>
                  <li>Staff training on accessibility</li>
                  <li>Testing with assistive technologies</li>
                  <li>Considering accessibility in all design and development</li>
                  <li>Monitoring industry standards and best practices</li>
                </ul>
              </Section>

              <Section title="Third-Party Applications">
                <p>While we strive to ensure accessibility, some third-party applications and content integrated with our services may not be fully accessible. We encourage feedback on specific third-party barriers and work with vendors to improve accessibility.</p>
              </Section>

              <Section title="Contact Us">
                <p>If you have questions, need assistance, or want to provide feedback:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p>Email: <strong>accessibility@managekube.com</strong></p>
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

export default Accessibility;
