import {connect} from 'react-redux';

import StateType from 'types/StateType';
import {
  getUserByIdAction,
  createUserAction,
  updateUserByIdAction,
  setUserEmptyAction,
  setCreatedUserEmptyAction,
  setUpdatedUserEmptyAction,
} from 'modules/user/actions';
import {
  userSelector,
  createdUserSelector,
  updatedUserSelector,
} from 'modules/user/selectors';

import page from './page';

const mapStateToProps = (state: StateType) => ({
  user: userSelector(state),
  createdUser: createdUserSelector(state),
  updatedUser: updatedUserSelector(state),
});

const dispatchProps = {
  getUserById: getUserByIdAction.request,
  createUser: createUserAction.request,
  updateUserById: updateUserByIdAction.request,
  setUserEmpty: setUserEmptyAction,
  setCreatedUserEmpty: setCreatedUserEmptyAction,
  setUpdatedUserEmpty: setUpdatedUserEmptyAction,
};

const container = connect(mapStateToProps, dispatchProps)(page);

export default container;
