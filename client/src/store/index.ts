import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { IS_PRODUCTION } from 'src/config';

import reducer from './reducer';
import saga from './saga';

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
