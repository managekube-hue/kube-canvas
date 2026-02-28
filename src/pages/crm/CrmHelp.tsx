import { useState } from "react";
import {
  BookOpen, LayoutDashboard, BarChart3, Building2, Users, Briefcase,
  Ticket, Clock, FileText, Package, Calendar, Shield, Settings,
  Upload, Megaphone, ClipboardCheck, ShoppingCart, ChevronDown, ChevronRight,
  Search, HelpCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface HelpArticle {
  id: string;
  title: string;
  icon: React.ElementType;
  category: string;
  steps: string[];
  tips?: string[];
}

const helpArticles: HelpArticle[] = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    category: "Getting Started",
    steps: [
      "The Dashboard is your command center — it shows live KPIs including Monthly Recurring Revenue (MRR), open tickets, active deals, and pipeline value.",
      "Cards at the top display real-time counts: Organizations, Contacts, Open Tickets, and Active Deals.",
      "The revenue chart shows MRR trends over time from your active contracts.",
      "Recent activity feeds show the latest ticket updates, deal movements, and contact interactions.",
      "Use the Dashboard to quickly assess team workload and business health at a glance.",
    ],
    tips: [
      "Check the Dashboard first thing each morning to prioritize your day.",
      "If MRR looks off, verify that contracts have correct billing frequencies set.",
    ],
  },
  {
    id: "lead-pipeline",
    title: "Lead Pipeline & Import",
    icon: BarChart3,
    category: "Lead Management",
    steps: [
      "Navigate to Lead Pipeline from the sidebar to view all website leads captured from contact forms, assessments, and the Get Started flow.",
      "Leads arrive automatically from the 'cms_contacts' table — every form submission on the website creates a lead.",
      "Click 'Import to CRM' on any lead to promote it to a full CRM Contact. This creates a Contact record and optionally an Organization.",
      "Imported contacts start at the 'Lead' lifecycle stage and progress through: Lead → MQL → SQL → Opportunity → Customer.",
      "Use filters at the top to sort by source (website, assessment, BOM quote) or date range.",
      "The lead score column shows an auto-calculated engagement score based on assessment completion, page visits, and form detail depth.",
    ],
    tips: [
      "Leads are auto-synced every 15 minutes via the crm-sync-monitor. Manual import is for immediate action.",
      "Always check for duplicate emails before importing — the system will warn you if a contact already exists.",
    ],
  },
  {
    id: "csv-upload",
    title: "CSV Bulk Upload",
    icon: Upload,
    category: "Lead Management",
    steps: [
      "Go to CSV Upload to import contacts in bulk from spreadsheets or other CRM exports.",
      "Download the template CSV first to see the required column format: first_name, last_name, email, company, phone, job_title.",
      "Drag and drop your CSV file or click to browse. The system validates all rows before import.",
      "Review the preview table — rows with errors (missing email, invalid format) are highlighted in red.",
      "Click 'Import All Valid Rows' to create contacts. Each row becomes a CRM Contact with lifecycle_stage = 'lead'.",
      "After import, contacts appear in the Contacts module and can be associated with Organizations.",
    ],
    tips: [
      "Maximum 500 rows per upload. For larger datasets, split into multiple files.",
      "Email is the only required field — all others are optional but recommended.",
    ],
  },
  {
    id: "organizations",
    title: "Managing Organizations",
    icon: Building2,
    category: "Pipeline",
    steps: [
      "Organizations represent companies you work with — clients, prospects, partners, or vendors.",
      "Click '+ New Organization' to create one. Required fields: Name and Type (client, prospect, partner, vendor).",
      "The Organization detail page shows all associated Contacts, Deals, Tickets, Contracts, and Assets.",
      "Set the 'SLA Tier' (standard, premium, enterprise) to determine response time expectations for tickets.",
      "Use the 'Health Score' (0–100) to track account health. Update it during QBRs (Quarterly Business Reviews).",
      "Assign an Account Manager to each organization for ownership and accountability.",
      "The 'Contract Value Monthly' field feeds into Dashboard MRR calculations.",
    ],
    tips: [
      "Always set the 'Primary Contact' — this is who gets notified for account-level communications.",
      "Use Tags to categorize organizations (e.g., 'healthcare', 'manufacturing', 'high-priority').",
    ],
  },
  {
    id: "contacts",
    title: "Managing Contacts",
    icon: Users,
    category: "Pipeline",
    steps: [
      "Contacts are individual people associated with Organizations.",
      "Create contacts manually with '+ New Contact' or import them from the Lead Pipeline.",
      "Link contacts to an Organization using the Organization dropdown — one contact can belong to one organization.",
      "Mark key contacts: 'Is Primary' (main point of contact), 'Is Decision Maker' (signs contracts), 'Is Technical' (handles implementation).",
      "The Lifecycle Stage tracks where they are in your sales process: Lead → MQL → SQL → Opportunity → Customer → Churned.",
      "Use the activity timeline on the contact detail page to log calls, emails, meetings, and notes.",
      "The 'Lead Score' auto-updates based on engagement — higher scores indicate warmer leads.",
    ],
    tips: [
      "Use the 'Preferred Channel' field (email, phone, slack) to remember how each contact likes to communicate.",
      "The 'Last Contacted At' field updates when you log an activity — use this to identify contacts going cold.",
    ],
  },
  {
    id: "deals",
    title: "Deal Pipeline & Kanban",
    icon: Briefcase,
    category: "Pipeline",
    steps: [
      "The Deals module shows your sales pipeline as a Kanban board with drag-and-drop stages.",
      "Default stages: Qualification → Discovery → Proposal → Negotiation → Closed Won / Closed Lost.",
      "Click '+ New Deal' — required fields are Title and Stage. Link it to an Organization and Contact.",
      "Set the Deal Value (total contract value) and MRR (monthly recurring revenue) for accurate forecasting.",
      "The Probability field auto-fills based on the stage but can be manually overridden.",
      "Drag deals between stages on the Kanban board — stage changes are logged in the activity feed automatically.",
      "When a deal is Closed Won, create a Contract from the deal to start service delivery tracking.",
      "For Closed Lost, record the 'Loss Reason' — this data helps improve your win rate over time.",
    ],
    tips: [
      "Use the 'Expected Close Date' to forecast revenue — the Dashboard uses this for pipeline projections.",
      "Deal stages can be customized in Settings → Pipeline Stages (admin only).",
    ],
  },
  {
    id: "tickets",
    title: "Ticket Management (PSA)",
    icon: Ticket,
    category: "Operations",
    steps: [
      "Tickets are your service delivery workhorses — track support requests, projects, incidents, and tasks.",
      "Each ticket gets an auto-generated number (TKT-000001, TKT-000002, etc.) for easy reference.",
      "Create a ticket with '+ New Ticket'. Required: Title, Priority (low/medium/high/critical/emergency), and Organization.",
      "Assign tickets to team members using the 'Assigned To' dropdown. Only active CRM users appear.",
      "Priority determines SLA response/resolution times (configurable in Settings → SLA Targets).",
      "Update ticket status through the lifecycle: Open → In Progress → Waiting on Client → Resolved → Closed.",
      "Add internal notes (visible to team only) or public notes (visible in client portal) to track progress.",
      "Link tickets to Deployments for change management tracking.",
    ],
    tips: [
      "Use the 'Waiting on Client' status to pause SLA timers when you're blocked by client response.",
      "Critical and Emergency tickets should always have an assigned owner within 15 minutes.",
    ],
  },
  {
    id: "time-tracking",
    title: "Time Tracking",
    icon: Clock,
    category: "Operations",
    steps: [
      "Time entries track billable and non-billable hours against tickets, organizations, or general tasks.",
      "Click '+ New Entry' to log time. Select the associated Ticket (optional) and Organization.",
      "Enter duration in hours (e.g., 1.5 for 90 minutes) and add a description of work performed.",
      "Mark entries as 'Billable' or 'Non-Billable' — only billable entries can be converted to invoice line items.",
      "Time entries linked to tickets appear in the ticket's activity timeline for full audit trails.",
      "Use the date filter to view time by day, week, or month for team utilization reports.",
      "Billable time entries can be pulled into Invoices — see the Invoices section for details.",
    ],
    tips: [
      "Log time immediately after completing work — accuracy decreases significantly after 24 hours.",
      "Use 'Non-Billable' for internal meetings, training, and administrative tasks to track true utilization.",
    ],
  },
  {
    id: "contracts",
    title: "Contract Management",
    icon: FileText,
    category: "Operations",
    steps: [
      "Contracts formalize service agreements with organizations. Link them to Deals for full sales-to-delivery tracking.",
      "Create a contract with '+ New Contract'. Required: Title, Organization, Start Date.",
      "Set the contract Type: Managed Services, Project, Retainer, or Subscription.",
      "Enter MRR (Monthly Recurring Revenue) — this drives the Dashboard revenue metrics.",
      "Contract statuses: Draft → Active → Expiring → Expired → Cancelled.",
      "Set 'Auto Renew' and 'Renewal Notice Days' to get alerts before contracts expire.",
      "Add Line Items to detail the services included — each line item has a description, quantity, unit price, and recurring flag.",
      "The total contract value auto-calculates from line items.",
    ],
    tips: [
      "Always set an End Date — open-ended contracts make revenue forecasting impossible.",
      "Use 'Renewal Notice Days' (default 90) to ensure you start renewal conversations early enough.",
    ],
  },
  {
    id: "invoices",
    title: "Invoice Management",
    icon: BarChart3,
    category: "Finance",
    steps: [
      "Invoices track billing for services rendered. Each gets an auto-generated number (INV-000001).",
      "Create invoices manually with '+ New Invoice' or generate them from Contract line items.",
      "Required fields: Organization, Issue Date, Due Date.",
      "Add Line Items for each service or time entry being billed. Line items have: Description, Quantity, Unit Price.",
      "Set Tax Rate (percentage) — tax amount and total auto-calculate.",
      "Invoice lifecycle: Draft → Sent → Viewed → Paid → Overdue → Void.",
      "Click 'Mark as Sent' to update the status and record the sent date.",
      "When payment is received, click 'Mark as Paid' — this updates the amount_paid and paid_at fields.",
    ],
    tips: [
      "Link invoices to Contracts for automated recurring invoice generation.",
      "The 'Balance Due' field (Total - Amount Paid) helps track partial payments.",
    ],
  },
  {
    id: "assets",
    title: "Asset Management",
    icon: Package,
    category: "Operations",
    steps: [
      "Assets track hardware and software deployed at client organizations.",
      "Create assets with '+ New Asset'. Required: Name, Type (workstation, server, network, mobile, printer, software, other), Organization.",
      "Record hardware details: Manufacturer, Model, Serial Number, Asset Tag.",
      "Track OS information (OS Name, OS Version) and network info (IP Address, MAC Address).",
      "Set the Health Status: healthy, warning, critical, unknown — update this from RMM tool data.",
      "Asset Status options: Active, Inactive, Decommissioned, RMA, In Storage.",
      "Link assets to Contacts via 'Assigned To' for ownership tracking.",
      "Record purchase information: Purchase Date, Purchase Price, Warranty Expiry.",
    ],
    tips: [
      "Use the 'RMM Agent ID' field to link assets to your Remote Monitoring tool for automated health updates.",
      "Set warranty expiry dates — approaching expirations should trigger hardware refresh conversations.",
    ],
  },
  {
    id: "deployments",
    title: "Deployment Scheduling",
    icon: Calendar,
    category: "Operations",
    steps: [
      "Deployments manage scheduled changes, installations, and maintenance windows.",
      "Create a deployment with '+ New Deployment'. Required: Title, Organization, Scheduled Date.",
      "Link deployments to Tickets for change management audit trails.",
      "Assign a technician with the 'Assigned To' field — they'll see it in their task list.",
      "Add Checklist Items for step-by-step deployment procedures. Each item can be checked off by the assigned tech.",
      "Deployment statuses: Planned → In Progress → Completed → Cancelled.",
      "Set 'Scheduled Time' for the specific maintenance window start time.",
    ],
    tips: [
      "Always create a rollback plan in the Description field before marking a deployment as 'In Progress'.",
      "Use checklist items as a pre-flight and post-flight verification list.",
    ],
  },
  {
    id: "assessments",
    title: "Assessment Sessions",
    icon: ClipboardCheck,
    category: "Lead Management",
    steps: [
      "Assessment Sessions capture data from the website's Onboarding Assessment flow.",
      "Each session records the prospect's answers across multiple flows: Profile (P0), Security (P1), Cloud (P2), etc.",
      "The detail view shows all answers, computed maturity scores (SecOps, IAM, Cloud, etc.), and recommended tier.",
      "Key metrics: EMS Score (Enterprise Maturity Score), Risk Score, Urgency Score, and Complexity Score.",
      "Use these scores to prioritize outreach — higher urgency and risk scores indicate prospects who need help NOW.",
      "The 'Recommended Tier' (XRO, XMX, XME) maps to your service tier pricing.",
      "Assessment data auto-syncs to HubSpot as custom properties for marketing automation.",
    ],
    tips: [
      "Focus outreach on sessions with status 'completed' and urgency_score > 70 — these are hot leads.",
      "The 'Key Gap Flags' array tells you exactly which pain points to lead with in sales conversations.",
    ],
  },
  {
    id: "bom-quotes",
    title: "BOM Quote Requests",
    icon: ShoppingCart,
    category: "Lead Management",
    steps: [
      "BOM (Bill of Materials) Quotes capture product/solution requests from the website's shopping experience.",
      "Each submission includes the prospect's contact info and a list of selected items with quantities.",
      "View the Items column to see exactly what products/services the prospect is interested in.",
      "Update the Status to track quote progression: New → Reviewing → Quoted → Won → Lost.",
      "Use the contact information to reach out and convert the BOM request into a Deal.",
    ],
    tips: [
      "BOM requests indicate high buying intent — these prospects have already self-selected products.",
      "Create a Deal from BOM requests to track them through your sales pipeline.",
    ],
  },
  {
    id: "careers",
    title: "Career Postings & Applications",
    icon: Megaphone,
    category: "HR",
    steps: [
      "Manage job postings that appear on the public /careers page.",
      "Create postings with '+ New Posting'. Required: Title, Department, Description.",
      "Add Requirements and Nice-to-Haves as bullet-point lists for clear job descriptions.",
      "Toggle 'Is Published' to control visibility on the website — unpublished postings are drafts.",
      "Set Salary Range, Employment Type (Full-time, Part-time, Contract), and Location.",
      "Applications from the careers page appear in the Applications tab with candidate details.",
      "Review applications and update Status: New → Screening → Interview → Offer → Hired → Rejected.",
      "Uploaded resumes are stored in the 'resumes' storage bucket and linked to the application.",
    ],
    tips: [
      "Use the 'Expires At' date to automatically delist old postings.",
      "The Application Email field (default: careers@managekube.com) determines where direct applications go.",
    ],
  },
  {
    id: "audit-log",
    title: "Audit Log (Admin)",
    icon: Shield,
    category: "Administration",
    steps: [
      "The Audit Log records all significant actions in the CRM for security and compliance.",
      "Each entry shows: Who (user), What (action), Where (table), When (timestamp), and the before/after values.",
      "Actions tracked include: Create, Update, Delete across all CRM tables.",
      "Use date filters and search to find specific events — search by user, table name, or record ID.",
      "Audit logs cannot be edited or deleted — they're append-only for compliance integrity.",
      "Admin and Super Admin roles can view audit logs. Other roles cannot access this module.",
    ],
    tips: [
      "Review the audit log weekly to catch any unusual activity patterns.",
      "Export audit data periodically for long-term compliance record-keeping.",
    ],
  },
  {
    id: "settings",
    title: "CRM Settings (Admin)",
    icon: Settings,
    category: "Administration",
    steps: [
      "Settings is restricted to Super Admin and Admin roles.",
      "Team Tab: View all CRM users, their roles, and status. Click '+ Add User' to provision new team members.",
      "To add a user: Enter their email and password, select a role (super_admin, admin, account_manager, technician, dispatcher, billing, portal_user).",
      "SLA Targets Tab: Configure response and resolution time targets per priority level.",
      "Business Hours Tab: Set your operating hours by day of week — SLA calculations respect business hours.",
      "Pipeline Stages Tab: Customize deal stages, set probability percentages, and mark Won/Lost stages.",
      "Users can only log in with email/password — GitHub SSO is not supported for CRM access.",
    ],
    tips: [
      "Start with a few Super Admins during setup, then assign more granular roles as the team grows.",
      "Business hours affect SLA calculations — make sure they match your actual support coverage.",
      "Each role has specific permissions: technicians can update tickets but can't access billing or settings.",
    ],
  },
];

const categories = [...new Set(helpArticles.map(a => a.category))];

export default function CrmHelp() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("dashboard");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = helpArticles.filter(a => {
    const matchesSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.steps.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = !activeCategory || a.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">CRM Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step guides for every module in the ManageKube Unified CRM. Click any topic to expand.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <HelpCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No guides match your search. Try different keywords.</p>
          </div>
        )}
        {filtered.map(article => {
          const isOpen = expandedId === article.id;
          return (
            <div key={article.id} className="border border-border rounded-lg bg-card overflow-hidden">
              <button
                onClick={() => setExpandedId(isOpen ? null : article.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
              >
                <article.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground">{article.title}</span>
                  <span className="ml-2 text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-border">
                  <ol className="space-y-3 mt-3">
                    {article.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  {article.tips && article.tips.length > 0 && (
                    <div className="mt-5 p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">💡 Pro Tips</p>
                      <ul className="space-y-1.5">
                        {article.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
