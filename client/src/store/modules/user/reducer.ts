import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';

type UserActionType = ActionType<typeof actions>;

const reducer = (state = initialState, action: UserActionType) => {
  switch (action.type) {
    case getType(actions.login.success):
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case getType(actions.login.failure):
      return {
        ...state,
        token: null,
        error: action.payload,
      };

    case getType(actions.getUser.success):
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case getType(actions.getUser.failure):
      return {
        ...state,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
