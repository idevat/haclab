import { Action, ActionMap } from "app/store/actions";

import { api, lib, processError, put, race, take } from "./common";

export function* resourceCreateSaga({
  key,
  payload: { agentName, resourceName, instanceAttrs, disabled, force },
}: ActionMap["RESOURCE.CREATE"]) {
  const { result }: { result: api.ResultOf<typeof api.lib.call> } = yield race({
    result: api.authSafe(api.lib.callCluster, {
      clusterName: key.clusterName,
      command: "resource-create",
      payload: {
        resource_id: resourceName,
        resource_agent_name: agentName,
        instance_attributes: instanceAttrs,
        ensure_disabled: disabled,
        operation_list: [],
        meta_attributes: {},
        allow_absent_agent: force,
        allow_invalid_operation: force,
        allow_invalid_instance_attributes: force,
        allow_not_suitable_command: force,
      },
    }),
    cancel: take("RESOURCE.CREATE.CLOSE"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const taskLabel = `create resource "${resourceName}"`;
  const errorAction: Action = {
    type: "RESOURCE.CREATE.ERROR",
    key,
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  yield lib.clusterResponseSwitch(key.clusterName, taskLabel, result.payload, {
    successAction: {
      type: "RESOURCE.CREATE.SUCCESS",
      key,
      payload: { reports: result.payload.report_list },
    },
    errorAction: {
      type: "RESOURCE.CREATE.FAIL",
      key,
      payload: { reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}
