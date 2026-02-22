import { motion } from "framer-motion";
import { Building2, Rocket, Crown } from "lucide-react";

const tiers = [
  {
    icon: Building2,
    name: "SMALL BUSINESS BLOCK",
    price: "$299",
    unit: "per template",
    color: "blue",
    tagline: "Automation Templates",
    description:
      "Pre-built automation templates using n8n workflow automation, AI platforms (Vapi/OpenAI), and communication services (Twilio). Deploy yourself in 48 hours with our documentation, or we manage everything for $99/month per template.",
    scenarios: "Solo practitioners, small professional services, home services businesses, retail shops.",
  },
  {
    icon: Rocket,
    name: "MID-MARKET BRIDGE",
    price: "$25,000",
    unit: "/month",
    color: "gray",
    tagline: "Infrastructure Foundation",
    description:
      "Real infrastructure: VxRail clusters, PowerStore arrays, managed endpoints through APEX PCaaS, plus 24x7 NOC monitoring, security operations, and compliance framework implementation.",
    scenarios: "50-500 employees, multiple locations, regulatory compliance requirements, business-critical applications.",
  },
  {
    icon: Crown,
    name: "ENTERPRISE TIER",
    price: "$500,000+",
    unit: "/month",
    color: "orange",
    tagline: "Mission-Critical Operations",
    description:
      "Industry-specific platforms combining Dell infrastructure (PowerMax, z16 integration, global APEX deployment) with IBM intelligence software (watsonx, Maximo, Cloud Pak portfolio). Nine pre-integrated industry BLOCKs.",
    scenarios: "500+ employees, global operations, complex compliance, mission-critical applications.",
  },
];

export const EnterpriseTiers = () => {
  return (
    <section className="py-24 lg:py-32 bg-card" id="pricing">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-6"
        >
          BUILT FOR ENTERPRISE SCALE.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-muted-foreground text-center max-w-3xl mx-auto mb-16"
        >
          Our methodology serves businesses of every size. The technology foundation scales from boutique precision to mission-critical operations.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-glass rounded-xl p-8 relative overflow-hidden hover:border-primary/30 transition-all duration-300 ${
                tier.color === "orange" ? "border-primary/20" : ""
              }`}
            >
              {tier.color === "orange" && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              )}

              <tier.icon
                className={`w-10 h-10 mb-6 ${
                  tier.color === "orange"
                    ? "text-primary"
                    : tier.color === "blue"
                    ? "text-brand-blue"
                    : "text-muted-foreground"
                }`}
              />

              <h3 className="font-display text-xl lg:text-2xl text-white mb-4">{tier.name}</h3>

              <div className="mb-2">
                <span
                  className={`font-mono text-4xl lg:text-5xl ${
                    tier.color === "orange"
                      ? "text-primary"
                      : tier.color === "blue"
                      ? "text-brand-blue"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.price}
                </span>
                <span className="font-mono text-sm text-muted-foreground ml-1">{tier.unit}</span>
              </div>

              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-6">
                {tier.tagline}
              </div>

              <p className="font-mono text-sm text-white/80 mb-6 leading-relaxed">{tier.description}</p>

              <div className="pt-4 border-t border-border">
                <div className="font-mono text-xs text-muted-foreground mb-2">IDEAL FOR</div>
                <p className="font-mono text-xs text-white/60">{tier.scenarios}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
