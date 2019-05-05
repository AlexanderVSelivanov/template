import {takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {loginAction, getAccountUserAction} from '../actions';
import getAccountUserSaga from './getAccountUserSaga';
import loginSaga from './loginSaga';

export default function* accountSagas() {
  yield takeLatest(getType(loginAction.request), loginSaga);
  yield takeLatest(getType(getAccountUserAction.request), getAccountUserSaga);
}
