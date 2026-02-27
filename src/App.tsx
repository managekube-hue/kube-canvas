import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { PathProvider } from "./context/PathContext";
import { BOMCartProvider } from "./context/BOMCartContext";
import { BOMCart } from "./components/BOMCart";
import { AuthProvider } from "./hooks/useAuth";
import { AuthGate } from "./components/AuthGate";

import QualificationGate from "./pages/QualificationGate";
import FullyManaged from "./pages/paths/FullyManaged";
import CoManaged from "./pages/paths/CoManaged";
import SelfManaged from "./pages/paths/SelfManaged";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Methodology from "./pages/Methodology";
import ServiceLayerOverview from "./pages/KubesOverview";

// Service Layer (formerly Kubes)
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
// New Service Layer modules
import StrikeModule from "./pages/service-layer/StrikeModule";
import EasmModule from "./pages/service-layer/EasmModule";
import HoneypotModule from "./pages/service-layer/HoneypotModule";

// How It Works (was: Our Tools)
import HowItWorksOverview from "./pages/our-tools/OurTools";
import PlatformOverview from "./pages/our-tools/HowKubricWorks";
import KubricUidr from "./pages/our-tools/KubricUidr";
import KubricDataGraph from "./pages/our-tools/KubricDataGraph";
import KubricAi from "./pages/our-tools/KubricAi";

// Service Tiers (formerly Products)
import Products from "./pages/products/Products";
import Xro from "./pages/products/Xro";
import Xmm from "./pages/products/Xmm";
import Xme from "./pages/products/Xme";
import CustomProduct from "./pages/products/CustomProduct";

// Services
import Services from "./pages/services/Services";
import ManagedNoc from "./pages/services/ManagedNoc";
import HelpDesk from "./pages/services/HelpDesk";
import ManagedIt from "./pages/services/ManagedIt";
import SmartHands from "./pages/services/SmartHands";
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
import ByMarketSize from "./pages/solutions/ByMarketSize";
import ByIndustry from "./pages/solutions/ByIndustry";
import ByServiceType from "./pages/solutions/ByServiceType";
import FullyManagedSolution from "./pages/solutions/FullyManagedSolution";
import CoManagedSolution from "./pages/solutions/CoManagedSolution";
import SelfManagedSolution from "./pages/solutions/SelfManagedSolution";

// Compliance
import ComplianceLanding from "./pages/compliance/index";
import Cmmc from "./pages/compliance/Cmmc";
import Cjis from "./pages/compliance/Cjis";
import Nist800171 from "./pages/compliance/Nist800171";
import Nist80053 from "./pages/compliance/Nist80053";
import Hipaa from "./pages/compliance/Hipaa";
import Soc2 from "./pages/compliance/Soc2";
import Iso27001 from "./pages/compliance/Iso27001";
import PciDss from "./pages/compliance/PciDss";
import FedRamp from "./pages/compliance/FedRamp";
import NistCsf from "./pages/compliance/NistCsf";
import CisControls from "./pages/compliance/CisControls";
import Fisma from "./pages/compliance/Fisma";

// Industries
import IndustriesHub from "./pages/industries/IndustriesHub";
import Manufacturing from "./pages/industries/Manufacturing";
import Healthcare from "./pages/industries/Healthcare";
import FinancialServices from "./pages/industries/FinancialServices";
import Retail from "./pages/industries/Retail";
import Transportation from "./pages/industries/Transportation";
import MiningExtraction from "./pages/industries/MiningExtraction";
import EnergyUtilities from "./pages/industries/EnergyUtilities";
import PublicSector from "./pages/industries/PublicSector";
import Telecommunications from "./pages/industries/Telecommunications";

