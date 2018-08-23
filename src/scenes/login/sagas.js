import {call, put, takeEvery, take} from 'redux-saga/effects'

import * as loginActions from "./actions"
import * as loginTypes from "./constants"
import * as api from "../../services/api.js"

export function* withAuthCare(apiCall, ...args){
  const responseFirstAttempt = yield call(apiCall, ...args);
  if(responseFirstAttempt.status !== 401){
    return responseFirstAttempt;
  }

  // TODO conflict with others - make flag, fist turn flag others
  // only wait for success
  yield put(loginActions.requireLogin())

  yield take(loginTypes.LOGIN_SUCCESS)

  const responseSecondAttempt = yield call(apiCall, ...args);
  if(responseSecondAttempt.status !== 401){
    return responseSecondAttempt;
  }

  console.log("TODO: api call failed 401 even after successfull login");
}

export function* logout(){
  // TODO check success...
  yield call(api.getForText, "/ui/logout");
  yield put(loginActions.logoutSuccess())
}

export function* login(action){
  const {payload: {username, password}} = action
  const loginResponse = yield call(
    api.postParamsForText,
    "/ui/login",
    {username, password}
  )
  if(loginResponse.status === 401){
    yield put(loginActions.loginFailed())
  }else{
    yield put(loginActions.loginSuccess())
  }
}

export default [
  takeEvery(loginTypes.LOGOUT, logout),
  takeEvery(loginTypes.ENTER_CREDENTIALS,login)
];
