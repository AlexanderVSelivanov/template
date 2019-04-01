import {put} from 'redux-saga/effects';
import {ActionType, getType} from 'typesafe-actions';

import {User} from 'template-common/entity';
import {getUser, getUserById} from '../actions'

export default function* getUserSaga(
  action: ActionType<typeof getUser.request> | ActionType<typeof getUserById>,
) {
  try {
    if (action.type === getType(getUserById)) {
      const id = action.payload
    } else {

    }
    const user: User = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
    };

    yield put(getUser.success(user));
  } catch (error) {
    yield put(getUser.failure(error));
  }
}
