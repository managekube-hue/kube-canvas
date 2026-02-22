import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function CustomAutomation() {
  return <ServiceDetailPage
    category="Deployment & Integration"
    name="Custom Automation Development"
    tagline="Bespoke automation, scripting, and workflow development for unique operational requirements."
    description="Custom Automation Development creates tailored automation solutions for unique business processes, security workflows, and operational tasks. From SOAR playbooks and API integrations to infrastructure-as-code and CI/CD pipelines, our engineers build the automation your organization needs to eliminate manual toil and accelerate operations."
    sections={[
      {
        title: "Security Automation",
        items: [
          "Custom SOAR playbook development for incident response workflows",
          "Automated threat enrichment and IOC correlation pipelines",
          "Alert triage and escalation automation with decision logic",
          "Compliance evidence collection automation",
          "Vulnerability scanning and remediation orchestration",
        ],
      },
      {
        title: "Infrastructure Automation",
        items: [
          "Infrastructure-as-code development (Terraform, Ansible, Pulumi)",
          "Configuration management and drift remediation automation",
          "Automated provisioning and deprovisioning workflows",
          "Backup and disaster recovery automation",
          "Self-healing infrastructure with automated remediation runbooks",
        ],
      },
      {
        title: "Integration Development",
        items: [
          "REST and GraphQL API integration development",
          "Data transformation and ETL pipeline engineering",
          "Webhook and event-driven architecture implementation",
          "Single sign-on (SSO) and identity federation integration",
          "Third-party tool integration (ServiceNow, Jira, Slack, Teams)",
        ],
      },
      {
        title: "DevOps & Quality",
        items: [
          "CI/CD pipeline design and implementation",
          "Custom monitoring dashboards and reporting automation",
          "Script development (Python, PowerShell, Bash, Go)",
          "Code review, testing, and quality assurance",
          "Documentation, knowledge transfer, and operational handoff",
        ],
      },
    ]}
    similar={[
      { label: "Legacy System Integrations", href: "/services/legacy-integrations" },
      { label: "Managed IT", href: "/services/managed-it" },
      { label: "Application Performance Monitoring", href: "/service-layer/apm" },
    ]}
  />;
}
