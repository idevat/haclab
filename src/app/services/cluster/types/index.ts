import { StatusSeverity } from "app/common/types";

import {
  ResourceSet,
  Constraint,
  ConstraintLocation,
  ConstraintColocation,
  ConstraintColocationSet,
  ConstraintLocationRule,
  ConstraintLocationRuleRef,
  ResourceRelation,
  RuleScore,
} from "./constraints";

export type ResourceRelation = ResourceRelation;
export type Constraint = Constraint;
export type ConstraintLocation = ConstraintLocation;
export type ConstraintColocation = ConstraintColocation;
export type ConstraintColocationSet = ConstraintColocationSet;
export type ConstraintLocationRule = ConstraintLocationRule;
export type ConstraintLocationRuleRef = ConstraintLocationRuleRef;
export type RuleScore = RuleScore;
export type ResourceSet = ResourceSet;

export interface InstanceAttribute {
  id: string,
  value: string,
}

export interface Issue {
  severity: "ERROR"|"WARNING",
  message: string,
}

export type NodeStatusFlag = "ONLINE"|"OFFLINE"|"UNKNOWN";
export type NodeQuorumFlag = "YES"|"NO"|"UNKNOWN";

export interface Node {
  name: string,
  status: NodeStatusFlag,
  statusSeverity: StatusSeverity,
  quorum: NodeQuorumFlag,
  quorumSeverity: StatusSeverity,
  issueList: Issue[],
}

export type ResourceStatusFlag = "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN";

export interface ResourceTreeItemBase {
  id: string,
  itemType: string,
  status: ResourceStatusFlag,
  statusSeverity: StatusSeverity,
  issueList: Issue[],
}

export interface Primitive extends ResourceTreeItemBase {
  itemType: "primitive",
  class: string,
  provider: string,
  type: string,
  agentName: string;
  instanceAttributes: Record<string, InstanceAttribute>,
}

export interface Group extends ResourceTreeItemBase {
  itemType: "group",
  resources: Primitive[],
}

export interface Clone extends ResourceTreeItemBase {
  itemType: "clone",
  member: Primitive|Group;
}

export type ResourceTreeItem = Primitive|Group|Clone;

export interface FenceDevice {
  id: string,
  status: ResourceStatusFlag,
  statusSeverity: StatusSeverity,
  issueList: Issue[],
}

export interface ClusterState {
  name: string,
  urlName: string,
  status: "OK"|"WARNING"|"ERROR"|"UNKNOWN",
  nodeList: Node[],
  resourceTree: ResourceTreeItem[],
  fenceDeviceList: FenceDevice[],
  constraints: Constraint[],
  issueList: Issue[],
  summary: {
    nodesSeverity: StatusSeverity,
    resourcesSeverity: StatusSeverity,
    fenceDevicesSeverity: StatusSeverity,
    issuesSeverity: StatusSeverity,
  },
}

export type FETCH_STATUS = "NOT_STARTED"|"IN_PROGRESS"|"SUCCESS"|"ERROR";

export interface ClusterServiceState {
  clusterState: ClusterState,
  dataFetchState: FETCH_STATUS,
}
