import {takeLatest, debounce} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {API_REQUEST_DEBOUNCE} from '../../../config';

import {
  createUserAction,
  activateUserByIdAction,
  disableUserByIdAction,
  getUserByIdAction,
  getUsersAction,
  updateUserByIdAction,
} from '../actions';
import createUserSaga from './createUserSaga';
import activateUserByIdSaga from './activateUserByIdSaga';
import disableUserByIdSaga from './disableUserByIdSaga';
import getUserByIdSaga from './getUserByIdSaga';
import getUsersSaga from './getUsersSaga';
import updateUserByIdSaga from './updateUserByIdSaga';

export default function* accountSagas() {
  yield takeLatest(getType(createUserAction.request), createUserSaga);
  yield takeLatest(getType(activateUserByIdAction.request), activateUserByIdSaga);
  yield takeLatest(getType(disableUserByIdAction.request), disableUserByIdSaga);
  yield takeLatest(getType(getUserByIdAction.request), getUserByIdSaga);
  yield debounce(API_REQUEST_DEBOUNCE, getType(getUsersAction.request), getUsersSaga);
  yield takeLatest(getType(updateUserByIdAction.request), updateUserByIdSaga);
}
