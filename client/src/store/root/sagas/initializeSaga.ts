import {put} from 'redux-saga/effects';

import {initializeComplete, initializeFail} from '../actions';

export default function* initializeSaga() {
  try {

    // todo: initialize application

    yield put(initializeComplete());
  } catch (error) {
    yield put(initializeFail(error));
  }
}
