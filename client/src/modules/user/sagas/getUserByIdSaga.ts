import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, UserDto} from 'template-common';

import {getUserByIdAction} from '../actions';
import {getUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* getUserByIdSaga(action: ActionType<typeof getUserByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserDto> = yield call(getUserByIdEndPoint, action.payload, token.value);
    const user = userResponse.data;
    yield put(getUserByIdAction.success(user));
  } catch (error) {
    yield put(getUserByIdAction.failure(error));
  }
}
