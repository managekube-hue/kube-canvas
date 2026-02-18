// K-DOCS Tree Structure — mirroring the Kubric Orchestration Document hierarchy

export interface KDocsFile {
  id: string;
  code: string;
  label: string;
  ext?: string;
  isNew?: boolean;
}

export interface KDocsSection {
  id: string;
  code: string;
  label: string;
  color: string;
  children: KDocsGroup[];
}

export interface KDocsGroup {
  id: string;
  code: string;
  label: string;
  files?: KDocsFile[];
  subGroups?: KDocsSubGroup[];
  isNew?: boolean;
}

export interface KDocsSubGroup {
  id: string;
  code: string;
  label: string;
  files: KDocsFile[];
  isNew?: boolean;
}

export const kdocsTree: KDocsSection[] = [
  {
    id: "k-core-01",
    code: "K-CORE-01",
    label: "Infrastructure",
    color: "#3b82f6",
    children: [
      {
        id: "k-hw",
        code: "K-HW-R630",
        label: "Hardware",
        files: [
          { id: "k-hw-001", code: "K-HW-001", label: "Node1 Config", ext: "md" },
          { id: "k-hw-002", code: "K-HW-002", label: "Node2 Config", ext: "md" },
          { id: "k-hw-003", code: "K-HW-003", label: "Node3 Config", ext: "md" },
          { id: "k-hw-004", code: "K-HW-004", label: "iDRAC9 Network", ext: "md" },
          { id: "k-hw-005", code: "K-HW-005", label: "RAM Expansion", ext: "md" },
        ],
      },
      {
        id: "k-net",
        code: "K-NET",
        label: "Networking",
        files: [
          { id: "k-net-001", code: "K-NET-001", label: "10G SFP Config", ext: "md" },
          { id: "k-net-002", code: "K-NET-002", label: "Corosync Heartbeat", ext: "md" },
          { id: "k-net-003", code: "K-NET-003", label: "Virtual IP Failover", ext: "md" },
          { id: "k-net-004", code: "K-NET-004", label: "HAProxy Keepalived", ext: "md" },
        ],
      },
      {
        id: "k-hv",
        code: "K-HV",
        label: "Proxmox Hypervisor",
        files: [
          { id: "k-hv-001", code: "K-HV-001", label: "Cluster Bootstrap", ext: "md" },
          { id: "k-hv-002", code: "K-HV-002", label: "Ceph Storage", ext: "md" },
          { id: "k-hv-003", code: "K-HV-003", label: "Chrony PTP TimeSync", ext: "md" },
        ],
        subGroups: [
          {
            id: "k-hv-vm",
            code: "K-HV-VM",
            label: "VM Templates",
            files: [
              { id: "k-hv-vm-001", code: "K-HV-VM-001", label: "Go API CloudInit", ext: "md" },
              { id: "k-hv-vm-002", code: "K-HV-VM-002", label: "ClickHouse StatefulSet", ext: "md" },
              { id: "k-hv-vm-003", code: "K-HV-VM-003", label: "PostgreSQL RLS", ext: "md" },
              { id: "k-hv-vm-004", code: "K-HV-VM-004", label: "Ollama LLM", ext: "md" },
              { id: "k-hv-vm-005", code: "K-HV-VM-005", label: "vLLM GPU Node", ext: "md" },
            ],
          },
          {
            id: "k-hv-lxc",
            code: "K-HV-LXC",
            label: "LXC Containers",
            files: [
              { id: "k-hv-lxc-001", code: "K-HV-LXC-001", label: "Gitea", ext: "md" },
              { id: "k-hv-lxc-002", code: "K-HV-LXC-002", label: "n8n", ext: "md" },
              { id: "k-hv-lxc-003", code: "K-HV-LXC-003", label: "Caddy", ext: "md" },
              { id: "k-hv-lxc-004", code: "K-HV-LXC-004", label: "Woodpecker CI", ext: "md" },
            ],
          },
        ],
      },
      {
        id: "k-k8s",
        code: "K-K8S",
        label: "Kubernetes",
        files: [
          { id: "k-k8s-001", code: "K-K8S-001", label: "ClickHouse StatefulSet", ext: "yaml" },
          { id: "k-k8s-002", code: "K-K8S-002", label: "NATS StatefulSet", ext: "yaml" },
          { id: "k-k8s-003", code: "K-K8S-003", label: "PostgreSQL StatefulSet", ext: "yaml" },
          { id: "k-k8s-004", code: "K-K8S-004", label: "API Deployment", ext: "yaml" },
        ],
        subGroups: [
          {
            id: "k-k8s-mesh",
            code: "K-K8S-MESH",
            label: "Service Mesh",
            files: [
              { id: "k-k8s-mesh-001", code: "K-K8S-MESH-001", label: "Istio ServiceMesh", ext: "yaml" },
              { id: "k-k8s-mesh-002", code: "K-K8S-MESH-002", label: "Linkerd Config", ext: "yaml" },
              { id: "k-k8s-mesh-003", code: "K-K8S-MESH-003", label: "Cilium CNI", ext: "yaml" },
              { id: "k-k8s-mesh-004", code: "K-K8S-MESH-004", label: "Hubble ServiceMap", ext: "yaml" },
              { id: "k-k8s-mesh-005", code: "K-K8S-MESH-005", label: "CertManager Vault", ext: "yaml" },
              { id: "k-k8s-mesh-006", code: "K-K8S-MESH-006", label: "ExternalSecrets Operator", ext: "yaml" },
            ],
          },
          {
            id: "k-k8s-gitops",
            code: "K-K8S-GO",
            label: "GitOps",
            files: [
              { id: "k-k8s-go-001", code: "K-K8S-GO-001", label: "ArgoCD Application", ext: "yaml" },
              { id: "k-k8s-go-002", code: "K-K8S-GO-002", label: "Flux GitRepository", ext: "yaml" },
              { id: "k-k8s-go-003", code: "K-K8S-GO-003", label: "Helm Values", ext: "yaml" },
              { id: "k-k8s-go-004", code: "K-K8S-GO-004", label: "Kustomize Overlays", ext: "yaml" },
              { id: "k-k8s-go-005", code: "K-K8S-GO-005", label: "Gatekeeper OPA", ext: "yaml" },
            ],
          },
          {
            id: "k-k8s-obs",
            code: "K-K8S-OBS",
            label: "Observability",
            files: [
              { id: "k-k8s-obs-001", code: "K-K8S-OBS-001", label: "Prometheus Operator", ext: "yaml" },
              { id: "k-k8s-obs-002", code: "K-K8S-OBS-002", label: "Thanos Sidecar", ext: "yaml" },
              { id: "k-k8s-obs-003", code: "K-K8S-OBS-003", label: "Grafana Deployment", ext: "yaml" },
              { id: "k-k8s-obs-004", code: "K-K8S-OBS-004", label: "Loki Stack", ext: "yaml" },
              { id: "k-k8s-obs-005", code: "K-K8S-OBS-005", label: "Tempo Tracing", ext: "yaml" },
            ],
          },
          {
            id: "k-k8s-policy",
            code: "K-K8S-POL",
            label: "Policy",
            files: [
              { id: "k-k8s-pol-001", code: "K-K8S-POL-001", label: "SealedSecrets Controller", ext: "yaml" },
              { id: "k-k8s-pol-002", code: "K-K8S-POL-002", label: "NetworkPolicy Defaults", ext: "yaml" },
              { id: "k-k8s-pol-003", code: "K-K8S-POL-003", label: "ResourceQuota", ext: "yaml" },
            ],
          },
        ],
      },
      {
        id: "k-dl",
        code: "K-DL",
        label: "Data Lakehouse",
        subGroups: [
          {
            id: "k-dl-ch",
            code: "K-DL-CH",
            label: "ClickHouse",
            files: [
              { id: "k-dl-ch-001", code: "K-DL-CH-001", label: "Cluster Config", ext: "md" },
              { id: "k-dl-ch-002", code: "K-DL-CH-002", label: "OCSF Schema", ext: "sql" },
              { id: "k-dl-ch-003", code: "K-DL-CH-003", label: "TTL Cold Storage", ext: "md" },
              { id: "k-dl-ch-004", code: "K-DL-CH-004", label: "Agent Decision History", ext: "sql" },
              { id: "k-dl-ch-005", code: "K-DL-CH-005", label: "Arrow Bulk Insert", ext: "md" },
            ],
          },
          {
            id: "k-dl-pg",
            code: "K-DL-PG",
            label: "PostgreSQL",
            files: [
              { id: "k-dl-pg-001", code: "K-DL-PG-001", label: "UAR Asset Table", ext: "sql" },
              { id: "k-dl-pg-002", code: "K-DL-PG-002", label: "RLS Policies", ext: "sql" },
              { id: "k-dl-pg-003", code: "K-DL-PG-003", label: "Contract Rate Tables", ext: "sql" },
              { id: "k-dl-pg-004", code: "K-DL-PG-004", label: "OSCAL Ingestion", ext: "sql" },
              { id: "k-dl-pg-005", code: "K-DL-PG-005", label: "Atlas Schema HCL", ext: "hcl" },
            ],
          },
          {
            id: "k-dl-mig",
            code: "K-DL-MIG",
            label: "Migrations",
            files: [
              { id: "k-dl-mig-001", code: "K-DL-MIG-001", label: "golang-migrate Setup", ext: "md" },
              { id: "k-dl-mig-002", code: "K-DL-MIG-002", label: "Liquibase K8s", ext: "yaml" },
              { id: "k-dl-mig-003", code: "K-DL-MIG-003", label: "Atlas CI Sync", ext: "md" },
            ],
          },
          {
            id: "k-dl-duck",
            code: "K-DL-DUCK",
            label: "DuckDB",
            files: [
              { id: "k-dl-duck-001", code: "K-DL-DUCK-001", label: "Embedded Analytics", ext: "md" },
              { id: "k-dl-duck-002", code: "K-DL-DUCK-002", label: "ML Feature Compute", ext: "sql" },
            ],
          },
        ],
      },
      {
        id: "k-mb",
        code: "K-MB",
        label: "Message Bus",
        files: [
          { id: "k-mb-001", code: "K-MB-001", label: "NATS Cluster", ext: "yaml" },
          { id: "k-mb-002", code: "K-MB-002", label: "JetStream Config", ext: "md" },
          { id: "k-mb-003", code: "K-MB-003", label: "mTLS Cert Rotation", ext: "md" },
          { id: "k-mb-004", code: "K-MB-004", label: "ZeroMQ IPC", ext: "md" },
        ],
        subGroups: [
          {
            id: "k-mb-sub",
            code: "K-MB-SUB",
            label: "Subject Mapping",
            files: [
              { id: "k-mb-sub-001", code: "K-MB-SUB-001", label: "edr.process.v1", ext: "md" },
              { id: "k-mb-sub-002", code: "K-MB-SUB-002", label: "edr.file.v1", ext: "md" },
              { id: "k-mb-sub-003", code: "K-MB-SUB-003", label: "ndr.flow.v1", ext: "md" },
              { id: "k-mb-sub-004", code: "K-MB-SUB-004", label: "ndr.beacon.v1", ext: "md" },
              { id: "k-mb-sub-005", code: "K-MB-SUB-005", label: "itdr.auth.v1", ext: "md" },
              { id: "k-mb-sub-006", code: "K-MB-SUB-006", label: "vdr.vuln.v1", ext: "md" },
              { id: "k-mb-sub-007", code: "K-MB-SUB-007", label: "grc.drift.v1", ext: "md" },
              { id: "k-mb-sub-008", code: "K-MB-SUB-008", label: "svc.ticket.v1", ext: "md" },
              { id: "k-mb-sub-009", code: "K-MB-SUB-009", label: "billing.usage.v1", ext: "md" },
              { id: "k-mb-sub-010", code: "K-MB-SUB-010", label: "health.score.v1", ext: "md" },
              { id: "k-mb-sub-011", code: "K-MB-SUB-011", label: "ti.ioc.v1", ext: "md" },
              { id: "k-mb-sub-012", code: "K-MB-SUB-012", label: "comm.alert.v1", ext: "md" },
              { id: "k-mb-sub-013", code: "K-MB-SUB-013", label: "security.alert.v1", ext: "md" },
              { id: "k-mb-sub-014", code: "K-MB-SUB-014", label: "remediation.task.v1", ext: "md" },
              { id: "k-mb-sub-015", code: "K-MB-SUB-015", label: "asset.provisioned.v1", ext: "md" },
            ],
          },
        ],
      },
      {
        id: "k-sec",
        code: "K-SEC",
        label: "Security Root",
        files: [
          { id: "k-sec-001", code: "K-SEC-001", label: "HashiCorp Vault", ext: "md" },
          { id: "k-sec-002", code: "K-SEC-002", label: "TPM Root of Trust", ext: "md" },
          { id: "k-sec-003", code: "K-SEC-003", label: "Blake3 Fingerprint", ext: "go" },
          { id: "k-sec-004", code: "K-SEC-004", label: "CA Setup", ext: "md" },
          { id: "k-sec-005", code: "K-SEC-005", label: "Vault Policies", ext: "hcl" },
          { id: "k-sec-006", code: "K-SEC-006", label: "Vault K8s Auth", ext: "go" },
        ],
      },
    ],
  },
  {
    id: "k-vendor-00",
    code: "K-VENDOR-00",
    label: "Detection Assets",
    color: "#f97316",
    children: [
      { id: "k-vendor-sigma", code: "K-VENDOR-SIGMA", label: "Sigma — Apache 2.0", files: [
        { id: "k-vendor-sig-001", code: "K-VENDOR-SIG-001", label: "Index", ext: "md" },
        { id: "k-vendor-sig-002", code: "K-VENDOR-SIG-002", label: "Windows Builtin", ext: "md" },
        { id: "k-vendor-sig-003", code: "K-VENDOR-SIG-003", label: "Cloud Rules", ext: "md" },
        { id: "k-vendor-sig-004", code: "K-VENDOR-SIG-004", label: "SaaS Rules", ext: "md" },
        { id: "k-vendor-sig-005", code: "K-VENDOR-SIG-005", label: "Hunting Rules", ext: "md" },
      ]},
      { id: "k-vendor-suricata", code: "K-VENDOR-SURICATA", label: "Suricata — GPL 2.0 data", files: [
        { id: "k-vendor-sur-001", code: "K-VENDOR-SUR-001", label: "Index", ext: "md" },
        { id: "k-vendor-sur-002", code: "K-VENDOR-SUR-002", label: "Emerging Malware", ext: "md" },
        { id: "k-vendor-sur-003", code: "K-VENDOR-SUR-003", label: "Emerging C2", ext: "md" },
        { id: "k-vendor-sur-004", code: "K-VENDOR-SUR-004", label: "Emerging Web", ext: "md" },
        { id: "k-vendor-sur-005", code: "K-VENDOR-SUR-005", label: "Emerging Data", ext: "md" },
      ]},
      { id: "k-vendor-yara", code: "K-VENDOR-YARA", label: "YARA — BSD-3 data", files: [
        { id: "k-vendor-yar-001", code: "K-VENDOR-YAR-001", label: "Index", ext: "md" },
        { id: "k-vendor-yar-002", code: "K-VENDOR-YAR-002", label: "Malware Sigs", ext: "md" },
        { id: "k-vendor-yar-003", code: "K-VENDOR-YAR-003", label: "PII Rules", ext: "md" },
      ]},
      { id: "k-vendor-misp", code: "K-VENDOR-MISP", label: "MISP — CC0 embed freely", files: [
        { id: "k-vendor-misp-001", code: "K-VENDOR-MISP-001", label: "Index", ext: "md" },
        { id: "k-vendor-misp-002", code: "K-VENDOR-MISP-002", label: "Taxonomies", ext: "md" },
        { id: "k-vendor-misp-003", code: "K-VENDOR-MISP-003", label: "Galaxies", ext: "md" },
        { id: "k-vendor-misp-004", code: "K-VENDOR-MISP-004", label: "Warninglists", ext: "md" },
        { id: "k-vendor-misp-005", code: "K-VENDOR-MISP-005", label: "Objects", ext: "md" },
      ]},
      { id: "k-vendor-mitre", code: "K-VENDOR-MITRE", label: "MITRE — CC BY 4.0", files: [
        { id: "k-vendor-mit-001", code: "K-VENDOR-MIT-001", label: "Index", ext: "md" },
        { id: "k-vendor-mit-002", code: "K-VENDOR-MIT-002", label: "Enterprise ATT&CK", ext: "md" },
        { id: "k-vendor-mit-003", code: "K-VENDOR-MIT-003", label: "CWE STIX2", ext: "md" },
        { id: "k-vendor-mit-004", code: "K-VENDOR-MIT-004", label: "CAPEC STIX2", ext: "md" },
      ]},
      { id: "k-vendor-oscal", code: "K-VENDOR-OSCAL", label: "OSCAL — Public Domain", files: [
        { id: "k-vendor-osc-001", code: "K-VENDOR-OSC-001", label: "Index", ext: "md" },
        { id: "k-vendor-osc-002", code: "K-VENDOR-OSC-002", label: "NIST 800-53", ext: "md" },
        { id: "k-vendor-osc-003", code: "K-VENDOR-OSC-003", label: "PCI DSS", ext: "md" },
        { id: "k-vendor-osc-004", code: "K-VENDOR-OSC-004", label: "ISO 27001", ext: "md" },
        { id: "k-vendor-osc-005", code: "K-VENDOR-OSC-005", label: "SOC 2", ext: "md" },
      ]},
      { id: "k-vendor-nuclei", code: "K-VENDOR-NUCLEI", label: "Nuclei — MIT copy freely", files: [
        { id: "k-vendor-nuc-001", code: "K-VENDOR-NUC-001", label: "Index", ext: "md" },
        { id: "k-vendor-nuc-002", code: "K-VENDOR-NUC-002", label: "CVE Templates", ext: "md" },
        { id: "k-vendor-nuc-003", code: "K-VENDOR-NUC-003", label: "Cloud Templates", ext: "md" },
        { id: "k-vendor-nuc-004", code: "K-VENDOR-NUC-004", label: "HTTP API Templates", ext: "md" },
        { id: "k-vendor-nuc-005", code: "K-VENDOR-NUC-005", label: "SaaS Templates", ext: "md" },
      ]},
      { id: "k-vendor-velociraptor", code: "K-VENDOR-VELOCIRAPTOR", label: "Velociraptor — AGPL data", files: [
        { id: "k-vendor-vel-001", code: "K-VENDOR-VEL-001", label: "Index", ext: "md" },
        { id: "k-vendor-vel-002", code: "K-VENDOR-VEL-002", label: "Threat Hunting", ext: "md" },
        { id: "k-vendor-vel-003", code: "K-VENDOR-VEL-003", label: "Forensic Artifacts", ext: "md" },
        { id: "k-vendor-vel-004", code: "K-VENDOR-VEL-004", label: "License Boundary", ext: "md" },
      ]},
      { id: "k-vendor-falco", code: "K-VENDOR-FALCO", label: "Falco — Apache 2.0", files: [
        { id: "k-vendor-fal-001", code: "K-VENDOR-FAL-001", label: "Index", ext: "md" },
        { id: "k-vendor-fal-002", code: "K-VENDOR-FAL-002", label: "Falco Rules", ext: "md" },
        { id: "k-vendor-fal-003", code: "K-VENDOR-FAL-003", label: "K8s Rules", ext: "md" },
      ]},
      { id: "k-vendor-bloodhound", code: "K-VENDOR-BLOODHOUND", label: "BloodHound — Apache 2.0", files: [
        { id: "k-vendor-bh-001", code: "K-VENDOR-BH-001", label: "Index", ext: "md" },
        { id: "k-vendor-bh-002", code: "K-VENDOR-BH-002", label: "Windows Cypher", ext: "md" },
        { id: "k-vendor-bh-003", code: "K-VENDOR-BH-003", label: "Azure Cypher", ext: "md" },
      ]},
      { id: "k-vendor-wazuh", code: "K-VENDOR-WAZUH", label: "Wazuh — GPL 2.0 data", files: [
        { id: "k-vendor-waz-001", code: "K-VENDOR-WAZ-001", label: "Index", ext: "md" },
        { id: "k-vendor-waz-002", code: "K-VENDOR-WAZ-002", label: "Process Rules", ext: "md" },
        { id: "k-vendor-waz-003", code: "K-VENDOR-WAZ-003", label: "AD Rules", ext: "md" },
        { id: "k-vendor-waz-004", code: "K-VENDOR-WAZ-004", label: "SCA Rules", ext: "md" },
        { id: "k-vendor-waz-005", code: "K-VENDOR-WAZ-005", label: "License Boundary", ext: "md" },
      ]},
      { id: "k-vendor-zeek", code: "K-VENDOR-ZEEK", label: "Zeek — BSD-3 data", isNew: true, files: [
        { id: "k-vendor-zek-001", code: "K-VENDOR-ZEK-001", label: "Index", ext: "md" },
        { id: "k-vendor-zek-002", code: "K-VENDOR-ZEK-002", label: "Base Protocols", ext: "md" },
        { id: "k-vendor-zek-003", code: "K-VENDOR-ZEK-003", label: "Intel Framework", ext: "md" },
        { id: "k-vendor-zek-004", code: "K-VENDOR-ZEK-004", label: "HTTP Scripts", ext: "md" },
        { id: "k-vendor-zek-005", code: "K-VENDOR-ZEK-005", label: "JA3 TLS", ext: "md" },
      ]},
      { id: "k-vendor-osquery", code: "K-VENDOR-OSQUERY", label: "OSQuery — Apache 2.0", isNew: true, files: [
        { id: "k-vendor-osq-001", code: "K-VENDOR-OSQ-001", label: "Index", ext: "md" },
        { id: "k-vendor-osq-002", code: "K-VENDOR-OSQ-002", label: "Incident Response", ext: "md" },
        { id: "k-vendor-osq-003", code: "K-VENDOR-OSQ-003", label: "FIM Packs", ext: "md" },
      ]},
      { id: "k-vendor-thehive", code: "K-VENDOR-THEHIVE", label: "TheHive — AGPL schema data", isNew: true, files: [
        { id: "k-vendor-thv-001", code: "K-VENDOR-THV-001", label: "Index", ext: "md" },
        { id: "k-vendor-thv-002", code: "K-VENDOR-THV-002", label: "Case Schema", ext: "md" },
        { id: "k-vendor-thv-003", code: "K-VENDOR-THV-003", label: "Alert Schema", ext: "md" },
        { id: "k-vendor-thv-004", code: "K-VENDOR-THV-004", label: "License Boundary", ext: "md" },
      ]},
      { id: "k-vendor-shuffle", code: "K-VENDOR-SHUFFLE", label: "Shuffle — GPL 3.0 config data", isNew: true, files: [
        { id: "k-vendor-shf-001", code: "K-VENDOR-SHF-001", label: "Index", ext: "md" },
        { id: "k-vendor-shf-002", code: "K-VENDOR-SHF-002", label: "SOAR Workflows", ext: "md" },
        { id: "k-vendor-shf-003", code: "K-VENDOR-SHF-003", label: "License Boundary", ext: "md" },
      ]},
    ],
  },
  {
    id: "k-xro-02",
    code: "K-XRO-02",
    label: "Super Agent",
    color: "#22c55e",
    children: [
      {
        id: "k-xro-cs",
        code: "K-XRO-CS",
        label: "CoreSec",
        subGroups: [
          { id: "k-xro-cs-ebpf", code: "K-XRO-CS-EBPF", label: "eBPF", files: [
            { id: "k-xro-cs-ebpf-001", code: "K-XRO-CS-EBPF-001", label: "execve Hook", ext: "rs" },
            { id: "k-xro-cs-ebpf-002", code: "K-XRO-CS-EBPF-002", label: "openat2 Hook", ext: "rs" },
            { id: "k-xro-cs-ebpf-003", code: "K-XRO-CS-EBPF-003", label: "Map Pressure", ext: "rs" },
          ]},
          { id: "k-xro-cs-forensic", code: "K-XRO-CS-FORENSIC", label: "Forensic", files: [
            { id: "k-xro-cs-fr-001", code: "K-XRO-CS-FR-001", label: "Memory Snapshot", ext: "rs" },
          ]},
          { id: "k-xro-cs-sigma", code: "K-XRO-CS-SIGMA", label: "Sigma Eval", files: [
            { id: "k-xro-cs-sig-001", code: "K-XRO-CS-SIG-001", label: "Sigma Evaluator", ext: "rs" },
            { id: "k-xro-cs-sig-002", code: "K-XRO-CS-SIG-002", label: "OCSF Event Bridge", ext: "rs" },
          ]},
          { id: "k-xro-cs-ml", code: "K-XRO-CS-ML", label: "ML Inference", files: [
            { id: "k-xro-cs-ml-001", code: "K-XRO-CS-ML-001", label: "Candle Inference", ext: "rs" },
            { id: "k-xro-cs-ml-002", code: "K-XRO-CS-ML-002", label: "TinyLLaMA Loader", ext: "rs" },
          ]},
          { id: "k-xro-cs-yara", code: "K-XRO-CS-YARA", label: "YARA-X Scanner", isNew: true, files: [
            { id: "k-xro-cs-yar-001", code: "K-XRO-CS-YAR-001", label: "YARA Compiler", ext: "rs" },
            { id: "k-xro-cs-yar-002", code: "K-XRO-CS-YAR-002", label: "Malware Scanner", ext: "rs" },
          ]},
          { id: "k-xro-cs-fim", code: "K-XRO-CS-FIM", label: "File Integrity Monitor", isNew: true, files: [
            { id: "k-xro-cs-fim-001", code: "K-XRO-CS-FIM-001", label: "inotify Watcher", ext: "rs" },
            { id: "k-xro-cs-fim-002", code: "K-XRO-CS-FIM-002", label: "Blake3 Baseline", ext: "rs" },
          ]},
        ],
      },
      {
        id: "k-xro-ng",
        code: "K-XRO-NG",
        label: "NetGuard",
        subGroups: [
          { id: "k-xro-ng-pcap", code: "K-XRO-NG-PCAP", label: "PCAP", files: [
            { id: "k-xro-ng-pcap-001", code: "K-XRO-NG-PCAP-001", label: "Flow Analyzer", ext: "rs" },
            { id: "k-xro-ng-pcap-002", code: "K-XRO-NG-PCAP-002", label: "TLS SNI", ext: "rs" },
            { id: "k-xro-ng-pcap-003", code: "K-XRO-NG-PCAP-003", label: "AF Packet Ring", ext: "rs" },
            { id: "k-xro-ng-pcap-004", code: "K-XRO-NG-PCAP-004", label: "DPDK Bypass", ext: "rs" },
          ]},
          { id: "k-xro-ng-rita", code: "K-XRO-NG-RITA", label: "RITA Beacon/Flow/DNS", isNew: true, files: [
            { id: "k-xro-ng-rita-001", code: "K-XRO-NG-RITA-001", label: "Beacon Detector", ext: "go" },
            { id: "k-xro-ng-rita-002", code: "K-XRO-NG-RITA-002", label: "DNS Tunnel", ext: "go" },
            { id: "k-xro-ng-rita-003", code: "K-XRO-NG-RITA-003", label: "Exfil Detector", ext: "go" },
          ]},
          { id: "k-xro-ng-ids", code: "K-XRO-NG-IDS", label: "Suricata Rule Loader", isNew: true, files: [
            { id: "k-xro-ng-ids-001", code: "K-XRO-NG-IDS-001", label: "Rule Loader", ext: "rs" },
            { id: "k-xro-ng-ids-002", code: "K-XRO-NG-IDS-002", label: "Alert Publisher", ext: "rs" },
          ]},
        ],
      },
      {
        id: "k-xro-pt",
        code: "K-XRO-PT",
        label: "PerfTrace",
        files: [
          { id: "k-xro-pt-001", code: "K-XRO-PT-001", label: "Main", ext: "rs" },
          { id: "k-xro-pt-002", code: "K-XRO-PT-002", label: "Perf Event Open", ext: "rs" },
          { id: "k-xro-pt-003", code: "K-XRO-PT-003", label: "Prometheus", ext: "rs" },
          { id: "k-xro-pt-004", code: "K-XRO-PT-004", label: "OTel Collector", ext: "rs" },
          { id: "k-xro-pt-005", code: "K-XRO-PT-005", label: "Sysinfo Host Metrics", ext: "rs" },
        ],
      },
      {
        id: "k-xro-wd",
        code: "K-XRO-WD",
        label: "Watchdog",
        files: [
          { id: "k-xro-wd-001", code: "K-XRO-WD-001", label: "Agent Orchestrator", ext: "rs" },
          { id: "k-xro-wd-002", code: "K-XRO-WD-002", label: "Zstd Delta", ext: "go" },
          { id: "k-xro-wd-003", code: "K-XRO-WD-003", label: "Manifest Signer", ext: "go" },
          { id: "k-xro-wd-004", code: "K-XRO-WD-004", label: "Go TUF Updater", ext: "go" },
        ],
      },
    ],
  },
  {
    id: "k-kai-03",
    code: "K-KAI-03",
    label: "Orchestration",
    color: "#a855f7",
    children: [
      {
        id: "k-kai-cp",
        code: "K-KAI-CP",
        label: "CrewAI Personas",
        subGroups: [
          { id: "k-kai-triage", code: "K-KAI-TRIAGE", label: "KAI Triage", files: [
            { id: "k-kai-tr-001", code: "K-KAI-TR-001", label: "Triage Agent", ext: "py" },
            { id: "k-kai-tr-002", code: "K-KAI-TR-002", label: "Llama3 Reasoning", ext: "py" },
            { id: "k-kai-tr-003", code: "K-KAI-TR-003", label: "OCSF Analyzer", ext: "py" },
            { id: "k-kai-tr-004", code: "K-KAI-TR-004", label: "KISS Calculator", ext: "py" },
          ]},
          { id: "k-kai-house", code: "K-KAI-HOUSE", label: "Housekeeper", files: [
            { id: "k-kai-hs-001", code: "K-KAI-HS-001", label: "Housekeeper", ext: "py" },
            { id: "k-kai-hs-002", code: "K-KAI-HS-002", label: "Ansible Runner", ext: "py" },
            { id: "k-kai-hs-003", code: "K-KAI-HS-003", label: "Criticality Check", ext: "py" },
            { id: "k-kai-hs-004", code: "K-KAI-HS-004", label: "Rollback", ext: "py" },
          ]},
          { id: "k-kai-bill", code: "K-KAI-BILL", label: "Billing Clerk", files: [
            { id: "k-kai-bl-001", code: "K-KAI-BL-001", label: "Billing Clerk", ext: "py" },
            { id: "k-kai-bl-002", code: "K-KAI-BL-002", label: "ClickHouse Audit", ext: "py" },
            { id: "k-kai-bl-003", code: "K-KAI-BL-003", label: "HLE Calculator", ext: "py" },
            { id: "k-kai-bl-004", code: "K-KAI-BL-004", label: "Invoice Renderer", ext: "py" },
          ]},
          { id: "k-kai-sentinel", code: "K-KAI-SENTINEL", label: "Sentinel", files: [
            { id: "k-kai-sen-001", code: "K-KAI-SEN-001", label: "Health Score Publisher", ext: "py" },
            { id: "k-kai-sen-002", code: "K-KAI-SEN-002", label: "Churn Risk Model", ext: "py" },
            { id: "k-kai-sen-003", code: "K-KAI-SEN-003", label: "HIBP Credential Score", ext: "py" },
          ]},
          { id: "k-kai-risk", code: "K-KAI-RISK", label: "Risk Quantification", isNew: true, files: [
            { id: "k-kai-risk-001", code: "K-KAI-RISK-001", label: "PyFair Model", ext: "py" },
            { id: "k-kai-risk-002", code: "K-KAI-RISK-002", label: "EPSS Scorer", ext: "py" },
            { id: "k-kai-risk-003", code: "K-KAI-RISK-003", label: "SSVC Decision", ext: "py" },
          ]},
        ],
      },
      {
        id: "k-kai-wf",
        code: "K-KAI-WF",
        label: "Workflow",
        subGroups: [
          { id: "k-kai-wf-n8n", code: "K-KAI-WF-n8n", label: "n8n Workflows", files: [
            { id: "k-kai-wf-n8n-001", code: "K-KAI-WF-n8n-001", label: "Security Triage", ext: "json" },
            { id: "k-kai-wf-n8n-002", code: "K-KAI-WF-n8n-002", label: "Drift Housekeeper", ext: "json" },
            { id: "k-kai-wf-n8n-003", code: "K-KAI-WF-n8n-003", label: "Heartbeat Billing", ext: "json" },
          ]},
          { id: "k-kai-wf-temporal", code: "K-KAI-WF-TEMP", label: "Temporal", files: [
            { id: "k-kai-wf-temp-001", code: "K-KAI-WF-TEMP-001", label: "Patch Workflow", ext: "go" },
            { id: "k-kai-wf-temp-002", code: "K-KAI-WF-TEMP-002", label: "Retry State", ext: "go" },
          ]},
        ],
      },
      {
        id: "k-kai-rag",
        code: "K-KAI-RAG",
        label: "RAG / Embeddings",
        files: [
          { id: "k-kai-rag-001", code: "K-KAI-RAG-001", label: "Vector Search", ext: "sql" },
          { id: "k-kai-rag-002", code: "K-KAI-RAG-002", label: "OSCAL Embeddings", ext: "py" },
          { id: "k-kai-rag-003", code: "K-KAI-RAG-003", label: "CISO Assistant", ext: "py" },
          { id: "k-kai-rag-004", code: "K-KAI-RAG-004", label: "Cohere Embeddings", ext: "py" },
        ],
      },
      {
        id: "k-kai-ml",
        code: "K-KAI-ML",
        label: "ML & Model Serving",
        files: [
          { id: "k-kai-ml-001", code: "K-KAI-ML-001", label: "TensorBoard Logger", ext: "py" },
          { id: "k-kai-ml-002", code: "K-KAI-ML-002", label: "ClearML Experiment", ext: "py" },
          { id: "k-kai-ml-003", code: "K-KAI-ML-003", label: "PySpark Distributed", ext: "py" },
          { id: "k-kai-ml-008", code: "K-KAI-ML-008", label: "EMBER XGBoost", ext: "py" },
          { id: "k-kai-ml-009", code: "K-KAI-ML-009", label: "UNSW-NB15 Random Forest", ext: "py" },
          { id: "k-kai-ml-010", code: "K-KAI-ML-010", label: "Mordor LSTM Baseline", ext: "py" },
          { id: "k-kai-ml-011", code: "K-KAI-ML-011", label: "vLLM Server", ext: "py", isNew: true },
          { id: "k-kai-ml-012", code: "K-KAI-ML-012", label: "Model Tiering Strategy", ext: "md", isNew: true },
        ],
      },
    ],
  },
  {
    id: "k-soc-04",
    code: "K-SOC-04",
    label: "Security",
    color: "#ef4444",
    children: [
      {
        id: "k-soc-det",
        code: "K-SOC-DET",
        label: "Detection",
        files: [
          { id: "k-soc-det-001", code: "K-SOC-DET-001", label: "Sigma Compiler", ext: "go" },
          { id: "k-soc-det-002", code: "K-SOC-DET-002", label: "Sigma Sync", ext: "py" },
          { id: "k-soc-det-003", code: "K-SOC-DET-003", label: "MITRE Mapper", ext: "py" },
          { id: "k-soc-det-004", code: "K-SOC-DET-004", label: "YARA Integration", ext: "md" },
          { id: "k-soc-det-005", code: "K-SOC-DET-005", label: "Suricata Rules", ext: "md" },
          { id: "k-soc-det-006", code: "K-SOC-DET-006", label: "Custom Detections", ext: "md" },
          { id: "k-soc-det-007", code: "K-SOC-DET-007", label: "Sigma Rust Eval", ext: "md" },
          { id: "k-soc-det-008", code: "K-SOC-DET-008", label: "Tetragon K8s eBPF", ext: "md" },
          { id: "k-soc-det-009", code: "K-SOC-DET-009", label: "Zeek Subprocess", ext: "md" },
        ],
      },
      {
        id: "k-soc-ti",
        code: "K-SOC-TI",
        label: "Threat Intelligence",
        files: [
          { id: "k-soc-ti-001", code: "K-SOC-TI-001", label: "OTX Puller", ext: "py" },
          { id: "k-soc-ti-002", code: "K-SOC-TI-002", label: "AbuseIPDB", ext: "py" },
          { id: "k-soc-ti-003", code: "K-SOC-TI-003", label: "MalwareBazaar", ext: "py" },
          { id: "k-soc-ti-004", code: "K-SOC-TI-004", label: "PhishingTank", ext: "py" },
          { id: "k-soc-ti-005", code: "K-SOC-TI-005", label: "HIBP", ext: "md" },
          { id: "k-soc-ti-006", code: "K-SOC-TI-006", label: "CISA KEV", ext: "md" },
          { id: "k-soc-ti-007", code: "K-SOC-TI-007", label: "STIX2 Parser", ext: "py" },
          { id: "k-soc-ti-008", code: "K-SOC-TI-008", label: "STIX2 Validator", ext: "py" },
          { id: "k-soc-ti-013", code: "K-SOC-TI-013", label: "MISP PyMISP Client", ext: "py" },
          { id: "k-soc-ti-015", code: "K-SOC-TI-015", label: "IPSum Blocklist", ext: "py", isNew: true },
        ],
      },
      {
        id: "k-soc-vuln",
        code: "K-SOC-VULN",
        label: "Vulnerability",
        files: [
          { id: "k-soc-vuln-001", code: "K-SOC-VULN-001", label: "Nuclei Engine", ext: "go" },
          { id: "k-soc-vuln-002", code: "K-SOC-VULN-002", label: "EPSS Worker", ext: "py" },
          { id: "k-soc-vuln-003", code: "K-SOC-VULN-003", label: "CVE Priority", ext: "sql" },
          { id: "k-soc-vuln-004", code: "K-SOC-VULN-004", label: "Trivy Scanner", ext: "go" },
          { id: "k-soc-vuln-005", code: "K-SOC-VULN-005", label: "Grype DB", ext: "go" },
          { id: "k-soc-vuln-010", code: "K-SOC-VULN-010", label: "SSVC Decision Tree", ext: "py", isNew: true },
          { id: "k-soc-vuln-011", code: "K-SOC-VULN-011", label: "NVD API Puller", ext: "go", isNew: true },
        ],
      },
      {
        id: "k-soc-id",
        code: "K-SOC-ID",
        label: "Identity",
        files: [
          { id: "k-soc-id-001", code: "K-SOC-ID-001", label: "BloodHound Analysis", ext: "go" },
          { id: "k-soc-id-002", code: "K-SOC-ID-002", label: "Neo4j Graph", ext: "go" },
          { id: "k-soc-id-003", code: "K-SOC-ID-003", label: "Cypher AD Paths", ext: "md" },
          { id: "k-soc-id-004", code: "K-SOC-ID-004", label: "Azure OAuth Queries", ext: "md" },
        ],
      },
    ],
  },
  {
    id: "k-noc-05",
    code: "K-NOC-05",
    label: "Operations",
    color: "#14b8a6",
    children: [
      {
        id: "k-noc-cm",
        code: "K-NOC-CM",
        label: "Config Management",
        subGroups: [
          { id: "k-noc-cm-ansible", code: "K-NOC-CM-ANS", label: "Ansible", files: [
            { id: "k-noc-cm-ans-001", code: "K-NOC-CM-ANS-001", label: "Isolate Host", ext: "yml" },
            { id: "k-noc-cm-ans-002", code: "K-NOC-CM-ANS-002", label: "Patch CVE", ext: "yml" },
            { id: "k-noc-cm-ans-003", code: "K-NOC-CM-ANS-003", label: "Restart Service", ext: "yml" },
            { id: "k-noc-cm-ans-004", code: "K-NOC-CM-ANS-004", label: "Rollback", ext: "yml" },
          ]},
          { id: "k-noc-cm-saltstack", code: "K-NOC-CM-SALT", label: "SaltStack", isNew: true, files: [
            { id: "k-noc-cm-salt-001", code: "K-NOC-CM-SALT-001", label: "Reactor Setup", ext: "md" },
            { id: "k-noc-cm-salt-002", code: "K-NOC-CM-SALT-002", label: "State Apply", ext: "py" },
            { id: "k-noc-cm-salt-003", code: "K-NOC-CM-SALT-003", label: "SLS Templates", ext: "md" },
          ]},
        ],
        files: [
          { id: "k-noc-cm-001", code: "K-NOC-CM-001", label: "OSQuery Drift", ext: "go" },
          { id: "k-noc-cm-002", code: "K-NOC-CM-002", label: "Desired State", ext: "md" },
          { id: "k-noc-cm-003", code: "K-NOC-CM-003", label: "SaltStack Reactor", ext: "md" },
          { id: "k-noc-cm-004", code: "K-NOC-CM-004", label: "Rudder Drift", ext: "md", isNew: true },
        ],
      },
      {
        id: "k-noc-br",
        code: "K-NOC-BR",
        label: "Backup & DR",
        files: [
          { id: "k-noc-br-001", code: "K-NOC-BR-001", label: "Restic Scheduler", ext: "go" },
          { id: "k-noc-br-002", code: "K-NOC-BR-002", label: "Kopia Snapshots", ext: "go" },
          { id: "k-noc-br-003", code: "K-NOC-BR-003", label: "S3 Cold Lifecycle", ext: "go" },
          { id: "k-noc-br-005", code: "K-NOC-BR-005", label: "Velero Backup", ext: "go" },
          { id: "k-noc-br-006", code: "K-NOC-BR-006", label: "Velero Restore", ext: "go" },
          { id: "k-noc-br-009", code: "K-NOC-BR-009", label: "Bareos Config", ext: "md", isNew: true },
        ],
      },
      {
        id: "k-noc-inv",
        code: "K-NOC-INV",
        label: "Inventory",
        files: [
          { id: "k-noc-inv-001", code: "K-NOC-INV-001", label: "OSQuery Go SDK", ext: "go" },
          { id: "k-noc-inv-002", code: "K-NOC-INV-002", label: "FleetDM Policies", ext: "go" },
          { id: "k-noc-inv-003", code: "K-NOC-INV-003", label: "NetBox Topology", ext: "py" },
          { id: "k-noc-inv-004", code: "K-NOC-INV-004", label: "Docker SDK", ext: "go" },
        ],
      },
      {
        id: "k-noc-mdm",
        code: "K-NOC-MDM",
        label: "Mobile Device Management",
        files: [
          { id: "k-noc-mdm-001", code: "K-NOC-MDM-001", label: "MicroMDM iOS", ext: "go" },
          { id: "k-noc-mdm-002", code: "K-NOC-MDM-002", label: "Headwind Android", ext: "go" },
          { id: "k-noc-mdm-003", code: "K-NOC-MDM-003", label: "Android Enterprise", ext: "md" },
        ],
      },
    ],
  },
  {
    id: "k-psa-06",
    code: "K-PSA-06",
    label: "Business",
    color: "#eab308",
    children: [
      {
        id: "k-psa-itsm",
        code: "K-PSA-ITSM",
        label: "ITSM",
        files: [
          { id: "k-psa-itsm-001", code: "K-PSA-ITSM-001", label: "Ticket State", ext: "go" },
          { id: "k-psa-itsm-002", code: "K-PSA-ITSM-002", label: "SLA Tracker", ext: "go" },
          { id: "k-psa-itsm-003", code: "K-PSA-ITSM-003", label: "Service Desk", ext: "sql" },
          { id: "k-psa-itsm-004", code: "K-PSA-ITSM-004", label: "Multi Channel", ext: "md" },
          { id: "k-psa-itsm-005", code: "K-PSA-ITSM-005", label: "Zammad Bridge", ext: "go" },
        ],
      },
      {
        id: "k-psa-bill",
        code: "K-PSA-BILL",
        label: "Billing",
        files: [
          { id: "k-psa-bill-001", code: "K-PSA-BILL-001", label: "Usage Aggregator", ext: "go" },
          { id: "k-psa-bill-002", code: "K-PSA-BILL-002", label: "PDF Renderer", ext: "go" },
          { id: "k-psa-bill-003", code: "K-PSA-BILL-003", label: "HLE Constants", ext: "go" },
          { id: "k-psa-bill-004", code: "K-PSA-BILL-004", label: "Contract Rates", ext: "sql" },
          { id: "k-psa-bill-006", code: "K-PSA-BILL-006", label: "Stripe Payments", ext: "go" },
        ],
      },
      {
        id: "k-psa-ptl",
        code: "K-PSA-PTL",
        label: "Client Portal",
        subGroups: [
          { id: "k-psa-ptl-dash", code: "K-PSA-PTL-DASH", label: "Dashboard Components", files: [
            { id: "k-psa-ptl-dash-001", code: "K-PSA-PTL-DASH-001", label: "AssetCard", ext: "tsx" },
            { id: "k-psa-ptl-dash-002", code: "K-PSA-PTL-DASH-002", label: "DeploymentWizard", ext: "tsx" },
            { id: "k-psa-ptl-dash-003", code: "K-PSA-PTL-DASH-003", label: "ActionApproval", ext: "tsx" },
            { id: "k-psa-ptl-dash-004", code: "K-PSA-PTL-DASH-004", label: "KissScorecard", ext: "tsx" },
            { id: "k-psa-ptl-dash-005", code: "K-PSA-PTL-DASH-005", label: "RiskDashboard", ext: "tsx" },
            { id: "k-psa-ptl-dash-006", code: "K-PSA-PTL-DASH-006", label: "BillingChart", ext: "tsx" },
          ]},
        ],
        files: [
          { id: "k-psa-ptl-001", code: "K-PSA-PTL-001", label: "KISS Scorecard", ext: "md" },
          { id: "k-psa-ptl-002", code: "K-PSA-PTL-002", label: "White Label", ext: "md" },
          { id: "k-psa-ptl-003", code: "K-PSA-PTL-003", label: "Reasoning Playback", ext: "md" },
        ],
      },
    ],
  },
  {
    id: "k-grc-07",
    code: "K-GRC-07",
    label: "Compliance",
    color: "#06b6d4",
    children: [
      {
        id: "k-grc-oscal",
        code: "K-GRC-OSCAL",
        label: "OSCAL",
        files: [
          { id: "k-grc-oscal-001", code: "K-GRC-OSCAL-001", label: "NIST Ingest", ext: "py" },
          { id: "k-grc-oscal-002", code: "K-GRC-OSCAL-002", label: "SOC2 Mapper", ext: "py" },
          { id: "k-grc-oscal-003", code: "K-GRC-OSCAL-003", label: "ISO Mapping", ext: "sql" },
          { id: "k-grc-oscal-004", code: "K-GRC-OSCAL-004", label: "Compliance Trestle", ext: "py" },
          { id: "k-grc-oscal-005", code: "K-GRC-OSCAL-005", label: "RegScale Ingest", ext: "py" },
        ],
      },
      {
        id: "k-grc-ev",
        code: "K-GRC-EV",
        label: "Evidence Vault",
        files: [
          { id: "k-grc-ev-001", code: "K-GRC-EV-001", label: "Immutable Audit", ext: "sql" },
          { id: "k-grc-ev-002", code: "K-GRC-EV-002", label: "Blake3 Signer", ext: "go" },
          { id: "k-grc-ev-003", code: "K-GRC-EV-003", label: "Legal Hold", ext: "md" },
          { id: "k-grc-ev-004", code: "K-GRC-EV-004", label: "Evidence Export", ext: "md" },
        ],
      },
      {
        id: "k-grc-scs",
        code: "K-GRC-SCS",
        label: "Supply Chain Security",
        files: [
          { id: "k-grc-scs-001", code: "K-GRC-SCS-001", label: "SBOM Syft", ext: "go" },
          { id: "k-grc-scs-002", code: "K-GRC-SCS-002", label: "Grype Scanner", ext: "py" },
          { id: "k-grc-scs-003", code: "K-GRC-SCS-003", label: "OpenSSF Scorecard", ext: "md" },
          { id: "k-grc-scs-008", code: "K-GRC-SCS-008", label: "CycloneDX SBOM", ext: "py", isNew: true },
        ],
      },
      {
        id: "k-grc-fw",
        code: "K-GRC-FW",
        label: "Frameworks",
        files: [
          { id: "k-grc-fw-001", code: "K-GRC-FW-001", label: "NIST 800-53 OSCAL", ext: "md" },
          { id: "k-grc-fw-002", code: "K-GRC-FW-002", label: "PCI DSS OSCAL", ext: "md" },
          { id: "k-grc-fw-003", code: "K-GRC-FW-003", label: "ISO 27001 OSCAL", ext: "md" },
          { id: "k-grc-fw-004", code: "K-GRC-FW-004", label: "SOC2 OSCAL", ext: "md" },
        ],
      },
    ],
  },
  {
    id: "k-map-11",
    code: "K-MAP-11",
    label: "DR Module Mapping",
    color: "#f97316",
    children: [
      {
        id: "k-map-index",
        code: "K-MAP",
        label: "Module Index",
        files: [
          { id: "k-map-000", code: "K-MAP-000", label: "Master Index", ext: "md" },
          { id: "k-map-001", code: "K-MAP-001", label: "EDR — Endpoint", ext: "md" },
          { id: "k-map-002", code: "K-MAP-002", label: "ITDR — Identity", ext: "md" },
          { id: "k-map-003", code: "K-MAP-003", label: "NDR — Network", ext: "md" },
          { id: "k-map-004", code: "K-MAP-004", label: "CDR — Cloud", ext: "md" },
          { id: "k-map-005", code: "K-MAP-005", label: "SDR — SaaS", ext: "md" },
          { id: "k-map-006", code: "K-MAP-006", label: "ADR — Application", ext: "md" },
          { id: "k-map-007", code: "K-MAP-007", label: "DDR — Data", ext: "md" },
          { id: "k-map-008", code: "K-MAP-008", label: "VDR — Vulnerability", ext: "md" },
          { id: "k-map-009", code: "K-MAP-009", label: "MDR — Managed", ext: "md" },
          { id: "k-map-010", code: "K-MAP-010", label: "TI — Threat Intel", ext: "md" },
          { id: "k-map-011", code: "K-MAP-011", label: "CFDR — Config Drift", ext: "md" },
          { id: "k-map-012", code: "K-MAP-012", label: "BDR — Backup DR", ext: "md" },
          { id: "k-map-013", code: "K-MAP-013", label: "NPM — Network Perf", ext: "md" },
          { id: "k-map-014", code: "K-MAP-014", label: "UEM — Endpoint Mgmt", ext: "md" },
          { id: "k-map-015", code: "K-MAP-015", label: "MDM — Mobile", ext: "md" },
          { id: "k-map-016", code: "K-MAP-016", label: "APM — App Perf", ext: "md" },
          { id: "k-map-017", code: "K-MAP-017", label: "GRC — Governance", ext: "md" },
          { id: "k-map-018", code: "K-MAP-018", label: "KAI — AI Layer", ext: "md" },
          { id: "k-map-019", code: "K-MAP-019", label: "PSA — Business", ext: "md" },
          { id: "k-map-020", code: "K-MAP-020", label: "License Compliance", ext: "md" },
        ],
      },
    ],
  },
  {
    id: "k-deploy-12",
    code: "K-DEPLOY-12",
    label: "Deployment Topologies",
    color: "#22c55e",
    children: [
      {
        id: "k-deploy-small",
        code: "K-DEPLOY-SMALL",
        label: "Small (<100 endpoints)",
        files: [
          { id: "k-deploy-sm-001", code: "K-DEPLOY-SM-001", label: "docker-compose", ext: "yml" },
          { id: "k-deploy-sm-002", code: "K-DEPLOY-SM-002", label: "NATS Single", ext: "conf" },
        ],
      },
      {
        id: "k-deploy-medium",
        code: "K-DEPLOY-MEDIUM",
        label: "Medium (100-1000 endpoints)",
        files: [
          { id: "k-deploy-md-001", code: "K-DEPLOY-MD-001", label: "Kustomize Overlay", ext: "yaml" },
          { id: "k-deploy-md-002", code: "K-DEPLOY-MD-002", label: "Scale Config", ext: "yaml" },
        ],
      },
      {
        id: "k-deploy-large",
        code: "K-DEPLOY-LARGE",
        label: "Large (>1000, multi-region)",
        files: [
          { id: "k-deploy-lg-001", code: "K-DEPLOY-LG-001", label: "Terraform AWS EKS", ext: "tf" },
          { id: "k-deploy-lg-002", code: "K-DEPLOY-LG-002", label: "VPC Config", ext: "tf" },
          { id: "k-deploy-lg-003", code: "K-DEPLOY-LG-003", label: "Node Groups", ext: "tf" },
        ],
      },
    ],
  },
  {
    id: "k-dev-08",
    code: "K-DEV-08",
    label: "Development",
    color: "#8b5cf6",
    children: [
      {
        id: "k-dev-cicd",
        code: "K-DEV-CICD",
        label: "CI/CD",
        subGroups: [
          { id: "k-dev-cicd-gha", code: "K-DEV-CICD-GHA", label: "GitHub Actions", files: [
            { id: "k-dev-cicd-gha-001", code: "K-DEV-CICD-GHA-001", label: "Build Agents", ext: "yml" },
            { id: "k-dev-cicd-gha-002", code: "K-DEV-CICD-GHA-002", label: "Test API", ext: "yml" },
            { id: "k-dev-cicd-gha-003", code: "K-DEV-CICD-GHA-003", label: "Deploy K8s", ext: "yml" },
            { id: "k-dev-cicd-gha-009", code: "K-DEV-CICD-GHA-009", label: "Cosign Signing", ext: "sh" },
            { id: "k-dev-cicd-gha-010", code: "K-DEV-CICD-GHA-010", label: "Snyk Scan", ext: "sh" },
            { id: "k-dev-cicd-gha-011", code: "K-DEV-CICD-GHA-011", label: "SonarQube Scanner", ext: "sh" },
          ]},
        ],
      },
      {
        id: "k-dev-git",
        code: "K-DEV-GIT",
        label: "Git & Code Quality",
        files: [
          { id: "k-dev-git-001", code: "K-DEV-GIT-001", label: "Gitea Setup", ext: "md" },
          { id: "k-dev-git-002", code: "K-DEV-GIT-002", label: "Pre-commit", ext: "yaml" },
          { id: "k-dev-git-005", code: "K-DEV-GIT-005", label: "Ruff Config", ext: "toml" },
          { id: "k-dev-git-006", code: "K-DEV-GIT-006", label: "golangci-lint", ext: "yml" },
          { id: "k-dev-git-007", code: "K-DEV-GIT-007", label: "Clippy Config", ext: "toml" },
        ],
      },
      {
        id: "k-dev-test",
        code: "K-DEV-TEST",
        label: "Testing",
        files: [
          { id: "k-dev-test-001", code: "K-DEV-TEST-001", label: "k6 Load Test", ext: "js" },
          { id: "k-dev-test-002", code: "K-DEV-TEST-002", label: "Vegeta Attack", ext: "sh" },
          { id: "k-dev-test-004", code: "K-DEV-TEST-004", label: "Chaos Mesh", ext: "yaml" },
          { id: "k-dev-test-006", code: "K-DEV-TEST-006", label: "pytest-xdist Config", ext: "ini" },
        ],
      },
    ],
  },
  {
    id: "k-api-09",
    code: "K-API-09",
    label: "API Reference",
    color: "#ec4899",
    children: [
      {
        id: "k-api-openapi",
        code: "K-API-OPEN",
        label: "OpenAPI Specs",
        files: [
          { id: "k-api-open-001", code: "K-API-OPEN-001", label: "Provisioning API", ext: "yaml" },
          { id: "k-api-open-002", code: "K-API-OPEN-002", label: "Triage API", ext: "yaml" },
          { id: "k-api-open-003", code: "K-API-OPEN-003", label: "Billing API", ext: "yaml" },
          { id: "k-api-open-004", code: "K-API-OPEN-004", label: "VDR Scan API", ext: "yaml" },
          { id: "k-api-open-005", code: "K-API-OPEN-005", label: "GRC Compliance API", ext: "yaml" },
          { id: "k-api-open-006", code: "K-API-OPEN-006", label: "Identity Graph API", ext: "yaml" },
          { id: "k-api-open-007", code: "K-API-OPEN-007", label: "NDR Flow API", ext: "yaml" },
          { id: "k-api-open-008", code: "K-API-OPEN-008", label: "Health Endpoint", ext: "yaml", isNew: true },
          { id: "k-api-open-009", code: "K-API-OPEN-009", label: "Alerts Endpoint", ext: "yaml", isNew: true },
        ],
      },
      {
        id: "k-api-pb",
        code: "K-API-PB",
        label: "Protobuf Schemas",
        files: [
          { id: "k-api-pb-001", code: "K-API-PB-001", label: "OCSF Schema", ext: "proto" },
          { id: "k-api-pb-002", code: "K-API-PB-002", label: "Build RS", ext: "rs" },
          { id: "k-api-pb-003", code: "K-API-PB-003", label: "OCSF Deploy", ext: "proto", isNew: true },
        ],
      },
      {
        id: "k-api-nats",
        code: "K-API-NATS",
        label: "NATS Subjects",
        files: [
          { id: "k-api-nats-001", code: "K-API-NATS-001", label: "Subject Hierarchy", ext: "md" },
        ],
      },
    ],
  },
  {
    id: "k-itil-10",
    code: "K-ITIL-10",
    label: "ITIL Matrix",
    color: "#6366f1",
    children: [
      {
        id: "k-itil-matrix",
        code: "K-ITIL-MAT",
        label: "Practice Map",
        files: [
          { id: "k-itil-mat-001", code: "K-ITIL-MAT-001", label: "GMP1 Strategy", ext: "md" },
          { id: "k-itil-mat-002", code: "K-ITIL-MAT-002", label: "GMP5 Risk", ext: "md" },
          { id: "k-itil-mat-003", code: "K-ITIL-MAT-003", label: "GMP6 InfoSec", ext: "md" },
          { id: "k-itil-mat-004", code: "K-ITIL-MAT-004", label: "SMP1 Incident", ext: "md" },
          { id: "k-itil-mat-005", code: "K-ITIL-MAT-005", label: "SMP10 Change", ext: "md" },
          { id: "k-itil-mat-006", code: "K-ITIL-MAT-006", label: "SMP12 Deployment", ext: "md" },
          { id: "k-itil-mat-007", code: "K-ITIL-MAT-007", label: "TMP2 Infrastructure", ext: "md" },
          { id: "k-itil-mat-008", code: "K-ITIL-MAT-008", label: "SMP3 Problem", ext: "md", isNew: true },
          { id: "k-itil-mat-009", code: "K-ITIL-MAT-009", label: "SMP7 Service Level", ext: "md", isNew: true },
        ],
      },
      {
        id: "k-itil-audit",
        code: "K-ITIL-AUD",
        label: "Audit Readiness",
        files: [
          { id: "k-itil-aud-001", code: "K-ITIL-AUD-001", label: "KIC Evidence Map", ext: "md" },
          { id: "k-itil-aud-002", code: "K-ITIL-AUD-002", label: "SOC2/ISO Crosswalk", ext: "csv" },
        ],
      },
    ],
  },
];

export const getExtColor = (ext?: string): string => {
  if (!ext) return "text-muted-foreground";
  if (["rs"].includes(ext)) return "text-orange-500";
  if (["go"].includes(ext)) return "text-cyan-500";
  if (["py"].includes(ext)) return "text-yellow-500";
  if (["ts", "tsx"].includes(ext)) return "text-blue-400";
  if (["yaml", "yml"].includes(ext)) return "text-purple-400";
  if (["sql"].includes(ext)) return "text-green-400";
  if (["json"].includes(ext)) return "text-amber-400";
  if (["md"].includes(ext)) return "text-slate-400";
  if (["sh"].includes(ext)) return "text-emerald-400";
  if (["toml"].includes(ext)) return "text-red-400";
  return "text-muted-foreground";
};
