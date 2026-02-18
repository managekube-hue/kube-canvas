import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import {
  Shield, Fingerprint, Network, Cloud, Globe, Square,
  Database, Bug, Headphones, Radar, Settings2, HardDrive,
  Smartphone, Activity, Scale, Briefcase, Search,
  ChevronDown, ChevronRight, Folder, FolderOpen, FileText, File
} from "lucide-react";

// DR Module data
const DR_MODULES = [
  { id: "EDR", full: "Endpoint Detection & Response", icon: Shield, color: "#3b82f6", href: "/uidr/docs/edr", code: "K-EDR-01" },
  { id: "ITDR", full: "Identity Threat Detection & Response", icon: Fingerprint, color: "#a855f7", href: "/uidr/docs/itdr", code: "K-ITDR-02" },
  { id: "NDR", full: "Network Detection & Response", icon: Network, color: "#22c55e", href: "/uidr/docs/ndr", code: "K-NDR-03" },
  { id: "CDR", full: "Cloud Detection & Response", icon: Cloud, color: "#06b6d4", href: "/uidr/docs/cdr", code: "K-CDR-04" },
  { id: "SDR", full: "SaaS Detection & Response", icon: Globe, color: "#f59e0b", href: "/uidr/docs/sdr", code: "K-SDR-05" },
  { id: "ADR", full: "Application Detection & Response", icon: Square, color: "#ef4444", href: "/uidr/docs/adr", code: "K-ADR-06" },
  { id: "DDR", full: "Data Detection & Response", icon: Database, color: "#8b5cf6", href: "/uidr/docs/ddr", code: "K-DDR-07" },
  { id: "VDR", full: "Vulnerability Detection & Response", icon: Bug, color: "#f97316", href: "/uidr/docs/vdr", code: "K-VDR-08" },
  { id: "MDR", full: "Managed Detection & Response", icon: Headphones, color: "#64748b", href: "/uidr/docs/mdr", code: "K-MDR-09" },
];
const TI_MODULES = [
  { id: "TI", full: "Threat Intelligence", icon: Radar, color: "#fb923c", href: "/uidr/docs/ti", code: "K-TI-10" },
];
const OPS_MODULES = [
  { id: "CFDR", full: "Configuration Drift Detection & Response", icon: Settings2, color: "#22d3ee", href: "/uidr/docs/cfdr", code: "K-CFDR-11" },
  { id: "BDR", full: "Backup & Disaster Recovery", icon: HardDrive, color: "#34d399", href: "/uidr/docs/bdr", code: "K-BDR-12" },
  { id: "NPM", full: "Network Performance Management", icon: Radar, color: "#60a5fa", href: "/uidr/docs/npm", code: "K-NPM-13" },
  { id: "UEM", full: "Unified Endpoint Management", icon: Settings2, color: "#a3e635", href: "/uidr/docs/uem", code: "K-UEM-14" },
  { id: "MDM", full: "Mobile Device Management", icon: Smartphone, color: "#fb923c", href: "/uidr/docs/mdm", code: "K-MDM-15" },
  { id: "APM", full: "Application Performance Management", icon: Activity, color: "#4ade80", href: "/uidr/docs/apm", code: "K-APM-16" },
];
const GOV_MODULES = [
  { id: "GRC", full: "Governance, Risk & Compliance", icon: Scale, color: "#fbbf24", href: "/uidr/docs/grc", code: "K-GRC-17" },
  { id: "PSA", full: "Professional Services Automation", icon: Briefcase, color: "#f472b6", href: "/uidr/docs/psa", code: "K-PSA-18" },
];

const INTEGRATION_TABLE = [
  { strategy: "Direct Import", license: "MIT / Apache 2.0 / BSD", approach: "Add to go.mod or Cargo.toml" },
  { strategy: "Vendor Data", license: "GPL 2.0 (rules/data)", approach: "Vendor YAML/JSON into /vendor" },
  { strategy: "Subprocess", license: "AGPL 3.0", approach: "Execute as child process" },
  { strategy: "REST API Pull", license: "Public API / ToS", approach: "Scheduled HTTP GET, cache in ClickHouse" },
  { strategy: "FFI Binding", license: "LGPL 3.0", approach: "Static/dynamic link via Rust bindgen" },
];

