/** DO NOT TOUCH: v2.0 spec copy (Service_Layer.docx pp.26-27) */
import { ServiceLayerPage } from "@/components/ServiceLayerPage";
export default function BdrKube() {
  return <ServiceLayerPage
    category="Operations & Continuity"
    name="Backup & Disaster Recovery"
    headline="An Untested Backup Is a Hypothesis. Tested Recovery Is an Operational Guarantee."
    narrative={[
      "Ransomware operators validate their business model at the moment of detonation. By that point, they have been present in your environment for weeks. They have mapped your backup infrastructure, assessed whether copies are maintained offline, and determined whether backup agent credentials can be harvested from your domain to encrypt or delete backups before the attack deploys. Most enterprise backup strategies were designed for hardware failure. They were not designed for an adversary who specifically targets backup infrastructure as a prerequisite to their operation.",
      "Recovery assumptions compound this exposure. Backup jobs completing successfully does not validate that data is recoverable at scale, under time pressure, from actual production systems. Recovery time objectives defined in policy documentation frequently bear no relationship to actual recovery performance from backup environments that have not been rehearsed under realistic incident conditions.",
      "2025 context: Ransomware was present in 44% of data breaches and the median attacker dwell time before detonation compressed to 5 days (IBM / Sophos, 2025). Organizations without tested, adversarially-designed backup architectures discover this gap at the moment of detonation when remediation options are most constrained and recovery costs are highest.",
    ]}
    capabilities={[
      "Immutable backup storage backups written to storage that cannot be modified or deleted through compromised credentials or ransomware",
      "Air-gapped and offsite backup copies multiple locations, multiple protection layers, physically or logically isolated from production",
      "Continuous backup integrity monitoring validating that backup jobs completed and backup data is genuinely recoverable",
      "Scheduled recovery testing validating actual RTO/RPO performance tested numbers, not estimated figures",
      "Ransomware detection integration backup snapshots triggered automatically when encryption patterns are detected in production",
      "Application-consistent backups for databases, mail servers, and business-critical systems crash-consistent is insufficient for these workloads",
    ]}
    methodology={[
      { stage: "Hunt / Alert", desc: "Via ransomware detection integration early warning of encryption activity triggering backup protection procedures." },
      { stage: "Remediate", desc: "Recovery execution restoring systems from verified, clean backups following a confirmed incident." },
      { stage: "Document", desc: "Recovery timeline documentation, data loss assessment, and insurance / regulatory evidence packaging." },
      { stage: "Close", desc: "Recovered environment verification, lessons learned, and backup strategy improvement recommendations." },
    ]}
    similar={[
      { label: "Configuration Drift Detection & Correction", href: "/service-layer/cfdr" },
      { label: "Core Infrastructure Orchestration", href: "/service-layer/cio" },
    ]}
  />;
}
