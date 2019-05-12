import React, {useState} from 'react';

import {WithStyles} from '@material-ui/core';

import {logoutAction} from 'modules/account/actions';

import Header from '../../blocks/header';
import MainMenu from '../../blocks/mainMenu';

import styles from './styles';

type PrivateLayoutProps = WithStyles<typeof styles> & {
  logout: typeof logoutAction.request,
  children: React.ReactNode | React.ReactNodeArray,
};

const PrivateLayout: React.FC<PrivateLayoutProps> = ({classes, logout, children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Header
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        logout={logout}
      />
      <MainMenu
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {children}
      </main>
    </div>
  );
};

export default PrivateLayout;
