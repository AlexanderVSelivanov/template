import React, {useState} from 'react';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LayersIcon from '@material-ui/icons/Layers';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TableChartIcon from '@material-ui/icons/TableChart';

import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';

import styles from './styles';
import {WithStyles} from '@material-ui/core';

type PrivateLayoutProps = WithStyles<typeof styles> & {
  children: React.ReactNode | React.ReactNodeArray,
};

const PrivateLayout: React.FC<PrivateLayoutProps> = ({classes, children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);

  function handleDrawerOpen() {
    setIsDrawerOpen(true);
  }

  function handleDrawerClose() {
    setIsDrawerOpen(false);
  }

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setProfileMenuAnchorEl(event.currentTarget);
  }

  function handleProfileMenuClose() {
    setProfileMenuAnchorEl(null);
  }

  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const renderMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Toolbar disableGutters={!isDrawerOpen}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: isDrawerOpen,
            })}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            template
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <MailIcon/>
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isProfileMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
        </Toolbar>
        {renderMenu}
      </AppBar>
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
          <ListItem button>
            <ListItemIcon><DashboardIcon/></ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><AssignmentIcon/></ListItemIcon>
            <ListItemText primary="Form"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><LayersIcon/></ListItemIcon>
            <ListItemText primary="Map"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><EqualizerIcon/></ListItemIcon>
            <ListItemText primary="Reports"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><TableChartIcon/></ListItemIcon>
            <ListItemText primary="Table"/>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem button>
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            <ListItemText primary="Settings"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><HelpIcon/></ListItemIcon>
            <ListItemText primary="Help"/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {children}
      </main>
    </div>
  );

};

export default PrivateLayout;
