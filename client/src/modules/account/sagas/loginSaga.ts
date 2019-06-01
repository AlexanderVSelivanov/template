import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

import {TokenDto, AccountEntityDto} from 'template-common';

import {getAccountAction, loginAction} from '../actions';
import {getAccountEndPoint, loginEndPoint} from '../endPoints';
import {LOCAL_STORAGE_TOKEN_KEY_NAME} from '../../../config';

export default function* loginSaga(action: ActionType<typeof loginAction.request>) {
  try {
    const loginResponse: AxiosResponse<TokenDto> = yield call(loginEndPoint, action.payload);
    const token = loginResponse.data;
    yield put(loginAction.success(token));

    const accountResponse: AxiosResponse<AccountEntityDto> = yield call(getAccountEndPoint, null, token);
    const account = accountResponse.data;
    yield put(getAccountAction.success(account));

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
  } catch (error) {
    yield put(loginAction.failure(error));
  }
}
