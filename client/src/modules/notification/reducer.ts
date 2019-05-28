import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';

type NotificationActionType = ActionType<typeof actions>;

const reducer = createReducer<typeof initialState, NotificationActionType>(initialState)
  .handleAction(actions.notifyAction, (state, action) => ({
    ...state,
    notification: action.payload,
  }));

export default reducer;
