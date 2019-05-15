import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import { IS_PRODUCTION } from 'config';

import {rootReducer, rootSaga} from 'root';
import {accountReducer, accountSaga} from 'modules/account';
import {userReducer, userSaga} from 'modules/user';
import {notebookReducer, notebookSaga} from 'modules/notebook';

function* saga() {
  yield all([
    rootSaga(),
    accountSaga(),
    userSaga(),
    notebookSaga(),
  ]);
}

export const reducer = combineReducers({
  root: rootReducer,
  account: accountReducer,
  user: userReducer,
  notebook: notebookReducer,
});

const initializeReduxDevTools = () => {
  if (IS_PRODUCTION
    || typeof window === 'undefined'
    || typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined'
  ) {
    return compose;
  }
  return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = initializeReduxDevTools();
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducer, {}, enhancer);

sagaMiddleware.run(saga);

export default store;
