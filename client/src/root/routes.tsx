import React from 'react';
import {createRoute, AppRoute as RouteType, AppRoute} from 'types/AppRoute';
import documentTitleService from '../services/documentTitleService';

import DashboardPage from './view/pages/dashboard';
import Notebook from 'modules/notebook/view/pages/notebook';
import CalendarPage from 'modules/calendar/view/pages/main';
import UserPage from 'modules/user/view/pages/user';
import UserEditDialog from 'modules/user/view/dialogs/editUser';
import MapPage from 'modules/map/view/pages/main';
import ReportsPage from 'modules/reports/view/pages/report';
import SettingsPage from './view/pages/settings';
import NotificationsPage from 'root/view/pages/notifications';
import HelpPage from './view/pages/help';
import AccountPage from 'modules/account/view/pages/account';
import EmptyPagePlaceholder from './view/components/EmptyPagePlaceholder';
import {Route} from 'react-router';

const routes: { [route: string]: AppRoute } = {
  dashboard: createRoute('Dashboard', 'dashboard', DashboardPage),
  calendar: createRoute('Calendar', 'calendar', CalendarPage, {
    agenda: createRoute(
      'Calendar - Agenda',
      'calendar/agenda',
      () => underConstruction('Calendar - Agenda'),
    ),
    day: createRoute(
      'Calendar - Day',
      'calendar/day',
      () => underConstruction('Calendar - Day'),
    ),
    week: createRoute(
      'Calendar - Week',
      'calendar/week',
      () => underConstruction('Calendar - Week'),
    ),
    month: createRoute(
      'Calendar - Month',
      'calendar/month',
      () => underConstruction('Calendar - Month'),
    ),
    year: createRoute(
      'Calendar - Year',
      'calendar/year',
      () => underConstruction('Calendar - Year'),
    ),
  }),
  notebook: createRoute('Notebook', 'notebook', Notebook),

  userCreate: createRoute('Create user', 'user/create', UserEditDialog),
  userEdit: createRoute('Edit user', 'user/edit/:id', UserEditDialog),
  userDetails: createRoute('User details', 'user/:id', UserPage),
  user: createRoute('User', 'user', UserPage),

  // map: createRoute('Map', 'map', MapPage),
  reports: createRoute('Report', 'report', ReportsPage),
  settings: createRoute('Settings', 'settings', SettingsPage, {
    general: createRoute(
      'Settings - General',
      'settings/general',
      () => underConstruction('General settings'),
    ),
    account: createRoute('Settings - Account', 'settings/account', AccountPage),
    theme: createRoute(
      'Settings - Theme',
      'settings/theme',
      () => underConstruction('Theme settings'),
    ),
    notifications: createRoute('Settings - Notifications', 'settings/notifications', NotificationsPage),
  }),
  help: createRoute('Help', 'help', HelpPage),
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
