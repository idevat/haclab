export type LibClusterCommands = {
  "resource-group-add": {
    group_id: string;
    resource_id_list: string[];
    adjacent_resource_id?: string | null;
    put_after_adjacent?: boolean;
  };
  "resource-enable": {
    resource_or_tag_ids: string[];
  };
  "resource-disable": {
    resource_or_tag_ids: string[];
  };
  "resource-unmanage": {
    resource_or_tag_ids: string[];
  };
  "resource-manage": {
    resource_or_tag_ids: string[];
  };
  "resource-create": {
    resource_id: string;
    resource_agent_name: string;
    operation_list: Record<string, string>[];
    meta_attributes: Record<string, string>;
    instance_attributes: Record<string, string>;
    allow_absent_agent?: boolean;
    allow_invalid_operation?: boolean;
    allow_invalid_instance_attributes?: boolean;
    use_default_operations?: boolean;
    ensure_disabled: boolean;
    allow_not_suitable_command?: boolean;

    wait?: boolean;
  };
  "node-standby-unstandby": {
    standby: boolean;
    node_names: string[];
  };
  "node-maintenance-unmaintenance": {
    maintenance: boolean;
    node_names: string[];
  };
  "cluster-add-nodes": {
    nodes: {
      name: string;
      addrs?: string[];
      devices?: string[];
      watchdog?: string;
    }[];
    start?: boolean;
    enable?: boolean;
    no_watchdog_validation?: boolean;
    force_flags?: string[];
    wait?: boolean;
  };
  "cluster-remove-nodes": {
    node_list: string[];
    force_flags?: string[];
  };
};
