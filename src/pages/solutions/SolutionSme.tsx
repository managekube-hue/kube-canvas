import { ServiceDetailPage } from "@/components/ServiceDetailPage";
export default function SolutionSme() {
  return <ServiceDetailPage
    category="By Market Size"
    name="SME — Small/Medium Enterprise"
    tagline="Flexible platform for growing mid-market companies balancing customization, control, and managed services."
    description="SME solutions provide flexibility for mid-market organizations to customize platform configurations while leveraging managed services for 24/7 coverage. Hybrid delivery models allow internal teams to manage day-to-day with expert backup for complex incidents."
    sections={[
      { title: "SME Features", items: ["Customizable Kube configurations", "Hybrid managed services (co-managed)", "Dedicated account management", "Advanced reporting and analytics"] },
      { title: "Flexibility", items: ["Compliance framework selection", "Integration with existing tools", "Quarterly business reviews", "Growth and scaling support"] },
    ]}
  />;
}
