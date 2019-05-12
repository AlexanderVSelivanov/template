import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {createUserAction} from '../actions';
import {createUserEndPoint} from '../endPoints';

export default function* createUserSaga(action: ActionType<typeof createUserAction.request>) {
  try {
    const user: UserEntityDto = yield call(createUserEndPoint, action.payload);
    yield put(createUserAction.success(user));
  } catch (error) {
    yield put(createUserAction.failure(error));
  }
}
