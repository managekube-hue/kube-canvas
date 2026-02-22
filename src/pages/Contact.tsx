/**
 * Contact Page: ManageKube
 * Get in Touch. Let's Talk About Your Needs.
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const contactMethods = [
  { icon: Mail, title: "General Inquiries", value: "info@managekube.com", href: "mailto:info@managekube.com" },
  { icon: Mail, title: "Sales", value: "sales@managekube.com", href: "mailto:sales@managekube.com" },
  { icon: Mail, title: "Support", value: "support@managekube.com", href: "mailto:support@managekube.com" },
  { icon: Mail, title: "Partners", value: "partners@managekube.com", href: "mailto:partners@managekube.com" },
  { icon: Mail, title: "Careers", value: "careers@managekube.com", href: "mailto:careers@managekube.com" },
  { icon: Mail, title: "Roadmap Feedback", value: "roadmap@managekube.com", href: "mailto:roadmap@managekube.com" },
  { icon: Phone, title: "Main", value: "(240) 257-2029", href: "tel:+12402572029" },
  { icon: Phone, title: "Sales", value: "(240) 257-2029", href: "tel:+12402572029" },
  { icon: Phone, title: "Support (24/7)", value: "(240) 257-2029", href: "tel:+12402572029" },
  { icon: Clock, title: "Support Hours", value: "24/7 for existing clients", href: null },
];

const offices = [
  {
    name: "Memphis Office",
    role: "Operations & Engineering",
    address: "3150 Lenox Park",
    city: "Memphis, TN 38134",
    mapUrl: "https://maps.google.com/?q=3150+Lenox+Park+Memphis+TN+38134",
  },
  {
    name: "Alexandria Office",
    role: "Sales & Federal Programs",
    address: "526 King Street",
    city: "Alexandria, VA 22314",
    mapUrl: "https://maps.google.com/?q=526+King+Street+Alexandria+VA+22314",
  },
];

const inquiryTypes = [
  "Sales",
  "Support",
  "Partners",
  "Careers",
  "Other",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", company: "", phone: "", inquiryType: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <PageLayout>
      <PageBanner
        title="Contact Us"
        subtitle="Get in Touch. Let's Talk About Your Needs."
      />

      {/* You May Also Like */}
      <section className="py-16 border-t border-border bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-10">You May Also Like</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { label: "About ManageKube", href: "/about" },
              { label: "Partners", href: "/about/partners" },
              { label: "Careers", href: "/careers" },
              { label: "Get Started", href: "/get-started" },
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
      </section>

      {/* Contact Grid */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-1">
              <p className="text-label text-muted-foreground mb-6">GET IN TOUCH</p>
              <div className="space-y-5">
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-4 h-4 text-foreground" />
              </div>

              {/* Office Locations */}
              <div className="mt-12 pt-12 border-t border-border">
                <p className="text-label text-muted-foreground mb-6">OFFICE LOCATIONS</p>
                <div className="space-y-6">
                  {offices.map((office) => (
                    <a
                      key={office.name}
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-brand-orange transition-colors">{office.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{office.role}</p>
                        <p className="text-sm text-foreground">{office.address}</p>
                        <p className="text-sm text-foreground">{office.city}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{method.title}</p>
                      {method.href ? (
                        <a href={method.href} className="text-sm font-semibold text-foreground hover:text-brand-orange transition-colors">
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-foreground">{method.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-12 border-t border-border">
                <p className="text-label text-muted-foreground mb-6">QUICK ACTIONS</p>
                <div className="space-y-3">
                  <Link to="/get-started" className="flex items-center justify-between p-4 bg-secondary hover:bg-muted transition-colors group">
                    <span className="font-semibold text-foreground">Get Started</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link to="/assessment/start" className="flex items-center justify-between p-4 bg-secondary hover:bg-muted transition-colors group">
                    <span className="font-semibold text-foreground">Onboarding Assessment</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link to="/pricing" className="flex items-center justify-between p-4 bg-secondary hover:bg-muted transition-colors group">
                    <span className="font-semibold text-foreground">View Pricing</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-2">
              <div id="form" className="bg-secondary p-8 lg:p-12">
                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Thank You!</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Your message has been received. A member of our team will contact you within 24 hours.
                    </p>
                    <button onClick={() => { setIsSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", inquiryType: "", message: "" }); }}
                      className="text-brand-orange font-semibold hover:underline">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-label text-muted-foreground mb-2">SEND US A MESSAGE</p>
                    <h2 className="text-2xl font-bold text-foreground mb-8">How can we help?</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                          <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                          <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" placeholder="Smith" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Work Email *</label>
                          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" placeholder="john@company.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                          <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" placeholder="Company Name" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors" placeholder="(240) 257-2029" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Interest *</label>
                          <select required value={formData.inquiryType} onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors">
                            <option value="">Select an option</option>
                            {inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                        <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors resize-none"
                          placeholder="Tell us about your project or question..." />
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className={`flex items-center justify-center gap-2 w-full py-4 font-semibold transition-all ${isSubmitting ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-brand-orange text-white hover:opacity-90"}`}>
                        {isSubmitting ? (
                          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                        ) : (
                          <><Send className="w-5 h-5" /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
