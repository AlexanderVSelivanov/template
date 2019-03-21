import {put} from 'redux-saga/effects';

import {login} from '../actions'
import {ActionType} from 'typesafe-actions';

export default function* getUserSaga(action: ActionType<typeof login>) {
  try {
    const token = '';
    yield put(login.success(token));
  } catch (error) {
    yield put(login.failure(error));
  }
}
