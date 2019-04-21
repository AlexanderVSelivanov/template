import {createSelector} from 'reselect';

import StateType from '../../stateType';

const userState = (state: StateType) => state.user;

export const user = createSelector(userState, state => state.user);
export const token = createSelector(userState, state => state.token);
export const error = createSelector(userState, state => state.error);
