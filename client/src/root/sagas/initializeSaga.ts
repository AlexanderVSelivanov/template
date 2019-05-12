import {put, call} from 'redux-saga/effects';

import {errorAction, initializeCompleteAction, initializeFailAction} from '../actions';
import {LOCAL_STORAGE_TOKEN_KEY_NAME} from '../../config';
import {TokenDto, UserEntityDto} from 'template-common';
import {AxiosResponse} from 'axios';
import {getAccountUserEndPoint} from '../../modules/account/endPoints';
import {getAccountUserAction, loginAction} from '../../modules/account/actions';

export default function* initializeSaga() {
  try {
    const token: TokenDto | null = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
    if (token) {
      const accountUserResponse: AxiosResponse<UserEntityDto> = yield call(getAccountUserEndPoint, null, token);
      const accountUser = accountUserResponse.data;
      yield put(getAccountUserAction.success(accountUser));
      yield put(loginAction.success(token));
    }
    yield put(initializeCompleteAction());
  } catch (error) {
    yield put(initializeFailAction());
    yield put(errorAction(error));
  }
}
