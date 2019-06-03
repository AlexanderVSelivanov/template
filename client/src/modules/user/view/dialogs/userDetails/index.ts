import {connect} from 'react-redux';

import StateType from 'types/StateType';
import {
  getUserByIdAction,
} from 'modules/user/actions';
import {
  userSelector,
} from 'modules/user/selectors';

import page from './page';

const mapStateToProps = (state: StateType) => ({
  user: userSelector(state),
});

const dispatchProps = {
  getUserById: getUserByIdAction.request,
};

const container = connect(mapStateToProps, dispatchProps)(page);

export default container;
