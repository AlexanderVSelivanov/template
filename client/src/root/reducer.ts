import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';

type RootActionType = ActionType<typeof actions>;

const reducer = (state = initialState, action: RootActionType) => {
  switch (action.type) {
    case getType(actions.notify):
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case getType(actions.setNewNotificationsFromAction):
      return {
        ...state,
        newNotificationsFrom: action.payload,
      };

    case getType(actions.initializeCompleteAction):
      return {
        ...state,
        isApplicationInitialized: true,
      };
    case getType(actions.initializeFailAction):
      return {
        ...state,
        isApplicationInitialized: true,
      };

    case getType(actions.errorAction):
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