import GetStarted from "./pages/GetStarted";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Partners from "./pages/about/Partners";
import Roadmap from "./pages/about/Roadmap";
import Assessment from "./pages/Assessment";
import AssessmentEngine from "./pages/AssessmentEngine";
import FindByProblem from "./pages/FindByProblem";
import PartnerPortal from "./pages/login/PartnerPortal";
import ClientPortal from "./pages/login/ClientPortal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import OpenSourceLicensing from "./pages/OpenSourceLicensing";
import Notice from "./pages/Notice";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import ThreatAi from "./pages/tools/ThreatAi";
import CVEDetailPage from "./pages/tools/CVEDetailPage";
import CmsAdmin from "./pages/CmsAdmin";
import Login from "./pages/auth/Login";

// CRM App
import { CrmLayout } from "./components/crm/CrmLayout";
import CrmDashboard from "./pages/crm/CrmDashboard";
import CrmOrganizations from "./pages/crm/CrmOrganizations";
import CrmOrgDetail from "./pages/crm/CrmOrgDetail";
import CrmContacts from "./pages/crm/CrmContacts";
import CrmContactDetail from "./pages/crm/CrmContactDetail";
import CrmDeals from "./pages/crm/CrmDeals";
import CrmTickets from "./pages/crm/CrmTickets";
import CrmContracts from "./pages/crm/CrmContracts";
import CrmAssets from "./pages/crm/CrmAssets";
import CrmTimeTracking from "./pages/crm/CrmTimeTracking";
import CrmDeployments from "./pages/crm/CrmDeployments";
import CrmAuditLog from "./pages/crm/CrmAuditLog";
import CrmPlaceholder from "./pages/crm/CrmPlaceholder";
import CrmInvoices from "./pages/crm/CrmInvoices";
import CrmSettings from "./pages/crm/CrmSettings";
import CrmLeadImport from "./pages/crm/CrmLeadImport";
import CrmBulkUpload from "./pages/crm/CrmBulkUpload";
import CrmCareers from "./pages/crm/CrmCareers";
import CrmAssessmentSessions from "./pages/crm/CrmAssessmentSessions";
import CrmBomQuotes from "./pages/crm/CrmBomQuotes";
import BomCatalogue from "./pages/BomCatalogue";

