import { createSelector } from 'reselect';

import StateType from 'src/store/stateType';

const getRoot = (state: StateType) => state.root;

export const isApplicationInitialized = createSelector(getRoot, (root) => root.isApplicationInitialized);
export const error = createSelector(getRoot, (root) => root.error);
