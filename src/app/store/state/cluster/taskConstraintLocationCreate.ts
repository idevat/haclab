import { Reducer } from "app/store/redux";

export type TaskConstraintLocationCreate = {
  resourceId: string;
  score: string;
  nodeName: string;
  resultStatus: "" | "ok" | "fail";
  resultMessage: string;
};

const initialState: TaskConstraintLocationCreate = {
  resourceId: "",
  score: "",
  nodeName: "",
  resultStatus: "",
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

    case "CONSTRAINT.LOCATION.CREATE.OK":
      return {
        ...state,
        resultStatus: "ok",
        resultMessage: "",
      };

    case "CONSTRAINT.LOCATION.CREATE.FAIL":
      return {
        ...state,
        resultStatus: "fail",
        resultMessage: action.payload.message,
      };

    case "CONSTRAINT.LOCATION.CREATE.FAIL.RECOVER":
      return {
        ...state,
        resultStatus: "",
        resultMessage: "",
      };

    default:
      return state;
  }
};
export default taskConstraintLocationCreate;
