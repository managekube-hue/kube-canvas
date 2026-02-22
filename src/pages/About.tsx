/**
 * About Page: ManageKube LLC
 * One Partner. Every Layer. Built Different.
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const leadership = [
  {
    name: "Sunny Avington",
    role: "Vision",
    description: "Sunny defines where ManageKube is going. The architecture, the methodology, the partner model, all shaped by a singular focus: making managed security actually work.",
  },
  {
    name: "Hildman Khan",
    role: "Product",
    description: "Hildman leads the Kubric platform. The data graph, the detection capabilities, the AI layer, built by someone who believes integration should be architectural, not incidental.",
  },
  {
    name: "Hamza Arshad",
    role: "Operations",
    description: "Hamza runs the 24/7 operations that deliver on the platform's promise. NOC, SOC, help desk, compliance, cloud, delivered by a team that knows your environment end to end.",
  },
  {
    name: "Ali Danish",
    role: "Engineering",
    description: "Ali builds what the rest design. The platform, the integrations, the automation, engineered to scale, engineered to last, engineered to be managed.",
  },
];

const beliefs = [
  {
    title: "Security enables business. It does not impede it.",
    description: "The right security program makes your organisation more resilient, more competitive, and more trustworthy. The wrong one creates friction, cost, and complexity. We build for the first outcome.",
  },
  {
    title: "Integration is architecture, not features.",
    description: "Bolting tools together is not integration. A unified data layer, a common methodology, and a single team: that is integration.",
  },
  {
    title: "Managed means outcomes, not just alerts.",
    description: "Alert forwarding is not managed security. True managed services deliver closed incidents, documented evidence, and measurable improvement.",
  },
  {
    title: "One partner is better than many.",
    description: "Fragmentation creates gaps. One team that knows your environment end to end closes them.",
  },
];

const whatWeDo = [
  { title: "Managed Services", desc: "24/7 operations across NOC, SOC, help desk, IT, compliance, and cloud." },
  { title: "Advisory Services", desc: "Assessments, testing, audits, and planning from practitioners who know your environment." },
  { title: "Deployment and Integration", desc: "Project services that design, deploy, and integrate technology across your environment." },
];

const About = () => {
  return (
    <PageLayout>
      <PageBanner
        title="About ManageKube"
        subtitle="One Partner. Every Layer. Built Different."
        phase="COMPANY"
      />

      {/* Origin */}
      <section style={{ background: "#FEFBF6", padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-label text-brand-orange mb-4">OUR ORIGIN</p>
                <div className="h-[2px] w-10 bg-brand-orange mb-6" />
                <h2 className="text-headline text-foreground mb-5" style={{ fontFamily: "'Special Elite', serif" }}>
                  We Built ManageKube Because the Industry Was Broken.
                </h2>
                <p className="text-body text-muted-foreground mb-4">
                  Security and IT should not be this hard. Organisations should not have to stitch together tools from a dozen vendors. They should not have to manage multiple providers for NOC, SOC, compliance, and cloud. They should not have to choose between enterprise-grade security and the ability to actually run their business.
                </p>
                <p className="text-body text-muted-foreground mb-4">
                  ManageKube was built to change that.
                </p>
                <p className="text-body text-muted-foreground">
                  We started with a simple question: What if one platform could deliver every capability an organisation needs, including infrastructure, security, intelligence, and operations, through one partner, one team, one architecture? That question became Kubric. And Kubric became the foundation of everything we do.
                </p>
              </div>
              <div className="bg-secondary p-12 border border-border">
                <div className="text-6xl font-black text-brand-orange mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
                  20+
                </div>
                <p className="text-lg font-bold text-foreground mb-2">
                  Integrated capabilities in one platform
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Infrastructure, security, intelligence, and operations delivered through a single team, a single architecture, and a single point of accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">WHAT WE BELIEVE</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-12" style={{ fontFamily: "'Special Elite', serif" }}>
              Four principles. Zero compromise.
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {beliefs.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-border p-9"
                >
                  <h3 className="text-base font-bold text-foreground mb-3">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section style={{ background: "#FEFBF6" }} className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">WHAT WE DO</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
              One partner. Every layer. Built different.
            </h2>
            <p className="text-body text-muted-foreground mb-12 max-w-2xl">
              ManageKube delivers security and IT services through the Kubric platform, a unified detection and response architecture with 20 integrated capabilities.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {whatWeDo.map((s) => (
                <div key={s.title} className="bg-secondary border border-border p-9">
                  <h3 className="text-base font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">LEADERSHIP</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
              The team behind ManageKube
            </h2>
            <p className="text-body text-muted-foreground mb-12 max-w-2xl">
              ManageKube is led by a collective of founders who share a single vision: build the only platform that delivers every layer of security and IT through one partner.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {leadership.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-border p-9"
                >
                  <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-3">{l.role}</p>
                  <h3 className="text-lg font-bold text-foreground mb-3">{l.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{l.description}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-8 max-w-2xl">
              Together, they built ManageKube because the industry needed something different. Together, they run it because different is harder, and worth it.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ background: "#FEFBF6" }} className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">CONTACT</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-secondary border border-border p-9">
                <p className="text-label text-muted-foreground mb-3">Phone</p>
                <a href="tel:+12402572029" className="text-lg font-bold text-foreground hover:text-brand-orange transition-colors">
                  (240) 257-2029
                </a>
              </div>
              <div className="bg-secondary border border-border p-9">
                <p className="text-label text-muted-foreground mb-3">Email</p>
                <a href="mailto:sales@managekube.com" className="text-lg font-bold text-foreground hover:text-brand-orange transition-colors">
                  sales@managekube.com
                </a>
              </div>
              <div className="bg-secondary border border-border p-9">
                <p className="text-label text-muted-foreground mb-3">Headquarters</p>
                <p className="text-lg font-bold text-foreground">Memphis, TN</p>
                <p className="text-xs text-muted-foreground mt-1">526 King Street, Alexandria, VA 22314</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-label text-brand-orange mb-4">GET STARTED</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-white mb-5" style={{ fontFamily: "'Special Elite', serif" }}>
              Ready to simplify your IT?
            </h2>
            <p className="text-sm text-white/50 mb-9 max-w-lg">
              Take our onboarding assessment to discover how ManageKube can consolidate your vendor relationships and accelerate your transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 font-bold text-white bg-brand-orange px-8 py-4 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight size={14} />
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 font-semibold text-white/55 border border-white/15 px-8 py-4 text-xs tracking-widest uppercase hover:border-brand-orange transition-colors"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
