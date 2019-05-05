import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

import {Token, UserEntity} from 'template-common';

import {getAccountUserAction, loginAction as loginAction} from '../actions';
import {getAccountUserEndPoint, loginEndPoint} from '../endPoints';
import {errorAction} from 'src/root/actions';

export default function* loginSaga(action: ActionType<typeof loginAction.request>) {
  try {
    const loginResponse: AxiosResponse<Token> = yield call(loginEndPoint, action.payload);
    const token = loginResponse.data;
    yield put(loginAction.success(token));

    const accountUserResponse: AxiosResponse<UserEntity> = yield call(getAccountUserEndPoint, null, token);
    const accountUser = accountUserResponse.data;
    yield put(getAccountUserAction.success(accountUser));

  } catch (error) {
    yield put(loginAction.failure());
    yield put(errorAction(error));
  }
}
