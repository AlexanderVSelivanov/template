import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {deleteUserByIdAction} from '../actions';
import {deleteUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* deleteUserByIdSaga(action: ActionType<typeof deleteUserByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const user: UserEntityDto = yield call(deleteUserByIdEndPoint, action.payload, token);
    yield put(deleteUserByIdAction.success(user));
  } catch (error) {
    yield put(deleteUserByIdAction.failure(error));
  }
}
