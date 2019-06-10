import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, UserDto} from 'template-common';

import {createUserAction} from '../actions';
import {createUserEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';
import {notifySuccess} from '../../../root/actions';

export default function* createUserSaga(action: ActionType<typeof createUserAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserDto> = yield call(createUserEndPoint, action.payload, token.value);
    const user = userResponse.data;
    yield put(createUserAction.success(user));
    yield put(notifySuccess(`User was create (${user.firstName} ${user.lastName})`));
  } catch (error) {
    yield put(createUserAction.failure(error));
  }
}
