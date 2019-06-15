import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, UserDto} from 'template-common';

import {updateUserByIdAction} from '../actions';
import {updateUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';
import {notifySuccess} from 'root/actions';

export default function* updateUserByIdSaga(action: ActionType<typeof updateUserByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserDto> = yield call(
      updateUserByIdEndPoint,
      {id: action.payload.entity!.id, ...action.payload},
      token.value,
    );
    const user = userResponse.data;
    yield put(updateUserByIdAction.success(user));
    yield put(notifySuccess(`User was updated (${user.firstName} ${user.lastName})`));
  } catch (error) {
    yield put(updateUserByIdAction.failure(error));
  }
}
