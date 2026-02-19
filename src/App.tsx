import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { PathProvider } from "./context/PathContext";
import { BOMCartProvider } from "./context/BOMCartContext";
import { BOMCart } from "./components/BOMCart";

import QualificationGate from "./pages/QualificationGate";
import FullyManaged from "./pages/paths/FullyManaged";
import CoManaged from "./pages/paths/CoManaged";
import SelfManaged from "./pages/paths/SelfManaged";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Methodology from "./pages/Methodology";
import KubesOverview from "./pages/KubesOverview";

// New 15 Kubes
import CioKube from "./pages/kubes/CioKube";
import NpmKube from "./pages/kubes/NpmKube";
import MdmKube from "./pages/kubes/MdmKube";
import ApmKube from "./pages/kubes/ApmKube";
import ItdrKube from "./pages/kubes/ItdrKube";
import NdrKube from "./pages/kubes/NdrKube";
import CdrKube from "./pages/kubes/CdrKube";
import SdrKube from "./pages/kubes/SdrKube";
import AdrKube from "./pages/kubes/AdrKube";
import DdrKube from "./pages/kubes/DdrKube";
import TiKube from "./pages/kubes/TiKube";
import VdrKube from "./pages/kubes/VdrKube";
import CfdrKube from "./pages/kubes/CfdrKube";
import BdrKube from "./pages/kubes/BdrKube";
import GrcKube from "./pages/kubes/GrcKube";

// Our Tools
import OurTools from "./pages/our-tools/OurTools";
import HowKubricWorks from "./pages/our-tools/HowKubricWorks";
import KubricUidr from "./pages/our-tools/KubricUidr";
import KubricDataGraph from "./pages/our-tools/KubricDataGraph";
import KubricAi from "./pages/our-tools/KubricAi";

// Products
import Products from "./pages/products/Products";
import Xro from "./pages/products/Xro";
import Xmm from "./pages/products/Xmm";
import Xme from "./pages/products/Xme";
import CustomProduct from "./pages/products/CustomProduct";

// Services
import Services from "./pages/services/Services";
import ManagedNoc from "./pages/services/ManagedNoc";
import ManagedSoc from "./pages/services/ManagedSoc";
import ManagedCompliance from "./pages/services/ManagedCompliance";
import ManagedCloud from "./pages/services/ManagedCloud";
import SecurityAssessments from "./pages/services/SecurityAssessments";
import PenetrationTesting from "./pages/services/PenetrationTesting";
import ComplianceGapAnalysis from "./pages/services/ComplianceGapAnalysis";
import InfrastructureAudits from "./pages/services/InfrastructureAudits";
import RightSizing from "./pages/services/RightSizing";
import PhysicalSecurity from "./pages/services/PhysicalSecurity";
import NetworkBuildouts from "./pages/services/NetworkBuildouts";
import CustomAutomation from "./pages/services/CustomAutomation";
import LegacyIntegrations from "./pages/services/LegacyIntegrations";

// Solutions
import SolutionsHub from "./pages/solutions/SolutionsHub";
import SolutionManufacturing from "./pages/solutions/SolutionManufacturing";
import SolutionHealthcare from "./pages/solutions/SolutionHealthcare";
import SolutionPublicSector from "./pages/solutions/SolutionPublicSector";
import SolutionFinancialServices from "./pages/solutions/SolutionFinancialServices";
import SolutionRetail from "./pages/solutions/SolutionRetail";
import SolutionTechnology from "./pages/solutions/SolutionTechnology";
import SolutionSmb from "./pages/solutions/SolutionSmb";
import SolutionSme from "./pages/solutions/SolutionSme";
import SolutionEnterprise from "./pages/solutions/SolutionEnterprise";

// Compliance
import Cmmc from "./pages/compliance/Cmmc";
import Cjis from "./pages/compliance/Cjis";
import Nist800171 from "./pages/compliance/Nist800171";
import Nist80053 from "./pages/compliance/Nist80053";
import Hipaa from "./pages/compliance/Hipaa";
import Soc2 from "./pages/compliance/Soc2";
import Iso27001 from "./pages/compliance/Iso27001";
import PciDss from "./pages/compliance/PciDss";

