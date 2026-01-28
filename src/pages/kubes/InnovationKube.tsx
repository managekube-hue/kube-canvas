import { KubePageTemplate } from "@/components/KubePageTemplate";

const InnovationKube = () => {
  return (
    <KubePageTemplate
      name="Innovation Kube"
      tagline="AI & Automation"
      phase="OPTIMIZE"
      description="AI-driven automation and modern software delivery for digital transformation."
      narrative="Innovation & Intelligence Services provide a structured way to adopt AI, automation, and modern engineering practices to improve efficiency, customer experience, and speed of change. This Kube focuses on agentic AI, hyperautomation, and DevSecOps, using platforms such as watsonx, UiPath, and leading SaaS ecosystems. Transform operations through intelligent automation."
      blocks={[
        {
          id: "hyperautomation",
          name: "Agentic AI & Hyperautomation",
          description: "End-to-end automation using AI, RPA, and autonomous agents to streamline operations.",
          details: "RPA and Autonomous Agents encompasses design, build, and operation of software robots and AI agents that execute repetitive or rules-based work such as claims processing, invoice handling, and IT runbooks. This includes orchestration of agentic workflows across systems. Process Discovery and Optimization provides process mining and task mining to identify automation opportunities, quantify ROI, and prioritize use cases.",
          useCases: [
            "Invoice processing automation",
            "Customer onboarding workflows",
            "IT process automation",
            "Claims processing and decisioning",
          ],
          products: ["UiPath", "watsonx Orchestrate", "Automation Anywhere", "Process Mining"],
        },
        {
          id: "data-intelligence",
          name: "Data Intelligence & Insights",
          description: "Data foundation and analytics that turn operational data into actionable intelligence.",
          details: "Data Modernization includes assessment and modernization of data platforms such as migration to cloud data warehouses and lakes, API-enabled data access, data integration, quality, and governance. Business Intelligence and Advanced Analytics encompasses design of dashboards, KPI frameworks, and self-service analytics, along with ML models for forecasting, risk scoring, and optimization.",
          useCases: [
            "Data lake implementation",
            "Predictive analytics",
            "Business intelligence dashboards",
            "AI/ML model deployment",
          ],
          products: ["watsonx.data", "Snowflake", "Databricks", "Power BI", "Tableau"],
        },
        {
          id: "devsecops",
          name: "Modern Software Delivery (DevSecOps)",
          description: "Engineering practices and platforms that accelerate safe, reliable software delivery.",
          details: "DevSecOps Enablement provides implementation of CI/CD pipelines, automated testing, and security scanning integrated into the development lifecycle. Cloud-native delivery patterns including microservices, containers, GitOps, and standardized environments. Application Lifecycle Management encompasses governance, tooling, and workflows for managing releases, changes, and incidents.",
          useCases: [
            "Application modernization",
            "Secure software development",
            "Deployment automation",
            "Container platform implementation",
          ],
          products: ["GitLab", "GitHub Actions", "OpenShift", "Kubernetes", "ArgoCD"],
        },
        {
          id: "custom-development",
          name: "Application Development & Integration",
          description: "Custom solutions and integrations connecting platforms, partners, and data flows.",
          details: "Application Development encompasses design and build of custom web, mobile, and line-of-business applications using agile methods and cloud-native architectures, along with rapid prototyping and MVP delivery. Systems Integration provides integration of enterprise systems, SaaS applications, and data platforms via APIs, event streams, and integration platforms.",
          useCases: [
            "Legacy system modernization",
            "Custom business applications",
            "API development and integration",
            "B2B messaging and EDI",
          ],
          products: ["Node.js", "React", "Azure Functions", "MuleSoft", "IBM App Connect"],
        },
      ]}
      deliverables={[
        "Process Automation Roadmap",
        "Bot Development & Deployment",
        "CI/CD Pipeline Implementation",
        "Data Analytics Dashboards",
        "Custom Application Development",
        "Integration Architecture Design",
      ]}
      relatedKubes={[
        { name: "Advisory Kube", href: "/kubes/advisory-kube" },
        { name: "Product Kube", href: "/kubes/product-kube" },
        { name: "Industry Kube", href: "/kubes/industry-kube" },
      ]}
    />
  );
};

export default InnovationKube;
