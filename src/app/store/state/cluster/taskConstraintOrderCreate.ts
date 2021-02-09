import { Reducer } from "app/store/redux";

type Action = "start" | "promote" | "demote" | "stop";
export type TaskConstraintOrderCreate = {
  resourceId: string;
  action: Action;
  order: "before" | "after";
  otherResourceId: string;
  otherAction: Action;
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
};

const initialState: TaskConstraintOrderCreate = {
  resourceId: "",
  action: "start",
  order: "after",
  otherResourceId: "",
  otherAction: "start",
  response: "",
  resultMessage: "",
};

const taskConstraintOrderCreate: Reducer<TaskConstraintOrderCreate> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.ORDER.CREATE":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "CONSTRAINT.ORDER.CREATE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "CONSTRAINT.ORDER.CREATE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
      };

    case "CONSTRAINT.ORDER.CREATE.FAIL.RECOVER":
      return {
        ...state,
        response: "",
        resultMessage: "",
      };

    case "CONSTRAINT.ORDER.CREATE.CLOSE":
      return initialState;

    default:
      return state;
  }
};
export default taskConstraintOrderCreate;
