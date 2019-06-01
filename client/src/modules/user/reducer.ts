import {ActionType, createReducer, isActionOf} from 'typesafe-actions';
import {Empty, isEmpty, isSuccessProperty} from 'template-common';
import handleAsyncProperty from '../../utils/handleAsyncProperty';
import * as actions from './actions';
import initialState from './initialState';

type UserActionType = ActionType<typeof actions>;
type UserStateType = typeof initialState;

const reducer = createReducer<UserStateType, UserActionType>(initialState)
  .handleAction(
    [
      actions.getUsersAction.request,
      actions.getUsersAction.success,
      actions.getUsersAction.failure,
    ], (state, action) => ({
      ...state,
      users: handleAsyncProperty(action, actions.getUsersAction),
    }),
  )
  .handleAction(
    [
      actions.getUserByIdAction.request,
      actions.getUserByIdAction.success,
      actions.getUserByIdAction.failure,
    ], (state, action) => {
      const users = state.users;
      if (
        isActionOf(actions.getUserByIdAction.success, action)
        && !isEmpty(users)
        && isSuccessProperty(users)
        && users.value.items.length > 0
      ) {
        const index = users.value.items.findIndex(user => user.id === action.payload.id);
        users.value.items[index] = action.payload;
      }
      return {
        ...state,
        user: handleAsyncProperty(action, actions.getUserByIdAction),
        users,
      };
    },
  )
  .handleAction(
    [
      actions.createUserAction.request,
      actions.createUserAction.success,
      actions.createUserAction.failure,
    ], (state, action) => ({
      ...state,
      createdUser: handleAsyncProperty(action, actions.createUserAction),
    }),
  )
  .handleAction(
    [
      actions.updateUserByIdAction.request,
      actions.updateUserByIdAction.success,
      actions.updateUserByIdAction.failure,
    ], (state, action) => {
      const users = state.users;
      if (
        isActionOf(actions.updateUserByIdAction.success, action)
        && !isEmpty(users)
        && isSuccessProperty(users)
        && users.value.items.length > 0
      ) {
        const index = users.value.items.findIndex(user => user.id === action.payload.id);
        users.value.items[index] = action.payload;
      }
      return {
        ...state,
        updatedUser: handleAsyncProperty(action, actions.updateUserByIdAction),
        users,
      };
    },
  )
  .handleAction(
    [
      actions.deleteUserByIdAction.request,
      actions.deleteUserByIdAction.success,
      actions.deleteUserByIdAction.failure,
    ], (state, action) => ({
      ...state,
      deletedUser: handleAsyncProperty(action, actions.deleteUserByIdAction),
    }),
  )
  .handleAction(actions.setUserEmptyAction, state => ({...state, User: Empty}))
  .handleAction(actions.setCreatedUserEmptyAction, state => ({...state, createdUser: Empty}))
  .handleAction(actions.setUpdatedUserEmptyAction, state => ({...state, updatedUser: Empty}))
  .handleAction(actions.setDeletedUserEmptyAction, state => ({...state, deletedUser: Empty}));

export default reducer;
