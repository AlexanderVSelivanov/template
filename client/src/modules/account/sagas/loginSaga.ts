import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

import {TokenDto, UserEntityDto} from 'template-common';

import {getAccountUserAction, loginAction} from '../actions';
import {getAccountUserEndPoint, loginEndPoint} from '../endPoints';
import {LOCAL_STORAGE_TOKEN_KEY_NAME} from '../../../config';

export default function* loginSaga(action: ActionType<typeof loginAction.request>) {
  try {
    const loginResponse: AxiosResponse<TokenDto> = yield call(loginEndPoint, action.payload);
    const token = loginResponse.data;
    yield put(loginAction.success(token));

    const accountUserResponse: AxiosResponse<UserEntityDto> = yield call(getAccountUserEndPoint, null, token);
    const accountUser = accountUserResponse.data;
    yield put(getAccountUserAction.success(accountUser));

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
  } catch (error) {
    yield put(loginAction.failure(error));
  }
}
