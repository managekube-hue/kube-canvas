import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";

const Contact = () => (
  <PageLayout>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-8">Contact Us</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-mono text-xl text-muted-foreground max-w-2xl mb-8">Let's discuss your transformation.</motion.p>
        <div className="font-mono text-lg text-foreground space-y-2"><p>sales@managekube.com</p><p>(901) 555-1212</p><p>123 Main Street, Memphis, TN 38103</p></div>
      </div>
    </section>
  </PageLayout>
);
export default Contact;
