import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {updateUserByIdAction} from '../actions';
import {updateUserByIdEndPoint} from '../endPoints';

export default function* updateUserByIdSaga(action: ActionType<typeof updateUserByIdAction.request>) {
  try {
    const user: UserEntityDto = yield call(updateUserByIdEndPoint, action.payload);
    yield put(updateUserByIdAction.success(user));
  } catch (error) {
    yield put(updateUserByIdAction.failure(error));
  }
}
