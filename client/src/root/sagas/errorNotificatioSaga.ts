import {put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';

import {notifyError, errorAction} from '../actions';

export default function* errorNotificationSaga(action: ActionType<typeof errorAction>) {
  const error = action.payload;
  yield put(notifyError(error.message));
}
