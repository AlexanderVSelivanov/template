import {put, call} from 'redux-saga/effects';

import {errorAction, initializeCompleteAction, initializeFailAction} from '../actions';
import {LOCAL_STORAGE_TOKEN_KEY_NAME} from '../../config';
import {TokenDto, AccountEntityDto} from 'template-common';
import {AxiosResponse} from 'axios';
import {getAccountEndPoint} from '../../modules/account/endPoints';
import {getAccountAction, loginAction} from '../../modules/account/actions';

export default function* initializeSaga() {
  try {
    const token: TokenDto | null = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
    if (token) {
      const accountResponse: AxiosResponse<AccountEntityDto> = yield call(getAccountEndPoint, null, token);
      const account = accountResponse.data;
      yield put(getAccountAction.success(account));
      yield put(loginAction.success(token));
    }
    yield put(initializeCompleteAction());
  } catch (error) {
    yield put(initializeFailAction());
    yield put(errorAction(error));
  }
}
