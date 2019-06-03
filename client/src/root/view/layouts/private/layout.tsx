import React, {useState} from 'react';
import {logoutAction} from 'modules/account/actions';
import Header from '../../blocks/header';
import MainMenu from '../../blocks/mainMenu';
import useStyles from './styles';
import {Paper} from '@material-ui/core';
import {AppNotification} from 'types/AppNotification';

type PrivateLayoutProps = {
  logout: typeof logoutAction.request,
  notifications: AppNotification[],
  newNotificationsFrom: Date,
  children: React.ReactNode | React.ReactNodeArray,
};

const PrivateLayout: React.FC<PrivateLayoutProps> = ({logout, notifications, newNotificationsFrom, children}) => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Header
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        logout={logout}
        notifications={notifications}
        newNotificationsFrom={newNotificationsFrom}
      />
      <MainMenu
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Paper className={classes.contentBlock}>
          {children}
        </Paper>
      </main>
    </div>
  );
};

export default PrivateLayout;
