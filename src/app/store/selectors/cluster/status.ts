import * as types from "app/store/state/types";

import { clusterSelector, clusterStatusSelector } from "./selectorsHelpers";

const findInTopLevelAndGroup = (
  resource: types.cluster.ResourceTreeItem,
  id: string,
) => {
  if (resource.id === id) {
    return resource;
  }

  if (resource.itemType === "group") {
    const primitive = resource.resources.find(p => p.id === id);
    if (primitive) {
      return primitive;
    }
  }

  return undefined;
};

export const clusterAreDataLoaded = clusterSelector(
  clusterStorageItem =>
    clusterStorageItem?.clusterStatus?.dataFetchState === "SUCCESS",
);

export const getCluster = clusterStatusSelector(clusterStatus => clusterStatus);

export const getSelectedResource = clusterStatusSelector(
  (clusterStatus, id: string) => {
    for (const resource of clusterStatus.resourceTree) {
      const matched = findInTopLevelAndGroup(resource, id);
      if (matched) {
        return matched;
      }

      if (resource.itemType === "clone") {
        const member = findInTopLevelAndGroup(resource.member, id);
        if (member) {
          return member;
        }
      }
    }

    return undefined;
  },
);

export const getGroups = clusterStatusSelector(clusterStatus =>
  clusterStatus.resourceTree.reduce<string[]>((groups, resource) => {
    if (resource.itemType === "group") {
      return [...groups, resource.id];
    }
    if (resource.itemType === "clone" && resource.member.itemType === "group") {
      return [...groups, resource.member.id];
    }
    return groups;
  }, []),
);

export const getTopLevelPrimitives = clusterStatusSelector(clusterStatus =>
  clusterStatus.resourceTree
    .filter(r => r.itemType === "primitive")
    .map(r => r.id),
);

export const getSelectedFenceDevice = clusterStatusSelector(
  (clusterStatus, id: string) =>
    clusterStatus.fenceDeviceList.find(fd => fd.id === id),
);

export const getSelectedNode = clusterStatusSelector(
  (clusterStatus, name: string) =>
    clusterStatus.nodeList.find(node => node.name === name),
);

export const crmStatusForPrimitive = clusterStatusSelector(
  (clusterStatus, primitiveIds: string[]) =>
    clusterStatus.resourceOnNodeStatusList.filter(s =>
      primitiveIds.includes(s.resource.id),
    ),
);

export const crmStatusForNode = clusterStatusSelector(
  (clusterStatus, nodeName: string) =>
    clusterStatus.resourceOnNodeStatusList.filter(
      s => s.node?.name === nodeName,
    ),
);
