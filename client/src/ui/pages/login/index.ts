import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';

import styles from './styles';
import page from './page';

const LoginPageComponent = withStyles(styles)(page);
const LoginPageContainer = connect()(LoginPageComponent);

export default LoginPageContainer;
