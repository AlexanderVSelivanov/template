import {takeEvery} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {errorAction} from '../actions';

import initializeSaga from './initializeSaga';
import errorHandleSaga from './errorHandleSaga';
import errorNotificationSaga from './errorNotificatioSaga';

export default function* accountSagas() {
  yield takeEvery('*', errorHandleSaga);
  yield takeEvery(getType(errorAction), errorNotificationSaga);
  yield initializeSaga();
}
