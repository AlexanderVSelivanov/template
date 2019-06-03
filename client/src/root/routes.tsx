import React from 'react';
import {Route} from 'react-router';
import {createRoute, Route as RouteType} from 'types/Route';
import documentTitleService from '../services/documentTitleService';

import DashboardPage from './view/pages/dashboard';
import Notebook from 'modules/notebook/view/pages/notebook';
import CalendarPage from 'modules/calendar/view/pages/main';
import UserPage from 'modules/user/view/pages/userTable';
import MapPage from 'modules/map/view/pages/main';
import ReportsPage from 'modules/reports/view/pages/main';
import SettingsPage from './view/pages/settings';
import NotificationsPage from 'root/view/pages/notifications';
import HelpPage from './view/pages/help';
import AccountPage from 'modules/account/view/pages/account';
import EmptyPagePlaceholder from './view/components/EmptyPagePlaceholder';

const routes = {
  dashboard: createRoute(
    'Dashboard',
    'dashboard',
    DashboardPage,
  ),
  calendar: createRoute(
    'Calendar',
    'calendar',
    () => underConstruction('Calendar'),
    // CalendarPage,
  ),
  notebook: createRoute('Notebook', 'notebook', Notebook),
  user: createRoute('User', 'user', UserPage),
  // map: createRoute('Map', 'map', MapPage),
  reports: createRoute(
    'Report',
    'report',
    () => underConstruction('Report'),
    // ReportsPage,
  ),
  settings: createRoute('Settings', 'settings', SettingsPage),
  help: createRoute(
    'Help',
    'help',
    HelpPage,
  ),

  settingsGeneral: createRoute(
    'Settings - General',
    'settings/general',
    () => underConstruction('General settings'),
  ),
  settingsAccount: createRoute('Settings - Account', 'settings/account', AccountPage),
  settingsTheme: createRoute(
    'Settings - Theme',
    'settings/theme',
    () => underConstruction('Theme settings'),
  ),
  settingsNotifications: createRoute('Settings - Notifications', 'settings/notifications', NotificationsPage),
};

export default routes;

export const renderRoute = (route: RouteType) => (
  <Route
    key={route.path}
    path={route.path}
    render={() => {
      documentTitleService(route.title);
      return React.createElement(route.component);
    }}
  />
);

const underConstruction = (title: string) => <EmptyPagePlaceholder text={title + ' is under construction'}/>;
