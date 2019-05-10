import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

import {UserEntity} from 'template-common';

import {getAccountUserAction} from '../actions';
import {tokenSelector} from '../selectors';
import {getAccountUserEndPoint} from '../endPoints';
import {errorAction} from 'root/actions';

export default function* getAccountUserSaga(action: ActionType<typeof getAccountUserAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserEntity> = yield call(getAccountUserEndPoint, null, token);
    const user = userResponse.data;
    yield put(getAccountUserAction.success(user));
  } catch (error) {
    yield put(getAccountUserAction.failure());
    yield put(errorAction(error));
  }
}
