import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Methodology from "./pages/Methodology";
import KubesOverview from "./pages/KubesOverview";
import AssessmentKube from "./pages/kubes/AssessmentKube";
import ComplianceKube from "./pages/kubes/ComplianceKube";
import MSSPKube from "./pages/kubes/MSSPKube";
import MSPKube from "./pages/kubes/MSPKube";
import AdvisoryKube from "./pages/kubes/AdvisoryKube";
import InnovationKube from "./pages/kubes/InnovationKube";
import IndustryKube from "./pages/kubes/IndustryKube";
import ProductKube from "./pages/kubes/ProductKube";
import Manufacturing from "./pages/industries/Manufacturing";
import Healthcare from "./pages/industries/Healthcare";
import FinancialServices from "./pages/industries/FinancialServices";
import Retail from "./pages/industries/Retail";
import Transportation from "./pages/industries/Transportation";
import MiningExtraction from "./pages/industries/MiningExtraction";
import EnergyUtilities from "./pages/industries/EnergyUtilities";
import PublicSector from "./pages/industries/PublicSector";
import Telecommunications from "./pages/industries/Telecommunications";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

// New Pages
import Assessment from "./pages/Assessment";
import FindByProblem from "./pages/FindByProblem";
import Solutions from "./pages/Solutions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/methodology" element={<Methodology />} />
          
          {/* Assessment & Navigation Paths */}
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/find-by-problem" element={<FindByProblem />} />
          <Route path="/solutions" element={<Solutions />} />
          
          {/* Kubes */}
          <Route path="/kubes" element={<KubesOverview />} />
          <Route path="/kubes/assessment-kube" element={<AssessmentKube />} />
          <Route path="/kubes/compliance-kube" element={<ComplianceKube />} />
          <Route path="/kubes/mssp-kube" element={<MSSPKube />} />
          <Route path="/kubes/msp-kube" element={<MSPKube />} />
          <Route path="/kubes/advisory-kube" element={<AdvisoryKube />} />
          <Route path="/kubes/innovation-kube" element={<InnovationKube />} />
          <Route path="/kubes/industry-kube" element={<IndustryKube />} />
          <Route path="/kubes/product-kube" element={<ProductKube />} />
          
          {/* Industries */}
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/healthcare" element={<Healthcare />} />
          <Route path="/industries/financial-services" element={<FinancialServices />} />
          <Route path="/industries/retail" element={<Retail />} />
          <Route path="/industries/transportation" element={<Transportation />} />
          <Route path="/industries/mining-extraction" element={<MiningExtraction />} />
          <Route path="/industries/energy-utilities" element={<EnergyUtilities />} />
          <Route path="/industries/public-sector" element={<PublicSector />} />
          <Route path="/industries/telecommunications" element={<Telecommunications />} />
          
          {/* Other */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
