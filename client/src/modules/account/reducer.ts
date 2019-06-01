import {ActionType, createReducer, getType} from 'typesafe-actions';
import {Empty} from 'template-common';

import * as actions from './actions';
import initialState from './initialState';

type UserActionType = ActionType<typeof actions>;

// const reducer = createReducer<typeof initialState, UserActionType>(initialState)
//   .handleAction()

const reducer = (state = initialState, action: UserActionType) => {
  switch (action.type) {
    case getType(actions.loginAction.success):
      return {
        ...state,
        token: action.payload,
      };
    case getType(actions.loginAction.failure):
      return {
        ...state,
        token: Empty,
      };

    case getType(actions.logoutAction.success):
      return {
        ...state,
        token: Empty,
      };

    case getType(actions.getAccountAction.success):
      return {
        ...state,
        currentAccount: action.payload,
      };
    case getType(actions.getAccountAction.failure):
      return {
        ...state,
        currentAccount: Empty,
      };

    default:
      return state;
  }
};

export default reducer;
