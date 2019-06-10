import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';
import handleAsyncProperty from '../../utils/handleAsyncProperty';

type UserActionType = ActionType<typeof actions>;
type UserStateType = typeof initialState;

const reducer = createReducer<UserStateType, UserActionType>(initialState)
  .handleAction(
    [
      actions.loginAction.request,
      actions.loginAction.success,
      actions.loginAction.failure,
    ], (state, action) => ({
      ...state,
      token: handleAsyncProperty(action, actions.loginAction),
    }),
  )
  .handleAction(
    [
      actions.getAccountAction.request,
      actions.getAccountAction.success,
      actions.getAccountAction.failure,
    ], (state, action) => ({
      ...state,
      currentAccount: handleAsyncProperty(action, actions.getAccountAction),
    }),
  );

export default reducer;
