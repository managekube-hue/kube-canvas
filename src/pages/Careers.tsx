/**
 * Careers Page: ManageKube
 * Now powered by CMS — pulls published positions from cms_career_postings table.
 * Applications submit via inline form with resume upload.
 */

import { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase, Loader2, Upload, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", linkedin_url: "", cover_letter: "" });

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

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSubmitting(true);
    try {
      let resume_url: string | null = null;

      // Upload resume if provided
      if (resumeFile) {
        const ext = resumeFile.name.split(".").pop();
        const path = `${Date.now()}_${form.first_name.toLowerCase()}_${form.last_name.toLowerCase()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, resumeFile);
        if (uploadErr) throw uploadErr;
        resume_url = path;
      }

      // Insert application
      const { error } = await supabase.from("cms_career_applications").insert({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        linkedin_url: form.linkedin_url.trim() || null,
        cover_letter: form.cover_letter.trim() || null,
        resume_url,
        posting_id: applyingTo,
      });
      if (error) throw error;

      // Send alert email
      const posting = positions.find(p => p.id === applyingTo);
      await supabase.functions.invoke("send-alert", {
        body: {
          type: "job_application",
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone,
            linkedin_url: form.linkedin_url,
            position: posting?.title || "General",
            department: posting?.department || "",
            has_resume: !!resumeFile,
            cover_letter_preview: form.cover_letter.slice(0, 200),
          },
        },
      });

      setSubmitted(true);
      toast.success("Application submitted!");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ first_name: "", last_name: "", email: "", phone: "", linkedin_url: "", cover_letter: "" });
    setResumeFile(null);
    setApplyingTo(null);
    setSubmitted(false);
  };

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
              ManageKube is redefining what managed security and IT can be. One platform. One team. One partner for every layer.
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

            {loading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading positions...
              </div>
            ) : positions.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No open positions at this time. Check back soon.</p>
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

                    {pos.requirements?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-bold text-foreground mb-2">Requirements:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                          {pos.requirements.map((req, ri) => <li key={ri}>{req}</li>)}
                        </ul>
                      </div>
                    )}

                    {pos.nice_to_haves?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-foreground mb-2">Nice to Have:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                          {pos.nice_to_haves.map((nth, ni) => <li key={ni}>{nth}</li>)}
                        </ul>
                      </div>
                    )}

                    {/* Apply Button / Form */}
                    <AnimatePresence mode="wait">
                      {applyingTo === pos.id ? (
                        submitted ? (
                          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary/5 border border-primary/20 p-6 rounded-md text-center">
                            <CheckCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-sm font-semibold text-foreground">Application Submitted!</p>
                            <p className="text-xs text-muted-foreground mt-1">We'll review your application and get back to you soon.</p>
                            <Button variant="ghost" size="sm" className="mt-3" onClick={resetForm}>Close</Button>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleApply}
                            className="bg-secondary border border-border p-6 rounded-md space-y-3 mt-4"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-xs font-bold text-foreground">Apply for {pos.title}</p>
                              <button type="button" onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label className="text-xs">First Name *</Label><Input value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} required className="h-9 text-sm" /></div>
                              <div><Label className="text-xs">Last Name *</Label><Input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} required className="h-9 text-sm" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label className="text-xs">Email *</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="h-9 text-sm" /></div>
                              <div><Label className="text-xs">Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="h-9 text-sm" /></div>
                            </div>
                            <div><Label className="text-xs">LinkedIn URL</Label><Input value={form.linkedin_url} onChange={e => setForm(f => ({ ...f, linkedin_url: e.target.value }))} placeholder="https://linkedin.com/in/..." className="h-9 text-sm" /></div>
                            <div><Label className="text-xs">Cover Letter / Message</Label><Textarea rows={3} value={form.cover_letter} onChange={e => setForm(f => ({ ...f, cover_letter: e.target.value }))} className="text-sm" placeholder="Tell us why you'd be a great fit..." /></div>
                            <div>
                              <Label className="text-xs">Resume (PDF)</Label>
                              <div className="flex items-center gap-3 mt-1">
                                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setResumeFile(e.target.files?.[0] || null)} />
                                <Button type="button" variant="outline" size="sm" className="gap-1 text-xs" onClick={() => fileRef.current?.click()}>
                                  <Upload className="h-3 w-3" /> {resumeFile ? resumeFile.name : "Upload Resume"}
                                </Button>
                                {resumeFile && <button type="button" onClick={() => setResumeFile(null)} className="text-xs text-destructive hover:underline">Remove</button>}
                              </div>
                            </div>
                            <Button type="submit" disabled={submitting} className="w-full">
                              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Application"}
                            </Button>
                          </motion.form>
                        )
                      ) : (
                        <motion.div key="btn">
                          <Button
                            variant="outline"
                            className="gap-2 text-xs font-bold text-brand-orange border-brand-orange/30 hover:bg-brand-orange/10"
                            onClick={() => { resetForm(); setApplyingTo(pos.id); }}
                          >
                            Apply Now <ArrowRight className="w-3 h-3" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

      {/* General CTA */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-foreground mb-6" style={{ fontFamily: "'Special Elite', serif" }}>
            Don't see your role?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            We are always looking for talented people. Send us your resume and tell us how you would contribute.
          </p>
          <Button
            className="bg-brand-orange text-white px-8 py-4 font-semibold hover:opacity-90 gap-2"
            onClick={() => {
              setApplyingTo("general");
              const el = document.getElementById("openings");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Submit Your Resume <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
