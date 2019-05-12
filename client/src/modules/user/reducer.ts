import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';

type UserActionType = ActionType<typeof actions>;

const reducer = (state = initialState, action: UserActionType) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default reducer;