const SIDEBAR_GROUPS = [
  {
    label: "DETECTION & RESPONSE",
    modules: DR_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
  {
    label: "INTELLIGENCE",
    modules: TI_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
  {
    label: "OPERATIONS",
    modules: OPS_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
  {
    label: "GOVERNANCE & BUSINESS",
    modules: GOV_MODULES.map(m => ({ id: m.id, code: m.code, icon: m.icon, color: m.color, href: m.href })),
  },
];

// Full K-DOCS tree
type TreeNode = { name: string; type: "file" | "dir"; note?: string; children?: TreeNode[] };

const KDOCS_TREE: TreeNode[] = [
  {
    name: "K-CORE-01_INFRASTRUCTURE", type: "dir", children: [
      { name: "K-HW-R630_HARDWARE", type: "dir", children: [
        { name: "K-HW-001_Node1_Config.md", type: "file" },
        { name: "K-HW-002_Node2_Config.md", type: "file" },
        { name: "K-HW-003_Node3_Config.md", type: "file" },
        { name: "K-HW-004_iDRAC9_Network.md", type: "file" },
        { name: "K-HW-005_RAM_Expansion.md", type: "file" },
      ]},
      { name: "K-NET-NETWORKING", type: "dir", children: [
        { name: "K-NET-001_10G_SFP_Config.md", type: "file" },
        { name: "K-NET-002_Corosync_Heartbeat.md", type: "file" },
        { name: "K-NET-003_Virtual_IP_Failover.md", type: "file" },
        { name: "K-NET-004_HAProxy_Keepalived.md", type: "file" },
      ]},
      { name: "K-HV-PROXMOX_HYPERVISOR", type: "dir", children: [
        { name: "K-HV-001_Cluster_Bootstrap.md", type: "file" },
        { name: "K-HV-002_Ceph_Storage.md", type: "file" },
        { name: "K-HV-003_Chrony_PTP_TimeSync.md", type: "file" },
        { name: "K-HV-VM_TEMPLATES", type: "dir", children: [
          { name: "K-HV-VM-001_Go_API_CloudInit.md", type: "file" },
          { name: "K-HV-VM-002_ClickHouse_StatefulSet.md", type: "file" },
          { name: "K-HV-VM-003_PostgreSQL_RLS.md", type: "file" },
          { name: "K-HV-VM-004_Ollama_LLM.md", type: "file" },
          { name: "K-HV-VM-005_vLLM_GPU_Node.md", type: "file" },
        ]},
        { name: "K-HV-LXC_CONTAINERS", type: "dir", children: [
          { name: "K-HV-LXC-001_Gitea.md", type: "file" },
          { name: "K-HV-LXC-002_n8n.md", type: "file" },
          { name: "K-HV-LXC-003_Caddy.md", type: "file" },
          { name: "K-HV-LXC-004_Woodpecker_CI.md", type: "file" },
        ]},
      ]},
      { name: "K-K8S-KUBERNETES", type: "dir", children: [
        { name: "K-K8S-001_ClickHouse_StatefulSet.yaml", type: "file" },
        { name: "K-K8S-002_NATS_StatefulSet.yaml", type: "file" },
        { name: "K-K8S-003_PostgreSQL_StatefulSet.yaml", type: "file" },
        { name: "K-K8S-004_API_Deployment.yaml", type: "file" },
        { name: "K-K8S-MESH_SERVICE_MESH", type: "dir", children: [
          { name: "K-K8S-MESH-001_Istio_ServiceMesh.yaml", type: "file" },
          { name: "K-K8S-MESH-002_Linkerd_Config.yaml", type: "file" },
          { name: "K-K8S-MESH-003_Cilium_CNI.yaml", type: "file" },
          { name: "K-K8S-MESH-004_Hubble_ServiceMap.yaml", type: "file" },
          { name: "K-K8S-MESH-005_CertManager_Vault.yaml", type: "file" },
          { name: "K-K8S-MESH-006_ExternalSecrets_Operator.yaml", type: "file" },
        ]},
        { name: "K-K8S-GITOPS", type: "dir", children: [
          { name: "K-K8S-GO-001_ArgoCD_Application.yaml", type: "file" },
          { name: "K-K8S-GO-002_Flux_GitRepository.yaml", type: "file" },
          { name: "K-K8S-GO-003_Helm_Values.yaml", type: "file" },
          { name: "K-K8S-GO-004_Kustomize_Overlays.yaml", type: "file" },
          { name: "K-K8S-GO-005_Gatekeeper_OPA.yaml", type: "file" },
        ]},
        { name: "K-K8S-OBS_OBSERVABILITY", type: "dir", children: [
          { name: "K-K8S-OBS-001_Prometheus_Operator.yaml", type: "file" },
          { name: "K-K8S-OBS-002_Thanos_Sidecar.yaml", type: "file" },
          { name: "K-K8S-OBS-003_Grafana_Deployment.yaml", type: "file" },
          { name: "K-K8S-OBS-004_Loki_Stack.yaml", type: "file" },
          { name: "K-K8S-OBS-005_Tempo_Tracing.yaml", type: "file" },
        ]},
        { name: "K-K8S-POLICY", type: "dir", children: [
          { name: "K-K8S-POL-001_SealedSecrets_Controller.yaml", type: "file" },
          { name: "K-K8S-POL-002_NetworkPolicy_Defaults.yaml", type: "file" },
          { name: "K-K8S-POL-003_ResourceQuota.yaml", type: "file" },
        ]},
      ]},
      { name: "K-DL-DATA_LAKEHOUSE", type: "dir", children: [
        { name: "K-DL-CLICKHOUSE", type: "dir", children: [
          { name: "K-DL-CH-001_Cluster_Config.md", type: "file" },
          { name: "K-DL-CH-002_OCSF_Schema.sql", type: "file" },
          { name: "K-DL-CH-003_TTL_Cold_Storage.md", type: "file" },
          { name: "K-DL-CH-004_Agent_Decision_History.sql", type: "file" },
          { name: "K-DL-CH-005_Arrow_Bulk_Insert.md", type: "file" },
        ]},
        { name: "K-DL-POSTGRES", type: "dir", children: [
          { name: "K-DL-PG-001_UAR_Asset_Table.sql", type: "file" },
          { name: "K-DL-PG-002_RLS_Policies.sql", type: "file" },
          { name: "K-DL-PG-003_Contract_Rate_Tables.sql", type: "file" },
          { name: "K-DL-PG-004_OSCAL_Ingestion.sql", type: "file" },
          { name: "K-DL-PG-005_Atlas_Schema_HCL.hcl", type: "file" },
        ]},
        { name: "K-DL-MIGRATIONS", type: "dir", children: [
          { name: "K-DL-MIG-001_golang_migrate_setup.md", type: "file" },
          { name: "K-DL-MIG-002_liquibase_k8s.yaml", type: "file" },
          { name: "K-DL-MIG-003_atlas_ci_sync.md", type: "file" },
        ]},
        { name: "K-DL-DUCKDB", type: "dir", children: [
          { name: "K-DL-DUCK-001_embedded_analytics.md", type: "file" },
          { name: "K-DL-DUCK-002_ml_feature_compute.sql", type: "file" },
        ]},
      ]},
      { name: "K-MB-MESSAGE_BUS", type: "dir", children: [
        { name: "K-MB-001_NATS_Cluster.yaml", type: "file" },
        { name: "K-MB-002_JetStream_Config.md", type: "file" },
        { name: "K-MB-003_mTLS_Cert_Rotation.md", type: "file" },
        { name: "K-MB-004_ZeroMQ_IPC.md", type: "file" },
        { name: "K-MB-SUBJECT_MAPPING", type: "dir", children: [
          { name: "K-MB-SUB-001_edr.process.v1.md", type: "file" },
          { name: "K-MB-SUB-002_edr.file.v1.md", type: "file" },
          { name: "K-MB-SUB-003_ndr.flow.v1.md", type: "file" },
          { name: "K-MB-SUB-004_ndr.beacon.v1.md", type: "file" },
          { name: "K-MB-SUB-005_itdr.auth.v1.md", type: "file" },
          { name: "K-MB-SUB-006_vdr.vuln.v1.md", type: "file" },
          { name: "K-MB-SUB-007_grc.drift.v1.md", type: "file" },
          { name: "K-MB-SUB-008_svc.ticket.v1.md", type: "file" },
          { name: "K-MB-SUB-009_billing.usage.v1.md", type: "file" },
          { name: "K-MB-SUB-010_health.score.v1.md", type: "file" },
          { name: "K-MB-SUB-011_ti.ioc.v1.md", type: "file" },
          { name: "K-MB-SUB-012_comm.alert.v1.md", type: "file" },
          { name: "K-MB-SUB-013_security.alert.v1.md", type: "file" },
          { name: "K-MB-SUB-014_remediation.task.v1.md", type: "file" },
          { name: "K-MB-SUB-015_asset.provisioned.v1.md", type: "file" },
        ]},
      ]},
      { name: "K-SEC-SECURITY_ROOT", type: "dir", children: [
        { name: "K-SEC-001_HashiCorp_Vault.md", type: "file" },
        { name: "K-SEC-002_TPM_Root_of_Trust.md", type: "file" },
        { name: "K-SEC-003_Blake3_Fingerprint.go", type: "file" },
        { name: "K-SEC-004_CA_Setup.md", type: "file" },
        { name: "K-SEC-005_Vault_Policies.hcl", type: "file" },
        { name: "K-SEC-006_Vault_K8s_Auth.go", type: "file" },
      ]},
    ],
  },
  {
    name: "K-VENDOR-00_DETECTION_ASSETS", type: "dir", note: "§21 vendor dir, 120k+ assets", children: [
      { name: "K-VENDOR-000_INDEX.md", type: "file", note: "master index" },
      { name: "K-VENDOR-SIGMA", type: "dir", note: "Apache 2.0 — embed freely", children: [
        { name: "K-VENDOR-SIG-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-SIG-002_windows_builtin.md", type: "file" },
        { name: "K-VENDOR-SIG-003_cloud_rules.md", type: "file" },
        { name: "K-VENDOR-SIG-004_saas_rules.md", type: "file" },
        { name: "K-VENDOR-SIG-005_hunting_rules.md", type: "file" },
        { name: "K-VENDOR-SIG-006_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-SURICATA", type: "dir", note: "GPL 2.0 — data files only", children: [
        { name: "K-VENDOR-SUR-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-SUR-002_emerging_malware.md", type: "file" },
        { name: "K-VENDOR-SUR-003_emerging_c2.md", type: "file" },
        { name: "K-VENDOR-SUR-004_emerging_web.md", type: "file" },
        { name: "K-VENDOR-SUR-005_emerging_data.md", type: "file" },
        { name: "K-VENDOR-SUR-006_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-YARA", type: "dir", note: "BSD-3 / mixed — data files", children: [
        { name: "K-VENDOR-YAR-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-YAR-002_malware_sigs.md", type: "file" },
        { name: "K-VENDOR-YAR-003_pii_rules.md", type: "file" },
        { name: "K-VENDOR-YAR-004_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-MISP", type: "dir", note: "CC0 — embed freely", children: [
        { name: "K-VENDOR-MISP-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-MISP-002_taxonomies.md", type: "file" },
        { name: "K-VENDOR-MISP-003_galaxies.md", type: "file" },
        { name: "K-VENDOR-MISP-004_warninglists.md", type: "file" },
        { name: "K-VENDOR-MISP-005_objects.md", type: "file" },
        { name: "K-VENDOR-MISP-006_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-MITRE", type: "dir", note: "CC BY 4.0 — attribute", children: [
        { name: "K-VENDOR-MIT-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-MIT-002_enterprise_attack.md", type: "file" },
        { name: "K-VENDOR-MIT-003_cwe_stix2.md", type: "file" },
        { name: "K-VENDOR-MIT-004_capec_stix2.md", type: "file" },
        { name: "K-VENDOR-MIT-005_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-OSCAL", type: "dir", note: "Public Domain — free", children: [
        { name: "K-VENDOR-OSC-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-OSC-002_nist_800_53.md", type: "file" },
        { name: "K-VENDOR-OSC-003_pci_dss.md", type: "file" },
        { name: "K-VENDOR-OSC-004_iso_27001.md", type: "file" },
        { name: "K-VENDOR-OSC-005_soc2.md", type: "file" },
      ]},
      { name: "K-VENDOR-NUCLEI", type: "dir", note: "MIT — copy freely", children: [
        { name: "K-VENDOR-NUC-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-NUC-002_cve_templates.md", type: "file" },
        { name: "K-VENDOR-NUC-003_cloud_templates.md", type: "file" },
        { name: "K-VENDOR-NUC-004_http_api_templates.md", type: "file" },
        { name: "K-VENDOR-NUC-005_saas_templates.md", type: "file" },
        { name: "K-VENDOR-NUC-006_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-VELOCIRAPTOR", type: "dir", note: "AGPL 3.0 — data files only", children: [
        { name: "K-VENDOR-VEL-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-VEL-002_threat_hunting.md", type: "file" },
        { name: "K-VENDOR-VEL-003_forensic_artifacts.md", type: "file" },
        { name: "K-VENDOR-VEL-004_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-CORTEX", type: "dir", note: "AGPL 3.0 — subprocess only", children: [
        { name: "K-VENDOR-COR-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-COR-002_analyzers.md", type: "file" },
        { name: "K-VENDOR-COR-003_responders.md", type: "file" },
        { name: "K-VENDOR-COR-004_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-FALCO", type: "dir", note: "Apache 2.0 — embed freely", children: [
        { name: "K-VENDOR-FAL-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-FAL-002_falco_rules.md", type: "file" },
        { name: "K-VENDOR-FAL-003_k8s_rules.md", type: "file" },
      ]},
      { name: "K-VENDOR-BLOODHOUND", type: "dir", note: "Apache 2.0 — embed freely", children: [
        { name: "K-VENDOR-BH-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-BH-002_windows_cypher.md", type: "file" },
        { name: "K-VENDOR-BH-003_azure_cypher.md", type: "file" },
      ]},
      { name: "K-VENDOR-OPENSCAP", type: "dir", note: "CC — data use", children: [
        { name: "K-VENDOR-OSP-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-OSP-002_cis_benchmarks.md", type: "file" },
        { name: "K-VENDOR-OSP-003_stig_content.md", type: "file" },
      ]},
      { name: "K-VENDOR-WAZUH", type: "dir", note: "GPL 2.0 — data files only", children: [
        { name: "K-VENDOR-WAZ-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-WAZ-002_process_rules.md", type: "file" },
        { name: "K-VENDOR-WAZ-003_ad_rules.md", type: "file" },
        { name: "K-VENDOR-WAZ-004_sca_rules.md", type: "file" },
        { name: "K-VENDOR-WAZ-005_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-ZEEK", type: "dir", note: "BSD-3 — copy scripts as data", children: [
        { name: "K-VENDOR-ZEK-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-ZEK-002_base_protocols.md", type: "file" },
        { name: "K-VENDOR-ZEK-003_intel_framework.md", type: "file" },
        { name: "K-VENDOR-ZEK-004_http_scripts.md", type: "file" },
        { name: "K-VENDOR-ZEK-005_ja3_tls.md", type: "file" },
      ]},
      { name: "K-VENDOR-OSQUERY", type: "dir", note: "Apache 2.0 — copy freely", children: [
        { name: "K-VENDOR-OSQ-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-OSQ-002_incident_response.md", type: "file" },
        { name: "K-VENDOR-OSQ-003_fim_packs.md", type: "file" },
        { name: "K-VENDOR-OSQ-004_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-THEHIVE", type: "dir", note: "AGPL 3.0 — schema as data", children: [
        { name: "K-VENDOR-THV-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-THV-002_case_schema.md", type: "file" },
        { name: "K-VENDOR-THV-003_alert_schema.md", type: "file" },
        { name: "K-VENDOR-THV-004_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-SHUFFLE", type: "dir", note: "GPL 3.0 — config as data", children: [
        { name: "K-VENDOR-SHF-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-SHF-002_soar_workflows.md", type: "file" },
        { name: "K-VENDOR-SHF-003_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-RUDDER", type: "dir", note: "GPL 3.0 — techniques as data", children: [
        { name: "K-VENDOR-RUD-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-RUD-002_techniques.md", type: "file" },
        { name: "K-VENDOR-RUD-003_license_boundary.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-XRO-02_SUPER_AGENT", type: "dir", children: [
      { name: "K-XRO-CS_CORESEC", type: "dir", children: [
        { name: "K-XRO-CS-001_Cargo.toml", type: "file" },
        { name: "K-XRO-CS-SRC", type: "dir", children: [
          { name: "K-XRO-CS-001_main.rs", type: "file" },
          { name: "K-XRO-CS-EBPF", type: "dir", children: [
            { name: "K-XRO-CS-EBPF-001_execve_hook.rs", type: "file" },
            { name: "K-XRO-CS-EBPF-002_openat2_hook.rs", type: "file" },
            { name: "K-XRO-CS-EBPF-003_map_pressure.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-FORENSIC", type: "dir", children: [
            { name: "K-XRO-CS-FR-001_memory_snapshot.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-GOVERNOR", type: "dir", children: [
            { name: "K-XRO-CS-GV-001_token_bucket.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-SIGMA", type: "dir", children: [
            { name: "K-XRO-CS-SIG-001_sigma_evaluator.rs", type: "file" },
            { name: "K-XRO-CS-SIG-002_ocsf_event_bridge.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-ML", type: "dir", children: [
            { name: "K-XRO-CS-ML-001_candle_inference.rs", type: "file" },
            { name: "K-XRO-CS-ML-002_tinyllama_loader.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-YARA", type: "dir", note: "YARA-X malware scanner", children: [
            { name: "K-XRO-CS-YAR-001_yara_compiler.rs", type: "file" },
            { name: "K-XRO-CS-YAR-002_malware_scanner.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-FIM", type: "dir", note: "File Integrity Monitor", children: [
            { name: "K-XRO-CS-FIM-001_inotify_watcher.rs", type: "file" },
            { name: "K-XRO-CS-FIM-002_blake3_baseline.rs", type: "file" },
          ]},
        ]},
        { name: "K-XRO-CS-002_eBPF_Compatibility.md", type: "file" },
      ]},
      { name: "K-XRO-NG_NETGUARD", type: "dir", children: [
        { name: "K-XRO-NG-001_Cargo.toml", type: "file" },
        { name: "K-XRO-NG-SRC", type: "dir", children: [
          { name: "K-XRO-NG-001_main.rs", type: "file" },
          { name: "K-XRO-NG-PCAP", type: "dir", children: [
            { name: "K-XRO-NG-PCAP-001_flow_analyzer.rs", type: "file" },
            { name: "K-XRO-NG-PCAP-002_tls_sni.rs", type: "file" },
            { name: "K-XRO-NG-PCAP-003_af_packet_ring.rs", type: "file" },
            { name: "K-XRO-NG-PCAP-004_dpdk_bypass.rs", type: "file" },
          ]},
          { name: "K-XRO-NG-DPI", type: "dir", children: [
            { name: "K-XRO-NG-DPI-001_ndpi_ffi.rs", type: "file" },
            { name: "K-XRO-NG-DPI-002_l7_classifier.rs", type: "file" },
          ]},
          { name: "K-XRO-NG-RITA", type: "dir", note: "RITA beacon/flow/DNS algos", children: [
            { name: "K-XRO-NG-RITA-001_beacon_detector.go", type: "file" },
            { name: "K-XRO-NG-RITA-002_dns_tunnel.go", type: "file" },
            { name: "K-XRO-NG-RITA-003_exfil_detector.go", type: "file" },
          ]},
          { name: "K-XRO-NG-IDS", type: "dir", note: "Suricata rule loader", children: [
            { name: "K-XRO-NG-IDS-001_rule_loader.rs", type: "file" },
            { name: "K-XRO-NG-IDS-002_alert_publisher.rs", type: "file" },
          ]},
          { name: "K-XRO-NG-TI", type: "dir", children: [
            { name: "K-XRO-NG-TI-001_ipsum_lookup.rs", type: "file" },
          ]},
        ]},
        { name: "K-XRO-NG-002_10G_Validation.md", type: "file" },
      ]},
      { name: "K-XRO-PT_PERFTRACE", type: "dir", children: [
        { name: "K-XRO-PT-001_Cargo.toml", type: "file" },
        { name: "K-XRO-PT-SRC", type: "dir", children: [
          { name: "K-XRO-PT-001_main.rs", type: "file" },
          { name: "K-XRO-PT-002_perf_event_open.rs", type: "file" },
          { name: "K-XRO-PT-003_prometheus.rs", type: "file" },
          { name: "K-XRO-PT-004_otel_collector.rs", type: "file" },
          { name: "K-XRO-PT-005_sysinfo_host_metrics.rs", type: "file" },
        ]},
        { name: "K-XRO-PT-006_Baseline_Schema.json", type: "file" },
      ]},
      { name: "K-XRO-WD_WATCHDOG", type: "dir", children: [
        { name: "K-XRO-WD-001_agent_orchestrator.rs", type: "file" },
        { name: "K-XRO-WD-002_zstd_delta.go", type: "file" },
        { name: "K-XRO-WD-003_manifest_signer.go", type: "file" },
        { name: "K-XRO-WD-004_go_tuf_updater.go", type: "file" },
      ]},
      { name: "K-XRO-PV_PROVISIONING", type: "dir", children: [
        { name: "K-XRO-PV-001_registration_handler.go", type: "file" },
        { name: "K-XRO-PV-002_install_script_gen.go", type: "file" },
        { name: "K-XRO-PV-003_blake3_fingerprinter.go", type: "file" },
      ]},
      { name: "K-XRO-SD_SIDECARS", type: "dir", children: [
        { name: "K-XRO-SD-001_rustdesk_remote.md", type: "file" },
        { name: "K-XRO-SD-002_tetragon_ebpf.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-KAI-03_ORCHESTRATION", type: "dir", children: [
      { name: "K-KAI-CP_CREWAI_PERSONAS", type: "dir", children: [
        { name: "K-KAI-TRIAGE", type: "dir", children: [
          { name: "K-KAI-TR-001_triage_agent.py", type: "file" },
          { name: "K-KAI-TR-002_llama3_reasoning.py", type: "file" },
          { name: "K-KAI-TR-003_ocsf_analyzer.py", type: "file" },
          { name: "K-KAI-TR-004_kiss_calculator.py", type: "file" },
        ]},
        { name: "K-KAI-HOUSE", type: "dir", children: [
          { name: "K-KAI-HS-001_housekeeper.py", type: "file" },
          { name: "K-KAI-HS-002_ansible_runner.py", type: "file" },
          { name: "K-KAI-HS-003_criticality_check.py", type: "file" },
          { name: "K-KAI-HS-004_rollback.py", type: "file" },
        ]},
        { name: "K-KAI-BILL", type: "dir", children: [
          { name: "K-KAI-BL-001_billing_clerk.py", type: "file" },
          { name: "K-KAI-BL-002_clickhouse_audit.py", type: "file" },
          { name: "K-KAI-BL-003_hle_calculator.py", type: "file" },
          { name: "K-KAI-BL-004_invoice_renderer.py", type: "file" },
        ]},
        { name: "K-KAI-COMM", type: "dir", children: [
          { name: "K-KAI-CM-001_comm_agent.py", type: "file" },
          { name: "K-KAI-CM-002_vapi_phone.py", type: "file" },
          { name: "K-KAI-CM-003_twilio_sms.py", type: "file" },
        ]},
        { name: "K-KAI-SENTINEL", type: "dir", children: [
          { name: "K-KAI-SEN-001_health_score_publisher.py", type: "file" },
          { name: "K-KAI-SEN-002_churn_risk_model.py", type: "file" },
          { name: "K-KAI-SEN-003_hibp_credential_score.py", type: "file" },
        ]},
        { name: "K-KAI-FORESIGHT", type: "dir", children: [
          { name: "K-KAI-FS-001_lstm_baseline.py", type: "file" },
          { name: "K-KAI-FS-002_epss_enrichment.py", type: "file" },
          { name: "K-KAI-FS-003_hikari_trainer.py", type: "file" },
        ]},
        { name: "K-KAI-KEEPER", type: "dir", children: [
          { name: "K-KAI-KP-001_remediation_planner.py", type: "file" },
          { name: "K-KAI-KP-002_cortex_subprocess.py", type: "file" },
          { name: "K-KAI-KP-003_vault_secret_fetcher.py", type: "file" },
        ]},
        { name: "K-KAI-ANALYST", type: "dir", children: [
          { name: "K-KAI-AN-001_cortex_analyzer_chain.py", type: "file" },
          { name: "K-KAI-AN-002_observable_enrichment.py", type: "file" },
        ]},
        { name: "K-KAI-HUNTER", type: "dir", children: [
          { name: "K-KAI-HU-001_velociraptor_artifacts.py", type: "file" },
          { name: "K-KAI-HU-002_sigma_hunting_runner.py", type: "file" },
        ]},
        { name: "K-KAI-INVEST", type: "dir", children: [
          { name: "K-KAI-IV-001_misp_galaxy_query.py", type: "file" },
          { name: "K-KAI-IV-002_graph_investigation.py", type: "file" },
        ]},
        { name: "K-KAI-SIMULATE", type: "dir", note: "LTV / churn / pricing models", children: [
          { name: "K-KAI-SIM-001_ltv_predictor.py", type: "file" },
          { name: "K-KAI-SIM-002_churn_simulator.py", type: "file" },
          { name: "K-KAI-SIM-003_dynamic_pricing.py", type: "file" },
        ]},
        { name: "K-KAI-RISK", type: "dir", note: "PyFair / EPSS risk quant", children: [
          { name: "K-KAI-RISK-001_pyfair_model.py", type: "file" },
          { name: "K-KAI-RISK-002_epss_scorer.py", type: "file" },
          { name: "K-KAI-RISK-003_ssvc_decision.py", type: "file" },
        ]},
        { name: "K-KAI-DEPLOY", type: "dir", note: "SaltStack/Ansible deploy persona", children: [
          { name: "K-KAI-DEP-001_deploy_agent.py", type: "file" },
          { name: "K-KAI-DEP-002_saltstack_client.py", type: "file" },
          { name: "K-KAI-DEP-003_fleet_rollout.py", type: "file" },
        ]},
      ]},
      { name: "K-KAI-WF_WORKFLOW", type: "dir", children: [
        { name: "K-KAI-WF-n8n", type: "dir", children: [
          { name: "K-KAI-WF-n8n-001_security_triage.json", type: "file" },
          { name: "K-KAI-WF-n8n-002_drift_housekeeper.json", type: "file" },
          { name: "K-KAI-WF-n8n-003_heartbeat_billing.json", type: "file" },
        ]},
        { name: "K-KAI-WF-TEMPORAL", type: "dir", children: [
          { name: "K-KAI-WF-TEMP-001_patch_workflow.go", type: "file" },
          { name: "K-KAI-WF-TEMP-002_retry_state.go", type: "file" },
          { name: "K-KAI-WF-TEMP-003_celery_tasks.py", type: "file" },
          { name: "K-KAI-WF-TEMP-004_flower_monitor.py", type: "file" },
          { name: "K-KAI-WF-TEMP-005_dramatiq_worker.py", type: "file" },
          { name: "K-KAI-WF-TEMP-006_huey_scheduler.py", type: "file" },
        ]},
      ]},
      { name: "K-KAI-GD_GUARDRAILS", type: "dir", children: [
        { name: "K-KAI-GD-001_human_mfa.go", type: "file" },
        { name: "K-KAI-GD-002_action_queue.sql", type: "file" },
        { name: "K-KAI-GD-003_criticality_5.py", type: "file" },
        { name: "K-KAI-GD-004_prompt_injection.py", type: "file" },
      ]},
      { name: "K-KAI-RAG", type: "dir", children: [
        { name: "K-KAI-RAG-001_vector_search.sql", type: "file" },
        { name: "K-KAI-RAG-002_oscal_embeddings.py", type: "file" },
        { name: "K-KAI-RAG-003_ciso_assistant.py", type: "file" },
        { name: "K-KAI-RAG-004_cohere_embeddings.py", type: "file" },
      ]},
      { name: "K-KAI-AUDIT", type: "dir", children: [
        { name: "K-KAI-AUD-001_decision_history.sql", type: "file" },
        { name: "K-KAI-AUD-002_merkle_signer.go", type: "file" },
      ]},
      { name: "K-KAI-ML", type: "dir", children: [
        { name: "K-KAI-ML-001_tensorboard_logger.py", type: "file" },
        { name: "K-KAI-ML-002_clearml_experiment.py", type: "file" },
        { name: "K-KAI-ML-003_pyspark_distributed.py", type: "file" },
        { name: "K-KAI-ML-004_openai_fallback.py", type: "file" },
        { name: "K-KAI-ML-005_anthropic_long_context.py", type: "file" },
        { name: "K-KAI-ML-006_cohere_embeddings.py", type: "file" },
        { name: "K-KAI-ML-007_hikari_preprocessor.py", type: "file" },
        { name: "K-KAI-ML-008_ember_xgboost.py", type: "file" },
        { name: "K-KAI-ML-009_unswnb15_random_forest.py", type: "file" },
        { name: "K-KAI-ML-010_mordor_lstm_baseline.py", type: "file" },
        { name: "K-KAI-ML-011_vllm_server.py", type: "file", note: "vLLM serving config" },
        { name: "K-KAI-ML-012_model_tiering.md", type: "file", note: "§28 model tiering" },
      ]},
    ],
  },
  {
    name: "K-SOC-04_SECURITY", type: "dir", children: [
      { name: "K-SOC-DET_DETECTION", type: "dir", children: [
        { name: "K-SOC-DET-001_sigma_compiler.go", type: "file" },
        { name: "K-SOC-DET-002_sigma_sync.py", type: "file" },
        { name: "K-SOC-DET-003_mitre_mapper.py", type: "file" },
        { name: "K-SOC-DET-004_yara_integration.md", type: "file" },
        { name: "K-SOC-DET-005_suricata_rules.md", type: "file" },
        { name: "K-SOC-DET-006_custom_detections.md", type: "file" },
        { name: "K-SOC-DET-007_sigma_rust_eval.md", type: "file" },
        { name: "K-SOC-DET-008_tetragon_k8s_ebpf.md", type: "file" },
        { name: "K-SOC-DET-009_zeek_subprocess.md", type: "file" },
      ]},
      { name: "K-SOC-TI_THREAT_INTEL", type: "dir", children: [
        { name: "K-SOC-TI-001_otx_puller.py", type: "file" },
        { name: "K-SOC-TI-002_abuseipdb.py", type: "file" },
        { name: "K-SOC-TI-003_malware_bazaar.py", type: "file" },
        { name: "K-SOC-TI-004_phishing_tank.py", type: "file" },
        { name: "K-SOC-TI-005_hibp.md", type: "file" },
        { name: "K-SOC-TI-006_cisa_kev.md", type: "file" },
        { name: "K-SOC-TI-007_stix2_parser.py", type: "file" },
        { name: "K-SOC-TI-008_stix2_validator.py", type: "file" },
        { name: "K-SOC-TI-009_shodan_enrich.py", type: "file" },
        { name: "K-SOC-TI-010_censys_discovery.py", type: "file" },
        { name: "K-SOC-TI-011_greynoise_filter.py", type: "file" },
        { name: "K-SOC-TI-012_wiz_cloud_ti.py", type: "file" },
        { name: "K-SOC-TI-013_misp_pymisp_client.py", type: "file" },
        { name: "K-SOC-TI-014_opencti_connector.md", type: "file" },
        { name: "K-SOC-TI-015_ipsum_blocklist.py", type: "file", note: "IPSum TXT MIT" },
      ]},
      { name: "K-SOC-VULN_VULNERABILITY", type: "dir", children: [
        { name: "K-SOC-VULN-001_nuclei_engine.go", type: "file" },
        { name: "K-SOC-VULN-002_epss_worker.py", type: "file" },
        { name: "K-SOC-VULN-003_cve_priority.sql", type: "file" },
        { name: "K-SOC-VULN-004_trivy_scanner.go", type: "file" },
        { name: "K-SOC-VULN-005_grype_db.go", type: "file" },
        { name: "K-SOC-VULN-006_syft_sbom_gen.go", type: "file" },
        { name: "K-SOC-VULN-007_openvas_rest.md", type: "file" },
        { name: "K-SOC-VULN-008_checkov_iac.py", type: "file" },
        { name: "K-SOC-VULN-009_kics_engine.go", type: "file" },
        { name: "K-SOC-VULN-010_ssvc_decision_tree.py", type: "file", note: "§8 SSVC" },
        { name: "K-SOC-VULN-011_nvd_api_puller.go", type: "file", note: "§8 NVD API v2" },
      ]},
      { name: "K-SOC-IS_INCIDENT_STITCH", type: "dir", children: [
        { name: "K-SOC-IS-001_redis_state.go", type: "file" },
        { name: "K-SOC-IS-002_graph_correlation.py", type: "file" },
        { name: "K-SOC-IS-003_incident_stitching.md", type: "file" },
        { name: "K-SOC-IS-004_forensic_chain.md", type: "file" },
      ]},
      { name: "K-SOC-FR_FORENSICS", type: "dir", children: [
        { name: "K-SOC-FR-001_evidence_capture.go", type: "file" },
        { name: "K-SOC-FR-002_blake3_evidence.go", type: "file" },
      ]},
      { name: "K-SOC-ID_IDENTITY", type: "dir", children: [
        { name: "K-SOC-ID-001_bloodhound_analysis.go", type: "file" },
        { name: "K-SOC-ID-002_neo4j_graph.go", type: "file" },
        { name: "K-SOC-ID-003_cypher_ad_paths.md", type: "file" },
        { name: "K-SOC-ID-004_azure_oauth_queries.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-NOC-05_OPERATIONS", type: "dir", children: [
      { name: "K-NOC-CM_CONFIG_MGMT", type: "dir", children: [
        { name: "K-NOC-CM-ANSIBLE", type: "dir", children: [
          { name: "K-NOC-CM-ANS-001_isolate_host.yml", type: "file" },
          { name: "K-NOC-CM-ANS-002_patch_cve.yml", type: "file" },
          { name: "K-NOC-CM-ANS-003_restart_service.yml", type: "file" },
          { name: "K-NOC-CM-ANS-004_rollback.yml", type: "file" },
        ]},
        { name: "K-NOC-CM-SALTSTACK", type: "dir", note: "§11 SaltStack states/reactor", children: [
          { name: "K-NOC-CM-SALT-001_reactor_setup.md", type: "file" },
          { name: "K-NOC-CM-SALT-002_state_apply.py", type: "file" },
          { name: "K-NOC-CM-SALT-003_sls_templates.md", type: "file" },
        ]},
        { name: "K-NOC-CM-001_osquery_drift.go", type: "file" },
        { name: "K-NOC-CM-002_desired_state.md", type: "file" },
        { name: "K-NOC-CM-003_saltstack_reactor.md", type: "file" },
        { name: "K-NOC-CM-004_rudder_drift.md", type: "file", note: "§11 Rudder techniques" },
      ]},
      { name: "K-NOC-BR_BACKUP_DR", type: "dir", children: [
        { name: "K-NOC-BR-001_restic_scheduler.go", type: "file" },
        { name: "K-NOC-BR-002_kopia_snapshots.go", type: "file" },
        { name: "K-NOC-BR-003_s3_cold_lifecycle.go", type: "file" },
        { name: "K-NOC-BR-004_backup_verify.md", type: "file" },
        { name: "K-NOC-BR-005_velero_backup.go", type: "file" },
        { name: "K-NOC-BR-006_velero_restore.go", type: "file" },
        { name: "K-NOC-BR-007_proxmox_vm_backup.go", type: "file" },
        { name: "K-NOC-BR-008_minio_object_store.go", type: "file" },
        { name: "K-NOC-BR-009_bareos_config.md", type: "file", note: "§12 Bareos AGPL data" },
      ]},
      { name: "K-NOC-PM_PERFORMANCE", type: "dir", children: [
        { name: "K-NOC-PM-001_otel_config.yaml", type: "file" },
        { name: "K-NOC-PM-002_anomaly_model.pkl", type: "file" },
        { name: "K-NOC-PM-003_baseline_profiling.md", type: "file" },
        { name: "K-NOC-PM-004_prometheus_recording_rules.yaml", type: "file" },
        { name: "K-NOC-PM-005_thanos_compactor.yaml", type: "file" },
        { name: "K-NOC-PM-006_grafana_datasources.yaml", type: "file" },
        { name: "K-NOC-PM-007_loki_promtail.yaml", type: "file" },
        { name: "K-NOC-PM-008_tempo_otlp_receiver.yaml", type: "file" },
        { name: "K-NOC-PM-009_victoriametrics_tsdb.md", type: "file" },
      ]},
      { name: "K-NOC-INV_INVENTORY", type: "dir", children: [
        { name: "K-NOC-INV-001_osquery_go_sdk.go", type: "file" },
        { name: "K-NOC-INV-002_fleetdm_policies.go", type: "file" },
        { name: "K-NOC-INV-003_netbox_topology.py", type: "file" },
        { name: "K-NOC-INV-004_docker_sdk.go", type: "file" },
      ]},
      { name: "K-NOC-MDM_MOBILE", type: "dir", children: [
        { name: "K-NOC-MDM-001_micromdm_ios.go", type: "file" },
        { name: "K-NOC-MDM-002_headwind_android.go", type: "file" },
        { name: "K-NOC-MDM-003_android_enterprise.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-PSA-06_BUSINESS", type: "dir", children: [
      { name: "K-PSA-ITSM", type: "dir", children: [
        { name: "K-PSA-ITSM-001_ticket_state.go", type: "file" },
        { name: "K-PSA-ITSM-002_sla_tracker.go", type: "file" },
        { name: "K-PSA-ITSM-003_service_desk.sql", type: "file" },
        { name: "K-PSA-ITSM-004_multi_channel.md", type: "file" },
        { name: "K-PSA-ITSM-005_zammad_bridge.go", type: "file" },
      ]},
      { name: "K-PSA-BILL_BILLING", type: "dir", children: [
        { name: "K-PSA-BILL-001_usage_aggregator.go", type: "file" },
        { name: "K-PSA-BILL-002_pdf_renderer.go", type: "file" },
        { name: "K-PSA-BILL-003_hle_constants.go", type: "file" },
        { name: "K-PSA-BILL-004_contract_rates.sql", type: "file" },
        { name: "K-PSA-BILL-005_pdf_generator.md", type: "file" },
        { name: "K-PSA-BILL-006_stripe_payments.go", type: "file" },
      ]},
      { name: "K-PSA-CRM_CPQ", type: "dir", children: [
        { name: "K-PSA-CRM-001_contract_tables.sql", type: "file" },
        { name: "K-PSA-CRM-002_risk_quoting.go", type: "file" },
        { name: "K-PSA-CRM-003_pyfair_risk_model.py", type: "file" },
        { name: "K-PSA-CRM-004_ltv_model.py", type: "file", note: "§17 LTV prediction" },
      ]},
    ],
  },
  {
    name: "K-GRC-07_COMPLIANCE", type: "dir", children: [
      { name: "K-GRC-OSCAL", type: "dir", children: [
        { name: "K-GRC-OSCAL-001_nist_ingest.py", type: "file" },
        { name: "K-GRC-OSCAL-002_soc2_mapper.py", type: "file" },
        { name: "K-GRC-OSCAL-003_iso_mapping.sql", type: "file" },
        { name: "K-GRC-OSCAL-004_compliance_trestle.py", type: "file" },
        { name: "K-GRC-OSCAL-005_regscale_ingest.py", type: "file" },
      ]},
      { name: "K-GRC-EV_EVIDENCE_VAULT", type: "dir", children: [
        { name: "K-GRC-EV-001_immutable_audit.sql", type: "file" },
        { name: "K-GRC-EV-002_blake3_signer.go", type: "file" },
        { name: "K-GRC-EV-003_legal_hold.md", type: "file" },
        { name: "K-GRC-EV-004_evidence_export.md", type: "file" },
      ]},
      { name: "K-GRC-SCS_SUPPLY_CHAIN", type: "dir", children: [
        { name: "K-GRC-SCS-001_sbom_syft.go", type: "file" },
        { name: "K-GRC-SCS-002_grype_scanner.py", type: "file" },
        { name: "K-GRC-SCS-003_openssf_scorecard.md", type: "file" },
        { name: "K-GRC-SCS-004_sbom_generation.md", type: "file" },
        { name: "K-GRC-SCS-005_sigstore_cosign.sh", type: "file" },
        { name: "K-GRC-SCS-006_osv_api_check.py", type: "file" },
        { name: "K-GRC-SCS-007_dependency_track.go", type: "file" },
        { name: "K-GRC-SCS-008_cyclonedx_sbom.py", type: "file", note: "§38 cyclonedx-bom" },
      ]},
      { name: "K-GRC-CA_COMPLIANCE_AUTO", type: "dir", children: [
        { name: "K-GRC-CA-001_lula_validator.go", type: "file" },
        { name: "K-GRC-CA-002_openscap_binding.py", type: "file" },
        { name: "K-GRC-CA-003_kyverno_policy.go", type: "file" },
      ]},
      { name: "K-GRC-FW_FRAMEWORKS", type: "dir", children: [
        { name: "K-GRC-FW-001_nist_800_53_oscal.md", type: "file" },
        { name: "K-GRC-FW-002_pci_dss_oscal.md", type: "file" },
        { name: "K-GRC-FW-003_iso_27001_oscal.md", type: "file" },
        { name: "K-GRC-FW-004_soc2_oscal.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-MAP-11_DR_MODULE_MAPPING", type: "dir", children: [
      { name: "K-MAP-000_MASTER_INDEX.md", type: "file" },
      { name: "K-MAP-001_EDR_Endpoint.md", type: "file" },
      { name: "K-MAP-002_ITDR_Identity.md", type: "file" },
      { name: "K-MAP-003_NDR_Network.md", type: "file" },
      { name: "K-MAP-004_CDR_Cloud.md", type: "file" },
      { name: "K-MAP-005_SDR_SaaS.md", type: "file" },
      { name: "K-MAP-006_ADR_Application.md", type: "file" },
      { name: "K-MAP-007_DDR_Data.md", type: "file" },
      { name: "K-MAP-008_VDR_Vulnerability.md", type: "file" },
      { name: "K-MAP-009_MDR_Managed.md", type: "file" },
      { name: "K-MAP-010_TI_ThreatIntel.md", type: "file" },
      { name: "K-MAP-011_CFDR_ConfigDrift.md", type: "file" },
      { name: "K-MAP-012_BDR_Backup.md", type: "file" },
      { name: "K-MAP-013_NPM_NetworkPerf.md", type: "file" },
      { name: "K-MAP-014_UEM_EndpointMgmt.md", type: "file" },
      { name: "K-MAP-015_MDM_Mobile.md", type: "file" },
      { name: "K-MAP-016_APM_AppPerf.md", type: "file" },
      { name: "K-MAP-017_GRC_Governance.md", type: "file" },
      { name: "K-MAP-018_KAI_AILayer.md", type: "file" },
      { name: "K-MAP-019_PSA_Business.md", type: "file" },
      { name: "K-MAP-020_LICENSE_COMPLIANCE.md", type: "file" },
    ],
  },
  {
    name: "K-DEPLOY-12_TOPOLOGIES", type: "dir", note: "§38 deployment configs", children: [
      { name: "K-DEPLOY-000_INDEX.md", type: "file" },
      { name: "K-DEPLOY-SMALL", type: "dir", note: "<100 endpoints, single R740", children: [
        { name: "K-DEPLOY-SM-001_docker-compose.yml", type: "file" },
        { name: "K-DEPLOY-SM-002_nats_single.conf", type: "file" },
      ]},
      { name: "K-DEPLOY-MEDIUM", type: "dir", note: "100-1000 endpoints, K8s", children: [
        { name: "K-DEPLOY-MD-001_kustomize_overlay.yaml", type: "file" },
        { name: "K-DEPLOY-MD-002_scale_config.yaml", type: "file" },
      ]},
      { name: "K-DEPLOY-LARGE", type: "dir", note: ">1000 endpoints, multi-region", children: [
        { name: "K-DEPLOY-LG-001_terraform_aws_eks.tf", type: "file" },
        { name: "K-DEPLOY-LG-002_vpc_config.tf", type: "file" },
        { name: "K-DEPLOY-LG-003_node_groups.tf", type: "file" },
      ]},
      { name: "K-DEPLOY-DASHBOARDS", type: "dir", children: [
        { name: "K-DEPLOY-DASH-001_grafana_overview.json", type: "file" },
        { name: "K-DEPLOY-DASH-002_prometheus_rules.yaml", type: "file" },
        { name: "K-DEPLOY-DASH-003_tuf_root.json", type: "file" },
      ]},
    ],
  },
  {
    name: "K-DEV-08_DEVELOPMENT", type: "dir", children: [
      { name: "K-DEV-LOCAL_LOCAL_STACK", type: "dir", children: [
        { name: "K-DEV-LOCAL-001_docker-compose.yml", type: "file" },
        { name: "K-DEV-LOCAL-002_docker-compose-small.yml", type: "file" },
        { name: "K-DEV-LOCAL-CONFIG", type: "dir", children: [
          { name: "K-DEV-LOCAL-CFG-001_clickhouse_users.xml", type: "file" },
          { name: "K-DEV-LOCAL-CFG-002_postgres_init.sql", type: "file" },
          { name: "K-DEV-LOCAL-CFG-003_nats_cluster.conf", type: "file" },
          { name: "K-DEV-LOCAL-CFG-004_vault_dev.hcl", type: "file" },
        ]},
      ]},
      { name: "K-DEV-BLD_BUILD_TOOLCHAIN", type: "dir", children: [
        { name: "K-DEV-BLD-001_Makefile", type: "file" },
        { name: "K-DEV-BLD-002_rust-toolchain.toml", type: "file" },
        { name: "K-DEV-BLD-003_go.mod", type: "file" },
        { name: "K-DEV-BLD-004_package.json", type: "file" },
        { name: "K-DEV-BLD-005_cobra_cli.go", type: "file" },
        { name: "K-DEV-BLD-006_chi_cors_middleware.go", type: "file" },
        { name: "K-DEV-BLD-007_chi_jwt_auth.go", type: "file" },
        { name: "K-DEV-BLD-008_workspace_cargo.toml", type: "file" },
        { name: "K-DEV-BLD-009_buf_protobuf.yaml", type: "file" },
        { name: "K-DEV-BLD-010_requirements_kai_core.txt", type: "file" },
        { name: "K-DEV-BLD-011_requirements_kai_full.txt", type: "file" },
      ]},
      { name: "K-DEV-CICD", type: "dir", children: [
        { name: "K-DEV-CICD-GHA_WORKFLOWS", type: "dir", children: [
          { name: "K-DEV-CICD-GHA-001_build-agents.yml", type: "file" },
          { name: "K-DEV-CICD-GHA-002_test-api.yml", type: "file" },
          { name: "K-DEV-CICD-GHA-003_deploy-k8s.yml", type: "file" },
          { name: "K-DEV-CICD-GHA-004_drone_config.yml", type: "file" },
          { name: "K-DEV-CICD-GHA-005_tekton_pipeline.yaml", type: "file" },
          { name: "K-DEV-CICD-GHA-006_concourse_pipeline.yml", type: "file" },
          { name: "K-DEV-CICD-GHA-007_dagger_ci.go", type: "file" },
          { name: "K-DEV-CICD-GHA-008_earthly_Earthfile", type: "file" },
          { name: "K-DEV-CICD-GHA-009_cosign_signing.sh", type: "file" },
          { name: "K-DEV-CICD-GHA-010_snyk_scan.sh", type: "file" },
          { name: "K-DEV-CICD-GHA-011_sonarqube_scanner.sh", type: "file" },
        ]},
        { name: "K-DEV-CICD-001_self_hosted_runner.md", type: "file" },
        { name: "K-DEV-CICD-002_woodpecker_pipeline.yml", type: "file" },
        { name: "K-DEV-CICD-003_jenkins_x_config.yaml", type: "file", note: "§43 Jenkins X" },
      ]},
      { name: "K-DEV-GIT_GITOPS", type: "dir", children: [
        { name: "K-DEV-GIT-001_gitea_setup.md", type: "file" },
        { name: "K-DEV-GIT-002_pre-commit.yaml", type: "file" },
        { name: "K-DEV-GIT-003_molt-scanner.sh", type: "file" },
        { name: "K-DEV-GIT-004_branch_protection.md", type: "file" },
        { name: "K-DEV-GIT-005_ruff_config.toml", type: "file" },
        { name: "K-DEV-GIT-006_golangci_lint.yml", type: "file" },
        { name: "K-DEV-GIT-007_clippy_config.toml", type: "file" },
        { name: "K-DEV-GIT-008_eslint_config.js", type: "file" },
        { name: "K-DEV-GIT-009_pre_commit_config.yaml", type: "file" },
        { name: "K-DEV-GIT-010_commitlint_config.js", type: "file" },
        { name: "K-DEV-GIT-011_semantic_release.json", type: "file" },
        { name: "K-DEV-GIT-012_black_config.toml", type: "file" },
        { name: "K-DEV-GIT-013_isort_config.cfg", type: "file" },
        { name: "K-DEV-GIT-014_mypy_config.ini", type: "file" },
        { name: "K-DEV-GIT-015_pylintrc", type: "file" },
        { name: "K-DEV-GIT-016_bandit_config.yaml", type: "file" },
        { name: "K-DEV-GIT-017_safety_policy.yml", type: "file" },
      ]},
      { name: "K-DEV-TEST", type: "dir", children: [
        { name: "K-DEV-TEST-001_k6_load_test.js", type: "file" },
        { name: "K-DEV-TEST-002_vegeta_attack.sh", type: "file" },
        { name: "K-DEV-TEST-003_kube_burner_config.yaml", type: "file" },
        { name: "K-DEV-TEST-004_chaos_mesh_experiment.yaml", type: "file" },
        { name: "K-DEV-TEST-005_litmus_chaos_engine.yaml", type: "file" },
        { name: "K-DEV-TEST-006_pytest_xdist_config.ini", type: "file" },
        { name: "K-DEV-TEST-007_factory_boy_factories.py", type: "file" },
        { name: "K-DEV-TEST-008_faker_data_gen.py", type: "file" },
        { name: "K-DEV-TEST-009_hypothesis_property_tests.py", type: "file" },
      ]},
      { name: "K-DEV-DOC_DOCUMENTATION", type: "dir", children: [
        { name: "K-DEV-DOC-001_architecture.md", type: "file" },
        { name: "K-DEV-DOC-002_README.md", type: "file" },
        { name: "K-DEV-DOC-003_LICENSE", type: "file" },
        { name: "K-DEV-DOC-004_NOTICE.md", type: "file" },
        { name: "K-DEV-DOC-005_license_compliance_matrix.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-API-09_API_REFERENCE", type: "dir", children: [
      { name: "K-API-OPENAPI", type: "dir", children: [
        { name: "K-API-OPEN-001_provisioning.yaml", type: "file" },
        { name: "K-API-OPEN-002_triage.yaml", type: "file" },
        { name: "K-API-OPEN-003_billing.yaml", type: "file" },
        { name: "K-API-OPEN-004_vdr_scan.yaml", type: "file" },
        { name: "K-API-OPEN-005_grc_compliance.yaml", type: "file" },
        { name: "K-API-OPEN-006_identity_graph.yaml", type: "file" },
        { name: "K-API-OPEN-007_ndr_flow.yaml", type: "file" },
        { name: "K-API-OPEN-008_health.yaml", type: "file", note: "§38 health endpoint" },
        { name: "K-API-OPEN-009_alerts.yaml", type: "file", note: "§38 alerts endpoint" },
      ]},
      { name: "K-API-PB_PROTOBUF", type: "dir", children: [
        { name: "K-API-PB-001_ocsf_schema.proto", type: "file" },
        { name: "K-API-PB-002_build_rs.rs", type: "file" },
        { name: "K-API-PB-003_ocsf_deploy.proto", type: "file", note: "§38 deployment proto" },
      ]},
      { name: "K-API-NATS_SUBJECTS", type: "dir", children: [
        { name: "K-API-NATS-001_subject_hierarchy.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-ITIL-10_ITIL_MATRIX", type: "dir", children: [
      { name: "K-ITIL-MATRIX_PRACTICE_MAP", type: "dir", children: [
        { name: "K-ITIL-MAT-001_GMP1_Strategy.md", type: "file" },
        { name: "K-ITIL-MAT-002_GMP5_Risk.md", type: "file" },
        { name: "K-ITIL-MAT-003_GMP6_InfoSec.md", type: "file" },
        { name: "K-ITIL-MAT-004_SMP1_Incident.md", type: "file" },
        { name: "K-ITIL-MAT-005_SMP10_Change.md", type: "file" },
        { name: "K-ITIL-MAT-006_SMP12_Deployment.md", type: "file" },
        { name: "K-ITIL-MAT-007_TMP2_Infrastructure.md", type: "file" },
        { name: "K-ITIL-MAT-008_SMP3_Problem.md", type: "file", note: "MDR/MSP ITIL" },
        { name: "K-ITIL-MAT-009_SMP7_ServiceLevel.md", type: "file", note: "SLA for PSA" },
      ]},
      { name: "K-ITIL-AUDIT_AUDIT_READINESS", type: "dir", children: [
        { name: "K-ITIL-AUD-001_KIC_evidence_map.md", type: "file" },
        { name: "K-ITIL-AUD-002_soc2_iso_crosswalk.csv", type: "file" },
      ]},
    ],
  },
];

// File extension color mapping
const EXT_COLORS: Record<string, string> = {
  rs: "#f97316", go: "#06b6d4", py: "#a855f7", ts: "#3b82f6", tsx: "#3b82f6",
  sql: "#22c55e", yaml: "#f59e0b", yml: "#f59e0b", json: "#fbbf24",
  md: "#94a3b8", sh: "#64748b", toml: "#fb923c", hcl: "#8b5cf6",
  proto: "#ef4444", tf: "#818cf8", xml: "#06b6d4", conf: "#94a3b8",
  pkl: "#fb923c", ini: "#94a3b8", cfg: "#94a3b8", txt: "#94a3b8",
  js: "#f59e0b", css: "#3b82f6",
};

function getExtColor(name: string): string {
  const ext = name.split(".").pop() || "";
  return EXT_COLORS[ext] || "#94a3b8";
}

function TreeNodeRow({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const isDir = node.type === "dir";
  const extColor = isDir ? "#3b82f6" : getExtColor(node.name);

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-0.5 px-2 rounded hover:bg-white/5 transition-colors cursor-pointer ${isDir ? "" : "cursor-default"}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={() => isDir && setOpen(o => !o)}
      >
        {isDir ? (
          <>
            {open ? <FolderOpen size={12} className="flex-shrink-0" style={{ color: "#f59e0b" }} /> : <Folder size={12} className="flex-shrink-0" style={{ color: "#f59e0b" }} />}
          </>
        ) : (
          <FileText size={11} className="flex-shrink-0" style={{ color: extColor }} />
        )}
        <span className={`text-xs font-mono ${isDir ? "text-white/80 font-semibold" : "text-white/50"}`} style={{ fontSize: "11px" }}>
          {node.name}
        </span>
        {node.note && (
          <span className="text-[9px] text-blue-400/70 ml-1 truncate">← {node.note}</span>
        )}
      </div>
      {isDir && open && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeNodeRow key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const ModuleGrid = ({ modules }: { modules: typeof DR_MODULES }) => (
  <div className="grid grid-cols-2 gap-3">
    {modules.map(mod => (
      <Link
        key={mod.id}
        to={`/uidr/docs/${mod.id}`}
        className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:border-blue-500/30 hover:bg-[#1a1a2a] transition-all group"
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mod.color}20` }}>
          <mod.icon size={18} style={{ color: mod.color } as React.CSSProperties} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-base font-black text-white">{mod.id}</p>
            <span className="text-[10px] font-mono text-white/25">{mod.code}</span>
          </div>
          <p className="text-xs text-white/40 leading-tight truncate">{mod.full}</p>
        </div>
        <span className="text-white/20 group-hover:text-blue-400 transition-colors text-sm">→</span>
      </Link>
    ))}
  </div>
);

type TabKey = "overview" | "kdocs-tree";

export default function UidrDocs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "DETECTION & RESPONSE": true,
    "INTELLIGENCE": true,
    "OPERATIONS": true,
    "GOVERNANCE & BUSINESS": true,
  });
  const [search, setSearch] = useState("");
  const [treeSearch, setTreeSearch] = useState("");

  const toggle = (label: string) =>
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));

  return (
    <UidrLayout>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 border-r border-white/10 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
          <div className="px-4 py-3 border-b border-white/5">
            <Link
              to="/uidr/docs"
              className={`flex items-center gap-2 text-sm font-semibold px-2 py-1.5 rounded ${
                location.pathname === "/uidr/docs" ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              <span className="text-base">📋</span> Overview
            </Link>
          </div>
          <div className="py-2">
            {SIDEBAR_GROUPS.map(group => (
              <div key={group.label}>
                <button
                  onClick={() => toggle(group.label)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left"
                >
                  <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{group.label}</span>
                  {openGroups[group.label]
                    ? <ChevronDown size={10} className="text-white/30" />
                    : <ChevronRight size={10} className="text-white/30" />
                  }
                </button>
                {openGroups[group.label] && (
                  <div className="pb-2">
                    {group.modules.map(mod => {
                      const isActive = location.pathname === `/uidr/docs/${mod.id}`;
                      return (
                        <Link
                          key={mod.id}
                          to={`/uidr/docs/${mod.id}`}
                          className={`flex items-center justify-between px-4 py-1.5 transition-colors ${
                            isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <mod.icon size={12} style={{ color: mod.color } as React.CSSProperties} />
                            <span className="text-xs font-medium">{mod.id}</span>
                          </div>
                          <span className="text-[9px] text-white/20 font-mono">{mod.code}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-10 py-10 max-w-5xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📘</span>
            <h1 className="text-3xl font-black text-white">K-DOCS</h1>
          </div>
          <p className="text-white/50 text-base mb-8 leading-relaxed max-w-2xl">
            Complete technical reference for all 18 Kubric UIDR modules — and the full K-DOCS monorepo orchestration hierarchy.
          </p>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 border-b border-white/10">
            {([
              { key: "overview" as TabKey, label: "📋 Module Overview" },
              { key: "kdocs-tree" as TabKey, label: "📁 K-DOCS Full Tree" },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-blue-500 text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: Overview */}
          {activeTab === "overview" && (
            <>
              {/* Search */}
              <div className="relative mb-10">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-white">Detection & Response</h2>
                  <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">9</span>
                </div>
                <ModuleGrid modules={DR_MODULES.filter(m => !search || m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()))} />
              </div>

              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-white">Intelligence</h2>
                  <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                </div>
                <ModuleGrid modules={TI_MODULES.filter(m => !search || m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()))} />
              </div>

              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-white">Operations</h2>
                  <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">6</span>
                </div>
                <ModuleGrid modules={OPS_MODULES.filter(m => !search || m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()))} />
              </div>

              <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-white">Governance & Business</h2>
                  <span className="bg-white/10 text-white/60 text-xs font-bold px-2 py-0.5 rounded-full">2</span>
                </div>
                <ModuleGrid modules={GOV_MODULES.filter(m => !search || m.full.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()))} />
              </div>

              {/* Integration Strategies Table */}
              <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                  <h2 className="text-base font-bold text-white">Integration Strategies</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-blue-400">Strategy</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40">License Type</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 hidden md:table-cell">Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INTEGRATION_TABLE.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-6 py-3 text-sm font-bold text-white">{row.strategy}</td>
                        <td className="px-6 py-3 text-xs text-white/50">{row.license}</td>
                        <td className="px-6 py-3 text-xs text-white/40 hidden md:table-cell">{row.approach}</td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
              </div>

              {/* Read Technical Docs CTA */}
              <div className="mt-10 p-8 rounded-xl border border-blue-500/20 bg-[#0a0f1a] flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Ready to dive into the architecture?</h3>
                  <p className="text-white/50 text-base leading-relaxed max-w-xl">
                    The Technical Docs site contains the complete K-DOCS file tree — every source file, config, and detection asset across all 13 sections. Built for contributors and engineers onboarding to Kubric.
                  </p>
                </div>
                <Link
                  to="/uidr/technical-docs"
                  className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-3"
                >
                  <span>📂</span>
                  Read Technical Docs
                </Link>
              </div>
            </>
          )}

          {/* Tab: K-DOCS Full Tree */}
          {activeTab === "kdocs-tree" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-white/50 text-sm">
                  Complete monorepo file hierarchy — 13 sections, 120k+ detection assets.
                </p>
              </div>

              {/* Tree search */}
              <div className="relative mb-6">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Filter files..."
                  value={treeSearch}
                  onChange={e => setTreeSearch(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                  <Folder size={14} className="text-yellow-400" />
                  <span className="text-sm font-bold text-white font-mono">K-DOCS/</span>
                  <span className="text-xs text-white/30 ml-auto">13 sections · click to expand</span>
                </div>
                <div className="py-2 overflow-x-auto">
                  {KDOCS_TREE.map((node, i) => (
                    <TreeNodeRow key={i} node={node} depth={0} />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { ext: ".rs", color: "#f97316" }, { ext: ".go", color: "#06b6d4" },
                  { ext: ".py", color: "#a855f7" }, { ext: ".yaml/.yml", color: "#f59e0b" },
                  { ext: ".sql", color: "#22c55e" }, { ext: ".md", color: "#94a3b8" },
                  { ext: ".proto", color: "#ef4444" }, { ext: ".tf", color: "#818cf8" },
                ].map(({ ext, color }) => (
                  <div key={ext} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-white/40 font-mono">{ext}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </UidrLayout>
  );
}
