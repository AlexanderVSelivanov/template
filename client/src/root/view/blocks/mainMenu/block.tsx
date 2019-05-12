import React from 'react';
import {WithStyles} from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ChevronLeftIcon from '@material-ui/core/SvgIcon/SvgIcon';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LayersIcon from '@material-ui/icons/Layers';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';

import RouteMenuItem from './RouteMenuItem';
import routes from 'root/routes';

import styles from './styles';

type MainMenuBlockProps = WithStyles<typeof styles> & {
  isDrawerOpen: boolean,
  setIsDrawerOpen: (value: boolean) => void,
};

const MainMenuBlock: React.FC<MainMenuBlockProps> = ({classes, isDrawerOpen, setIsDrawerOpen}) => {
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
        <RouteMenuItem route={routes.calendar} icon={<CalendarTodayIcon/>}/>
        <RouteMenuItem route={routes.notes} icon={<FormatAlignJustifyIcon/>}/>
        <RouteMenuItem route={routes.user} icon={<AssignmentIcon/>}/>
        <RouteMenuItem route={routes.map} icon={<LayersIcon/>}/>
        <RouteMenuItem route={routes.reports} icon={<EqualizerIcon/>}/>
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
