/**
 * DO NOT TOUCH - Privacy Policy Page
 * Standard privacy policy placeholder
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-6">
                We collect information you provide directly to us, including when you request 
                information about our services, take an assessment, contact us for support, 
                or otherwise communicate with us.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-6">
                We use the information we collect to provide, maintain, and improve our services, 
                to communicate with you, and to personalize your experience. We may also use 
                information to send you technical notices, updates, and administrative messages.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground mb-6">
                We do not sell, trade, or otherwise transfer your personal information to outside 
                parties. This does not include trusted third parties who assist us in operating 
                our website, conducting our business, or servicing you, so long as those parties 
                agree to keep this information confidential.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground mb-6">
                We implement a variety of security measures to maintain the safety of your 
                personal information. All sensitive information is transmitted via Secure 
                Socket Layer (SSL) technology and encrypted within our database.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Cookies
              </h2>
              <p className="text-muted-foreground mb-6">
                We use cookies to understand and save your preferences for future visits and 
                compile aggregate data about site traffic and site interaction so that we can 
                offer better site experiences and tools in the future.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Third-Party Links
              </h2>
              <p className="text-muted-foreground mb-6">
                Occasionally, at our discretion, we may include or offer third-party products 
                or services on our website. These third-party sites have separate and independent 
                privacy policies. We have no responsibility or liability for the content and 
                activities of these linked sites.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Your Rights
              </h2>
              <p className="text-muted-foreground mb-6">
                You have the right to access, correct, or delete your personal information. 
                You may also opt out of receiving marketing communications from us at any time. 
                To exercise these rights, please contact us using the information below.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy, please contact us at:<br />
                <strong>Email:</strong> privacy@managekube.com<br />
                <strong>Address:</strong> 123 Main Street, Memphis, TN 38103
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;
