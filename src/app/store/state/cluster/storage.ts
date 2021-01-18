import { Reducer, combineReducers } from "app/store/redux";

import clusterStatus, { types as clusterStatusTypes } from "./clusterStatus";
import pcmkAgents, { AgentsStorage } from "./pcmkAgents";
import resourceTree, { ResourceTreeState } from "./resourceTree";
import clusterProperties, { ClusterPropertiesService } from "./properties";
import resourceAgentMap, { ResourceAgentListService } from "./resourceAgentMap";
import wizardResourceCreate, {
  WizardResourceCreate,
} from "./wizardResourceCreate";
import taskConstraintLocationCreate, {
  TaskConstraintLocationCreate,
} from "./taskConstraintLocationCreate";
import wizardResourceGroup, {
  WizardResourceGroup,
} from "./wizardResourceGroup";
import wizardNodeAdd, { WizardNodeAdd } from "./wizardNodeAdd";
import fixAuth, { FixAuth } from "./fixAuth";

export type ClusterStorageItem = {
  clusterStatus: clusterStatusTypes.ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
  resourceAgentMap: ResourceAgentListService;
  taskConstraintLocationCreate: TaskConstraintLocationCreate;
  wizardResourceCreate: WizardResourceCreate;
  wizardResourceGroup: WizardResourceGroup;
  wizardNodeAdd: WizardNodeAdd;
  fixAuth: FixAuth;
};

export type ClusterStorageMap = Record<string, ClusterStorageItem>;

const clusterStorageItem = combineReducers<ClusterStorageItem>({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
  wizardResourceCreate,
  taskConstraintLocationCreate,
  wizardResourceGroup,
  wizardNodeAdd,
  fixAuth,
});

const clusterStorage: Reducer<ClusterStorageMap> = (state = {}, action) => {
  if (action.type === "AUTH.REQUIRED") {
    return {};
  }
  if ("key" in action && "clusterName" in action.key) {
    return {
      ...state,
      [action.key.clusterName]: clusterStorageItem(
        state[action.key.clusterName],
        action,
      ),
    };
  }
  return Object.keys(state).reduce<ClusterStorageMap>(
    (newState, clusterName) => ({
      ...newState,
      [clusterName]: clusterStorageItem(state[clusterName], action),
    }),
    {} as ClusterStorageMap,
  );
};

export default clusterStorage;
