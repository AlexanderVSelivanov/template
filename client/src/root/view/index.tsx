import {connect} from 'react-redux';

import StateType from 'types/StateType';

import Root from './Root';
import {
  isApplicationInitializedSelector,
  notificationsSelector,
  newNotificationsFromSelector,
  errorSelector,
} from '../selectors';
import {currentAccountSelector} from 'modules/account/selectors';
import {logoutAction} from 'modules/account/actions';

const mapStateToProps = (state: StateType) => ({
  isApplicationInitialized: isApplicationInitializedSelector(state),
  account: currentAccountSelector(state),
  notifications: notificationsSelector(state),
  newNotificationsFrom: newNotificationsFromSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = {
  logout: logoutAction.request,
};

const connectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root);

export default connectedRoot;
