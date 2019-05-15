import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {getUserByIdAction} from '../actions';
import {getUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* getUserByIdSaga(action: ActionType<typeof getUserByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const user: UserEntityDto = yield call(getUserByIdEndPoint, action.payload, token);
    yield put(getUserByIdAction.success(user));
  } catch (error) {
    yield put(getUserByIdAction.failure(error));
  }
}
