/**
 * DO NOT TOUCH - Client Portal Login Page
 * Temporary placeholder for client authentication
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

const ClientPortal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - actual authentication to be implemented
    console.log("Client login attempt:", email);
  };

  return (
    <PageLayout>
      <PageBanner
        title="Client Portal"
        subtitle="Access your service dashboard, tickets, reports, and documentation."
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary p-8 lg:p-12"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-foreground rounded-full mb-8 mx-auto">
                <Lock className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                Client Sign In
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Access your service dashboard
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-border focus:border-foreground focus:outline-none transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Need access to the client portal?
                </p>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-brand-orange hover:underline"
                >
                  Contact your account manager →
                </Link>
              </div>
            </motion.div>

            <div className="mt-8 text-center">
              <Link
                to="/login/partner"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Looking for the Partner Portal? Sign in here →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ClientPortal;
