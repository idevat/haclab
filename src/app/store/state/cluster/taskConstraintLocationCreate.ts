import { Reducer } from "app/store/redux";

export type TaskConstraintLocationCreate = {
  resourceId: string;
  score: string;
  node: string;
};

const initialState: TaskConstraintLocationCreate = {
  resourceId: "",
  score: "",
  node: "",
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
    default:
      return state;
  }
};
export default taskConstraintLocationCreate;
