import {put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';

import {errorAction} from '../actions';
import {ApplicationError} from 'template-common';

export default function* initializeSaga(action: ActionType<any>) {
  if (action.payload && (action.payload instanceof Error || action.payload instanceof ApplicationError)) {
    yield put(errorAction(action.payload));
  }
}
