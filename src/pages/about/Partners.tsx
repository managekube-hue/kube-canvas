/**
 * Partners Page: ManageKube
 * Grow Your Business with the Kubric Platform.
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Code, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: Users,
    title: "MSP/MSSP Partners",
    description: "Deliver Kubric-powered managed security and IT services to your clients. Private-labeled options available. You brand it. We run it.",
  },
  {
    icon: Briefcase,
    title: "Consulting Partners",
    description: "Incorporate Kubric assessments, audits, and advisory services into your engagements. Add depth to your offerings without adding headcount.",
  },
  {
    icon: Code,
    title: "Technology Partners",
    description: "Integrate your products with the Kubric platform. Joint solution development. Co-marketing opportunities.",
  },
  {
    icon: Handshake,
    title: "Referral Partners",
    description: "Refer clients to ManageKube. Earn referral fees on services delivered. No heavy lifting. Just introductions.",
  },
];

const benefits = [
  { title: "Differentiated capability", desc: "Offer your clients 20 integrated capabilities through one platform. Not a stack of tools. A real platform." },
  { title: "Private label options", desc: "Deliver Kubric services under your brand. Your clients never know we are behind it. You get the credit." },
  { title: "Partner support", desc: "Technical training, sales enablement, and joint marketing. We want you to succeed." },
  { title: "Grow with us", desc: "As we grow, our partners grow. New capabilities. New markets. New opportunities." },
];

export default function Partners() {
  return (
    <PageLayout>
      <PageBanner
        title="Partners"
        subtitle="Grow Your Business with the Kubric Platform."
        phase="ABOUT"
      />

      {/* Intro */}
      <section style={{ background: "#FEFBF6" }} className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">PARTNER WITH US</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-6" />
            <h2 className="text-headline text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
              Partners Extend Our Reach. We Extend Yours.
            </h2>
            <p className="text-body text-muted-foreground mb-12 max-w-2xl">
              ManageKube partners include MSPs, MSSPs, consultants, and technology providers who deliver Kubric-powered services to their clients. You bring the relationships. We bring the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">PARTNER PROGRAMS</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-10" />
            <div className="grid sm:grid-cols-2 gap-6">
              {programs.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-border p-9"
                >
                  <p.icon className="w-6 h-6 text-brand-orange mb-4" />
                  <h3 className="text-base font-bold text-foreground mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section style={{ background: "#FEFBF6" }} className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">WHY PARTNER</p>
            <div className="h-[2px] w-10 bg-brand-orange mb-10" />
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-secondary border border-border p-9">
                  <h3 className="text-base font-bold text-foreground mb-3">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section style={{ background: "#FEFBF6" }} className="py-16 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-10">You May Also Like</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {[
                { label: "About ManageKube", href: "/about" },
                { label: "Roadmap", href: "/about/roadmap" },
                { label: "Careers", href: "/careers" },
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

      {/* Become a Partner */}
      <section id="become-a-partner" className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-white mb-5" style={{ fontFamily: "'Special Elite', serif" }}>
            Become a Partner
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-lg mx-auto">
            Interested in partnering with ManageKube? Contact us to explore how we can grow together.
          </p>
          <a
            href="mailto:partners@managekube.com"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            partners@managekube.com <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
