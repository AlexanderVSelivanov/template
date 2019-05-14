import {put} from 'redux-saga/effects';
import {ActionType, isActionOf} from 'typesafe-actions';

import {errorAction} from '../actions';

export default function* errorHandleSaga(action: ActionType<any>) {
  if (
    !isActionOf(errorAction, action)
    && action.payload
    && (action.payload instanceof Error)
  ) {
    yield put(errorAction(action.payload));
  }
}
