import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            READY TO TRANSFORM YOUR IT?
          </h2>
          <p className="font-mono text-lg text-muted-foreground mb-12">
            Begin with a comprehensive assessment to understand your actual security posture, compliance gaps, and infrastructure requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-base uppercase tracking-wider px-10 py-6 glow-orange"
            >
              <Calendar className="w-5 h-5 mr-2" />
              SCHEDULE ASSESSMENT
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 font-mono text-base uppercase tracking-wider px-10 py-6"
            >
              <Download className="w-5 h-5 mr-2" />
              DOWNLOAD FRAMEWORK OVERVIEW
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
