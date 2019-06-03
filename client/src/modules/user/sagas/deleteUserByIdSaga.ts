import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, UserEntityDto} from 'template-common';

import {deleteUserByIdAction} from '../actions';
import {deleteUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';
import {notifySuccess} from '../../../root/actions';

export default function* deleteUserByIdSaga(action: ActionType<typeof deleteUserByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserEntityDto> = yield call(deleteUserByIdEndPoint, action.payload, token.value);
    const user = userResponse.data;
    yield put(deleteUserByIdAction.success(user));
    yield put(notifySuccess(`User was deleted (${user.firstName} ${user.lastName})`));
  } catch (error) {
    yield put(deleteUserByIdAction.failure(error));
  }
}
