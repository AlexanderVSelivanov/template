import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {UserEntityDto} from 'template-common';

import {updateUserByIdAction} from '../actions';
import {updateUserByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* updateUserByIdSaga(action: ActionType<typeof updateUserByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const userResponse: AxiosResponse<UserEntityDto> = yield call(updateUserByIdEndPoint, action.payload, token);
    const user = userResponse.data;
    yield put(updateUserByIdAction.success(user));
  } catch (error) {
    yield put(updateUserByIdAction.failure(error));
  }
}
