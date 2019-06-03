import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const userState = (state: StateType) => state.user;

export const usersSelector = createSelector(userState, state => state.users);
export const userSelector = createSelector(userState, state => state.user);
export const createdUserSelector = createSelector(userState, state => state.createdUser);
export const updatedUserSelector = createSelector(userState, state => state.updatedUser);
export const activatedUserSelector = createSelector(userState, state => state.activatedUser);
export const disabledUserSelector = createSelector(userState, state => state.disabledUser);
