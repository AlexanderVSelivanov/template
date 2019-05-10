import React from 'react';
import {connect} from 'react-redux';

import StateType from 'types/StateType';

import Root from './Root';
import {errorSelector, isApplicationInitializedSelector} from '../selectors';
import {accountUserSelector} from 'modules/account/selectors';

const mapStateToProps = (state: StateType) => ({
  isApplicationInitialized: isApplicationInitializedSelector(state),
  accountUser: accountUserSelector(state),
  error: errorSelector(state),
});

const connectedRoot = connect(mapStateToProps)(Root);

export default connectedRoot;
