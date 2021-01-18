import { AuthActions } from "./auth";
import { ClusterActions } from "./cluster";
import { ConstraintAction } from "./constraint";
import { FenceAgentActions } from "./fenceAgent";
import { LibActions } from "./lib";
import { LoginActions } from "./login";
import { NodeActions } from "./node";
import { NotificationActions } from "./notifications";
import { ResourceActions } from "./resource";
import { ResourceAgentActions } from "./resourceAgent";
import { UsernameActions } from "./username";

// prettier-ignore
type LeafActionMap = (
  & AuthActions
  & ClusterActions
  & ConstraintAction
  & FenceAgentActions
  & LibActions
  & LoginActions
  & NodeActions
  & NotificationActions
  & ResourceActions
  & ResourceAgentActions
  & UsernameActions
);

export type ActionLeaf = LeafActionMap[keyof LeafActionMap];

type SetupDataReading = {
  type: "DATA_READING.SET_UP";
  payload: {
    specificator: string;
    start: ActionLeaf;
    stop: ActionLeaf;
  }[];
};

export type ActionMap = LeafActionMap & {
  "DATA_READING.SET_UP": SetupDataReading;
};
export type Action = ActionLeaf | SetupDataReading;

let nextId = 1;
export const actionNewId = () => {
  return nextId++;
};

// 1. Actions are one big map in format:
//
// export type SomeActions = {
//   "ACTION.FIRST": {
//     typel: "ACTION.FIRST",
//     payload: { some: string };
//   };
//   "ACTION.SECOND": {
//     typel: "ACTION.SECOND",
//     payload: { some: string };
//   };
// }
//
// It is because in this format, it is possible to get union of actions by:
// type Action = SomeActions[keyouf SomeActions]
//
// The key of action is the same as type of action. This convention allows
// easilly reference Action and ActionMap
//
// -----------------------------------------------------------------------
//
// 2. I haven't found out how to get this from module, e.g.:
//
// // some-module.ts
// export type first: {
//   typel: "ACTION.FIRST",
//   payload: { some: string };
// };
// export type second: {
//   typel: "ACTION.SECOND",
//   payload: { some: string };
// };
//
// // another-module.ts
// import * as SomeActions from "./some-module";
// // I couldn't get the necessary types from here
//
// -----------------------------------------------------------------------
//
// 3. It would be possible to use following type
// export type ActionMapFrom<ACTIONS> = {
//   [K in keyof ACTIONS]: ACTIONS[K] extends null
//     ? { type: K }
//     : { type: K; payload: ACTIONS[K] };
// };
//
// to get desired types from something like this
// export type SomeActions = {
//   "ACTION.FIRST": { some: string };
//   "ACTION.SECOND": { some: string };
// };
//
// But in this case does not worked code navigation (I'm not able to find
// usages), I'm not able to jump to action from the the usage. So, the current
// situation is not optimal but it is kind of tradeoff.
