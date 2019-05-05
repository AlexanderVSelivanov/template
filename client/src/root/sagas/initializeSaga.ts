import {put} from 'redux-saga/effects';

import {errorAction, initializeCompleteAction, initializeFailAction} from '../actions';

export default function* initializeSaga() {
  try {

    // todo: initialize application

    yield put(initializeCompleteAction());
  } catch (error) {
    yield put(initializeFailAction());
    yield put(errorAction(error));
  }
}
