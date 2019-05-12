import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {EntityList, UserEntityDto} from 'template-common';

import {getUsersAction} from '../actions';
import {getUsersEndPoint} from '../endPoints';

export default function* getUsersSaga(action: ActionType<typeof getUsersAction.request>) {
  try {
    const users: EntityList<UserEntityDto> = yield call(getUsersEndPoint, action.payload);
    yield put(getUsersAction.success(users));
  } catch (error) {
    yield put(getUsersAction.failure(error));
  }
}
