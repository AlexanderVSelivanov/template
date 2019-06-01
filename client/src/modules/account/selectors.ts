import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const accountState = (state: StateType) => state.account;

export const currentAccountSelector = createSelector(accountState, state => state.currentAccount);
export const tokenSelector = createSelector(accountState, state => state.token);
