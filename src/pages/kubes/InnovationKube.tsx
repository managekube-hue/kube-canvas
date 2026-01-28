import { KubePageTemplate } from "@/components/KubePageTemplate";

const InnovationKube = () => {
  return (
    <KubePageTemplate
      name="Innovation Kube"
      tagline="AI & Automation"
      phase="OPTIMIZE"
      description="AI-driven automation and modern software delivery. Agentic AI, hyperautomation, and DevSecOps using watsonx, UiPath, and leading platforms. Transform operations through intelligent automation."
      blocks={[
        {
          id: "hyperautomation",
          name: "Hyperautomation (RPA/AI Agents)",
          description: "Software robots and AI agents for process automation using UiPath and watsonx Orchestrate.",
          details: "We implement intelligent automation that combines RPA with AI to automate complex business processes. From simple tasks to cognitive workflows.",
          useCases: [
            "Invoice processing automation",
            "Customer onboarding workflows",
            "IT process automation",
          ],
        },
        {
          id: "devsecops",
          name: "DevSecOps (CI/CD)",
          description: "Secure CI/CD pipelines, automated testing, and security scanning integrated into development.",
          details: "Modern software delivery with security built in. We implement CI/CD pipelines with automated security testing and compliance checks.",
          useCases: [
            "Application modernization",
            "Secure software development",
            "Deployment automation",
          ],
        },
        {
          id: "data-intelligence",
          name: "Data Intelligence (watsonx.data)",
          description: "Data modernization, business intelligence, advanced analytics, and ML model deployment.",
          details: "Leverage IBM watsonx for advanced analytics, data modernization, and machine learning. Turn data into actionable insights.",
          useCases: [
            "Data lake implementation",
            "Predictive analytics",
            "Business intelligence dashboards",
          ],
        },
        {
          id: "custom-development",
          name: "Custom Development (APIs)",
          description: "Application development, systems integration, and API-first architecture.",
          details: "Custom application development for unique business needs. API-first design, cloud-native architecture, and enterprise integrations.",
          useCases: [
            "Legacy system modernization",
            "Custom business applications",
            "API development and integration",
          ],
        },
      ]}
      deliverables={[
        "Process Automation Roadmap",
        "Bot Development & Deployment",
        "CI/CD Pipeline Implementation",
        "Data Analytics Dashboards",
        "Custom Application Development",
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
