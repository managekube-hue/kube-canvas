/**
 * Assessment / Onboarding — Smart Pricing Simulator
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Target, DollarSign, Map, Mail, UserCheck } from "lucide-react";

const postAssessmentSteps = [
  {
    icon: Target,
    step: "1",
    title: "Your responses are analyzed",
    description: "The scoring engine computes your EMS across 10 control family dimensions.",
  },
  {
    icon: FileText,
    step: "2",
    title: "Your tier is recommended",
    description: "XRO Essentials, XMX Advanced, or XME Enterprise based on your score and profile.",
  },
  {
    icon: DollarSign,
    step: "3",
    title: "Your price is calculated",
    description: "Base rate + per-endpoint fee, with milestone reductions shown.",
  },
  {
    icon: Map,
    step: "4",
    title: "Your roadmap is generated",
    description: "Prioritized remediation items based on your gap flags.",
  },
  {
    icon: Mail,
    step: "5",
    title: "Your results are delivered",
    description: "View online, download as PDF, and receive via email.",
  },
  {
    icon: UserCheck,
    step: "6",
    title: "You onboard directly",
    description: "No sales call required. Select your tier, complete your profile, and begin onboarding immediately.",
  },
];

const Assessment = () => {
  return (
    <PageLayout>
      <PageBanner
        title="See Where You Stand. Get a Personalized Recommendation."
        subtitle="Answer a few questions about your environment, your team, and your challenges. Our Smart Pricing Simulator analyzes your responses, computes your Environment Maturity Score (EMS), and delivers a recommended service tier, monthly price, and prioritized remediation roadmap."
        phase="SMART PRICING SIMULATOR"
      />

      {/* CTA Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-muted-foreground mb-6 text-lg">
            The assessment takes 10–20 minutes. Your personalized proposal is generated immediately.
          </p>
          <Link
            to="/assessment/start"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Begin Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* What Happens After */}
      <section style={{ background: "#FEFBF6" }} className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-label text-muted-foreground mb-4">WHAT HAPPENS NEXT</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              What Happens After You Complete the Assessment
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {postAssessmentSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t-2 border-foreground pt-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">STEP {item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Data Handling */}
      <section className="py-16 bg-secondary border-y border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Privacy & Data Handling</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your responses are confidential and used only to generate your assessment and recommendation. We do not share your information with third parties. Full details in our{" "}
              <Link to="/privacy" className="text-brand-orange underline hover:opacity-80">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to see where you stand?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/assessment/start"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/service-tiers"
              className="inline-flex items-center gap-2 bg-foreground text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Assessment;
