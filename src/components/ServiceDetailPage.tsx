/** Shared template for all Service detail pages */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceDetailPageProps {
  category: string;
  name: string;
  tagline: string;
  description: string;
  sections: { title: string; items: string[] }[];
}

export const ServiceDetailPage = ({ category, name, tagline, description, sections }: ServiceDetailPageProps) => {
  return (
    <PageLayout>
      <section className="section-dark pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">{category}</span>
            <div className="h-1 w-16 bg-brand-orange my-6" />
            <h1 className="text-headline text-white mb-4">{name}</h1>
            <p className="text-xl text-brand-orange italic mb-6">{tagline}</p>
            <p className="text-body-lg text-white/70 max-w-2xl">{description}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-off-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((sec, i) => (
              <motion.div key={sec.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white p-8">
                <h3 className="text-lg font-bold mb-4">{sec.title}</h3>
                <ul className="space-y-2">
                  {sec.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-brand-orange mt-1">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageLayout>
  );
};
