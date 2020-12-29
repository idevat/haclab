import { Reducer } from "app/store/redux";

import nodeAuth, { NodeAuth } from "./nodeAuth";

export type NodeAuthMap = Record<number, NodeAuth>;

const initialState: NodeAuthMap = {};

function hasProperty<O extends Record<string, unknown>, P extends PropertyKey>(
  obj: O,
  prop: P,
): obj is O & Record<P, unknown> {
  /* eslint-disable no-prototype-builtins */
  return obj.hasOwnProperty(prop);
}

const nodeAuthMap: Reducer<NodeAuthMap> = (state = initialState, action) => {
  if (
    // TODO - DATA_READING.SET_UP has array in payload; make it standard object!
    action.type !== "DATA_READING.SET_UP"
    && hasProperty(action, "payload")
    && hasProperty(action.payload, "processId")
  ) {
    return {
      ...state,
      [action.payload.processId]: nodeAuth(
        state[action.payload.processId],
        action,
      ),
    };
  }
  return state;
};

export default nodeAuthMap;
