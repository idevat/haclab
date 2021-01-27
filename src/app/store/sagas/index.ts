import { all } from "redux-saga/effects";

import { fork, takeEvery } from "./common";
import * as addExistingCluster from "./addExistingCluster";
import * as cluster from "./cluster";
import * as dashboard from "./dashboard";
import * as dataLoad from "./common/dataLoad";
import * as login from "./login";
import * as notifications from "./common/notifications";
import * as resourceUpdate from "./resourceUpdate";
import * as resourceCreate from "./resourceCreate";
import * as resourceAgent from "./resourceAgent";
import * as fenceAgent from "./fenceAgent";
import * as username from "./username";
import * as clusterProperties from "./clusterProperties";
import * as resourceAgentList from "./resourceAgentList";
import * as resourceRefreshCleanup from "./resourceRefreshCleanup";
import * as resourceDelete from "./resourceDelete";
import * as libAction from "./libAction";
import * as nodeStartStop from "./nodeStartStop";
import * as nodeAdd from "./nodeAdd";
import * as resourceClone from "./resourceClone";
import * as nodeAuth from "./nodeAuth";
import * as fixAuth from "./fixAuth";
import * as resourceGroupCreate from "./resourceGroupCreate";
import * as constraints from "./constraints";

function* rootSaga() {
  yield all([
    fork(dataLoad.setUpDataReading),
    fork(dataLoad.manage, dashboard.clusterListSyncOptions),
    fork(dataLoad.manage, cluster.clusterDataSyncOptions),
    takeEvery("USERNAME.LOAD", username.usernameLoad),
    takeEvery("AUTH.SUCCESS", username.checkLogin),
    takeEvery("LOGIN.LOGOUT", login.logoutSaga),
    takeEvery("LOGIN.ENTER_CREDENTIALS", login.loginSaga),
    takeEvery("NOTIFICATION.CREATE", notifications.limitNotificationLife),
    takeEvery("LIB.CALL.CLUSTER", libAction.callLib),
    takeEvery("CLUSTER.PROPERTIES.LOAD", clusterProperties.load),
    takeEvery("CLUSTER.ADD.CHECK_AUTH", addExistingCluster.checkAuthentication),
    takeEvery("CLUSTER.ADD", addExistingCluster.addCluster),
    takeEvery("CLUSTER.FIX_AUTH.START", fixAuth.fixAuth),
    takeEvery("CLUSTER.FIX_AUTH.AUTH_DONE", fixAuth.fixAuthDistribute),
    takeEvery("CONSTRAINT.LOCATION.CREATE", constraints.locationCreate),
    takeEvery("NODE.START", nodeStartStop.nodeStart),
    takeEvery("NODE.STOP", nodeStartStop.nodeStop),
    takeEvery("NODE.ADD.CHECK_CAN_ADD", nodeAdd.checkCanAddNodeSaga),
    takeEvery("NODE.ADD.CHECK_AUTH", nodeAdd.checkAuthSaga),
    takeEvery("NODE.ADD.SEND_KNOWN_HOSTS", nodeAdd.sendKnownHostsSaga),
    takeEvery("NODE.ADD", nodeAdd.nodeAddSaga),
    takeEvery("NODE.AUTH", nodeAuth.nodeAuthSaga),
    takeEvery("FENCE_AGENT.LOAD", fenceAgent.load),
    takeEvery("RESOURCE.CREATE", resourceCreate.resourceCreateSaga),
    takeEvery("RESOURCE_AGENT.LOAD", resourceAgent.load),
    takeEvery("RESOURCE_AGENT.ENSURE", resourceAgent.ensure),
    takeEvery("RESOURCE_AGENT.LIST.LOAD", resourceAgentList.load),
    takeEvery("RESOURCE.DELETE", resourceDelete.deleteResource),
    takeEvery("RESOURCE.REFRESH", resourceRefreshCleanup.refreshSaga),
    takeEvery("RESOURCE.CLEANUP", resourceRefreshCleanup.cleanupSaga),
    takeEvery("RESOURCE.CLONE", resourceClone.clone),
    takeEvery("RESOURCE.UNCLONE", resourceClone.unclone),
    takeEvery("RESOURCE.GROUP.CREATE", resourceGroupCreate.create),
    takeEvery(
      "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES",
      resourceUpdate.updateInstanceAttributes,
    ),
  ]);
}

export { rootSaga };
