/**
 * DO NOT TOUCH - About Page with Global Design Standards
 * Uses PageBanner for consistent header styling
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Shield, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Clear Ownership",
    description: "One team, one SLA, one point of accountability. No vendor finger-pointing.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Every solution designed with security embedded, not bolted on afterward.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We succeed when you succeed. Long-term relationships over short-term transactions.",
  },
  {
    icon: Zap,
    title: "Continuous Improvement",
    description: "Technology evolves. So do we. Quarterly reviews ensure your IT stays optimized.",
  },
];

const About = () => {
  return (
    <PageLayout>
      <PageBanner
        title="About ManageKube"
        subtitle="Making complex IT understandable. Enterprise infrastructure. Intelligent software. One accountable team."
      />

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-label text-muted-foreground mb-4">OUR MISSION</p>
              <h2 className="text-headline text-foreground mb-6">
                IT transformation shouldn't require a dozen vendors
              </h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                Most organizations juggle multiple IT vendors—each with their own SLA, 
                their own support portal, and their own blame when things go wrong. 
                ManageKube consolidates your IT ecosystem into a single accountable partnership.
              </p>
              <p className="text-body-lg text-muted-foreground">
                From assessment through ongoing operations, we provide the infrastructure, 
                security, compliance, and strategic guidance that modern enterprises need—all 
                through one relationship.
              </p>
            </div>
            <div className="bg-secondary p-8 lg:p-12">
              <div className="text-6xl lg:text-7xl font-bold text-brand-orange mb-4">
                8→1
              </div>
              <p className="text-xl font-semibold text-foreground mb-2">
                Eight vendors become one team
              </p>
              <p className="text-muted-foreground">
                Consolidate infrastructure, security, compliance, and operations 
                under a single point of accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-label text-muted-foreground mb-4">OUR VALUES</p>
            <h2 className="text-headline text-foreground">
              What we stand for
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border border-border"
              >
                <value.icon className="w-10 h-10 text-brand-orange mb-6" />
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-label text-white/50 mb-4">TECHNOLOGY PARTNERS</p>
            <h2 className="text-headline text-white mb-6">
              Built on enterprise foundations
            </h2>
            <p className="text-body-lg text-white/70">
              We source and implement from core technology partners, delivering 
              validated reference architectures and certified expertise.
            </p>
          </div>
          <div className="flex flex-wrap gap-8">
            {["Dell Technologies", "IBM", "Microsoft", "Cisco", "Veeam", "CrowdStrike"].map((partner) => (
              <div 
                key={partner}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-foreground mb-6">
            Ready to simplify your IT?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Take our free assessment to discover how ManageKube can consolidate 
            your vendor relationships and accelerate your transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
            >
              Onboard Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default About;
