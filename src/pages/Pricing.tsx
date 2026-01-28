import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";

const Pricing = () => (
  <PageLayout>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-8">Six ways to pay.</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-mono text-xl text-muted-foreground max-w-2xl">From $99 automation templates to enterprise engagements. Zero lock-in.</motion.p>
      </div>
    </section>
  </PageLayout>
);
export default Pricing;
