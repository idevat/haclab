import { clusterSelector } from "./selectorsHelpers";

export const getTaskConstraintLocationCreateState = clusterSelector(
  clusterStorageItem => clusterStorageItem.taskConstraintLocationCreate,
);
export const getWizardResourceCreateState = clusterSelector(
  clusterStorageItem => clusterStorageItem.wizardResourceCreate,
);
export const getWizardResourceGroupState = clusterSelector(
  clusterStorageItem => clusterStorageItem.wizardResourceGroup,
);
export const getWizardNodeAddState = clusterSelector(
  clusterStorageItem => clusterStorageItem.wizardNodeAdd,
);
export const getFixAuth = clusterSelector(
  clusterStorageItem => clusterStorageItem.fixAuth,
);

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
