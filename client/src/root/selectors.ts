import { createSelector } from 'reselect';

import StateType from 'types/StateType';

const getRoot = (state: StateType) => state.root;

export const isApplicationInitializedSelector = createSelector(getRoot, root => root.isApplicationInitialized);
export const notificationsSelector = createSelector(getRoot, root => root.notifications);
export const newNotificationsFromSelector = createSelector(getRoot, root => root.newNotificationsFrom);
export const errorSelector = createSelector(getRoot, root => root.error);
