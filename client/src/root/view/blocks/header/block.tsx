import React, {useMemo, useState} from 'react';
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
import {AppNotification} from '../../../../types/AppNotification';

type HeaderBlockProps = RouteComponentProps & {
  notifications: AppNotification[],
  newNotificationsFrom: Date,
  isDrawerOpen: boolean,
  setIsDrawerOpen: (value: boolean) => void,
  logout: typeof logoutAction.request,
};

const HeaderBlock: React.FC<HeaderBlockProps> =
  ({
     notifications, newNotificationsFrom, logout, isDrawerOpen, setIsDrawerOpen, history,
   }) => {
    const classes = useStyles();
    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState<null | HTMLElement>(null);

    const newNotificationsCount = useMemo(
      () => notifications.filter(notification => notification.created > newNotificationsFrom).length,
      [notifications, newNotificationsFrom],
    );

    function handleDrawerOpen() {
      setIsDrawerOpen(true);
    }

    function handleAccountMenuOpen(event: React.MouseEvent<HTMLElement>) {
      setAccountMenuAnchorEl(event.currentTarget);
    }

    function handleProfileMenuClose() {
      setAccountMenuAnchorEl(null);
    }

    function handleOpenAccount() {
      history.push(routes.settings.subroutes!.account.path);
      handleProfileMenuClose();
    }

    function handleNotificationClick() {
      history.push(routes.settings.subroutes!.notifications.path);
    }

    const isProfileMenuOpen = Boolean(accountMenuAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={accountMenuAnchorEl}
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
          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={newNotificationsCount} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isProfileMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={handleAccountMenuOpen}
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
