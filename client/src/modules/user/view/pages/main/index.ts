import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';

import StateType from 'types/StateType';
import {
  getUsersAction,
  getUserByIdAction,
  createUserAction,
  updateUserByIdAction,
  deleteUserByIdAction,
} from 'modules/user/actions';
import {usersSelector, editUserSelector} from 'modules/user/selectors';

import styles from './styles';
import page from './page';

const mapStateToProps = (state: StateType) => ({
  users: usersSelector(state),
  editUser: editUserSelector(state),
});

const dispatchProps = {
  getUsers: getUsersAction.request,
  getUserById: getUserByIdAction.request,
  createUser: createUserAction.request,
  updateUserById: updateUserByIdAction.request,
  deleteUserById: deleteUserByIdAction.request,
};

const connectedPage = connect(mapStateToProps, dispatchProps)(page);
const withStylePage = withStyles(styles)(connectedPage);

export default withStylePage;