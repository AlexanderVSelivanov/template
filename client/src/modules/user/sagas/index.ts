import {takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {
  createUserAction,
  deleteUserByIdAction,
  getUserByIdAction,
  getUsersAction,
  updateUserByIdAction,
} from '../actions';

import createUserSaga from './createUserSaga';
import deleteUserByIdSaga from './deleteUserByIdSaga';
import getUserByIdSaga from './getUserByIdSaga';
import getUsersSaga from './getUsersSaga';
import updateUserByIdSaga from './updateUserByIdSaga';

export default function* accountSagas() {
  yield takeLatest(getType(createUserAction.request), createUserSaga);
  yield takeLatest(getType(deleteUserByIdAction.request), deleteUserByIdSaga);
  yield takeLatest(getType(getUserByIdAction.request), getUserByIdSaga);
  yield takeLatest(getType(getUsersAction.request), getUsersSaga);
  yield takeLatest(getType(updateUserByIdAction.request), updateUserByIdSaga);
}
