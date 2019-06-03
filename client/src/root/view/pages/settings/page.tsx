import React, {useState} from 'react';

import useStyles from './styles';
import {Tab, Tabs} from '@material-ui/core';
import {Redirect, RouteComponentProps, Switch, withRouter} from 'react-router';
import routes, {renderRoute} from '../../../routes';

type PageProps = RouteComponentProps & {};

const Page: React.FC<PageProps> = ({history, location}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        value={location.pathname}
        onChange={(event, value) => history.push(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {/*<Tab label="General" value={routes.settingsGeneral.path}/>*/}
        <Tab label="Account" value={routes.settingsAccount.path}/>
        {/*<Tab label="Theme" value={routes.settingsTheme.path}/>*/}
        <Tab label="Notifications" value={routes.settingsNotifications.path}/>
      </Tabs>

      <Switch>
        {/*{renderRoute(routes.settingsGeneral)}*/}
        {renderRoute(routes.settingsAccount)}
        {/*{renderRoute(routes.settingsTheme)}*/}
        {renderRoute(routes.settingsNotifications)}
        {/*<Redirect to={routes.settingsGeneral.path}/>*/}
        <Redirect to={routes.settingsAccount.path}/>
      </Switch>

    </div>
  );
};

export default withRouter(Page);
