/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.20-21) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function DdrKube() {
  return <ServiceLayerPage
    category="Security Detection & Response"
    name="Data Exfiltration Detection & Response"
    headline="Algorithmic Detection of Unauthorized Data Movement Before the Data Leaves."
    narrative={[
      "Data exfiltration is the objective of most targeted attacks. Every prior stage initial compromise, credential abuse, lateral movement is preparation for this moment. In most environments, exfiltration proceeds silently over weeks or months, disguised as legitimate outbound traffic. Traditional data loss prevention tools inspect content against defined classifications. They do not analyze behavior. They cannot detect an adversary staging 50 GB across cloud storage over three weeks prior to a single exfiltration burst. They cannot detect cross-tenant cloud transfers. They do not observe channels never brought into their rule scope.",
      "Data Exfiltration Detection & Response monitors for the behavioral patterns of data staging, aggregation, and movement across every channel and protocol using algorithmic detection that finds what content inspection consistently misses.",
    ]}
    capabilities={[
      "Data staging detection algorithmic identification of unusual file aggregation and compression patterns preceding exfiltration",
      "Outbound traffic volume anomaly detection across network, cloud, and application channels",
      "Insider threat behavioral analytics detecting privileged users accessing and moving data outside established patterns",
      "Cloud storage exfiltration monitoring unauthorized data movement between cloud services, across tenants, and to personal accounts",
      "Email and collaboration platform exfiltration detection via behavioral analysis, not content inspection",
      "Cross-environment correlation staging events in cloud storage followed by outbound traffic spikes surface as a single incident",
    ]}
    capabilitiesHeading="Core Capabilities"
    whatYouReceive={[
      "Why algorithmic detection changes the outcome: a finance user accessing 500 files they have never previously accessed • a cloud storage bucket beginning replication to an external account • outbound traffic patterns with no known business process correlation • API call volumes from service accounts that have never operated at that scale. These patterns are algorithmically detectable without data classification, without rules, and without content inspection they require only continuous behavioral baselines.",
    ]}
    methodology={[
      { stage: "Hunt", desc: "Continuous algorithmic analysis for staging patterns and unusual access across all data stores." },
      { stage: "Identify", desc: "Exfiltration signal validation across channels: network, cloud storage, email, collaboration platforms." },
      { stage: "Alert", desc: "Priority notification with data type, estimated volume, destination context, and behavioral detail." },
      { stage: "Triage", desc: "Analyst review and determination of internal versus external threat actor." },
      { stage: "Diagnose", desc: "Full exfiltration chain reconstruction including staging locations and destination identification." },
      { stage: "Remediate", desc: "Channel blocking, account suspension, data quarantine, staging environment lockdown, credential rotation." },
      { stage: "Document", desc: "Evidence packaging for breach notification, regulatory reporting, legal proceedings, and insurance claims." },
      { stage: "Close", desc: "Verified containment, post-incident analysis, and prevention recommendations." },
    ]}
    similar={[
      { label: "Identity Threat Detection & Response", href: "/service-layer/itdr" },
      { label: "Network Threat Detection & Response", href: "/service-layer/ndr" },
      { label: "Cloud Detection & Response", href: "/service-layer/cdr" },
    ]}
  />;
}
