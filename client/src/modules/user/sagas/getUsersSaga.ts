import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {EntityList, UserEntityDto} from 'template-common';

import {getUsersAction} from '../actions';
import {getUsersEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* getUsersSaga(action: ActionType<typeof getUsersAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const users: EntityList<UserEntityDto> = yield call(getUsersEndPoint, action.payload, token);
    yield put(getUsersAction.success(users));
  } catch (error) {
    yield put(getUsersAction.failure(error));
  }
}
