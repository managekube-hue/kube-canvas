import { KubePageTemplate } from "@/components/KubePageTemplate";

const InnovationKube = () => {
  return (
    <KubePageTemplate
      name="Innovation Kube"
      tagline="AI & Automation"
      phase="OPTIMIZE"
      description="AI-driven automation and modern software delivery. Agentic AI, hyperautomation, and DevSecOps using watsonx, UiPath, and leading platforms. Transform operations through intelligent automation."
      blocks={[
        { name: "Hyperautomation (RPA/AI Agents)", description: "Software robots and AI agents for process automation using UiPath and watsonx Orchestrate." },
        { name: "DevSecOps (CI/CD)", description: "Secure CI/CD pipelines, automated testing, and security scanning integrated into development." },
        { name: "Data Intelligence (watsonx.data)", description: "Data modernization, business intelligence, advanced analytics, and ML model deployment." },
        { name: "Custom Development (APIs)", description: "Application development, systems integration, and API-first architecture." },
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
