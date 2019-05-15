import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {updateUserByIdAction} from '../actions';
import {updateUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* updateUserByIdSaga(action: ActionType<typeof updateUserByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const user: UserEntityDto = yield call(updateUserByIdEndPoint, action.payload, token);
    yield put(updateUserByIdAction.success(user));
  } catch (error) {
    yield put(updateUserByIdAction.failure(error));
  }
}