// UIDR Open Source Docs Site
import UidrHome from "./pages/uidr/UidrHome";
import UidrPlatform from "./pages/uidr/UidrPlatform";
import UidrDocs from "./pages/uidr/UidrDocs";
import UidrModulePage from "./pages/uidr/UidrModulePage";
import UidrTechnicalDocs from "./pages/uidr/UidrTechnicalDocs";
import UidrContributors from "./pages/uidr/UidrContributors";
import UidrOpenSource from "./pages/uidr/UidrOpenSource";
import UidrContact from "./pages/uidr/UidrContact";
import UidrIde from "./pages/uidr/UidrIde";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/start" element={<AssessmentEngine />} />
          <Route path="/bom" element={<BomCatalogue />} />
          <Route path="/find-by-problem" element={<FindByProblem />} />
          <Route path="/find-by-size" element={<Navigate to="/solutions/by-market-size" replace />} />
          <Route path="/solutions" element={<SolutionsHub />} />

          {/* How It Works (was: Our Tools) */}
          <Route path="/how-it-works" element={<HowItWorksOverview />} />
          <Route path="/how-it-works/platform-overview" element={<PlatformOverview />} />
          <Route path="/how-it-works/kubric-uidr" element={<KubricUidr />} />
          <Route path="/how-it-works/kubric-data-graph" element={<KubricDataGraph />} />
          <Route path="/how-it-works/kubricai" element={<KubricAi />} />

          {/* Legacy /our-tools/* redirects → /how-it-works/* */}
          <Route path="/our-tools" element={<Navigate to="/how-it-works" replace />} />
          <Route path="/our-tools/how-kubric-works" element={<Navigate to="/how-it-works/platform-overview" replace />} />
          <Route path="/our-tools/kubric-uidr" element={<Navigate to="/how-it-works/kubric-uidr" replace />} />
          <Route path="/our-tools/kubric-data-graph" element={<Navigate to="/how-it-works/kubric-data-graph" replace />} />
          <Route path="/our-tools/kubric-ai" element={<Navigate to="/how-it-works/kubricai" replace />} />

          {/* ═══════════════════════════════════════════════════════════
              SERVICE LAYER (new canonical routes)
              ═══════════════════════════════════════════════════════════ */}
          <Route path="/service-layer" element={<ServiceLayerOverview />} />
          {/* Infrastructure & Operations */}
          <Route path="/service-layer/cio" element={<CioKube />} />
          <Route path="/service-layer/npm" element={<NpmKube />} />
          <Route path="/service-layer/mdm" element={<MdmKube />} />
          <Route path="/service-layer/apm" element={<ApmKube />} />
          <Route path="/service-layer/cfdr" element={<CfdrKube />} />
          <Route path="/service-layer/bdr" element={<BdrKube />} />
          {/* Security Detection & Response */}
          <Route path="/service-layer/itdr" element={<ItdrKube />} />
          <Route path="/service-layer/ndr" element={<NdrKube />} />
          <Route path="/service-layer/cdr" element={<CdrKube />} />
          <Route path="/service-layer/sdr" element={<SdrKube />} />
          <Route path="/service-layer/adr" element={<AdrKube />} />
          <Route path="/service-layer/ddr" element={<DdrKube />} />
          {/* Intelligence & Governance */}
          <Route path="/service-layer/ti" element={<TiKube />} />
          <Route path="/service-layer/vdr" element={<VdrKube />} />
          <Route path="/service-layer/grc" element={<GrcKube />} />
          {/* New modules */}
          <Route path="/service-layer/strike" element={<StrikeModule />} />
          <Route path="/service-layer/easm" element={<EasmModule />} />
          <Route path="/service-layer/honeypot" element={<HoneypotModule />} />

          {/* ── Legacy /kubes/* redirects → /service-layer/* ─────────── */}
          <Route path="/kubes" element={<Navigate to="/service-layer" replace />} />
          <Route path="/kubes/cio-kube" element={<Navigate to="/service-layer/cio" replace />} />
          <Route path="/kubes/npm-kube" element={<Navigate to="/service-layer/npm" replace />} />
          <Route path="/kubes/mdm-kube" element={<Navigate to="/service-layer/mdm" replace />} />
          <Route path="/kubes/apm-kube" element={<Navigate to="/service-layer/apm" replace />} />
          <Route path="/kubes/cfdr-kube" element={<Navigate to="/service-layer/cfdr" replace />} />
          <Route path="/kubes/bdr-kube" element={<Navigate to="/service-layer/bdr" replace />} />
          <Route path="/kubes/itdr-kube" element={<Navigate to="/service-layer/itdr" replace />} />
          <Route path="/kubes/ndr-kube" element={<Navigate to="/service-layer/ndr" replace />} />
          <Route path="/kubes/cdr-kube" element={<Navigate to="/service-layer/cdr" replace />} />
          <Route path="/kubes/sdr-kube" element={<Navigate to="/service-layer/sdr" replace />} />
          <Route path="/kubes/adr-kube" element={<Navigate to="/service-layer/adr" replace />} />
          <Route path="/kubes/ddr-kube" element={<Navigate to="/service-layer/ddr" replace />} />
          <Route path="/kubes/ti-kube" element={<Navigate to="/service-layer/ti" replace />} />
          <Route path="/kubes/vdr-kube" element={<Navigate to="/service-layer/vdr" replace />} />
          <Route path="/kubes/grc-kube" element={<Navigate to="/service-layer/grc" replace />} />
          <Route path="/kubes/assessment-kube" element={<Navigate to="/get-started" replace />} />
          <Route path="/kubes/compliance-kube" element={<Navigate to="/services/managed-compliance" replace />} />
          <Route path="/kubes/mssp-kube" element={<Navigate to="/services/managed-soc" replace />} />
          <Route path="/kubes/msp-kube" element={<Navigate to="/services/managed-noc" replace />} />
          <Route path="/kubes/advisory-kube" element={<Navigate to="/services" replace />} />
          <Route path="/kubes/innovation-kube" element={<Navigate to="/how-it-works/kubricai" replace />} />
          <Route path="/kubes/industry-kube" element={<Navigate to="/solutions/hub" replace />} />
          <Route path="/kubes/product-kube" element={<Navigate to="/service-tiers" replace />} />

          {/* ═══════════════════════════════════════════════════════════
              SERVICE TIERS (new canonical routes, formerly Products)
              ═══════════════════════════════════════════════════════════ */}
          <Route path="/service-tiers" element={<Products />} />
          <Route path="/service-tiers/xro-essentials" element={<Xro />} />
          <Route path="/service-tiers/xmx-advanced" element={<Xmm />} />
          <Route path="/service-tiers/xme-enterprise" element={<Xme />} />
          <Route path="/service-tiers/custom" element={<CustomProduct />} />

          {/* ── Legacy /products/* redirects → /service-tiers/* ──────── */}
          <Route path="/products" element={<Navigate to="/service-tiers" replace />} />
          <Route path="/products/xro" element={<Navigate to="/service-tiers/xro-essentials" replace />} />
          <Route path="/products/xmm" element={<Navigate to="/service-tiers/xmx-advanced" replace />} />
          <Route path="/products/xme" element={<Navigate to="/service-tiers/xme-enterprise" replace />} />
          <Route path="/products/custom" element={<Navigate to="/service-tiers/custom" replace />} />

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
          <Route path="/services/help-desk" element={<HelpDesk />} />
          <Route path="/services/managed-it" element={<ManagedIt />} />
          <Route path="/services/smart-hands" element={<SmartHands />} />

          {/* Solutions Hub */}
          <Route path="/solutions/hub" element={<Navigate to="/solutions" replace />} />
          <Route path="/solutions/manufacturing" element={<SolutionManufacturing />} />
          <Route path="/solutions/healthcare" element={<SolutionHealthcare />} />
          <Route path="/solutions/public-sector" element={<SolutionPublicSector />} />
          <Route path="/solutions/financial-services" element={<SolutionFinancialServices />} />
          <Route path="/solutions/retail" element={<SolutionRetail />} />
          <Route path="/solutions/technology" element={<SolutionTechnology />} />
          {/* By Market Size */}
          <Route path="/solutions/by-market-size" element={<ByMarketSize />} />
          <Route path="/solutions/by-market-size/smb" element={<SolutionSmb />} />
          <Route path="/solutions/by-market-size/sme" element={<SolutionSme />} />
          <Route path="/solutions/by-market-size/enterprise" element={<SolutionEnterprise />} />
          {/* Legacy market-size routes */}
          <Route path="/solutions/smb" element={<Navigate to="/solutions/by-market-size/smb" replace />} />
          <Route path="/solutions/sme" element={<Navigate to="/solutions/by-market-size/sme" replace />} />
          <Route path="/solutions/enterprise" element={<Navigate to="/solutions/by-market-size/enterprise" replace />} />
          {/* By Industry */}
          <Route path="/solutions/by-industry" element={<ByIndustry />} />
          {/* By Service Type */}
          <Route path="/solutions/by-service-type" element={<ByServiceType />} />
          <Route path="/solutions/by-service-type/fully-managed" element={<FullyManagedSolution />} />
          <Route path="/solutions/by-service-type/co-managed" element={<CoManagedSolution />} />
          <Route path="/solutions/by-service-type/self-managed" element={<SelfManagedSolution />} />

          {/* Compliance */}
          <Route path="/compliance" element={<ComplianceLanding />} />
          <Route path="/compliance/cmmc" element={<Cmmc />} />
          <Route path="/compliance/cjis" element={<Cjis />} />
          <Route path="/compliance/nist-800-171" element={<Nist800171 />} />
          <Route path="/compliance/nist-800-53" element={<Nist80053 />} />
          <Route path="/compliance/hipaa" element={<Hipaa />} />
          <Route path="/compliance/soc2" element={<Soc2 />} />
          <Route path="/compliance/iso-27001" element={<Iso27001 />} />
          <Route path="/compliance/pci-dss" element={<PciDss />} />
          <Route path="/compliance/fedramp" element={<FedRamp />} />
          <Route path="/compliance/nist-csf" element={<NistCsf />} />
          <Route path="/compliance/cis-controls" element={<CisControls />} />
          <Route path="/compliance/fisma" element={<Fisma />} />

          {/* Industries */}
          <Route path="/industries" element={<IndustriesHub />} />
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
          <Route path="/about/partners" element={<Partners />} />
          <Route path="/about/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Navigate to="/get-started" replace />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/support" element={<Support />} />

          {/* Tools (Lead Magnets) */}
          <Route path="/tools/threat-ai" element={<ThreatAi />} />
          <Route path="/tools/threat-ai/:id" element={<CVEDetailPage />} />

          {/* CRM Platform */}
          <Route path="/crm" element={<AuthGate><CrmLayout /></AuthGate>}>
            <Route index element={<CrmDashboard />} />
            <Route path="organizations" element={<CrmOrganizations />} />
            <Route path="organizations/:id" element={<CrmOrgDetail />} />
            <Route path="contacts" element={<CrmContacts />} />
            <Route path="contacts/:id" element={<CrmContactDetail />} />
            <Route path="deals" element={<CrmDeals />} />
            <Route path="tickets" element={<CrmTickets />} />
            <Route path="time" element={<CrmTimeTracking />} />
            <Route path="contracts" element={<CrmContracts />} />
            <Route path="invoices" element={<CrmInvoices />} />
            <Route path="leads" element={<CrmLeadImport />} />
            <Route path="bulk-upload" element={<CrmBulkUpload />} />
            <Route path="careers" element={<CrmCareers />} />
            <Route path="assessments" element={<CrmAssessmentSessions />} />
            <Route path="bom-quotes" element={<CrmBomQuotes />} />
            <Route path="assets" element={<CrmAssets />} />
            <Route path="deployments" element={<CrmDeployments />} />
            <Route path="audit" element={<CrmAuditLog />} />
            <Route path="settings" element={<CrmSettings />} />
            <Route path="legacy" element={<CmsAdmin />} />
          </Route>
          <Route path="/cms" element={<Navigate to="/crm" replace />} />

          {/* Login Portals */}
          <Route path="/login/partner" element={<PartnerPortal />} />
          <Route path="/login/client" element={<ClientPortal />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/open-source-licensing" element={<OpenSourceLicensing />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/docs" element={<Navigate to="/documentation" replace />} />

          {/* Auth */}
          <Route path="/auth/login" element={<Login />} />

          {/* UIDR Open Source Docs Site */}
          <Route path="/uidr" element={<UidrHome />} />
          <Route path="/uidr/platform" element={<UidrPlatform />} />
          <Route path="/uidr/docs" element={<UidrDocs />} />
          <Route path="/uidr/docs/:moduleId" element={<UidrModulePage />} />
          <Route path="/uidr/technical-docs" element={<AuthGate><UidrTechnicalDocs /></AuthGate>} />
          <Route path="/uidr/contributors" element={<AuthGate><UidrContributors /></AuthGate>} />
          <Route path="/uidr/open-source" element={<AuthGate><UidrOpenSource /></AuthGate>} />
          <Route path="/uidr/ide" element={<AuthGate><UidrIde /></AuthGate>} />
          <Route path="/uidr/contact" element={<UidrContact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </BOMCartProvider>
        </PathProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
