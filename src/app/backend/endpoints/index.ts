import {
  LibClusterCommands as TLibClusterCommands,
  libCluster,
} from "./libCluster";
import { getResourceAgentMetadata } from "./getResourceAgentMetadata";
import { authGuiAgainstNodes } from "./authGuiAgainstNodes";
import { canAddClusterOrNodes } from "./canAddClusterOrNodes";
import { checkAuthAgainstNodes } from "./checkAuthAgainstNodes";
import { clusterProperties } from "./clusterProperties";
import { clusterStart } from "./clusterStart";
import { clusterStatus } from "./clusterStatus";
import { clusterStop } from "./clusterStop";
import { existingCluster } from "./existingCluster";
import { fixAuthOfCluster } from "./fixAuthOfCluster";
import { getAvailResourceAgents } from "./getAvailResourceAgents";
import { getFenceAgentMetadata } from "./getFenceAgentMetadata";
import { importedClusterList } from "./importedClusterList";
import { login } from "./login";
import { logout } from "./logout";
import { removeResource } from "./removeResource";
import { resourceClone } from "./resourceClone";
import { resourceCleanup } from "./resourceCleanup";
import { resourceRefresh } from "./resourceRefresh";
import { resourceUnclone } from "./resourceUnclone";
import { sendKnownHosts } from "./sendKnownHosts";
import { updateResource } from "./updateResource";
import { addConstraintRemote } from "./addConstraintRemote";

const endpoints = {
  addConstraintRemote,
  authGuiAgainstNodes,
  canAddClusterOrNodes,
  checkAuthAgainstNodes,
  clusterProperties,
  clusterStart,
  clusterStatus,
  clusterStop,
  existingCluster,
  fixAuthOfCluster,
  getAvailResourceAgents,
  getFenceAgentMetadata,
  getResourceAgentMetadata,
  importedClusterList,
  libCluster,
  login,
  logout,
  removeResource,
  resourceCleanup,
  resourceClone,
  resourceRefresh,
  resourceUnclone,
  sendKnownHosts,
  updateResource,
};

export type LibClusterCommands = TLibClusterCommands;

export { endpoints };
