import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const accountState = (state: StateType) => state.account;

export const accountUserSelector = createSelector(accountState, state => state.user);
export const tokenSelector = createSelector(accountState, state => state.token);
