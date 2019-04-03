import {takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {login, getUser, getUserById} from '../actions';
import getUserSaga from './getUser';
import loginSaga from './loginSaga';

export default function* accountSagas() {
  yield takeLatest(getType(login.request), loginSaga);
  yield takeLatest(getType(getUserById), getUserSaga);
  yield takeLatest(getType(getUser.request), getUserSaga);
}
