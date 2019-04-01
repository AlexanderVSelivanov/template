import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';

type RootActionType = ActionType<typeof actions>;

const reducer = (state = initialState, action: RootActionType) => {
  switch (action.type) {
    case getType(actions.initializeComplete):
      return {
        ...state,
        isApplicationInitialized: true,
        error: null,
      };
    case getType(actions.initializeFail):
      return {
        ...state,
        isApplicationInitialized: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
