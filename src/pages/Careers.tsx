/**
 * Careers Page: ManageKube
 * Build the Future of Managed Security and IT.
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Briefcase, Mail } from "lucide-react";

const openPositions = [
  {
    title: "Security Operations Center (SOC) Analyst",
    location: "Remote / Multiple Shifts",
    description: "Monitor security alerts across 23 detection capabilities. Triage incidents. Escalate when needed. Document everything. 24/7 coverage means shift work, but your team has your back.",
    requirements: "2+ years SOC experience. Familiarity with SIEM, EDR, NDR. Willingness to work nights/weekends as part of rotation.",
    email: "careers@managekube.com",
    subject: "SOC Analyst",
  },
  {
    title: "Network Operations Center (NOC) Engineer",
    location: "Remote / Multiple Shifts",
    description: "Monitor network performance across client environments. Detect anomalies before users report them. Escalate to engineering when needed. Keep the network running.",
    requirements: "3+ years network engineering or NOC experience. Familiarity with routing, switching, SD-WAN. Industry certifications preferred.",
    email: "careers@managekube.com",
    subject: "NOC Engineer",
  },
  {
    title: "Detection Engineer",
    location: "Remote / Day Shift",
    description: "Build and tune detection logic across the Kubric platform. Create new detections. Improve existing ones. Stay ahead of adversaries.",
    requirements: "3+ years detection engineering. Experience with Sigma, YARA, or custom detection logic. Scripting proficiency.",
    email: "careers@managekube.com",
    subject: "Detection Engineer",
  },
  {
    title: "Platform Engineer",
    location: "Remote / Day Shift",
    description: "Build and maintain the Kubric platform. Work across the stack: ingestion, graph, API, automation. Make the platform faster, more reliable, more capable.",
    requirements: "5+ years software engineering. Experience with distributed systems, databases, or security platforms. Go/Python proficiency.",
    email: "careers@managekube.com",
    subject: "Platform Engineer",
  },
  {
    title: "Customer Success Manager",
    location: "Remote / Day Shift",
    description: "Own the relationship with assigned clients. Ensure they are getting value. Identify expansion opportunities. Be the voice of the customer internally.",
    requirements: "3+ years customer success or account management. Experience in security/IT services preferred.",
    email: "careers@managekube.com",
    subject: "Customer Success Manager",
  },
  {
    title: "Sales Development Representative",
    location: "Remote / Day Shift",
    description: "Generate and qualify leads. Set meetings for the sales team. Build pipeline. Learn the business from the ground up.",
    requirements: "1+ years sales or business development. Strong communication skills. Hunger to learn.",
    email: "careers@managekube.com",
    subject: "SDR",
  },
];

const whyJoin = [
  { title: "Mission-driven work", desc: "You will protect organisations that keep the world running. Manufacturing. Healthcare. Public sector. Energy. Finance. Your work matters." },
  { title: "Technical depth", desc: "You will work on the Kubric engine: 23 integrated capabilities, a unified data graph, AI-driven detection. You will never stop learning." },
  { title: "Career growth", desc: "We are growing fast. Your role can grow with us." },
  { title: "Great team", desc: "You will work with people who are smart, collaborative, and committed to doing things right." },
  { title: "Competitive compensation", desc: "Salary, benefits, equity, and professional development." },
];

const Careers = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Careers at ManageKube"
        subtitle="Build the Future of Managed Security and IT."
      />

      {/* Intro */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">WHY JOIN US</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-6" style={{ fontFamily: "'Special Elite', serif" }}>
              We are building something different. Join us.
            </h2>
            <p className="text-body-lg text-muted-foreground mb-12 max-w-2xl">
              ManageKube is redefining what managed security and IT can be. One platform. One team. One partner for every layer. We are looking for people who want to build something better.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyJoin.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-secondary border border-border p-8"
                >
                  <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">OPEN POSITIONS</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-12" style={{ fontFamily: "'Special Elite', serif" }}>
              Current Opportunities
            </h2>
            <div className="space-y-6">
              {openPositions.map((pos, i) => (
                <motion.div
                  key={pos.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-background border border-border p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{pos.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {pos.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pos.description}</p>
                  <p className="text-xs text-muted-foreground mb-4"><strong className="text-foreground">Requirements:</strong> {pos.requirements}</p>
                  <a
                    href={`mailto:${pos.email}?subject=${encodeURIComponent(pos.subject)}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:opacity-80 transition-opacity"
                  >
                    <Mail className="w-3 h-3" /> Apply: {pos.email}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 border-t border-border bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-10">You May Also Like</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {[
                { label: "About ManageKube", href: "/about" },
                { label: "Partners", href: "/about/partners" },
                { label: "Roadmap", href: "/about/roadmap" },
              ].map((s) => (
                <Link
                  key={s.label}
                  to={s.href}
                  className="group bg-background p-8 flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-brand-orange transition-colors">{s.label}</span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-foreground mb-6" style={{ fontFamily: "'Special Elite', serif" }}>
            Don't see your role?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            We are always looking for talented people. Send us your resume and tell us how you would contribute to the ManageKube mission.
          </p>
          <a
            href="mailto:careers@managekube.com"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:opacity-90 transition-opacity"
          >
            careers@managekube.com
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
