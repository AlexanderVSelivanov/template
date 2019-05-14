import {put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';

import {logoutAction} from '../actions';
import {LOCAL_STORAGE_TOKEN_KEY_NAME} from '../../../config';

export default function* logoutSaga(action: ActionType<typeof logoutAction.request>) {
  try {
    yield put(logoutAction.success());
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
    window.location.reload();
  } catch (error) {
    yield put(logoutAction.failure(error));
  }
}
