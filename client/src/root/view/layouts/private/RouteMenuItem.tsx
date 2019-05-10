import React, {ReactElement} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {Route} from 'types/Route';

type RouteMenuItemProps = RouteComponentProps & {
  route: Route,
  icon: ReactElement,
};

const RouteMenuItem: React.FC<RouteMenuItemProps> = ({icon, route, history}) => (
  <ListItem button onClick={() => history.push(route.path)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={route.title}/>
  </ListItem>
);

export default withRouter(RouteMenuItem);
