import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {createUserAction} from '../actions';
import {createUserEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* createUserSaga(action: ActionType<typeof createUserAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserEntityDto> = yield call(createUserEndPoint, action.payload, token);
    const user = userResponse.data;
    yield put(createUserAction.success(user));
  } catch (error) {
    yield put(createUserAction.failure(error));
  }
}
