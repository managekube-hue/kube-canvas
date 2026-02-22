import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MessageSquare, FileText, Shield, Headphones, BookOpen } from "lucide-react";

const supportChannels = [
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Speak directly with our operations team for urgent issues or escalations.",
    detail: "240-257-2029",
    action: "tel:+12402572029",
    actionLabel: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Submit a ticket via email for non-urgent issues, change requests, or documentation needs.",
    detail: "support@managekube.com",
    action: "mailto:support@managekube.com",
    actionLabel: "Send Email",
  },
  {
    icon: MessageSquare,
    title: "Client Portal",
    desc: "Access your dedicated dashboard for ticket tracking, SLA reporting, and service history.",
    detail: "24/7 Self-Service",
    action: "/login/client",
    actionLabel: "Login to Portal",
    isInternal: true,
  },
  {
    icon: Clock,
    title: "Emergency Response",
    desc: "Critical incident response for active breaches, outages, or security events.",
    detail: "15-Minute SLA (XME Tier)",
    action: "tel:+12402572029",
    actionLabel: "Emergency Line",
  },
];

const resources = [
  { icon: BookOpen, title: "Documentation", desc: "Technical guides, module references, and service architecture.", href: "/documentation" },
  { icon: Shield, title: "Compliance Frameworks", desc: "Framework-specific documentation across 12 compliance standards.", href: "/compliance" },
  { icon: Headphones, title: "Managed Services", desc: "Learn about our 24/7 NOC, SOC, and compliance management.", href: "/services" },
  { icon: FileText, title: "Assessment Tool", desc: "Evaluate your security posture and identify coverage gaps.", href: "/assessment" },
];

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBanner
        title="Support"
        subtitle="We are here to help. By phone, email, or portal."
      />

      {/* Support Channels */}
      <section className="section-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-caption text-brand-orange mb-4">CONTACT SUPPORT</p>
          <h2 className="text-title mb-12">How Can We Help?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {supportChannels.map((ch) => (
              <div key={ch.title} className="bg-card border border-border p-8 flex flex-col gap-4">
                <ch.icon className="w-8 h-8 text-brand-orange" />
                <h3 className="text-xl font-bold text-foreground">{ch.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{ch.desc}</p>
                <p className="font-semibold text-foreground">{ch.detail}</p>
                {ch.isInternal ? (
                  <Link to={ch.action} className="btn-primary text-center mt-auto w-fit">
                    {ch.actionLabel}
                  </Link>
                ) : (
                  <a href={ch.action} className="btn-primary text-center mt-auto w-fit">
                    {ch.actionLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Overview */}
      <section className="section-warm-gray py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-caption text-brand-orange mb-4">SERVICE LEVEL AGREEMENTS</p>
          <h2 className="text-title mb-12">Response Times by Tier</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border text-left">
              <thead>
                <tr className="bg-card">
                  <th className="p-4 border-b border-border font-bold text-foreground">Priority</th>
                  <th className="p-4 border-b border-border font-bold text-foreground">XRO Essentials</th>
                  <th className="p-4 border-b border-border font-bold text-foreground">XMX Advanced</th>
                  <th className="p-4 border-b border-border font-bold text-foreground">XME Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-4 border-b border-border font-medium text-foreground">P1: Critical</td><td className="p-4 border-b border-border">60 min</td><td className="p-4 border-b border-border">30 min</td><td className="p-4 border-b border-border">15 min</td></tr>
                <tr><td className="p-4 border-b border-border font-medium text-foreground">P2: High</td><td className="p-4 border-b border-border">4 hrs</td><td className="p-4 border-b border-border">2 hrs</td><td className="p-4 border-b border-border">1 hr</td></tr>
                <tr><td className="p-4 border-b border-border font-medium text-foreground">P3: Medium</td><td className="p-4 border-b border-border">8 hrs</td><td className="p-4 border-b border-border">4 hrs</td><td className="p-4 border-b border-border">2 hrs</td></tr>
                <tr><td className="p-4 border-b border-border font-medium text-foreground">P4: Low</td><td className="p-4 border-b border-border">24 hrs</td><td className="p-4 border-b border-border">12 hrs</td><td className="p-4 border-b border-border">4 hrs</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-caption text-brand-orange mb-4">SELF-SERVICE RESOURCES</p>
          <h2 className="text-title mb-12">Helpful Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((r) => (
              <Link key={r.title} to={r.href} className="bg-card border border-border p-6 hover:border-primary transition-colors group">
                <r.icon className="w-6 h-6 text-brand-orange mb-4" />
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
