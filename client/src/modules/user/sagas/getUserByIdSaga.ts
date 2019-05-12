import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {getUserByIdAction} from '../actions';
import {getUserByIdEndPoint} from '../endPoints';

export default function* getUserByIdSaga(action: ActionType<typeof getUserByIdAction.request>) {
  try {
    const user: UserEntityDto = yield call(getUserByIdEndPoint, action.payload);
    yield put(getUserByIdAction.success(user));
  } catch (error) {
    yield put(getUserByIdAction.failure(error));
  }
}
