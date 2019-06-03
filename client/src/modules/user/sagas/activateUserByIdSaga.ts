import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, UserEntityDto} from 'template-common';

import {activateUserByIdAction} from '../actions';
import {activateUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';
import {notifySuccess} from '../../../root/actions';

export default function* deleteUserByIdSaga(action: ActionType<typeof activateUserByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserEntityDto> =
      yield call(activateUserByIdEndPoint, action.payload, token.value);
    const user = userResponse.data;
    yield put(activateUserByIdAction.success(user));
    yield put(notifySuccess(`User was activated (${user.firstName} ${user.lastName})`));
  } catch (error) {
    yield put(activateUserByIdAction.failure(error));
  }
}
