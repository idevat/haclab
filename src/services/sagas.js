import {all} from 'redux-saga/effects'
import loginSaga from "../scenes/login/sagas.js"
import dashboardSaga from "../scenes/dashboard/sagas.js"

export default function* rootSaga(){
  yield all([
    ...loginSaga,
    ...dashboardSaga,
  ]);
}
