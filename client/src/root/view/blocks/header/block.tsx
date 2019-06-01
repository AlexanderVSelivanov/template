import React, {useState} from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';

import {VERSION} from 'config';
import {logoutAction} from 'modules/account/actions';

import useStyles from './styles';
import {RouteComponentProps, withRouter} from 'react-router';
import routes from '../../../routes';

type HeaderBlockProps = RouteComponentProps & {
  isDrawerOpen: boolean,
  setIsDrawerOpen: (value: boolean) => void,
  logout: typeof logoutAction.request,
};

const HeaderBlock: React.FC<HeaderBlockProps> = ({logout, isDrawerOpen, setIsDrawerOpen, history}) => {

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const classes = useStyles();

  function handleDrawerOpen() {
    setIsDrawerOpen(true);
  }

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setProfileMenuAnchorEl(event.currentTarget);
  }

  function handleProfileMenuClose() {
    setProfileMenuAnchorEl(null);
  }

  function handleOpenAccount() {
    history.push(routes.settingsAccount.path);
    handleProfileMenuClose();
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
      <MenuItem onClick={handleOpenAccount}>Account</MenuItem>
      <MenuItem onClick={() => logout() && handleProfileMenuClose}>Logout</MenuItem>
    </Menu>
  );
  return (
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
          template <sup>{VERSION}</sup>
        </Typography>
        <div className={classes.grow}/>
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
  );
};

export default withRouter(HeaderBlock);
