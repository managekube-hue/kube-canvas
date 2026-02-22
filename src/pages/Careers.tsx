/**
 * Careers Page: ManageKube
 * Now powered by CMS — pulls published positions from cms_career_postings table.
 */

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Mail, Briefcase, Loader2 } from "lucide-react";

interface CareerPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  nice_to_haves: string[];
  salary_range: string | null;
  application_email: string;
}

const whyJoin = [
  { title: "Mission-driven work", desc: "You will protect organisations that keep the world running. Manufacturing. Healthcare. Public sector. Energy. Finance. Your work matters." },
  { title: "Technical depth", desc: "You will work on the Kubric engine: 23 integrated capabilities, a unified data graph, AI-driven detection. You will never stop learning." },
  { title: "Career growth", desc: "We are growing fast. Your role can grow with us." },
  { title: "Great team", desc: "You will work with people who are smart, collaborative, and committed to doing things right." },
  { title: "Competitive compensation", desc: "Salary, benefits, equity, and professional development." },
];

const Careers = () => {
  const [positions, setPositions] = useState<CareerPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("cms_career_postings")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setPositions(data || []);
      } catch (err) {
        console.error("Failed to load career postings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

      {/* Open Positions — from CMS */}
      <section id="openings" className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">OPEN POSITIONS</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-12" style={{ fontFamily: "'Special Elite', serif" }}>
              Current Opportunities
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading positions...
              </div>
            ) : positions.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No open positions at this time. Check back soon or send your resume to careers@managekube.com.
              </p>
            ) : (
              <div className="space-y-6">
                {positions.map((pos, i) => (
                  <motion.div
                    key={pos.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-background border border-border p-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{pos.title}</h3>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {pos.location}</span>
                          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {pos.department}</span>
                          <span>{pos.employment_type}</span>
                          {pos.salary_range && <span className="text-brand-orange font-bold">{pos.salary_range}</span>}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pos.description}</p>

                    {pos.requirements && pos.requirements.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-bold text-foreground mb-2">Requirements:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                          {pos.requirements.map((req, ri) => <li key={ri}>{req}</li>)}
                        </ul>
                      </div>
                    )}

                    {pos.nice_to_haves && pos.nice_to_haves.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-foreground mb-2">Nice to Have:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                          {pos.nice_to_haves.map((nth, ni) => <li key={ni}>{nth}</li>)}
                        </ul>
                      </div>
                    )}

                    <a
                      href={`mailto:${pos.application_email}?subject=${encodeURIComponent(`Application: ${pos.title}`)}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:opacity-80 transition-opacity"
                    >
                      <Mail className="w-3 h-3" /> Apply: {pos.application_email}
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
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
