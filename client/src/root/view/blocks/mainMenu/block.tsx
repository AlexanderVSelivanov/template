import React from 'react';


import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarIcon from '@material-ui/icons/Event';
import NotebookIcon from '@material-ui/icons/Create';
import UserIcon from '@material-ui/icons/People';
import MapIcon from '@material-ui/icons/Layers';
import ReportIcon from '@material-ui/icons/Equalizer';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';

import RouteMenuItem from './RouteMenuItem';
import routes from 'root/routes';

import useStyles from './styles';

type MainMenuBlockProps = {
  isDrawerOpen: boolean,
  setIsDrawerOpen: (value: boolean) => void,
};

const MainMenuBlock: React.FC<MainMenuBlockProps> = ({isDrawerOpen, setIsDrawerOpen}) => {
  const classes = useStyles();

  function handleDrawerClose() {
    setIsDrawerOpen(false);
  }

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        }),
      }}
      open={isDrawerOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        <RouteMenuItem route={routes.dashboard} icon={<DashboardIcon/>}/>
        {/*<RouteMenuItem route={routes.calendar} icon={<CalendarIcon/>}/>*/}
        <RouteMenuItem route={routes.notebook} icon={<NotebookIcon/>}/>
        <RouteMenuItem route={routes.user} icon={<UserIcon/>}/>
        {/*<RouteMenuItem route={routes.map} icon={<MapIcon/>}/>*/}
        {/*<RouteMenuItem route={routes.reports} icon={<ReportIcon/>}/>*/}
      </List>
      <Divider/>
      <List>
        <RouteMenuItem route={routes.settings} icon={<SettingsIcon/>}/>
        <RouteMenuItem route={routes.help} icon={<HelpIcon/>}/>
      </List>
    </Drawer>
  );
};

export default MainMenuBlock;
