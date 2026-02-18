import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function CustomAutomation() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Custom Automation Development"
    tagline="Bespoke automation, scripting, and workflow development for unique operational requirements."
    description="Custom Automation Development creates tailored automation solutions for unique business processes, security workflows, and operational tasks. Custom SOAR playbooks, API integrations, infrastructure-as-code development, and bespoke automation tools built to your specifications."
    sections={[
      { title: "Custom Development", items: ["Custom SOAR playbook development", "API integration development", "Infrastructure-as-code (Terraform, Ansible)", "Custom scripts (Python, PowerShell, Bash)"] },
      { title: "Engineering", items: ["Workflow automation", "Data transformation and ETL", "Custom reporting and dashboards", "CI/CD pipeline development", "Code review and quality assurance"] },
    ]}
  />;
}
