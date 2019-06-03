import {connect} from 'react-redux';

import StateType from 'types/StateType';
import {
  getUsersAction,
  getUserByIdAction,
  activateUserByIdAction,
  disableUserByIdAction,
} from 'modules/user/actions';
import {
  usersSelector,
  userSelector,
  activatedUserSelector,
  disabledUserSelector,
} from 'modules/user/selectors';

import page from './page';

const mapStateToProps = (state: StateType) => ({
  users: usersSelector(state),
  user: userSelector(state),
  activatedUser: activatedUserSelector(state),
  disabledUser: disabledUserSelector(state),
});

const dispatchProps = {
  getUsers: getUsersAction.request,
  getUserById: getUserByIdAction.request,
  activateUserById: activateUserByIdAction.request,
  disableUserById: disableUserByIdAction.request,
};

const container = connect(mapStateToProps, dispatchProps)(page);

export default container;
