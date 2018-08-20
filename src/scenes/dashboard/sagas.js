import {call, put, takeEvery} from 'redux-saga/effects'

import {withAuthCare} from "../login/sagas.js"

import * as dashboardActions from "./actions"
import * as dashboardTypes from "./constants"
import * as api from "./api.js"

export const transformDashboardData = (apiData) => ({
  clusterList: apiData.cluster_list.map(
    cluster => ({name: cluster.cluster_name})
  )
})

export function* fetchDashboardData(){
  const response = yield call(withAuthCare, api.fetchDashboardData)
  const dashboardData = yield call(transformDashboardData, response.data)
  yield put(dashboardActions.fetchDashboardDataSuccess(dashboardData));
}

export default [
  takeEvery(dashboardTypes.FETCH_DASHBOARD_DATA, fetchDashboardData),
];
