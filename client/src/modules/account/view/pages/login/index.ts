import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME} from 'config';

import StateType from 'types/StateType';

import {errorSelector} from 'root/selectors';
import {loginAction} from 'modules/account/actions';

import page from './page';

const lastUserName = localStorage.getItem(LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME);

const mapStateToProps = (state: StateType) => ({
  error: errorSelector(state),
  defaultLogin: lastUserName,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  login: loginAction.request,
}, dispatch);

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(page);

export default LoginPageContainer;
