/**
 * DO NOT TOUCH - Careers Page with Global Design Standards
 * Uses PageBanner for consistent header styling
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";

const openPositions = [
  {
    title: "Senior Security Engineer",
    department: "MSSP Operations",
    location: "Memphis, TN / Remote",
    type: "Full-time",
  },
  {
    title: "Cloud Solutions Architect",
    department: "Advisory Services",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Compliance Analyst",
    department: "Compliance Kube",
    location: "Memphis, TN / Remote",
    type: "Full-time",
  },
  {
    title: "IT Service Desk Lead",
    department: "MSP Operations",
    location: "Memphis, TN",
    type: "Full-time",
  },
];

const benefits = [
  "Competitive salary and equity",
  "100% remote-friendly positions",
  "Unlimited PTO policy",
  "401(k) with company match",
  "Comprehensive health benefits",
  "Professional development budget",
  "Industry certifications covered",
  "Modern equipment provided",
];

const Careers = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Careers at ManageKube"
        subtitle="Join the team making complex IT understandable. Build enterprise solutions that matter."
      />

      {/* Intro Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-label text-muted-foreground mb-4">WHY JOIN US</p>
              <h2 className="text-headline text-foreground mb-6">
                Work on challenging problems
              </h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                At ManageKube, you'll work with enterprise clients on complex IT 
                transformations. From securing critical infrastructure to implementing 
                AI-powered automation, every project pushes boundaries.
              </p>
              <p className="text-body-lg text-muted-foreground">
                We're building a team of experts who can think strategically and 
                execute precisely. If you want to make a real impact, this is the place.
              </p>
            </div>
            <div className="bg-secondary p-8 lg:p-12">
              <p className="text-label text-muted-foreground mb-6">BENEFITS & PERKS</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 bg-brand-orange flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-label text-muted-foreground mb-4">OPEN POSITIONS</p>
            <h2 className="text-headline text-foreground">
              Current opportunities
            </h2>
          </div>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to="/contact"
                  className="block bg-white p-6 lg:p-8 border border-border hover:border-foreground transition-colors group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-2 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-foreground mb-6">
            Don't see your role?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and 
            tell us how you'd contribute to the ManageKube mission.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
          >
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default Careers;
