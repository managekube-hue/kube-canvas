import { PageLayout } from "@/components/PageLayout";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const Solutions = () => {
  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(24 95% 40%) 50%, hsl(var(--muted)) 100%)",
          }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-label text-white/70 mb-6"
            >
              SOLUTIONS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Browse Products.{" "}
              <span className="text-brand-orange">Configure Solutions.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-white/80 max-w-2xl"
            >
              Access our complete product catalog. Configure servers, storage, networking, 
              and software. Get instant pricing and generate your bill of materials.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-muted-foreground">Quick paths:</span>
            <Link 
              to="/assessment" 
              className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              Need help choosing? Take Assessment
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link 
              to="/kubes/product-kube" 
              className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              View Product Kube
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link 
              to="/contact" 
              className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              Request Custom Quote
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* TD Synnex iFrame */}
      <section className="bg-secondary">
        <div className="container mx-auto px-0 lg:px-12">
          <div className="bg-white border border-border">
            {/* iFrame Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-foreground">Product Catalog</span>
              </div>
              <a 
                href="https://www.tdsynnex.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Open in new window
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            {/* iFrame Container - Placeholder until real URL provided */}
            <div className="relative" style={{ minHeight: "800px" }}>
              {/* Placeholder message - replace with actual iframe */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/50 text-center px-8">
                <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
                  <ExternalLink className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Product Catalog Integration
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  The TD Synnex product catalog will be embedded here, providing access to 
                  servers, storage, networking, software, and more with real-time pricing.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Request Catalog Access
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/kubes/product-kube"
                    className="inline-flex items-center gap-2 bg-foreground text-white px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    View Product Kube
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* 
              Uncomment and update src when TD Synnex iframe URL is provided:
              <iframe 
                src="YOUR_TD_SYNNEX_IFRAME_URL" 
                className="w-full border-0"
                style={{ minHeight: "800px" }}
                title="TD Synnex Product Catalog"
              />
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="border-t-2 border-foreground pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Need Guidance?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our assessment helps identify the right products for your specific needs.
              </p>
              <Link to="/assessment" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Take Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border-t-2 border-foreground pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Complex Project?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For data center builds, migrations, or enterprise deployments, talk to our experts.
              </p>
              <Link to="/contact" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border-t-2 border-foreground pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Browse by Kube</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore our service Kubes to see how products integrate with managed services.
              </p>
              <Link to="/kubes" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Explore Kubes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PathfinderCTA />
    </PageLayout>
  );
};

export default Solutions;
