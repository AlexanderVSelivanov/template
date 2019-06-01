import {takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {loginAction, logoutAction, getAccountAction} from '../actions';
import getAccountSaga from './getAccountSaga';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';

export default function* accountSagas() {
  yield takeLatest(getType(loginAction.request), loginSaga);
  yield takeLatest(getType(logoutAction.request), logoutSaga);
  yield takeLatest(getType(getAccountAction.request), getAccountSaga);
}
