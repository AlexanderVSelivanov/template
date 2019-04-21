import {put, call} from 'redux-saga/effects';

import {login} from '../actions';
import {ActionType} from 'typesafe-actions';
import {login as loginEndPoint} from '../endPoints';

export default function* getUserSaga(action: ActionType<typeof login>) {
  try {
    const request = call(loginEndPoint, action.payload);
    const token = '';
    yield put(login.success(token));
  } catch (error) {
    yield put(login.failure(error));
  }
}
