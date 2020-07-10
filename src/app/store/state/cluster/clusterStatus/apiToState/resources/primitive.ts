import { types as backendTypes } from "app/backend";
import * as types from "app/store/types";

import { transformIssues } from "../issues";
import { buildStatus, isDisabled } from "./statusInfoList";

type ApiPrimitive = backendTypes.clusterStatus.ApiPrimitive;

const buildStatusInfoList = (
  apiPrimitive: ApiPrimitive,
): {
  resourceStatusInfo: types.cluster.ResourceStatusInfo[];
  issues: types.cluster.Issue[];
} => {
  const infoList: types.cluster.ResourceStatusInfo[] = [];
  const issues: types.cluster.Issue[] = [];

  // warning
  if (apiPrimitive.crm_status.some(s => !s.managed)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is unmanaged",
    });
    infoList.push({ label: "UNMANAGED", severity: "WARNING" });
  }

  if (isDisabled(apiPrimitive)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is disabled",
    });
    infoList.push({ label: "DISABLED", severity: "WARNING" });
  }

  if (
    apiPrimitive.crm_status.some(s => s.failed)
    || apiPrimitive.operations.some(
      o =>
        !(
          o.rc_code === 0
          // 7: OCF_NOT_RUNNING: The resource is safely stopped.
          || (o.operation === "monitor" && o.rc_code === 7)
          // 8: OCF_RUNNING_MASTER: The resource is running in master mode.
          // 193: PCMK_OCF_UNKNOWN: The resource operation is still in progress.
          || [8, 193].includes(o.rc_code)
        ),
    )
  ) {
    issues.push({ severity: "ERROR", message: "Resource failed" });
    infoList.push({ label: "FAILED", severity: "ERROR" });
  } else if (!apiPrimitive.crm_status.some(s => s.active)) {
    issues.push({ severity: "ERROR", message: "Resource is blocked" });
    infoList.push({ label: "BLOCKED", severity: "ERROR" });
  }

  if (infoList.length > 0) {
    return {
      resourceStatusInfo: infoList,
      issues,
    };
  }

  // ok
  return {
    resourceStatusInfo: [{ label: "RUNNING", severity: "OK" }],
    issues,
  };
};

export const toPrimitive = (
  apiResource: ApiPrimitive,
): types.cluster.Primitive => {
  const { resourceStatusInfo, issues } = buildStatusInfoList(apiResource);
  return {
    id: apiResource.id,
    itemType: "primitive",
    status: buildStatus(resourceStatusInfo),
    issueList: transformIssues(apiResource).concat(issues),
    class: apiResource.class,
    provider: apiResource.provider,
    type: apiResource.type,
    agentName: `${apiResource.class}:${apiResource.provider}:${apiResource.type}`,
    // Decision: Last instance_attr wins!
    instanceAttributes: apiResource.instance_attr.reduce(
      (attrMap, nvpair) => ({
        ...attrMap,
        [nvpair.name]: { id: nvpair.id, value: nvpair.value },
      }),
      {},
    ),
    utilization: apiResource.utilization,
    metaAttributes: apiResource.meta_attr,
  };
};
