import {takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {loginAction, logoutAction, getAccountUserAction} from '../actions';
import getAccountUserSaga from './getAccountUserSaga';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';

export default function* accountSagas() {
  yield takeLatest(getType(loginAction.request), loginSaga);
  yield takeLatest(getType(logoutAction.request), logoutSaga);
  yield takeLatest(getType(getAccountUserAction.request), getAccountUserSaga);
}
