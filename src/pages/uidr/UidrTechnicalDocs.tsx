import { useState } from "react";
import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import {
  ChevronRight, ChevronDown, Folder, FolderOpen, FileText,
  Search, BookOpen, ExternalLink
} from "lucide-react";

// Full K-DOCS tree (complete from K-DOCS orchestration document)
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
    name: "K-VENDOR-00_DETECTION_ASSETS", type: "dir", note: "120k+ assets", children: [
      { name: "K-VENDOR-000_INDEX.md", type: "file", note: "master index" },
      { name: "K-VENDOR-SIGMA", type: "dir", note: "Apache 2.0", children: [
        { name: "K-VENDOR-SIG-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-SIG-002_windows_builtin.md", type: "file" },
        { name: "K-VENDOR-SIG-003_cloud_rules.md", type: "file" },
        { name: "K-VENDOR-SIG-004_saas_rules.md", type: "file" },
        { name: "K-VENDOR-SIG-005_hunting_rules.md", type: "file" },
        { name: "K-VENDOR-SIG-006_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-SURICATA", type: "dir", note: "GPL 2.0 — data", children: [
        { name: "K-VENDOR-SUR-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-SUR-002_emerging_malware.md", type: "file" },
        { name: "K-VENDOR-SUR-003_emerging_c2.md", type: "file" },
        { name: "K-VENDOR-SUR-004_emerging_web.md", type: "file" },
        { name: "K-VENDOR-SUR-005_emerging_data.md", type: "file" },
        { name: "K-VENDOR-SUR-006_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-YARA", type: "dir", note: "BSD-3 / mixed", children: [
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
      { name: "K-VENDOR-MITRE", type: "dir", note: "CC BY 4.0", children: [
        { name: "K-VENDOR-MIT-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-MIT-002_enterprise_attack.md", type: "file" },
        { name: "K-VENDOR-MIT-003_cwe_stix2.md", type: "file" },
        { name: "K-VENDOR-MIT-004_capec_stix2.md", type: "file" },
        { name: "K-VENDOR-MIT-005_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-OSCAL", type: "dir", note: "Public Domain", children: [
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
      { name: "K-VENDOR-VELOCIRAPTOR", type: "dir", note: "AGPL 3.0 — data", children: [
        { name: "K-VENDOR-VEL-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-VEL-002_threat_hunting.md", type: "file" },
        { name: "K-VENDOR-VEL-003_forensic_artifacts.md", type: "file" },
        { name: "K-VENDOR-VEL-004_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-CORTEX", type: "dir", note: "AGPL 3.0 — subprocess", children: [
        { name: "K-VENDOR-COR-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-COR-002_analyzers.md", type: "file" },
        { name: "K-VENDOR-COR-003_responders.md", type: "file" },
        { name: "K-VENDOR-COR-004_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-FALCO", type: "dir", note: "Apache 2.0", children: [
        { name: "K-VENDOR-FAL-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-FAL-002_falco_rules.md", type: "file" },
        { name: "K-VENDOR-FAL-003_k8s_rules.md", type: "file" },
      ]},
      { name: "K-VENDOR-BLOODHOUND", type: "dir", note: "Apache 2.0", children: [
        { name: "K-VENDOR-BH-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-BH-002_windows_cypher.md", type: "file" },
        { name: "K-VENDOR-BH-003_azure_cypher.md", type: "file" },
      ]},
      { name: "K-VENDOR-OPENSCAP", type: "dir", note: "CC — data use", children: [
        { name: "K-VENDOR-OSP-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-OSP-002_cis_benchmarks.md", type: "file" },
        { name: "K-VENDOR-OSP-003_stig_content.md", type: "file" },
      ]},
      { name: "K-VENDOR-WAZUH", type: "dir", note: "GPL 2.0 — data", children: [
        { name: "K-VENDOR-WAZ-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-WAZ-002_process_rules.md", type: "file" },
        { name: "K-VENDOR-WAZ-003_ad_rules.md", type: "file" },
        { name: "K-VENDOR-WAZ-004_sca_rules.md", type: "file" },
        { name: "K-VENDOR-WAZ-005_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-ZEEK", type: "dir", note: "BSD-3 — data scripts", children: [
        { name: "K-VENDOR-ZEK-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-ZEK-002_base_protocols.md", type: "file" },
        { name: "K-VENDOR-ZEK-003_intel_framework.md", type: "file" },
        { name: "K-VENDOR-ZEK-004_http_scripts.md", type: "file" },
        { name: "K-VENDOR-ZEK-005_ja3_tls.md", type: "file" },
      ]},
      { name: "K-VENDOR-OSQUERY", type: "dir", note: "Apache 2.0", children: [
        { name: "K-VENDOR-OSQ-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-OSQ-002_incident_response.md", type: "file" },
        { name: "K-VENDOR-OSQ-003_fim_packs.md", type: "file" },
        { name: "K-VENDOR-OSQ-004_sync_script.sh", type: "file" },
      ]},
      { name: "K-VENDOR-THEHIVE", type: "dir", note: "AGPL 3.0 — schema data", children: [
        { name: "K-VENDOR-THV-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-THV-002_case_schema.md", type: "file" },
        { name: "K-VENDOR-THV-003_alert_schema.md", type: "file" },
        { name: "K-VENDOR-THV-004_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-SHUFFLE", type: "dir", note: "GPL 3.0 — config data", children: [
        { name: "K-VENDOR-SHF-001_INDEX.md", type: "file" },
        { name: "K-VENDOR-SHF-002_soar_workflows.md", type: "file" },
        { name: "K-VENDOR-SHF-003_license_boundary.md", type: "file" },
      ]},
      { name: "K-VENDOR-RUDDER", type: "dir", note: "GPL 3.0 — techniques data", children: [
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
          { name: "K-XRO-CS-YARA", type: "dir", children: [
            { name: "K-XRO-CS-YAR-001_yara_compiler.rs", type: "file" },
            { name: "K-XRO-CS-YAR-002_malware_scanner.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-FIM", type: "dir", children: [
            { name: "K-XRO-CS-FIM-001_inotify_watcher.rs", type: "file" },
            { name: "K-XRO-CS-FIM-002_blake3_baseline.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-SIGMA", type: "dir", children: [
            { name: "K-XRO-CS-SIG-001_sigma_evaluator.rs", type: "file" },
            { name: "K-XRO-CS-SIG-002_ocsf_event_bridge.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-ML", type: "dir", children: [
            { name: "K-XRO-CS-ML-001_candle_inference.rs", type: "file" },
            { name: "K-XRO-CS-ML-002_tinyllama_loader.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-FORENSIC", type: "dir", children: [
            { name: "K-XRO-CS-FR-001_memory_snapshot.rs", type: "file" },
          ]},
          { name: "K-XRO-CS-GOVERNOR", type: "dir", children: [
            { name: "K-XRO-CS-GV-001_token_bucket.rs", type: "file" },
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
          { name: "K-XRO-NG-RITA", type: "dir", children: [
            { name: "K-XRO-NG-RITA-001_beacon_detector.go", type: "file" },
            { name: "K-XRO-NG-RITA-002_dns_tunnel.go", type: "file" },
            { name: "K-XRO-NG-RITA-003_exfil_detector.go", type: "file" },
          ]},
          { name: "K-XRO-NG-IDS", type: "dir", children: [
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
        { name: "K-KAI-SIMULATE", type: "dir", note: "LTV / churn / pricing", children: [
          { name: "K-KAI-SIM-001_ltv_predictor.py", type: "file" },
          { name: "K-KAI-SIM-002_churn_simulator.py", type: "file" },
          { name: "K-KAI-SIM-003_dynamic_pricing.py", type: "file" },
        ]},
        { name: "K-KAI-RISK", type: "dir", note: "PyFair / EPSS risk", children: [
          { name: "K-KAI-RISK-001_pyfair_model.py", type: "file" },
          { name: "K-KAI-RISK-002_epss_scorer.py", type: "file" },
          { name: "K-KAI-RISK-003_ssvc_decision.py", type: "file" },
        ]},
        { name: "K-KAI-DEPLOY", type: "dir", note: "SaltStack/Ansible deploy", children: [
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
        { name: "K-KAI-ML-011_vllm_server.py", type: "file" },
        { name: "K-KAI-ML-012_model_tiering.md", type: "file" },
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
        { name: "K-SOC-TI-015_ipsum_blocklist.py", type: "file" },
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
        { name: "K-SOC-VULN-010_ssvc_decision_tree.py", type: "file" },
        { name: "K-SOC-VULN-011_nvd_api_puller.go", type: "file" },
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
        { name: "K-NOC-CM-SALTSTACK", type: "dir", children: [
          { name: "K-NOC-CM-SALT-001_reactor_setup.md", type: "file" },
          { name: "K-NOC-CM-SALT-002_state_apply.py", type: "file" },
          { name: "K-NOC-CM-SALT-003_sls_templates.md", type: "file" },
        ]},
        { name: "K-NOC-CM-001_osquery_drift.go", type: "file" },
        { name: "K-NOC-CM-002_desired_state.md", type: "file" },
        { name: "K-NOC-CM-003_saltstack_reactor.md", type: "file" },
        { name: "K-NOC-CM-004_rudder_drift.md", type: "file" },
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
        { name: "K-NOC-BR-009_bareos_config.md", type: "file" },
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
        { name: "K-NOC-MDM-003_enrollment_flow.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-SVC-06_MANAGED_SERVICES", type: "dir", children: [
      { name: "K-SVC-PSA_BILLING", type: "dir", children: [
        { name: "K-SVC-PSA-001_erpnext_schema.py", type: "file" },
        { name: "K-SVC-PSA-002_stripe_billing.go", type: "file" },
        { name: "K-SVC-PSA-003_usage_metering.go", type: "file" },
        { name: "K-SVC-PSA-004_invoice_pdf.py", type: "file" },
        { name: "K-SVC-PSA-005_hle_calculator.py", type: "file" },
      ]},
      { name: "K-SVC-SLA", type: "dir", children: [
        { name: "K-SVC-SLA-001_mttr_tracker.go", type: "file" },
        { name: "K-SVC-SLA-002_rto_rpo_monitor.go", type: "file" },
        { name: "K-SVC-SLA-003_sla_breach_alert.py", type: "file" },
      ]},
      { name: "K-SVC-ONB_ONBOARDING", type: "dir", children: [
        { name: "K-SVC-ONB-001_tenant_provisioning.go", type: "file" },
        { name: "K-SVC-ONB-002_agent_deploy_wizard.go", type: "file" },
        { name: "K-SVC-ONB-003_baseline_snapshot.go", type: "file" },
      ]},
    ],
  },
  {
    name: "K-GRC-07_GOVERNANCE", type: "dir", children: [
      { name: "K-GRC-COMP_COMPLIANCE", type: "dir", children: [
        { name: "K-GRC-COMP-001_oscal_reader.go", type: "file" },
        { name: "K-GRC-COMP-002_control_mapper.py", type: "file" },
        { name: "K-GRC-COMP-003_evidence_collector.go", type: "file" },
        { name: "K-GRC-COMP-004_gap_analyzer.py", type: "file" },
        { name: "K-GRC-COMP-005_report_generator.py", type: "file" },
      ]},
      { name: "K-GRC-RISK", type: "dir", children: [
        { name: "K-GRC-RISK-001_pyfair_quantifier.py", type: "file" },
        { name: "K-GRC-RISK-002_ssvc_tree.py", type: "file" },
        { name: "K-GRC-RISK-003_risk_register.sql", type: "file" },
      ]},
      { name: "K-GRC-AUDIT", type: "dir", children: [
        { name: "K-GRC-AUD-001_audit_trail.go", type: "file" },
        { name: "K-GRC-AUD-002_merkle_chain.go", type: "file" },
        { name: "K-GRC-AUD-003_soc2_evidence.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-API-08_GATEWAY", type: "dir", children: [
      { name: "K-API-GW_GATEWAY", type: "dir", children: [
        { name: "K-API-GW-001_kong_config.yaml", type: "file" },
        { name: "K-API-GW-002_rate_limiting.lua", type: "file" },
        { name: "K-API-GW-003_auth_plugin.go", type: "file" },
        { name: "K-API-GW-004_openapi_spec.yaml", type: "file" },
      ]},
      { name: "K-API-AUTH", type: "dir", children: [
        { name: "K-API-AUTH-001_jwt_validator.go", type: "file" },
        { name: "K-API-AUTH-002_vault_auth.go", type: "file" },
        { name: "K-API-AUTH-003_mTLS_config.md", type: "file" },
      ]},
    ],
  },
  {
    name: "K-MAP-09_LIBRARY_MATRIX", type: "dir", note: "All 18 module mappings", children: [
      { name: "K-MAP-001_EDR_Libraries.md", type: "file" },
      { name: "K-MAP-002_ITDR_Libraries.md", type: "file" },
      { name: "K-MAP-003_NDR_Libraries.md", type: "file" },
      { name: "K-MAP-004_CDR_Libraries.md", type: "file" },
      { name: "K-MAP-005_SDR_Libraries.md", type: "file" },
      { name: "K-MAP-006_ADR_Libraries.md", type: "file" },
      { name: "K-MAP-007_DDR_Libraries.md", type: "file" },
      { name: "K-MAP-008_VDR_Libraries.md", type: "file" },
      { name: "K-MAP-009_MDR_Libraries.md", type: "file" },
      { name: "K-MAP-010_TI_Libraries.md", type: "file" },
      { name: "K-MAP-011_CFDR_Libraries.md", type: "file" },
      { name: "K-MAP-012_BDR_Libraries.md", type: "file" },
      { name: "K-MAP-013_NPM_Libraries.md", type: "file" },
      { name: "K-MAP-014_UEM_Libraries.md", type: "file" },
      { name: "K-MAP-015_MDM_Libraries.md", type: "file" },
      { name: "K-MAP-016_APM_Libraries.md", type: "file" },
      { name: "K-MAP-017_GRC_Libraries.md", type: "file" },
      { name: "K-MAP-018_PSA_Libraries.md", type: "file" },
      { name: "K-MAP-019_KAI_Libraries.md", type: "file" },
      { name: "K-MAP-020_NATS_Subject_Map.md", type: "file" },
    ],
  },
  {
    name: "K-ITIL-10_ITIL_MATRIX", type: "dir", children: [
      { name: "K-ITIL-INC_INCIDENT", type: "dir", children: [
        { name: "K-ITIL-INC-001_p1_runbook.md", type: "file" },
        { name: "K-ITIL-INC-002_p2_runbook.md", type: "file" },
        { name: "K-ITIL-INC-003_war_room.md", type: "file" },
        { name: "K-ITIL-INC-004_postmortem.md", type: "file" },
      ]},
      { name: "K-ITIL-CHG_CHANGE", type: "dir", children: [
        { name: "K-ITIL-CHG-001_standard_change.md", type: "file" },
        { name: "K-ITIL-CHG-002_emergency_change.md", type: "file" },
        { name: "K-ITIL-CHG-003_change_cab.md", type: "file" },
      ]},
      { name: "K-ITIL-CAP_CAPACITY", type: "dir", children: [
        { name: "K-ITIL-CAP-001_capacity_model.md", type: "file" },
        { name: "K-ITIL-CAP-002_scaling_triggers.md", type: "file" },
      ]},
    ],
  },
];

function getFileColor(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const colors: Record<string, string> = {
    rs: "#f97316", go: "#06b6d4", py: "#a855f7", md: "#94a3b8",
    sql: "#22c55e", yaml: "#3b82f6", yml: "#3b82f6", json: "#f59e0b",
    toml: "#ef4444", sh: "#4ade80", hcl: "#8b5cf6", lua: "#60a5fa",
    conf: "#fb923c", txt: "#94a3b8", pkl: "#fbbf24",
  };
  return colors[ext] ?? "#64748b";
}

function countNodes(nodes: TreeNode[]): number {
  return nodes.reduce((acc, n) => acc + 1 + (n.children ? countNodes(n.children) : 0), 0);
}

function TreeNodeRow({ node, depth, search }: { node: TreeNode; depth: number; search: string }) {
  const [open, setOpen] = useState(depth === 0);

  const nameMatch = node.name.toLowerCase().includes(search.toLowerCase());
  const childMatch = (nodes: TreeNode[]): boolean =>
    nodes.some(n => n.name.toLowerCase().includes(search.toLowerCase()) || (n.children ? childMatch(n.children) : false));

  if (search && !nameMatch && !(node.children && childMatch(node.children))) return null;

  if (node.type === "file") {
    const color = getFileColor(node.name);
    return (
      <div
        className="flex items-center gap-2 px-3 py-1 hover:bg-white/5 rounded cursor-default"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <FileText size={12} style={{ color, flexShrink: 0 }} />
        <span className="text-sm text-white/60 font-mono truncate">{node.name}</span>
        {node.note && <span className="text-[10px] text-white/25 ml-auto flex-shrink-0">{node.note}</span>}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded text-left transition-colors"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {open ? <ChevronDown size={12} className="text-white/40 flex-shrink-0" /> : <ChevronRight size={12} className="text-white/40 flex-shrink-0" />}
        {open
          ? <FolderOpen size={13} className="text-blue-400 flex-shrink-0" />
          : <Folder size={13} className="text-blue-400 flex-shrink-0" />
        }
        <span className="text-sm text-white/80 font-mono font-semibold truncate">{node.name}</span>
        {node.note && <span className="text-[10px] text-white/25 ml-auto flex-shrink-0">{node.note}</span>}
      </button>
      {open && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeNodeRow key={i} node={child} depth={depth + 1} search={search} />
          ))}
        </div>
      )}
    </div>
  );
}

const OVERVIEW_SECTIONS = [
  { code: "K-CORE-01", name: "Infrastructure", desc: "Hardware, Networking, Proxmox, Kubernetes, Data Lakehouse, NATS Message Bus, Security Root", files: "40+" },
  { code: "K-VENDOR-00", name: "Detection Assets", desc: "120k+ assets: Sigma, Suricata ET, YARA, MISP, MITRE ATT&CK, OSCAL, Nuclei, Velociraptor, Cortex, Falco, BloodHound, Wazuh, Zeek", files: "120k+" },
  { code: "K-XRO-02", name: "Super Agent", desc: "CoreSec (eBPF/Rust), NetGuard (PCAP/DPI), PerfTrace, Watchdog, Provisioning, Sidecars", files: "35+" },
  { code: "K-KAI-03", name: "Orchestration", desc: "13 CrewAI Personas, n8n & Temporal Workflows, Guardrails, RAG, ML Models (vLLM/Ollama)", files: "50+" },
  { code: "K-SOC-04", name: "Security Layer", desc: "Detection pipeline, Threat Intel, Vulnerability management, Incident stitching, Forensics, Identity", files: "30+" },
  { code: "K-NOC-05", name: "Operations Layer", desc: "Config management (Ansible/Salt), Backup & DR, Performance monitoring, Inventory, MDM", files: "30+" },
  { code: "K-SVC-06", name: "Managed Services", desc: "PSA billing (ERPNext/Stripe), SLA monitoring, Tenant onboarding & provisioning", files: "12+" },
  { code: "K-GRC-07", name: "Governance", desc: "OSCAL compliance mapping, Risk quantification (PyFair/SSVC), Audit trail with Merkle chain", files: "11+" },
  { code: "K-API-08", name: "API Gateway", desc: "Kong gateway, Rate limiting, JWT/Vault auth, OpenAPI spec, mTLS configuration", files: "7+" },
  { code: "K-MAP-09", name: "Library Matrix", desc: "Complete one-to-one OSS library mapping for all 18 DR modules + KAI + PSA — 20 mapping files", files: "20" },
  { code: "K-ITIL-10", name: "ITIL Matrix", desc: "Incident runbooks (P1-P2), Change management, Capacity planning and scaling triggers", files: "9+" },
];

export default function UidrTechnicalDocs() {
  const [search, setSearch] = useState("");
  const totalNodes = countNodes(KDOCS_TREE);

  return (
    <UidrLayout>
      <div className="min-h-screen">
        {/* Hero */}
        <div className="border-b border-white/10 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-blue-500 text-xs font-black tracking-widest uppercase">K-DOCS</span>
              <span className="text-white/30 text-xs">TECHNICAL ARCHITECTURE</span>
              <span className="text-white/20 text-xs">|</span>
              <span className="text-white/30 text-xs">ARCHITECTURE VERSION 3.0</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Kubric Technical<br />
              <span className="text-blue-500">Documentation</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed mb-4">
              Complete K-DOCS monorepo architecture. Every file, every module, every library — from eBPF kernel hooks to autonomous AI billing.
            </p>
            <p className="text-base text-white/40 max-w-3xl leading-relaxed mb-10">
              This is the technical reference for contributors and engineers. 13 primary sections spanning infrastructure (K-CORE-01) through ITIL matrix (K-ITIL-10). Notion sync coming once this tree is validated.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <p className="text-4xl font-black text-white">{totalNodes}+</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Total Files &amp; Dirs</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-white">120k+</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Detection Assets</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-white">13</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">K-DOCS Sections</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-white">18</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">DR Modules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Overview */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-black text-white mb-8">Architecture Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {OVERVIEW_SECTIONS.map(sec => (
                <div key={sec.code} className="p-5 rounded-xl border border-white/10 bg-[#111111] hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black font-mono text-blue-400">{sec.code}</span>
                    <span className="text-xs text-white/25">{sec.files} files</span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{sec.name}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full File Tree */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-1">Full K-DOCS File Tree</h2>
              <p className="text-white/40 text-sm">Click any directory to expand. Files are color-coded by type.</p>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter files..."
                className="bg-[#111111] border border-white/10 text-white text-sm rounded-lg pl-9 pr-4 py-2.5 w-64 outline-none focus:border-blue-500/50 placeholder-white/20"
              />
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { ext: ".rs", color: "#f97316", label: "Rust" },
              { ext: ".go", color: "#06b6d4", label: "Go" },
              { ext: ".py", color: "#a855f7", label: "Python" },
              { ext: ".yaml", color: "#3b82f6", label: "YAML/K8s" },
              { ext: ".sql", color: "#22c55e", label: "SQL" },
              { ext: ".md", color: "#94a3b8", label: "Markdown" },
              { ext: ".json", color: "#f59e0b", label: "JSON" },
              { ext: ".toml", color: "#ef4444", label: "TOML" },
            ].map(item => (
              <div key={item.ext} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-white/40">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="border border-white/10 rounded-xl bg-[#0d0d0d] overflow-hidden">
            <div className="p-4">
              {KDOCS_TREE.map((node, i) => (
                <TreeNodeRow key={i} node={node} depth={0} search={search} />
              ))}
            </div>
          </div>
        </div>

        {/* Notion Sync Notice */}
        <div className="border-t border-white/10 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Notion Sync — Coming Soon</h3>
                <p className="text-white/50 text-base max-w-2xl">
                  Once this K-DOCS tree is validated, each node will sync live content from Notion via Supabase edge functions and cron jobs. Contributors will be able to update documentation in Notion and see it reflected here within minutes.
                </p>
              </div>
              <Link
                to="/uidr/contributors"
                className="flex-shrink-0 ml-8 border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 font-bold px-6 py-3 rounded-xl text-base transition-colors flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Become a Contributor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UidrLayout>
  );
}