// Industries
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
import Assessment from "./pages/Assessment";
import FindByProblem from "./pages/FindByProblem";
import FindBySize from "./pages/FindBySize";
import Solutions from "./pages/Solutions";
import PartnerPortal from "./pages/login/PartnerPortal";
import ClientPortal from "./pages/login/ClientPortal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Documentation from "./pages/Documentation";

// UIDR Open Source Docs Site
import UidrHome from "./pages/uidr/UidrHome";
import UidrPlatform from "./pages/uidr/UidrPlatform";
import UidrDocs from "./pages/uidr/UidrDocs";
import UidrModulePage from "./pages/uidr/UidrModulePage";
import UidrTechnicalDocs from "./pages/uidr/UidrTechnicalDocs";
import UidrContributors from "./pages/uidr/UidrContributors";
import UidrOpenSource from "./pages/uidr/UidrOpenSource";
import UidrContact from "./pages/uidr/UidrContact";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PathProvider>
        <BOMCartProvider>
        <ScrollToTop />
        <BOMCart />
        <Routes>
          {/* Qualification Gate */}
          <Route path="/" element={<QualificationGate />} />
          <Route path="/fully-managed" element={<FullyManaged />} />
          <Route path="/co-managed" element={<CoManaged />} />
          <Route path="/self-managed" element={<SelfManaged />} />
          {/* Legacy home access */}
          <Route path="/home" element={<Index />} />
          <Route path="/methodology" element={<Methodology />} />

          {/* Assessment & Navigation Paths */}
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/find-by-problem" element={<FindByProblem />} />
          <Route path="/find-by-size" element={<FindBySize />} />
          <Route path="/solutions" element={<Solutions />} />

          {/* Our Tools */}
          <Route path="/our-tools" element={<OurTools />} />
          <Route path="/our-tools/how-kubric-works" element={<HowKubricWorks />} />
          <Route path="/our-tools/kubric-uidr" element={<KubricUidr />} />
          <Route path="/our-tools/kubric-data-graph" element={<KubricDataGraph />} />
          <Route path="/our-tools/kubric-ai" element={<KubricAi />} />

          {/* Kubes */}
          <Route path="/kubes" element={<KubesOverview />} />

          {/* Legacy kube redirects → correct destinations */}
          <Route path="/kubes/assessment-kube" element={<Navigate to="/assessment" replace />} />
          <Route path="/kubes/compliance-kube" element={<Navigate to="/services/managed-compliance" replace />} />
          <Route path="/kubes/mssp-kube" element={<Navigate to="/services/managed-soc" replace />} />
          <Route path="/kubes/msp-kube" element={<Navigate to="/services/managed-noc" replace />} />
          <Route path="/kubes/advisory-kube" element={<Navigate to="/services" replace />} />
          <Route path="/kubes/innovation-kube" element={<Navigate to="/our-tools/kubric-ai" replace />} />
          <Route path="/kubes/industry-kube" element={<Navigate to="/solutions/hub" replace />} />
          <Route path="/kubes/product-kube" element={<Navigate to="/products" replace />} />

          {/* 15 Active Kubes */}
          <Route path="/kubes/cio-kube" element={<CioKube />} />
          <Route path="/kubes/npm-kube" element={<NpmKube />} />
          <Route path="/kubes/mdm-kube" element={<MdmKube />} />
          <Route path="/kubes/apm-kube" element={<ApmKube />} />
          <Route path="/kubes/itdr-kube" element={<ItdrKube />} />
          <Route path="/kubes/ndr-kube" element={<NdrKube />} />
          <Route path="/kubes/cdr-kube" element={<CdrKube />} />
          <Route path="/kubes/sdr-kube" element={<SdrKube />} />
          <Route path="/kubes/adr-kube" element={<AdrKube />} />
          <Route path="/kubes/ddr-kube" element={<DdrKube />} />
          <Route path="/kubes/ti-kube" element={<TiKube />} />
          <Route path="/kubes/vdr-kube" element={<VdrKube />} />
          <Route path="/kubes/cfdr-kube" element={<CfdrKube />} />
          <Route path="/kubes/bdr-kube" element={<BdrKube />} />
          <Route path="/kubes/grc-kube" element={<GrcKube />} />

          {/* Products */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/xro" element={<Xro />} />
          <Route path="/products/xmm" element={<Xmm />} />
          <Route path="/products/xme" element={<Xme />} />
          <Route path="/products/custom" element={<CustomProduct />} />

          {/* Services */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/managed-noc" element={<ManagedNoc />} />
          <Route path="/services/managed-soc" element={<ManagedSoc />} />
          <Route path="/services/managed-compliance" element={<ManagedCompliance />} />
          <Route path="/services/managed-cloud" element={<ManagedCloud />} />
          <Route path="/services/security-assessments" element={<SecurityAssessments />} />
          <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
          <Route path="/services/compliance-gap-analysis" element={<ComplianceGapAnalysis />} />
          <Route path="/services/infrastructure-audits" element={<InfrastructureAudits />} />
          <Route path="/services/right-sizing" element={<RightSizing />} />
          <Route path="/services/physical-security" element={<PhysicalSecurity />} />
          <Route path="/services/network-buildouts" element={<NetworkBuildouts />} />
          <Route path="/services/custom-automation" element={<CustomAutomation />} />
          <Route path="/services/legacy-integrations" element={<LegacyIntegrations />} />

          {/* Solutions Hub */}
          <Route path="/solutions/hub" element={<SolutionsHub />} />
          <Route path="/solutions/manufacturing" element={<SolutionManufacturing />} />
          <Route path="/solutions/healthcare" element={<SolutionHealthcare />} />
          <Route path="/solutions/public-sector" element={<SolutionPublicSector />} />
          <Route path="/solutions/financial-services" element={<SolutionFinancialServices />} />
          <Route path="/solutions/retail" element={<SolutionRetail />} />
          <Route path="/solutions/technology" element={<SolutionTechnology />} />
          <Route path="/solutions/smb" element={<SolutionSmb />} />
          <Route path="/solutions/sme" element={<SolutionSme />} />
          <Route path="/solutions/enterprise" element={<SolutionEnterprise />} />

          {/* Compliance */}
          <Route path="/compliance/cmmc" element={<Cmmc />} />
          <Route path="/compliance/cjis" element={<Cjis />} />
          <Route path="/compliance/nist-800-171" element={<Nist800171 />} />
          <Route path="/compliance/nist-800-53" element={<Nist80053 />} />
          <Route path="/compliance/hipaa" element={<Hipaa />} />
          <Route path="/compliance/soc2" element={<Soc2 />} />
          <Route path="/compliance/iso-27001" element={<Iso27001 />} />
          <Route path="/compliance/pci-dss" element={<PciDss />} />

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

          {/* Company */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />

          {/* Login Portals */}
          <Route path="/login/partner" element={<PartnerPortal />} />
          <Route path="/login/client" element={<ClientPortal />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/docs" element={<Navigate to="/documentation" replace />} />

          {/* UIDR Open Source Docs Site */}
          <Route path="/uidr" element={<UidrHome />} />
          <Route path="/uidr/platform" element={<UidrPlatform />} />
          <Route path="/uidr/docs" element={<UidrDocs />} />
          <Route path="/uidr/docs/:moduleId" element={<UidrModulePage />} />
          <Route path="/uidr/technical-docs" element={<UidrTechnicalDocs />} />
          <Route path="/uidr/contributors" element={<UidrContributors />} />
          <Route path="/uidr/open-source" element={<UidrOpenSource />} />
          <Route path="/uidr/contact" element={<UidrContact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </BOMCartProvider>
        </PathProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
