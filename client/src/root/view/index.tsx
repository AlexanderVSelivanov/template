import {connect} from 'react-redux';

import StateType from 'types/StateType';

import Root from './Root';
import {errorSelector, isApplicationInitializedSelector} from '../selectors';
import {accountUserSelector} from 'modules/account/selectors';
import {logoutAction} from 'modules/account/actions';

const mapStateToProps = (state: StateType) => ({
  isApplicationInitialized: isApplicationInitializedSelector(state),
  accountUser: accountUserSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = {
  logout: logoutAction.request,
};

const connectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root);

export default connectedRoot;
