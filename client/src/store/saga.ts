import {all} from 'redux-saga/effects';

import {rootSaga} from 'src/store/root';
import {userSaga} from 'src/store/modules/user';

function* saga() {
  yield all([
    rootSaga(),
    userSaga(),
  ]);
}

export default saga;
