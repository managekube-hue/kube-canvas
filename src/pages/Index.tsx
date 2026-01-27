import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MethodologySection } from "@/components/MethodologySection";
import { RadialConfigurator } from "@/components/RadialConfigurator";
import { KubeWheel } from "@/components/KubeWheel";
import { EnterpriseTiers } from "@/components/EnterpriseTiers";
import { IndustryGrid } from "@/components/IndustryGrid";
import { PartnerSection } from "@/components/PartnerSection";
import { ComplianceSection } from "@/components/ComplianceSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MethodologySection />
      <RadialConfigurator />
      <KubeWheel />
      <EnterpriseTiers />
      <IndustryGrid />
      <PartnerSection />
      <ComplianceSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
