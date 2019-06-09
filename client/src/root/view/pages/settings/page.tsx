import React from 'react';

import useStyles from './styles';
import {Tab, Tabs} from '@material-ui/core';
import {Redirect, RouteComponentProps, Switch, withRouter} from 'react-router';
import routes, {renderRoute} from '../../../routes';

type PageProps = RouteComponentProps & {};

const Page: React.FC<PageProps> = ({history, location}) => {
  const classes = useStyles();
  if (location.pathname === routes.settings.path) {
    return <Redirect to={routes.settings.subroutes!.account.path}/>;
    {/*<Redirect to={routes.settings.subroutes!.general.path}/>*/}
  }

  return (
    <div className={classes.root}>
      <Tabs
        value={location.pathname}
        onChange={(event, value) => history.push(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {/*<Tab label="General" value={routes.settings.subroutes!.general.path}/>*/}
        <Tab label="Account" value={routes.settings.subroutes!.account.path}/>
        {/*<Tab label="Theme" value={routes.settings.subroutes!.theme.path}/>*/}
        <Tab label="Notifications" value={routes.settings.subroutes!.notifications.path}/>
      </Tabs>

      <Switch>
        {/*{renderRoute(routes.settings.subroutes!.general)}*/}
        {renderRoute(routes.settings.subroutes!.account)}
        {/*{renderRoute(routes.settings.subroutes!.theme)}*/}
        {renderRoute(routes.settings.subroutes!.notifications)}
      </Switch>

    </div>
  );
};

export default withRouter(Page);
