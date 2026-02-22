/**
 * Terms of Service — ManageKube, Inc.
 * Word-for-word from provided documentation
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Terms Governing Use of Our Services"
        subtitle="The terms and conditions that govern your use of ManageKube services and website."
        phase="TERMS OF SERVICE"
      />

      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: "13px", color: "#5A5A5B", marginBottom: "48px" }}>
                Last Updated: February 22, 2026
              </p>

              <Section title="1. Acceptance of Terms">
                <p>Welcome to ManageKube. By accessing or using managekube.com (the "Website"), our managed services, our open source projects, or any other services offered by ManageKube (collectively, the "Services"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.</p>
                <p>These Terms apply to:</p>
                <ul>
                  <li>Visitors to our website</li>
                  <li>Users of our managed services</li>
                  <li>Contributors to our open source projects</li>
                  <li>Prospective clients completing our assessment</li>
                  <li>Current clients under service agreements</li>
                </ul>
              </Section>

              <Section title="2. Changes to Terms">
                <p>We may revise these Terms from time to time. All changes are effective immediately when we post them. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes. We will notify you of material changes via email or through a notice on the website.</p>
              </Section>

              <Section title="3. Accessing the Services">
                <p>We reserve the right to withdraw or amend the Services, and any service or material we provide, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Services are unavailable at any time or for any period.</p>
                <SubHead>Account Responsibility</SubHead>
                <ul>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
                <SubHead>Accuracy of Information</SubHead>
                <ul>
                  <li>You represent that all information you provide is accurate, current, and complete</li>
                  <li>You will update your information as necessary to maintain its accuracy</li>
                </ul>
              </Section>

              <Section title="4. Managed Services">
                <p>Specific terms for managed services are governed by separate Service Agreements entered into between ManageKube and clients. In the event of a conflict between these Terms and a Service Agreement, the Service Agreement controls.</p>
                <SubHead>Service Levels</SubHead>
                <ul>
                  <li>Service levels are defined in the applicable Service Agreement</li>
                  <li>Credits or remedies for service level failures are as stated in the Service Agreement</li>
                </ul>
                <SubHead>Payment Terms</SubHead>
                <ul>
                  <li>Fees are as stated in the Service Agreement or as presented during onboarding</li>
                  <li>Payments are due according to the agreed schedule</li>
                  <li>Late payments may result in suspension of services</li>
                </ul>
                <SubHead>Termination</SubHead>
                <ul>
                  <li>Either party may terminate as provided in the Service Agreement</li>
                  <li>Upon termination, you must pay all amounts due through the termination date</li>
                </ul>
              </Section>

              <Section title="5. Open Source Projects">
                <p>ManageKube maintains open source projects, including the Kubric platform, under various open source licenses. Your use of open source software is governed by the applicable license (MIT, Apache 2.0, BSD, etc.), not these Terms.</p>
                <SubHead>Contributions</SubHead>
                <ul>
                  <li>By contributing to our open source projects, you agree to the contribution terms in the project's CONTRIBUTING.md file</li>
                  <li>You represent that you have the right to make the contribution</li>
                  <li>Contributions are licensed under the same license as the project</li>
                </ul>
                <SubHead>No Warranty</SubHead>
                <ul>
                  <li>Open source software is provided "AS IS" without warranty of any kind</li>
                  <li>See the project's LICENSE file for complete terms</li>
                </ul>
              </Section>

              <Section title="6. Intellectual Property Rights">
                <p>The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by ManageKube, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                <SubHead>Limited License</SubHead>
                <ul>
                  <li>We grant you a limited, non-exclusive, non-transferable license to access and use the Services for their intended purpose</li>
                  <li>You may not copy, modify, distribute, sell, or lease any part of the Services</li>
                  <li>You may not reverse engineer or attempt to extract source code from the Services</li>
                </ul>
                <SubHead>Feedback</SubHead>
                <ul><li>If you provide feedback or suggestions about the Services, we may use them without obligation to you</li></ul>
              </Section>

              <Section title="7. Trademarks">
                <p>ManageKube, the ManageKube logo, Kubric, XRO Essentials, XMX Advanced, XME Enterprise, and all related names, logos, product and service names, designs, and slogans are trademarks of ManageKube or its affiliates or licensors. You must not use such marks without the prior written permission of ManageKube.</p>
                <SubHead>Open Source Project Names</SubHead>
                <ul>
                  <li>The names of open source projects (including "Kubric") are trademarks of ManageKube</li>
                  <li>You may use the project name to refer to the project as released by ManageKube</li>
                  <li>You may not use the project name to brand derivative works without explicit written permission</li>
                </ul>
              </Section>

              <Section title="8. Prohibited Uses">
                <p>You may use the Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services:</p>
                <ul>
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                  <li>To transmit or procure the sending of any advertising or promotional material without our consent</li>
                  <li>To impersonate or attempt to impersonate ManageKube, a ManageKube employee, another user, or any other person or entity</li>
                  <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
                  <li>To attempt to gain unauthorized access to any part of the Services</li>
                  <li>To introduce any viruses, trojan horses, worms, logic bombs, or other malicious material</li>
                  <li>To interfere with the proper working of the Services</li>
                </ul>
              </Section>

              <Section title="9. Reliance on Information Posted">
                <p>The information presented on or through the Services is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk.</p>
                <SubHead>Assessment Results</SubHead>
                <ul>
                  <li>Assessment results are estimates based on the information you provide</li>
                  <li>Actual service tiers and pricing may vary based on verification during onboarding</li>
                  <li>Recommendations are for informational purposes and do not constitute professional advice</li>
                </ul>
              </Section>

              <Section title="10. Third-Party Links and Services">
                <p>The Services may contain links to third-party websites or services. These links are provided for your convenience only. We have no control over the contents of those sites or resources and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
              </Section>

              <Section title="11. Disclaimer of Warranties">
                <p style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "13px" }}>THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PROVIDED BY LAW, MANAGEKUBE DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
                <p style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "13px" }}>WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
                <SubHead>No Warranty for Open Source Software</SubHead>
                <ul>
                  <li>Open source software is provided "AS IS" without warranty</li>
                  <li>See the project's LICENSE file for complete terms</li>
                </ul>
              </Section>

              <Section title="12. Limitation of Liability">
                <p style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "13px" }}>TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL MANAGEKUBE, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, ANY WEBSITES LINKED TO THEM, ANY CONTENT ON THE SERVICES OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>
                <SubHead>Service Agreement Controls</SubHead>
                <ul>
                  <li>For managed services clients, liability limits in the Service Agreement apply</li>
                  <li>These Terms do not limit liability that cannot be limited by applicable law</li>
                </ul>
              </Section>

              <Section title="13. Indemnification">
                <p>You agree to defend, indemnify, and hold harmless ManageKube, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.</p>
              </Section>

              <Section title="14. Governing Law and Jurisdiction">
                <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws provisions.</p>
                <p>Any legal suit, action, or proceeding arising out of or related to these Terms or the Services shall be instituted exclusively in the federal courts of the United States or the courts of the State of Delaware. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.</p>
              </Section>

              <Section title="15. Waiver and Severability">
                <p>No waiver of these Terms by ManageKube shall be deemed a further or continuing waiver of such term or condition. If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.</p>
              </Section>

              <Section title="16. Entire Agreement">
                <p>These Terms, together with any applicable Service Agreement, constitute the sole and entire agreement between you and ManageKube regarding the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Services.</p>
              </Section>

              <Section title="17. Contact Information">
                <p>To ask questions or comment about these Terms:</p>
                <div style={{ background: "#EEE9E3", border: "1px solid #CDCAC5", padding: "32px", marginTop: "16px" }}>
                  <p style={{ fontWeight: 700, color: "#1D1D1B", marginBottom: "8px" }}>ManageKube, Inc.</p>
                  <p>Email: <strong>legal@managekube.com</strong></p>
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

export default Terms;
