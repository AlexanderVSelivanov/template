import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

import {SuccessAsyncProperty, AccountEntityDto, TokenDto} from 'template-common';

import {getAccountAction} from '../actions';
import {tokenSelector} from '../selectors';
import {getAccountEndPoint} from '../endPoints';

export default function* getAccountSaga(action: ActionType<typeof getAccountAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const accountResponse: AxiosResponse<AccountEntityDto> = yield call(getAccountEndPoint, null, token.value);
    const account = accountResponse.data;
    yield put(getAccountAction.success(account));
  } catch (error) {
    yield put(getAccountAction.failure(error));
  }
}
