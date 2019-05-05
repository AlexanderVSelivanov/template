import {withStyles} from '@material-ui/core';

import styles from './styles';
import layout from './layout';
import {withRouter} from 'react-router-dom';

export const PrivateLayoutWithStyle = withStyles(styles)(layout);
const PrivateLayoutWithBrowserRouter = withRouter(PrivateLayoutWithStyle);

export default PrivateLayoutWithBrowserRouter;
