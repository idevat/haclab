import { addConstraintRemote } from "app/backend";
import { ActionMap } from "app/store";
import { api, put } from "app/store/sagas/common";

export function* locationCreate({
  key,
  payload: { resourceSpecification, resourceValue, nodeName, score },
}: ActionMap["CONSTRAINT.LOCATION.CREATE"]) {
  const result: api.ResultOf<typeof addConstraintRemote> = yield api.authSafe(
    addConstraintRemote,
    key.clusterName,
    {
      location: {
        resourceSpecification,
        resourceValue,
        nodeName,
        score,
      },
    },
  );

  if (result.type === "OK") {
    yield put({
      type: "CONSTRAINT.LOCATION.CREATE.OK",
      key,
    });
    return;
  }

  yield put({
    type: "CONSTRAINT.LOCATION.CREATE.FAIL",
    key,
    payload: {
      message: result.type === "UNAUTHORIZED" ? "Unauthorized" : result.text,
    },
  });
}
