import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {deleteUserByIdAction} from '../actions';
import {deleteUserByIdEndPoint} from '../endPoints';

export default function* deleteUserByIdSaga(action: ActionType<typeof deleteUserByIdAction.request>) {
  try {
    const user: UserEntityDto = yield call(deleteUserByIdEndPoint, action.payload);
    yield put(deleteUserByIdAction.success(user));
  } catch (error) {
    yield put(deleteUserByIdAction.failure(error));
  }
}
