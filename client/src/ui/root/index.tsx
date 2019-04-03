import React from 'react';
import {connect} from 'react-redux';

import Root from './Root';
import StateType from 'src/store/stateType';
import {isApplicationInitialized} from 'src/store/root/selectors';

const mapStateToProps = (state: StateType) => ({
  isApplicationInitialized: isApplicationInitialized(state),
});

const connectedRoot = connect(mapStateToProps)(Root);

export default connectedRoot;
