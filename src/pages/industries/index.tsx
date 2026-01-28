import { PageLayout } from "@/components/PageLayout";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

interface IndustryPageProps {
  name: string;
  block: string;
  tagline: string;
  description: string;
  challenges: string[];
  capabilities: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  compliance: string[];
  scalability: string;
}

export const IndustryPageTemplate = ({
  name,
  block,
  tagline,
  description,
  challenges,
  capabilities,
  technologies,
  compliance,
  scalability,
}: IndustryPageProps) => (
  <PageLayout>
    {/* Hero Banner */}
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 30%, hsl(24 70% 35%) 60%, #4A4A4A 100%)",
        }}
      />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-label text-white/70 mb-6"
          >
            {block}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-brand-orange font-semibold mb-4"
          >
            {tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>

    {/* Challenges Section */}
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-label text-muted-foreground mb-4">THE CHALLENGES</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              What {name.toLowerCase()} organizations face
            </h2>
          </div>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-brand-orange pl-6 py-2"
              >
                <p className="text-foreground">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Capabilities Section */}
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-label text-muted-foreground mb-4">THE SOLUTION</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {block} Platform Capabilities
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 border border-border"
            >
              <h3 className="text-xl font-bold text-foreground mb-3">
                {capability.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Technology & Compliance */}
    <section className="py-20 lg:py-32 bg-foreground text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technologies */}
          <div>
            <p className="text-label text-white/50 mb-4">TECHNOLOGY STACK</p>
            <h3 className="text-2xl font-bold text-white mb-8">
              Integrated platforms
            </h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 text-white text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Compliance */}
          <div>
            <p className="text-label text-white/50 mb-4">COMPLIANCE FRAMEWORKS</p>
            <h3 className="text-2xl font-bold text-white mb-8">
              Built-in compliance
            </h3>
            <ul className="space-y-3">
              {compliance.map((framework, index) => (
                <li key={index} className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  {framework}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Scalability */}
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-label text-muted-foreground mb-4">SCALABILITY</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
            Grows with your organization
          </h2>
          <p className="text-lg text-muted-foreground">
            {scalability}
          </p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
          Ready to transform your {name.toLowerCase()} operations?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Take our free assessment to discover how the {block} platform can address your specific challenges.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
          >
            Take Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>

    <PathfinderCTA />
  </PageLayout>
);

// Manufacturing M2BLOCK
export const Manufacturing = () => (
  <IndustryPageTemplate
    name="Manufacturing"
    block="M2BLOCK"
    tagline="Production Excellence Through Intelligent Operations"
    description="Integrated technology specifically architected for production environments, combining rugged edge computing with AI-powered quality control and predictive maintenance."
    challenges={[
      "Unplanned equipment downtime causing production losses",
      "Quality defects generating scrap and rework costs",
      "Manual inspection processes unable to match production speeds",
      "Disconnected systems preventing comprehensive operational visibility",
    ]}
    capabilities={[
      {
        title: "Predictive Maintenance",
        description: "Maximo Monitor collects operational data from connected equipment and applies machine learning models to predict maintenance requirements before failures occur.",
      },
      {
        title: "AI Visual Inspection",
        description: "IBM Maximo Visual Inspection uses artificial intelligence to detect quality defects with greater consistency than human inspectors while operating at production line speeds.",
      },
      {
        title: "Process Mining & Optimization",
        description: "Process Mining software analyzes actual production workflows to identify bottlenecks and inefficiencies across the manufacturing floor.",
      },
      {
        title: "Edge Computing",
        description: "PowerEdge XR rugged servers withstand factory floor conditions including temperature extremes, vibration, and particulate contamination for real-time data collection.",
      },
    ]}
    technologies={["PowerEdge XR", "VxRail HCI", "PowerScale", "IBM Maximo", "Visual Inspection", "Process Mining", "Cloud Pak for AIOps"]}
    compliance={["CMMC", "NIST 800-171", "ISO 27001", "IEC 62443"]}
    scalability="The platform scales from single production facilities using PowerEdge tower servers and OptiPlex desktop endpoints to global manufacturing enterprises requiring VxBlock systems, PowerMax storage for mission-critical applications, and APEX consumption models supporting hundreds of sites with centralized edge management through NativeEdge software."
  />
);

// Healthcare H2BLOCK
export const Healthcare = () => (
  <IndustryPageTemplate
    name="Healthcare"
    block="H2BLOCK"
    tagline="Clinical Excellence Through Secure Infrastructure"
    description="Technology architected for healthcare's combination of mission-critical reliability and regulatory requirements, ensuring patient data protection and clinical system performance."
    challenges={[
      "Electronic health record systems responding slowly reducing clinician productivity",
      "Medical equipment failures disrupting procedures and compromising care quality",
      "Ransomware attacks threatening to encrypt patient data and halt clinical operations",
      "HIPAA compliance requirements demanding continuous monitoring and documentation",
    ]}
    capabilities={[
      {
        title: "EHR Performance Optimization",
        description: "PowerMax storage delivers sub-millisecond response times that clinical applications require with availability levels ensuring electronic health records remain accessible during emergencies.",
      },
      {
        title: "Cyber Recovery",
        description: "PowerProtect Cyber Recovery creates isolated recovery environments where patient data backups remain protected from ransomware attacks that encrypt production systems.",
      },
      {
        title: "Medical Equipment Management",
        description: "IBM Maximo manages medical equipment from imaging systems to infusion pumps, monitoring performance and predicting failures before they impact patient care.",
      },
      {
        title: "Compliance Automation",
        description: "OpenPages automates HIPAA compliance evidence collection and audit preparation, reducing manual effort and ensuring continuous regulatory alignment.",
      },
    ]}
    technologies={["PowerMax", "VxBlock", "PowerProtect Cyber Recovery", "Storage Sentinel", "IBM Maximo", "MaaS360", "IBM Verify", "OpenPages"]}
    compliance={["HIPAA", "HITRUST", "SOC 2", "HITECH"]}
    scalability="The platform scales from small clinical practices using PowerEdge tower servers to academic medical centers requiring PowerMax storage, multi-site APEX infrastructure, and comprehensive disaster recovery capabilities."
  />
);

// Financial Services F2BLOCK
export const FinancialServices = () => (
  <IndustryPageTemplate
    name="Financial Services"
    block="F2BLOCK"
    tagline="Mission-Critical Operations Through Resilient Infrastructure"
    description="Technology architected for mission-critical reliability and extreme performance, supporting real-time transaction processing and comprehensive regulatory compliance."
    challenges={[
      "Transaction processing systems cannot tolerate downtime affecting customer access",
      "Fraud detection must analyze patterns in real time to identify suspicious activity",
      "Regulatory reporting requires comprehensive data governance and audit trails",
      "Cyber threats targeting financial institutions require advanced protection",
    ]}
    capabilities={[
      {
        title: "Real-Time Fraud Detection",
        description: "IBM Safer Payments provides real-time fraud detection using artificial intelligence models that analyze transaction patterns, customer behavior, and risk indicators.",
      },
      {
        title: "High-Performance Trading",
        description: "PowerMax storage delivers the sub-millisecond response times required for core banking and trading applications with availability levels appropriate for financial operations.",
      },
      {
        title: "GRC Management",
        description: "OpenPages provides unified governance, risk, and compliance management, automating policy enforcement and regulatory reporting across the organization.",
      },
      {
        title: "Ransomware Protection",
        description: "PowerProtect Cyber Recovery with CyberSense analytics provides ransomware protection through machine learning models that detect encryption activity.",
      },
    ]}
    technologies={["PowerMax", "IBM z16", "Safer Payments", "Financial Transaction Manager", "OpenPages", "IBM Verify", "PowerProtect Cyber Recovery"]}
    compliance={["SOC 2", "PCI DSS", "GLBA", "SOX", "FINRA"]}
    scalability="The platform scales from regional banks using PowerEdge rack servers and Unity storage to global institutions requiring PowerMax arrays, z16 mainframe integration, and multi-cloud APEX deployments."
  />
);

// Retail R2BLOCK
export const Retail = () => (
  <IndustryPageTemplate
    name="Retail"
    block="R2BLOCK"
    tagline="Omnichannel Commerce Through Intelligent Integration"
    description="Technology architected for distributed store operations and omnichannel integration, delivering seamless experiences across physical stores, e-commerce, and mobile applications."
    challenges={[
      "Inventory visibility gaps causing lost sales when products appear available but cannot be located",
      "Point-of-sale system failures preventing transaction processing",
      "Disconnected systems preventing unified customer views across channels",
      "Complex supply chains requiring real-time optimization",
    ]}
    capabilities={[
      {
        title: "Unified Order Management",
        description: "IBM Sterling Order Management provides unified order orchestration across all fulfillment channels including ship-from-store, buy-online-pickup-in-store, and same-day delivery.",
      },
      {
        title: "Intelligent Promising",
        description: "Sterling Intelligent Promising uses artificial intelligence to determine optimal fulfillment locations based on inventory availability, shipping costs, and delivery timeframes.",
      },
      {
        title: "Edge Store Management",
        description: "NativeEdge provides centralized management of technology across thousands of store locations, enabling consistent configurations and remote troubleshooting.",
      },
      {
        title: "AI Personalization",
        description: "Watsonx artificial intelligence enables personalized product recommendations and conversational commerce for enhanced customer engagement.",
      },
    ]}
    technologies={["NativeEdge", "PowerEdge T560", "OptiPlex Micro", "VxRail", "Sterling Order Management", "watsonx", "Cloud Pak for Data"]}
    compliance={["PCI DSS", "CCPA", "GDPR", "SOC 2"]}
    scalability="The platform scales from boutique retailers using OptiPlex systems to global retail enterprises requiring APEX infrastructure supporting tens of thousands of edge locations."
  />
);

// Transportation T2BLOCK
export const Transportation = () => (
  <IndustryPageTemplate
    name="Transportation"
    block="T2BLOCK"
    tagline="Fleet Intelligence Through Connected Operations"
    description="Technology architected for mobile operations and fleet management, providing real-time visibility, route optimization, and regulatory compliance across distributed logistics networks."
    challenges={[
      "Manual routing processes cannot optimize for changing traffic conditions",
      "Equipment maintenance failures strand vehicles and disrupt delivery schedules",
      "Driver compliance monitoring requires manual processes",
      "Lack of real-time visibility into fleet operations and customer deliveries",
    ]}
    capabilities={[
      {
        title: "Fleet Asset Management",
        description: "IBM Maximo monitors fleet assets and predicts maintenance requirements based on actual operating conditions rather than fixed schedules.",
      },
      {
        title: "AI Route Optimization",
        description: "Watsonx artificial intelligence analyzes traffic patterns, delivery requirements, and vehicle characteristics to optimize routes for fuel efficiency and on-time performance.",
      },
      {
        title: "Decision Optimization",
        description: "IBM Decision Optimization provides mathematical optimization for complex routing and scheduling problems across distributed logistics networks.",
      },
      {
        title: "Driver Mobility",
        description: "MaaS360 manages mobile devices deployed to drivers with applications for electronic logging, delivery confirmation, and customer communication.",
      },
    ]}
    technologies={["PowerEdge XR", "Edge Gateway", "VxRail", "IBM Maximo", "watsonx", "IBM MQ", "Decision Optimization", "MaaS360"]}
    compliance={["ELD Mandate", "FMCSA", "DOT", "ISO 28000"]}
    scalability="The platform scales from local carriers using PowerEdge tower servers to global logistics providers requiring APEX infrastructure and comprehensive edge-to-core-to-cloud integration."
  />
);

// Mining & Extraction ME2BLOCK
export const MiningExtraction = () => (
  <IndustryPageTemplate
    name="Mining & Extraction"
    block="ME2BLOCK"
    tagline="Remote Operations Through Resilient Infrastructure"
    description="Technology architected for extreme environments and remote operations, withstanding harsh conditions while enabling safe operations and environmental compliance."
    challenges={[
      "Remote operations challenge connectivity and require autonomous capabilities",
      "Equipment failures in mining environments create safety risks and production losses",
      "Extreme environmental conditions exceed standard equipment tolerances",
      "Environmental compliance and emissions tracking requirements",
    ]}
    capabilities={[
      {
        title: "Extreme Environment Computing",
        description: "PowerEdge XR servers operate in temperature ranges from -40°C to +55°C while withstanding shock and vibration for reliable remote site operations.",
      },
      {
        title: "Heavy Equipment Management",
        description: "IBM Maximo manages heavy equipment fleets across multiple mine sites, tracking maintenance history and predicting failures before they occur.",
      },
      {
        title: "OSDU Data Platform",
        description: "OSDU Data Platform and Energy Data Nexus provide comprehensive data management for exploration and production operations.",
      },
      {
        title: "Emissions Tracking",
        description: "Envizi Supply Chain Intelligence enables emissions tracking across Scope 1, 2, and 3 categories for environmental compliance.",
      },
    ]}
    technologies={["PowerEdge XR", "OEM Edge Servers", "VxRail", "IBM Maximo", "OSDU Data Platform", "Envizi", "QRadar SIEM"]}
    compliance={["MSHA", "EPA", "ISO 14001", "NERC CIP"]}
    scalability="The platform scales from single exploration sites using PowerEdge XR systems to global mining enterprises requiring PowerMax storage, OSDU data platforms, and comprehensive edge networks."
  />
);

// Energy & Utilities EU2BLOCK
export const EnergyUtilities = () => (
  <IndustryPageTemplate
    name="Energy & Utilities"
    block="EU2BLOCK"
    tagline="Grid Resilience Through Intelligent Asset Management"
    description="Technology architected for critical infrastructure reliability and operational technology integration, maintaining absolute reliability while integrating renewable energy sources."
    challenges={[
      "Grid instability from renewable integration creates operational complexity",
      "Asset failures cause service interruptions affecting customers",
      "Cyber threats target critical infrastructure requiring advanced protection",
      "Sustainability reporting requirements demand accurate emissions tracking",
    ]}
    capabilities={[
      {
        title: "Grid Asset Management",
        description: "IBM Maximo manages physical assets from generation equipment to transmission lines to distribution transformers, monitoring performance and predicting failures.",
      },
      {
        title: "Grid Optimization",
        description: "Watsonx artificial intelligence analyzes weather patterns, demand forecasts, and renewable generation predictions to optimize grid operations.",
      },
      {
        title: "Sustainability Reporting",
        description: "Envizi automates emissions data collection and sustainability reporting across all operational facilities.",
      },
      {
        title: "OT/IT Security",
        description: "QRadar monitors both enterprise and operational technology environments with specialized threat intelligence for critical infrastructure.",
      },
    ]}
    technologies={["PowerEdge XR", "NativeEdge Energy", "IBM Maximo", "watsonx", "Decision Optimization", "Envizi", "QRadar", "OSDU Energy Data Nexus"]}
    compliance={["NERC CIP", "FERC", "EPA", "ISO 50001"]}
    scalability="The platform scales from municipal utilities using PowerEdge rack servers to national grid operators requiring APEX infrastructure, multi-region disaster recovery, and comprehensive NERC-CIP compliance capabilities."
  />
);

// Public Sector PS2BLOCK
export const PublicSector = () => (
  <IndustryPageTemplate
    name="Public Sector"
    block="PS2BLOCK"
    tagline="Citizen Services Through Secure Digital Platforms"
    description="Technology enabling digitization of citizen services, remote work for employees, and modernization of aging infrastructure while meeting varying compliance requirements."
    challenges={[
      "Manual citizen service processes create delays and reduce satisfaction",
      "Legacy systems resist modernization efforts",
      "Remote work demands security without compromising productivity",
      "Varying compliance requirements across federal, state, and local levels",
    ]}
    capabilities={[
      {
        title: "Citizen Service Digitization",
        description: "Digital platforms enable online service delivery, reducing in-person visits and improving citizen satisfaction through convenient access.",
      },
      {
        title: "Legacy Modernization",
        description: "Cloud migration and application modernization strategies update aging systems while maintaining continuity of critical services.",
      },
      {
        title: "Secure Remote Work",
        description: "IBM Verify and MaaS360 enable secure remote work with identity-centric access controls and comprehensive endpoint management.",
      },
      {
        title: "FedRAMP Compliance",
        description: "Pre-authorized cloud infrastructure and continuous monitoring capabilities meet federal security requirements.",
      },
    ]}
    technologies={["PowerEdge", "VxRail", "Azure Government", "AWS GovCloud", "IBM Verify", "MaaS360", "OpenPages"]}
    compliance={["FedRAMP", "FISMA", "StateRAMP", "CJIS", "ITAR"]}
    scalability="The platform scales from municipal agencies using PowerEdge servers to federal departments requiring FedRAMP High authorization and comprehensive security controls."
  />
);

// Telecommunications TC2BLOCK
export const Telecommunications = () => (
  <IndustryPageTemplate
    name="Telecommunications"
    block="TC2BLOCK"
    tagline="Network Evolution Through Intelligent Operations"
    description="Technology architected for network operators managing complex infrastructure while deploying next-generation services and maintaining service quality."
    challenges={[
      "Network complexity increases with 5G deployment and edge computing",
      "Service quality must be maintained across heterogeneous infrastructure",
      "Customer experience depends on rapid issue resolution",
      "Revenue assurance requires accurate billing and fraud prevention",
    ]}
    capabilities={[
      {
        title: "Network Assurance",
        description: "Cloud Pak for Network Automation provides closed-loop network assurance with AI-driven anomaly detection and automated remediation.",
      },
      {
        title: "5G Infrastructure",
        description: "PowerEdge servers and VxRail infrastructure support 5G core network functions and multi-access edge computing deployments.",
      },
      {
        title: "OSS/BSS Integration",
        description: "IBM software integrates operational and business support systems for unified service delivery and customer management.",
      },
      {
        title: "Customer Experience",
        description: "Watsonx AI enables intelligent customer service through virtual agents and predictive issue resolution.",
      },
    ]}
    technologies={["PowerEdge", "VxRail", "Cloud Pak for Network Automation", "watsonx", "IBM MQ", "API Connect"]}
    compliance={["FCC", "CPNI", "SOC 2", "ISO 27001"]}
    scalability="The platform scales from regional carriers to global telecommunications providers requiring massive compute capacity for 5G core networks and edge deployments."
  />
);
