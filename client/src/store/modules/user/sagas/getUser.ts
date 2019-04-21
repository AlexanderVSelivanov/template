import {put, call, select} from 'redux-saga/effects';
import {ActionType, getType} from 'typesafe-actions';

import {UserEntity} from 'template-common/entities';
import {getUser, getUserById} from '../actions';
import {getUser as getUserEndPoint, getUserById as getUserByIdEndPoint} from '../endPoints';
import {token as tokenSelector} from '../selectors';

export default function* getUserSaga(
  action: ActionType<typeof getUser.request> | ActionType<typeof getUserById>,
) {
  try {
    const token = yield select(tokenSelector);
    if (action.type === getType(getUserById)) {
      const id = action.payload;
      const result = yield call(getUserByIdEndPoint, id, token);
    } else {
      const result = yield call(getUserEndPoint, {}, token);
    }
    const user: UserEntity = {
      id: 1,
      login: 'login',
      firstName: 'first',
      lastName: 'last',
      created: new Date(),
      deleted: false,
    };

    yield put(getUser.success(user));
  } catch (error) {
    yield put(getUser.failure(error));
  }
}
