import {all} from 'redux-saga/effects';

import {rootSaga} from 'src/root';
import {userSaga} from 'src/modules/user';

function* saga() {
  yield all([
    rootSaga(),
    userSaga(),
  ]);
}

export default saga;
