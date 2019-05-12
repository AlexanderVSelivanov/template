import {takeEvery} from 'redux-saga/effects';

import initializeSaga from './initializeSaga';
import errorHandleSaga from './errorHandleSaga';

export default function* accountSagas() {
  yield takeEvery('*', errorHandleSaga);
  yield initializeSaga();
}
