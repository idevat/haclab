import { Reducer } from "app/store/redux";

export type TaskConstraintLocationCreate = {
  resourceSpecification: "resource" | "pattern";
  resourceId: string;
  resourcePattern: string;
  locationSpecification: "node" | "rule";
  nodeName: string;
  rule: string;
  response: "" | "sending" | "ok" | "fail";
  preference: "prefer" | "avoid";
  score: string;
  resultMessage: string;
};

const initialState: TaskConstraintLocationCreate = {
  resourceSpecification: "resource",
  resourceId: "",
  resourcePattern: "",
  locationSpecification: "node",
  nodeName: "",
  rule: "",
  preference: "prefer",
  score: "",
  response: "",
  resultMessage: "",
};

const taskConstraintLocationCreate: Reducer<TaskConstraintLocationCreate> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.LOCATION.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.LOCATION.CREATE":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "CONSTRAINT.LOCATION.CREATE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "CONSTRAINT.LOCATION.CREATE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
      };

    case "CONSTRAINT.LOCATION.CREATE.FAIL.RECOVER":
      return {
        ...state,
        response: "",
        resultMessage: "",
      };

    case "CONSTRAINT.LOCATION.CREATE.CLOSE":
      return initialState;

    default:
      return state;
  }
};
export default taskConstraintLocationCreate;
