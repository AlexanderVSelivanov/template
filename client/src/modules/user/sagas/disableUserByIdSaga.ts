import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, UserDto} from 'template-common';

import {disableUserByIdAction} from '../actions';
import {disableUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';
import {notifySuccess} from '../../../root/actions';

export default function* deleteUserByIdSaga(action: ActionType<typeof disableUserByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserDto> = yield call(disableUserByIdEndPoint, action.payload, token.value);
    const user = userResponse.data;
    yield put(disableUserByIdAction.success(user));
    yield put(notifySuccess(`User was disabled (${user.firstName} ${user.lastName})`));
  } catch (error) {
    yield put(disableUserByIdAction.failure(error));
  }
}
