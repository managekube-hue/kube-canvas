/**
 * DO NOT TOUCH - Assessment Page
 * Entry point for AI-powered Assessment Engine
 * Functionality and UI design are COMPLETED - do not modify
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Shield, Target, CheckCircle, Zap } from "lucide-react";

const assessmentBenefits = [
  {
    icon: Clock,
    title: "24-Hour Turnaround",
    description: "Receive your personalized transformation roadmap within one business day.",
  },
  {
    icon: Shield,
    title: "Risk Score Analysis",
    description: "AI-powered analysis identifies gaps across 10 infrastructure layers and 1,200+ controls.",
  },
  {
    icon: Target,
    title: "Prioritized Recommendations",
    description: "Get specific Kube and Block recommendations tailored to your industry and risk profile.",
  },
  {
    icon: Zap,
    title: "Instant BOM Generation",
    description: "Automatically generate a bill of materials based on your assessment results.",
  },
];

const assessmentSteps = [
  {
    step: "01",
    title: "Complete Assessment",
    description: "Answer 30-50 adaptive questions about your infrastructure, security, and compliance needs.",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our AI engine maps your responses to industry frameworks and identifies gaps.",
  },
  {
    step: "03",
    title: "Get Your Roadmap",
    description: "Receive a detailed transformation plan with timeline, budget, and recommended Kubes.",
  },
  {
    step: "04",
    title: "Build Your BOM",
    description: "Review recommendations and build your custom bill of materials for implementation.",
  },
];

const Assessment = () => {
  return (
    <PageLayout>
      {/* Gradient Banner - Matches other pages */}
      <PageBanner
        title="Discover Your Transformation Path"
        subtitle="Take our AI-powered assessment to receive a personalized roadmap, risk analysis, and recommended solutions—all completely free."
        phase="FREE ASSESSMENT"
      />

      {/* CTA Button Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/assessment/start"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
            >
              Onboard Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-label text-muted-foreground mb-4">WHY TAKE THE ASSESSMENT</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Get actionable insights in minutes, not months
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {assessmentBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t-2 border-foreground pt-8"
              >
                <benefit.icon className="w-8 h-8 text-brand-orange mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-label text-muted-foreground mb-4">HOW IT WORKS</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              From assessment to action in four steps
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {assessmentSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-foreground/5 mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                {index < assessmentSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-6 h-6 text-muted-foreground/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-label text-white/50 mb-4">YOUR RESULTS</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                What you'll receive
              </h2>
              <ul className="space-y-4">
                {[
                  "Risk Score (0-100) with detailed breakdown",
                  "Recommended Kubes prioritized by impact",
                  "Estimated timeline for transformation",
                  "Investment range based on company size",
                  "Downloadable PDF report",
                  "Auto-generated Bill of Materials",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl lg:text-7xl font-bold text-brand-orange mb-2">
                  67
                </div>
                <p className="text-white/50 text-sm mb-6">Sample Risk Score</p>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{ width: "67%" }} />
                </div>
                <p className="text-white/70 text-sm">
                  Medium-High Risk: Immediate attention recommended for security posture and compliance gaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to discover your transformation path?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of organizations who have used our assessment to accelerate their IT transformation.
          </p>
          <Link
            to="/assessment/start"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Onboard Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default Assessment;
