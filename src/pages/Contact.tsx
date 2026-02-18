/**
 * DO NOT TOUCH - Contact Page
 * Full contact form with company information
 * Functionality and UI design are COMPLETED - do not modify
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    value: "sales@managekube.com",
    href: "mailto:sales@managekube.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "(901) 555-1212",
    href: "tel:+19015551212",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Main Street, Memphis, TN 38103",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri 8AM-6PM CST",
    href: null,
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Schedule a Demo",
  "Request a Quote",
  "Technical Support",
  "Partnership Opportunity",
  "Career Inquiry",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <PageLayout>
      <PageBanner
        title="Contact Us"
        subtitle="Let's discuss your transformation. Our solutions architects are ready to help you find the right path."
      />

      {/* Contact Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left - Contact Info */}
            <div className="lg:col-span-1">
              <p className="text-label text-muted-foreground mb-6">GET IN TOUCH</p>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{method.title}</p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="font-semibold text-foreground hover:text-brand-orange transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground">{method.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-12 border-t border-border">
                <p className="text-label text-muted-foreground mb-6">QUICK ACTIONS</p>
                <div className="space-y-3">
                  <Link
                    to="/assessment"
                    className="flex items-center justify-between p-4 bg-secondary hover:bg-muted transition-colors group"
                  >
                    <span className="font-semibold text-foreground">Take Free Assessment</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link
                    to="/kubes"
                    className="flex items-center justify-between p-4 bg-secondary hover:bg-muted transition-colors group"
                  >
                    <span className="font-semibold text-foreground">Explore Kubes</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="flex items-center justify-between p-4 bg-secondary hover:bg-muted transition-colors group"
                  >
                    <span className="font-semibold text-foreground">View Pricing</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-secondary p-8 lg:p-12">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Your message has been received. A member of our team will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          company: "",
                          phone: "",
                          inquiryType: "",
                          message: "",
                        });
                      }}
                      className="text-brand-orange font-semibold hover:underline"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-label text-muted-foreground mb-2">SEND US A MESSAGE</p>
                    <h2 className="text-2xl font-bold text-foreground mb-8">
                      How can we help?
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                            placeholder="Smith"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Company *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                            placeholder="Company Name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Inquiry Type *
                          </label>
                          <select
                            required
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                          >
                            <option value="">Select an option</option>
                            {inquiryTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors resize-none"
                          placeholder="Tell us about your project or question..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center justify-center gap-2 w-full py-4 font-semibold transition-all ${
                          isSubmitting
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-brand-orange text-white hover:bg-opacity-90"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
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
