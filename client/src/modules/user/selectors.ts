import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const userState = (state: StateType) => state.user;

export const usersSelector = createSelector(userState, state => state.users);

export const createdUserSelector = createSelector(userState, state => state.createdUser);
export const editUserSelector = createSelector(userState, state => state.editUser);
export const deletedUserSelector = createSelector(userState, state => state.deletedUser);


