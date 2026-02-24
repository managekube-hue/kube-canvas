/** Powered by Kubric UIDR — section with static image placeholder */
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const ORANGE = "#993619";

export const KubeConstellation = () => {
  return (
    <section className="py-24" style={{ background: "#FEFBF6" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Our Platform</p>
            <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
            <h2 className="font-black mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "'Special Elite', serif", color: "#1D1D1B" }}>
              Powered by Kubric UIDR
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#393837" }}>
              Our proprietary platform combines RMM, PSA, and Microsoft 365 management into one unified system — enabling the capabilities and outcomes we deliver as your managed services partner.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Unlimited endpoint monitoring",
                "Smart ticketing & workflow automation",
                "Multi-tenant M365 administration",
                "Automated patch management",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} style={{ color: ORANGE, flexShrink: 0 }} />
                  <span className="text-[14px]" style={{ color: "#393837" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/our-tools/kubric-uidr" className="inline-flex items-center gap-2 text-[14px] font-semibold transition-all hover:gap-3" style={{ color: ORANGE }}>
              Learn More <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — image placeholder */}
          <div className="relative flex items-center justify-center rounded-lg overflow-hidden" style={{ minHeight: 420, background: "#F0EDE8" }}>
            <p className="text-[13px] font-medium tracking-wide uppercase" style={{ color: "rgba(29,29,27,0.3)" }}>
              Platform visual — upload image here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
