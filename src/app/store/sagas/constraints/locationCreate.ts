import { addConstraintRemote, addConstraintRuleRemote } from "app/backend";
import { ActionMap } from "app/store";
import { api, put } from "app/store/sagas/common";

export function* locationCreate({
  key,
  payload: {
    resourceSpecification,
    resourceValue,
    locationSpecification,
    nodeName,
    rule,
    score,
  },
}: ActionMap["CONSTRAINT.LOCATION.CREATE"]) {
  const backendCall =
    locationSpecification === "node"
      ? api.authSafe(addConstraintRemote, key.clusterName, {
          location: {
            resourceSpecification,
            resourceValue,
            nodeName,
            score,
          },
        })
      : api.authSafe(addConstraintRuleRemote, key.clusterName, {
          location: {
            resourceSpecification,
            resourceValue,
            rule,
            score,
          },
        });

  const result: api.ResultOf<typeof addConstraintRemote> = yield backendCall;

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

export function* orderCreate({
  key,
  payload: { firstResourceId, firstAction, thenResourceId, thenAction },
}: ActionMap["CONSTRAINT.ORDER.CREATE"]) {
  const result: api.ResultOf<typeof addConstraintRemote> = yield api.authSafe(
    addConstraintRemote,
    key.clusterName,
    {
      order: {
        resourceId: firstResourceId,
        action: firstAction,
        order: "after",
        otherResourceId: thenResourceId,
        otherAction: thenAction,
      },
    },
  );

  if (result.type === "OK") {
    yield put({
      type: "CONSTRAINT.ORDER.CREATE.OK",
      key,
    });
    return;
  }

  yield put({
    type: "CONSTRAINT.ORDER.CREATE.FAIL",
    key,
    payload: {
      message: result.type === "UNAUTHORIZED" ? "Unauthorized" : result.text,
    },
  });
}
