import { types } from "app/store/state";

import { clusterSelector } from "./selectorsHelpers";

export function getClusterPart<
  NAME extends keyof types.clusterStorage.ClusterStorageItem,
>(name: NAME) {
  return clusterSelector(clusterStorageItem => clusterStorageItem[name]);
}

export const getPcmkAgent = clusterSelector(
  (clusterStorageItem, agentName: string) =>
    clusterStorageItem.pcmkAgents[agentName],
);

export const resourceTreeGetOpenedItems = clusterSelector(
  clusterStorageItem => clusterStorageItem.resourceTree.openedItems || [],
);

export const getClusterProperties = clusterSelector(
  clusterStorageItem => clusterStorageItem.clusterProperties.data,
);

export const getResourceAgentMap = clusterSelector(
  clusterStorageItem => clusterStorageItem.resourceAgentMap.data,
);

export * from "./status";
export * from "./constraints";
