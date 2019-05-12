import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

import {UserEntityDto} from 'template-common';

import {getAccountUserAction} from '../actions';
import {tokenSelector} from '../selectors';
import {getAccountUserEndPoint} from '../endPoints';

export default function* getAccountUserSaga(action: ActionType<typeof getAccountUserAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserEntityDto> = yield call(getAccountUserEndPoint, null, token);
    const user = userResponse.data;
    yield put(getAccountUserAction.success(user));
  } catch (error) {
    yield put(getAccountUserAction.failure(error));
  }
}
