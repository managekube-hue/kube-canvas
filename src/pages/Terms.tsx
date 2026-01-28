/**
 * DO NOT TOUCH - Terms of Service Page
 * Standard terms of service placeholder
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Terms of Service"
        subtitle="The terms and conditions that govern your use of our services."
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
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using ManageKube services, you agree to be bound by these 
                Terms of Service. If you do not agree to all the terms and conditions, 
                you may not access or use our services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Description of Services
              </h2>
              <p className="text-muted-foreground mb-6">
                ManageKube provides IT transformation services including assessment, 
                compliance, managed security, managed IT operations, advisory services, 
                and technology implementation. The specific services provided to you 
                will be outlined in a separate service agreement.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-muted-foreground mb-6">
                You are responsible for maintaining the confidentiality of your account 
                credentials and for all activities that occur under your account. You agree 
                to notify us immediately of any unauthorized use of your account.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-muted-foreground mb-6">
                All content, trademarks, and intellectual property on this website are 
                owned by ManageKube or its licensors. You may not use, reproduce, or 
                distribute any content without our prior written permission.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-6">
                To the maximum extent permitted by law, ManageKube shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, 
                or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Indemnification
              </h2>
              <p className="text-muted-foreground mb-6">
                You agree to indemnify and hold ManageKube harmless from any claims, 
                damages, losses, and expenses arising from your use of our services 
                or your violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Governing Law
              </h2>
              <p className="text-muted-foreground mb-6">
                These Terms shall be governed by and construed in accordance with the 
                laws of the State of Tennessee, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to modify these Terms at any time. We will notify 
                you of any changes by posting the new Terms on this page with an updated 
                revision date.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Contact Information
              </h2>
              <p className="text-muted-foreground mb-6">
                For questions about these Terms, please contact us at:<br />
                <strong>Email:</strong> legal@managekube.com<br />
                <strong>Address:</strong> 123 Main Street, Memphis, TN 38103
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
