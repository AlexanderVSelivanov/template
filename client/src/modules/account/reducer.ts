import {ActionType, createReducer, getType} from 'typesafe-actions';
import {Empty} from 'template-common';

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

// const reducer = (state = initialState, action: UserActionType) => {
//   switch (action.type) {
//     case getType(actions.loginAction.success):
//       return {
//         ...state,
//         token: action.payload,
//       };
//     case getType(actions.loginAction.failure):
//       return {
//         ...state,
//         token: Empty,
//       };
//
//     case getType(actions.logoutAction.success):
//       return {
//         ...state,
//         token: Empty,
//       };
//
//     case getType(actions.getAccountAction.success):
//       return {
//         ...state,
//         currentAccount: action.payload,
//       };
//     case getType(actions.getAccountAction.failure):
//       return {
//         ...state,
//         currentAccount: Empty,
//       };
//
//     default:
//       return state;
//   }
// };

export default reducer;
