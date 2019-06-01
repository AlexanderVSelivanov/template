import {connect} from 'react-redux';

import StateType from 'types/StateType';
import {
  getUsersAction,
  getUserByIdAction,
  createUserAction,
  updateUserByIdAction,
  deleteUserByIdAction,
  setUpdatedUserEmptyAction,
} from 'modules/user/actions';
import {
  usersSelector,
  userSelector,
  createdUserSelector,
  updatedUserSelector,
  deletedUserSelector,
} from 'modules/user/selectors';

import page from './page';

const mapStateToProps = (state: StateType) => ({
  users: usersSelector(state),
  user: userSelector(state),
  createdUser: createdUserSelector(state),
  updatedUser: updatedUserSelector(state),
  deletedUser: deletedUserSelector(state),
});

const dispatchProps = {
  getUsers: getUsersAction.request,
  getUserById: getUserByIdAction.request,
  createUser: createUserAction.request,
  updateUserById: updateUserByIdAction.request,
  deleteUserById: deleteUserByIdAction.request,
  setUpdatedUserEmpty: setUpdatedUserEmptyAction,
};

const container = connect(mapStateToProps, dispatchProps)(page);

export default container;
