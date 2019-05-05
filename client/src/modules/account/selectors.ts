import {createSelector} from 'reselect';

import StateType from 'src/types/StateType';

const accountState = (state: StateType) => state.account;

export const accountUserSelector = createSelector(accountState, state => state.user);
export const tokenSelector = createSelector(accountState, state => state.token);
