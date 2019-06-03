import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME} from 'config';

import StateType from 'types/StateType';

import {loginAction} from 'modules/account/actions';
import {tokenSelector, currentAccountSelector} from 'modules/account/selectors';

import page from './page';

const lastUserName = localStorage.getItem(LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME);

const mapStateToProps = (state: StateType) => ({
  defaultLogin: lastUserName,
  token: tokenSelector(state),
  currentAccount: currentAccountSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  login: loginAction.request,
}, dispatch);

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(page);

export default LoginPageContainer;
