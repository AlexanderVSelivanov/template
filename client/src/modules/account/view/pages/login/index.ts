import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {withStyles} from '@material-ui/core';

import {LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME} from 'src/config';

import StateType from 'src/types/StateType';

import {errorSelector} from 'src/root/selectors';
import {loginAction} from 'src/modules/account/actions';

import styles from './styles';
import page from './page';

const lastUserName = localStorage.getItem(LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME);

const mapStateToProps = (state: StateType) => ({
  error: errorSelector(state),
  defaultLogin: lastUserName,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  login: loginAction.request,
}, dispatch);

export const LoginPageComponent = withStyles(styles)(page);
const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);

export default LoginPageContainer;
