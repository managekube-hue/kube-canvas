import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const partners = [
  {
    name: "DELL TECHNOLOGIES PARTNER",
    offerings: [
      "PowerEdge & VxRail hyperconverged infrastructure",
      "PowerMax mission-critical storage for sub-millisecond latency",
      "APEX consumption models with predictable monthly billing",
      "PowerProtect data protection and cyber recovery solutions",
    ],
  },
  {
    name: "IBM BUSINESS PARTNER",
    offerings: [
      "watsonx AI platform for automation and intelligence",
      "Maximo asset management for operational optimization",
      "Cloud Pak portfolio for hybrid cloud integration",
      "Sterling supply chain applications for order management",
    ],
  },
];

const alliances = [
  { name: "Microsoft", service: "Managed Workplace", description: "Optimization and management of Microsoft 365, Azure, and Intune." },
  { name: "Pax8", service: "Cloud Distribution", description: "Streamlined cloud marketplace procurement, licensing, and provisioning." },
  { name: "TD SYNNEX", service: "Supply Chain & Procurement", description: "Enterprise hardware sourcing, configuration, and logistics fulfillment." },
  { name: "Cisco Meraki", service: "Network & Edge", description: "SD-WAN, network administration, switches, firewalls, and Wi-Fi." },
];

export const PartnerSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background" id="partners">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-6"
        >
          POWERED BY ENTERPRISE PARTNERS.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-muted-foreground text-center max-w-3xl mx-auto mb-16"
        >
          Validated architectures. Certified delivery. Global scale.
        </motion.p>

        {/* Main Partners */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass rounded-xl p-8"
            >
              <h3 className="font-display text-xl lg:text-2xl text-white mb-6">{partner.name}</h3>
              <ul className="space-y-3">
                {partner.offerings.map((offering) => (
                  <li key={offering} className="font-mono text-sm text-white/80 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {offering}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="font-mono text-sm text-muted-foreground hover:text-white flex items-center gap-2 mt-6 group"
              >
                View Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Alliance Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl text-white text-center mb-4">
            KEY TECHNOLOGY ALLIANCES
          </h3>
          <p className="font-mono text-muted-foreground text-center mb-8">
            We integrate and manage best-of-breed solutions to deliver a seamless experience.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {alliances.map((alliance, index) => (
              <motion.div
                key={alliance.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-secondary rounded-lg p-5 hover:bg-secondary/80 transition-colors"
              >
                <div className="font-display text-lg text-white mb-1">{alliance.name}</div>
                <div className="font-mono text-xs text-primary uppercase tracking-wider mb-2">
                  {alliance.service}
                </div>
                <p className="font-mono text-xs text-muted-foreground">{alliance.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
