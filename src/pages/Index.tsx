import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { MethodologySection } from "@/components/MethodologySection";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { KubeBreakdownSection } from "@/components/KubeBreakdownSection";
import { IndustrySolutionsSection } from "@/components/IndustrySolutionsSection";
import { AssessmentConfiguratorSection } from "@/components/AssessmentConfiguratorSection";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSection />
      <MethodologySection />
      <DifferentiatorsSection />
      <KubeBreakdownSection />
      <IndustrySolutionsSection />
      <AssessmentConfiguratorSection />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Index;
