import {ActionType, createReducer, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';

type UserActionType = ActionType<typeof actions>;

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
        token: null,
      };

    case getType(actions.logoutAction.success):
      return {
        ...state,
        token: null,
      };

    case getType(actions.getAccountUserAction.success):
      return {
        ...state,
        user: action.payload,
      };
    case getType(actions.getAccountUserAction.failure):
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
