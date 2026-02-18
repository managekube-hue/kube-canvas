import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function KubricAi() {
  return <ServiceDetailPage
    category="AI Platform"
    name="KubricAI"
    tagline="AI-powered orchestration using CrewAI for predictive threat detection and automated remediation."
    description="KubricAI leverages advanced machine learning and the CrewAI framework to deliver intelligent automation across security and operations. From predictive threat detection to automated incident response, KubricAI learns from your environment to continuously improve protection."
    sections={[
      { title: "AI Capabilities", items: ["Predictive threat detection", "Automated incident response", "Intelligent alert prioritization", "Anomaly detection and baseline learning"] },
      { title: "Automation", items: ["CrewAI agentic orchestration", "Automated remediation playbooks", "Cross-Kube intelligence correlation", "Continuous improvement feedback loops"] },
    ]}
  />;
}
