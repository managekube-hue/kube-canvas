import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Briefcase, Ticket, FileText, DollarSign, Package, Calendar } from "lucide-react";

export default function CrmHelp() {
  const guides = [
    {
      title: "Getting Started",
      icon: BookOpen,
      items: [
        "Create your first organization",
        "Add contacts and link to organizations",
        "Set up your first deal in the pipeline",
        "Configure SLA tiers for support",
      ],
    },
    {
      title: "Organizations & Contacts",
      icon: Users,
      items: [
        "Manage organization details and health scores",
        "Track primary contacts and decision makers",
        "Link contacts to multiple organizations",
        "Export contact lists to CSV",
      ],
    },
    {
      title: "Deals & Pipeline",
      icon: Briefcase,
      items: [
        "Move deals through pipeline stages",
        "Set expected close dates and probabilities",
        "Track MRR and deal values",
        "Generate pipeline reports",
      ],
    },
    {
      title: "Ticketing System",
      icon: Ticket,
      items: [
        "Create tickets with priority levels",
        "Assign tickets to technicians",
        "Track SLA response and resolution times",
        "Link tickets to assets and organizations",
      ],
    },
    {
      title: "Contracts & Billing",
      icon: FileText,
      items: [
        "Create recurring contracts with MRR",
        "Set auto-renewal and expiration dates",
        "Generate invoices from contracts",
        "Track payment status and overdue invoices",
      ],
    },
    {
      title: "Invoicing",
      icon: DollarSign,
      items: [
        "Create and send invoices",
        "Track payment status",
        "Link invoices to contracts",
        "Export invoice reports",
      ],
    },
    {
      title: "Asset Management",
      icon: Package,
      items: [
        "Track hardware and software assets",
        "Monitor asset health status",
        "Link assets to organizations",
        "Track warranty and purchase dates",
      ],
    },
    {
      title: "Deployments",
      icon: Calendar,
      items: [
        "Schedule deployment activities",
        "Assign deployments to technicians",
        "Track deployment status",
        "Link deployments to tickets",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Help & Guides</h2>
        <p className="text-sm text-muted-foreground">Learn how to use the CRM effectively</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {guides.map((guide, i) => (
          <Card key={i} className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <guide.icon className="h-5 w-5 text-primary" />
                {guide.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {guide.items.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-primary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Need More Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact your system administrator or reach out to support for additional assistance.
          </p>
          <div className="flex gap-2">
            <a href="mailto:support@managekube.com" className="text-sm text-primary hover:underline">
              support@managekube.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
