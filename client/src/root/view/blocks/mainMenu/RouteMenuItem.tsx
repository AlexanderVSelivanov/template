import React, {ReactElement} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {AppRoute} from 'types/AppRoute';

type RouteMenuItemProps = RouteComponentProps & {
  route: AppRoute,
  icon: ReactElement,
};

const RouteMenuItem: React.FC<RouteMenuItemProps> = ({icon, route, history, location}) => (
  <ListItem
    button
    onClick={() => history.push(route.path)}
    selected={location.pathname.includes(route.path)}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={route.title}/>
  </ListItem>
);

export default withRouter(RouteMenuItem);
