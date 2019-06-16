import {put} from 'redux-saga/effects';
import {ActionType, isActionOf} from 'typesafe-actions';
import {ApplicationError} from 'template-common';
import {get} from 'lodash';
import {errorAction} from '../actions';

export default function* errorHandleSaga(action: ActionType<any>) {
  if (
    !isActionOf(errorAction, action)
    && action.payload
    && (action.payload instanceof Error)
  ) {
    const error = new ApplicationError(action.payload);
    if (get(action.payload, 'isAxiosError', false)) {
      const axiosErrorData = get(action.payload, 'response.data', '');
      error.message = axiosErrorData || error.message;
    }
    yield put(errorAction(error));
  }
}
