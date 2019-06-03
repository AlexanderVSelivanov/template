import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, EntityList, UserEntityDto} from 'template-common';

import {getUsersAction} from '../actions';
import {getUsersEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* getUsersSaga(action: ActionType<typeof getUsersAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const usersResponse: AxiosResponse<EntityList<UserEntityDto>> = yield call(getUsersEndPoint, action.payload, token.value);
    const users = usersResponse.data;
    yield put(getUsersAction.success(users));
  } catch (error) {
    yield put(getUsersAction.failure(error));
  }
}
